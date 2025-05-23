"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { rtdb } from "@/lib/firebase";

export default function ApplicationStatusPage() {
  const { data: session, status } = useSession();
  const [application, setApplication] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplication = async () => {
      if (!session?.user) return;

      try {
        const {
          studentID,
          institute,
          department,
          academicYear,
        } = session.user as any;

        const safeID = studentID.replace(/\//g, "_");
        const appRef = ref(
          rtdb,
          `Post-Graduate-Admission/${institute}/${department}/${academicYear}/${safeID}`
        );

        const snapshot = await get(appRef);
        if (snapshot.exists()) {
          setApplication(snapshot.val());
        }
      } catch (error) {
        console.error("Failed to fetch application:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [session]);

  if (status === "loading" || loading) return <p>Loading...</p>;
  if (!session) return <p>Please log in to view your application.</p>;
  if (!application) return <p>No application found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">
        Your Application
      </h1>

      <div className="space-y-2">
        <p>
          <strong>Name:</strong> {application.firstName} {application.fatherName}
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
          <strong>Status:</strong>{" "}
          <span
            className={`font-semibold ${
              application.status === "approved"
                ? "text-green-600"
                : "text-yellow-600"
            }`}
          >
            {application.status}
          </span>
        </p>
      </div>

      {/* ✅ ID Card Section - Show only when approved */}
      {application.status === "approved" && (
        <div className="mt-8 border-t pt-6">
          <h2 className="text-xl font-semibold text-green-700 mb-2">
            Your Student ID Card
          </h2>

          <img
            src="/student_id_card.png"
            alt="ID Card"
            className="w-full max-w-sm border shadow rounded"
          />

          <a
            href="/sample-id-card.png"
            download="Student_ID_Card.png"
            className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
          >
            Download ID Card
          </a>
        </div>
      )}
    </div>
  );
}
