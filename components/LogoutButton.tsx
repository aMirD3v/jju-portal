"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      className="w-fit p-2 rounded-lg mt-4 border-red-500 border-1 bg-red-100 hover:bg-red-200 text-red-500 font-semibold transition-all"
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      Logout
    </button>
  );
}
