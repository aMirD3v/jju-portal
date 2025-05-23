"use client";
import { useEffect, useState } from "react";
import { get, ref, update } from "firebase/database";
import { rtdb } from "@/lib/firebase";
import { XCircleIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import { Menu } from "@headlessui/react";

type StudentRecord = {
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
  const [applications, setApplications] = useState<StudentRecord[]>([]);
  const [filtered, setFiltered] = useState<StudentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState<any | null>(null);

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
      const snapshot = await get(ref(rtdb, "Post-Graduate-Admission"));
      const data = snapshot.val();
      if (!data) {
        setApplications([]);
        setLoading(false);
        return;
      }

      const result: StudentRecord[] = [];
      const instituteSet = new Set<string>();
      const departmentSet = new Set<string>();
      const yearSet = new Set<string>();

      Object.entries(data).forEach(([institute, depts]) => {
        instituteSet.add(institute);

        Object.entries(depts as any).forEach(([department, yearsObj]) => {
          departmentSet.add(department);

          Object.entries(yearsObj as any).forEach(([year, students]) => {
            yearSet.add(year);

            Object.entries(students as any).forEach(
              ([id, record]: [string, any]) => {
                result.push({
                  studentID: record.studentID,
                  firstName: record.firstName,
                  fatherName: record.fatherName,
                  gFatherName: record.gFatherName,
                  institute,
                  department,
                  academicYear: year,
                  status: record.status || "pending",
                });
              }
            );
          });
        });
      });

      setApplications(result);
      setFiltered(result);
      setInstitutes(Array.from(instituteSet));
      setDepartments(Array.from(departmentSet));
      setYears(Array.from(yearSet).sort());
      setLoading(false);
    };

    fetchAllApplications();
  }, []);

  // Filter + Search + Sort logic
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
    const safeID = app.studentID.replace(/\//g, "_");
    const path = `Post-Graduate-Admission/${app.institute}/${app.department}/${app.academicYear}/${safeID}`;
    await update(ref(rtdb, path), { status: newStatus });

    setFiltered((prev) =>
      prev.map((a) =>
        a.studentID === app.studentID ? { ...a, status: newStatus } : a
      )
    );
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
    const base = "px-2 py-1 rounded-full  text-xs font-semibold";
    if (status === "approved")
      return (
        <span className={`${base} bg-green-100  text-green-800`}>Approved</span>
      );
    if (status === "rejected")
      return (
        <span className={`${base} bg-red-100 text-red-800`}>Rejected</span>
      );
    return (
      <span className={`${base} bg-yellow-100 text-yellow-800`}>Pending</span>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-xl shadow">
      {/* Application Modal */}

      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-50">
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

            {/* Photo */}
            {selectedApp.studentPhoto &&
              typeof selectedApp.studentPhoto === "string" && (
                <div className="mb-4">
                  <p className="font-semibold text-gray-700 mb-1">
                    Student Photo
                  </p>
                  <img
                    src={selectedApp.studentPhoto}
                    alt="Student"
                    className="w-32 h-32 object-cover rounded border border-blue-300"
                  />
                </div>
              )}

            {/* Grouped Info */}
            <div className="space-y-6">
              {/* Personal Info */}
              <section>
                <h3 className="text-lg font-semibold text-blue-500 mb-2">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                  <div>
                    <strong>Full Name:</strong> {selectedApp.firstName}{" "}
                    {selectedApp.fatherName} {selectedApp.gFatherName}
                  </div>
                  <div>
                    <strong>Gender:</strong> {selectedApp.sex}
                  </div>
                  <div>
                    <strong>DOB:</strong> {selectedApp.dob}
                  </div>
                  <div>
                    <strong>Nationality:</strong> {selectedApp.nationality}
                  </div>
                  <div>
                    <strong>Institute:</strong> {selectedApp.institute}
                  </div>
                  <div>
                    <strong>Department:</strong> {selectedApp.department}
                  </div>
                  <div>
                    <strong>Academic Year:</strong> {selectedApp.academicYear}
                  </div>
                  <div>
                    <strong>Student ID:</strong> {selectedApp.studentID}
                  </div>
                  <div>
                    <strong>Status:</strong> {selectedApp.status}
                  </div>
                </div>
              </section>

              {/* Contact Info */}
              <section>
                <h3 className="text-lg font-semibold text-blue-500 mb-2">
                  Contact & Family
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                  <div>
                    <strong>Email:</strong> {selectedApp.email}
                  </div>
                  <div>
                    <strong>Student Phone:</strong> {selectedApp.studentPhone}
                  </div>
                  <div>
                    <strong>Region:</strong> {selectedApp.region}
                  </div>
                  <div>
                    <strong>Zone/Woreda:</strong> {selectedApp.zone},{" "}
                    {selectedApp.woreda}
                  </div>
                  <div>
                    <strong>Mother:</strong> {selectedApp.motherFirstName}{" "}
                    {selectedApp.motherLastName} ({selectedApp.motherJob})
                  </div>
                  <div>
                    <strong>Father's Job:</strong> {selectedApp.fatherJob}
                  </div>
                  <div>
                    <strong>Emergency Contact:</strong>{" "}
                    {selectedApp.contact1FirstName}{" "}
                    {selectedApp.contact1FatherName} (
                    {selectedApp.contact1Relation})
                  </div>
                </div>
              </section>

              {/* Education */}
              <section>
                <h3 className="text-lg font-semibold text-blue-500 mb-2">
                  Education Info
                </h3>
                <div className="text-sm text-gray-700 space-y-2">
                  <div>
                    <strong>Stream:</strong> {selectedApp.stream}
                  </div>
                  <div>
                    <strong>Grade 12 Result:</strong>{" "}
                    {selectedApp.grade12result}
                  </div>
                  {selectedApp.secondarySchools?.length > 0 && (
                    <div>
                      <strong>Secondary Schools:</strong>
                      <ul className="list-disc ml-6 mt-1 space-y-1">
                        {selectedApp.secondarySchools.map(
                          (school: any, idx: number) => (
                            <li key={idx}>
                              {school.gradeLevel} - {school.schoolName} (
                              {school.region}, {school.yearEC})
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                  {selectedApp.postSecondaryEducation?.length > 0 && (
                    <div>
                      <strong>Post-Secondary Education:</strong>
                      <ul className="list-disc ml-6 mt-1 space-y-1">
                        {selectedApp.postSecondaryEducation.map(
                          (edu: any, idx: number) => (
                            <li key={idx}>
                              {edu.institutionName} - {edu.country} (
                              {edu.fromGC} - {edu.toGC}), CGPA: {edu.cgpaEarned}
                              /{edu.maxCgpa}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </section>

              {/* Sponsor */}
              <section>
                <h3 className="text-lg font-semibold text-blue-500 mb-2">
                  Sponsor
                </h3>
                <div className="text-sm text-gray-700 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <strong>Sponsor Type:</strong> {selectedApp.sponsor}
                  </div>
                  <div>
                    <strong>Sponsor Name:</strong> {selectedApp.sponsorName}
                  </div>
                  <div>
                    <strong>Email:</strong> {selectedApp.sponsorEmail}
                  </div>
                  <div>
                    <strong>Website:</strong> {selectedApp.sponsorURL}
                  </div>
                </div>
              </section>

              {/* Documents */}
              {selectedApp.educationDocs && (
                <section>
                  <h3 className="text-lg font-semibold text-blue-500 mb-2">
                    Uploaded Documents
                  </h3>
                  <ul className="list-none text-sm text-blue-600 space-y-1">
                    {Object.entries(selectedApp.educationDocs).map(
                      ([label, fileUrl]: any) => {
                        if (!fileUrl) return null;
                        return (
                          <li key={label}>
                            <a
                              href={fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:underline"
                              download
                            >
                              📄 {label.replace(/([A-Z])/g, " $1")} (Download)
                            </a>
                          </li>
                        );
                      }
                    )}
                  </ul>
                </section>
              )}
            </div>

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

      {/* Header */}

      <h1 className="text-3xl font-bold text-blue-600 mb-4">
        Applications Management
      </h1>

      {/* Filters and Search */}
      <div className="grid md:grid-cols-5 gap-4 mb-6">
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
          className="p-2 border border-blue-500 rounded"
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

      {/* Total */}
      <div className="text-sm text-gray-500 mb-2">
        Showing <strong>{filtered.length}</strong> of{" "}
        <strong>{applications.length}</strong> applications
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <svg
            className="animate-spin h-8 w-8 text-blue-500 mb-4"
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
                              onClick={() => updateStatus(app, "rejected")}
                            >
                              Reject
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={async () => {
                                const safeID = app.studentID.replace(
                                  /\//g,
                                  "_"
                                );
                                const path = `Post-Graduate-Admission/${app.institute}/${app.department}/${app.academicYear}/${safeID}`;
                                const snapshot = await get(ref(rtdb, path));
                                if (snapshot.exists()) {
                                  setSelectedApp(snapshot.val());
                                } else {
                                  alert("Full application data not found.");
                                }
                              }}
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
    </div>
  );
}
