"use client"
import { Send } from 'lucide-react';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

export default function ContactForm() {

      const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("در حال ارسال...");
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error ? JSON.stringify(data.error) : "خطا در ارسال پیام");
      } else {
        toast.success("پیام با موفقیت ارسال شد");
        setFormData({ name: "", phone: "", email: "", message: "" });
      }

    } catch (error) {
      toast.error("خطا در ارسال پیام");
    } finally {
      setLoading(false);
    }

  };
  return (
    <div>
      <h2 className='mb-3 text-xl font-bold text-gray-800 tracking-tighter'>فرم تماس با ما</h2>
      <form onSubmit={handleSubmit} className='space-y-4'>

        <input
          type="text"
          name='name'
          value={formData.name}
          onChange={handleChange}
          required
          className='w-full border text-sm border-gray-300 focus:outline-none focus:border-red-700 focus:border-2 px-3 py-2 rounded-lg'
          placeholder='نام و نام خانوادگی' />
        <input
          type="text"
          name='phone'
          value={formData.phone}
          onChange={handleChange}
          maxLength={11}
          required
          className='w-full border text-sm border-gray-300 focus:outline-none focus:border-red-700 focus:border-2 px-3 py-2 rounded-lg'
          placeholder='شماره موبایل' />
        <input
          type="email"
          name='email'
          value={formData.email}
          onChange={handleChange}
          required
          className='w-full border text-sm border-gray-300 focus:outline-none focus:border-red-700 focus:border-2 px-3 py-2 rounded-lg'
          placeholder='ایمیل' />
        <textarea
          rows={6}
          name='message'
          value={formData.message}
          onChange={handleChange}
          required
          className='w-full border text-sm border-gray-300 focus:outline-none focus:border-red-700 focus:border-2 px-3 py-2 rounded-lg'
          placeholder='پیام' />

        <button
          type="submit"
          disabled={loading}
          className={`flex items-center justify-center w-full py-3 rounded-lg text-white transition ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-br from-red-800 to-red-600 hover:bg-gradient-to-tl"
            }`}
        >
          {loading ? "در حال ارسال..." : "ارسال پیام"}
          <Send className='w-4 h-4 mr-2' />
        </button>

      </form>

    </div>
  )
}
