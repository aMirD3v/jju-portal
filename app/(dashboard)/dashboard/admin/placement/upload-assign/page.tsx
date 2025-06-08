"use client";
import Link from "next/link";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";

export default function PlacementPage() {
  const [uploading, setUploading] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [roomCapacity, setRoomCapacity] = useState("");

  const handleFileUpload = async (endpoint: string, file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const uploadToast = toast.loading("Uploading file...");
    try {
      setUploading(true);
      const res = await fetch(endpoint, { method: "POST", body: formData });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      toast.success(data.message || "Upload successful!", { id: uploadToast });
    } catch (error: any) {
      toast.error(error.message || "Upload failed", { id: uploadToast });
    } finally {
      setUploading(false);
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
        <h1 className="text-4xl font-extrabold text-blue-500 mb-2">
          Exam & Class Placement
        </h1>
        <p className="text-gray-600">
          Manage students and room assignments efficiently.
        </p>
      </header>

      <main className="flex flex-col gap-8 w-full max-w-3xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FileUploadCard
            label="Upload Students Excel"
            endpoint="/api/admin/placement/exit-exam/upload-students"
            disabled={uploading}
            onUpload={handleFileUpload}
          />
          <FileUploadCard
            label="Upload Rooms Excel"
            endpoint="/api/admin/placement/exit-exam/upload-rooms"
            disabled={uploading}
            onUpload={handleFileUpload}
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
              <FaSpinner className="animate-spin" /> Please wait, this may take
              some time...
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
}

function FileUploadCard({
  label,
  endpoint,
  disabled,
  onUpload,
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
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v12m0 0l-4-4m4 4l4-4"
            />
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
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v12m0 0l-4-4m4 4l4-4"
            />
          </svg>
          Download Students Template
        </a>
      )}
      {disabled && (
        <div className="mt-2 text-gray-500 text-sm">
          <FaSpinner className="animate-spin inline-block mr-1" />
          Uploading...
        </div>
      )}
    </div>
  );
}
