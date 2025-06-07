/*
  Warnings:

  - You are about to drop the column `email` on the `StudentExitExam` table. All the data in the column will be lost.
  - Added the required column `enrollmentType` to the `StudentExitExam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `examTopic` to the `StudentExitExam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `StudentExitExam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latestGpa` to the `StudentExitExam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nationalId` to the `StudentExitExam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `StudentExitExam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `StudentExitExam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `StudentExitExam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `StudentExitExam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `StudentExitExam` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "StudentExitExam_email_key";

-- AlterTable
ALTER TABLE "StudentExitExam" DROP COLUMN "email",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "enrollmentType" TEXT NOT NULL,
ADD COLUMN     "examTopic" TEXT NOT NULL,
ADD COLUMN     "gender" TEXT NOT NULL,
ADD COLUMN     "latestGpa" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "nationalId" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "phoneNumber" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL,
ADD COLUMN     "year" INTEGER NOT NULL;
