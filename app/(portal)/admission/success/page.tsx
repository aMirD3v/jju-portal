"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // Scroll to top on load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col justify-between items-center bg-blue-50 px-4 pt-20 pb-10">
      {/* Content */}
      <div className="max-w-2xl text-center">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">
          🎉 Application Submitted Successfully!
        </h1>
        <p className="text-gray-700 text-lg mb-6">
          Thank you for completing your application. Your information has been
          received and is currently under review.
        </p>
        <p className="text-gray-600 mb-4">
          You'll receive an email shortly with your <strong>username</strong>{" "}
          and <strong>password</strong> that you can use to log in and check
          your admission status.
        </p>
        {/* add some style like add some icons that tells trash or spam */}
        <p className="text-gray-600 mb-4">
          If you don't receive the email within a few minutes, please check your
          <strong> spam</strong> or <strong> trash</strong> folder.
        </p>
        <p className="text-gray-600">
          If you have any questions, feel free to contact the admissions office.
        </p>
      </div>

      {/* Bottom fixed login button */}
      <div className="w-full max-w-md">
        <button
          onClick={() => router.push("/")}
          className="mt-12 w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
}
