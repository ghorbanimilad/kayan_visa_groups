"use client"
import React from "react"
import { motion } from "framer-motion"
import { FaRegComments } from "react-icons/fa"
import { LuChartNoAxesCombined } from "react-icons/lu"
import { MdBusinessCenter } from "react-icons/md"
import { GiPassport } from "react-icons/gi"
import { PiStudentBold } from "react-icons/pi"

export default function ServicesSection() {
  const containerVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.4, // فاصله بین انیمیشن هر کارت
        delayChildren: 0.3,   // شروع اولیه
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
    
  }

  const services = [
    {
      icon: <FaRegComments className="w-12 h-12 text-gray-600 mb-6" />,
      title: "مشاوره مهاجرتی",
      desc: "ارزیابی شما و انتخاب بهترین روش برای مهاجرت شما",
    },
    {
      icon: <LuChartNoAxesCombined className="w-12 h-12 text-gray-600 mb-6" />,
      title: "سرمایه‌گذاری در خارج",
      desc: "مشاوره تخصصی در زمینه مهاجرت",
    },
    {
      icon: <MdBusinessCenter className="w-12 h-12 text-gray-600 mb-6" />,
      title: "ویزای کار در خارج",
      desc: "دریافت ویزای کار در شرکت‌های معتبر",
    },
    {
      icon: <GiPassport className="w-12 h-12 text-gray-600 mb-6" />,
      title: "دریافت ویزا",
      desc: "تکمیل مدارک و اقدام برای دریافت ویزا در کوتاه‌ترین زمان",
    },
    {
      icon: <PiStudentBold className="w-12 h-12 text-gray-600 mb-6" />,
      title: "ویزای تحصیلی",
      desc: "دریافت پذیرش از دانشگاه‌های معتبر و رنک بالای جهان",
    },
  ]

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={containerVariants}
      className="flex flex-col  min-h-screen mx-4 space-y-6 items-center justify-center"
    >
      <h1 className="text-lg font-bold tracking-tight text-red-500 mb-2">
        خدمات موسسه کایان
      </h1>

      <h2 className="text-4xl font-bold tracking-tight text-gray-800 mb-10">
            خدمات ویزا، شهروندی و مهاجرت ما را بررسی کنید
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {services.map((service, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="flex items-center space-y-2 justify-center flex-col min-w-40 md:max-w-48 min-h-60 border border-gray-400 p-4 rounded-lg text-center hover:border-2 hover:scale-105 transition-all duration-300 hover:border-red-300 hover:shadow-xl"
          >
            {service.icon}
            <h3 className="text-md font-semibold text-gray-800">{service.title}</h3>
            <p className="text-sm text-gray-600">{service.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
