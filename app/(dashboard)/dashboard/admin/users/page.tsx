'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

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
  const [editableUsers, setEditableUsers] = useState<Record<string, { name: string; role: string }>>({});
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'student' | 'staff'>('student');

  useEffect(() => {
    if (status === 'loading') return;

    if (!session || session.user?.role !== 'admin') {
      router.replace('/unauthorized');
    } else {
      fetchUsers();
    }
  }, [status, session, router]);

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/admin/users');
      const data = await res.json();

      const nonAdminUsers = data.filter((user: User) => user.role !== 'admin');
      setUsers(nonAdminUsers);

      const editState: Record<string, { name: string; role: string }> = {};
      nonAdminUsers.forEach((user: User) => {
        editState[user.id] = { name: user.name, role: user.role };
      });
      setEditableUsers(editState);
    } catch (error) {
      toast.error('Failed to fetch users.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (id: string, field: 'name' | 'role', value: string) => {
    setEditableUsers((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  const handleUpdate = async (id: string) => {
    const { name, role } = editableUsers[id];
    try {
      await fetch('/api/admin/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, name, role }),
      });
      toast.success('User updated successfully');
      fetchUsers();
    } catch (error) {
      toast.error('Update failed.');
    }
  };

  if (status === 'loading' || loading) {
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
    <div className="bg-white shadow-lg  rounded-lg max-w-6xl mx-auto">
      <h1 className="text-3xl font-semibold text-blue-500 mb-6">User Management</h1>

      <div className="flex space-x-4 mb-4">
        <button
          className={`px-4 py-2 rounded ${
            filter === 'student' ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-600'
          }`}
          onClick={() => setFilter('student')}
        >
          Students
        </button>
        <button
          className={`px-4 py-2 rounded ${
            filter === 'staff' ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-600'
          }`}
          onClick={() => setFilter('staff')}
        >
          Staffs
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border border-blue-200 rounded-lg overflow-hidden">
          <thead className="bg-blue-100 text-blue-600">
            <tr>
              <th className="px-4 py-2">Username</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => {
              const editable = editableUsers[user.id];
              return (
                <tr key={user.id} className="border-t border-blue-100">
                  <td className="px-4 py-2 text-blue-500">{user.username}</td>
                  <td className="px-4 py-2 text-blue-400">{user.email}</td>
                  <td className="px-4 py-2">
                    <input
                      value={editable?.name || ''}
                      onChange={(e) => handleInputChange(user.id, 'name', e.target.value)}
                      className="w-full p-2 border border-blue-200 rounded-md text-blue-500 placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <select
                      disabled={user.role === 'student'}
                      value={editable?.role || ''}
                      onChange={(e) => handleInputChange(user.id, 'role', e.target.value)}
                      className="w-full p-2 border border-blue-200 rounded-md text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      <option value="staff">staff</option>
                      <option value="student">student</option>
                    </select>
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleUpdate(user.id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-all"
                    >
                      Save
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
