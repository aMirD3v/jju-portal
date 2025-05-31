// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🔁 Seeding Postgraduate database...');

  // Cleanup in the right order to avoid FK constraint issues
  await prisma.availableProgramPostGraduate.deleteMany();
  await prisma.availableCollegePostGraduate.deleteMany();
  await prisma.programPostGraduate.deleteMany();
  await prisma.collegePostGraduate.deleteMany();
  await prisma.admissionConfigPostGraduate.deleteMany();

  // Create postgraduate colleges
  const collegesData = [
    { name: "Postgraduate College of Engineering" },
    { name: "Postgraduate Institute of Health Science" },
    { name: "Postgraduate College of Natural Sciences" },
    { name: "Postgraduate College of Business and Economics" },
    { name: "Postgraduate College of Social Sciences" },
  ];

  await prisma.collegePostGraduate.createMany({ data: collegesData });
  const allColleges = await prisma.collegePostGraduate.findMany();

  // Define postgraduate programs
  const programData = [
    {
      collegeName: "Postgraduate College of Engineering",
      programs: [
        { name: "Software Engineering MSc", year: 2 },
        { name: "Electrical Engineering MSc", year: 2 },
      ],
    },
    {
      collegeName: "Postgraduate Institute of Health Science",
      programs: [
        { name: "Public Health MSc", year: 2 },
        { name: "Clinical Nursing MSc", year: 2 },
      ],
    },
    {
      collegeName: "Postgraduate College of Natural Sciences",
      programs: [
        { name: "Physics MSc", year: 2 },
        { name: "Chemistry MSc", year: 2 },
      ],
    },
    {
      collegeName: "Postgraduate College of Business and Economics",
      programs: [
        { name: "MBA", year: 2 },
        { name: "Economics MSc", year: 2 },
      ],
    },
    {
      collegeName: "Postgraduate College of Social Sciences",
      programs: [
        { name: "Sociology MSc", year: 2 },
        { name: "Psychology MSc", year: 2 },
      ],
    },
  ];

  // Create programs linked to their colleges
  for (const collegeGroup of programData) {
    const college = allColleges.find(c => c.name === collegeGroup.collegeName);
    if (!college) continue;

    await prisma.programPostGraduate.createMany({
      data: collegeGroup.programs.map(p => ({
        name: p.name,
        year: p.year,
        collegeId: college.id,
      })),
    });
  }

  // Create postgraduate admission config
  const now = new Date();
  await prisma.admissionConfigPostGraduate.create({
    data: {
      applicationStart: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000),
      applicationDeadline: new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000),
    },
  });

  // Make some colleges available for application
  const availableCollegeNames = [
    "Postgraduate College of Engineering",
    "Postgraduate College of Business and Economics",
  ];
  const availableCollegeEntities = [];

  for (const name of availableCollegeNames) {
    const college = allColleges.find(c => c.name === name);
    if (!college) continue;

    const availableCollege = await prisma.availableCollegePostGraduate.create({
      data: { collegeId: college.id },
    });

    availableCollegeEntities.push(availableCollege);
  }

  // Create available programs under available colleges
  const allPrograms = await prisma.programPostGraduate.findMany();

  for (const availableCollege of availableCollegeEntities) {
    const programs = allPrograms.filter(p => p.collegeId === availableCollege.collegeId);

    for (const program of programs) {
      await prisma.availableProgramPostGraduate.create({
        data: {
          programId: program.id,
          availableCollegeId: availableCollege.id,
        },
      });
    }
  }

  console.log("✅ Postgraduate seeding complete.");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
