/*
  Warnings:

  - Made the column `academicYear` on table `StudentApplication` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "StudentApplication" ALTER COLUMN "academicYear" SET NOT NULL;
