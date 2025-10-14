"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronsLeft } from "lucide-react"

// دیکشنری ترجمه مسیرها به فارسی
const labels: Record<string, string> = {
      dashboard: "داشبورد",
      users: "کاربران",
      profile: "پروفایل",
      settings: "تنظیمات",
      reservation: "رزرو وقت مشاوره",
      contact: "تماس با ما",
      about: "درباره ما",
      canada: "کانادا",
      italia: "ایتالیا",
      germany: "آلمان",
      england: "انگلیس",
      portugal: "پرتقال",
      greece: "یونان",
      netherland: "هلند",
      france: "فرانسه",
      finland: "فنلاند",
      spain: "اسپانیا",
      shengen: "ویزای شینگن",
      studio: "استادیو ویزای استارت آپ",
      offers: "اولین قدم مهاجرت",

      "startup-visa": "ویزای استارت آپ",
      "study-visa": "ویزای تحصیلی",
      "immigration-residency": "مهاجرت و اقامت",
      "tourist-visa": "ویزای توریستی"
}



export default function Breadcrumb() {
      const pathname = usePathname()
      const segments = pathname.split("/").filter(Boolean)

      return (
            <nav className="flex items-center text-gray-700 text-sm">
                  <Link href="/" className="hover:underline">
                        خانه
                  </Link>

                  {segments.map((segment, index) => {
                        const href = "/" + segments.slice(0, index + 1).join("/")
                        const isLast = index === segments.length - 1

                        // اگر توی دیکشنری بود فارسی نشون بده، وگرنه همون اسم مسیر
                        const label = labels[segment] || decodeURIComponent(segment)

                        return (
                              <div key={index} className="flex items-center">
                                    <ChevronsLeft className="w-4 h-4 text-gray-400 me-1" />
                                    {isLast ? (
                                          <span className="text-gray-900 font-sm">{label}</span>
                                    ) : (
                                          <Link href={href} className="hover:underline">
                                                {label}
                                          </Link>
                                    )}
                              </div>
                        )
                  })}
            </nav>
      )
}
