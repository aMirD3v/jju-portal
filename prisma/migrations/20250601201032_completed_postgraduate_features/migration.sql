/*
  Warnings:

  - You are about to drop the column `grade10Url` on the `StudentApplication` table. All the data in the column will be lost.
  - You are about to drop the column `grade8Url` on the `StudentApplication` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "StudentApplication" DROP COLUMN "grade10Url",
DROP COLUMN "grade8Url",
ADD COLUMN     "digreeUrl" TEXT,
ADD COLUMN     "ngatCertificateUrl" TEXT,
ADD COLUMN     "ngatcode" TEXT;
