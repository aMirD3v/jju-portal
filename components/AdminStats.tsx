"use client";

import { useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { rtdb } from "@/lib/firebase";
import {
  UsersIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

export default function AdminStats() {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    registered: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const baseRef = ref(rtdb, "Post-Graduate-Admission");
      const snapshot = await get(baseRef);
      if (!snapshot.exists()) return;

      const data = snapshot.val();
      let total = 0;
      let pending = 0;
      let approved = 0;
      let rejected = 0;

      const traverse = (node: any) => {
        for (const entry of Object.values(node)) {
          if (typeof entry === "object" && entry.status) {
            total++;
            if (entry.status === "pending") pending++;
            else if (entry.status === "approved") approved++;
            else if (entry.status === "rejected") rejected++;
          } else if (typeof entry === "object") {
            traverse(entry);
          }
        }
      };

      traverse(data);

      const studentSnap = await get(ref(rtdb, "students"));
      const registered = studentSnap.exists()
        ? Object.keys(studentSnap.val()).length
        : 0;

      setStats({ total, pending, approved, rejected, registered });
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-12 max-w-6xl mx-auto">
      {/* Application Section */}
      <section>
        <h2 className="text-2xl font-bold text-blue-700 mb-4">
          📄 Application Overview
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard
            label="Total Applications"
            value={stats.total}
            description="All submitted applications."
            icon={UsersIcon}
            bg="bg-blue-100"
            iconColor="text-blue-600"
          />
          <StatCard
            label="Pending"
            value={stats.pending}
            description="Awaiting admin review."
            icon={ClockIcon}
            bg="bg-yellow-100"
            iconColor="text-yellow-600"
          />
          <StatCard
            label="Approved"
            value={stats.approved}
            description="Accepted and confirmed."
            icon={CheckCircleIcon}
            bg="bg-green-100"
            iconColor="text-green-600"
          />
          <StatCard
            label="Rejected"
            value={stats.rejected}
            description="Declined or invalid entries."
            icon={XCircleIcon}
            bg="bg-red-100"
            iconColor="text-red-600"
          />
        </div>
      </section>

      {/* Student Section */}
      <section>
        <h2 className="text-2xl font-bold text-purple-700 mb-4">
          🎓 Student Registrations
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <StatCard
            label="Registered Students"
            value={stats.registered}
            description="Finalized student accounts in the system."
            icon={UserGroupIcon}
            bg="bg-purple-100"
            iconColor="text-purple-600"
          />
        </div>
      </section>
    </div>
  );
}

function StatCard({
  label,
  value,
  description,
  icon: Icon,
  bg,
  iconColor,
}: {
  label: string;
  value: number;
  description: string;
  icon: React.ElementType;
  bg: string;
  iconColor: string;
}) {
  return (
    <div className={`p-5 rounded-lg shadow-md border ${bg} relative`}>
      <div className={`absolute top-3 right-3 w-10 h-10 ${iconColor}`}>
        <Icon className="w-8 h-8" />
      </div>
      <h2 className="text-3xl font-bold text-gray-800">{value}</h2>
      <p className="font-semibold text-gray-600 mt-1">{label}</p>
      <p className="text-sm text-gray-500 mt-1">{description}</p>
    </div>
  );
}
