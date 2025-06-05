"use client";
import Link from "next/link";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";

export default function AdminPlacementPage() {
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

      if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
      }

      const data = await res.json();
      toast.success(data.message || "Upload complete!", { id: uploadToast });
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "An error occurred during upload.", { id: uploadToast });
    } finally {
      setUploading(false);
    }
  };

  const handleAssignRooms = async () => {
    const assignToast = toast.loading("Assigning rooms...");

    try {
      setUploading(true);

      const res = await fetch("/api/admin/placement/assign-rooms", { method: "POST" });

      if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
      }

      const data = await res.json();
      toast.success(data.message || "Rooms assigned successfully!", { id: assignToast });
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "An error occurred during room assignment.", { id: assignToast });
    } finally {
      setUploading(false);
    }
  };

  const handleCreateRoom = async () => {
    if (!roomName || !roomCapacity) {
      toast.error("Please enter room name and capacity.");
      return;
    }

    const createToast = toast.loading("Creating room...");

    try {
      const res = await fetch("/api/admin/placement/create-room", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: roomName,
          capacity: Number(roomCapacity),
        }),
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
      }

      const data = await res.json();
      toast.success(data.message || "Room created!", { id: createToast });

      setRoomName("");
      setRoomCapacity("");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "An error occurred while creating room.", { id: createToast });
    }
  };

  return (
    <div className="relative flex flex-col min-h-screen p-8">
      <Toaster position="top-center" />

      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-blue-500 mb-2">Exam and Class Placement</h1>
        <p className="text-gray-600">Manage student placements and assign rooms seamlessly.</p>
      </header>

      <main className="flex flex-col gap-8 w-full max-w-3xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FileUploadCard
            label="Upload Students Excel"
            endpoint="/api/admin/placement/upload-students"
            disabled={uploading}
            onUpload={handleFileUpload}
          />
          <FileUploadCard
            label="Upload Rooms Excel"
            endpoint="/api/admin/placement/upload-rooms"
            disabled={uploading}
            onUpload={handleFileUpload}
          />
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-200 hover:shadow-xl transition flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-blue-500">Manually Add Room</h2>
          <input
            type="text"
            placeholder="Room Name"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            className="p-2 border rounded w-full focus:ring-2 focus:ring-blue-300"
          />
          <input
            type="number"
            placeholder="Capacity"
            value={roomCapacity}
            onChange={(e) => setRoomCapacity(e.target.value)}
            className="p-2 border rounded w-full focus:ring-2 focus:ring-blue-300"
          />
          <button
            onClick={handleCreateRoom}
            disabled={uploading}
            className="border bg-blue-50 border-blue-500 text-blue-500 px-4 py-2 rounded hover:bg-blue-500 hover:text-white transition"
          >
            Create Room
          </button>
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

           <Link
    href="/dashboard/admin/placement/view"
    className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition"
  >
    View Results
  </Link>

          {uploading && (
            <div className="flex items-center gap-2 text-gray-600 animate-pulse" aria-busy="true">
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
}

function FileUploadCard({ label, endpoint, disabled, onUpload }: FileUploadCardProps) {
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
        className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-300 transition cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-blue-700 hover:file:bg-purple-100"
      />
    </div>
  );
}
