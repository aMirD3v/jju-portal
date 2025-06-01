"use client";

import { useEffect, useState } from "react";
import { UsersIcon, ClockIcon, CheckCircleIcon, XCircleIcon, UserGroupIcon, AcademicCapIcon } from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function AdminStats() {
  const [stats, setStats] = useState({
    undergraduate: { total: 0, pending: 0, approved: 0, rejected: 0 },
    postgraduate: { total: 0, pending: 0, approved: 0, rejected: 0 },
    registeredStudents: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const res = await fetch("/api/admin/stats");
      const data = await res.json();
      setStats(data);
    };
    fetchStats();
  }, []);

  // Chart options
  const chartOptions = {
    chart: { id: "app-status" },
    labels: ["Pending", "Approved", "Rejected"],
    colors: ["#FACC15", "#22C55E", "#EF4444"],
    legend: { position: "bottom" },
  };

  const barChartOptions = {
    chart: { id: "app-comparison", toolbar: { show: false } },
    xaxis: { categories: ["Total", "Pending", "Approved", "Rejected"] },
    colors: ["#3B82F6", "#6366F1"],
  };

  const barChartSeries = [
    {
      name: "Undergraduate",
      data: [
        stats.undergraduate.total,
        stats.undergraduate.pending,
        stats.undergraduate.approved,
        stats.undergraduate.rejected,
      ],
    },
    {
      name: "Postgraduate",
      data: [
        stats.postgraduate.total,
        stats.postgraduate.pending,
        stats.postgraduate.approved,
        stats.postgraduate.rejected,
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      <h1 className="text-3xl font-bold text-blue-500 mb-6">Dashboard Overview</h1>

      {/* Application Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatGroup title="Undergraduate Applications" color="blue" stats={stats.undergraduate} />
        <StatGroup title="Postgraduate Applications" color="purple" stats={stats.postgraduate} />
      </div>

      {/* Registered Students */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <UserGroupIcon className="w-5 h-5 text-indigo-500" /> Registered Students
        </h2>
        <div className="p-4 rounded-lg bg-white shadow border border-gray-200">
          <h3 className="text-3xl font-bold text-gray-800">{stats.registeredStudents}</h3>
          <p className="text-sm text-gray-500 mt-1">Active student accounts</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartCard title="Undergraduate Status" data={[
          stats.undergraduate.pending,
          stats.undergraduate.approved,
          stats.undergraduate.rejected,
        ]} options={chartOptions} />

        <ChartCard title="Postgraduate Status" data={[
          stats.postgraduate.pending,
          stats.postgraduate.approved,
          stats.postgraduate.rejected,
        ]} options={chartOptions} />
      </div>

      <div className="bg-white border border-gray-200 rounded shadow p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Applications Comparison</h3>
        <Chart options={barChartOptions} series={barChartSeries} type="bar" height={300} />
      </div>
    </div>
  );
}

function StatGroup({ title, color, stats }: { title: string; color: string; stats: any }) {
  const colorClasses = {
    blue: "text-blue-600",
    purple: "text-purple-600",
  };

  return (
    <div className="p-4 bg-white rounded shadow border border-gray-200">
      <h2 className={`text-lg font-semibold mb-4 ${colorClasses[color]}`}>
        <AcademicCapIcon className="w-5 h-5 inline-block mr-2" /> {title}
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <StatCard label="Total" value={stats.total} icon={UsersIcon} color={color} />
        <StatCard label="Pending" value={stats.pending} icon={ClockIcon} color="yellow" />
        <StatCard label="Approved" value={stats.approved} icon={CheckCircleIcon} color="green" />
        <StatCard label="Rejected" value={stats.rejected} icon={XCircleIcon} color="red" />
      </div>
    </div>
  );
}

function StatCard({ label, value, icon: Icon, color }: any) {
  const colors: any = {
    blue: "bg-blue-100 text-blue-600",
    purple: "bg-purple-100 text-purple-600",
    yellow: "bg-yellow-100 text-yellow-600",
    green: "bg-green-100 text-green-600",
    red: "bg-red-100 text-red-600",
  };

  return (
    <div className={`p-3 rounded flex items-center gap-3 ${colors[color]} bg-opacity-30`}>
      <Icon className="w-5 h-5" />
      <div>
        <p className="text-sm font-semibold">{label}</p>
        <p className="text-lg font-bold">{value}</p>
      </div>
    </div>
  );
}

function ChartCard({ title, data, options }: any) {
  return (
    <div className="p-4 bg-white rounded shadow border border-gray-200">
      <h3 className="text-center font-semibold text-gray-700 mb-2">{title}</h3>
      <Chart options={options} series={data} type="pie" height={250} />
    </div>
  );
}
