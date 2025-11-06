// /app/dashboard/reports/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { User, Mail, CalendarDays, FileText, BadgeCheck } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

type Report = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  status: string; // ✅ اضافه شد
  employee?: { username: string; email: string };
};

export default function ReportDetailPage({ initialReport }: { initialReport: Report | null }) {
  const { id } = useParams();
  const [report, setReport] = useState<Report | null>(initialReport ?? null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await fetch(`/api/workReports/${id}`, { credentials: "include" });
        if (!res.ok) throw new Error("Report not found");
        const data = await res.json();
        setReport(data);
      } catch {
        setReport(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchReport();
  }, [id]);




  if (loading) return <p className="text-center mt-6">در حال بارگذاری...</p>;
  if (!report) return <p className="text-center mt-6 text-red-600">گزارش یافت نشد</p>;

  return (
    <div className="max-w-3xl mx-auto mt-12 p-8 bg-white shadow-lg rounded-3xl border border-gray-100" dir="rtl">
      {/* عنوان گزارش و تاریخ */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
          <FileText className="w-6 h-6 text-blue-600" />
          {report.title}
        </h1>
        <p className="text-sm text-gray-500 flex items-center gap-1">
          <CalendarDays className="w-4 h-4 text-gray-400" />
          {new Date(report.createdAt).toLocaleString("fa-IR", {
            dateStyle: "short",
            timeStyle: "short",
          })}
        </p>
      </div>

      {/* متن گزارش */}
      <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
        <p className="text-gray-700 leading-relaxed whitespace-pre-line text-justify">
          {report.content}
        </p>
      </div>

      {/* اطلاعات کارمند */}
      <div className="mt-8 border-t pt-6 text-sm text-gray-600 space-y-2">
        <div className="flex items-center gap-2 justify-start">
          <span className="font-medium text-gray-800">{report.employee?.username ?? "—"}</span>
          <User className="w-4 h-4 text-gray-500" />
        </div>

        <div className="flex items-center gap-2 justify-start">
          <span>{report.employee?.email ?? "—"}</span>
          <Mail className="w-4 h-4 text-gray-500" />
        </div>
      </div>

      {/* برگشت */}
      <div className="mt-6 flex justify-end">
        <Link href="/dashboard/work-reports" className="text-gray-700 hover:underline">
          برگشت به گزارشات
        </Link>
      </div>
    </div>
  );
}
