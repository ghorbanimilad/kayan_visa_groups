"use client"
import { Instagram, MapPin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion"
import { BsWhatsapp } from 'react-icons/bs'

import { PiTelegramLogoFill } from 'react-icons/pi'

const phone = ["۰۲۱-۸۸۸۸۱۱۵۸", "۰۲۱-۸۸۸۸۶۳۵۹"]

type Country = {
      id: string;
      name: string;
      slug: string;
      flagUrl?: string | null;
      countryCode?: string | null;
};
type VisaType = {
      id: string;
      name: string;
      slug: string;
      countries: Country[];
      showInFooter: boolean;
};

export default function Footer() {
      const [menus, setMenus] = useState<VisaType[]>([]);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
            fetch("/api/tourist-countries")
                  .then(res => {
                        console.log("Status:", res.status);
                        return res.json();
                  })
                  .then(data => {
                        console.log("Fetched data:", data);
                        setMenus(data);
                        setLoading(false);
                  })
                  .catch(err => {
                        console.error("Fetch error:", err);
                        setLoading(false);
                  });
      }, []);

      return (
            <div className='relative mx-auto overflow-hidden text-sm bg-gray-900'>

                  {/* بخش آدرس / تلفن / ایمیل */}
                  <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.7 }}
                        className='flex items-center py-4 md:py-8 mx-10 md:mx-14'>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-18 
                        text-center md:text-right">
                              <div className="grid grid-cols-[45px_auto] gap-4 items-center">
                                    <div className='bg-white w-10 h-10 rounded-full flex items-center justify-center'>
                                          <MapPin className='w-6 h-6 text-black' />
                                    </div>
                                    <h2 className='text-xs font-semibold text-gray-100 leading-relaxed'>
                                          تهران، خ ولیعصر، بالاتر از پارک ساعی، مجتمع صدف، طبقه ۷، واحد ۱
                                    </h2>
                              </div>

                              <div className="grid grid-cols-[40px_auto] gap-4 items-center">
                                    <div className='bg-white w-10 h-10 rounded-full flex items-center justify-center'>
                                          <MapPin className='w-6 h-6 text-black' />
                                    </div>
                                    <h2 className='text-sm font-semibold text-gray-100 leading-relaxed'>
                                          {phone.map((num, index) => (
                                                <span key={index}>
                                                      {num}
                                                      {index < phone.length - 1 && <br />}
                                                </span>
                                          ))}
                                    </h2>
                              </div>

                              <div className="grid grid-cols-[40px_auto] gap-4 items-center">
                                    <div className='bg-white w-10 h-10 rounded-full flex items-center justify-center'>
                                          <MapPin className='w-6 h-6 text-black' />
                                    </div>
                                    <h2 className='text-sm font-semibold text-gray-100 leading-relaxed'>
                                          ghorbanimilad16@gmail.com
                                    </h2>
                              </div>
                        </div>
                  </motion.div>

                  <hr className="h-1 mx-auto my-6 max-w-6xl bg-gradient-to-r from-transparent via-gray-400 to-transparent border-0" />

                  {/* بخش دسته‌بندی‌ها و شبکه‌های اجتماعی */}
                  <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.7 }}
                        className='py-4 md:py-14 mx-10 md:mx-14'>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-4 
                        text-center md:text-right'>


                              <div className="flex flex-col items-center md:items-start">
                                    <p className="text-md font-semibold text-red-500">ویزای توریستی</p>
                                    <div className="mt-2 flex flex-col gap-1 max-h-48 ">

                                          {menus.map(menu => (
                                                <div key={menu.id} className="flex flex-col gap-1">
                                                      <p className="text-gray-200 font-medium">{menu.title}</p>
                                                      <ul className="list-disc list-inside text-sm text-gray-200 ml-4">
                                                            {menu.countries.map(country => (
                                                                  <li key={country.id}>
                                                                        <Link href={`/${menu.slug}/${country.slug}`} className="hover:text-gray-300">
                                                                              {country.name}
                                                                        </Link>
                                                                  </li>
                                                            ))}
                                                      </ul>
                                                </div>
                                          ))}



                                    </div>
                              </div>


                              <div className='flex flex-col items-center md:items-start'>
                                    <p className='text-md font-semibold text-red-500'>ویزای استارت آپ</p>
                                    <div className='mt-4 flex-col flex'>
                                          <h1 className='text-gray-200 text-sm '>
                                                <Link href="/studio" className='hover:text-gray-300 '>استادیو ویزای استارت آپ کایان</Link>
                                          </h1>
                                    </div>
                              </div>

                              <div className='flex flex-col items-center md:items-start'>
                                    <p className='text-md font-semibold text-red-500'>ما را دنبال کنید</p>
                                    <div className='mt-4 flex space-x-6 justify-center md:justify-start text-gray-50'>
                                          <Link href="https://www.instagram.com/Kayan_immigrationco" target="_blank" rel="noopener noreferrer"><Instagram className="w-5 h-5 cursor-pointer hover:text-gray-300" /></Link>
                                          <Link href="https://t.me/Kayan_immigrationco" target="_blank" rel="noopener noreferrer"><PiTelegramLogoFill className="w-5 h-5 cursor-pointer hover:text-gray-300" /></Link>
                                          <Link href="https://wa.me/16475944461" target="_blank" rel="noopener noreferrer"><BsWhatsapp className="w-5 h-5 cursor-pointer hover:text-gray-300" /></Link>

                                    </div>
                              </div>

                              <div className='flex flex-col items-center md:items-start'>
                                    <p className='text-md font-semibold text-red-500' >مجوزها</p>
                                    <div className='mt-4 flex-col flex'>
                                          <ul className="list-disc list-inside text-sm text-gray-200 space-y-1">
                                                <li><Link href="/" className='hover:text-gray-300'>مشاهده مجوزها ونماد اعتماد  </Link></li>

                                          </ul>
                                    </div>
                              </div>
                        </div>
                  </motion.div>

                  {/* بخش پایینی */}
                  <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.7 }}
                        className='py-14 md:py-8 mx-10'>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-20 text-center md:text-right">
                              <div className='flex items-center justify-center '>
                                    <Image src="/logo.png" width={120} height={120} alt="logo" className='object-cover' />
                              </div>
                              <div className='flex items-center justify-center md:justify-start'>
                                    <p className='text-gray-200'>
                                          تمامی حقوق و مطالب برای شرکت کایان مایگریشن محفوظ است.
                                    </p>
                              </div>
                              <div className='flex items-center justify-center md:justify-start'>
                                    <p className='text-gray-200'>
                                          All Right Reserved By Kayan Migration. ©2005-2025
                                    </p>
                              </div>
                        </div>
                  </motion.div>
            </div>
      )
}
