/*
  Warnings:

  - Added the required column `isHandicapped` to the `StudentApplication` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StudentApplication" ADD COLUMN     "handicapType" TEXT,
ADD COLUMN     "isHandicapped" TEXT NOT NULL;
