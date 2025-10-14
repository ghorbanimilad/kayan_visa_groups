"use client"
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { motion } from "framer-motion"

import { GiTeamIdea } from 'react-icons/gi'
import { HiUserPlus } from "react-icons/hi2";
import { SiXdadevelopers } from "react-icons/si";
import { TiArrowLeftOutline } from "react-icons/ti";

const textLines = [
      "استارت‌آپ استودیوی کایان با پرورش ایده شما یا با خلق ایده جدید،",
      "تیم‌سازی حول ایده، بازارسنجی در کشورهای مقصد و توسعه محصول،",
      "شما را در مسیر ایجاد و توسعه کسب‌وکار استارت‌آپی در خارج از مرزهای ایران همراهی می‌کند."
];

export default function VisaStudio() {
      return (
            <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.7 }}
                  className='relative w-full  bg-gradient-to-br from-gray-900 to-gray-500 my-40 py-2'>



                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className='flex items-center flex-col justify-center px-6 py-12 md:py-0'>
                              <div className='space-y-6'>
                                    <motion.h1
                                          initial={{ opacity: 0, x: 50 }}
                                          whileInView={{ opacity: 1, x: 0 }}
                                          viewport={{ once: true }}
                                          transition={{ duration: 1, delay: 0.7 }}
                                          className='text-gray-100 text-xl font-bold tracking-tight text-center lg:text-right'>استادیو ویزای استارت آپ کایان</motion.h1>
                                    {textLines.map((line, index) => (
                                          <motion.p
                                                key={index}
                                                initial={{ opacity: 0, rotateX: -90, y: 50 }}
                                                whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1.5, delay: index * 0.3 }}
                                                className="text-white mb-3"
                                          >
                                                {line}
                                          </motion.p>
                                    ))}
                                    <motion.button
                                          initial={{ opacity: 0, y: 50 }}
                                          whileInView={{ opacity: 1, y: 0 }}
                                          viewport={{ once: true }}
                                          transition={{ duration: 1, delay: 0.7 }}
                                    >
                                          <Link href="/studio" className='inline-block text-center lg:text-right text-white text-sm tracking-tight mt-6  bg-gradient-to-br from-red-800 to-red-600 px-8 py-2 rounded-lg'>
                                                بیشتر بدانید
                                                <TiArrowLeftOutline className='bg-red-100 rounded-full p-1 w-6 h-6 mr-2 text-red-500 inline-block' />
                                          </Link>
                                    </motion.button>
                              </div>
                        </div>
                        <motion.div
                              initial={{ opacity: 0, x: -50 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: 0.7 }}
                              className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 mx-16 lg:mx-6">
                              {/* باکس ۱ */}
                              <div className="relative bg-gradient-to-b border-t-2 border-white from-gray-100/70 to-transparent  rounded-t-full overflow-hidden  flex flex-col">
                                    <div className="p-6  flex items-center flex-col justify-center">
                                          <GiTeamIdea className='text-gray-100 w-14 h-14' />
                                          <h3 className="text-lg font-bold text-gray-800 mt-5 text-center">خلق ایده  نوآروانه</h3>
                                          <p className="text-gray-100 mt-2 text-sm leading-relaxed text-center">
                                                ایجاد ایده های مبتکرانه ونو برای استارت آپ
                                          </p>
                                    </div>

                              </div>

                              {/* باکس ۲ */}
                              <div className="relative md:-mt-25 bg-gradient-to-b border-t-2 border-gray-800 from-gray-950 to-transparent rounded-t-full overflow-hidden flex flex-col">
                                    <div className="p-6  flex items-center flex-col justify-center ">
                                          <HiUserPlus className='text-gray-100 w-14 h-14' />
                                          <h3 className="text-lg font-bold text-gray-100 mt-5 text-center">تیم سازی</h3>
                                          <p className="text-gray-100 mt-2 text-sm leading-relaxed text-center">
                                                تشکیل یک تیم حرفه ای و با دانش
                                          </p>
                                    </div>

                              </div>

                              {/* باکس ۳ */}
                              <div className="relative bg-gradient-to-b border-t-2 border-white from-gray-100/70 to-transparent rounded-t-full overflow-hidden  flex flex-col">
                                    <div className="p-6 flex items-center flex-col justify-center ">
                                          <SiXdadevelopers className='text-gray-100 w-14 h-14' />
                                          <h3 className="text-lg font-bold text-gray-800 mt-5 text-center">توسعه محصول</h3>
                                          <p className="text-gray-100 mt-2 text-sm leading-relaxed text-center">
                                                کمک به راستای توسعه و اجرای پروژه
                                          </p>
                                    </div>

                              </div>
                        </motion.div>
                  </div>



            </motion.div>
      )
}
