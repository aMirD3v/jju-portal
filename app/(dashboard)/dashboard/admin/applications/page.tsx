"use client";
import { useEffect, useState } from "react";
import { XCircleIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import { Menu } from "@headlessui/react";

type StudentRecord = {
  id: string;
  studentID: string;
  firstName: string;
  fatherName: string;
  gFatherName: string;
  institute: string;
  department: string;
  academicYear: string;
  status: string;
};

export default function ApplicationsPage() {
  const [programLevel, setProgramLevel] = useState<
    "undergraduate" | "postgraduate"
  >("undergraduate");
  const [applications, setApplications] = useState<StudentRecord[]>([]);
  const [filtered, setFiltered] = useState<StudentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState<any | null>(null);

  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [rejectionApp, setRejectionApp] = useState<StudentRecord | null>(null);

  const [institutes, setInstitutes] = useState<string[]>([]);
  const [departments, setDepartments] = useState<string[]>([]);
  const [years, setYears] = useState<string[]>([]);

  const [selectedInstitute, setSelectedInstitute] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortKey, setSortKey] = useState<keyof StudentRecord>("studentID");
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    const fetchAllApplications = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/admission-officer/${programLevel}/applications`
        );
        const data = await res.json();

        setApplications(data.applications);
        setFiltered(data.applications);
        setInstitutes(data.institutes);
        setDepartments(data.departments);
        setYears(data.years.sort());
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllApplications();
  }, [programLevel]);

  useEffect(() => {
    let result = [...applications];

    if (selectedInstitute) {
      result = result.filter((app) => app.institute === selectedInstitute);
    }
    if (selectedDepartment) {
      result = result.filter((app) => app.department === selectedDepartment);
    }
    if (selectedYear) {
      result = result.filter((app) => app.academicYear === selectedYear);
    }
    if (searchQuery) {
      result = result.filter(
        (app) =>
          `${app.firstName} ${app.fatherName}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          app.studentID.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    result.sort((a, b) => {
      const valA = a[sortKey]?.toLowerCase?.() ?? a[sortKey];
      const valB = b[sortKey]?.toLowerCase?.() ?? b[sortKey];
      if (valA < valB) return sortAsc ? -1 : 1;
      if (valA > valB) return sortAsc ? 1 : -1;
      return 0;
    });

    setFiltered(result);
  }, [
    applications,
    selectedInstitute,
    selectedDepartment,
    selectedYear,
    searchQuery,
    sortKey,
    sortAsc,
  ]);

  const updateStatus = async (app: StudentRecord, newStatus: string) => {
    try {
      await fetch(
        `/api/admission-officer/${programLevel}/applications/${app.id}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      setFiltered((prev) =>
        prev.map((a) =>
          a.studentID === app.studentID ? { ...a, status: newStatus } : a
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const viewApplication = async (id: string) => {
    try {
      const res = await fetch(
        `/api/admission-officer/${programLevel}/applications/${id}`
      );
      if (res.ok) {
        const data = await res.json();
        setSelectedApp(data);
      } else {
        alert("Full application data not found.");
      }
    } catch (error) {
      console.error("Error fetching application details:", error);
    }
  };

  const toggleSort = (key: keyof StudentRecord) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const statusBadge = (status: string) => {
    const base = "px-2 py-1 rounded-full text-xs font-semibold";
    if (status === "approved")
      return (
        <span className={`${base} bg-green-100 text-green-800`}>Approved</span>
      );
    if (status === "rejected")
      return (
        <span className={`${base} bg-red-100 text-red-800`}>Rejected</span>
      );
    return (
      <span className={`${base} bg-yellow-100 text-yellow-800`}>Pending</span>
    );
  };

  const isPdfFile = (url: string) => {
    return url.toLowerCase().endsWith(".pdf");
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-xl shadow">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">
        Applications Management
      </h1>

      {/* Filters */}
      <div className="grid md:grid-cols-5 gap-4 mb-6">
        {/* Program level selector */}

        <select
          value={programLevel}
          onChange={(e) =>
            setProgramLevel(e.target.value as "undergraduate" | "postgraduate")
          }
          className="border border-blue-500 rounded p-2"
        >
          <option value="undergraduate">Undergraduate</option>
          <option value="postgraduate">Postgraduate</option>
        </select>

        <select
          className="p-2 border border-blue-500 rounded"
          value={selectedInstitute}
          onChange={(e) => {
            setSelectedInstitute(e.target.value);
            setSelectedDepartment("");
          }}
        >
          <option value="">All Institutes</option>
          {institutes.map((i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>

        <select
          className="p-2 border border-blue-500 rounded"
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          disabled={!selectedInstitute}
        >
          <option value="">All Departments</option>
          {departments
            .filter(
              (d) =>
                !selectedInstitute ||
                applications.some(
                  (a) => a.institute === selectedInstitute && a.department === d
                )
            )
            .map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
        </select>

        <select
          className="p-2 border border-blue-500 rounded"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="">All Years</option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>

        <input
          type="text"
          className="p-2 border border-blue-500 rounded text-sm"
          placeholder="Search by name or ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <button
          onClick={() => {
            setSelectedInstitute("");
            setSelectedDepartment("");
            setSelectedYear("");
            setSearchQuery("");
          }}
          className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded text-sm"
        >
          Reset Filters
        </button>
      </div>

      <div className="text-sm text-gray-500 mb-2">
        Showing <strong>{filtered.length}</strong> of{" "}
        <strong>{applications.length}</strong> applications
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex justify-center items-center py-12">Loading...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <XCircleIcon className="w-10 h-10 mx-auto text-gray-300 mb-2" />
          No applications found.
        </div>
      ) : (
        <div className="overflow-x-auto border border-blue-200 rounded-lg">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-blue-50 text-blue-600 uppercase text-xs font-semibold">
              <tr>
                {[
                  "studentID",
                  "firstName",
                  "institute",
                  "department",
                  "academicYear",
                  "status",
                ].map((key) => (
                  <th
                    key={key}
                    className="px-4 py-3 cursor-pointer"
                    onClick={() => toggleSort(key as keyof StudentRecord)}
                  >
                    {key.replace(/([A-Z])/g, " $1")}
                    {sortKey === key && (sortAsc ? " ↑" : " ↓")}
                  </th>
                ))}
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((app) => (
                <tr key={app.studentID} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono">{app.studentID}</td>
                  <td className="px-4 py-3">
                    {app.firstName} {app.fatherName} {app.gFatherName}
                  </td>
                  <td className="px-4 py-3">{app.institute}</td>
                  <td className="px-4 py-3">{app.department}</td>
                  <td className="px-4 py-3">{app.academicYear}</td>
                  <td className="px-4 py-3">{statusBadge(app.status)}</td>
                  <td className="px-4 py-3">
                    <Menu as="div" className="relative inline-block text-left">
                      <Menu.Button className="inline-flex items-center px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded">
                        Actions
                        <ChevronDownIcon className="w-4 h-4 ml-1" />
                      </Menu.Button>
                      <Menu.Items className="absolute z-10 mt-2 w-25 origin-top-right bg-white border border-blue-500 rounded shadow-lg">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`w-full text-left px-4 py-2 text-sm ${
                                active ? "bg-green-100" : ""
                              }`}
                              onClick={() => updateStatus(app, "approved")}
                            >
                              Approve
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`w-full text-left px-4 py-2 text-sm ${
                                active ? "bg-red-100" : ""
                              }`}
                              onClick={() => {
                                setRejectionApp(app);
                                setShowRejectionModal(true);
                              }}
                            >
                              Reject
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => viewApplication(app.id)}
                              className={`w-full text-left px-4 py-2 text-sm ${
                                active ? "bg-blue-100" : ""
                              }`}
                            >
                              View
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Menu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Rejection Reason Modal */}
      {showRejectionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full">
            <h2 className="text-lg font-semibold text-red-600 mb-3">
              Rejection Reason
            </h2>
            <textarea
              className="w-full border border-gray-300 rounded p-2 text-sm"
              placeholder="Enter reason for rejection..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
            />
            <div className="mt-4 flex justify-end gap-2">
              <button
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
                onClick={() => {
                  setShowRejectionModal(false);
                  setRejectionReason("");
                  setRejectionApp(null);
                }}
              >
                Cancel
              </button>
              <button
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                onClick={async () => {
                  if (rejectionApp && rejectionReason.trim()) {
                    await fetch(
                      `/api/admission-officer/${programLevel}/applications/${rejectionApp.id}/status`,
                      {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          status: "rejected",
                          rejectionReason,
                        }),
                      }
                    );

                    setFiltered((prev) =>
                      prev.map((a) =>
                        a.studentID === rejectionApp.studentID
                          ? { ...a, status: "rejected" }
                          : a
                      )
                    );

                    setShowRejectionModal(false);
                    setRejectionReason("");
                    setRejectionApp(null);
                  }
                }}
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Application Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-red-600"
              onClick={() => setSelectedApp(null)}
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold text-blue-600 mb-4">
              Application Details
            </h2>

            {/* Student Photo */}
            {selectedApp.studentPhotoUrl && (
              <div className="mb-4 flex justify-center">
                <img
                  src={selectedApp.studentPhotoUrl}
                  alt="Student"
                  className="w-32 h-32 object-cover rounded-full border-4 border-blue-200 shadow"
                />
              </div>
            )}

            {/* Personal Information */}
            <section className="mb-6">
              <h3 className="text-lg font-semibold text-blue-500 mb-2">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                <p>
                  <strong>Full Name:</strong> {selectedApp.firstName}{" "}
                  {selectedApp.fatherName} {selectedApp.gFatherName}
                </p>
                <p>
                  <strong>Gender:</strong> {selectedApp.sex}
                </p>
                <p>
                  <strong>Date of Birth:</strong>{" "}
                  {selectedApp.dob
                    ? new Date(selectedApp.dob).toLocaleDateString()
                    : "-"}
                </p>
                <p>
                  <strong>Institute:</strong> {selectedApp.institute}
                </p>
                <p>
                  <strong>Department:</strong> {selectedApp.department}
                </p>
                <p>
                  <strong>Admission Type:</strong> {selectedApp.admission}
                </p>
                <p>
                  <strong>Academic Year:</strong> {selectedApp.academicYear}
                </p>
                <p>
                  <strong>Student ID:</strong> {selectedApp.studentID}
                </p>
                <p>
                  <strong>Status:</strong> {selectedApp.status}
                </p>
              </div>
            </section>

            {/* Contact Information */}
            <section className="mb-6">
              <h3 className="text-lg font-semibold text-blue-500 mb-2">
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                <p>
                  <strong>Email:</strong> {selectedApp.studentEmail}
                </p>
                <p>
                  <strong>Phone:</strong> {selectedApp.studentPhone}
                </p>
                <p>
                  <strong>Region:</strong> {selectedApp.region}
                </p>
                <p>
                  <strong>Zone:</strong> {selectedApp.zone}
                </p>
                <p>
                  <strong>Woreda:</strong> {selectedApp.woreda}
                </p>
              </div>
            </section>

            {/* Post-Secondary Education */}
            {selectedApp.postSecondary &&
              selectedApp.postSecondary.length > 0 && (
                <section className="mb-6">
                  <h3 className="text-lg font-semibold text-blue-500 mb-2">
                    Post-Secondary Education
                  </h3>
                  <ul className="list-disc ml-6 text-sm text-gray-700 space-y-1">
                    {selectedApp.postSecondary.map((edu: any, idx: number) => (
                      <li key={idx}>
                        {edu.institutionName} - {edu.country}, CGPA:{" "}
                        {edu.cgpaEarned}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

            {/* Sponsor */}
            {selectedApp.sponsor && (
              <section className="mb-6">
                <h3 className="text-lg font-semibold text-blue-500 mb-2">
                  Sponsor Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                  <p>
                    <strong>Sponsor:</strong> {selectedApp.sponsor}
                  </p>
                  <p>
                    <strong>Name:</strong> {selectedApp.sponsorName || "-"}
                  </p>
                  <p>
                    <strong>Email:</strong> {selectedApp.sponsorEmail || "-"}
                  </p>
                  <p>
                    <strong>Region:</strong> {selectedApp.sponsorRegion || "-"}
                  </p>
                  <p>
                    <strong>Zone:</strong> {selectedApp.sponsorZone || "-"}
                  </p>
                  <p>
                    <strong>Woreda:</strong> {selectedApp.sponsorWoreda || "-"}
                  </p>
                  <p>
                    <strong>Website:</strong>
                    {selectedApp.sponsorURL ? (
                      <a
                        href={selectedApp.sponsorURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline ml-1"
                      >
                        {selectedApp.sponsorURL}
                      </a>
                    ) : (
                      " -"
                    )}
                  </p>
                </div>
              </section>
            )}

            {/* Uploaded Documents */}
            <section>
              <h3 className="text-lg font-semibold text-blue-500 mb-2">
                Uploaded Documents
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: "Diploma", url: selectedApp.diplomaUrl },
                  {
                    label: "High School Transcript",
                    url: selectedApp.highSchoolUrl,
                  },
                  { label: "Grade 12 Result", url: selectedApp.grade12Url },
                  { label: "Grade 10 Result", url: selectedApp.grade10Url },
                  { label: "Grade 8 Result", url: selectedApp.grade8Url },
                ].map(
                  (doc) =>
                    doc.url && (
                      <div
                        key={doc.label}
                        className="border rounded p-2 shadow-sm flex flex-col"
                      >
                        <p className="text-sm text-gray-700 font-medium mb-1">
                          {doc.label}
                        </p>
                        {isPdfFile(doc.url) ? (
                          <div className="flex flex-col items-center justify-center bg-gray-100 border rounded p-4 h-40">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-12 w-12 text-red-600 mb-2"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M6 2a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6H6zM6 20V4h7v5h5v11H6z" />
                            </svg>
                            <p className="text-xs text-gray-600">
                              PDF Document
                            </p>
                          </div>
                        ) : (
                          <img
                            src={doc.url}
                            alt={doc.label}
                            className="w-full h-40 object-cover rounded border"
                          />
                        )}
                        <a
                          href={doc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-xs text-blue-600 mt-1 hover:underline"
                        >
                          View / Download
                        </a>
                      </div>
                    )
                )}
              </div>
            </section>

            <div className="mt-6 text-right">
              <button
                onClick={() => setSelectedApp(null)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
