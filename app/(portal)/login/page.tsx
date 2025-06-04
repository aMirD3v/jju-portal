"use client";

import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { UserIcon, LockClosedIcon } from "@heroicons/react/24/solid";

export default function LoginPage({
  onResetPassword,
}: {
  onResetPassword: () => void;
}) {
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
    if (!username || !password) {
      toast.error("Please enter both username and password.");
      return;
    }

    setLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        username,
        password,
      });

      if (res?.ok) {
        const session = await getSession();
        const role = session?.user?.role;

        toast.success("Login successful!");

        if (role === "admin") router.push("/dashboard/admin");
        else if (role === "staff") router.push("/dashboard/staff");
        else if (role === "student") router.push("/dashboard/student");
        else router.push("/unauthorized");
      } else {
        switch (res?.error) {
          case "CredentialsSignin":
            toast.error("Invalid username or password.");
            break;
          case "UserNotFound":
            toast.error("User not found.");
            break;
          default:
            toast.error("Something went wrong. Please try again.");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white backdrop-blur-lg shadow-xl p-8 h-full rounded-lg flex flex-col justify-center space-y-6">
      <Image
        src="/jju-logo.png"
        alt="Logo"
        width={1000}
        height={1000}
        className="cursor-pointer self-center w-24 h-28"
      />
      <h2 className="text-3xl font-semibold text-blue-500">Login</h2>

      {/* Username */}
      <div className="relative">
        <label htmlFor="username" className="block text-blue-500 mb-1">Username</label>
        <div className="flex items-center border-2 border-blue-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-400">
          <UserIcon className="h-5 w-5 text-blue-400 ml-3" />
          <input
            id="username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="flex-1 p-3 rounded-lg text-blue-400 placeholder-blue-200 focus:outline-none bg-transparent"
          />
        </div>
      </div>

      {/* Password */}
      <div className="relative">
        <label htmlFor="password" className="block text-blue-500 mb-1">Password</label>
        <div className="flex items-center border-2 border-blue-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-400">
          <LockClosedIcon className="h-5 w-5 text-blue-400 ml-3" />
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 p-3 rounded-lg text-blue-400 placeholder-blue-200 focus:outline-none bg-transparent"
          />
        </div>
      </div>

      <button
        onClick={handleLogin}
        disabled={loading}
        className="w-full py-3 rounded-lg mt-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold transition-all flex justify-center items-center disabled:opacity-50"
      >
        {loading ? (
          <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          "Login"
        )}
      </button>

      <div className="text-center text-sm text-gray-400">
        Forgot your password?{" "}
        <button
          onClick={onResetPassword}
          className="text-blue-500 hover:underline"
        >
          Reset it
        </button>
      </div>
    </div>
  );
}
