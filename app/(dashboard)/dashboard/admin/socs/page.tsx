// app/admin/page.tsx
import Link from 'next/link';

export default function AdminPage() {
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Admin Panel</h1>
      
      <div className="space-y-4">
        <Link
          href="/admin/create-student"
          className="block w-full px-4 py-2 text-center border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Create New Student
        </Link>
        
        <Link
          href="/gate"
          className="block w-full px-4 py-2 text-center border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Gate Access
        </Link>
        
        <Link
          href="/library"
          className="block w-full px-4 py-2 text-center border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          Library Access
        </Link>
        
        <Link
          href="/cafeteria"
          className="block w-full px-4 py-2 text-center border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
        >
          Cafeteria Access
        </Link>
      </div>
    </div>
  );
}