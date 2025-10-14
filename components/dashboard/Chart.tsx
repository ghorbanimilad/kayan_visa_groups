"use client"
import { Card, CardContent } from "@/components/ui/card"
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie,
  Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts"

// داده پرونده‌های باز و بسته
const casesData = [
  { month: "فروردین", open: 40, closed: 20 },
  { month: "اردیبهشت", open: 50, closed: 35 },
  { month: "خرداد", open: 60, closed: 45 },
  { month: "تیر", open: 70, closed: 55 },
  { month: "مرداد", open: 80, closed: 65 },
]

// داده کشور مقصد
const countryData = [
  { name: "کانادا", value: 40 },
  { name: "آلمان", value: 25 },
  { name: "استرالیا", value: 20 },
  { name: "انگلستان", value: 15 },
  { name: "هلند", value: 30 },
  { name: "فنلاند", value: 12 },
  { name: "ایتالیا", value: 48 },
]

// داده درصد موفقیت
const successData = [
  { month: "فروردین", success: 70 },
  { month: "اردیبهشت", success: 75 },
  { month: "خرداد", success: 80 },
  { month: "تیر", success: 85 },
  { month: "مرداد", success: 78 },
  { month: "شهریور", success: 82 },
]

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#c090fc", "#d42706", "#f472b6"]

export default function ImmigrationDashboard() {
  return (
    <div className="my-8">

      {/* کارت‌های آماری */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="shadow-md rounded-2xl bg-blue-100 border-blue-400">
          <CardContent className="p-6 ">
            <h2 className="text-lg font-semibold text-gray-700">پرونده‌های فعال</h2>
            <p className="flex items-center text-xl font-bold text-blue-600 mt-2"> 120 پرونده انجام شده</p>
          </CardContent>
        </Card>
        <Card className="shadow-md rounded-2xl bg-green-100 border-green-400">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-gray-700">پرونده‌های بسته شده</h2>
            <p className="text-xl font-bold text-green-600 mt-2">85 پرونده بسته شده</p>
          </CardContent>
        </Card>
        <Card className="shadow-md rounded-2xl bg-purple-100 border-purple-400">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-gray-700">درصد موفقیت</h2>
            <p className="text-xl font-bold text-purple-600 mt-2">78% پرونده موفق</p>
          </CardContent>
        </Card>
      </div>

      {/* چارت‌ها */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {/* چارت ستونی پرونده‌ها */}
        <Card className="shadow-lg rounded-2xl border-gray-400">
          <CardContent className="py-6 px-2">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">پرونده‌های باز و بسته شده</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={casesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="open" fill="#3b82f6" name="پرونده باز" />
                <Bar dataKey="closed" fill="#10b981" name="پرونده بسته" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* چارت دایره‌ای کشور مقصد */}
        <Card className="shadow-lg rounded-2xl border-gray-400">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">کشورهای مقصد مشتریان</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={countryData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  label
                >
                  {countryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      // جدا کردن هر بخش کمی از مرکز
                      cornerRadius={6}
                      stroke="#fff"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* چارت خطی درصد موفقیت */}
      <div className="mt-6 max-w-5xl mx-auto">
        <Card className="shadow-lg rounded-2xl border-gray-400">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">روند درصد موفقیت پرونده‌ها</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={successData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[60, 100]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="success" stroke="#8b5cf6" strokeWidth={3} name="درصد موفقیت" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 max-w-5xl mx-auto">
        <Card className="shadow-lg rounded-2xl border-gray-400">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">آمار کلی</h2>
            <p className="text-gray-600">تعداد کل پرونده‌ها: {casesData.length}</p>
            <p className="text-gray-600">تعداد پرونده‌های فعال: {casesData.length - successData.length}</p>
            <p className="text-gray-600">تعداد پرونده‌های بسته شده: {successData.length}</p>
          </CardContent>
        </Card>
      </div>

    </div>
  )
}
