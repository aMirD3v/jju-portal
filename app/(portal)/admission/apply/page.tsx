"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ref, get, set } from "firebase/database";
import { addDoc, collection } from "firebase/firestore";
import { rtdb, db } from "@/lib/firebase";
import bcrypt from "bcryptjs";

export default function ApplicationFormPage() {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const preparatoryStreams = ["Natural Science", "Social Science"];

  const secondarySchoolCategories = [
    "GOVERNMENTAL",
    "PRIVATE",
    "PUBLIC",
    "RELIGIOUS",
  ];
  const [step, setStep] = useState(0);
  const steps = [
    "Personal Info",
    "Family Info",
    "Education",
    "Sponsor",
    "Declaration",
  ];

  const instituteDepartments = {
    "College of Engineering": [
      "Civil Engineering",
      "Mechanical Engineering",
      "Electrical Engineering",
    ],
    "College of Natural Sciences": ["Biology", "Chemistry", "Physics"],
    "College of Business": ["Accounting", "Marketing", "Management"],
    "College of Medicine": ["General Medicine", "Pharmacy", "Nursing"],
  };

  const [selectedInstitute, setSelectedInstitute] = useState("");

  const [formData, setFormData] = useState<any>({
    // Step 1
    studentID: "",
    institute: "",
    department: "",
    admission: "",
    studyLevel: "",
    firstName: "",
    fatherName: "",
    gFatherName: "",
    sex: "",
    dob: "",
    religion: "",
    ethnic: "",
    nationality: "Ethiopian",
    maritalStatus: "",
    language1: "",
    language2: "",

    // Step 2
    motherFirstName: "",
    motherLastName: "",
    motherJob: "",
    fatherJob: "",
    region: "",
    zone: "",
    woreda: "",
    town: "",
    kebele: "",
    phone: "",
    email: "",
    studentPhone: "",
    studentEmail: "",
    isHandicapped: "No",
    handicapType: "",
    contact1FirstName: "",
    contact1FatherName: "",
    contact1GfName: "",
    contact1Region: "",
    contact1Mobile: "",
    contact1Relation: "",

    // Step 3 - EDUCATIONAL INFORMATION
    enrolledBefore: "No", // "Yes" or "No"
    postSecondaryEducation: [
      {
        institutionName: "",
        country: "",
        fromEC: "",
        toEC: "",
        fromGC: "",
        toGC: "",
        cgpaEarned: "",
        maxCgpa: "",
        award: "",
      },
    ],
    secondarySchools: [
      {
        gradeLevel: "12TH",
        yearEC: "",
        schoolName: "",
        category: "", // GOVERNMENTAL, PRIVATE, PUBLIC, RELIGIOUS
        region: "",
        zone: "",
        woreda: "",
        town: "",
      },
      {
        gradeLevel: "11TH",
        yearEC: "",
        schoolName: "",
        category: "",
        region: "",
        zone: "",
        woreda: "",
        town: "",
      },
      {
        gradeLevel: "10TH",
        yearEC: "",
        schoolName: "",
        category: "",
        region: "",
        zone: "",
        woreda: "",
        town: "",
      },
    ],
    grade12result: "",
    stream: "",

    // Step 4
    sponsor: "",
    sponsorName: "",
    sponsorRegion: "",
    sponsorZone: "",
    sponsorWoreda: "",
    sponsorEmail: "",
    sponsorURL: "",

    // Step 5
    signed: false,
    studentPhoto: null,
    educationDocs: {
      degree: null,
      diploma: null,
      highSchoolTranscript: null,
      grade12th: null,
    },
    // Step 6
    status: "pending",
  });

  // Validation functions

  const validateStep0 = () => {
    const newErrors: { [key: string]: string } = {};
    // First Step
    if (!formData.institute) newErrors.institute = "Institute is required.";
    if (!formData.department) newErrors.department = "Department is required.";
    if (!formData.admission)
      newErrors.admission = "Admission type is required.";
    if (!formData.studyLevel) newErrors.studyLevel = "Study level is required.";
    if (!formData.firstName) newErrors.firstName = "First name is required.";
    if (!formData.fatherName) newErrors.fatherName = "Father name is required.";
    if (!formData.gFatherName)
      newErrors.gFatherName = "Grandfather name is required.";
    if (!formData.sex) newErrors.sex = "Gender is required.";
    if (!formData.dob) newErrors.dob = "Date of birth is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep1 = () => {
    const newErrors: { [key: string]: string } = {};
    // Second Step
    if (!formData.motherFirstName)
      newErrors.motherFirstName = "Mother's first name is required.";
    if (!formData.motherLastName)
      newErrors.motherLastName = "Mother's last name is required.";
    if (!formData.motherJob) newErrors.motherJob = "Mother's job is required.";
    if (!formData.fatherJob) newErrors.fatherJob = "Father's job is required.";
    if (!formData.studentPhone)
      newErrors.studentPhone = "Student phone number is required.";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!formData.studentEmail)
      newErrors.studentEmail = "Student email is required.";
    else if (!emailRegex.test(formData.studentEmail)) {
      newErrors.studentEmail =
        "Please enter a valid email address (e.g., example@mail.com).";
    }
    if (!formData.region) newErrors.region = "Region is required.";
    if (!formData.zone) newErrors.zone = "Zone is required.";
    if (!formData.woreda) newErrors.woreda = "Woreda is required.";
    if (!formData.phone) newErrors.phone = "Phone number is required.";
    if (!formData.contact1FirstName)
      newErrors.contact1FirstName = "Contact first name is required.";
    if (!formData.contact1FatherName)
      newErrors.contact1FatherName = "Contact father name is required.";
    if (!formData.contact1GfName)
      newErrors.contact1GfName = "Contact grandfather name is required.";
    if (!formData.contact1Region)
      newErrors.contact1Region = "Contact region is required.";
    if (!formData.contact1Mobile)
      newErrors.contact1Mobile = "Contact mobile number is required.";
    if (!formData.contact1Relation)
      newErrors.contact1Relation = "Contact relation is required.";
    if (formData.isHandicapped === "Yes" && !formData.handicapType)
      newErrors.handicapType = "Handicap type is required.";
    if (!formData.isHandicapped)
      newErrors.isHandicapped = "Handicapped status is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Step 2: Educational Information
  const validateStep2 = () => {
    const newErrors: { [key: string]: string } = {};
    // Educational Information
    if (!formData.enrolledBefore)
      newErrors.enrolledBefore = "Enrolled before is required.";
    if (formData.enrolledBefore === "Yes") {
      formData.postSecondaryEducation.forEach((edu, index) => {
        if (!edu.institutionName)
          newErrors[`institutionName_${index}`] =
            "Institution name is required.";
        if (!edu.country)
          newErrors[`country_${index}`] = "Country is required.";
        if (!edu.cgpaEarned)
          newErrors[`cgpaEarned_${index}`] = "CGPA earned is required.";
      });
    }

    if (!formData.stream) newErrors.stream = "Preparatory stream is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Step 4: Declaration
  const validateStep4 = () => {
    const newErrors: { [key: string]: string } = {};
    // Declaration
    if (!formData.signed) newErrors.signed = "Signature is required.";
    // Uploaded files
    if (!formData.studentPhoto)
      newErrors.studentPhoto = "Student photo is required.";
    if (!formData.educationDocs.degree)
      newErrors.degree = "Degree document is required.";
    if (!formData.educationDocs.highSchoolTranscript)
      newErrors.highSchoolTranscript = "High school transcript is required.";
    if (!formData.educationDocs.grade12result)
      newErrors.grade12result = "Grade 12th is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //   Generate Ethiopian Year Suffix
  const getEthiopianYearSuffix = (): string => {
    const date = new Date();
    const gYear = date.getFullYear();
    const gMonth = date.getMonth() + 1;
    const ethYear =
      gMonth < 9 || (gMonth === 9 && date.getDate() < 11)
        ? gYear - 8
        : gYear - 7;
    return String(ethYear).slice(-2);
  };

  // Generate Student ID

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

    // Fetch all existing students whose IDs start with this prefix and yearSuffix
    const studentsRef = ref(rtdb, `students`);
    const snapshot = await get(studentsRef);

    // Find all student IDs matching the pattern (e.g., R_XXXX_17)
    let nextNumber = 1;
    if (snapshot.exists()) {
      const students = snapshot.val() || {};
      const regex = new RegExp(`^${prefix}_(\\d{4})_${yearSuffix}$`);
      const matchingIDs = Object.keys(students)
        .map((id) => {
          const match = id.match(regex);
          return match ? parseInt(match[1], 10) : null;
        })
        .filter((n) => n !== null) as number[];
      if (matchingIDs.length > 0) {
        nextNumber = Math.max(...matchingIDs) + 1;
      }
    }

    const paddedID = String(nextNumber).padStart(4, "0");
    return `${prefix}/${paddedID}/${yearSuffix}`;
  };

  // Generate Password
  const generatePassword = (): string => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    return Array.from(
      { length: 8 },
      () => chars[Math.floor(Math.random() * chars.length)]
    ).join("");
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type, checked, files } = e.target;
    if (name === "institute") {
      setSelectedInstitute(value);
      setFormData((prev) => ({
        ...prev,
        department: "", // reset department on institute change
      }));
    }
    // Remove error as user types
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });

    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files?.[0] || null }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (name === "admission") {
      const studentID = generateStudentID(value);
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        studentID,
      }));
    }
  };

  const next = () => {
    if (step === 0) {
      if (!validateStep0()) return;
    } else if (step === 1) {
      if (!validateStep1()) return;
    } else if (step === 2) {
      if (!validateStep2()) return;
    }

    setStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const back = () => setStep((prev) => Math.max(prev - 1, 0));

  // Generate Ethiopian Year for the Academic Year
  // This function calculates the Ethiopian year based on the current date.
  const EthioYYYY = (): string => {
    const date = new Date();
    const gYear = date.getFullYear();
    const gMonth = date.getMonth() + 1;
    const ethYear =
      gMonth < 9 || (gMonth === 9 && date.getDate() < 11)
        ? gYear - 8
        : gYear - 7;
    return String(ethYear);
  };

  //   Submit the form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const password = generatePassword();
    const hashedPassword = await bcrypt.hash(password, 10);

    if (!formData.admission) {
      alert("Admission type is required to generate Student ID.");
      return;
    }

    const uniqueID = await generateStudentID(formData.admission);

    try {
      // ✅ Save student form data to Realtime DB
      const safeID = uniqueID.replace(/\//g, "_");
      const AcYear = EthioYYYY();
      await set(
        ref(
          rtdb,
          `Post-Graduate-Admission/${formData.institute}/${formData.department}/${AcYear}/${safeID}`
        ),
        {
          ...formData,
          createdAt: new Date().toISOString(),
          studentID: uniqueID,
        }
      );
      // ✅ Save student ID to Realtime DB to avoid duplicates
      await set(ref(rtdb, `students/${safeID}`), {
        createdAt: new Date().toISOString(),
        studentID: uniqueID,
      });
      // ✅ Save login credentials to Firestore
      await addDoc(collection(db, "users"), {
        username: uniqueID,
        password: hashedPassword,
        role: "student",
        email: formData.email,
        name: `${formData.firstName} ${formData.fatherName}`,
        studentID: uniqueID,
        institute: formData.institute,
        department: formData.department,
        academicYear: EthioYYYY(), // custom function from your code
      });

      // send username and password to the user's email
      await fetch("/api/send-credentials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          username: uniqueID,
          password,
          name: `${formData.firstName} ${formData.fatherName}`,
        }),
      });

      alert(
        `Student registered!\nUsername: ${uniqueID}\nPassword: ${password}`
      );
      console.log("Submitting form data:", formData);
      router.push("/admission/success");
    } catch (err) {
      console.error("Submission failed:", err);
      alert("Failed to submit. See console for details.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center ">
        Student Application Form
      </h2>

      {/* Confirmation Modal */}

      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Confirm Submission
            </h3>
            <p className="text-gray-700 mb-4">
              We will use your email to send you a{" "}
              <span className="text-blue-500">Username</span> and{" "}
              <span className="text-blue-500">Password</span> to Login and check
              your application status.
            </p>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700"
                placeholder="Enter your email"
              />
              {!formData.email && (
                <p className="text-red-500 text-sm mt-1">Email is required.</p>
              )}
            </div>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={(e) => {
                  if (!formData.email) return; // Prevent submit if email is empty
                  setShowConfirmModal(false);
                  handleSubmit(e as any);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 0: Personal Info */}
        {step === 0 && (
          <>
            <h2 className=" font-bold text-blue-600 mb-6">
              1. Institute and Department Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Institute */}
              <div>
                <label className="block mb-2 text-gray-700 font-semibold">
                  Institute / School / College{" "}
                  <span className="text-red-500">*</span>
                </label>
                <select
                  name="institute"
                  value={formData.institute}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="" className="text-blue-200">
                    Select Institute
                  </option>
                  {Object.keys(instituteDepartments).map((institute) => (
                    <option key={institute} value={institute}>
                      {institute}
                    </option>
                  ))}
                </select>
                {errors.institute && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.institute}
                  </p>
                )}
              </div>

              {/* Department */}
              <div>
                <label className="block mb-2 text-gray-700 font-semibold">
                  Department / Field of Study{" "}
                  <span className="text-red-500">*</span>
                </label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  disabled={!selectedInstitute}
                  className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100"
                >
                  <option value="" className="text-blue-200">
                    Select Department
                  </option>
                  {selectedInstitute &&
                    instituteDepartments[selectedInstitute].map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                </select>
                {errors.department && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.department}
                  </p>
                )}
              </div>

              {/* Admission Type */}
              <div>
                <label className="block mb-2 text-gray-700 font-semibold">
                  Admission Classification{" "}
                  <span className="text-red-500">*</span>
                </label>
                <select
                  name="admission"
                  value={formData.admission}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="" className="text-blue-200">
                    Select Admission Type
                  </option>
                  <option value="Regular – Full Time">
                    Regular – Full Time
                  </option>
                  <option value="Extension – Weekend">
                    Extension – Weekend
                  </option>
                  <option value="Extension – Night">Extension – Night</option>
                  <option value="Distance">Distance</option>
                  <option value="Summer">Summer</option>
                </select>
                {errors.admission && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.admission}
                  </p>
                )}
              </div>

              {/* Study Level */}
              <div>
                <label className="block mb-2 text-gray-700 font-semibold">
                  Study Level <span className="text-red-500">*</span>
                </label>
                <select
                  name="studyLevel"
                  value={formData.studyLevel}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="" className="text-blue-200">
                    Select Study Level
                  </option>
                  <option value="Post Graduate Diploma">
                    Post Graduate Diploma
                  </option>
                  <option value="Bachelor Degree">Bachelor Degree</option>
                  <option value="Master’s Degree">Master’s Degree</option>
                  <option value="PhD">PhD</option>
                  <option value="Other">Other</option>
                </select>
                {errors.studyLevel && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.studyLevel}
                  </p>
                )}
              </div>
            </div>
            {/* Personal Information */}
            <h2 className=" font-bold text-blue-600 mb-6">
              1.1. Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block mb-2 text-gray-700 font-semibold">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  name="firstName"
                  placeholder="Enter your name"
                  onChange={handleChange}
                  value={formData.firstName}
                  className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>
              <div>
                <label className="block mb-2 text-gray-700 font-semibold">
                  Father Name <span className="text-red-500">*</span>
                </label>
                <input
                  name="fatherName"
                  placeholder="Enter your father's name"
                  onChange={handleChange}
                  value={formData.fatherName}
                  className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700"
                />
                {errors.fatherName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.fatherName}
                  </p>
                )}
              </div>
              <div>
                <label className="block mb-2 text-gray-700 font-semibold">
                  Grand Father Name <span className="text-red-500">*</span>
                </label>
                <input
                  name="gFatherName"
                  placeholder="Enter your grandfather's name"
                  onChange={handleChange}
                  value={formData.gFatherName}
                  className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700"
                />
                {errors.gFatherName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.gFatherName}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block mb-2 text-gray-700 font-semibold">
                  Date of Birth <span className="text-red-500">*</span>
                </label>

                <input
                  name="dob"
                  type="date"
                  placeholder="Date of Birth"
                  onChange={handleChange}
                  value={formData.dob}
                  className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700"
                />
                {errors.dob && (
                  <p className="text-red-500 text-sm mt-1">{errors.dob}</p>
                )}
              </div>
              <div>
                <label className="block mb-2 text-gray-700 font-semibold">
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  name="sex"
                  value={formData.sex}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="" className="text-blue-200">
                    Select Gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                {errors.sex && (
                  <p className="text-red-500 text-sm mt-1">{errors.sex}</p>
                )}
              </div>
            </div>
          </>
        )}

        {/* Step 1: Family Info */}
        {step === 1 && (
          <>
            <h2 className="font-bold text-blue-600 mb-6">
              2. Family Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Mother's First Name */}
              <div>
                <label className="block mb-2 text-gray-700 font-semibold">
                  Mother's First Name <span className="text-red-500">*</span>
                </label>
                <input
                  name="motherFirstName"
                  placeholder="Enter mother's first name"
                  onChange={handleChange}
                  value={formData.motherFirstName}
                  className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700"
                />
                {errors.motherFirstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.motherFirstName}
                  </p>
                )}
              </div>
              {/* Mother's Last Name */}
              <div>
                <label className="block mb-2 text-gray-700 font-semibold">
                  Mother's Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  name="motherLastName"
                  placeholder="Enter mother's last name"
                  onChange={handleChange}
                  value={formData.motherLastName}
                  className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700"
                />
                {errors.motherLastName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.motherLastName}
                  </p>
                )}
              </div>
              {/* Mother's Job */}
              <div>
                <label className="block mb-2 text-gray-700 font-semibold">
                  Mother's Occupation <span className="text-red-500">*</span>
                </label>
                <input
                  name="motherJob"
                  placeholder="Enter mother's occupation"
                  onChange={handleChange}
                  value={formData.motherJob}
                  className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700"
                />
                {errors.motherJob && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.motherJob}
                  </p>
                )}
              </div>
              {/* Father's Job */}
              <div>
                <label className="block mb-2 text-gray-700 font-semibold">
                  Father's Occupation <span className="text-red-500">*</span>
                </label>
                <input
                  name="fatherJob"
                  placeholder="Enter father's occupation"
                  onChange={handleChange}
                  value={formData.fatherJob}
                  className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700"
                />
                {errors.fatherJob && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.fatherJob}
                  </p>
                )}
              </div>
              {/* Student Phone */}
              <div>
                <label className="block mb-2 text-gray-700 font-semibold">
                  Student Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  name="studentPhone"
                  type="tel"
                  autoCapitalize="none"
                  autoComplete="off"
                  placeholder="Enter student phone number"
                  onChange={handleChange}
                  value={formData.studentPhone}
                  className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700"
                />
                {errors.studentPhone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.studentPhone}
                  </p>
                )}
              </div>
              {/* Student Email */}
              <div>
                <label className="block mb-2 text-gray-700 font-semibold">
                  Student Email <span className="text-red-500">*</span>
                </label>
                <input
                  name="studentEmail"
                  placeholder="Enter student email"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="off"
                  onChange={handleChange}
                  value={formData.studentEmail}
                  className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700"
                />
                {errors.studentEmail && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.studentEmail}
                  </p>
                )}
              </div>
            </div>
            <h2 className="font-bold text-blue-600 mb-6 mt-8">
              2.1. Address & Additional Info
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Region */}
              <div>
                <label className="block mb-2 text-gray-700 font-semibold">
                  Region <span className="text-red-500">*</span>
                </label>
                <input
                  name="region"
                  placeholder="Enter region"
                  onChange={handleChange}
                  value={formData.region}
                  className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700"
                />
                {errors.region && (
                  <p className="text-red-500 text-sm mt-1">{errors.region}</p>
                )}
              </div>
              {/* Zone */}
              <div>
                <label className="block mb-2 text-gray-700 font-semibold">
                  Zone <span className="text-red-500">*</span>
                </label>
                <input
                  name="zone"
                  placeholder="Enter zone"
                  onChange={handleChange}
                  value={formData.zone}
                  className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700"
                />
                {errors.zone && (
                  <p className="text-red-500 text-sm mt-1">{errors.zone}</p>
                )}
              </div>
              {/* Woreda */}
              <div>
                <label className="block mb-2 text-gray-700 font-semibold">
                  Woreda <span className="text-red-500">*</span>
                </label>
                <input
                  name="woreda"
                  placeholder="Enter woreda"
                  onChange={handleChange}
                  value={formData.woreda}
                  className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700"
                />
                {errors.woreda && (
                  <p className="text-red-500 text-sm mt-1">{errors.woreda}</p>
                )}
              </div>
              {/* Town */}
              <div>
                <label className="block mb-2 text-gray-700 font-semibold">
                  Town
                </label>
                <input
                  name="town"
                  placeholder="Enter town"
                  onChange={handleChange}
                  value={formData.town}
                  className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700"
                />
              </div>
              {/* Kebele */}
              <div>
                <label className="block mb-2 text-gray-700 font-semibold">
                  Kebele
                </label>
                <input
                  name="kebele"
                  placeholder="Enter kebele"
                  onChange={handleChange}
                  value={formData.kebele}
                  className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700"
                />
              </div>
              {/* Phone */}
              <div>
                <label className="block mb-2 text-gray-700 font-semibold">
                  Parent/Guardian Phone <span className="text-red-500">*</span>
                </label>
                <input
                  name="phone"
                  type="tel"
                  autoCapitalize="none"
                  autoComplete="off"
                  spellCheck="false"
                  placeholder="Enter phone number"
                  onChange={handleChange}
                  value={formData.phone}
                  className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>
              {/* Email */}
              <div>
                <label className="block mb-2 text-gray-700 font-semibold">
                  Parent/Guardian Email
                </label>
                <input
                  name="email"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="off"
                  spellCheck="false"
                  placeholder="Enter email"
                  onChange={handleChange}
                  value={formData.email}
                  className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700"
                />
              </div>
              {/* Handicapped */}
              <div>
                <label className="block mb-2 text-gray-700 font-semibold">
                  Are you handicapped?
                </label>
                <select
                  name="isHandicapped"
                  value={formData.isHandicapped}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700"
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
                {errors.isHandicapped && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.isHandicapped}
                  </p>
                )}
              </div>
              {/* Handicap Type */}
              {formData.isHandicapped === "Yes" && (
                <div>
                  <label className="block mb-2 text-gray-700 font-semibold">
                    Handicap Type <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="handicapType"
                    placeholder="Specify handicap type"
                    onChange={handleChange}
                    value={formData.handicapType}
                    className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700"
                  />
                  {errors.handicapType && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.handicapType}
                    </p>
                  )}
                </div>
              )}
            </div>
            <h2 className="font-bold text-blue-600 mb-6 mt-8">
              2.2. Emergency Contact
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Contact 1 First Name */}
              <div>
                <label className="block mb-2 text-gray-700 font-semibold">
                  Contact First Name <span className="text-red-500">*</span>
                </label>
                <input
                  name="contact1FirstName"
                  placeholder="Enter contact first name"
                  onChange={handleChange}
                  value={formData.contact1FirstName}
                  className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700"
                />
                {errors.contact1FirstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.contact1FirstName}
                  </p>
                )}
              </div>
              {/* Contact 1 Father Name */}
              <div>
                <label className="block mb-2 text-gray-700 font-semibold">
                  Contact Father Name <span className="text-red-500">*</span>
                </label>
                <input
                  name="contact1FatherName"
                  placeholder="Enter contact father name"
                  onChange={handleChange}
                  value={formData.contact1FatherName}
                  className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700"
                />
                {errors.contact1FatherName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.contact1FatherName}
                  </p>
                )}
              </div>
              {/* Contact 1 Grandfather Name */}
              <div>
                <label className="block mb-2 text-gray-700 font-semibold">
                  Contact Grandfather Name{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  name="contact1GfName"
                  placeholder="Enter contact grandfather name"
                  onChange={handleChange}
                  value={formData.contact1GfName}
                  className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700"
                />
                {errors.contact1GfName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.contact1GfName}
                  </p>
                )}
              </div>
              {/* Contact 1 Region */}
              <div>
                <label className="block mb-2 text-gray-700 font-semibold">
                  Contact Region <span className="text-red-500">*</span>
                </label>
                <input
                  name="contact1Region"
                  placeholder="Enter contact region"
                  onChange={handleChange}
                  value={formData.contact1Region}
                  className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700"
                />
                {errors.contact1Region && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.contact1Region}
                  </p>
                )}
              </div>
              {/* Contact 1 Mobile */}
              <div>
                <label className="block mb-2 text-gray-700 font-semibold">
                  Contact Mobile <span className="text-red-500">*</span>
                </label>
                <input
                  name="contact1Mobile"
                  placeholder="Enter contact mobile"
                  onChange={handleChange}
                  value={formData.contact1Mobile}
                  className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700"
                />
                {errors.contact1Mobile && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.contact1Mobile}
                  </p>
                )}
              </div>
              {/* Contact 1 Relation */}
              <div>
                <label className="block mb-2 text-gray-700 font-semibold">
                  Relation to Student <span className="text-red-500">*</span>
                </label>
                <input
                  name="contact1Relation"
                  placeholder="Enter relation"
                  onChange={handleChange}
                  value={formData.contact1Relation}
                  className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700"
                />
                {errors.contact1Relation && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.contact1Relation}
                  </p>
                )}
              </div>
            </div>
          </>
        )}

        {/* Step 2: Education Info */}
        {step === 2 && (
          <>
            <h2 className="text-2xl font-bold text-blue-600 mb-6">
              3. Education Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Enrolled Before */}
              <div>
                <label className="block mb-2 text-gray-700 font-semibold">
                  Have you enrolled in higher education before?
                </label>
                <select
                  name="enrolledBefore"
                  value={formData.enrolledBefore}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700"
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
            </div>

            {/* Post-Secondary Education Table (if enrolled before) */}
            {formData.enrolledBefore === "Yes" && (
              <div className="mt-6">
                <h3 className="font-semibold text-blue-500 mb-2">
                  Post-Secondary Education History{" "}
                  <span className="text-red-500">*</span>
                </h3>
                {formData.postSecondaryEducation.map(
                  (edu: any, idx: number) => (
                    <div
                      key={idx}
                      className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4"
                    >
                      <input
                        name={`postSecondaryEducation[${idx}].institutionName`}
                        placeholder="Institution Name *"
                        value={edu.institutionName}
                        onChange={(e) => {
                          const value = e.target.value;
                          setFormData((prev: any) => {
                            const arr = [...prev.postSecondaryEducation];
                            arr[idx].institutionName = value;
                            return { ...prev, postSecondaryEducation: arr };
                          });
                        }}
                        className="p-2 rounded-lg border-2 border-blue-300 text-gray-700"
                      />
                      <input
                        name={`postSecondaryEducation[${idx}].country`}
                        placeholder="Country *"
                        value={edu.country}
                        onChange={(e) => {
                          const value = e.target.value;
                          setFormData((prev: any) => {
                            const arr = [...prev.postSecondaryEducation];
                            arr[idx].country = value;
                            return { ...prev, postSecondaryEducation: arr };
                          });
                        }}
                        className="p-2 rounded-lg border-2 border-blue-300 text-gray-700"
                      />
                      <input
                        name={`postSecondaryEducation[${idx}].fromEC`}
                        placeholder="From (E.C.) "
                        value={edu.fromEC}
                        onChange={(e) => {
                          const value = e.target.value;
                          setFormData((prev: any) => {
                            const arr = [...prev.postSecondaryEducation];
                            arr[idx].fromEC = value;
                            return { ...prev, postSecondaryEducation: arr };
                          });
                        }}
                        className="p-2 rounded-lg border-2 border-blue-300 text-gray-700"
                      />
                      <input
                        name={`postSecondaryEducation[${idx}].toEC`}
                        placeholder="To (E.C.) "
                        value={edu.toEC}
                        onChange={(e) => {
                          const value = e.target.value;
                          setFormData((prev: any) => {
                            const arr = [...prev.postSecondaryEducation];
                            arr[idx].toEC = value;
                            return { ...prev, postSecondaryEducation: arr };
                          });
                        }}
                        className="p-2 rounded-lg border-2 border-blue-300 text-gray-700"
                      />
                      <input
                        name={`postSecondaryEducation[${idx}].fromGC`}
                        placeholder="From (G.C.)"
                        value={edu.fromGC}
                        onChange={(e) => {
                          const value = e.target.value;
                          setFormData((prev: any) => {
                            const arr = [...prev.postSecondaryEducation];
                            arr[idx].fromGC = value;
                            return { ...prev, postSecondaryEducation: arr };
                          });
                        }}
                        className="p-2 rounded-lg border-2 border-blue-300 text-gray-700"
                      />
                      <input
                        name={`postSecondaryEducation[${idx}].toGC`}
                        placeholder="To (G.C.)"
                        value={edu.toGC}
                        onChange={(e) => {
                          const value = e.target.value;
                          setFormData((prev: any) => {
                            const arr = [...prev.postSecondaryEducation];
                            arr[idx].toGC = value;
                            return { ...prev, postSecondaryEducation: arr };
                          });
                        }}
                        className="p-2 rounded-lg border-2 border-blue-300 text-gray-700"
                      />
                      <input
                        name={`postSecondaryEducation[${idx}].cgpaEarned`}
                        placeholder="CGPA Earned *"
                        value={edu.cgpaEarned}
                        onChange={(e) => {
                          const value = e.target.value;
                          setFormData((prev: any) => {
                            const arr = [...prev.postSecondaryEducation];
                            arr[idx].cgpaEarned = value;
                            return { ...prev, postSecondaryEducation: arr };
                          });
                        }}
                        className="p-2 rounded-lg border-2 border-blue-300 text-gray-700"
                      />
                      <input
                        name={`postSecondaryEducation[${idx}].maxCgpa`}
                        placeholder="Max CGPA"
                        value={edu.maxCgpa}
                        onChange={(e) => {
                          const value = e.target.value;
                          setFormData((prev: any) => {
                            const arr = [...prev.postSecondaryEducation];
                            arr[idx].maxCgpa = value;
                            return { ...prev, postSecondaryEducation: arr };
                          });
                        }}
                        className="p-2 rounded-lg border-2 border-blue-300 text-gray-700"
                      />
                      <input
                        name={`postSecondaryEducation[${idx}].award`}
                        placeholder="Award"
                        value={edu.award}
                        onChange={(e) => {
                          const value = e.target.value;
                          setFormData((prev: any) => {
                            const arr = [...prev.postSecondaryEducation];
                            arr[idx].award = value;
                            return { ...prev, postSecondaryEducation: arr };
                          });
                        }}
                        className="p-2 rounded-lg border-2 border-blue-300 text-gray-700"
                      />
                      {/* Remove button */}
                      {formData.postSecondaryEducation.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            setFormData((prev: any) => ({
                              ...prev,
                              postSecondaryEducation:
                                prev.postSecondaryEducation.filter(
                                  (_: any, i: number) => i !== idx
                                ),
                            }));
                          }}
                          className="text-red-500 font-bold"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  )
                )}
                <button
                  type="button"
                  onClick={() => {
                    setFormData((prev: any) => ({
                      ...prev,
                      postSecondaryEducation: [
                        ...prev.postSecondaryEducation,
                        {
                          institutionName: "",
                          country: "",
                          fromEC: "",
                          toEC: "",
                          fromGC: "",
                          toGC: "",
                          cgpaEarned: "",
                          maxCgpa: "",
                          award: "",
                        },
                      ],
                    }));
                  }}
                  className="mt-2 px-4 py-2 bg-blue-100 text-blue-700 rounded"
                >
                  Add More
                </button>
              </div>
            )}

            {/* Secondary School Information */}
            <div className="mt-8">
              <h3 className="font-semibold text-blue-500 mb-2">
                Secondary School Information (Grades 10-12)
              </h3>
              {formData.secondarySchools.map((school: any, idx: number) => (
                <details
                  key={idx}
                  className="mb-4 bg-white rounded-xl shadow border border-blue-200"
                  open={idx === 0}
                >
                  <summary className="flex items-center cursor-pointer px-6 py-4 select-none">
                    {/* <span className="inline-flex items-center justify-center w-10 h-8 rounded  bg-blue-500 text-white font-bold mr-3">
                            {school.gradeLevel}
                        </span> */}
                    <span className="font-semibold text-blue-700">
                      Grade {school.gradeLevel}
                    </span>
                    <span className="ml-auto text-blue-400 text-sm">
                      (Click to expand/collapse)
                    </span>
                  </summary>
                  <div className="px-6 pb-6 pt-2">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-gray-700 font-semibold mb-1">
                          Year (E.C.)
                        </label>
                        <input
                          name={`secondarySchools[${idx}].yearEC`}
                          placeholder="Year (E.C.)"
                          value={school.yearEC}
                          onChange={(e) => {
                            const value = e.target.value;
                            setFormData((prev: any) => {
                              const arr = [...prev.secondarySchools];
                              arr[idx].yearEC = value;
                              return { ...prev, secondarySchools: arr };
                            });
                          }}
                          className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700 focus:ring-2 focus:ring-blue-400"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-1">
                          School Name
                        </label>
                        <input
                          name={`secondarySchools[${idx}].schoolName`}
                          placeholder="School Name"
                          value={school.schoolName}
                          onChange={(e) => {
                            const value = e.target.value;
                            setFormData((prev: any) => {
                              const arr = [...prev.secondarySchools];
                              arr[idx].schoolName = value;
                              return { ...prev, secondarySchools: arr };
                            });
                          }}
                          className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700 focus:ring-2 focus:ring-blue-400"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-1">
                          Category
                        </label>
                        <select
                          name={`secondarySchools[${idx}].category`}
                          value={school.category}
                          onChange={(e) => {
                            const value = e.target.value;
                            setFormData((prev: any) => {
                              const arr = [...prev.secondarySchools];
                              arr[idx].category = value;
                              return { ...prev, secondarySchools: arr };
                            });
                          }}
                          className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700 focus:ring-2 focus:ring-blue-400"
                        >
                          <option value="">Select</option>
                          {secondarySchoolCategories.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-1">
                          Region
                        </label>
                        <input
                          name={`secondarySchools[${idx}].region`}
                          placeholder="Region"
                          value={school.region}
                          onChange={(e) => {
                            const value = e.target.value;
                            setFormData((prev: any) => {
                              const arr = [...prev.secondarySchools];
                              arr[idx].region = value;
                              return { ...prev, secondarySchools: arr };
                            });
                          }}
                          className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700 focus:ring-2 focus:ring-blue-400"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-1">
                          Zone
                        </label>
                        <input
                          name={`secondarySchools[${idx}].zone`}
                          placeholder="Zone"
                          value={school.zone}
                          onChange={(e) => {
                            const value = e.target.value;
                            setFormData((prev: any) => {
                              const arr = [...prev.secondarySchools];
                              arr[idx].zone = value;
                              return { ...prev, secondarySchools: arr };
                            });
                          }}
                          className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700 focus:ring-2 focus:ring-blue-400"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-1">
                          Woreda
                        </label>
                        <input
                          name={`secondarySchools[${idx}].woreda`}
                          placeholder="Woreda"
                          value={school.woreda}
                          onChange={(e) => {
                            const value = e.target.value;
                            setFormData((prev: any) => {
                              const arr = [...prev.secondarySchools];
                              arr[idx].woreda = value;
                              return { ...prev, secondarySchools: arr };
                            });
                          }}
                          className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700 focus:ring-2 focus:ring-blue-400"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-1">
                          Town
                        </label>
                        <input
                          name={`secondarySchools[${idx}].town`}
                          placeholder="Town"
                          value={school.town}
                          onChange={(e) => {
                            const value = e.target.value;
                            setFormData((prev: any) => {
                              const arr = [...prev.secondarySchools];
                              arr[idx].town = value;
                              return { ...prev, secondarySchools: arr };
                            });
                          }}
                          className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700 focus:ring-2 focus:ring-blue-400"
                        />
                      </div>
                    </div>
                  </div>
                </details>
              ))}
            </div>

            {/* Grade 12th Results */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div>
                <label className="block mb-2 text-gray-700 font-semibold">
                  G12th Result
                </label>
                <input
                  name="grade12result"
                  placeholder="Grade 12 Result"
                  onChange={handleChange}
                  value={formData.grade12result}
                  className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700"
                />
              </div>
              <div>
                <label className="block mb-2 text-gray-700 font-semibold">
                  Preparatory School Stream{" "}
                  <span className="text-red-500">*</span>
                </label>
                <select
                  name="stream"
                  value={formData.stream}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700"
                >
                  <option value="">Select Stream</option>
                  {preparatoryStreams.map((stream) => (
                    <option key={stream} value={stream}>
                      {stream}
                    </option>
                  ))}
                </select>
                {errors.stream && (
                  <p className="text-red-500 text-sm mt-1">{errors.stream}</p>
                )}
              </div>
            </div>
          </>
        )}

        {/* Step 3: Sponsor Info */}
        {step === 3 && (
          <>
            <h2 className="text-2xl font-bold text-blue-600 mb-6">
              4. Sponsor Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Sponsor */}
              <div>
                <label className="block mb-2 text-gray-700 font-semibold">
                  Sponsor
                </label>
                <select
                  name="sponsor"
                  value={formData.sponsor}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700"
                >
                  <option value="">Select Sponsor</option>
                  <option value="MOE">MOE</option>
                  <option value="Self">Self</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              {/* Sponsor Name (only if Other) */}
              {formData.sponsor === "Other" && (
                <div>
                  <label className="block mb-2 text-gray-700 font-semibold">
                    Organization Name
                  </label>
                  <input
                    name="sponsorName"
                    placeholder="Organization Name"
                    onChange={handleChange}
                    value={formData.sponsorName}
                    className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700"
                  />
                </div>
              )}
              {/* Sponsor Region */}
              <div>
                <label className="block mb-2 text-gray-700 font-semibold">
                  Sponsor Region
                </label>
                <input
                  name="sponsorRegion"
                  placeholder="Sponsor Region"
                  onChange={handleChange}
                  value={formData.sponsorRegion}
                  className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700"
                />
              </div>
              {/* Sponsor Zone */}
              <div>
                <label className="block mb-2 text-gray-700 font-semibold">
                  Sponsor Zone
                </label>
                <input
                  name="sponsorZone"
                  placeholder="Sponsor Zone"
                  onChange={handleChange}
                  value={formData.sponsorZone}
                  className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700"
                />
              </div>

              {/* Sponsor Email */}
              <div>
                <label className="block mb-2 text-gray-700 font-semibold">
                  Sponsor Email
                </label>
                <input
                  name="sponsorEmail"
                  placeholder="Sponsor Email"
                  onChange={handleChange}
                  value={formData.sponsorEmail}
                  className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700"
                />
              </div>
              {/* Sponsor URL */}
              <div>
                <label className="block mb-2 text-gray-700 font-semibold">
                  Sponsor Website (URL)
                </label>
                <input
                  name="sponsorURL"
                  placeholder="Sponsor Website"
                  onChange={handleChange}
                  value={formData.sponsorURL}
                  className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700"
                />
              </div>
            </div>
          </>
        )}

        {/* Step 4: Declaration & Upload */}
        {step === 4 && (
          <>
            <h2 className="text-2xl font-bold text-blue-600 mb-6">
              5. Declaration & Uploads
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Student Photo */}
              <div>
                <label className="block mb-2 text-gray-700 font-semibold">
                  Upload Student Photo <span className="text-red-500">*</span>
                </label>
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-blue-300 rounded-lg p-6 w-fit cursor-pointer hover:bg-blue-50 transition">
                  <svg
                    className="w-12 h-12 text-blue-400 mb-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 16v-8m0 0l-3 3m3-3l3 3M21 16.5V19a2 2 0 01-2 2H5a2 2 0 01-2-2v-2.5M16 7V5a2 2 0 00-2-2H10a2 2 0 00-2 2v2"
                    />
                  </svg>
                  <span className="text-blue-600 font-medium mb-1">
                    Click to upload a photo
                  </span>
                  <span className="text-gray-400 text-xs mb-2">
                    (JPG, PNG, or GIF, max 5MB)
                  </span>
                  <input
                    type="file"
                    name="studentPhoto"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      setFormData((prev: any) => ({
                        ...prev,
                        studentPhoto: file,
                      }));
                      setErrors((prev) => {
                        const newErrors = { ...prev };
                        delete newErrors.studentPhoto;
                        return newErrors;
                      });
                    }}
                    className="hidden"
                  />
                  {formData.studentPhoto && (
                    <div className="mt-2 text-sm text-green-600 flex flex-col items-center">
                      <span>Selected: {formData.studentPhoto.name}</span>
                      <img
                        src={URL.createObjectURL(formData.studentPhoto)}
                        alt="Student Preview"
                        className="mt-2 rounded shadow max-h-40 max-w-xs object-contain border border-blue-200"
                      />
                    </div>
                  )}
                </label>
                {errors.studentPhoto && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.studentPhoto}
                  </p>
                )}
              </div>
              {/* Education Docs */}
              <div>
                <label className="block mb-2 text-gray-700 font-semibold">
                  Upload Education Documents{" "}
                  <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  <div>
                    <label className="block text-gray-600 text-sm mb-1">
                      Degree <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="file"
                      name="degree"
                      onChange={(e) => {
                        setFormData((prev: any) => ({
                          ...prev,
                          educationDocs: {
                            ...prev.educationDocs,
                            degree: e.target.files?.[0] || null,
                          },
                        }));
                        setErrors((prev) => {
                          const newErrors = { ...prev };
                          delete newErrors.degree;
                          return newErrors;
                        });
                      }}
                      className="w-full p-2 rounded-lg border-2 border-blue-200 text-gray-700 bg-white"
                    />
                    {formData.educationDocs?.degree && (
                      <span className="text-green-600 text-xs">
                        Selected: {formData.educationDocs.degree.name}
                      </span>
                    )}
                    {errors.degree && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.degree}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-600 text-sm mb-1">
                      Diploma (if any)
                    </label>
                    <input
                      type="file"
                      name="diploma"
                      onChange={(e) => {
                        setFormData((prev: any) => ({
                          ...prev,
                          educationDocs: {
                            ...prev.educationDocs,
                            diploma: e.target.files?.[0] || null,
                          },
                        }));
                      }}
                      className="w-full p-2 rounded-lg border-2 border-blue-200 text-gray-700 bg-white"
                    />
                    {formData.educationDocs?.diploma && (
                      <span className="text-green-600 text-xs">
                        Selected: {formData.educationDocs.diploma.name}
                      </span>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-600 text-sm mb-1">
                      High School Transcript{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="file"
                      name="highSchoolTranscript"
                      onChange={(e) => {
                        setFormData((prev: any) => ({
                          ...prev,
                          educationDocs: {
                            ...prev.educationDocs,
                            highSchoolTranscript: e.target.files?.[0] || null,
                          },
                        }));
                        setErrors((prev) => {
                          const newErrors = { ...prev };
                          delete newErrors.highSchoolTranscript;
                          return newErrors;
                        });
                      }}
                      className="w-full p-2 rounded-lg border-2 border-blue-200 text-gray-700 bg-white"
                    />
                    {formData.educationDocs?.highSchoolTranscript && (
                      <span className="text-green-600 text-xs">
                        Selected:{" "}
                        {formData.educationDocs.highSchoolTranscript.name}
                      </span>
                    )}
                    {errors.highSchoolTranscript && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.highSchoolTranscript}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-600 text-sm mb-1">
                      12th Grade Certificate
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="file"
                      name="grade12result"
                      onChange={(e) => {
                        setFormData((prev: any) => ({
                          ...prev,
                          educationDocs: {
                            ...prev.educationDocs,
                            grade12result: e.target.files?.[0] || null,
                          },
                        }));
                        setErrors((prev) => {
                          const newErrors = { ...prev };
                          delete newErrors.grade12result;
                          return newErrors;
                        });
                      }}
                      className="w-full p-2 rounded-lg border-2 border-blue-200 text-gray-700 bg-white"
                    />
                    {formData.educationDocs?.grade12result && (
                      <span className="text-green-600 text-xs">
                        Selected: {formData.educationDocs.grade12result.name}
                      </span>
                    )}
                    {errors.grade12result && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.grade12result}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Declaration */}
            <div className="mt-6">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="signed"
                  checked={formData.signed}
                  onChange={handleChange}
                  className="accent-blue-500"
                />
                <span className="text-gray-700">
                  I declare all information is correct and complete.{" "}
                  <span className="text-red-500">*</span>
                </span>
              </label>
              {errors.signed && (
                <p className="text-red-500 text-sm mt-1">{errors.signed}</p>
              )}
            </div>
          </>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-6">
          <button
            type="button"
            onClick={back}
            disabled={step === 0}
            className="px-4 py-3 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 disabled:opacity-50"
          >
            Back
          </button>

          {step === steps.length - 1 ? (
            <button
              type="button"
              onClick={() => {
                if (!validateStep4()) return; // Validate before submission
                setShowConfirmModal(true);
              }}
              className="px-6 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold"
            >
              Submit
            </button>
          ) : (
            <button
              type="button"
              onClick={next}
              className="px-6 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold"
            >
              Next
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
