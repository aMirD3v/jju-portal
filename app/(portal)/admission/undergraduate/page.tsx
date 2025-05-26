'use client';

import { useRouter } from 'next/navigation';

const colleges = [
  {
    name: 'College of Engineering',
    description: 'Offering degrees in Civil, Mechanical, and Electrical Engineering.',
    programs: ['Civil Engineering', 'Mechanical Engineering', 'Electrical Engineering'],
  },
  {
    name: 'College of Natural Sciences',
    description: 'Focusing on pure and applied sciences to shape scientific thinkers.',
    programs: ['Biology', 'Chemistry', 'Physics', 'Mathematics'],
  },
  {
    name: 'College of Business and Economics',
    description: 'Preparing future leaders in business and economics.',
    programs: ['Accounting', 'Economics', 'Management', 'Marketing'],
  },
  {
    name: 'College of Social Sciences',
    description: 'Engage in the study of society, culture, and human behavior.',
    programs: ['Sociology', 'Political Science', 'Psychology'],
  },
];

export default function UndergraduatePage() {
  const router = useRouter();

  const handleApply = (collegeName: string) => {
    // Navigate to application form with college info
    router.push(`/admission/apply?college=${encodeURIComponent(collegeName)}`);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-blue-500 mb-4 ">
          Undergraduate Programs
        </h1>
        <p className="text-blue-500 text-lg font-medium">
          Discover the undergraduate programs offered by various colleges at <span className="font-bold text-blue-700">Jigjiga University</span>.
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
                className="px-5 py-2 bg-gradient-to-r from-blue-500 to-blue-500 text-white font-semibold rounded-full shadow-lg hover:scale-105 transform transition-transform"
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
          className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors shadow-lg"
        >
          Back to Admission
        </button>
      </div>
    </div>
  );
}
