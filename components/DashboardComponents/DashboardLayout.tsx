"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({
    placement: pathname.includes("/placement"),
  });

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const role = session?.user?.role;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target as Node)
      ) {
        setProfileDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = (key: string) => {
    setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const toggleProfileDropdown = () => setProfileDropdownOpen((prev) => !prev);

  const linkClass = (path: string) =>
    `p-2 rounded mb-1 cursor-pointer block ${
      pathname === path
        ? "bg-blue-500 text-white"
        : "hover:bg-blue-500 hover:text-white text-blue-500"
    }`;

  const currentPageTitle = () => {
    const routes: Record<string, string> = {
      "/dashboard/admin": "Dashboard",
      "/dashboard/admin/applications": "Applications",
        "/dashboard/admin/placement/departments": "Create Department",
        "/dashboard/admin/placement/create-session": "Create Session",
        "/dashboard/admin/placement/upload-assign": "Placement",
        "/dashboard/admin/placement/view": "View Results",
      "/dashboard/admin/admission": "Admission",
      "/dashboard/admin/admission/manage": "Admission",
      "/dashboard/admin/users": "Manage Users",
      "/dashboard/staff": "Dashboard",
      "/dashboard/student": "Dashboard",
    };
    return routes[pathname] || "";
  };

  const getProfileInitial = () => {
    if (!session?.user) return "?";
    const name = session.user.fullName || session.user.email || "";
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside
      className={`sidebar-scroll fixed z-40 top-0 left-0 h-full w-60 bg-white border-r-2 border-blue-100 p-4 transform transition-transform duration-200 ease-in-out
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:relative md:z-auto overflow-y-auto`}
      >
        {/* Logo + Sidebar Content */}
        <div className="flex items-center space-x-3 mb-2">
          <Link href="/">
            <Image src="/logo.png" alt="Logo" width={40} height={40} />
          </Link>
          <h2 className="text-2xl text-blue-500 font-bold">JJU Portal</h2>
          <button
            onClick={toggleSidebar}
            className="md:hidden text-blue-700"
            >
            {sidebarOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
            </button>

        </div>
        <div className="w-full h-[1px] bg-blue-100 mb-6" />

        <nav className="flex flex-col space-y-3 text-blue-500">
{role === "admin" && (
  <>
    <Link href="/dashboard/admin" onClick={() => setSidebarOpen(false)}>
      <span className={linkClass("/dashboard/admin")}>Dashboard</span>
    </Link>
    <Link href="/dashboard/admin/applications" onClick={() => setSidebarOpen(false)}>
      <span className={linkClass("/dashboard/admin/applications")}>
        Manage Applications
      </span>
    </Link>

    <div>
      <button
        onClick={() => toggleMenu("placement")}
        className="flex items-center justify-between w-full px-2 py-2 rounded hover:bg-blue-100 transition"
      >
        <span className="font-medium">Manage Placement</span>
        {openMenus.placement ? <FaChevronDown /> : <FaChevronRight />}
      </button>
      {openMenus.placement && (
        <div className="ml-4 mt-1 space-y-1">
          <Link href="/dashboard/admin/placement/departments" onClick={() => setSidebarOpen(false)}>
            <span className={linkClass("/dashboard/admin/placement/departments")}>
              Create Department
            </span>
          </Link>
          <Link href="/dashboard/admin/placement/create-session" onClick={() => setSidebarOpen(false)}>
            <span className={linkClass("/dashboard/admin/placement/create-session")}>
              Create Session
            </span>
          </Link>
          <Link href="/dashboard/admin/placement/upload-assign" onClick={() => setSidebarOpen(false)}>
            <span className={linkClass("/dashboard/admin/placement/upload-assign")}>
              Placement
            </span>
          </Link>
          <Link href="/dashboard/admin/placement/view" onClick={() => setSidebarOpen(false)}>
            <span className={linkClass("/dashboard/admin/placement/view")}>
              View Results
            </span>
          </Link>
        </div>
      )}
    </div>

    <Link href="/dashboard/admin/admission" onClick={() => setSidebarOpen(false)}>
      <span className={linkClass("/dashboard/admin/admission")}>
        Manage Admission
      </span>
    </Link>
    <Link href="/dashboard/admin/users" onClick={() => setSidebarOpen(false)}>
      <span className={linkClass("/dashboard/admin/users")}>Manage Users</span>
    </Link>
  </>
)}


          {role === "staff" && (
            <Link href="/dashboard/staff">
              <span className={linkClass("/dashboard/staff")}>Staff Dashboard</span>
            </Link>
          )}

          {role === "student" && (
            <Link href="/dashboard/student">
              <span className={linkClass("/dashboard/student")}>My Admission</span>
            </Link>
          )}
        </nav>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white/70 backdrop-blur shadow-md p-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button onClick={toggleSidebar} className="md:hidden text-blue-700">
              {sidebarOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
            </button>
            <h1 className="text-xl font-bold text-blue-500">{currentPageTitle()}</h1>
          </div>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center space-x-4 text-blue-700 font-medium">
            <Link href="/" className="hover:text-blue-500">Home</Link>
            <Link href="/admission" className="hover:text-blue-500">Admission</Link>
            <Link href="/biography" className="hover:text-blue-500">Biography</Link>
            <Link href="/placement" className="hover:text-blue-500">Placement</Link>

            {status === "loading" ? (
              <div className="w-5 h-5 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            ) : session ? (
              <>
                <span className="px-3 py-1 bg-blue-100 rounded text-sm text-blue-800">
                  {session.user?.fullName || session.user?.email}
                </span>
                <button onClick={() => signOut()} title="Logout">
                  <svg className="h-5 w-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" />
                  </svg>
                </button>
              </>
            ) : null}
          </nav>

          {/* Mobile Profile Dropdown */}
          <div className="md:hidden relative" ref={profileDropdownRef}>
            {session && (
              <button
                onClick={toggleProfileDropdown}
                className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 font-bold flex items-center justify-center"
                title="Profile menu"
              >
                {getProfileInitial()}
              </button>
            )}

            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-blue-100 rounded-md shadow-lg z-50 text-blue-800 font-medium">
                <Link href="/" onClick={() => setProfileDropdownOpen(false)} className="block px-4 py-2 hover:bg-blue-100">
                  Home
                </Link>
                <Link href="/admission" onClick={() => setProfileDropdownOpen(false)} className="block px-4 py-2 hover:bg-blue-100">
                  Admission
                </Link>
                <Link href="/biography" onClick={() => setProfileDropdownOpen(false)} className="block px-4 py-2 hover:bg-blue-100">
                  Biography
                </Link>
                <Link href="/placement" onClick={() => setProfileDropdownOpen(false)} className="block px-4 py-2 hover:bg-blue-100">
                  Placement
                </Link>

                <div className="border-t border-blue-100 my-1" />

                <div className="px-4 py-2 text-sm">
                  <p className="mb-2 text-blue-600 truncate">
                    {session.user?.fullName || session.user?.email}
                  </p>
                  <button
                    onClick={() => {
                      signOut({ callbackUrl: "/" });
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full bg-red-500 text-white py-1 px-3 rounded-md text-sm"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">{children}</main>
      </div>
    </div>
  );
}
