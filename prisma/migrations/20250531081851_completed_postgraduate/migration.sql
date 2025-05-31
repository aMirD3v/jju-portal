-- CreateTable
CREATE TABLE "StudentApplicationPostGraduate" (
    "id" TEXT NOT NULL,
    "studentID" TEXT NOT NULL,
    "institute" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "admission" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "fatherName" TEXT NOT NULL,
    "gFatherName" TEXT NOT NULL,
    "sex" TEXT NOT NULL,
    "dob" TIMESTAMP(3),
    "region" TEXT NOT NULL,
    "zone" TEXT NOT NULL,
    "woreda" TEXT NOT NULL,
    "studentPhone" TEXT NOT NULL,
    "studentEmail" TEXT NOT NULL,
    "academicYear" TEXT NOT NULL,
    "enrolledBefore" TEXT NOT NULL,
    "sponsor" TEXT,
    "sponsorName" TEXT,
    "sponsorRegion" TEXT,
    "sponsorZone" TEXT,
    "sponsorWoreda" TEXT,
    "sponsorEmail" TEXT,
    "sponsorURL" TEXT,
    "signed" BOOLEAN NOT NULL,
    "studentPhotoUrl" TEXT,
    "diplomaUrl" TEXT,
    "highSchoolUrl" TEXT,
    "grade12Url" TEXT,
    "grade10Url" TEXT,
    "grade8Url" TEXT,
    "status" TEXT NOT NULL,
    "rejectionReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StudentApplicationPostGraduate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostSecondaryEducationPostGraduate" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "institutionName" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "cgpaEarned" TEXT NOT NULL,

    CONSTRAINT "PostSecondaryEducationPostGraduate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CollegePostGraduate" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "CollegePostGraduate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProgramPostGraduate" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "collegeId" INTEGER NOT NULL,

    CONSTRAINT "ProgramPostGraduate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdmissionConfigPostGraduate" (
    "id" SERIAL NOT NULL,
    "applicationStart" TIMESTAMP(3) NOT NULL,
    "applicationDeadline" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdmissionConfigPostGraduate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AvailableCollegePostGraduate" (
    "id" SERIAL NOT NULL,
    "collegeId" INTEGER NOT NULL,

    CONSTRAINT "AvailableCollegePostGraduate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AvailableProgramPostGraduate" (
    "id" SERIAL NOT NULL,
    "programId" INTEGER NOT NULL,
    "availableCollegeId" INTEGER NOT NULL,

    CONSTRAINT "AvailableProgramPostGraduate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StudentApplicationPostGraduate_studentID_key" ON "StudentApplicationPostGraduate"("studentID");

-- CreateIndex
CREATE UNIQUE INDEX "AvailableProgramPostGraduate_programId_availableCollegeId_key" ON "AvailableProgramPostGraduate"("programId", "availableCollegeId");

-- AddForeignKey
ALTER TABLE "PostSecondaryEducationPostGraduate" ADD CONSTRAINT "PostSecondaryEducationPostGraduate_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "StudentApplicationPostGraduate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgramPostGraduate" ADD CONSTRAINT "ProgramPostGraduate_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "CollegePostGraduate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AvailableCollegePostGraduate" ADD CONSTRAINT "AvailableCollegePostGraduate_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "CollegePostGraduate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AvailableProgramPostGraduate" ADD CONSTRAINT "AvailableProgramPostGraduate_programId_fkey" FOREIGN KEY ("programId") REFERENCES "ProgramPostGraduate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AvailableProgramPostGraduate" ADD CONSTRAINT "AvailableProgramPostGraduate_availableCollegeId_fkey" FOREIGN KEY ("availableCollegeId") REFERENCES "AvailableCollegePostGraduate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
