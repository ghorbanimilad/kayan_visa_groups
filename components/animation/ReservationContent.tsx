"use client"
import Breadcrumb from '@/components/Beadcrunmb'
import { Send } from 'lucide-react'

import Head from 'next/head'
import Image from 'next/image'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { motion } from "framer-motion"


export default function ReservationContent() {
      const [loading, setLoading] = useState(false)
      const [form, setForm] = useState({
            fullName: "",
            email: "",
            phone: "",
            visaType: "student",
      });
      const [message, setMessage] = useState("");
      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            setForm({ ...form, [e.target.name]: e.target.value });
      }

      const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            setLoading(true);
            setMessage("");

            try {
                  const res = await fetch("/api/reservations", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(form),
                  });
                  const data = await res.json();

                  if (res.ok) {
                        toast.success("رزرو شما با موفقیت ثبت شد ✅");
                        setForm({ fullName: "", email: "", phone: "", visaType: "student" });
                  } else {
                        toast.error(data.message || "خطا در ثبت رزرو ❌");
                  }
            } catch (error) {
                  toast.error("❌ خطای شبکه یا سرور");
            } finally {
                  setLoading(false);
            }
      };


      return (
            <>
                  <Head>
                        <title>  رزرو وقت مشاوره | موسسه مهاجرتی ماکان</title>
                        <meta name="description" content="تماس با موسسه مهاجرتی ماکان برای مشاوره و خدمات مهاجرتی" />
                        <meta name="keywords" content=",ویزای کانادا,موسسه مهاجرتی, تماس با ما, مشاوره مهاجرتی" />
                  </Head>

                  <div className=' container mx-auto '>
                        {/* breadcumb */}
                        <div className='mt-4'>
                              <Breadcrumb />
                              <hr className='border-gray-300 my-4' />
                        </div>
                  </div>

                  <section className="relative bg-gradient-to-br from-gray-800 to-gray-600 text-white overflow-hidden ">
                        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 grid lg:grid-cols-2 gap-10 items-center">

                              {/* متن سمت چپ */}
                              <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.4 }}
                                    className="space-y-6 z-50">
                                    <p className="text-sm tracking-widest uppercase text-red-400">
                                          موسسه مهاجرتی |  ماکان
                                    </p>
                                    <h1 className="text-2xl lg:text-3xl font-bold leading-tight">
                                          رزرو وقت مشاوره مهاجرتی
                                    </h1>
                                    <p className="text-lg text-gray-200 max-w-xl z-50">
                                          برای دریافت مشاوره تخصصی اطلاعات خود را وارد کنید.
                                    </p>

                              </motion.div>

                              {/* عکس سمت راست */}
                              <motion.div
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.8 }}
                                    className="relative flex justify-center items-center mt-8">
                                    {/* شکل‌های بک‌گراند */}
                                    <div className="absolute -top-10 -left-6 w-60 h-76 md:w-90 md:h-90 bg-green-200 rounded-3xl -rotate-8 float1"></div>
                                    <div className="absolute -bottom-8 -right-10 w-60 h-76 md:w-72 md:h-96 bg-blue-400 rounded-3xl rotate-12 opacity-80 float2"></div>

                                    <Image
                                          src="/images/office-2.jpg" // عکس خودت رو اینجا بذار
                                          alt="Leadership"
                                          width={400}
                                          height={400}
                                          className="relative z-10 object-cover rounded-lg"
                                    />
                              </motion.div>
                        </div>
                  </section>

                  <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className=' rounded-2xl flex items-center text-right flex-col pb-8 p-4 my-8 '>
                        <Image src="/logo.png" alt="File" width={120} height={120} className="object-cover  mb-2 mt-4" />
                        <h3 className='text-center text-xl tracking-tight text-gray-800 font-bold mb-6'>موسسه مهاجرتی ماکان</h3>
                        <form onSubmit={handleSubmit} className='md:max-w-3xl w-full text-center'>
                              <div className='grid grid-cols-1 lg:grid-cols-3 gap-3 '>
                                    <div className='spacy-4 my-4'>
                                          <label htmlFor="name">نام و نام خانوادگی
                                                <span className='text-red-500'>*</span>
                                          </label>
                                          <input
                                                type="text"
                                                name='fullName'
                                                value={form.fullName}
                                                onChange={handleChange}
                                                required
                                                placeholder='نام ونام خانوادگی'
                                                className='w-full border border-gray-300 p-2 rounded-xl focus:outline-none focus:border-2 focus:border-red-700' />
                                    </div>
                                    <div className='spacy-4 my-4'>
                                          <label htmlFor="phone">شماره تلفن
                                                <span className='text-red-500'>*</span>
                                          </label>
                                          <input
                                                type="text"
                                                name='phone'
                                                value={form.phone}
                                                onChange={handleChange}
                                                required
                                                maxLength={11}
                                                placeholder='تلفن'
                                                className='w-full border border-gray-300 p-2 rounded-xl focus:outline-none focus:border-2 focus:border-red-700' />
                                    </div>
                                    <div className='spacy-4 my-4'>
                                          <label htmlFor="email">آدرس ایمیل</label>
                                          <input
                                                type="email"
                                                name='email'
                                                value={form.email}
                                                onChange={handleChange}
                                                required
                                                placeholder='ایمیل'
                                                className='w-full border border-gray-300 p-2 rounded-xl focus:outline-none focus:border-2 focus:border-red-700' />
                                    </div>
                                    <div className='spacy-4 my-4 lg:col-span-3'>
                                          <label htmlFor="name"> نوع ویزا </label>
                                          <select
                                                name="visaType" id=""
                                                value={form.visaType}
                                                onChange={handleChange}
                                                className='w-full  border border-gray-300 p-2 rounded-xl focus:outline-none focus:border-2 focus:border-red-700'>
                                                <option value="">انتخاب کنید</option>
                                                <option value="student">ویزای تحصیلی</option>
                                                <option value="work">ویزای کاری</option>
                                                <option value="tourist">ویزای توریستی</option>
                                                <option value="investment">ویزای سرمایه‌گذاری</option>
                                                <option value="family">ویزای همراه خانواده</option>
                                          </select>
                                    </div>
                                    <button
                                          type='submit'
                                          disabled={loading}
                                          className='bg-gradient-to-br flex items-center justify-center from-red-800 to-red-600 font-bold px-6 py-2 rounded-xl shadow text-white w-full lg:col-span-3 my-6'>
                                          {loading ? "⏳ در حال ارسال..." : "ثبت رزرو"}
                                          <Send className='inline-block w-4 h-4 mr-2' />
                                    </button>
                              </div>
                        </form>

                        {/* {message && <p className="mt-4 text-center text-sm">{message}</p>} */}

                        <motion.p
                              initial={{ opacity: 0, y: 50 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.5, delay: 0.8 }}
                              className='max-w-4xl py-4 px-2 text-sm'>برای دریافت ویزای کشورهای مختلف، راه‌ها و شرایط متنوعی وجود دارد. قوانین مهاجرتی هر کشور متفاوت است و آگاهی کامل از آن‌ها برای متقاضیان کار ساده‌ای نیست.
                              سازمان مهاجرتی ماکان با بهره‌گیری از کارشناسان متخصص در انواع ویزاها، مسیر شما را شفاف و آسان می‌کند.

                              برای دریافت مشاوره رایگان در زمینه انواع ویزا کافیست فرم زیر را تکمیل نمایید تا کارشناسان ما در کوتاه‌ترین زمان با شما تماس بگیرند.</motion.p>
                        <motion.p
                              initial={{ opacity: 0, y: 50 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.5, delay: 0.4 }}
                              className='text-center text-red-500 font-bold text-xl'>مشاوران ما به زودی با شما تماس می‌گیرند.</motion.p>
                  </motion.div>
            </>
      )
}
