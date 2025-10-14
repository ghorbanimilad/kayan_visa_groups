"use client";
import { TimerIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Reservation {
  id: string;
  fullName: string;
  email?: string;
  phone: string;
  visaType: string;
  status: string;
}

export default function AdminReservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // پیجینیشن
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const maxPageButtons = 5;

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const res = await fetch("/api/reservations");
        const data = await res.json();
        setReservations(data);
      } catch (err) {
        console.error("Error fetching reservations:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReservations();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/reservations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) {
        console.error("خطا در بروزرسانی وضعیت");
        return;
      }
      setReservations((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status } : r))
      );
    } catch (err) {
      console.error("خطا در بروزرسانی وضعیت:", err);
    }
  };

  const deleteReservation = async (id: string) => {
    try {
      const res = await fetch(`/api/reservations/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) {
        toast.error("خطا در حذف رزرو");
        return;
      }

      toast.success("رزرو با موفقیت حذف شد ✅");
      setReservations((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error("خطا در حذف رزرو:", err);
      toast.error("مشکلی پیش آمد.");
    }
  };

  // پیجینیشن
  const totalPages = Math.ceil(reservations.length / itemsPerPage);
  const displayedReservations = reservations.slice(
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

  if (loading) return <p className="text-center mt-10">در حال بارگذاری...</p>;

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <h2 className="text-xl font-bold tracking-tight mb-1">مدیریت رزروها</h2>
      <p className="text-md text-gray-700">وقت های رزرو شده توسط کاربر</p>
      <div className="border-b border-gray-300 h-1 my-4" />
      <table className="w-full border-b border-gray-200 shadow-md rounded">
        <thead className="bg-gray-800 text-white">
          <tr className="">
            <th className="py-3 px-2">شماره</th>
            <th className="py-3 px-2">نام</th>
            <th className="py-3 px-2">ایمیل</th>
            <th className="py-3 px-2">تلفن</th>
            <th className="py-3 px-2">نوع ویزا</th>
            <th className="py-3 px-2">وضعیت</th>
            <th className="py-3 px-2">عملیات</th>
          </tr>
        </thead>
        <tbody>
          {displayedReservations.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center p-4">
                هیچ رزروی یافت نشد
              </td>
            </tr>
          ) : (
            displayedReservations.map((r, index) => (
              <tr key={r.id} className="border-b-2 border-gray-300 text-center">
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{r.fullName}</td>
                <td className="p-2">{r.email || "-"}</td>
                <td className="p-2">{r.phone}</td>
                <td className="p-2">{r.visaType}</td>
                <td className="p-2">
                  <select
                    value={r.status}
                    onChange={(e) => updateStatus(r.id, e.target.value)}
                    className="rounded p-1"
                  >
                    <option value="PENDING">در حال انتظار</option>
                    <option value="APPROVED">تایید</option>
                    <option value="REJECTED">رد شده</option>
                  </select>
                </td>
                <td className="p-2">
                  <button
                    onClick={() => deleteReservation(r.id)}
                    className="bg-red-500 cursor-pointer text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>

        {totalPages > 1 && (
          <tfoot>
            <tr>
              <td colSpan={6} className="p-2">
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
    </div>
  );
}
