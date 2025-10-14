"use client";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ResetPassword({ searchParams }: { searchParams: any }) {
  const token = searchParams.token;
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });

    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <div className="shadow p-6 bg-white mb-6 w-2xl">
        <h1 className="text-xl font-bold mb-4">تغییر رمز عبور</h1>
        <p className="text-sm text-gray-700 mb-4">یک رمز عبور جدید وارد کنید</p>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="رمز عبور جدید"
              className="border border-gray-300 p-2 rounded mb-4 w-full " // pr-10 برای فضای آیکون
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* آیکون چشم */}
            <div
              className="absolute top-1 left-2  cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
            </div>
          </div>

          <button
            type="submit"
            className="px-4 bg-gray-800 hover:bg-gray-900 cursor-pointer text-white p-2 rounded"
          >
            تغییر رمز
          </button>
        </form>
        {message && <p className="mt-4 text-green-600">{message}</p>}
      </div>
      <Link href="/admin/login" className="text-sm text-gray-700">برگشت به صفحه ورود</Link>
    </div>
  );
}
