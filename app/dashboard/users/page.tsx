"use client";

import { PlusCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

type User = {
  id: string;
  name: string;
  fatherName: string | null;
  phone: string | null;
  code: string | null;
  status: string;
  profileImage: string | null;
};

export default function UserPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // تعداد کاربران در هر صفحه
  const maxPageButtons = 5; // حداکثر شماره صفحات برای نمایش

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("/api/users", { cache: "no-store" });
        const data = await res.json();

        if (!res.ok) {
          setError(data.message || "خطا در دریافت کاربران");
          setLoading(false);
          return;
        }

        setUsers(data.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("خطای شبکه یا سرور رخ داد");
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("آیا از حذف این کاربر مطمئن هستید؟")) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "خطا در حذف کاربر");

      setUsers(users.filter((user) => user.id !== id));
      alert("کاربر با موفقیت حذف شد");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  // محاسبه صفحات
  const totalPages = Math.ceil(users.length / itemsPerPage);
  const displayedUsers = users.slice(
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

  if (loading) return <p className="text-center">در حال بارگذاری...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight">مدیریت کاربران</h1>
          <p className="text-gray-600">لیست کاربران ثبت‌نام شده در سیستم</p>
        </div>
        <div>
          <Link
            href="users/create"
            className="flex items-center bg-gray-800 text-white px-4 py-2 rounded-lg text-sm tracking-tight"
          >
            افزودن کاربر جدید
            <PlusCircle className="w-5 h-5 mr-2" />
          </Link>
        </div>
      </div>

      <div className="border-b border-gray-300 h-1 mb-4" />

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 shadow-md rounded">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3">عکس</th>
              <th className="py-3">نام</th>
              <th className="py-3">نام پدر</th>
              <th className="py-3">تلفن</th>
              <th className="py-3">شماره کلاینت</th>
              <th className="py-3">وضعیت</th>
              <th className="py-3">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {displayedUsers.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center p-4">
                  هیچ کاربری یافت نشد
                </td>
              </tr>
            ) : (
              displayedUsers.map((user) => (
                <tr key={user.id} className="border-b text-center">
                  <td className="p-2">
                    {user.profileImage ? (
                      <Image
                        src={user.profileImage}
                        alt={user.name}
                        width={68}
                        height={68}
                        className="w-16 h-16 rounded-full mx-auto object-cover"
                      />
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="p-2 text-green-500">
                    <Link href={`/dashboard/users/${user.id}`}>{user.name}</Link>
                  </td>
                  <td className="p-2">{user.fatherName || "-"}</td>
                  <td className="p-2">{user.phone || "-"}</td>
                  <td className="p-2">{user.code || "-"}</td>
                  <td className="p-2">{user.status}</td>
                  <td className="p-2 space-x-2">
                    <Link
                      href={`users/${user.id}/edit`}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
                    >
                      ویرایش
                    </Link>
                    <button
                      onClick={() => handleDelete(user.id)}
                      disabled={deletingId === user.id}
                      className={`px-2 py-1 rounded ${
                        deletingId === user.id
                          ? "bg-gray-400 text-white cursor-not-allowed"
                          : "bg-red-500 hover:bg-red-600 text-white"
                      }`}
                    >
                      {deletingId === user.id ? "در حال حذف..." : "حذف"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>

          {totalPages > 1 && (
            <tfoot>
              <tr>
                <td colSpan={7} className="p-2">
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
