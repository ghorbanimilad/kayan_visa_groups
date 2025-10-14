"use client"
import React from 'react'
import { BsArrowLeft } from 'react-icons/bs'
import { FaHandshake } from 'react-icons/fa'
import { LiaHeadsetSolid } from 'react-icons/lia'
import { TbHistoryToggle } from 'react-icons/tb'
import Image from 'next/image'
import Link from 'next/link'
import Breadcrumb from '@/components/Beadcrunmb'
import { motion, useScroll, useTransform } from "framer-motion"

export default function AboutContent() {
      const { scrollY } = useScroll()

      // پارالکس تصویر: حرکت سریع‌تر
      const imageY = useTransform(scrollY, [0, 300], [0, -50])

      // پارالکس متن: حرکت کندتر برای حس عمق
      const textY = useTransform(scrollY, [0, 300], [0, -20])
      // Scale متن هنگام اسکرول (بزرگتر می‌شود)
      const textScale = useTransform(scrollY, [0, 300], [1, 1.05])
      // Rotate متن هنگام اسکرول (کمی می‌چرخد)
      const textRotate = useTransform(scrollY, [0, 300], [0, 1.5]) // درجه
      return (
            <div className='min-h-screen container mx-auto '>
                  {/* breadcumb */}
                  <div className='mt-4'>
                        <Breadcrumb />
                        <hr className='border-gray-300 my-4' />
                  </div>

                  <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative w-full h-[500px] md:h-[600px] my-6 overflow-hidden">
                        {/* تصویر پس‌زمینه با پارالکس */}
                        <motion.div style={{ y: imageY }} className="absolute inset-0">
                              <Image
                                    src="/images/office.jpg"
                                    alt="درباره ما موسسه مهاجرتی راکون"
                                    fill
                                    className="object-cover object-top md:rounded-lg shadow-md"
                              />
                              <div className="absolute inset-0 bg-black/40 md:rounded-lg"></div>
                        </motion.div>

                        {/* متن روی تصویر با پارالکس، Scale و Rotate */}
                        <motion.div
                              style={{ y: textY, scale: textScale, rotate: textRotate }}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.8, delay: 0.3 }}
                              className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 md:px-0"
                        >
                              <h1 className="text-white text-3xl md:text-5xl font-bold mb-4">
                                    درباره موسسه ماکان
                              </h1>
                              <p className="text-white text-sm md:text-lg max-w-2xl">
                                    ارائه خدمات مشاوره و حمایت کامل از متقاضیان مهاجرت به کشورهای مختلف با بیش از 16 سال تجربه
                              </p>
                        </motion.div>
                  </motion.div>


                  <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className='fade-up-scroll mt-12 max-w-6xl md:mx-auto mx-6 shadow-md p-4 rounded-lg'>
                        <h1 className='font-bold text-center md:text-right text-gray-800 text-xl'>درباره موسسه مهاجرتی  <span className='text-red-500'>(ماکان)</span>  </h1>
                        <p className='text-gray-700 text-sm md:text-md mt-4 leading-loose'>موسسه مهاجرتی ماکان با هدف ارائه خدمات مشاوره و حمایت از متقاضیان مهاجرت به کشورهای مختلف تأسیس شده است. تیم ما متشکل از وکلای مجرب و مشاوران حرفه‌ای در زمینه مهاجرت است که با دانش و تجربه خود، بهترین راهکارها را برای مشتریان خود ارائه می‌دهند. موسسه ما به عنوان یک پل ارتباطی بین متقاضیان و کشورهای مقصد عمل می‌کند و سعی در تسهیل فرآیند مهاجرت دارد. موسسه ماکان با بیش از 16 سال تجربه در این زمینه، آماده است تا به شما در تحقق اهداف مهاجرتی‌تان کمک کند.</p>
                  </motion.div>

                  <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="my-20 max-w-6xl mx-auto ">
                        <h2 className="font-bold text-gray-800 text-xl text-center mb-20">
                              چرا موسسه ماکان..؟
                        </h2>


                        {/* سه باکس */}
                        <motion.div
                              initial={{ opacity: 0, y: 50 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.5, delay: 0.4 }}
                              className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 mx-16 lg:mx-6">
                              {/* باکس ۱ */}
                              <div className="relative bg-gradient-to-b border-t-2 border-cyan-700 from-gray-100/70 to-transparent  rounded-t-full overflow-hidden  flex flex-col">
                                    <div className="p-6  flex items-center flex-col justify-center">
                                          <TbHistoryToggle className='text-blue-900 w-14 h-14' />
                                          <h3 className="text-lg font-bold text-gray-800 text-center">تجربه حرفه ای</h3>
                                          <p className="text-gray-600 mt-2 text-sm leading-relaxed text-center">
                                                سال‌ها تجربه در پرونده‌های موفق مهاجرتی.

                                          </p>
                                    </div>

                              </div>

                              {/* باکس ۲ */}
                              <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.4 }}
                                    className="relative md:-mt-10 bg-gradient-to-b border-t-2 border-cyan-700 from-gray-100/70 to-transparent rounded-t-full overflow-hidden flex flex-col">
                                    <div className="p-6  flex items-center flex-col justify-center ">
                                          <LiaHeadsetSolid className='text-blue-900 w-14 h-14' />
                                          <h3 className="text-lg font-bold text-gray-800 text-center">مشاوران حرفه‌ای</h3>
                                          <p className="text-gray-600 mt-2 text-sm leading-relaxed text-center">
                                                تیمی از وکلا و مشاوران متخصص برای همراهی شما.
                                          </p>
                                    </div>

                              </motion.div>

                              {/* باکس ۳ */}
                              <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.4 }}
                                    className="relative bg-gradient-to-b border-t-2 border-cyan-700 from-gray-100/70 to-transparent rounded-t-full overflow-hidden  flex flex-col">
                                    <div className="p-6 flex items-center flex-col justify-center ">
                                          <FaHandshake className='text-blue-900 w-14 h-14' />
                                          <h3 className="text-lg font-bold text-gray-800 text-center">خدمات جامع</h3>
                                          <p className="text-gray-600 mt-2 text-sm leading-relaxed text-center">
                                                پشتیبانی کامل از مشاوره تا اخذ ویزا.
                                          </p>
                                    </div>

                              </motion.div>
                        </motion.div>
                  </motion.div>


                  <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className='bg-gradient-to-br h-36 my-8 mx-2 from-gray-800 to-gray-600 p-4 rounded-lg shadow-md'>
                        <div className='relative grid grid-cols-1 lg:grid-cols-2 gap-6'>
                              <div className='m-2 space-y-4'>
                                    <p className='text-md md:text-2xl tracking-tight text-gray-100 '>رویایت را زندگی کن، ما همراهت هستیم</p>
                                    <Link
                                          href="/reservation"
                                          className="group relative flex items-center text-sm md:text-lg tracking-wide text-gray-200 hover:text-red-300 transition-colors duration-300"
                                    >
                                          <span className="relative">
                                                رزرو وقت مشاوره
                                                {/* خط انیمیشنی */}
                                                <span className="absolute left-1/2 -bottom-1 h-[2px] w-0 bg-red-300 transition-all duration-300 ease-out group-hover:w-full group-hover:left-0"></span>
                                          </span>

                                          <BsArrowLeft className="mr-2" />
                                    </Link>

                                    <motion.div
                                          initial={{ opacity: 0, y: 50 }}
                                          whileInView={{ opacity: 1, y: 0 }}
                                          viewport={{ once: true }}
                                          transition={{ duration: 0.5, delay: 0.4 }}
                                          className='absolute top-14 md:top-0 left-0 md:left-2 w-72 z-20 h-14 md:w-96 md:h-24 bg-green-200 rotate-12 opacity-95'>
                                          <h2 className='text-center flex items-center justify-center h-full text-sm md:text-md'>در جریان مهاجرت همراه همیشگی شما هستیم.</h2>
                                    </motion.div>
                                    <div className='absolute top-14 md:top-0 left-0 md:left-8 w-40 z-10 h-14 md:w-64 md:h-24 bg-blue-400 -rotate-4 opacity-95 float2'></div>

                              </div>

                        </div>

                  </motion.div>

                  <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className='mt-12 max-w-6xl md:mx-auto mx-6 my-10 shadow-md p-4 rounded-lg'>
                        <h2 className='font-bold text-gray-800 text-xl text-center'>مجوز ها</h2>
                        <p className='text-gray-700 text-sm md:text-md mt-4 leading-loose'>موسسه مهاجرتی ماکان با بیش از 16 سال تجربه در زمینه مهاجرت، به عنوان یکی از معتبرترین موسسات در این حوزه شناخته می‌شود. ما با ارائه خدمات مشاوره‌ای دقیق و به‌روز، به شما کمک می‌کنیم تا بهترین تصمیمات را در مسیر مهاجرت خود اتخاذ کنید. تیم ما متشکل از وکلای مجرب و مشاوران حرفه‌ای است که با دانش و تجربه خود، شما را در تمامی مراحل مهاجرت همراهی می‌کنند.</p>
                  </motion.div>

            </div>
      )
}
