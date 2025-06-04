"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type User = {
  id: string;
  username: string;
  email: string;
  name: string;
  role: string;
};

export default function AdminUsersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [editableUsers, setEditableUsers] = useState<
    Record<string, { name: string; role: string }>
  >({});
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"student" | "staff">("student");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewUser({ ...newUser, password: value });

    if (value.length < 6) {
      setPasswordStrength("Weak");
    } else if (value.match(/[A-Z]/) && value.match(/[0-9]/) && value.match(/[^A-Za-z0-9]/)) {
      setPasswordStrength("Strong");
    } else {
      setPasswordStrength("Moderate");
    }
  };

  // New user form state
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    name: "",
    password: "",
    role: "",
  });

  useEffect(() => {
    if (status === "loading") return;

    if (!session || session.user?.role !== "admin") {
      router.replace("/unauthorized");
    } else {
      fetchUsers();
    }
  }, [status, session, router]);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();

      const nonAdminUsers = data.filter((user: User) => user.role !== "admin");
      setUsers(nonAdminUsers);

      const editState: Record<string, { name: string; role: string }> = {};
      nonAdminUsers.forEach((user: User) => {
        editState[user.id] = { name: user.name, role: user.role };
      });
      setEditableUsers(editState);
    } catch (error) {
      toast.error("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    id: string,
    field: "name" | "role",
    value: string
  ) => {
    setEditableUsers((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  const handleUpdate = async (id: string) => {
    const { name, role } = editableUsers[id];
    try {
      await fetch("/api/admin/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, name, role }),
      });
      toast.success("User updated successfully");
      fetchUsers();
    } catch (error) {
      toast.error("Update failed.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
      toast.success("User deleted");
      fetchUsers();
    } catch (error) {
      toast.error("Failed to delete user.");
    }
  };

  const handleResetPassword = async (id: string) => {
    if (!confirm("Reset password for this user?")) return;
    try {
      await fetch(`/api/user/${id}/reset-password`, { method: "POST" });
      toast.success("Password reset successfully!");
    } catch (error) {
      toast.error("Failed to reset password.");
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.username || !newUser.email || !newUser.name || !newUser.password || !newUser.role) {
      toast.error("Please fill all fields.");
      return;
    }

    try {
      const res = await fetch("/api/admin/users/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("User created successfully");
        setNewUser({ username: "", email: "", name: "", password: "", role: "" });
        setIsModalOpen(false);
        fetchUsers();
      } else {
        toast.error(data.error || "Failed to create user");
      }
    } catch (error) {
      toast.error("Failed to create user.");
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="flex h-full items-center justify-center py-12">
        <svg
          className="animate-spin h-10 w-10 text-blue-500 mb-4"
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
    );
  }

  const filteredUsers = users.filter((user) => user.role === filter);

  return (
    <div className="bg-white shadow-lg rounded-lg max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-blue-500">User Management</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600"
        >
          + Create User
        </button>
      </div>

      <div className="flex space-x-4 mb-4">
        <button
          className={`px-4 py-2 rounded ${
            filter === "student"
              ? "bg-blue-500 text-white"
              : "bg-blue-100 text-blue-600"
          }`}
          onClick={() => setFilter("student")}
        >
          Students
        </button>
        <button
          className={`px-4 py-2 rounded ${
            filter === "staff"
              ? "bg-blue-500 text-white"
              : "bg-blue-100 text-blue-600"
          }`}
          onClick={() => setFilter("staff")}
        >
          Staff
        </button>
      </div>

      <div className="overflow-x-auto border border-blue-200 rounded-lg">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-blue-100 text-blue-600 uppercase text-xs font-semibold">
            <tr>
              <th className="px-4 py-3">Username</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Name</th>
              {filter === "staff" && <th className="px-4 py-3">Role</th>}
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredUsers.map((user) => {
              const editable = editableUsers[user.id];
              return (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono">{user.username}</td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3">
                    <input
                      value={editable?.name || ""}
                      onChange={(e) =>
                        handleInputChange(user.id, "name", e.target.value)
                      }
                      className="w-full p-1 border border-gray-300 rounded"
                    />
                  </td>
                  {filter === "staff" && (
                    <td className="px-4 py-3">
                      <select
                        value={editable?.role || ""}
                        onChange={(e) =>
                          handleInputChange(user.id, "role", e.target.value)
                        }
                        className="w-full p-1 border border-gray-300 rounded"
                      >
                        <option value="staff">staff</option>
                        <option value="student">student</option>
                      </select>
                    </td>
                  )}
                  <td className="px-4 py-3 flex gap-2">
                    <button
                      onClick={() => handleUpdate(user.id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => handleResetPassword(user.id)}
                      className="border border-yellow-500 hover:bg-yellow-500 text-yellow-500 hover:text-white px-2 py-1 rounded text-xs transition-colors"
                    >
                      Reset PW
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="border border-red-500 hover:bg-red-500 text-red-500 hover:text-white px-2 py-1 rounded text-xs transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Create User Modal */}
{isModalOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur">
    <form
      onSubmit={handleCreateUser}
      className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg"
    >
      <h2 className="text-xl font-bold text-blue-600 mb-4">Create New User</h2>

      {/* Username */}
      <div className="mb-4">
        <label htmlFor="username" className="block text-gray-700 font-semibold mb-1">
          Username <span className="text-red-500">*</span>
        </label>
        <input
          id="username"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
          placeholder="Enter username"
          required
          className="w-full p-3 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 shadow-sm"
        />
      </div>

      {/* Email */}
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          type="email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          placeholder="Enter email"
          required
          className="w-full p-3 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 shadow-sm"
        />
      </div>

      {/* Full Name */}
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-semibold mb-1">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          placeholder="Enter full name"
          required
          className="w-full p-3 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 shadow-sm"
        />
      </div>

      {/* Password */}
      <div className="relative mb-4">
        <label htmlFor="password" className="block text-gray-700 font-semibold mb-1">
          Password <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter a secure password"
            required
            className="w-full p-3 pr-12 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 shadow-sm"
            onChange={(e) => {
              const value = e.target.value;
              setNewUser({ ...newUser, password: value });

              if (value.length < 6) {
                setPasswordStrength("Weak");
              } else if (
                value.match(/[A-Z]/) &&
                value.match(/[0-9]/) &&
                value.match(/[^A-Za-z0-9]/)
              ) {
                setPasswordStrength("Strong");
              } else {
                setPasswordStrength("Moderate");
              }
            }}
            minLength={6}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-blue-500 hover:text-blue-700 focus:outline-none"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10a9.993 9.993 0 014.597-8.274m4.793-.726A10 10 0 0122 9c0 5.523-4.477 10-10 10a9.953 9.953 0 01-3.93-.812" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 9l-6 6M9 9l6 6" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12A3 3 0 019 12m12-3a9 9 0 01-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </button>
        </div>
        {newUser.password && (
          <p
            className={`mt-1 text-sm font-medium ${
              passwordStrength === "Weak"
                ? "text-red-500"
                : passwordStrength === "Moderate"
                ? "text-yellow-500"
                : "text-green-500"
            }`}
          >
            Strength: {passwordStrength}
          </p>
        )}
        <p className="text-xs text-gray-500 mt-1">
          Must be at least 6 characters and include numbers, uppercase, and special characters for best security.
        </p>
      </div>

      {/* Role */}
      <div className="mb-6">
        <label htmlFor="role" className="block text-gray-700 font-semibold mb-1">
          Role <span className="text-red-500">*</span>
        </label>
        <select
          id="role"
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          required
          className="w-full p-3 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 shadow-sm"
        >
          <option value="">Select role</option>
          <option value="staff">Staff</option>
        </select>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={() => setIsModalOpen(false)}
          className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold shadow-sm"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded bg-green-500 text-white font-semibold hover:bg-green-600 shadow-sm"
        >
          Create
        </button>
      </div>
    </form>
  </div>
)}

    </div>
  );
}
