"use client";

import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    if (!username || !password) {
      toast.error("Please enter both username and password.");
      return;
    }

    const res = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    if (res?.ok) {
      const session = await getSession();
      const role = session?.user?.role;

      if (role === "admin") router.push("/dashboard/admin");
      else if (role === "staff") router.push("/dashboard/staff");
      else if (role === "student") router.push("/dashboard/student");
      else router.push("/unauthorized");
    } else {
      if (res?.error === "CredentialsSignin") {
        setLoading(false);
        toast.error("Invalid username or password.");
      } else if (res?.error === "UserNotFound") {
        setLoading(false);
        toast.error("User not found.");
      } else {
        setLoading(false);
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className=" bg-white backdrop-blur-lg shadow-xl p-8 h-full rounded-lg flex flex-col justify-center">
      <Image
        src="/jju-logo.png"
        alt="Logo"
        width={100}
        height={100}
        className="cursor-pointer self-center "
      />
      <h2 className="text-3xl font-semibold text-blue-500 mb-6">Login</h2>
      <div>
        <label htmlFor="username" className="block text-blue-500 mb-1">
          Username
        </label>
        <input
          id="username"
          name="username"
          type="username"
          autoCorrect="off"
          autoCapitalize="none"
          spellCheck="false"
          placeholder="Enter your username"
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full p-3 rounded-lg border-2 border-blue-300 text-blue-400 placeholder-blue-200 placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-blue-500 mb-1">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          placeholder="Enter your password"
          className="w-full p-3 rounded-lg border-2 border-blue-300 text-blue-400 placeholder-blue-200 placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="current-password"
          autoCorrect="off"
          autoCapitalize="none"
          spellCheck="false"
        />
      </div>
      <button
        type="submit"
        className="w-full py-3 rounded-lg mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold transition-all"
        onClick={handleLogin}
      >
        {loading ? (
          <div className=" inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
            <div
              className="
            w-6 h-6
            border-4 border-white
            border-t-transparent
            rounded-full
            animate-spin
          "
            />
          </div>
        ) : (
          "Login"
        )}
      </button>
    </div>
  );
}
