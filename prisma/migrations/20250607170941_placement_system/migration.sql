/*
  Warnings:

  - You are about to drop the `Room` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StudentPlacement` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "StudentPlacement" DROP CONSTRAINT "StudentPlacement_roomId_fkey";

-- DropTable
DROP TABLE "Room";

-- DropTable
DROP TABLE "StudentPlacement";

-- CreateTable
CREATE TABLE "DepartmentExitExam" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "DepartmentExitExam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentExitExam" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "departmentId" TEXT NOT NULL,

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
CREATE UNIQUE INDEX "DepartmentExitExam_name_key" ON "DepartmentExitExam"("name");

-- CreateIndex
CREATE UNIQUE INDEX "StudentExitExam_email_key" ON "StudentExitExam"("email");

-- CreateIndex
CREATE UNIQUE INDEX "StudentExitExam_studentId_key" ON "StudentExitExam"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "RoomExitExam_name_key" ON "RoomExitExam"("name");

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
