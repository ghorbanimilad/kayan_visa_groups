"use client";

import React, { useState, useEffect } from "react";
import { z } from "zod";
import { toast } from "react-hot-toast";
import Link from "next/link";

type Staff = { id: string; username: string; email: string; createdAt: string };

const staffSchema = z.object({
      username: z.string().min(3),
      password: z.string().min(6),
      email: z.string().email().optional(),
});

export default function StaffPage() {
      const [staffList, setStaffList] = useState<Staff[]>([]);
      const [username, setUsername] = useState("");
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [errors, setErrors] = useState<string[]>([]);

      useEffect(() => { fetchStaff(); }, []);

      const fetchStaff = async () => {
            const res = await fetch("/api/admin/staff");
            const data = await res.json();
            setStaffList(data);
      };

      const handleAddStaff = async () => {
            setErrors([]);
            try {
                  const parsed = staffSchema.parse({ username, email, password });

                  const res = await fetch("/api/admin/staff", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(parsed),
                  });

                  if (!res.ok) {
                        const errData = await res.json();
                        setErrors(errData.error ? Array.isArray(errData.error) ? errData.error : [errData.error] : ["خطا"]);
                        return;
                  }

                  setUsername(""); setEmail(""); setPassword("");
                  fetchStaff();
                  toast.success("کارمند اضافه شد");
            } catch (err: any) {
                  if (err instanceof z.ZodError) setErrors(err.issues.map(e => e.message));

                  else setErrors(["خطای ناشناخته"]);
            }
      };
      // handleDelete و handleEdit اضافه می‌کنیم

      const handleDelete = async (id: string) => {
            if (!confirm("آیا مطمئن هستید که می‌خواهید این کارمند را حذف کنید؟")) return;
            try {
                  const res = await fetch(`/api/admin/staff/${id}`, { method: "DELETE" });
                  if (!res.ok) throw new Error("خطا در حذف");
                  toast.success("کارمند حذف شد");
                  fetchStaff();
            } catch (err) {
                  console.error(err);
                  toast.error("خطا در حذف کارمند");
            }
      };

      const handleEdit = async (staff: Staff) => {
            const newUsername = prompt("نام کاربری جدید:", staff.username);
            const newEmail = prompt("ایمیل جدید:", staff.email || "");
            const newPassword = prompt("رمز عبور جدید (در صورت تغییر):", "");

            if (!newUsername) return;

            try {
                  const res = await fetch(`/api/admin/staff/${staff.id}`, {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ username: newUsername, email: newEmail, password: newPassword || undefined }),
                  });
                  if (!res.ok) throw new Error("خطا در ویرایش");
                  toast.success("کارمند ویرایش شد");
                  fetchStaff();
            } catch (err) {
                  console.error(err);
                  toast.error("خطا در ویرایش کارمند");
            }
      };


      return (
            <div className="p-6 ">
                  <div className="flex flex-col mb-6">
                        <h1 className="text-2xl font-bold mb-4">مدیریت کارمندان</h1>

                        <div className="mb-6 flex flex-col gap-2 w-full ">
                              <input placeholder="نام کاربری" value={username} onChange={e => setUsername(e.target.value)} className="border border-gray-300 rounded p-2" />
                              <input placeholder="ایمیل (اختیاری)" value={email} onChange={e => setEmail(e.target.value)} className="border border-gray-300 rounded p-2" />
                              <input placeholder="رمز عبور" type="password" value={password} onChange={e => setPassword(e.target.value)} className="border border-gray-300 rounded p-2" />
                              <button onClick={handleAddStaff} className="bg-gray-800 text-white px-4 py-2 rounded mt-2">افزودن کارمند</button>

                              {errors.length > 0 && <div className="text-red-500 mt-2">{errors.map((err, i) => <p key={i}>{err}</p>)}</div>}
                        </div>
                  </div>
                  <div className="flex-col flex">
                        <p className="mb-1 text-sm font-semibold">لیست کارمندان</p>


                        <table className="w-full ">
                              <thead className="bg-gray-800 text-white">
                                    <tr>
                                          <th className=" p-2">نام کاربری</th>
                                          <th className=" p-2">ایمیل</th>
                                          <th className=" p-2">تاریخ ایجاد</th>
                                          <th className=" p-2">عملیات</th>
                                    </tr>
                              </thead>
                              <tbody>
                                    {staffList.map(s => (
                                          <tr key={s.id} className="border-b border-gray-400">
                                                <td className="p-2">{s.username}</td>
                                                <td className="p-2">{s.email}</td>
                                                <td className="p-2">{new Date(s.createdAt).toLocaleString()}</td>
                                                <td className="p-2 space-x-2 flex items-center">
                                                      <button onClick={() => handleDelete(s.id)} className="bg-red-200 text-red-500 px-2 py-1 rounded cursor-pointer">حذف</button>
                                                      <Link href={`/dashboard/staff/${s.id}/edit`} className="bg-blue-200 text-blue-500 px-2 py-1 rounded">ویرایش</Link>
                                                </td>
                                          </tr>
                                    ))}
                              </tbody>
                        </table>
                  </div>
            </div>
      );
}
