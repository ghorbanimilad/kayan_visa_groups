"use client";

import { useEffect, useState } from "react";
import EditReportModal from "@/components/dashboard/EditReportModal";
import { useRouter } from "next/navigation";

type Report = {
  id: string;
  title: string;
  content: string;
  status: string;
  createdAt: string;
  admin?: { username: string; email: string; role: string };
  employee?: { username: string; email: string; role: string };
};

interface CurrentUser {
  username: string;
  email: string;
  role: "ADMIN" | "EMPLOYEE";
}

export default function ReportTable() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Report | null>(null);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [userLoading, setUserLoading] = useState(true);
  const router = useRouter();

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const maxPageButtons = 10;

  // 🔹 گرفتن اطلاعات کاربر فعلی
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/admin/me", { credentials: "include" });
        if (res.ok) {
          const data = await res.json();
          setCurrentUser(data);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setUserLoading(false);
      }
    };
    fetchUser();
  }, []);

  // 🔹 تابع مشترک برای رفرش لیست
  const refreshReports = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/workReports", {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch reports");
      const data = await res.json();
      setReports(data);
    } catch (err) {
      console.error("Error fetching reports:", err);
    } finally {
      setLoading(false);
    }
  };

  // بارگذاری اولیه
  useEffect(() => {
    refreshReports();
  }, []);

  // حذف گزارش (برای ادمین)
  const handleDelete = async (id: string) => {
    if (!confirm("آیا از حذف این گزارش مطمئنی؟")) return;

    try {
      const res = await fetch(`/api/workReports/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (res.ok) refreshReports();
      else alert("خطا در حذف گزارش");
    } catch {
      alert("خطا در حذف گزارش");
    }
  };

  // Pagination
  const totalPages = Math.ceil(reports.length / itemsPerPage);
  const displayedReports = reports.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageClick = (page: number) => setCurrentPage(page);
  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const getPageNumbers = () => {
    let start = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    let end = start + maxPageButtons - 1;
    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - maxPageButtons + 1);
    }
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  // Loading & empty state
  if (loading || userLoading) return <p className="text-center mt-5">در حال بارگذاری...</p>;
  if (reports.length === 0) return <p className="text-center mt-5">گزارشی یافت نشد</p>;

  return (
    <div className="mt-8 w-full max-w-6xl mx-auto overflow-x-auto">
      <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr className="text-center">
            <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase">عنوان</th>
            <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase">محتوا</th>
            <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase">تاریخ</th>
            <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase">نام کارمند</th>
            <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase">ایمیل کارمند</th>
            <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase">عملیات</th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {displayedReports.map((r) => (
            <tr key={r.id} className="hover:bg-gray-50 text-center">
              <td
                onClick={() =>
                  currentUser?.role === "ADMIN" && router.push(`/dashboard/work-reports/${r.id}`)
                }
                className={`px-4 py-2 text-sm ${
                  currentUser?.role === "ADMIN"
                    ? "cursor-pointer text-green-500 hover:text-green-700"
                    : "text-gray-700"
                }`}
              >
                {r.title}
              </td>

              <td className="px-4 py-2 text-sm text-gray-700">
                {r.content.length > 15 ? r.content.slice(0, 15) + "..." : r.content}
              </td>

              <td className="px-4 py-2 text-sm text-gray-700">
                {new Date(r.createdAt).toLocaleDateString("fa-IR")}
              </td>

              <td className="px-4 py-2 text-sm text-gray-700">{r.employee?.username ?? "—"}</td>
              <td className="px-4 py-2 text-sm text-gray-700">{r.employee?.email ?? "—"}</td>

              <td className="px-4 py-2 flex gap-2 justify-center">
                {currentUser?.role === "EMPLOYEE" && (
                  <button
                    onClick={() => setSelected(r)}
                    className="px-2 py-1 text-blue-500 bg-blue-100 rounded hover:bg-blue-200"
                  >
                    ویرایش
                  </button>
                )}

                {currentUser?.role === "ADMIN" && (
                  <button
                    onClick={() => handleDelete(r.id)}
                    className="px-2 py-1 bg-red-100 text-red-500 rounded hover:bg-red-200 cursor-pointer"
                  >
                    حذف
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>

        {totalPages > 1 && (
          <tfoot>
            <tr>
              <td colSpan={6} className="p-3">
                <div className="flex justify-center items-center gap-2 mt-2">
                  <button
                    onClick={handlePrev}
                    disabled={currentPage === 1}
                    className="px-3 py-1 rounded border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-50"
                  >
                    قبلی
                  </button>

                  {getPageNumbers().map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageClick(page)}
                      className={`px-3 py-1 rounded border ${
                        page === currentPage
                          ? "bg-gray-800 text-white border-gray-800"
                          : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 rounded border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-50"
                  >
                    بعدی
                  </button>
                </div>
              </td>
            </tr>
          </tfoot>
        )}
      </table>

      {/* ✏️ مودال ویرایش */}
      {selected && (
        <EditReportModal
          report={selected}
          onClose={() => setSelected(null)}
          onUpdated={refreshReports} // لیست خودکار رفرش شود
        />
      )}
    </div>
  );
}
