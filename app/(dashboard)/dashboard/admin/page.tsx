import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import AdminStats from "@/components/AdminStats";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") redirect("/unauthorized");

  return (
   
      <AdminStats />
    
  );
}
