import ImmigrationDashboard from '@/components/dashboard/Chart'
import { ChartBar } from 'lucide-react'
import React from 'react'
import { MdDashboardCustomize } from 'react-icons/md'

export default function DashboardPage() {
  return (
    <div >
      <div className='flex items-center gap-2'>
        <MdDashboardCustomize className='w-5 h-5 text-yellow-600' />
        <h1 className="text-2xl font-bold">داشبورد مدیریت</h1>
      </div>
      <hr className='border-gray-300 my-4' />

      <ImmigrationDashboard />

      
    </div>
  )
}
