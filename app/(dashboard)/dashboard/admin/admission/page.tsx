"use client";

import { useEffect, useState } from "react";

export default function AdmissionManagerPage() {
  const [colleges, setColleges] = useState<any[]>([]);
  const [availableMap, setAvailableMap] = useState<Map<number, Set<number>>>(new Map());
  const [selectedCollege, setSelectedCollege] = useState<number | null>(null);
  const [localSelections, setLocalSelections] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch all colleges and availability
  useEffect(() => {
    async function fetchData() {
      const [collegeRes, availableRes] = await Promise.all([
        fetch("/api/admission/colleges"),
        fetch("/api/admission/available"),
      ]);
      const collegesData = await collegeRes.json();
      const availableData = await availableRes.json();

      setColleges(collegesData);

      // Build map of collegeId -> Set of available programIds
      const map = new Map<number, Set<number>>();
      availableData.forEach((entry: any) => {
        map.set(
          entry.college.id,
          new Set(entry.programs.map((p: any) => p.id))
        );
      });

      setAvailableMap(map);
      setLoading(false);
    }

    fetchData();
  }, []);

  const handleCollegeSelect = (collegeId: number) => {
    setSelectedCollege(collegeId);

    const programs = availableMap.get(collegeId);
    setLocalSelections(new Set(programs ?? []));
  };

  const handleToggleProgram = (programId: number) => {
    setLocalSelections((prev) => {
      const updated = new Set(prev);
      updated.has(programId) ? updated.delete(programId) : updated.add(programId);
      return updated;
    });
  };

  const handleSave = async () => {
    if (!selectedCollege) return;
    setSaving(true);

    await fetch("/api/admission/available/manage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        collegeId: selectedCollege,
        programIds: Array.from(localSelections),
      }),
    });

    // update local cache
    const newMap = new Map(availableMap);
    newMap.set(selectedCollege, new Set(localSelections));
    setAvailableMap(newMap);

    setSaving(false);
    alert("Saved successfully.");
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6 text-blue-700">🎓 Full Admission Control Panel</h1>

      {loading ? (
        <p>Loading colleges and programs...</p>
      ) : (
        <div className="flex gap-6">
          {/* College Selector */}
          <div className="w-1/3 border rounded p-4">
            <h2 className="text-lg font-semibold mb-2">Colleges</h2>
            <ul className="space-y-2 max-h-[500px] overflow-auto">
              {colleges.map((college: any) => (
                <li key={college.id}>
                  <button
                    onClick={() => handleCollegeSelect(college.id)}
                    className={`w-full text-left px-3 py-2 rounded ${
                      selectedCollege === college.id
                        ? "bg-blue-100 text-blue-800 font-semibold"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {college.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Program Selector */}
          <div className="w-2/3 border rounded p-4">
            <h2 className="text-lg font-semibold mb-2">Programs</h2>
            {selectedCollege ? (
              <>
                <ul className="space-y-2 max-h-[500px] overflow-auto">
                  {colleges
                    .find((c) => c.id === selectedCollege)
                    ?.programs.map((program: any) => (
                      <li key={program.id}>
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={localSelections.has(program.id)}
                            onChange={() => handleToggleProgram(program.id)}
                            className="w-4 h-4"
                          />
                          <span>
                            {program.name} ({program.year} years)
                          </span>
                        </label>
                      </li>
                    ))}
                </ul>
                <div className="mt-6">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
                  >
                    {saving ? "Saving..." : "Save Availability"}
                  </button>
                </div>
              </>
            ) : (
              <p className="text-gray-500">Select a college to manage availability.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
