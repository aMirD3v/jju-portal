'use client';

import { useRouter } from 'next/navigation';

export default function AdmissionPage() {
  const router = useRouter();

  return (
    <div className=" p-6 flex flex-col justify-center">
      {/* Welcome Header */}
      <div className="max-w-3xl mx-auto text-center mb-14">
        <h1 className="text-3xl font-extrabold text-blue-500 mb-4 ">
          Welcome to the <span className="text-blue-500">Admission Portal</span>
        </h1>
        <p className="text text-blue-500 font-medium">
          Begin your academic journey at <span className="font-bold text-blue-700">Jigjiga University</span>. Choose your preferred program below to explore the available colleges and departments.
        </p>
      </div>

      {/* Program Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
        {/* Undergraduate Option */}
        <button
          onClick={() => router.push('/admission/undergraduate')}
          className="group focus:outline-none"
        >
          <div className="overflow-hidden rounded-3xl shadow-2xl transition-transform duration-300 group-hover:scale-105 bg-gradient-to-br from-blue-400/80 to-blue-600/90 flex flex-col items-center justify-center h-full py-12 border-2 border-transparent group-hover:border-blue-800">
            <div className="bg-white rounded-full p-5 mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-blue-600"
                viewBox="0 0 48 48"
                fill="currentColor"
              >
                <path d="M24 6L44 16L24 26L4 16L24 6Z" />
                <path d="M44 16V24C44 29.5228 35.0457 34 24 34C12.9543 34 4 29.5228 4 24V16" />
                <ellipse cx="24" cy="34" rx="20" ry="6" fill="white" opacity="0.1" />
              </svg>
            </div>
            <div className="w-full flex flex-col items-center px-4">
              <h2 className="text-3xl font-bold text-white mb-2 tracking-wide drop-shadow">
                Undergraduate
              </h2>
              <p className="text-blue-100 text-center text-lg font-medium">
                Explore a wide range of undergraduate programs across our vibrant colleges.
              </p>
            </div>
          </div>
        </button>

        {/* Postgraduate Option */}
        <button
          onClick={() => router.push('/admission/postgraduate')}
          className="group focus:outline-none"
        >
          <div className="overflow-hidden rounded-3xl shadow-2xl transition-transform duration-300 group-hover:scale-105 bg-gradient-to-br from-blue-100/50 to-blue-200/50 flex flex-col items-center justify-center h-full py-12 border-2 border-blue-400 group-hover:border-blue-700">
            <div className="bg-gradient-to-br from-blue-200 to-blue-200 rounded-full p-5 mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-blue-700"
                viewBox="0 0 48 48"
                fill="currentColor"
              >
                <ellipse cx="24" cy="16" rx="20" ry="6" />
                <path d="M4 16v8c0 5.523 8.954 10 20 10s20-4.477 20-10v-8" />
                <path d="M24 16v18" />
              </svg>
            </div>
            <div className="w-full flex flex-col items-center px-4">
              <h2 className="text-3xl font-bold text-blue-700 mb-2 tracking-wide drop-shadow">
                Postgraduate
              </h2>
              <p className="text-blue-700 text-center text-lg font-medium">
                Advance your career with our specialized postgraduate programs and research.
              </p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
