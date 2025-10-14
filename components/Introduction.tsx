"use client"
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { TbCircleDashedNumber1, TbCircleDashedNumber2, TbCircleDashedNumber3, TbCircleDashedNumber4, TbCircleDashedNumber5, TbCircleDashedNumber6 } from 'react-icons/tb'
import { motion } from "framer-motion"
import Image from 'next/image'


export default function Introduction() {
  return (
    <div className='flex items-center justify-center my-24'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='space-y-6 px-6 my-auto flex flex-col items-center md:items-start  justify-center'>
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className='font-bold text-lg mb-3 text-red-500 text-center md:text-right'>روند مهاجرت موسسه کایان</motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className='font-bold text-4xl text-gray-800 text-center md:text-right'>  شرایط و مزایای کلیدی آغاز مسیر مهاجرت</motion.h2>
          <motion.p
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className='text-gray-600 text-md leading-8 text-center md:text-right mb-8 '>
            هر آغاز تازه، فرصتی است برای نوشتن داستانی متفاوت و الهام‌بخش در زندگی. در کایان باور داریم که مهاجرت تنها تغییر مکان نیست؛ بلکه پلی است به سوی فرصت‌های جدید، رشد شخصی و آینده‌ای روشن‌تر. ما در کنار شما هستیم تا بهترین مسیر متناسب با شرایط و آرزوهایتان را انتخاب کنید، موانع را پشت سر بگذارید و قدم به دنیایی بگذارید که پر از امکان‌ها و تجربیات ارزشمند است. با کایان، سفر شما به سوی موفقیت و آینده‌ای پرثمر، ساده‌تر و مطمئن‌تر خواهد بود.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            <div className='flex items-center relative'>
              <Link href="/offers" className=' inline-block text-center mb-12 text-white  bg-gradient-to-br from-red-800 to-red-600 px-6 py-2 rounded-lg shadow-md hover:shadow-xl transition-all'>
                اولین قدم برای مهاجرت
                <ArrowLeft className='mr-1 inline-block' />

              </Link>

              <motion.div
                
                animate={{ x: [0, -4, 0, 3, 0] }}
                transition={{ duration: 4, repeat: Infinity, repeatType: "loop" }}
                className="absolute top-0 -left-18"
              >
                <Image
                  src="/images/flesh.png"
                  alt="تجربه ما"
                  width={60}
                  height={60}
                  className="object-cover"
                />
              </motion.div>

            </div>
          </motion.button>
        </div>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.7 }}
          className='grid grid-cols-2 gap-6 mx-4'>
          <div className='relative group border hover:text-yellow-200 transition-all bg-gradient-to-br from-gray-800 to-gray-600  text-white border-gray-400 text-center space-y-2 px-3 py-4 rounded-2xl overflow-hidden'>
            <TbCircleDashedNumber1 className='inline-block w-12 h-12 ' />

            <h2 className=''>بررسی شرایط و انتخاب مسیر </h2>
            <span className="shine-effect"></span>
          </div>
          <div className='relative group border hover:text-red-300 transition-all bg-gradient-to-br from-gray-800 to-gray-600  text-white border-gray-400 text-center space-y-2 px-3 py-4 rounded-2xl overflow-hidden'>
            <TbCircleDashedNumber2 className='inline-block w-12 h-12 ' />
            <h2> آماده‌سازی مدارک </h2>
            <span className="shine-effect"></span>
          </div>
          <div className='relative group border hover:text-yellow-200 transition-all bg-gradient-to-br  from-gray-800 to-gray-600  text-white border-gray-400 text-center space-y-2 px-2 py-3 rounded-2xl overflow-hidden'>
            <TbCircleDashedNumber3 className='inline-block w-12 h-12 ' />
            <h2>اقدام برای ویزا یا اقامت</h2>
            <span className="shine-effect"></span>
          </div>
          <div className='relative group border hover:text-red-300 transition-all bg-gradient-to-br  from-gray-800 to-gray-600  text-white border-gray-400 text-center space-y-2 px-2 py-3 rounded-2xl overflow-hidden'>
            <TbCircleDashedNumber4 className='inline-block w-12 h-12 ' />
            <h2>انتظار و پیگیری پرونده</h2>
            <span className="shine-effect"></span>
          </div>
          <div className='relative group border hover:text-yellow-200 transition-all bg-gradient-to-br from-gray-800 to-gray-600  text-white border-gray-400 text-center space-y-2 px-3 py-4 rounded-2xl overflow-hidden'>
            <TbCircleDashedNumber5 className='inline-block w-12 h-12 ' />
            <h2>آماده‌سازی برای سفر</h2>
            <span className="shine-effect"></span>
          </div>

          <div className="relative group border hover:text-red-300 transition-all bg-gradient-to-br from-gray-800 to-gray-600 text-white border-gray-400 text-center space-y-2 px-3 py-4 rounded-2xl overflow-hidden">
            {/* آیکون */}
            <TbCircleDashedNumber6 className="inline-block w-12 h-12" />
            {/* عنوان */}
            <h2>ورود و استقرار</h2>
            {/* افکت نور روی کارت */}
            <span className="shine-effect"></span>
          </div>




        </motion.div>


      </div>
    </div>
  )
}


