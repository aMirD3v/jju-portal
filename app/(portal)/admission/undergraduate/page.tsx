"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const APPLICATION_START = new Date("2025-04-01T00:00:00Z");
const APPLICATION_DEADLINE = new Date("2025-05-30T23:59:59Z");

const colleges = [
  {
    name: "College of Engineering",
    programs: [
      { name: "Civil Engineering", year: "5" },
      { name: "Mechanical Engineering", year: "5" },
      { name: "Electrical Engineering", year: "5" },
    ],
  },
  {
    name: "College of Natural Sciences",
    programs: [
      { name: "Biology", year: "4" },
      { name: "Chemistry", year: "4" },
      { name: "Physics", year: "4" },
      { name: "Mathematics", year: "4" },
    ],
  },
  {
    name: "College of Business and Economics",
    programs: [
      { name: "Accounting", year: "4" },
      { name: "Economics", year: "4" },
      { name: "Management", year: "5" },
      { name: "Marketing", year: "4" },
    ],
  },
  {
    name: "College of Social Sciences",
    programs: [
      { name: "Sociology", year: "4" },
      { name: "Political Science", year: "5" },
      { name: "Psychology", year: "5" },
    ],
  },
];

export default function UndergraduatePage() {
  const router = useRouter();
  const [expanded, setExpanded] = useState<string | null>(null);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000); // refresh every minute
    return () => clearInterval(timer);
  }, []);

  const toggleExpand = (collegeName: string) => {
    setExpanded((prev) => (prev === collegeName ? null : collegeName));
  };

  const handleApply = (collegeName: string) => {
    router.push(`/admission/undergraduate/apply?college=${encodeURIComponent(collegeName)}`);
  };

  const applicationStarted = now >= APPLICATION_START;
  const applicationEnded = now > APPLICATION_DEADLINE;

  const totalPrograms = colleges.reduce(
    (acc, col) => acc + col.programs.length,
    0
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl text-center font-extrabold text-blue-500 mb-4">
          Undergraduate Programs
        </h1>
        {!applicationStarted && !applicationEnded && (
          <p className="text-orange-500 text-center font-medium text-lg">
            Applications open on: {APPLICATION_START.toDateString()}
          </p>
        )}
        {applicationStarted && !applicationEnded && (
          <>
            <p className="text-green-600 text-center  font-medium text-lg">
              Applications are open! Deadline:{" "}
              {APPLICATION_DEADLINE.toDateString()} <br />
              {colleges.length} Colleges / {totalPrograms} Departments available
            </p>
            
            <p className="text-blue-500 text-center mb-4 text-lg mt-2">
              Explore Extension undergraduate programs by expanding each college below.
            </p>
            <div className="space-y-4">
              {colleges.map((college, idx) => (
                <div
                  key={idx}
                  className="border border-blue-200 rounded shadow-sm overflow-hidden"
                >
                  <button
                    onClick={() => toggleExpand(college.name)}
                    className="w-full text-left px-6 py-4 bg-white hover:bg-blue-50 flex justify-between items-center"
                  >
                    <span className="text-xl font-semibold text-blue-600">
                      {college.name}
                    </span>
                    <span className="text-xl text-blue-400">
                      {expanded === college.name ? "x" : "+"}
                    </span>
                  </button>

                  {expanded === college.name && (
                    <div className="bg-white px-6 py-4 border-t border-blue-100">
                      <ul className="list-disc list-inside text-blue-700 space-y-1 mb-4">
                        {college.programs.map((program, i) => (
                          <li key={i}>
                            {program.name}{" "}
                            <span className="text-sm text-gray-500">
                              ({program.year} years)
                            </span>
                          </li>
                        ))}
                      </ul>
                      {applicationStarted && !applicationEnded && (
                        <button
                          onClick={() => handleApply(college.name)}
                          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                        >
                          Apply Now
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
        {applicationEnded && (
          <p className="text-red-600 text-center  font-medium text-lg">
            The application deadline was on:{" "}
            {APPLICATION_DEADLINE.toDateString()}
          </p>
        )}
      </div>

      <div className="mt-12 text-center">
        <button
          onClick={() => router.push("/admission")}
          className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors shadow-lg"
        >
          Back to Admission
        </button>
      </div>
    </div>
  );
}
