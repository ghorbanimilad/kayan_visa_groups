"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const cardVariants = {
  initial: { y: 0 },
  hover: { y: -10 },
}

const imageVariants = {
  initial: { rotate: 0 },
  hover: { rotate: 360 },
}

export default function CountryGrid() {
const countries = [
  { name: "فنلاند", flag: "https://flagcdn.com/w80/fi.png", description: "مهاجرت تحصیلی و کاری به فنلاند" },
  { name: "کانادا", flag: "https://flagcdn.com/w80/ca.png", description: "مهاجرت کاری و استارتاپ در کانادا" },
  { name: "عمان", flag: "https://flagcdn.com/w80/om.png", description: "ویزای کاری و سرمایه‌گذاری عمان" },
  { name: "انگلیس", flag: "https://flagcdn.com/w80/gb.png", description: "مهاجرت تحصیلی و کاری به انگلیس" },
  { name: "هلند", flag: "https://flagcdn.com/w80/nl.png", description: "ویزای کاری و استارتاپ هلند" },
  { name: "پرتقال", flag: "https://flagcdn.com/w80/pt.png", description: "مهاجرت سرمایه‌گذاری و کاری پرتغال" },
];


  return (
    <div className="flex flex-col w-full min-h-[350px] items-center text-center justify-center my-32 px-6 mx-auto">
      <div className="mb-8 text-lg font-semibold">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-md text-red-500 mb-2"
        >
          مشاوره تخصصی مهاجرت
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, y: 50, rotateY: -15 }}
          whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4 }}
          className="text-4xl mb-6 text-gray-800"
        >
          انجام مشاوره تخصصی در زمینه مهاجرت به
        </motion.h2>
      </div>

      <div className="grid gap-6 w-full  px-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {countries.map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            transition={{ duration: 0.4}}
            className="flex items-center  bg-white rounded-xl shadow-xl py-10 px-4"
          >
            
            {/* عکس */}
            <Image
              src={c.flag}
              alt={c.name}
              className="w-16 h-16 rounded-full mr-4"
              width={64}
              height={64}
            />

            {/* متن‌ها زیر هم */}
            <div className="flex flex-col">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-md font-medium mr-6 text-right mb-4"
              >
                {c.name}
              </motion.span>

              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 + 0.2 }}
                className="text-sm text-gray-500 mr-6"
              >
                {c.description}
              </motion.span>

              
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  )
}
