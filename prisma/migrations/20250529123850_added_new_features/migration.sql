-- CreateTable
CREATE TABLE "AvailableProgram" (
    "id" SERIAL NOT NULL,
    "programId" INTEGER NOT NULL,
    "availableCollegeId" INTEGER NOT NULL,

    CONSTRAINT "AvailableProgram_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AvailableProgram_programId_availableCollegeId_key" ON "AvailableProgram"("programId", "availableCollegeId");

-- AddForeignKey
ALTER TABLE "AvailableProgram" ADD CONSTRAINT "AvailableProgram_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AvailableProgram" ADD CONSTRAINT "AvailableProgram_availableCollegeId_fkey" FOREIGN KEY ("availableCollegeId") REFERENCES "AvailableCollege"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
