"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { signIn, signOut, useSession } from "next-auth/react";
// ↓ import from next/navigation, not next/router
import { useRouter, usePathname } from "next/navigation";

export default function DashboardHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();

  const router = useRouter();
  // the hook to read the current pathname
  const pathname = usePathname();

  const toggleSidebar = () => setIsOpen((o) => !o);

  return (
    <>
      <header className="shadow-md ml-60 bg-white/70 backdrop-blur">
        <div className="max-w-7xl mx-auto px-2 py-4 flex items-center justify-between">
          <h1 className="text-2xl md:text-2xl font-bold text-blue-500 ms-5">
            {pathname === "/dashboard/admin" && "Dashboard"}
            {pathname === "/dashboard/admin/applications" && "Applications"}
            {pathname === "/dashboard/admin/placement" && "Manage Placement"}
            {pathname === "/dashboard/admin/admission" && "Admission"}
            {pathname === "/dashboard/admin/admission/manage" && "Admission"}
            {pathname === "/dashboard/admin/users" && "Manage Users"}
            {pathname === "/dashboard/staff" && "Dashboard"}
            {pathname === "/dashboard/staff/applications" && "Applications"}
            {pathname === "/dashboard/student" && "Dashboard"}
            {pathname === "/dashboard/student/applications" && "Applications"}
            {/* Add more routes as needed */}
          </h1>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-4 text-blue-700 font-medium">
            <Link href="/" className="hover:text-blue-500">
              Home
            </Link>
            <Link href="/admission" className="hover:text-blue-500">
              Admission
            </Link>
            <Link href="/biography" className="hover:text-blue-500">
              Biography
            </Link>
            <Link href="/placement" className="hover:text-blue-500">
              Placement
            </Link>
            

            {status === "loading" ? (
              <div className=" inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
                <div
                  className="
                    w-5 h-5
                    border-4 border-blue-500 
                    border-t-transparent
                    rounded-full
                    animate-spin
                  "
                />
              </div>
            ) : session ? (
              <>
                <span className="px-3 py-1 bg-blue-100 rounded text-[12px] text-blue-800">
                  {session.user?.fullName || session.user?.email}
                </span>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="rounded hover:bg-red-100"
                  title="Logout"
                >
                  {/* logout icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1"
                    />
                  </svg>
                </button>
              </>
            ) : // hide “Login” on the home page
            pathname === "/" ? null : (
              <button
                onClick={() => router.push("/")}
                className="bg-blue-50 border-blue-500 border-2 text-blue-500 py-1 px-3 rounded-md hover:bg-blue-100"
              >
                Login
              </button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-blue-700 focus:outline-none"
            onClick={toggleSidebar}
            aria-label="Toggle Menu"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
  {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity duration-300"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={`fixed top-0 right-0 w-72 max-w-full h-full bg-gradient-to-b from-blue-50 to-white shadow-2xl z-50
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "translate-x-full"}
          flex flex-col
        `}
      >
        <div className="p-5 flex justify-between items-center border-b border-blue-100 bg-white/80 rounded-tr-lg">
          <h2 className="text-2xl font-bold text-blue-700 tracking-wide">Menu</h2>
          <button
            onClick={toggleSidebar}
            className="rounded-full p-2 hover:bg-blue-100 transition"
            aria-label="Close Menu"
          >
            <XMarkIcon className="h-7 w-7 text-blue-500" />
          </button>
        </div>

        <nav className="flex flex-col gap-3 p-6 text-blue-800 font-semibold">
          <Link
            href="/"
            onClick={toggleSidebar}
            className="rounded-lg px-4 py-2 hover:bg-blue-100 transition"
          >
            Home
          </Link>
          <Link
            href="/admission"
            onClick={toggleSidebar}
            className="rounded-lg px-4 py-2 hover:bg-blue-100 transition"
          >
            Admission
          </Link>
          <Link
            href="/biography"
            onClick={toggleSidebar}
            className="rounded-lg px-4 py-2 hover:bg-blue-100 transition"
          >
            Biography
          </Link>
          <Link
            href="/placement"
            onClick={toggleSidebar}
            className="rounded-lg px-4 py-2 hover:bg-blue-100 transition"
          >
            Placement
          </Link>

          {status === "loading" ? (
            <span>Loading…</span>
          ) : session ? (
            <div className="flex flex-col space-y-2">
              <span className="px-3 py-1 bg-blue-100 rounded text-[12px] text-blue-800">
                {session.user?.fullName || session.user?.email}
              </span>
              <button
                onClick={() => {
                  signOut({ callbackUrl: "/" });
                  toggleSidebar();
                }}
                className="bg-red-500 text-white py-2 px-4 rounded-md w-fit"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                signIn();
                toggleSidebar();
              }}
              className="bg-blue-500 text-white py-2 px-4 rounded-md w-fit"
            >
              Login
            </button>
          )}
        </nav>
      </aside>
    </>
  );
}
