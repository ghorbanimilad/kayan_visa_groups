"use client"
import React from 'react'
import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarClock } from "lucide-react";
import Image from 'next/image';

export default function HeroSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative w-full min-h-screen bg-[url('/images/black.jpg')] bg-cover bg-center flex items-end"
    >
      {/* Overlay برای خوانایی بهتر متن */}
      <div className="absolute inset-0 bg-black/40 z-0"></div>

      <div className="relative z-10 w-full px-6  flex flex-col lg:flex-row justify-between items-end gap-8 max-w-[1400px] mx-auto">
        {/* Left Column */}
        <div className="flex flex-col items-center py-8 lg:items-start text-center lg:text-right w-full lg:w-1/2">
          <motion.h1
            className="text-lg md:text-xl font-bold tracking-tight text-white mb-4 md:mb-6"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            خوش آمدید به موسسه مهاجرتی کایان
          </motion.h1>

          <motion.h2
            className="text-3xl md:text-6xl font-extrabold leading-snug text-white mb-4 md:mb-6"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            ما <span className="px-4 py-1 rounded z-0" style={{ backgroundColor: "rgba(255, 10, 50, 0.50)" }}>
              مسیر مهاجرت
            </span> برای شما آسان میکنیم
          </motion.h2>

          <motion.p
            className="text-md text-white my-4 leading-7 text-justify max-w-md md:max-w-lg"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            موسسه مهاجرتی کایان با بیش از 15 سال سابقه در زمینه مهاجرت به روش های مختلف و به چندین کشور و با چند شعبه فعال در ایران و خارج آماده ارائه خدمات به شماست. ما مشاوره مهاجرتی تخصصی‌ و خدمات مهاجرتی را با بهترین هزینه ها به شما ارائه می‌دهیم.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="relative group mt-4 overflow-hidden"
          >
            <Link href="/reservation" className="relative bg-gradient-to-br from-rose-800 to-rose-600 px-6 py-2 rounded-lg flex items-center text-white font-medium overflow-hidden">
              رزرو وقت مشاوره
              <CalendarClock className="mr-2 h-4 w-4" />
            </Link>
            <span className="absolute top-0 left-[-75%] w-1/2 h-full bg-gradient-to-r from-white/40 via-white/10 to-white/0 transform -skew-x-12 transition-all duration-500 group-hover:left-[125%]"></span>
          </motion.div>
        </div>

        {/* Right Column */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="w-full lg:w-1/2 flex justify-center  lg:justify-end items-end"
        >
          <div className="w-full max-w-[400px] sm:max-w-[600px] md:max-w-[800px]">
            <Image
              src="/images/eduction(1).png"
              width={800}
              height={1200}
              className="w-full h-auto object-contain rounded-lg shadow-2xl"
              alt="Students"
              priority
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
