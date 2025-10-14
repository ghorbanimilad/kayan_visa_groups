// Server Component
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DashboardShell from "./DashboardShell";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies(); // <- باید await شود
  const token = cookieStore.get("adminToken")?.value;

  if (!token) {
    redirect("/admin/login"); // اگر کوکی نبود → لاگین
  }

  return <DashboardShell>{children}</DashboardShell>;
}
