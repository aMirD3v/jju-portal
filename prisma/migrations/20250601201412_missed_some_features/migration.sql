/*
  Warnings:

  - You are about to drop the column `digreeUrl` on the `StudentApplication` table. All the data in the column will be lost.
  - You are about to drop the column `ngatCertificateUrl` on the `StudentApplication` table. All the data in the column will be lost.
  - You are about to drop the column `ngatcode` on the `StudentApplication` table. All the data in the column will be lost.
  - You are about to drop the column `grade10Url` on the `StudentApplicationPostGraduate` table. All the data in the column will be lost.
  - You are about to drop the column `grade8Url` on the `StudentApplicationPostGraduate` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "StudentApplication" DROP COLUMN "digreeUrl",
DROP COLUMN "ngatCertificateUrl",
DROP COLUMN "ngatcode",
ADD COLUMN     "grade10Url" TEXT,
ADD COLUMN     "grade8Url" TEXT;

-- AlterTable
ALTER TABLE "StudentApplicationPostGraduate" DROP COLUMN "grade10Url",
DROP COLUMN "grade8Url",
ADD COLUMN     "digreeUrl" TEXT,
ADD COLUMN     "ngatCertificateUrl" TEXT,
ADD COLUMN     "ngatcode" TEXT;
