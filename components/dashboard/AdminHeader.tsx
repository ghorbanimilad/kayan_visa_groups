import { Menu } from 'lucide-react';
import { useRouter } from 'next/navigation';

import React from 'react'
import { BiLogOut } from 'react-icons/bi';
interface AdminHeaderProps {
      toggleSidebar: () => void;
}
export default function AdminHeader({ toggleSidebar }: AdminHeaderProps) {
      const router = useRouter();

      const handleLogout = async () => {
            await fetch('/api/admin/logout', {
                  method: 'POST',
                  
            });
            router.push('/admin/login');
      }
      return (
            <div className='flex-1 w-full'>
                  <header className="flex items-center justify-between gap-8 bg-gray-800 shadow p-4 mb-6  border-r border-gray-500">
                        <div className='flex justify-start'>
                              <button
                                    className='text-white cursor-pointer'
                                    onClick={toggleSidebar}>
                                    <Menu size={16} />
                              </button>
                              <h1 className="text-lg mx-4 tracking-tight text-white font-bold">داشبورد مدیریت</h1>
                        </div>

                        <button type='submit' 
                        onClick={handleLogout}
                        className="text-white flex items-center gap-2 hover:text-cyan-400 cursor-pointer">
                              خروج
                              <BiLogOut />
                        </button>

                  </header>

            </div>
      )
}
