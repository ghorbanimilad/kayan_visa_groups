"use client";

import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

interface CurrentUser {
  username: string;
  email: string;
  role: "ADMIN" | "EMPLOYEE";
}

interface ReportFormProps {
  onAdded?: () => void;
}

export default function ReportForm({ onAdded }: ReportFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [employeeId, setEmployeeId] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/admin/me", { credentials: "include" });
        const data = await res.json();
        setCurrentUser(data);

        if (data.role === "EMPLOYEE") {
          setEmployeeId(data.email);
        }
      } catch (err) {
        toast.error("خطا در گرفتن اطلاعات کاربر");
        console.error(err);
      }
    };
    fetchUser();
  }, []);

  if (!currentUser) return <p>در حال بارگذاری اطلاعات کاربر...</p>;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!title.trim() || !content.trim()) {
      toast.error("❌ لطفا همه فیلدها را پر کنید");
      setLoading(false);
      return;
    }

    try {
      const payload = { title, content, employeeId };

      const res = await fetch("/api/workReports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      const data = await res.json().catch(() => ({ message: "پاسخ سرور نامعتبر بود" }));

      if (!res.ok) throw new Error(data?.message || "خطا در ارسال گزارش");
      if (onAdded) onAdded();
      toast.success("✅ گزارش با موفقیت ثبت شد");
      setTitle("");
      setContent("");
    } catch (err: any) {
      toast.error("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      {/* کامپوننت Toaster را یک بار در روت اپ یا اینجا اضافه کنید */}
      <Toaster position="top-right" reverseOrder={false} />

      <form
        onSubmit={handleSubmit}
        className="p-6 bg-white shadow rounded-2xl space-y-4 w-full max-w-xl mx-auto"
      >
        <h2 className="text-xl font-semibold text-gray-800">ثبت گزارش کاری</h2>
        <div className="flex gap-4">
          {currentUser.role === "EMPLOYEE" && (

            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">شناسه کارمند</label>
              <input
                type="email"
                value={employeeId}
                readOnly
                tabIndex={-1}
                className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
              />
            </div>
          )}

          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">عنوان</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded-md border-gray-300"
              placeholder="مثلاً پیگیری پرونده ..."
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">توضیحات</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="توضیحات کامل فعالیت انجام‌شده ..."
          />
        </div>

        <button
          disabled={loading}
          type="submit"
          className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700 transition"
        >
          {loading ? "در حال ارسال..." : "ارسال گزارش"}
        </button>
      </form>
    </div>
  );
}
