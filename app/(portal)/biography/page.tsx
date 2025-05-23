"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BiographyStartPage() {
    const [admissionNumber, setAdmissionNumber] = useState("");
      const router = useRouter();

  const handleNext = () => {
    if (admissionNumber.trim()) {
      router.push(`/biography/form?adm=${encodeURIComponent(admissionNumber)}`)
    } else {
      alert("Please enter your admission number.")
    }
  }


  return (
      <div className=" p-6 rounded shadow space-y-4">
        <h2 className="text-2xl font-semibold text-blue-500 text-center">
          Enter Admission Number
        </h2>
        <input
          value={admissionNumber}
          type="number"
          onChange={(e) => setAdmissionNumber(e.target.value)}
          placeholder="e.g. Grade 12 Admission Number"
          className="w-full p-2 border border-blue-500 rounded placeholder-blue-500/40 text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition duration-300"
        />
        <button
          onClick={handleNext}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-950 hover:text-white hover:bg-opacity-20 transition duration-300"
        >
          Continue
        </button>
      </div>
  );
}
