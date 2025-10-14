"use client"

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const DOCUMENTS = [
  {
    id: 1,
    title: "پاسپورت معتبر",
    desc: "داشتن پاسپورت با حداقل ۶ ماه اعتبار برای تمامی مراحل مهاجرت الزامی است.",
    img: "/images/docs/pass-3.jpg",
  },
  {
    id: 2,
    title: "مدارک تحصیلی و ترجمه رسمی",
    desc: "مدارک تحصیلی خود را آماده کرده و ترجمه رسمی آنها را تهیه کنید.",
    img: "/images/docs/edcu.jpg",
  },
  {
    id: 3,
    title: "رزومه و سوابق کاری",
    desc: "رزومه خود را با توجه به استانداردهای بین‌المللی آماده کنید و سوابق کاری خود را مشخص نمایید.",
    img: "/images/docs/resum.jpg",
  },
  {
    id: 4,
    title: "مدرک زبان",
    desc: "آزمون‌های معتبر مانند IELTS یا TOEFL برای مهاجرت تحصیلی و کاری لازم است.",
    img: "/images/docs/ielts.jpg",
  },
  {
    id: 5,
    title: "نامه‌های پشتیبان و توصیه‌نامه‌ها",
    desc: "نامه‌های توصیه یا حمایت کاری و تحصیلی می‌تواند شانس پذیرش شما را افزایش دهد.",
    img: "/images/docs/letters.jpg",
  },
];

export default function DocumentsSection() {
  return (
    <section className="py-12 my-12 bg-gray-800 ">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <motion.h3
            initial={{ y: -10, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-sm text-red-400 font-semibold">📋 مدارک و آمادگی‌ها</motion.h3>
          <motion.h2
            initial={{ y: -10, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold text-white mt-2">موارد ضروری برای شروع مهاجرت</motion.h2>
          <motion.p
            initial={{ y: -10, opacity: 0 }}
            viewport={{ once: true }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-gray-300 mt-2 max-w-2xl mx-auto">آماده‌سازی مدارک قبل از اقدام، مسیر مهاجرت شما را سریع‌تر و ایمن‌تر می‌کند.</motion.p>
        </div>

        <div

          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DOCUMENTS.map((doc, idx) => (
            <motion.div
              key={doc.id}

              className="bg-gray-100 rounded-xl overflow-hidden shadow-lg hover:scale-[1.03] transform transition-all"
            >
              <motion.div
                initial={{ y: -10, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="relative w-full h-52">
                <Image src={doc.img} alt={doc.title} fill className="object-cover " />
              </motion.div>

              <motion.div
                initial={{ y: -10, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{doc.title}</h4>
                <p className="text-gray-800 text-sm text-justify">{doc.desc}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
