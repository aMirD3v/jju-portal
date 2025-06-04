"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { signIn, signOut, useSession } from "next-auth/react";
// ↓ import from next/navigation, not next/router
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();

  const router = useRouter();
  // the hook to read the current pathname
  const pathname = usePathname();

  const toggleSidebar = () => setIsOpen((o) => !o);

  return (
    <>
      <header className="shadow-md w-full bg-white/70 backdrop-blur">
        <div className="max-w-7xl mx-auto px-2 py-4 flex items-center justify-between">
          {/* Logo + Title */}
          <div className="flex items-center space-x-3">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Logo"
                width={40}
                height={40}
                className="cursor-pointer"
              />
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold text-blue-500">
              Jigjiga University Portal
            </h1>
          </div>

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

          {
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
        </nav>

        <div className="mt-auto p-6 border-t border-blue-100 bg-white/80">
          <button
            className="w-full bg-blue-500 text-white font-bold py-2 rounded-lg shadow hover:bg-blue-600 transition"
            onClick={() => {
              toggleSidebar();
              // Add your login logic here if needed
            }}
          >
            Login
          </button>
        </div>
      </aside>
    </>
  );
}
