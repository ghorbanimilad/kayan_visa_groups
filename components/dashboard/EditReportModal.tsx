"use client";

import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

interface Props {
  report: any;
  onClose: () => void;
  onUpdated: () => void;
}

interface CurrentUser {
  username: string;
  email: string;
  role: "ADMIN" | "EMPLOYEE";
  id: string;
}

export default function EditReportModal({ report, onClose, onUpdated }: Props) {
  const [title, setTitle] = useState(report.title);
  const [content, setContent] = useState(report.content);
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [userLoading, setUserLoading] = useState(true);

  // 🧠 گرفتن اطلاعات کاربر فعلی
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/admin/me", { credentials: "include" });
        if (res.ok) {
          const data = await res.json();
          setCurrentUser(data);
        } else {
          toast.error("شما وارد نشده‌اید");
        }
      } catch (err) {
        console.error(err);
        toast.error("خطا در دریافت اطلاعات کاربر");
      } finally {
        setUserLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleSave = async () => {
    if (!currentUser) {
      toast.error("شما وارد نشده‌اید");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/workReports/${report.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ title, content }),
      });

      const data = await res.json();
      
      if (res.ok) {
        onUpdated();
        onClose();
      } else {
        if (res.status === 401) toast.error("شما وارد نشده‌اید");
        else if (res.status === 403) toast.error("دسترسی شما کافی نیست");
        else if (res.status === 404) toast.error("گزارش پیدا نشد");
        else toast.error(data?.message || "خطا در به‌روزرسانی گزارش");
      }
    } catch (err) {
      console.error(err);
      toast.error("خطا در ارتباط با سرور");
    } finally {
      setLoading(false);
    }
  };

  const isUnchanged = title === report.title && content === report.content;

  if (userLoading) return <p className="text-center mt-2">در حال بارگذاری...</p>;

  return (
    <>
      <Toaster position="top-right" />
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-2xl w-full max-w-md space-y-4 shadow-lg">
          <h3 className="text-lg font-semibold">ویرایش گزارش</h3>

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value.slice(0, 100))}
            placeholder="عنوان گزارش"
            className="w-full border p-2 rounded-md"
          />

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value.slice(0, 500))}
            rows={4}
            placeholder="محتوای گزارش"
            className="w-full border p-2 rounded-md"
          />

          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
            >
              بستن
            </button>
            <button
              disabled={loading || isUnchanged}
              onClick={handleSave}
              className={`px-4 py-2 rounded-md text-white ${
                loading || isUnchanged
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gray-700 hover:bg-gray-800"
              }`}
            >
              {loading ? "در حال ذخیره..." : "ذخیره"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
