"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { useState } from "react";

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const role = session?.user?.role;

  const linkClass = (path: string) =>
    `p-2 rounded mb-1 cursor-pointer block ${
      pathname === path
        ? "bg-blue-500 text-white"
        : "hover:bg-blue-500 hover:text-white text-blue-500"
    }`;

  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({
    placement: pathname.includes("/placement"),
  });

  const toggleMenu = (key: string) => {
    setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <aside className="w-60 h-screen bg-blue-100/10 text-blue-500 p-4 fixed border-2 border-blue-100">
      <div className="flex items-center space-x-3 mb-2">
        <Link href="/">
          <Image src="/logo.png" alt="Logo" width={40} height={40} />
        </Link>
        <h2 className="text-2xl font-bold">JJU Portal</h2>
      </div>
      <div className="w-full h-[1px] bg-blue-100 mb-6"></div>

      <nav className="flex flex-col space-y-3">
        {role === "admin" && (
          <>
            <Link href="/dashboard/admin">
              <span className={linkClass("/dashboard/admin")}>Dashboard</span>
            </Link>
            <Link href="/dashboard/admin/applications">
              <span className={linkClass("/dashboard/admin/applications")}>
                Manage Applications
              </span>
            </Link>
            {/* Manage Placement Dropdown */}
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
                  <Link href="/dashboard/admin/placement/departments">
                    <span
                      className={linkClass(
                        "/dashboard/admin/placement/departments",
                        pathname
                      )}
                    >
                      Create Department
                    </span>
                  </Link>
                  <Link href="/dashboard/admin/placement/create-session">
                    <span
                      className={linkClass(
                        "/dashboard/admin/placement/create-session",
                        pathname
                      )}
                    >
                      Create Session
                    </span>
                  </Link>
                  <Link href="/dashboard/admin/placement/">
                    <span
                      className={linkClass(
                        "/dashboard/admin/placement/",
                        pathname
                      )}
                    >
                      Placement
                    </span>
                  </Link>
                  <Link href="/dashboard/admin/placement/view">
                    <span
                      className={linkClass(
                        "/dashboard/admin/placement/view",
                        pathname
                      )}
                    >
                      View Results
                    </span>
                  </Link>
                </div>
              )}
            </div>
            <Link href="/dashboard/admin/admission">
              <span className={linkClass("/dashboard/admin/admission")}>
                Manage Admission
              </span>
            </Link>
            <Link href="/dashboard/admin/users">
              <span className={linkClass("/dashboard/admin/users")}>
                Manage Users
              </span>
            </Link>
          </>
        )}

        {role === "staff" && (
          <>
            <Link href="/dashboard/staff">
              <span className={linkClass("/dashboard/staff")}>
                Staff Dashboard
              </span>
            </Link>
            {/* More staff links */}
          </>
        )}

        {role === "student" && (
          <>
            <Link href="/dashboard/student">
              <span className={linkClass("/dashboard/student")}>
                My Admission
              </span>
            </Link>
            {/* More student links */}
          </>
        )}
      </nav>
    </aside>
  );
}
