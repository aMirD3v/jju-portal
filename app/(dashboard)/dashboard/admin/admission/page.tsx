"use client";

import { useEffect, useState } from "react";

export default function AdmissionManagerPage() {
  const [colleges, setColleges] = useState<any[]>([]);
  const [availableMap, setAvailableMap] = useState<Map<number, Set<number>>>(new Map());
  const [selectedCollege, setSelectedCollege] = useState<number | null>(null);
  const [localSelections, setLocalSelections] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [showManager, setShowManager] = useState(false);

  const [newCollegeName, setNewCollegeName] = useState("");
  const [editingCollegeName, setEditingCollegeName] = useState<string | null>(null);
  const [newProgramName, setNewProgramName] = useState("");
  const [newProgramYear, setNewProgramYear] = useState<number>(1);
  const [admissionStart, setAdmissionStart] = useState("");
  const [admissionDeadline, setAdmissionDeadline] = useState("");

  // Fetch data
  useEffect(() => {
    fetchData();
    fetchConfig();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const [collegeRes, availableRes] = await Promise.all([
      fetch("/api/admission/colleges"),
      fetch("/api/admission/available"),
    ]);
    const collegesData = await collegeRes.json();
    const availableData = await availableRes.json();

    setColleges(collegesData);

    const map = new Map<number, Set<number>>();
    availableData.forEach((entry: any) => {
      map.set(
        entry.college.id,
        new Set(entry.programs.map((p: any) => p.id))
      );
    });

    setAvailableMap(map);
    setLoading(false);
  };

  const fetchConfig = async () => {
    const res = await fetch("/api/admission-config");
    const data = await res.json();
    if (data) {
      setAdmissionStart(data.applicationStart.slice(0, 10));
      setAdmissionDeadline(data.applicationDeadline.slice(0, 10));
    }
  };

  // Availability toggle
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

  const handleSaveAvailability = async () => {
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

    const newMap = new Map(availableMap);
    newMap.set(selectedCollege, new Set(localSelections));
    setAvailableMap(newMap);

    setSaving(false);
    alert("Availability saved.");
  };

  // --- College/Program Management ---
  const createCollege = async () => {
    if (!newCollegeName) return alert("Enter college name.");
    await fetch("/api/admission/colleges/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newCollegeName }),
    });
    setNewCollegeName("");
    fetchData();
  };

  const editCollege = async (college: any) => {
    if (!editingCollegeName) return;
    await fetch(`/api/admission/colleges/${college.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: editingCollegeName }),
    });
    setEditingCollegeName(null);
    fetchData();
  };

  const deleteCollege = async (collegeId: number) => {
    if (!confirm("Are you sure?")) return;
    await fetch(`/api/admission/colleges/${collegeId}`, { method: "DELETE" });
    setSelectedCollege(null);
    fetchData();
  };

  const createProgram = async () => {
    if (!selectedCollege || !newProgramName) return alert("Fill all fields.");
    await fetch("/api/admission/programs/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: newProgramName,
        year: newProgramYear,
        collegeId: selectedCollege,
      }),
    });
    setNewProgramName("");
    setNewProgramYear(1);
    fetchData();
  };

  const editProgram = async (program: any, newName: string, newYear: number) => {
    await fetch(`/api/admission/programs/${program.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName, year: newYear }),
    });
    fetchData();
  };

  const deleteProgram = async (programId: number) => {
    if (!confirm("Are you sure?")) return;
    await fetch(`/api/admission/programs/${programId}`, { method: "DELETE" });
    fetchData();
  };

  const saveDeadline = async () => {
    if (!admissionStart || !admissionDeadline) return alert("Fill both dates.");
    await fetch("/api/admission-config", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        applicationStart: admissionStart,
        applicationDeadline: admissionDeadline,
      }),
    });
    alert("Admission dates updated!");
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6 text-blue-700">🎓 Full Admission Control Panel</h1>

      <button
        onClick={() => setShowManager(!showManager)}
        className="mb-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
      >
        {showManager ? "Hide College/Program Manager" : "Manage Colleges/Programs"}
      </button>

      {showManager && (
        <div className="border p-4 mb-6 rounded bg-gray-50">
          {/* College management */}
          <div className="mb-4">
            <h2 className="font-semibold mb-2">Colleges</h2>
            <div className="flex gap-2 mb-2">
              <input
                value={newCollegeName}
                onChange={(e) => setNewCollegeName(e.target.value)}
                placeholder="New college name"
                className="border p-2 rounded w-64"
              />
              <button
                onClick={createCollege}
                className="px-3 py-1 bg-blue-600 text-white rounded"
              >
                Add
              </button>
            </div>
            <ul className="space-y-1 max-h-40 overflow-auto">
              {colleges.map((c) => (
                <li key={c.id} className="flex items-center gap-2">
                  {editingCollegeName !== null && selectedCollege === c.id ? (
                    <>
                      <input
                        value={editingCollegeName}
                        onChange={(e) => setEditingCollegeName(e.target.value)}
                        className="border p-1 rounded"
                      />
                      <button
                        onClick={() => editCollege(c)}
                        className="px-2 py-1 bg-green-600 text-white rounded"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingCollegeName(null)}
                        className="px-2 py-1 bg-gray-400 text-white rounded"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setSelectedCollege(c.id)}
                        className={`flex-1 text-left ${
                          selectedCollege === c.id ? "font-semibold text-blue-700" : ""
                        }`}
                      >
                        {c.name}
                      </button>
                      <button
                        onClick={() => {
                          setSelectedCollege(c.id);
                          setEditingCollegeName(c.name);
                        }}
                        className="px-2 py-1 bg-yellow-500 text-white rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteCollege(c.id)}
                        className="px-2 py-1 bg-red-600 text-white rounded"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Program management */}
          {selectedCollege && (
            <div className="mb-4">
              <h2 className="font-semibold mb-2">Programs</h2>
              <div className="flex gap-2 mb-2">
                <input
                  value={newProgramName}
                  onChange={(e) => setNewProgramName(e.target.value)}
                  placeholder="Program name"
                  className="border p-2 rounded w-64"
                />
                <input
                  type="number"
                  value={newProgramYear}
                  onChange={(e) => setNewProgramYear(Number(e.target.value))}
                  placeholder="Years"
                  className="border p-2 rounded w-20"
                />
                <button
                  onClick={createProgram}
                  className="px-3 py-1 bg-blue-600 text-white rounded"
                >
                  Add
                </button>
              </div>
              <ul className="space-y-1 max-h-40 overflow-auto">
                {colleges.find((c) => c.id === selectedCollege)?.programs.map((p: any) => (
                  <li key={p.id} className="flex items-center gap-2">
                    <input
                      defaultValue={p.name}
                      onBlur={(e) =>
                        e.target.value !== p.name &&
                        editProgram(p, e.target.value, p.year)
                      }
                      className="border p-1 rounded w-64"
                    />
                    <input
                      type="number"
                      defaultValue={p.year}
                      onBlur={(e) =>
                        Number(e.target.value) !== p.year &&
                        editProgram(p, p.name, Number(e.target.value))
                      }
                      className="border p-1 rounded w-20"
                    />
                    <button
                      onClick={() => deleteProgram(p.id)}
                      className="px-2 py-1 bg-red-600 text-white rounded"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Admission config */}
          <div>
            <h2 className="font-semibold mb-2">Admission Dates</h2>
            <div className="flex gap-2 items-center">
              <label>Start:</label>
              <input
                type="date"
                value={admissionStart}
                onChange={(e) => setAdmissionStart(e.target.value)}
                className="border p-1 rounded"
              />
              <label>Deadline:</label>
              <input
                type="date"
                value={admissionDeadline}
                onChange={(e) => setAdmissionDeadline(e.target.value)}
                className="border p-1 rounded"
              />
              <button
                onClick={saveDeadline}
                className="px-3 py-1 bg-green-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Availability management */}
      {loading ? (
        <p>Loading colleges and programs...</p>
      ) : (
        <div className="flex gap-6">
          <div className="w-1/3 border rounded p-4">
            <h2 className="text-lg font-semibold mb-2">Colleges</h2>
            <ul className="space-y-2 max-h-64 overflow-auto">
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

          <div className="w-2/3 border rounded p-4">
            <h2 className="text-lg font-semibold mb-2">Programs</h2>
            {selectedCollege ? (
              <>
                <ul className="space-y-2 max-h-64 overflow-auto">
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
                    onClick={handleSaveAvailability}
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
