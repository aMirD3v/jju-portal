"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BiographyStartPage() {
  const [admissionNumber, setAdmissionNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const router = useRouter();

  const handleNext = () => {
    if (admissionNumber.trim()) {
      router.push(`/biography/form?adm=${encodeURIComponent(admissionNumber)}`);
    } else {
      alert("Please enter your admission number.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-blue-600 text-center mb-6">
        Enter Your Details
      </h2>
      <form
        className="grid grid-cols-1 gap-6"
        onSubmit={(e) => {
          e.preventDefault();
          handleNext();
        }}
      >
        <div className="grid grid-cols-1 gap-2">
          <label htmlFor="firstName" className="text-blue-700 font-medium">
            First Name
          </label>
          <input
            id="firstName"
            value={firstName}
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter your first name"
            className="p-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>
        <div className="grid grid-cols-1 gap-2">
          <label htmlFor="fatherName" className="text-blue-700 font-medium">
            Father Name
          </label>
          <input
            id="fatherName"
            value={fatherName}
            type="text"
            onChange={(e) => setFatherName(e.target.value)}
            placeholder="Enter your father's name"
            className="p-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>
        <div className="grid grid-cols-1 gap-2">
          <label htmlFor="admissionNumber" className="text-blue-700 font-medium">
            Admission Number
          </label>
          <input
            id="admissionNumber"
            value={admissionNumber}
            type="number"
            onChange={(e) => setAdmissionNumber(e.target.value)}
            placeholder="e.g. Grade 12 Admission Number"
            className="p-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
        >
          Continue
        </button>
      </form>
    </div>
  );
}
