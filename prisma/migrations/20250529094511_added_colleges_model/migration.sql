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

-- AddForeignKey
ALTER TABLE "Program" ADD CONSTRAINT "Program_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "College"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AvailableCollege" ADD CONSTRAINT "AvailableCollege_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "College"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
