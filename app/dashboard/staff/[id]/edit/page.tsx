'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { z } from 'zod';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

type Staff = { id: string; username: string; email?: string };

const staffSchema = z.object({
      username: z.string().min(3),
      password: z.string().min(6).optional(),
      email: z.string().email().optional(),
});

export default function EditStaffPage() {
      const params = useParams();
      const router = useRouter();
      const { id } = params as { id: string };

      const [username, setUsername] = useState('');
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [errors, setErrors] = useState<string[]>([]);

      // گرفتن اطلاعات کارمند برای پر کردن فرم
      const fetchStaff = async () => {
            const res = await fetch(`/api/admin/staff/${id}`);
            if (!res.ok) {
                  toast.error('خطا در دریافت اطلاعات کارمند');
                  return;
            }
            const data = await res.json();
            setUsername(data.username);
            setEmail(data.email || '');
      };

      useEffect(() => { fetchStaff(); }, [id]);

      const handleUpdate = async (e: React.FormEvent) => {
            e.preventDefault();
            setErrors([]);

            try {
                  const parsed = staffSchema.parse({ username, email, password: password || undefined });

                  const res = await fetch(`/api/admin/staff/${id}`, {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(parsed),
                  });

                  if (!res.ok) {
                        const errData = await res.json();
                        setErrors(errData.error ? (Array.isArray(errData.error) ? errData.error : [errData.error]) : ['خطا']);
                        return;
                  }

                  toast.success('کارمند ویرایش شد');
                  router.push('/dashboard/staff'); // برگشت به لیست بعد از ویرایش
            } catch (err: any) {
                  if (err instanceof z.ZodError) setErrors(err.errors.map(e => e.message));
                  else setErrors(['خطای ناشناخته']);
            }
      };

      return (
            <div className="p-6">
                  <h1 className="text-2xl font-bold mb-4">ویرایش کارمند</h1>

                  <form onSubmit={handleUpdate} className="flex flex-col gap-2 w-full ">
                        <input
                              placeholder="نام کاربری"
                              value={username}
                              onChange={e => setUsername(e.target.value)}
                              className="border border-gray-300 rounded p-2"
                        />
                        <input
                              placeholder="ایمیل (اختیاری)"
                              value={email}
                              onChange={e => setEmail(e.target.value)}
                              className="border border-gray-300 rounded p-2"
                        />
                        <input
                              placeholder="رمز عبور (در صورت تغییر)"
                              type="password"
                              value={password}
                              onChange={e => setPassword(e.target.value)}
                              className="border border-gray-300 rounded p-2"
                        />
                        <div className='flex items-center gap-6'>
                              <button type="submit" className="bg-gray-800 w-full text-white px-4 py-2 rounded mt-2">
                                    ذخیره تغییرات
                              </button>
                              <Link href="/dashboard/staff" type="submit" className="text-center bg-gray-800 w-full text-white px-4 py-2 rounded mt-2">
                                    برگشت به صفحه کارمندان
                              </Link>
                        </div>
                        {errors.length > 0 && (
                              <div className="text-red-500 mt-2">
                                    {errors.map((err, i) => <p key={i}>{err}</p>)}
                              </div>
                        )}
                  </form>
            </div>
      );
}
