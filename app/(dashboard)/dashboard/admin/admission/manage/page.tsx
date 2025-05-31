"use client";

import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CollegeProgramManagerPage() {
  const [tab, setTab] = useState<"undergraduate" | "postgraduate">("undergraduate");

  const [colleges, setColleges] = useState<any[]>([]);
  const [newCollege, setNewCollege] = useState("");
  const [editingCollege, setEditingCollege] = useState<number | null>(null);
  const [editingCollegeName, setEditingCollegeName] = useState("");
  const [selectedCollege, setSelectedCollege] = useState<number | null>(null);
  const [newProgramName, setNewProgramName] = useState("");
  const [newProgramYear, setNewProgramYear] = useState(1);

  const router = useRouter();

  const fetchData = async () => {
    const res = await fetch(`/api/admission/${tab}/colleges`);
    const data = await res.json();
    setColleges(data);
  };

  useEffect(() => {
    fetchData();
  }, [tab]);

  // College actions
  const createCollege = async () => {
    if (!newCollege) return;
    await fetch(`/api/admission/${tab}/colleges/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newCollege }),
    });
    setNewCollege("");
    fetchData();
  };

  const editCollege = async (collegeId: number) => {
    if (!editingCollegeName) return;
    await fetch(`/api/admission/${tab}/colleges/${collegeId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: editingCollegeName }),
    });
    setEditingCollege(null);
    fetchData();
  };

  const deleteCollege = async (collegeId: number) => {
    if (!confirm("Are you sure?")) return;
    await fetch(`/api/admission/${tab}/colleges/${collegeId}`, { method: "DELETE" });
    if (selectedCollege === collegeId) setSelectedCollege(null);
    fetchData();
  };

  // Program actions
  const createProgram = async () => {
    if (!selectedCollege || !newProgramName) return;
    await fetch(`/api/admission/${tab}/programs/create`, {
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
    await fetch(`/api/admission/${tab}/programs/${program.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName, year: newYear }),
    });
    fetchData();
  };

  const deleteProgram = async (programId: number) => {
    if (!confirm("Are you sure?")) return;
    await fetch(`/api/admission/${tab}/programs/${programId}`, { method: "DELETE" });
    fetchData();
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-2 space-y-10 text-gray-800">
      <header>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-blue-600">
              🏫 Create & Manage Colleges & Programs
            </h1>
            <p className="text-gray-600">
              Add, edit, and manage colleges and their programs.
            </p>
          </div>

          <button
            onClick={() => router.back()}
            className="inline-block flex px-5 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4 self-center" />
            <span className="ms-2">Back</span>
          </button>
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

      <div className="grid md:grid-cols-2 gap-6">
        {/* Colleges */}
        <div>
          <div className="flex gap-2 mb-3">
            <input
              value={newCollege}
              onChange={(e) => setNewCollege(e.target.value)}
              placeholder="New college name"
              className="border p-2 rounded w-full"
            />
            <button
              onClick={createCollege}
              className="bg-blue-600 text-white px-3 rounded hover:bg-blue-700"
            >
              Add
            </button>
          </div>
          <ul className="space-y-2 max-h-60 overflow-y-auto">
            {colleges.map((college) => (
              <li
                key={college.id}
                className={`flex justify-between items-center p-2 rounded ${
                  selectedCollege === college.id ? "bg-blue-50" : "bg-gray-50"
                }`}
              >
                {editingCollege === college.id ? (
                  <>
                    <input
                      value={editingCollegeName}
                      onChange={(e) => setEditingCollegeName(e.target.value)}
                      className="border p-1 rounded flex-1 mr-2"
                    />
                    <button
                      onClick={() => editCollege(college.id)}
                      className="bg-green-600 text-white px-2 rounded hover:bg-green-700"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingCollege(null)}
                      className="bg-gray-400 text-white px-2 rounded"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setSelectedCollege(college.id)}
                      className="flex-1 text-left font-medium text-gray-700 hover:text-blue-600"
                    >
                      {college.name}
                    </button>
                    <button
                      onClick={() => {
                        setEditingCollege(college.id);
                        setEditingCollegeName(college.name);
                      }}
                      className="bg-yellow-50 border-yellow-600 border text-yellow-600 px-2 rounded hover:bg-yellow-100 me-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteCollege(college.id)}
                      className="bg-red-600 text-white px-2 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Programs */}
        <div>
          {selectedCollege ? (
            <>
              <div className="flex gap-2 mb-3">
                <input
                  value={newProgramName}
                  onChange={(e) => setNewProgramName(e.target.value)}
                  placeholder="Program name"
                  className="border p-2 rounded w-full"
                />
                <input
                  type="number"
                  value={newProgramYear}
                  onChange={(e) => setNewProgramYear(Number(e.target.value))}
                  className="border p-2 rounded w-20"
                />
                <button
                  onClick={createProgram}
                  className="bg-blue-600 text-white px-3 rounded hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
              <ul className="space-y-2 max-h-60 overflow-y-auto">
                {colleges.find((c) => c.id === selectedCollege)?.programs.map((p: any) => (
                  <li key={p.id} className="flex items-center gap-2">
                    <input
                      defaultValue={p.name}
                      onBlur={(e) =>
                        e.target.value !== p.name &&
                        editProgram(p, e.target.value, p.year)
                      }
                      className="border p-1 rounded flex-1"
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
                      className="bg-red-600 text-white px-2 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="text-gray-500 italic">
              Select a college to manage its programs.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
