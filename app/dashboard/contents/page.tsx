"use client";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Content = {
  id: string;
  title: string;
  body: string;
  section?: string;
  imageUrl?: string;
  order?: number;
  country: { id: string; name: string };
  visaTypes: { id: string; name: string }[];
  createdAt: string;
};

export default function ContentPage() {
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // تعداد آیتم‌ها در هر صفحه
  const maxPageButtons = 5; // حداکثر شماره صفحات برای نمایش

  useEffect(() => {
    async function fetchContents() {
      try {
        const res = await fetch("/api/contents");
        const data = await res.json();
        setContents(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchContents();
  }, []);

  const totalPages = Math.ceil(contents.length / itemsPerPage);
  const displayedContents = contents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageClick = (page: number) => setCurrentPage(page);
  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  // محاسبه بازه شماره صفحات برای نمایش
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

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold tracking-tight">لیست محتویات سایت</h1>
        <Link
          href="contents/create"
          className="flex items-center bg-gray-800 text-white px-4 py-2 rounded-lg text-sm tracking-tight"
        >
          ایجاد بلاگ جدید
          <PlusCircle className="w-5 h-5 mr-2" />
        </Link>
      </div>

      <table className="w-full border border-gray-200 shadow-md rounded">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="py-3">عنوان</th>
            <th className="py-3">کشور</th>
            <th className="py-3">بخش</th>
            <th className="py-3">نوع ویزا</th>
            <th className="py-3">ترتیب</th>
            <th className="py-3">عملیات</th>
          </tr>
        </thead>
        <tbody>
          {displayedContents.map((content) => (
            <tr key={content.id} className="border-b border-gray-300">
              <td className="py-2.5 px-2">{content.title}</td>
              <td className="py-2.5 px-2">{content.country.name}</td>
              <td className="py-2.5 px-2">{content.section || "-"}</td>
              <td className="py-2.5 px-2">{content.visaTypes.map((v) => v.name).join(", ") || "-"}</td>
              <td className="py-2.5 px-2">{content.order ?? "-"}</td>
              <td className="py-2.5 px-2">
                <Link
                  href={`contents/${content.id}/edit`}
                  className="bg-blue-600 text-white hover:bg-blue-700 rounded px-2 py-1"
                >
                  ویرایش
                </Link>
              </td>
            </tr>
          ))}
        </tbody>

        {totalPages > 1 && (
          <tfoot>
            <tr>
              <td colSpan={5} className="p-2">
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
