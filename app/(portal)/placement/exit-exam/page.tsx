"use client";

import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";

export default function StudentExitExamPage() {
  const [studentId, setStudentId] = useState("");
  const [loading, setLoading] = useState(false);
  const [studentData, setStudentData] = useState<null | {
    studentName: string;
    username: string;
    password: string;
    gender: string;
    enrollmentType: string;
    year: number;
    assignments: {
      sessionName: string;
      date: string;
      startTime: string;
      endTime: string;
      roomName: string;
    }[];
  }>(null);

  const handleSearch = async () => {
    if (!studentId.trim()) {
      toast.error("Please enter a valid Student ID.");
      return;
    }

    setLoading(true);
    toast.dismiss();

    try {
      const res = await fetch(
        `/api/student/placement/exit-exam?studentId=${studentId.trim()}`
      );

      if (!res.ok) {
        throw new Error("Student not found or error retrieving data.");
      }

      const data = await res.json();

      setStudentData({
        studentName: data.studentName,
        username: data.username,
        password: data.password,
        gender: data.gender,
        enrollmentType: data.enrollmentType,
        year: data.year,
        assignments: data.assignments.map((a: any) => ({
          sessionName: a.sessionName,
          date: new Date(a.date).toLocaleDateString(undefined, {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
          startTime: new Date(a.startTime).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          endTime: new Date(a.endTime).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          roomName: a.roomName,
        })),
      });
    } catch (err: any) {
      toast.error(err.message || "Something went wrong.");
      setStudentData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 flex flex-col items-center">
      <Toaster position="top-center" />
      <h1 className="text-4xl font-extrabold text-blue-600 mb-6">
        Exit Exam Placement
      </h1>

      <div className="bg-white p-6 rounded-lg shadow-lg border border-blue-200 w-full max-w-md flex flex-col gap-4">
        <input
          type="text"
          placeholder="Enter Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          className="p-2 border rounded w-full focus:ring-2 focus:ring-blue-300"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className={`flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-400 text-white px-4 py-2 rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition ${
            loading ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {loading && <FaSpinner className="animate-spin" />}
          {loading ? "Searching..." : "Check Placement"}
        </button>
      </div>

      {studentData && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md border border-green-300 w-full max-w-2xl">
          <h2 className="text-xl font-bold text-blue-500 mb-4">
            Placements for {studentData.studentName}
          </h2>

          <div className="mb-6 text-sm space-y-1">
            <p><strong>Username:</strong> {studentData.username}</p>
            <p><strong>Password:</strong> {studentData.password}</p>
            <p><strong>Gender:</strong> {studentData.gender}</p>
            <p><strong>Enrollment Type:</strong> {studentData.enrollmentType}</p>
            <p><strong>Year:</strong> {studentData.year}</p>
          </div>

          {studentData.assignments.length === 0 ? (
            <p>No Placements found.</p>
          ) : (
            <ul className="space-y-4">
              {studentData.assignments.map((a, i) => (
                <li key={i} className="border-l-4 border-blue-500 pl-4">
                  <p><strong>Session:</strong> {a.sessionName}</p>
                  <p><strong>Date:</strong> {a.date}</p>
                  <p><strong>Time:</strong> {a.startTime} - {a.endTime}</p>
                  <p>
                    <strong>Room:</strong>{" "}
                    <span className="text-blue-800 font-semibold">{a.roomName}</span>
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
