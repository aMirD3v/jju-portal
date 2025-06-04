"use client";
import { useEffect, useState } from "react";
import {
  FaSpinner,
  FaSearch,
  FaDoorOpen,
  FaTrashAlt,
  FaUserGraduate,
} from "react-icons/fa";
import toast from "react-hot-toast";

interface Placement {
  id: string; // for deleting
  studentId: string;
  name: string;
  department: string;
  room: string;
}

export default function ViewPlacementPage() {
  const [placements, setPlacements] = useState<Placement[]>([]);
  const [filtered, setFiltered] = useState<Placement[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchPlacements();
  }, []);

  const fetchPlacements = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/placement/view");
    if (res.ok) {
      const data = await res.json();
      setPlacements(data);
      setFiltered(data);
    } else {
      toast.error("Failed to fetch placements.");
    }
    setLoading(false);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFiltered(placements);
    } else {
      const lower = query.toLowerCase();
      setFiltered(
        placements.filter(
          (p) =>
            p.studentId.toLowerCase().includes(lower) ||
            p.name.toLowerCase().includes(lower) ||
            p.department.toLowerCase().includes(lower) ||
            p.room.toLowerCase().includes(lower)
        )
      );
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this placement?")) return;

    const toastId = toast.loading("Deleting...");
    try {
      const res = await fetch(`/api/admin/placement/delete/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete placement.");

      toast.success("Placement deleted!", { id: toastId });
      await fetchPlacements();
    } catch (error) {
      console.error(error);
      toast.error("Error deleting placement.", { id: toastId });
    }
  };

  return (
    <div className="min-h-screen p-8 ">
      <h1 className="text-3xl font-bold text-blue-600 mb-4 text-center flex items-center justify-center gap-2">
        <FaUserGraduate /> Student Room Assignments
      </h1>

      {/* Search */}
      <div className="flex justify-center mb-4">
        <div className="flex items-center gap-2 bg-white rounded shadow px-3 py-2 w-full max-w-md">
          <FaSearch className="text-blue-400" />
          <input
            type="text"
            placeholder="Search by name, ID, department, room..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="flex-1 outline-none"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center gap-2 text-blue-500">
          <FaSpinner className="animate-spin" /> Loading assignments...
        </div>
      ) : (
        <div className="overflow-x-auto rounded shadow-md bg-white">
          <table className="min-w-full border border-gray-200 text-sm">
            <thead className="bg-blue-100 text-blue-700 font-semibold">
              <tr>
                <th className="p-3 border">Student ID</th>
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Department</th>
                <th className="p-3 border">Room</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr
                  key={p.id}
                  className="hover:bg-blue-50 transition-colors border-b last:border-b-0"
                >
                  <td className="p-3 border">{p.studentId}</td>
                  <td className="p-3 border">{p.name}</td>
                  <td className="p-3 border">{p.department}</td>
                  <td className="p-3 border flex items-center gap-1 text-green-600 font-medium">
                    <FaDoorOpen /> {p.room}
                  </td>
                  <td className="p-3 border text-center">
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="text-red-500 hover:text-red-700 transition"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-gray-500">
                    No matching placements found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
