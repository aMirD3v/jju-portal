"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function ApplicationStatusPage() {
  const { data: session, status } = useSession();
  const [application, setApplication] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const res = await fetch("/api/student-application");
        const data = await res.json();
        setApplication(data.application);
      } catch (error) {
        console.error("Failed to fetch application:", error);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user) {
      fetchApplication();
    }
  }, [session]);

  if (status === "loading" || loading) return <p>Loading...</p>;
  if (!session) return <p>Please log in to view your application.</p>;
  if (!application) return <p>No application found.</p>;

  // If approved, show only the ID card section
  if (application.status === "approved") {
    return (
      <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-10">
        <h1 className="text-2xl font-bold text-blue-600 mb-4">
          Your Application Status
        </h1>
        <p className="mb-4 text-green-600 font-semibold">Status: Approved ✅</p>

        <div className="mt-8 border-t pt-6">
          <h2 className="text-xl font-semibold text-green-700 mb-2">
            Your Student ID Card
          </h2>
          <img
            src="/api/generate-id-card"
            alt="Student ID Card"
            className="w-full max-w-sm border shadow rounded"
          />

          <a
            href="/api/generate-id-card"
            download="Student_ID_Card.png"
            className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
          >
            Download ID Card
          </a>
        </div>
      </div>
    );
  }

  // Otherwise, show basic info
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">
        Your Application
      </h1>

      <div className="space-y-2 text-sm text-gray-700 mb-6">
        <p>
          <strong>Name:</strong> {application.firstName}{" "}
          {application.fatherName} {application.gFatherName}
        </p>
        <p>
          <strong>Student ID:</strong> {application.studentID}
        </p>
        <p>
          <strong>Institute:</strong> {application.institute}
        </p>
        <p>
          <strong>Department:</strong> {application.department}
        </p>
        <p>
          <strong>Admission:</strong> {application.admission}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          <span
            className={`font-semibold ${
              application.status === "rejected"
                ? "text-red-600"
                : "text-yellow-600"
            }`}
          >
            {application.status}
          </span>
        </p>
      </div>

      {/* If rejected, show rejection reason */}
      {application.status === "rejected" && application.rejectionReason && (
        <p className="text-sm text-red-600 mb-4">
          <strong>Rejection Reason:</strong> {application.rejectionReason}
        </p>
      )}
    </div>
  );
}
