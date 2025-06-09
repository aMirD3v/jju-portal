"use client";
import Link from "next/link";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
import * as XLSX from "xlsx";

export default function PlacementPage() {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Record<string, { total: number; current: number }>>({});

  const handleFileUpload = async (endpoint: string, file: File, label: string) => {
    const formData = new FormData();
    formData.append("file", file);

    const toastId = toast.loading(`Preparing to upload ${label}...`);
    try {
      setUploading(true);
      setUploadProgress((prev) => ({ ...prev, [label]: { total: 0, current: 0 } }));

      const arrayBuffer = await file.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(sheet, { defval: "" });

      setUploadProgress((prev) => ({
        ...prev,
        [label]: { total: data.length, current: 0 },
      }));

      let progress = 0;
      const interval = setInterval(() => {
        progress += 1;
        if (progress <= data.length) {
          setUploadProgress((prev) => ({
            ...prev,
            [label]: { total: data.length, current: progress },
          }));
        } else {
          clearInterval(interval);
        }
      }, 60);

      const res = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });

      clearInterval(interval);

      if (!res.ok) throw new Error("Upload failed");

      const result = await res.json();
      toast.success(`✅ ${label} uploaded successfully!`, { id: toastId });

      toast(
        `${label} upload complete!\n📄 File: ${file.name}\n🔢 Rows: ${data.length}`,
        {
          icon: "🎉",
          duration: 7000,
          style: { whiteSpace: "pre-line" },
        }
      );
    } catch (error: any) {
      toast.error(error.message || "Upload failed", { id: toastId });
    } finally {
      setUploading(false);
      setTimeout(() => {
        setUploadProgress((prev) => ({
          ...prev,
          [label]: { total: 0, current: 0 },
        }));
      }, 3000);
    }
  };

  const handleAssignRooms = async () => {
    const toastId = toast.loading("Assigning rooms...");
    try {
      setUploading(true);
      const res = await fetch("/api/admin/placement/exit-exam/assign-rooms", {
        method: "POST",
      });
      if (!res.ok) throw new Error("Assignment failed");
      toast.success("Students assigned!", { id: toastId });
    } catch (err: any) {
      toast.error(err.message || "Assignment failed", { id: toastId });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="relative flex flex-col p-8">
      <Toaster position="top-center" />
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-blue-500 mb-2">Exam & Class Placement</h1>
        <p className="text-gray-600">Manage students and room assignments efficiently.</p>
      </header>

      <main className="flex flex-col gap-8 w-full max-w-3xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FileUploadCard
            label="Upload Students Excel"
            endpoint="/api/admin/placement/exit-exam/upload-students"
            disabled={uploading}
            onUpload={(endpoint, file) => handleFileUpload(endpoint, file, "students")}
            progress={uploadProgress["students"] || { total: 0, current: 0 }}
          />
          <FileUploadCard
            label="Upload Rooms Excel"
            endpoint="/api/admin/placement/exit-exam/upload-rooms"
            disabled={uploading}
            onUpload={(endpoint, file) => handleFileUpload(endpoint, file, "rooms")}
            progress={uploadProgress["rooms"] || { total: 0, current: 0 }}
          />
        </div>

        <div className="flex flex-col gap-4 items-center">
          <button
            onClick={handleAssignRooms}
            disabled={uploading}
            className={`flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-400 text-white px-6 py-3 rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition ${
              uploading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {uploading && <FaSpinner className="animate-spin" />}
            {uploading ? "Processing..." : "Assign Rooms"}
          </button>

          {uploading && (
            <div className="flex items-center gap-2 text-gray-600 animate-pulse">
              <FaSpinner className="animate-spin" /> Please wait, this may take some time...
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

interface FileUploadCardProps {
  label: string;
  endpoint: string;
  disabled: boolean;
  onUpload: (endpoint: string, file: File) => void;
  progress: { total: number; current: number };
}

function FileUploadCard({
  label,
  endpoint,
  disabled,
  onUpload,
  progress,
}: FileUploadCardProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(endpoint, file);
      e.target.value = "";
    }
  };

  return (
    <div className="flex flex-col items-start bg-white rounded-xl shadow-lg p-6 border border-blue-200 hover:shadow-xl transition">
      <label className="block mb-2 font-semibold text-blue-500">{label}:</label>
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileChange}
        disabled={disabled}
        className="w-full border mb-2 border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-300 transition cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-blue-700 hover:file:bg-purple-100"
      />

      {label.includes("Rooms") && (
        <a
          href="/templates/rooms-template.xlsx"
          className="flex items-center gap-1 text-sm text-blue-500 underline hover:text-blue-700 transition"
          download
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m0 0l-4-4m4 4l4-4" />
          </svg>
          Download Rooms Template
        </a>
      )}

      {label.includes("Students") && (
        <a
          href="/templates/students-template.xlsx"
          className="flex items-center gap-1 text-sm text-blue-500 underline hover:text-blue-700 transition"
          download
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m0 0l-4-4m4 4l4-4" />
          </svg>
          Download Students Template
        </a>
      )}

      {progress.total > 0 && progress.current < progress.total && (
        <div className="mt-3 w-full text-sm text-gray-600">
          Uploading {label.includes("Room") ? "Room" : "Student"} {progress.current} of {progress.total}
          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all"
              style={{
                width: `${Math.min(100, (progress.current / progress.total) * 100)}%`,
              }}
            />
          </div>
        </div>
      )}

      {progress.total > 0 && progress.current === progress.total && (
        <div className="mt-2 text-green-600 font-semibold">
          ✅ Done uploading {label.toLowerCase()}!
        </div>
      )}
    </div>
  );
}
