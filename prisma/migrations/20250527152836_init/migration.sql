-- CreateTable
CREATE TABLE "StudentApplication" (
    "id" TEXT NOT NULL,
    "studentID" TEXT NOT NULL,
    "institute" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "admission" TEXT NOT NULL,
    "studyLevel" TEXT NOT NULL,
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
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "studentID" TEXT NOT NULL,
    "institute" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "academicYear" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StudentApplication_studentID_key" ON "StudentApplication"("studentID");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "PostSecondaryEducation" ADD CONSTRAINT "PostSecondaryEducation_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "StudentApplication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
