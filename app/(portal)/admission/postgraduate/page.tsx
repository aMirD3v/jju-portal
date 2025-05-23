'use client';

import { useRouter } from 'next/navigation';

const colleges = [
  {
    name: 'School of Graduate Studies - Engineering',
    description: 'Advanced programs for professional engineers and researchers.',
    programs: ['MSc in Civil Engineering', 'MSc in Electrical Power Engineering'],
  },
  {
    name: 'School of Business & Economics',
    description: 'Leadership, management, and economic theory for the next generation.',
    programs: ['MBA', 'MSc in Development Economics'],
  },
  {
    name: 'School of Natural and Computational Sciences',
    description: 'Research-focused programs in pure and applied sciences.',
    programs: ['MSc in Physics', 'MSc in Mathematics', 'MSc in Environmental Science'],
  },
  {
    name: 'School of Social Sciences',
    description: 'Postgraduate studies focused on human behavior and social systems.',
    programs: ['MA in Sociology', 'MA in Political Science', 'MA in Psychology'],
  },
];


export default function PostgraduatePage() {
  const router = useRouter();
  
  const handleApply = (collegeName: string) => {
    // Example: Navigate to application page with college info
    router.push(`/admission/apply?college=${encodeURIComponent(collegeName)}`);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-blue-500 mb-4 ">
          Postgraduate Programs
        </h1>
        <p className="text-blue-500 text-lg font-medium">
          Explore specialized and research-driven postgraduate programs at <span className="font-bold text-blue-700">Jigjiga University</span>.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {colleges.map((college, idx) => (
          <div
            key={idx}
            className="relative bg-white rounded-3xl shadow-xl p-6 border border-blue-100 hover:shadow-2xl transition-shadow flex flex-col"
          >
            <h2 className="text-2xl font-bold text-blue-500 mb-2">{college.name}</h2>
            <p className="text-blue-500 mb-4">{college.description}</p>
            <ul className="list-disc list-inside text-blue-600 space-y-1 mb-14">
              {college.programs.map((program, i) => (
                <li key={i}>{program}</li>
              ))}
            </ul>
            <div className="absolute bottom-4 right-4">
              <button
                onClick={() => handleApply(college.name)}
                className="px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold rounded-full shadow-lg hover:scale-105 transform transition-transform"
              >
                Apply Now
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <button
          onClick={() => router.push('/admission')}
          className="mt-4 px-6 py-3 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition-colors shadow-lg"
        >
          Back to Admission
        </button>
      </div>
    </div>
  );
}
