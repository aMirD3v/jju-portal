"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast"; // 🚀 import the toast

export default function AdmissionManagerPage() {
  const [tab, setTab] = useState<"undergraduate" | "postgraduate">(
    "undergraduate"
  );
  const [colleges, setColleges] = useState<any[]>([]);
  const [availableMap, setAvailableMap] = useState<Map<number, Set<number>>>(
    new Map()
  );
  const [selectedCollege, setSelectedCollege] = useState<number | null>(null);
  const [localSelections, setLocalSelections] = useState<Set<number>>(
    new Set()
  );
  const [admissionStart, setAdmissionStart] = useState("");
  const [admissionDeadline, setAdmissionDeadline] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const [collegeRes, availableRes, configRes] = await Promise.all([
      fetch(`/api/admission/${tab}/colleges`),
      fetch(`/api/admission/${tab}/available`),
      fetch(`/api/admission/${tab}/admission-config`),
    ]);

    const collegesData = await collegeRes.json();
    setColleges(collegesData);

    const availableData = await availableRes.json();
    const map = new Map<number, Set<number>>();
    availableData.forEach((entry: any) => {
      map.set(entry.college.id, new Set(entry.programs.map((p: any) => p.id)));
    });
    setAvailableMap(map);

    const config = await configRes.json();
    setAdmissionStart(config.applicationStart.slice(0, 10));
    setAdmissionDeadline(config.applicationDeadline.slice(0, 10));

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [tab]);

  const saveDeadline = async () => {
    if (!admissionStart || !admissionDeadline) {
      toast.error("Please fill in both start and deadline dates.");
      return;
    }
    await fetch(`/api/admission/${tab}/admission-config`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        applicationStart: admissionStart,
        applicationDeadline: admissionDeadline,
      }),
    });
    toast.success("Admission dates updated!");
  };

  const handleCollegeSelect = (collegeId: number) => {
    setSelectedCollege(collegeId);
    const programs = availableMap.get(collegeId);
    setLocalSelections(new Set(programs ?? []));
  };

  const handleToggleProgram = (programId: number) => {
    setLocalSelections((prev) => {
      const updated = new Set(prev);
      updated.has(programId)
        ? updated.delete(programId)
        : updated.add(programId);
      return updated;
    });
  };

  const handleSaveAvailability = async () => {
    if (!selectedCollege) {
      toast.error("Please select a college first.");
      return;
    }
    setSaving(true);
    await fetch(`/api/admission/${tab}/available/manage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        collegeId: selectedCollege,
        programIds: Array.from(localSelections),
      }),
    });
    const newMap = new Map(availableMap);
    newMap.set(selectedCollege, new Set(localSelections));
    setAvailableMap(newMap);
    setSaving(false);
    toast.success("Program availability saved!");
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-2 space-y-10 text-gray-800">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-blue-700 flex items-center gap-2">
              🎓 Admission Management
            </h1>
            <p className="text-gray-600 mt-1">
              Manage admission dates and program availability with ease.
            </p>
          </div>

          <Link
            href="/dashboard/admin/admission/manage"
            className="inline-block px-5 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
          >
            Create & Manage
          </Link>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => setTab("undergraduate")}
          className={`px-4 py-2 rounded ${
            tab === "undergraduate"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Undergraduate
        </button>
        <button
          onClick={() => setTab("postgraduate")}
          className={`px-4 py-2 rounded ${
            tab === "postgraduate"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Postgraduate
        </button>
      </div>

      {/* Content */}
      {loading ? (
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
      ) : (
        <>
          {/* Admission Dates */}
          <section className="bg-white rounded shadow p-6 w-fit">
            <h2 className="text-xl font-semibold text-blue-700 mb-4">
              📅 Admission Dates
            </h2>
            <div className="space-y-3">
              <div className="flex gap-2 items-center">
                <label className="w-24">Start:</label>
                <input
                  type="date"
                  value={admissionStart}
                  onChange={(e) => setAdmissionStart(e.target.value)}
                  className="border p-2 rounded w-full"
                />
              </div>
              <div className="flex gap-2 items-center">
                <label className="w-24">Deadline:</label>
                <input
                  type="date"
                  value={admissionDeadline}
                  onChange={(e) => setAdmissionDeadline(e.target.value)}
                  className="border p-2 rounded w-full"
                />
              </div>
              <button
                onClick={saveDeadline}
                className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Save Dates
              </button>
            </div>
          </section>

          {/* Program Availability */}
          <section className="bg-white rounded shadow p-6">
            <h2 className="text-xl font-semibold text-blue-700 mb-4">
              📝 Program Availability
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {/* Colleges */}
              <div className="bg-gray-50 rounded p-4">
                <h3 className="font-semibold mb-2">Colleges</h3>
                <ul className="space-y-1 max-h-64 overflow-auto">
                  {colleges.map((college) => (
                    <li key={college.id}>
                      <button
                        onClick={() => handleCollegeSelect(college.id)}
                        className={`w-full text-left px-3 py-1 rounded ${
                          selectedCollege === college.id
                            ? "bg-blue-100 font-semibold"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        {college.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Programs */}
              <div className="md:col-span-2 bg-gray-50 rounded p-4">
                {selectedCollege ? (
                  <>
                    <ul className="space-y-1 max-h-64 overflow-auto">
                      {colleges
                        .find((c) => c.id === selectedCollege)
                        ?.programs.map((p: any) => (
                          <li key={p.id}>
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={localSelections.has(p.id)}
                                onChange={() => handleToggleProgram(p.id)}
                              />
                              {p.name}{" "}
                              <span className="text-sm text-gray-500">
                                ({p.year} years)
                              </span>
                            </label>
                          </li>
                        ))}
                    </ul>
                    <button
                      onClick={handleSaveAvailability}
                      disabled={saving}
                      className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                    >
                      {saving ? "Saving..." : "Save Availability"}
                    </button>
                  </>
                ) : (
                  <p className="text-gray-500 italic">
                    Select a college to assign availability.
                  </p>
                )}
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
