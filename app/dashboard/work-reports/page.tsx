"use client";

import { useEffect, useState } from "react";
import type { ComponentType } from "react";
import ReportForm from "@/components/dashboard/ReportForm";
import ReportList from "@/components/dashboard/ReportList";

interface CurrentUser {
  username: string;
  email: string;
  role: "ADMIN" | "EMPLOYEE";
}

interface WorkReport {
  id: string;
  content: string;
  createdAt: string;
  userId: string;
  user: {
    username: string;
  };
}

export default function WorkReportsPage() {
  const [reports, setReports] = useState<WorkReport[]>([]);
  const [reportsLoading, setReportsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);

  // 🧠 گرفتن اطلاعات کاربر فعلی
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/admin/me", {
          method: "GET",
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setCurrentUser(data);
        } else {
          setCurrentUser(null);
        }
      } catch {
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // 📄 تابع رفرش لیست گزارش‌ها
  const refreshReports = async () => {
    setReportsLoading(true);
    try {
      const res = await fetch("/api/workReports", {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!res.ok) throw new Error("خطا در گرفتن گزارش‌ها");
      const data = await res.json();
      setReports(data);
    } catch (err) {
      console.error(err);
    } finally {
      setReportsLoading(false);
    }
  };

  // 📄 بارگذاری اولیه گزارش‌ها
  useEffect(() => {
    refreshReports();
  }, []);
  if (loading) return <p className="text-center mt-5">در حال بارگذاری...</p>;

  const TypedReportList = ReportList as unknown as ComponentType<{
    reports: WorkReport[];
    refreshReports: () => Promise<void>;
    loading: boolean;
    currentUser: CurrentUser | null;
  }>;

  return (
    <div className="p-6 space-y-8">
      {/* فقط برای کارمند فرم نمایش داده می‌شود */}
      {currentUser?.role === "EMPLOYEE" && (
        <ReportForm onAdded={refreshReports} />
      )}

      <p className="text-xl font-semibold tracking-tight">لیست گزارشات</p>
      <hr className="border-gray-300" />

      <TypedReportList
        reports={reports}
        refreshReports={refreshReports}
        loading={reportsLoading}
        currentUser={currentUser}
      />
    </div>
  );
}

