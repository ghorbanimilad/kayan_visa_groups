"use client"
import { CalendarCheck2Icon, FileType2, HomeIcon, Menu, Settings, User, User2, UserCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'
import { RiDashboardFill } from "react-icons/ri";

interface AdminSidebarProps {
      isOpen: boolean;
      toggleSidebar: () => void;
}

export default function AdminSidebar({ isOpen, toggleSidebar }: AdminSidebarProps) {
      return (
            <div className='flex  min-h-screen'>
                  {/* سایدبار */}
                  <aside
                        className={`bg-gray-800 text-white transition-all duration-300 p-4 flex flex-col justify-between
  ${isOpen ? "w-64" : "w-16"}`}
                  >
                        {/* بالا (لوگو + منو) */}
                        <div>
                              <Link href="/dashboard">
                                    <div className="flex items-center justify-center gap-4">
                                          <Image
                                                src="/logo.png"
                                                alt="Logo"
                                                width={40}
                                                height={40}
                                                className="object-contain"
                                          />
                                          {isOpen && <h2 className="font-bold text-lg ml-2">پنل کاربری</h2>}
                                    </div>
                              </Link>

                              {isOpen && <hr className="my-4" />}

                              <div className="space-y-3 mt-8">
                                    <Link href="/" className="flex items-center gap-2 mb-6 hover:text-cyan-400">
                                          <HomeIcon className="w-5 h-5" />
                                          {isOpen && <span>صفحه اصلی</span>}
                                    </Link>
                                    <Link href="/dashboard" className="flex items-center gap-2 hover:text-cyan-400">
                                          <RiDashboardFill className="w-5 h-5" />
                                          {isOpen && <span>داشبورد</span>}
                                    </Link>
                                    <Link href="/dashboard/users" className="flex items-center gap-2 hover:text-cyan-400">
                                          <UserCircle className="w-5 h-5" />
                                          {isOpen && <span>کاربران</span>}
                                    </Link>
                                    <Link href="/dashboard/contents" className="flex items-center gap-2 hover:text-cyan-400">
                                          <FileType2 className="w-5 h-5" />
                                          {isOpen && <span>محتویات</span>}
                                    </Link>

                                    <Link href="/dashboard/reservations" className="flex items-center gap-2 hover:text-cyan-400">
                                          <CalendarCheck2Icon className="w-5 h-5" />
                                          {isOpen && <span>وقت های رزرو شده</span>}
                                    </Link>

                                    <Link href="/dashboard/settings" className="flex items-center gap-2 hover:text-cyan-400">
                                          <Settings className="w-5 h-5" />
                                          {isOpen && <span>تنظیمات</span>}
                                    </Link>
                              </div>
                        </div>


                        {/* پایین (عکس) */}
                        <div className="flex items-center justify-center gap-4 opacity-80">

                              {isOpen && (
                                    <Image
                                          src="/logo.png"
                                          alt="File"
                                          width={120}
                                          height={120}
                                          className="object-cover opacity-80"
                                    />
                              )}
                        </div>
                  </aside>


            </div >
      )
}
