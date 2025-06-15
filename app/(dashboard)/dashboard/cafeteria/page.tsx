// app/cafeteria/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CafeteriaAccessPage() {
  const [studentId, setStudentId] = useState('');
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleLookup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/socs/scan/lookup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ studentId }),
      });

      const data = await response.json();

      if (response.ok) {
        setStudent(data);
      } else {
        setMessage(data.error || 'Student not found');
      }
    } catch (error) {
      setMessage('Error looking up student');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleMealAccess = async (mealType) => {
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/socs/scan/meal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ studentId, mealType }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`${mealType} access granted!`);
        // Reset after 2 seconds
        setTimeout(() => {
          setStudent(null);
          setStudentId('');
          setMessage('');
        }, 2000);
      } else {
        setMessage(data.error || 'Error granting meal access');
      }
    } catch (error) {
      setMessage('Error granting meal access');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Cafeteria Access System</h1>
      
      {!student ? (
        <form onSubmit={handleLookup} className="space-y-4">
          <div>
            <label htmlFor="studentId" className="block text-sm font-medium text-gray-700">
              Scan Student ID or Enter Manually
            </label>
            <input
              type="text"
              id="studentId"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="STD123456"
              autoFocus
            />
          </div>
          
          <button
            type="submit"
            disabled={loading || !studentId}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${(loading || !studentId) ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Looking up...' : 'Lookup Student'}
          </button>
          
          {message && (
            <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md">
              {message}
            </div>
          )}
        </form>
      ) : (
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-md">
            <h2 className="text-lg font-medium">Student Information</h2>
            <div className="mt-2 space-y-1">
              <p><span className="font-semibold">Name:</span> {student.name}</p>
              <p><span className="font-semibold">ID:</span> {student.studentId}</p>
              <p><span className="font-semibold">Email:</span> {student.email}</p>
            </div>
            
            <div className="mt-4 flex justify-center">
              <img 
                src={`/barcodes/${student.studentId}.png`} 
                alt={`Barcode for ${student.name}`}
                className="h-20"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-2">
            <button
              onClick={() => handleMealAccess('BREAKFAST')}
              disabled={loading}
              className={`py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Processing...' : 'Grant Breakfast Access'}
            </button>
            
            <button
              onClick={() => handleMealAccess('LUNCH')}
              disabled={loading}
              className={`py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Processing...' : 'Grant Lunch Access'}
            </button>
            
            <button
              onClick={() => handleMealAccess('DINNER')}
              disabled={loading}
              className={`py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Processing...' : 'Grant Dinner Access'}
            </button>
          </div>
          
          {message && (
            <div className={`p-3 text-sm rounded-md ${message.includes('granted') ? 'text-green-800 bg-green-50' : 'text-red-600 bg-red-50'}`}>
              {message}
            </div>
          )}
        </div>
      )}
    </div>
  );
}