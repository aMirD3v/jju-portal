"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaChevronDown, FaChevronUp, FaUniversity } from "react-icons/fa";


function StatusBanner({
  applicationStarted,
  applicationEnded,
  APPLICATION_START,
  APPLICATION_DEADLINE,
  colleges,
  totalPrograms,
}: any) {
  if (!applicationStarted && !applicationEnded) {
    return (
      <div className="flex justify-center mb-4">
        <span className="bg-orange-50 text-orange-700 px-6 py-3 rounded-xl font-semibold shadow-md border border-orange-200 text-base">
          Applications open on: <b>{APPLICATION_START.toLocaleDateString()}</b>
        </span>
      </div>
    );
  }
  if (applicationStarted && !applicationEnded) {
    return (
      <div className="flex flex-col items-center mb-6">
        <span className="bg-green-50 text-green-700 px-6 py-3 rounded-xl font-semibold shadow-md border border-green-200 text-base mb-2">
          Applications are open! Deadline: <b>{APPLICATION_DEADLINE.toLocaleDateString()}</b>
        </span>
        <span className="text-blue-500 font-medium text-sm">
          <b>{colleges.length}</b> Colleges / <b>{totalPrograms}</b> Departments available
        </span>
      </div>
    );
  }
  if (applicationEnded) {
    return (
      <div className="flex justify-center">
        <span className="bg-red-50 text-red-700 px-6 py-3 rounded-xl font-semibold shadow-md border border-red-200 text-base">
          The application deadline was on: <b>{APPLICATION_DEADLINE.toLocaleDateString()}</b>
        </span>
      </div>
    );
  }
  return null;
}

function CollegeCard({
  college,
  programs,
  expanded,
  toggleExpand,
  handleApply,
  applicationStarted,
  applicationEnded,
}: any) {
  return (
    <div
      className={`w-full rounded-3xl  border-2 transition-all duration-200 hover:shadow-2xl hover:border-blue-400  ${
        expanded === college.name
          ? "border-blue-600 bg-gradient-to-br from-blue-50 to-white"
          : "border-gray-100 bg-white"
      }`}
    >
      <button
        onClick={() => toggleExpand(college.name)}
        className="w-full flex items-center justify-between px-8 py-6 focus:outline-none group"
        aria-expanded={expanded === college.name}
        aria-controls={`college-panel-${college.name}`}
      >
        <div className="flex items-center gap-5">
          <span className="text-4xl text-blue-500 drop-shadow-sm">
            <FaUniversity />
          </span>
          <span className=" font-bold text-blue-500 group-hover:underline">
            {college.name}
          </span>
        </div>
        <span className="text-2xl text-blue-400">
          {expanded === college.name ? <FaChevronUp /> : <FaChevronDown />}
        </span>
      </button>
      <div
        id={`college-panel-${college.name}`}
        className={`transition-all duration-300 overflow-hidden ${
          expanded === college.name ? "max-h-96" : "max-h-0"
        }`}
      >
        {expanded === college.name && (
          <div className="px-10 py-7 bg-white border-t border-blue-100 rounded-b-3xl">
            <h3 className="text-lg font-semibold text-blue-600 mb-4 tracking-wide">
              Departments & Programs
            </h3>
            <ul className="space-y-3 mb-7">
              {programs.map((program: any, i: number) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-blue-900 bg-blue-50 rounded-lg px-4 py-2 shadow-sm"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-400 inline-block" />
                  <span className="font-medium">{program.name}</span>
                  <span className="ml-2 text-xs text-gray-500">
                    ({program.year} years)
                  </span>
                </li>
              ))}
            </ul>
            {applicationStarted && !applicationEnded && (
              <button
                onClick={() => handleApply(college.name)}
                className="px-8 py-2.5 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full font-semibold shadow hover:from-blue-600 hover:to-blue-800 transition text-base"
              >
                Apply Now
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function UndergraduatePage() {
  const router = useRouter();
  const [expanded, setExpanded] = useState<string | null>(null);
  const [colleges, setColleges] = useState<any[]>([]);
  const [now, setNow] = useState(new Date());
  const [appConfig, setAppConfig] = useState<{
    applicationStart: string;
    applicationDeadline: string;
  } | null>(null);

  useEffect(() => {
    async function fetchConfig() {
      const res = await fetch("/api/admission/undergraduate/admission-config");
      const config = await res.json();
      setAppConfig({
        applicationStart: config.applicationStart,
        applicationDeadline: config.applicationDeadline,
      });
    }

    async function fetchAvailable() {
      const res = await fetch("/api/admission/undergraduate/available");
      const json = await res.json();
      const filtered = json.filter((entry: any) => entry.programs.length > 0);
      setColleges(filtered);
    }

    fetchConfig();
    fetchAvailable();

    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  if (!appConfig) {
    return (
     <div className="flex h-full items-center justify-center py-12">
        <svg
          className="animate-spin h-10 w-10 text-blue-500 mb-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
      </div>
    );
  }

  const APPLICATION_START = new Date(appConfig.applicationStart);
  const APPLICATION_DEADLINE = new Date(appConfig.applicationDeadline);

  const applicationStarted = now >= APPLICATION_START;
  const applicationEnded = now > APPLICATION_DEADLINE;

  const totalPrograms = colleges.reduce(
    (acc, col) => acc + col.programs.length,
    0
  );

  const toggleExpand = (collegeName: string) => {
    setExpanded((prev) => (prev === collegeName ? null : collegeName));
  };

  const handleApply = (collegeName: string) => {
    const collegeEntry = colleges.find((entry) => entry.college.name === collegeName);
    if (collegeEntry && collegeEntry.college && collegeEntry.college.id) {
      router.push(`/admission/undergraduate/apply?collegeId=${collegeEntry.college.id}`);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-14">
        <h1 className="text-3xl text-center font-bold text-blue-500 mb-3 drop-shadow-lg tracking-tight">
          Undergraduate Programs
        </h1>
        <p className="text-center text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Explore our diverse colleges and departments. Expand a college to see available programs and apply directly.
        </p>
        <StatusBanner
          applicationStarted={applicationStarted}
          applicationEnded={applicationEnded}
          APPLICATION_START={APPLICATION_START}
          APPLICATION_DEADLINE={APPLICATION_DEADLINE}
          colleges={colleges}
          totalPrograms={totalPrograms}
        />
        {applicationStarted && !applicationEnded && (
          <div className="flex flex-col gap-6">
            {colleges.map((entry, idx) => (
              <CollegeCard
                key={idx}
                college={entry.college}
                programs={entry.programs}
                expanded={expanded}
                toggleExpand={toggleExpand}
                handleApply={handleApply}
                applicationStarted={applicationStarted}
                applicationEnded={applicationEnded}
              />
            ))}
          </div>
        )}
        {applicationEnded && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => router.push("/admission")}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full font-bold hover:from-blue-600 hover:to-blue-800 transition-colors shadow-lg"
            >
              Back to Admission
            </button>
          </div>
        )}
      </div>
      {!applicationEnded && (
        <div className="mt-16 text-center">
          <button
            onClick={() => router.push("/admission")}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full font-bold hover:from-blue-600 hover:to-blue-800 transition-colors shadow-lg"
          >
            Back to Admission
          </button>
        </div>
      )}
    </div>
  );
}

