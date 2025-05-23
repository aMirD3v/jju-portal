import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";

export default async function StaffPage() {
  const session = await getServerSession(authOptions);
  if (
    !session ||
    (session.user.role !== "staff" && session.user.role !== "admin")
  )
    redirect("/unauthorized");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r">
      <h1 className="text-3xl font-bold mb-4">Staff Dashboard</h1>
      <p className="text-lg mb-2">
        Manage your tasks and responsibilities here.
      </p>
      <p className="text-lg mb-2">You are logged in as: {session.user.name}</p>
      <p className="text-lg mb-2">Role: {session.user.role}</p>
      <p className="text-lg mb-2">Email: {session.user.email}</p>
      <LogoutButton />
    </div>
  );
}
