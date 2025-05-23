import Link from "next/link";
import LoginPage from "@/app/(portal)/login/page";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    const role = session.user?.role;
    switch (role) {
      case "admin":
        redirect("/dashboard/admin");
      case "staff":
        redirect("/dashboard/staff");
      case "student":
        redirect("/dashboard/student");
      default:
        redirect("/unauthorized");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        {/* Left Side */}
        <div className="flex flex-col gap-8 justify-center">
          <Link href="/admission" className="group">
            <div className="overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 group-hover:scale-105 bg-white">
              <Image
                src="/jju-image2.jpg"
                alt="Postgraduate Admission"
                width={500}
                height={300}
                className="object-cover w-full h-36"
                priority
              />
              <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-2 rounded-b-2xl flex flex-col items-center transition-colors duration-200 group-hover:from-blue-700 group-hover:to-blue-600">
                <h2 className="text-2xl font-bold text-white mb-1 tracking-wide drop-shadow">
                  Admission
                </h2>
                <p className="text-blue-100 text-center text-base">
                  Online admission for all programs
                </p>
              </div>
            </div>
          </Link>

          <Link href="/biography" className="group">
            <div className="overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 group-hover:scale-105 bg-white">
              <Image
                src="/jju-image4.jpg"
                alt="Biography Collection"
                width={500}
                height={300}
                className="object-cover w-full h-36"
                priority
              />
              <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-2 rounded-b-2xl flex flex-col items-center transition-colors duration-200 group-hover:from-blue-700 group-hover:to-blue-600">
                <h2 className="text-2xl font-bold text-white mb-1 tracking-wide drop-shadow">
                  Biography Collection
                </h2>
                <p className="text-blue-100 text-center text-base">
                  Biography collection of Jigjiga University
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Right Side */}
        <div className="">
          <LoginPage />
        </div>
      </div>
    </div>
  );
}
