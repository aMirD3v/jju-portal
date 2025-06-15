-- CreateEnum
CREATE TYPE "AccessType" AS ENUM ('GATE', 'LIBRARY');

-- CreateEnum
CREATE TYPE "MealType" AS ENUM ('BREAKFAST', 'LUNCH', 'DINNER');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentUser" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudentUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccessLog" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "accessType" "AccessType" NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AccessLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CafeteriaAccess" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "mealType" "MealType" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CafeteriaAccess_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentApplication" (
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

    CONSTRAINT "StudentApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostSecondaryEducation" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "institutionName" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "cgpaEarned" TEXT NOT NULL,

    CONSTRAINT "PostSecondaryEducation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "College" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "College_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Program" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "collegeId" INTEGER NOT NULL,

    CONSTRAINT "Program_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdmissionConfig" (
    "id" SERIAL NOT NULL,
    "applicationStart" TIMESTAMP(3) NOT NULL,
    "applicationDeadline" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdmissionConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AvailableCollege" (
    "id" SERIAL NOT NULL,
    "collegeId" INTEGER NOT NULL,

    CONSTRAINT "AvailableCollege_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AvailableProgram" (
    "id" SERIAL NOT NULL,
    "programId" INTEGER NOT NULL,
    "availableCollegeId" INTEGER NOT NULL,

    CONSTRAINT "AvailableProgram_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentApplicationPostGraduate" (
    "id" TEXT NOT NULL,
    "studentID" TEXT NOT NULL,
    "institute" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "admission" TEXT NOT NULL,
    "ngatcode" TEXT,
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
    "ngatCertificateUrl" TEXT,
    "digreeUrl" TEXT,
    "diplomaUrl" TEXT,
    "highSchoolUrl" TEXT,
    "grade12Url" TEXT,
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

-- CreateTable
CREATE TABLE "DepartmentExitExam" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "DepartmentExitExam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentExitExam" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "nationalId" TEXT,
    "name" TEXT,
    "username" TEXT,
    "password" TEXT,
    "departmentId" TEXT NOT NULL,
    "examTopic" TEXT,
    "gender" TEXT,
    "enrollmentType" TEXT,
    "phoneNumber" TEXT,
    "latestGpa" DOUBLE PRECISION,
    "year" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudentExitExam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoomExitExam" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,

    CONSTRAINT "RoomExitExam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SessionExitExam" (
    "id" TEXT NOT NULL,
    "sessionName" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "departmentId" TEXT NOT NULL,

    CONSTRAINT "SessionExitExam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssignmentExitExam" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,

    CONSTRAINT "AssignmentExitExam_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "StudentUser_email_key" ON "StudentUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "StudentUser_studentId_key" ON "StudentUser"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "StudentApplication_studentID_key" ON "StudentApplication"("studentID");

-- CreateIndex
CREATE UNIQUE INDEX "AvailableProgram_programId_availableCollegeId_key" ON "AvailableProgram"("programId", "availableCollegeId");

-- CreateIndex
CREATE UNIQUE INDEX "StudentApplicationPostGraduate_studentID_key" ON "StudentApplicationPostGraduate"("studentID");

-- CreateIndex
CREATE UNIQUE INDEX "AvailableProgramPostGraduate_programId_availableCollegeId_key" ON "AvailableProgramPostGraduate"("programId", "availableCollegeId");

-- CreateIndex
CREATE UNIQUE INDEX "DepartmentExitExam_name_key" ON "DepartmentExitExam"("name");

-- CreateIndex
CREATE UNIQUE INDEX "StudentExitExam_studentId_key" ON "StudentExitExam"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "RoomExitExam_name_key" ON "RoomExitExam"("name");

-- AddForeignKey
ALTER TABLE "AccessLog" ADD CONSTRAINT "AccessLog_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "StudentUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CafeteriaAccess" ADD CONSTRAINT "CafeteriaAccess_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "StudentUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostSecondaryEducation" ADD CONSTRAINT "PostSecondaryEducation_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "StudentApplication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Program" ADD CONSTRAINT "Program_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "College"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AvailableCollege" ADD CONSTRAINT "AvailableCollege_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "College"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AvailableProgram" ADD CONSTRAINT "AvailableProgram_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AvailableProgram" ADD CONSTRAINT "AvailableProgram_availableCollegeId_fkey" FOREIGN KEY ("availableCollegeId") REFERENCES "AvailableCollege"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

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

-- AddForeignKey
ALTER TABLE "StudentExitExam" ADD CONSTRAINT "StudentExitExam_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "DepartmentExitExam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionExitExam" ADD CONSTRAINT "SessionExitExam_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "DepartmentExitExam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssignmentExitExam" ADD CONSTRAINT "AssignmentExitExam_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "StudentExitExam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssignmentExitExam" ADD CONSTRAINT "AssignmentExitExam_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "SessionExitExam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssignmentExitExam" ADD CONSTRAINT "AssignmentExitExam_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "RoomExitExam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
