"use client";
import React, { useState } from "react";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <div className="shadow p-6 bg-white mb-6">
        <h1 className="text-xl font-bold mb-4">فراموشی رمز عبور</h1>
        <p className="mb-4">
          لطفا آدرس ایمیل خود را وارد کنید تا لینک بازنشانی رمز عبور برای شما
          ارسال شود.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="ایمیل"
            className="border border-gray-300 p-2 rounded mb-4 w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="px-4 bg-gray-800 hover:bg-gray-900 cursor-pointer text-white p-2 rounded"
          >
            ارسال لینک بازنشانی
          </button>
        </form>

        {message && <p className="mt-4 text-green-600">{message}</p>}
      </div>
    </div>
  );
}
