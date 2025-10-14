"use client"
import Image from 'next/image'
import React from 'react'
import {motion} from "framer-motion"

export default function LetterAccept() {
  return (
    <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="max-w-7xl mx-auto my-12 md:my-40 px-4">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_6fr] gap-6">
          <div className="flex flex-col justify-center ">
            <motion.span
            initial={{ opacity: 0, x: 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
             className="font-bold text-nowrap tracking-tighter text-center md:text-right text-xl text-gray-500 mb-6">
              هر مسیر، یک موفقیت!
            </motion.span>
          </div>

          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-6">
            <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="border rounded-xl shadow-lg shadow-gray-300 border-gray-400">
              <Image
                src="/images/n.jpg"
                width={300}
                height={300}
                className="object-cover rounded-t-xl"
                alt='موسسه مهاجرتی  ماکان'
              />
              <p className="p-4 text-gray-700 text-center">نامه پذیرش از دانشگاه ایتالیا</p>
            </motion.div>

            <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="border rounded-xl shadow-lg shadow-gray-300 border-gray-400">
              <Image
                src="/images/n.jpg"
                width={300}
                height={300}
                className="object-cover rounded-t-xl"
                alt='موسسه مهاجرتی  ماکان'
              />
              <p className="p-4 text-gray-700 text-center">نامه پذیرش از دانشگاه ایتالیا</p>
            </motion.div>

            <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="border rounded-xl shadow-lg shadow-gray-300 border-gray-400">
              <Image
                src="/images/n.jpg"
                width={300}
                height={300}
                className="object-cover rounded-t-xl"
                alt='موسسه مهاجرتی  ماکان'
              />
              <p className="p-4 text-gray-700 text-center">نامه پذیرش از دانشگاه ایتالیا</p>
            </motion.div>
          </div>
        </div>

      </motion.div>
  )
}
