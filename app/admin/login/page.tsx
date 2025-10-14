"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
      const [username, setUsername] = useState("");
      const [password, setPassword] = useState("");
      const [showPassword, setShowPassword] = useState(false);
      const [remember, setRemember] = useState(false);
      const [error, setError] = useState("");
      const router = useRouter();

      const handleLogin = async (e: React.FormEvent) => {
            e.preventDefault();
            setError("");

            const res = await fetch("/api/admin/login", {

                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ username, password }),
            });

            const data = await res.json();

            if (res.ok) {
                  router.push("/dashboard"); // بعد از ورود موفق به داشبورد منتقل شود
            } else {
                  setError("نام کاربری یا رمز عبور اشتباه است!");
            }
      };

      return (

            <div className="flex flex-col justify-center items-center h-screen">
                  <div>
                        <img src="/logo.png" alt="" className="w-32 h-32 object-cover" />
                  </div>
                  {error && <p className="text-red-500">{error}</p>}
                  <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl text-center font-bold my-4">ورود به سیستم</h2>
                        <div>
                              <label htmlFor="username" className="block mb-1 text-gray-800">نام کاربری</label>
                              <input
                                    type="text"
                                    placeholder="نام کاربری"
                                    value={username}
                                    required
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full mb-3 p-2 mt-1  border border-gray-300 rounded"
                              />
                        </div>
                        <div className="relative w-full">
                              <label htmlFor="password" className="block mb-1 text-gray-800">رمز عبور</label>
                              <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="رمز عبور"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full mb-3 p-2 mt-1 border border-gray-300 rounded"
                              />
                              {/* آیکون چشم */}
                              <div
                                    className="absolute top-1/2 left-2 cursor-pointer text-gray-500"
                                    onClick={() => setShowPassword(!showPassword)}
                              >
                                    {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                              </div>
                        </div>
                        <div className="flex items-center mb-4">
                              <input
                                    id="remember"
                                    type="checkbox"
                                    checked={remember}
                                    onChange={() => setRemember(!remember)}
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-lg focus:ring-blue-500"
                              />
                              <label htmlFor="remember" className="mr-2 text-sm text-gray-700">
                                    مرا به خاطر بسپار
                              </label>
                        </div>

                        <button type="submit" className="w-full bg-gray-800 hover:bg-gray-900 cursor-pointer text-white p-2 rounded mb-4">
                              ورود
                        </button>

                        <Link href="/admin/forgot-password" className="text-sm text-gray-600 hover:underline ">
                              رمز عبور خودتان را فراموش کرده‌اید؟
                        </Link>
                  </form>

                  <Link href="/" className="mt-6 text-gray-600 text-sm tracking-tight">برگشت به صفحه ای اصلی سایت</Link>
            </div>

      );
}
