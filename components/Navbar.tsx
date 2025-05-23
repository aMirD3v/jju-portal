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
      {isOpen && <div className="fixed inset-0 z-40" onClick={toggleSidebar} />}

      {/* Mobile Sidebar Drawer */}
      <aside
        className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-50
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-xl font-semibold text-blue-800">Menu</h2>
          <button onClick={toggleSidebar}>
            <XMarkIcon className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        <nav className="flex flex-col p-4 space-y-4 text-blue-700 font-medium">
          <Link href="/" onClick={toggleSidebar}>
            Home
          </Link>
          <Link href="/admission" onClick={toggleSidebar}>
            Admission
          </Link>
          <Link href="/biography" onClick={toggleSidebar}>
            Biography
          </Link>
        </nav>
      </aside>
    </>
  );
}
