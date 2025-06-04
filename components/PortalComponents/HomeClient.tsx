"use client";

import Link from "next/link";
import LoginPage from "@/app/(portal)/login/page";
import Image from "next/image";
import { useState } from "react";
import { EnvelopeIcon } from "@heroicons/react/24/solid";
import toast from "react-hot-toast";

export default function HomeClient() {
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetting, setResetting] = useState(false);

  const handleResetPassword = async () => {
    if (!resetEmail) {
      toast.error("Please enter your email.");
      return;
    }

    setResetting(true);

    try {
      const res = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: resetEmail }),
      });

      if (res.ok) {
        toast.success("New password sent to your email.");
        setShowResetModal(false);
        setResetEmail("");
      } else {
        const data = await res.json();
        toast.error(data.error || "Failed to reset password.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setResetting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        {/* Left Side */}
      <div className="flex flex-col gap-8 justify-center">
  {[
    {
      href: "/admission",
      title: "Admission",
      description: "Online admission for all programs",
      image: "/jju-image2.jpg",
      alt: "Postgraduate Admission",
    },
    {
      href: "/biography",
      title: "Biography Collection",
      description: "Biography collection of Jigjiga University",
      image: "/jju-image4.jpg",
      alt: "Biography Collection",
    },
    {
      href: "/placement",
      title: "Exam & Class Placement",
      description: "Student exam and class placement system",
      image: "/jju-image1.jpg",
      alt: "Placement System",
    },
  ].map(({ href, title, description, image, alt }, index) => (
    <Link
      key={title}
      href={href}
      className="group transform transition duration-500 ease-in-out hover:scale-105 hover:rotate-1 motion-safe:animate-fadeInUp"
    >
      <div className="relative overflow-hidden rounded-3xl shadow-xl bg-white flex flex-col md:flex-row">
        {/* Image with overlay gradient */}
        <div className="relative w-full md:w-48 h-48 md:h-auto">
          <Image
            src={image}
            alt={alt}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-500 ease-in-out transform group-hover:scale-110"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-50 group-hover:opacity-70 transition duration-300 rounded-bl-3xl"></div>
        </div>

        {/* Text content */}
        <div className="flex flex-col justify-center items-center p-4 md:p-6 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-br-3xl md:rounded-br-3xl flex-1 transform transition duration-500 group-hover:translate-x-1">
          <h2 className="text-xl md:text-2xl font-bold tracking-wide mb-1 drop-shadow-sm animate-fadeInUp">
            {title}
          </h2>
          <p className="text-blue-100 text-center text-sm md:text-base animate-fadeInUp delay-100">
            {description}
          </p>
        </div>
      </div>
    </Link>
  ))}
</div>


        {/* Right Side */}
        <div>
          <LoginPage onResetPassword={() => setShowResetModal(true)} />
        </div>
      </div>

      {/* Modal */}
      {showResetModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80 space-y-4 shadow-lg">
            <h3 className="text-lg font-semibold text-blue-500 flex items-center gap-2">
              <EnvelopeIcon className="h-5 w-5 text-blue-400" /> Reset Password
            </h3>
            <p className="text-sm text-gray-500">
              Enter your email to receive a new password.
            </p>
            <input
              type="email"
              placeholder="Email address"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowResetModal(false)}
                className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleResetPassword}
                disabled={resetting}
                className="px-3 py-1 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded disabled:opacity-50"
              >
                {resetting ? "Sending..." : "Send"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
