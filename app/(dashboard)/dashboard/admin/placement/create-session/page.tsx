"use client";

import { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { FaTrash, FaPlus, FaCalendarAlt } from "react-icons/fa";

export default function CreateSessionPage() {
  const [departments, setDepartments] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [sessionName, setSessionName] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDepartments();
    fetchSessions();
  }, []);

  const fetchDepartments = async () => {
    try {
      const res = await fetch("/api/admin/placement/exit-exam/departments");
      const data = await res.json();
      setDepartments(data);
    } catch {
      toast.error("Failed to load departments.");
    }
  };

  const fetchSessions = async () => {
    try {
      const res = await fetch("/api/admin/placement/exit-exam/sessions");
      const data = await res.json();
      setSessions(data.sessions || []);
    } catch {
      toast.error("Failed to load sessions.");
    }
  };

  const handleSubmit = async () => {
    if (!sessionName || !date || !startTime || !endTime || !departmentId) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Creating session...");
    try {
      const res = await fetch("/api/admin/placement/exit-exam/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionName,
          date,
          startTime,
          endTime,
          departmentId,
        }),
      });

      if (!res.ok) throw new Error(await res.text());
      toast.success("Session created!", { id: toastId });

      setSessionName("");
      setDate("");
      setStartTime("");
      setEndTime("");
      setDepartmentId("");
      fetchSessions();
    } catch (err: any) {
      toast.error(err.message || "Failed to create session", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = confirm("Are you sure you want to delete this session?");
    if (!confirmed) return;

    const toastId = toast.loading("Deleting session...");
    try {
      const res = await fetch(`/api/admin/placement/exit-exam/sessions/${id}`, {
        method: "DELETE",
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.message || "Failed to delete");
      toast.success("Session deleted", { id: toastId });
      fetchSessions();
    } catch (err: any) {
      toast.error(err.message, { id: toastId });
    }
  };

  return (
    <div className="p-8">
      <Toaster position="top-center" />
      <h1 className="text-3xl font-bold text-blue-600 mb-6 flex items-center gap-2">
        <FaCalendarAlt /> Create & Manage Sessions
      </h1>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Form */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4 text-blue-500">
            Create New Session
          </h2>
          <div className="flex flex-col gap-3">
            <label className="flex flex-col gap-1">
              <span className="font-medium">Session Name</span>
              <input
                id="sessionName"
                type="text"
                placeholder="Enter session name"
                value={sessionName}
                onChange={(e) => setSessionName(e.target.value)}
                className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </label>

            <label className="flex flex-col gap-1">
              <span className="font-medium">Date</span>
              <input
                id="sessionDate"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="p-3 border rounded"
              />
            </label>

            <label className="flex flex-col gap-1">
              <span className="font-medium">Start Time</span>
              <input
                id="startTime"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="p-3 border rounded"
              />
            </label>

            <label className="flex flex-col gap-1">
              <span className="font-medium">End Time</span>
              <input
                id="endTime"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="p-3 border rounded"
              />
            </label>

            <label className="flex flex-col gap-1">
              <span className="font-medium">Department</span>
              <select
                id="departmentSelect"
                value={departmentId}
                onChange={(e) => setDepartmentId(e.target.value)}
                className="p-3 border rounded"
              >
                <option value="">Select Department</option>
                {departments.map((dept: any) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </label>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 rounded hover:from-blue-600 hover:to-blue-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                "Creating..."
              ) : (
                <>
                  <FaPlus /> Create Session
                </>
              )}
            </button>
          </div>
        </div>

        {/* Sessions Table */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4 text-blue-500">
            Existing Sessions
          </h2>
          {sessions.length === 0 ? (
            <p className="text-gray-500">No sessions available.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left border border-blue-200">
                <thead className="bg-blue-50 text-blue-700">
                  <tr>
                    <th className="px-4 py-2">Session</th>
                    <th className="px-4 py-2">Date</th>
                    <th className="px-4 py-2">Time</th>
                    <th className="px-4 py-2">Department</th>
                    <th className="px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sessions.map((s: any) => (
                    <tr key={s.id} className="border-t hover:bg-blue-50">
                      <td className="px-4 py-2">{s.sessionName}</td>
                      <td className="px-4 py-2">
                        {new Date(s.date).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-2">
                        {new Date(s.startTime).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}{" "}
                        -{" "}
                        {new Date(s.endTime).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="px-4 py-2">{s.department.name}</td>
                      <td className="px-4 py-2">
                        {s._count?.assignments > 0 ? (
                          <span className="text-gray-400 italic text-sm">
                            Has assignments
                          </span>
                        ) : (
                          <button
                            onClick={() => handleDelete(s.id)}
                            className="text-red-600 hover:text-red-800 flex items-center gap-1 text-sm"
                          >
                            <FaTrash /> Delete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
