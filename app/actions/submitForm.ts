import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

const getEthiopianYearSuffix = (): string => {
  const date = new Date();
  const gYear = date.getFullYear();
  const gMonth = date.getMonth() + 1;
  const ethYear = gMonth < 9 || (gMonth === 9 && date.getDate() < 11)
    ? gYear - 8
    : gYear - 7;
  return String(ethYear).slice(-2);
};

const EthioYYYY = (): string => {
  const date = new Date();
  const gYear = date.getFullYear();
  const gMonth = date.getMonth() + 1;
  const ethYear = gMonth < 9 || (gMonth === 9 && date.getDate() < 11)
    ? gYear - 8
    : gYear - 7;
  return String(ethYear);
};

const generateStudentID = async (admissionType: string): Promise<string> => {
  const prefixMap: Record<string, string> = {
    "Regular – Full Time": "R",
    "Extension – Weekend": "WJ",
    "Extension – Night": "EV",
    Distance: "D",
    Summer: "S",
  };

  const prefix = prefixMap[admissionType] || "X";
  const yearSuffix = getEthiopianYearSuffix();

  const existing = await prisma.applicationForm.findMany({
    where: {
      studentID: {
        startsWith: `${prefix}/`,
      },
    },
    select: { studentID: true },
  });

  const numbers = existing.map(e => parseInt(e.studentID.split("/")[1])).filter(n => !isNaN(n));
  const next = (Math.max(...numbers, 0) + 1).toString().padStart(4, "0");

  return `${prefix}/${next}/${yearSuffix}`;
};

const generatePassword = (): string => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
};

export async function submitForm(formData: any) {
  const studentID = await generateStudentID(formData.admission);
  const academicYear = EthioYYYY();
  const password = generatePassword();
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create User
  const user = await prisma.user.create({
    data: {
      username: studentID,
      password: hashedPassword,
      role: "student",
      email: formData.email || formData.studentEmail,
      name: `${formData.firstName} ${formData.fatherName}`,
      studentID,
      institute: formData.institute,
      department: formData.department,
      academicYear,
    },
  });

  // Create ApplicationForm
  await prisma.applicationForm.create({
    data: {
      studentID,
      userId: user.id,
      institute: formData.institute,
      department: formData.department,
      admission: formData.admission,
      studyLevel: formData.studyLevel,
      firstName: formData.firstName,
      fatherName: formData.fatherName,
      gFatherName: formData.gFatherName,
      sex: formData.sex,
      dob: new Date(formData.dob),
      religion: formData.religion || "",
      ethnic: formData.ethnic || "",
      nationality: formData.nationality || "Ethiopian",
      maritalStatus: formData.maritalStatus || "",
      language1: formData.language1 || "",
      language2: formData.language2 || "",

      motherFirstName: formData.motherFirstName,
      motherLastName: formData.motherLastName,
      motherJob: formData.motherJob,
      fatherJob: formData.fatherJob,

      region: formData.region,
      zone: formData.zone,
      woreda: formData.woreda,
      town: formData.town || "",
      kebele: formData.kebele || "",
      phone: formData.phone,
      email: formData.email || "",
      studentPhone: formData.studentPhone,
      studentEmail: formData.studentEmail,

      isHandicapped: formData.isHandicapped === "Yes",
      handicapType: formData.handicapType || "",

      contact1FirstName: formData.contact1FirstName,
      contact1FatherName: formData.contact1FatherName,
      contact1GfName: formData.contact1GfName,
      contact1Region: formData.contact1Region,
      contact1Mobile: formData.contact1Mobile,
      contact1Relation: formData.contact1Relation,

      enrolledBefore: formData.enrolledBefore === "Yes",
      grade12result: formData.grade12result,
      stream: formData.stream,

      sponsor: formData.sponsor,
      sponsorName: formData.sponsorName,
      sponsorRegion: formData.sponsorRegion,
      sponsorZone: formData.sponsorZone,
      sponsorWoreda: formData.sponsorWoreda,
      sponsorEmail: formData.sponsorEmail,
      sponsorURL: formData.sponsorURL,

      signed: !!formData.signed,
      studentPhotoUrl: "", // TODO: upload and set
      degreeUrl: "",
      diplomaUrl: "",
      highSchoolTranscriptUrl: "",
      grade12ResultUrl: "",

      academicYear,

      secondarySchools: {
        create: formData.secondarySchools.map((s: any) => ({
          gradeLevel: s.gradeLevel,
          yearEC: s.yearEC,
          schoolName: s.schoolName,
          category: s.category,
          region: s.region,
          zone: s.zone,
          woreda: s.woreda,
          town: s.town,
        })),
      },
      postSecondaryEducation: {
        create: formData.postSecondaryEducation.map((edu: any) => ({
          institutionName: edu.institutionName,
          country: edu.country,
          fromEC: edu.fromEC,
          toEC: edu.toEC,
          fromGC: edu.fromGC,
          toGC: edu.toGC,
          cgpaEarned: edu.cgpaEarned,
          maxCgpa: edu.maxCgpa,
          award: edu.award,
        })),
      },
    },
  });

  return {
    success: true,
    studentID,
    password,
  };
}
