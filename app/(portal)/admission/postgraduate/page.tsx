"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const APPLICATION_START = new Date("2025-04-01T00:00:00Z");
const APPLICATION_DEADLINE = new Date("2025-05-30T23:59:59Z");

const colleges = [
  {
    name: "College of Engineering and Technology",
    description: "Advanced programs for professional engineers and researchers.",
    programs: [
      "MSc Hydraulic and Irrigation Engineering",
      "MSc in Communication Engineering",
      "MSc in Computer Science",
    ],
  },
  {
    name: "Institute of Health Science",
    description: "Advanced programs for Health Science and researchers.",
    programs: [
      "Master of Public Health (MPH)",
      "Master of Science in Integrated Clinical and Community Mental Health",
      "Master of Science in Biomedical Sciences",
    ],
  },
  {
    name: "College of Business & Economics",
    description:
      "Leadership, management, and economic theory for the next generation.",
    programs: [
      "Master of Business Administration (MBA)",
      "MA in Economics",
      "MA in Project Planning",
      "MA in Accounting and Finance",
    ],
  },
  {
    name: "College of Natural and Computational Sciences",
    description: "Research-focused programs in pure and applied sciences.",
    programs: [
      "MSc in Physics",
      "MSc in Mathematics",
      "MSc in Environmental Science",
      "MSc in Biology",
    ],
  },
  {
    name: "College of Social Sciences",
    description:
      "Postgraduate studies focused on  Social Sciences.",
    programs: [
      "MA in Sociology",
      "MA in Special Needs",
      "MA in Psychology",
      "MA in Early Childhood Education",
    ],
    
  },
  {
    name: "College of Dryland Agriculture",
    description:
      "Postgraduate studies focused on Dryland Agriculture.",
    programs: [
      "MSc in Dryland Agronomy",
      "MSc in Natural Resource Management",
      "MSc in Rural Development and Agricultural Extension",
      "MSc in human Nutrition",
    ],
    
  },
];

export default function PostgraduatePage() {
  const router = useRouter();
  const [expanded, setExpanded] = useState<string | null>(null);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const toggleExpand = (collegeName: string) => {
    setExpanded((prev) => (prev === collegeName ? null : collegeName));
  };

  const handleApply = (collegeName: string) => {
    router.push(`/admission/postgraduate/apply?college=${encodeURIComponent(collegeName)}`);
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
          Postgraduate Programs
        </h1>
        {!applicationStarted && !applicationEnded && (
          <p className="text-orange-500 text-center font-medium text-lg">
            Applications open on: {APPLICATION_START.toDateString()}
          </p>
        )}
        {applicationStarted && !applicationEnded && (
          <>
            <p className="text-green-600 text-center font-medium text-lg">
              Applications are open! Deadline:{" "}
              {APPLICATION_DEADLINE.toDateString()} <br />
              {colleges.length} Schools / {totalPrograms} Graduate Programs available
            </p>

            <p className="text-blue-500 text-center mb-4 text-lg mt-2">
              Explore graduate schools and their advanced programs by expanding the sections below.
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
                      <p className="mb-2 text-blue-600 italic">{college.description}</p>
                      <ul className="list-disc list-inside text-blue-700 space-y-1 mb-4">
                        {college.programs.map((program, i) => (
                          <li key={i}>{program}</li>
                        ))}
                      </ul>
                      <button
                        onClick={() => handleApply(college.name)}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                      >
                        Apply Now
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
        {applicationEnded && (
          <p className="text-red-600 text-center font-medium text-lg">
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
