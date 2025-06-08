"use client";

import { useEffect, useState, useMemo } from "react";
import { FaSpinner, FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { Toaster, toast } from "react-hot-toast";

interface Assignment {
  id: string;
  student: {
    studentId: string;
    nationalId?: string;
    name?: string;
    username?: string;
    password?: string;
    department?: {
      name: string;
    };
    examTopic?: string;
    gender?: string;
    enrollmentType?: string;
    phoneNumber?: string;
    latestGpa?: number;
    year?: string;
    createdAt?: string;
    updatedAt?: string;
  };
  room: {
    name: string;
  };
  session: {
    sessionName: string;
    date: string;
    startTime: string;
    endTime: string;
  };
}

type SortKey = keyof Pick<
  | Assignment
  | Assignment["student"]
  | Assignment["room"]
  | Assignment["session"],
  | "studentId"
  | "student"
  | "room"
  | "sessionName"
  | "date"
  | "startTime"
  | "endTime"
>;

type SortDirection = "asc" | "desc" | null;

export default function ViewResultsPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [clearing, setClearing] = useState(false);

  // Filters & controls
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRoom, setFilterRoom] = useState<string | "">("");
  const [filterSession, setFilterSession] = useState<string | "">("");
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDir, setSortDir] = useState<SortDirection>(null);

  // Pagination
  const ITEMS_PER_PAGE = 15;
  const [page, setPage] = useState(1);

  // Extract unique rooms and sessions for filters
  const rooms = useMemo(
    () => [...new Set(assignments.map((a) => a.room.name))].sort(),
    [assignments]
  );
  const sessions = useMemo(
    () => [...new Set(assignments.map((a) => a.session.sessionName))].sort(),
    [assignments]
  );

  // Fetch assignments once or after clearing
  const fetchAssignments = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/placement/exit-exam/view-results");
      if (!res.ok) throw new Error("Failed to fetch assignments");
      const data = await res.json();
      setAssignments(data.assignments || []);
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  // Export CSV
  const exportCSV = () => {
    const rows = [
      [
        "ID",
        "Student ID",
        "National ID",
        "Name",
        "Username",
        "Password",
        "Department",
        "Exam Topic",
        "Gender",
        "Enrollment Type",
        "Phone Number",
        "Latest GPA",
        "Year",
        "Created At",
        "Updated At",
        "Room",
        "Session Name",
        "Session Date",
        "Start Time",
        "End Time",
      ],
      ...assignments.map((a) => [
        a.id,
        a.student.studentId ?? "",
        a.student.nationalId ?? "",
        a.student.name ?? "",
        a.student.username ?? "",
        a.student.password ?? "",
        a.student.department?.name ?? "",
        a.student.examTopic ?? "",
        a.student.gender ?? "",
        a.student.enrollmentType ?? "",
        a.student.phoneNumber ?? "",
        a.student.latestGpa?.toString() ?? "",
        a.student.year ?? "",
        a.student.createdAt
          ? new Date(a.student.createdAt).toLocaleString()
          : "",
        a.student.updatedAt
          ? new Date(a.student.updatedAt).toLocaleString()
          : "",
        a.room.name ?? "",
        a.session.sessionName ?? "",
        a.session.date ? new Date(a.session.date).toLocaleDateString() : "",
        a.session.startTime
          ? new Date(a.session.startTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          : "",
        a.session.endTime
          ? new Date(a.session.endTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          : "",
      ]),
    ];

    const csvContent = rows
      .map((r) =>
        r.map((field) => `"${String(field).replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "placement_results.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  // Handle sorting toggling
  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      // Cycle sort direction: asc -> desc -> null -> asc ...
      if (sortDir === "asc") setSortDir("desc");
      else if (sortDir === "desc") {
        setSortKey(null);
        setSortDir(null);
      } else setSortDir("asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
    setPage(1); // reset page
  };

  // Filtering + Searching + Sorting logic (memoized)
  const filteredAndSorted = useMemo(() => {
    let data = [...assignments];

    // Search filter (name or studentId)
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      data = data.filter(
        (a) =>
          a.student.name.toLowerCase().includes(term) ||
          a.student.studentId.toLowerCase().includes(term)
      );
    }

    // Room filter
    if (filterRoom) {
      data = data.filter((a) => a.room.name === filterRoom);
    }

    // Session filter
    if (filterSession) {
      data = data.filter((a) => a.session.sessionName === filterSession);
    }

    // Sorting
    if (sortKey && sortDir) {
      data.sort((a, b) => {
        let aVal: string | number = "";
        let bVal: string | number = "";

        switch (sortKey) {
          case "student":
            aVal = a.student.name.toLowerCase();
            bVal = b.student.name.toLowerCase();
            break;
          case "studentId":
            aVal = a.student.studentId.toLowerCase();
            bVal = b.student.studentId.toLowerCase();
            break;
          case "room":
            aVal = a.room.name.toLowerCase();
            bVal = b.room.name.toLowerCase();
            break;
          case "sessionName":
            aVal = a.session.sessionName.toLowerCase();
            bVal = b.session.sessionName.toLowerCase();
            break;
          case "date":
            aVal = new Date(a.session.date).getTime();
            bVal = new Date(b.session.date).getTime();
            break;
          case "startTime":
            aVal = new Date(a.session.startTime).getTime();
            bVal = new Date(b.session.startTime).getTime();
            break;
          case "endTime":
            aVal = new Date(a.session.endTime).getTime();
            bVal = new Date(b.session.endTime).getTime();
            break;
          default:
            break;
        }

        if (aVal < bVal) return sortDir === "asc" ? -1 : 1;
        if (aVal > bVal) return sortDir === "asc" ? 1 : -1;
        return 0;
      });
    }

    return data;
  }, [assignments, searchTerm, filterRoom, filterSession, sortKey, sortDir]);

  // Pagination controls
  const totalPages = Math.ceil(filteredAndSorted.length / ITEMS_PER_PAGE);
  const paginated = filteredAndSorted.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  // New: Clear all assignments and students
  const handleClearAllData = async () => {
    if (
      !confirm(
        "Are you sure you want to clear ALL assignments and ALL students? This action cannot be undone."
      )
    ) {
      return;
    }
    setClearing(true);
    try {
      const res = await fetch("/api/admin/placement/exit-exam/clear-all", {
        method: "DELETE",
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to clear data");
      }
      toast.success("All assignments and students cleared.");
      await fetchAssignments(); // refresh list
      setSearchTerm("");
      setFilterRoom("");
      setFilterSession("");
      setSortKey(null);
      setSortDir(null);
      setPage(1);
    } catch (err: any) {
      toast.error(err.message || "Failed to clear data");
    } finally {
      setClearing(false);
    }
  };

  return (
    <div className="relative flex flex-col min-h-screen p-8 ">
      <Toaster position="top-center" />

      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-blue-600 mb-2">
          View Placement Results
        </h1>
        <p className="text-gray-600">
          Check which student is assigned to which room and session.
        </p>
      </header>

      <div className="max-w-6xl mx-auto w-full flex flex-col gap-6">
        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          {/* Search */}
          <input
            type="search"
            aria-label="Search students by name or ID"
            placeholder="Search by Student Name or ID..."
            className="flex-grow max-w-md p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
          />

          {/* Filters */}
          <div className="flex gap-4 flex-wrap justify-center">
            {/* Room Filter */}
            <select
              aria-label="Filter by Room"
              value={filterRoom}
              onChange={(e) => {
                setFilterRoom(e.target.value);
                setPage(1);
              }}
              className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">All Rooms</option>
              {rooms.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>

            {/* Session Filter */}
            <select
              aria-label="Filter by Session"
              value={filterSession}
              onChange={(e) => {
                setFilterSession(e.target.value);
                setPage(1);
              }}
              className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">All Sessions</option>
              {sessions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            {/* Export Button */}
            <button
              onClick={exportCSV}
              className="inline-flex items-center px-4 py-2 bg-blue-50 border-blue-600 border text-blue-600 text-sm font-medium rounded hover:bg-blue-700 hover:text-white"
              title="Export filtered results to CSV"
            >
              Export CSV
            </button>

            {/* Clear All Data Button */}
            <button
              disabled={clearing}
              onClick={handleClearAllData}
              className={`inline-flex items-center px-4 py-2 border text-sm font-medium rounded ${
                clearing
                  ? "bg-gray-300 border-gray-400 text-gray-600 cursor-not-allowed"
                  : "bg-red-50 border-red-600 text-red-600 hover:bg-red-700 hover:text-white"
              }`}
              title="Clear all assignments and students"
            >
              {clearing ? (
                <>
                  <FaSpinner className="animate-spin mr-2" /> Clearing...
                </>
              ) : (
                "Clear All Data"
              )}
            </button>
          </div>
        </div>

        {/* Table */}
        <main className="overflow-x-auto rounded-xl shadow border border-blue-200 bg-white">
          {loading ? (
            <div className="flex justify-center items-center py-20 text-blue-600 gap-3 text-xl">
              <FaSpinner className="animate-spin" />
              Loading results...
            </div>
          ) : filteredAndSorted.length === 0 ? (
            <p className="text-center text-gray-500 p-12">
              No assignments found.
            </p>
          ) : (
            <>
              <table className="min-w-full text-sm text-left text-gray-700">
                <thead className="text-blue-700 bg-blue-50 select-none">
                  <tr>
                    {[
                      { key: "studentId", label: "Student ID" },
                      { key: "student", label: "Student Name" },
                      { key: "room", label: "Room" },
                      { key: "sessionName", label: "Session" },
                      { key: "date", label: "Date" },
                      { key: "startTime", label: "Start Time" },
                      { key: "endTime", label: "End Time" },
                    ].map(({ key, label }) => {
                      const active = sortKey === key;
                      return (
                        <th
                          key={key}
                          className="px-4 py-3 cursor-pointer select-none"
                          onClick={() => handleSort(key as SortKey)}
                          title={`Sort by ${label}`}
                        >
                          <div className="flex items-center gap-1">
                            {label}
                            {active ? (
                              sortDir === "asc" ? (
                                <FaSortUp />
                              ) : sortDir === "desc" ? (
                                <FaSortDown />
                              ) : (
                                <FaSort />
                              )
                            ) : (
                              <FaSort />
                            )}
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((a) => (
                    <tr
                      key={a.id}
                      className="border-t hover:bg-blue-50/60 transition-colors"
                    >
                      <td className="px-4 py-2">{a.student.studentId}</td>
                      <td className="px-4 py-2">{a.student.name}</td>
                      <td className="px-4 py-2">{a.room.name}</td>
                      <td className="px-4 py-2">{a.session.sessionName}</td>
                      <td className="px-4 py-2">
                        {new Date(a.session.date).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-2">
                        {new Date(a.session.startTime).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="px-4 py-2">
                        {new Date(a.session.endTime).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination */}
              <nav
                aria-label="Pagination"
                className="flex justify-center items-center gap-2 my-4 select-none"
              >
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-3 py-1 rounded border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-40"
                  aria-label="Previous page"
                >
                  &lt; Prev
                </button>

                <span>
                  Page{" "}
                  <strong>
                    {page} of {totalPages || 1}
                  </strong>
                </span>

                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages || totalPages === 0}
                  className="px-3 py-1 rounded border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-40"
                  aria-label="Next page"
                >
                  Next &gt;
                </button>
              </nav>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
