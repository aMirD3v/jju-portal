import Link from "next/link";
import LoginPage from "@/app/(portal)/login/page";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import HomeClient from "@/components/PortalComponents/HomeClient";

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
    <HomeClient/>
  );
}
