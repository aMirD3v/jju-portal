"use client";
import { useState } from "react";
import { FaSearch, FaUserGraduate, FaDoorOpen } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

export default function PlacementPage() {
  const [studentId, setStudentId] = useState("");
  const [placement, setPlacement] = useState<{ name: string; room: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCheckPlacement = async () => {
    if (!studentId) {
      toast.error("Please enter your Student ID.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/student/placement", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId }),
      });

      if (!res.ok) throw new Error("Student not found or error occurred.");

      const data = await res.json();
      setPlacement(data);
      toast.success("Placement found!");
    } catch (error: any) {
      console.error(error);
      setPlacement(null);
      toast.error(error.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" flex flex-col items-center justify-center p-6 ">
      <Toaster position="top-center" />
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md transition hover:shadow-2xl">
        <h1 className="text-2xl font-bold text-blue-600 text-center mb-6 flex items-center justify-center gap-2">
          <FaSearch /> Check Your Placement
        </h1>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter your Student ID"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          <button
            onClick={handleCheckPlacement}
            disabled={loading}
            className="bg-gradient-to-r from-blue-500 to-blue-400 text-white font-semibold py-2 rounded shadow hover:from-blue-600 hover:to-blue-500 transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 text-white"
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
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                Checking...
              </>
            ) : (
              "Check Placement"
            )}
          </button>
        </div>

        {placement && (
          <div className="mt-6 p-4 bg-gradient-to-br from-blue-100 to-blue-50 rounded shadow-inner animate-fadeIn">
            <h2 className="text-lg font-semibold text-blue-700 mb-2 flex items-center gap-2">
              <FaUserGraduate /> Student Details
            </h2>
            <p className="text-gray-700">
              <span className="font-medium">Name:</span> {placement.name}
            </p>
            <p className="text-gray-700 flex items-center gap-2">
              <FaDoorOpen className="text-blue-500" />
              <span className="font-medium">Assigned Room:</span> {placement.room}
            </p>
          </div>
        )}
      </div>

      
    </div>
  );
}
