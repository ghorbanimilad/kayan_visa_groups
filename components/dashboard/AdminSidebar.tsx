"use client"
import { BarChart2, CalendarCheck2Icon, CheckSquare, ClipboardCheck, FileType2, HomeIcon, MessageSquare, Settings, UserCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react'
import { RiDashboardFill, RiTeamFill } from "react-icons/ri";

interface AdminSidebarProps {
      isOpen: boolean;
      toggleSidebar: () => void;
}

type User = {
      username: string;
      role: string;
};

export default function AdminSidebar({ isOpen, toggleSidebar }: AdminSidebarProps) {
      const [user, setUser] = useState<User | null>(null);

      // گرفتن اطلاعات کاربر از API
      useEffect(() => {
            async function fetchUser() {
                  try {
                        const res = await fetch("/api/admin/me", { credentials: "include" });
                        if (!res.ok) throw new Error("خطا در گرفتن اطلاعات کاربر");
                        const data = await res.json();
                        setUser(data);
                  } catch (err) {
                        console.error(err);
                        setUser(null);
                  }
            }
            fetchUser();
      }, []);

      // لیست لینک‌ها بر اساس نقش کاربر
      const links = [
            { href: "/", label: "صفحه اصلی", icon: <HomeIcon className="w-5 h-5" />, roles: ["ADMIN", "EMPLOYEE"] },
            { href: "/dashboard", label: "داشبورد", icon: <RiDashboardFill className="w-5 h-5" />, roles: ["ADMIN", "EMPLOYEE"] },
            { href: "/dashboard/users", label: "کاربران", icon: <UserCircle className="w-5 h-5" />, roles: ["ADMIN", "EMPLOYEE"] },
            { href: "/dashboard/contents", label: "محتویات", icon: <FileType2 className="w-5 h-5" />, roles: ["ADMIN", "EMPLOYEE"] },
            { href: "/dashboard/reservations", label: "وقت های رزرو شده", icon: <CalendarCheck2Icon className="w-5 h-5" />, roles: ["ADMIN", "EMPLOYEE"] },
            { href: "/dashboard/customer-evaluations", label: "لیست ارزیابی مشتریان", icon: <ClipboardCheck className="w-5 h-5" />, roles: ["ADMIN", "EMPLOYEE"] },
            { href: "/dashboard/work-reports", label: "گزارش کار", icon: <BarChart2 className="w-5 h-5" />, roles: ["ADMIN","EMPLOYEE"] },
            { href: "/dashboard/staff", label: "کارمندان", icon: <RiTeamFill className="w-5 h-5" />, roles: ["ADMIN"] },
            { href: "/dashboard/settings", label: "تنظیمات", icon: <Settings className="w-5 h-5" />, roles: ["ADMIN","EMPLOYEE"] },
      ];

      return (
            <div className='flex  min-h-screen'>
                  <aside className={`bg-gray-800 text-white transition-all duration-300 p-4 flex flex-col justify-between ${isOpen ? "w-64" : "w-16"}`}>
                        <div>
                              {/* بالا (لوگو + منو) */}
                              <Link href="/dashboard">
                                    <div className="flex items-center justify-center gap-4">
                                          <Image
                                                src="/logo4.png"
                                                alt="Logo"
                                                width={60}
                                                height={60}
                                                className="object-contain"
                                          />
                                          {isOpen && <h2 className="font-bold text-lg ml-2">پنل کاربری</h2>}
                                    </div>
                              </Link>

                              {isOpen && <hr className="my-4" />}

                              {/* نمایش نام کاربر */}
                              {isOpen && user && (
                                    <p className="text-sm font-bold mb-4">
                                          کاربر: {user.username} ({user.role})
                                    </p>
                              )}

                              <div className="space-y-3 mt-8">
                                    {user
                                          ? links
                                                .filter(link => link.roles.includes(user.role))
                                                .map((link, idx) => (
                                                      <Link key={idx} href={link.href} className="flex items-center gap-2 hover:text-cyan-400">
                                                            {link.icon}
                                                            {isOpen && <span>{link.label}</span>}
                                                      </Link>
                                                ))
                                          : null // ⚡ قبل از دریافت نقش کاربر، لینک‌ها رندر نمی‌شوند
                                    }
                              </div>
                        </div>

                        {/* پایین (عکس) */}
                        <div className="flex items-center justify-center gap-4 opacity-80">
                              {isOpen && (
                                    <Image
                                          src="/logo4.png"
                                          alt="File"
                                          width={140}
                                          height={140}
                                          className="object-cover opacity-80"
                                    />
                              )}
                        </div>
                  </aside>
            </div >
      );
}
