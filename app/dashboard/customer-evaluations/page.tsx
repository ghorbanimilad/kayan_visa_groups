"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Evaluation = {
  id: string;
  fullName: string;
  age?: number | string;
  education?: string;
  experience?: string;
  englishLevel?: string;
  country?: string;
  email?: string;
  phone?: string;
};

export default function Page() {
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const [loading, setLoading] = useState(true);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const maxPageButtons = 5;

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/evaluation");
        const data = await res.json();
        setEvaluations(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const totalPages = Math.ceil(evaluations.length / itemsPerPage);
  const displayedItems = evaluations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = async (id: string) => {
    if (!confirm("آیا مطمئن هستید که می‌خواهید این فرم را حذف کنید؟")) return;

    try {
      const res = await fetch(`/api/evaluation/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("خطا در حذف فرم");

      toast.success("فرم با موفقیت حذف شد.");
      setEvaluations(evaluations.filter((e) => e.id !== id));
    } catch (err) {
      console.error(err);
      toast.error("حذف موفقیت آمیز نبود.");
    }
  };

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

  if (loading) return <p className="text-center">در حال بارگذاری...</p>;
  if (evaluations.length === 0) return <p className="text-center">هیچ فرم ارزیابی موجود نیست.</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">لیست فرم‌های ارزیابی مهاجرت</h1>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 shadow-md rounded">
          <thead className="bg-gray-800 text-white text-center">
            <tr className="text-center">
              <th className="py-3">نام</th>
              <th className="py-3">سن</th>
              <th className="py-3">تحصیلات</th>
              <th className="py-3">سابقه کار</th>
              <th className="py-3">سطح انگلیسی</th>
              <th className="py-3">کشور</th>
              <th className="py-3">ایمیل</th>
              <th className="py-3">موبایل</th>
              <th className="py-3">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {displayedItems.map((evalItem) => (
              <tr key={evalItem.id} className="text-center hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{evalItem.fullName}</td>
                <td className="py-2 px-4 border-b">{evalItem.age}</td>
                <td className="py-2 px-4 border-b">{evalItem.education}</td>
                <td className="py-2 px-4 border-b">{evalItem.experience}</td>
                <td className="py-2 px-4 border-b">{evalItem.englishLevel}</td>
                <td className="py-2 px-4 border-b">{evalItem.country}</td>
                <td className="py-2 px-4 border-b">{evalItem.email}</td>
                <td className="py-2 px-4 border-b">{evalItem.phone}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleDelete(evalItem.id)}
                    className="text-red-600 hover:underline"
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

          {totalPages > 1 && (
            <tfoot>
              <tr>
                <td colSpan={9} className="p-2">
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
    </div>
  );
}
