// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Clean up previous data
  await prisma.availableProgram.deleteMany();
  await prisma.availableCollege.deleteMany();
  await prisma.program.deleteMany();
  await prisma.college.deleteMany();
  await prisma.admissionConfig.deleteMany();

  // Create colleges
  const collegesData = [
    { name: "College of Engineering" },
    { name: "Institute of Health Science" },
    { name: "College of Natural Sciences" },
    { name: "College of Business and Economics" },
    { name: "College of Social Sciences" },
  ];

  await prisma.college.createMany({ data: collegesData });
  const allColleges = await prisma.college.findMany();

  // Define programs for each college
  const programData = [
    {
      collegeName: "College of Engineering",
      programs: [
        { name: "Civil Engineering", year: 5 },
        { name: "Mechanical Engineering", year: 5 },
        { name: "Electrical Engineering", year: 5 },
      ],
    },
    {
      collegeName: "Institute of Health Science",
      programs: [
        { name: "Public Health", year: 5 },
        { name: "Nursing", year: 5 },
        { name: "Medical Lab", year: 5 },
      ],
    },
    {
      collegeName: "College of Natural Sciences",
      programs: [
        { name: "Biology", year: 4 },
        { name: "Chemistry", year: 4 },
        { name: "Physics", year: 4 },
        { name: "Mathematics", year: 4 },
      ],
    },
    {
      collegeName: "College of Business and Economics",
      programs: [
        { name: "Accounting", year: 4 },
        { name: "Economics", year: 4 },
        { name: "Management", year: 5 },
        { name: "Marketing", year: 4 },
      ],
    },
    {
      collegeName: "College of Social Sciences",
      programs: [
        { name: "Sociology", year: 4 },
        { name: "Political Science", year: 5 },
        { name: "Psychology", year: 5 },
      ],
    },
  ];

  // Create programs and associate them with their colleges
  for (const collegeGroup of programData) {
    const college = allColleges.find(c => c.name === collegeGroup.collegeName);
    if (!college) continue;

    await prisma.program.createMany({
      data: collegeGroup.programs.map(p => ({
        name: p.name,
        year: p.year,
        collegeId: college.id,
      })),
    });
  }

  // Create admission config
  const now = new Date();
  await prisma.admissionConfig.create({
    data: {
      applicationStart: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000),
      applicationDeadline: new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000),
    },
  });

  // Mark some colleges as available
  const availableCollegeNames = [
    "College of Engineering",
    "College of Natural Sciences",
    "College of Business and Economics",
  ];
  const availableCollegeEntities = [];

  for (const name of availableCollegeNames) {
    const college = allColleges.find(c => c.name === name);
    if (!college) continue;

    const availableCollege = await prisma.availableCollege.create({
      data: { collegeId: college.id },
    });

    availableCollegeEntities.push(availableCollege);
  }

  // Create AvailablePrograms: link programs to their available colleges
  const allPrograms = await prisma.program.findMany();

  for (const availableCollege of availableCollegeEntities) {
    const programs = allPrograms.filter(p => p.collegeId === availableCollege.collegeId);

    for (const program of programs) {
      await prisma.availableProgram.create({
        data: {
          programId: program.id,
          availableCollegeId: availableCollege.id,
        },
      });
    }
  }

  console.log("✅ Seeding complete.");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
