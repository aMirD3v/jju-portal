"use client";

import { useRouter } from "next/navigation";

const colleges = [
  {
    name: "College of Engineering",
    departments: [
      {
        name: "Department of Civil Engineering",
        degree: "BSc in Civil Engineering",
        years: 5,
        description:
          "Focuses on infrastructure design, including roads, bridges, and water systems.",
      },
      {
        name: "Department of Mechanical Engineering",
        degree: "BSc in Mechanical Engineering",
        years: 5,
        description:
          "Covers machinery, thermodynamics, robotics, and manufacturing systems.",
      },
      {
        name: "Department of Electrical Engineering",
        degree: "BSc in Electrical Engineering",
        years: 5,
        description:
          "Specializes in electrical systems, electronics, and power generation.",
      },
    ],
  },
  {
    name: "College of Natural Sciences",
    departments: [
      {
        name: "Department of Biology",
        degree: "BSc in Biology",
        years: 3,
        description:
          "Explores living organisms, from molecular biology to ecosystems.",
      },
      {
        name: "Department of Chemistry",
        degree: "BSc in Chemistry",
        years: 3,
        description:
          "Studies matter composition, chemical reactions, and laboratory analysis.",
      },
      {
        name: "Department of Physics",
        degree: "BSc in Physics",
        years: 3,
        description:
          "Focuses on the laws of nature, quantum mechanics, and astrophysics.",
      },
      {
        name: "Department of Mathematics",
        degree: "BSc in Mathematics",
        years: 3,
        description:
          "Emphasizes analytical thinking, calculus, algebra, and applied math.",
      },
    ],
  },
  {
    name: "College of Business and Economics",
    departments: [
      {
        name: "Department of Accounting",
        degree: "BA in Accounting",
        years: 3,
        description:
          "Provides a foundation in financial and managerial accounting.",
      },
      {
        name: "Department of Economics",
        degree: "BA in Economics",
        years: 3,
        description:
          "Covers micro and macroeconomics, development theory, and policy.",
      },
      {
        name: "Department of Management",
        degree: "BA in Management",
        years: 3,
        description:
          "Focuses on organizational leadership and operational efficiency.",
      },
      {
        name: "Department of Marketing",
        degree: "BA in Marketing",
        years: 3,
        description:
          "Centers on market research, branding, and consumer behavior.",
      },
    ],
  },
  {
    name: "College of Social Sciences",
    departments: [
      {
        name: "Department of Sociology",
        degree: "BA in Sociology",
        years: 3,
        description:
          "Studies society, social institutions, and human interaction.",
      },
      {
        name: "Department of Political Science",
        degree: "BA in Political Science",
        years: 3,
        description:
          "Analyzes political systems, governance, and international relations.",
      },
      {
        name: "Department of Psychology",
        degree: "BA in Psychology",
        years: 3,
        description: "Focuses on human behavior, cognition, and mental health.",
      },
    ],
  },
];

export default function AvailableDeps() {
  const router = useRouter();

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-blue-700">
          All Colleges and Departments
        </h1>
        <p className="text-blue-500 mt-2">
          Explore every department under each college at Jigjiga University.
        </p>
      </div>

      <div className="space-y-8">
        {colleges.map((college, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-2xl shadow border border-blue-100"
          >
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">
              {college.name}
            </h2>

            <div className="space-y-4">
              {college.departments.map((dept, i) => (
                <div
                  key={i}
                  className="p-4 bg-blue-50 rounded-lg border border-blue-100"
                >
                  <h3 className="text-xl font-bold text-blue-800">
                    {dept.name}
                  </h3>
                  <p className="text-blue-700">
                    <strong>Degree:</strong> {dept.degree}
                  </p>
                  <p className="text-blue-700">
                    <strong>Duration:</strong> {dept.years} years
                  </p>
                  <p className="text-blue-600 mt-1">{dept.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <button
          onClick={() => router.back()}
          className="px-6 py-3 bg-gray-300 text-gray-800 rounded-full hover:bg-gray-400 transition-colors"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
