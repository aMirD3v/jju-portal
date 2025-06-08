"use client";

import { useRouter } from "next/navigation";
import { FaBookOpen, FaGraduationCap, FaCheckCircle } from "react-icons/fa";

export default function SelectExamTypePage() {
  const router = useRouter();

  const buttons = [
    {
      label: "Grade 12",
      icon: <FaGraduationCap />,
      path: "/placement/grade12",
      color: "from-blue-400 to-green-500 hover:from-blue-500 hover:to-green-600",
    },
    {
      label: "Remedial",
      icon: <FaBookOpen />,
      path: "/placement/remedial",
      color: "from-blue-400 to-yellow-500 hover:from-blue-500 hover:to-yellow-600",
    },
    {
      label: "Exit Exam",
      icon: <FaCheckCircle />,
      path: "/placement/exit-exam",
      color: "from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md transition hover:shadow-2xl">
        <h1 className="text-2xl font-bold text-blue-600 text-center mb-6">
          Select Exam Type
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Choose the type of exam to view your placement.
        </p>
        <div className="flex flex-col gap-4">
          {buttons.map(({ label, icon, path, color }) => (
            <button
              key={label}
              onClick={() => router.push(path)}
              className={`w-full flex items-center justify-center gap-3 py-3 text-white font-semibold rounded-lg bg-gradient-to-r ${color} transition shadow hover:shadow-md`}
            >
              {icon}
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
