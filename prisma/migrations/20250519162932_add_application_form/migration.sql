-- CreateTable
CREATE TABLE "ApplicationForm" (
    "id" TEXT NOT NULL,
    "studentID" TEXT NOT NULL,
    "userId" TEXT,
    "institute" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "admission" TEXT NOT NULL,
    "studyLevel" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "fatherName" TEXT NOT NULL,
    "gFatherName" TEXT NOT NULL,
    "sex" TEXT NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "religion" TEXT,
    "ethnic" TEXT,
    "nationality" TEXT NOT NULL,
    "maritalStatus" TEXT,
    "language1" TEXT,
    "language2" TEXT,
    "motherFirstName" TEXT NOT NULL,
    "motherLastName" TEXT NOT NULL,
    "motherJob" TEXT NOT NULL,
    "fatherJob" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "zone" TEXT NOT NULL,
    "woreda" TEXT NOT NULL,
    "town" TEXT,
    "kebele" TEXT,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "studentPhone" TEXT NOT NULL,
    "studentEmail" TEXT NOT NULL,
    "isHandicapped" BOOLEAN NOT NULL,
    "handicapType" TEXT,
    "contact1FirstName" TEXT NOT NULL,
    "contact1FatherName" TEXT NOT NULL,
    "contact1GfName" TEXT NOT NULL,
    "contact1Region" TEXT NOT NULL,
    "contact1Mobile" TEXT NOT NULL,
    "contact1Relation" TEXT NOT NULL,
    "enrolledBefore" BOOLEAN NOT NULL,
    "grade12result" TEXT,
    "stream" TEXT NOT NULL,
    "sponsor" TEXT,
    "sponsorName" TEXT,
    "sponsorRegion" TEXT,
    "sponsorZone" TEXT,
    "sponsorWoreda" TEXT,
    "sponsorEmail" TEXT,
    "sponsorURL" TEXT,
    "signed" BOOLEAN NOT NULL,
    "studentPhotoUrl" TEXT,
    "degreeUrl" TEXT,
    "diplomaUrl" TEXT,
    "highSchoolTranscriptUrl" TEXT,
    "grade12ResultUrl" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "academicYear" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ApplicationForm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SecondarySchool" (
    "id" TEXT NOT NULL,
    "applicationFormId" TEXT NOT NULL,
    "gradeLevel" TEXT NOT NULL,
    "yearEC" TEXT NOT NULL,
    "schoolName" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "zone" TEXT NOT NULL,
    "woreda" TEXT NOT NULL,
    "town" TEXT NOT NULL,

    CONSTRAINT "SecondarySchool_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostSecondaryEducation" (
    "id" TEXT NOT NULL,
    "applicationFormId" TEXT NOT NULL,
    "institutionName" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "fromEC" TEXT,
    "toEC" TEXT,
    "fromGC" TEXT,
    "toGC" TEXT,
    "cgpaEarned" TEXT NOT NULL,
    "maxCgpa" TEXT,
    "award" TEXT,

    CONSTRAINT "PostSecondaryEducation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ApplicationForm_studentID_key" ON "ApplicationForm"("studentID");

-- AddForeignKey
ALTER TABLE "SecondarySchool" ADD CONSTRAINT "SecondarySchool_applicationFormId_fkey" FOREIGN KEY ("applicationFormId") REFERENCES "ApplicationForm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostSecondaryEducation" ADD CONSTRAINT "PostSecondaryEducation_applicationFormId_fkey" FOREIGN KEY ("applicationFormId") REFERENCES "ApplicationForm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
