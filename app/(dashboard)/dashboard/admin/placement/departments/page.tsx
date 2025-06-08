"use client";

import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { FiTrash2, FiPlus, FiRefreshCw } from "react-icons/fi";

export default function DepartmentPage() {
  const [departments, setDepartments] = useState([]);
  const [departmentName, setDepartmentName] = useState("");
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch existing departments
  const fetchDepartments = async () => {
    setRefreshing(true);
    try {
      const res = await fetch("/api/admin/placement/exit-exam/departments");
      const data = await res.json();
      setDepartments(data || []);
    } catch {
      toast.error("Failed to load departments");
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  // Handle creation
  const handleCreate = async () => {
    if (!departmentName.trim()) {
      toast.error("Department name is required");
      return;
    }

    const toastId = toast.loading("Creating department...");
    setLoading(true);

    try {
      const res = await fetch("/api//admin/placement/exit-exam/departments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: departmentName }),
      });

      if (!res.ok) throw new Error(await res.text());

      toast.success("Department created!", { id: toastId });
      setDepartmentName("");
      fetchDepartments();
    } catch (err: any) {
      toast.error(err.message || "Failed to create department", {
        id: toastId,
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this department?"
    );
    if (!confirm) return;

    setDeletingId(id);
    const toastId = toast.loading("Deleting department...");
    try {
      const res = await fetch(
        `/api/admin/placement/exit-exam/departments/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok) throw new Error(await res.text());
      toast.success("Department deleted!", { id: toastId });
      fetchDepartments();
    } catch (err: any) {
      toast.error(err.message || "Failed to delete department", {
        id: toastId,
      });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="flex flex-col items-center py-10">
      <Toaster position="top-center" />
      <div className="bg-white rounded p-8 w-full max-w-xl border border-blue-100">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-extrabold text-blue-500 tracking-tight">
            Manage Departments
          </h1>
          <button
            onClick={fetchDepartments}
            disabled={refreshing}
            title="Refresh"
            className="p-2 rounded-full hover:bg-blue-50 transition disabled:opacity-50"
          >
            <FiRefreshCw className={`w-5 h-5 ${refreshing ? "animate-spin" : ""}`} />
          </button>
        </div>

        {/* Create Form */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <input
            type="text"
            placeholder="Department Name"
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
            className="flex-1 p-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 "
            disabled={loading}
          />
          <button
            onClick={handleCreate}
            disabled={loading}
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition disabled:opacity-60"
          >
            <FiPlus />
            {loading ? "Creating..." : "Create"}
          </button>
        </div>

        {/* List of Departments */}
        <div>
          <h2 className="text-lg font-semibold text-blue-500 mb-3">
            Departments
          </h2>
          {departments.length === 0 ? (
            <div className="flex flex-col items-center py-8 text-gray-400">
              <svg width="48" height="48" fill="none" className="mb-2">
                <circle cx="24" cy="24" r="22" stroke="#93c5fd" strokeWidth="2" />
                <path d="M16 32h16M16 24h16M16 16h16" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <p>No departments found.</p>
            </div>
          ) : (
            <ul className="divide-y divide-blue-50">
              {departments.map((dept: any) => (
                <li
                  key={dept.id}
                  className="flex items-center justify-between py-3 px-2 hover:bg-blue-50 rounded transition"
                >
                  <span className="font-medium text-gray-800">{dept.name}</span>
                  <button
                    onClick={() => handleDelete(dept.id)}
                    disabled={deletingId === dept.id}
                    className="flex items-center gap-1 text-red-600 hover:text-red-800 px-3 py-1 rounded hover:bg-red-50 transition disabled:opacity-50"
                  >
                    <FiTrash2 />
                    {deletingId === dept.id ? "Deleting..." : "Delete"}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
