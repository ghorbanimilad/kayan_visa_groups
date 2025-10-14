"use client"
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import CountryGuide from "@/components/offers/CountryGuide";
import DocumentsSection from "@/components/offers/DocumentsSection";
import Head from "next/head";
import Breadcrumb from "@/components/Beadcrunmb";

const steps = [
  {
    id: 1,
    title: "تعیین هدف مهاجرت",
    desc: "مشخص کنید هدف‌تان چیست: کار، تحصیل، اقامت دائم یا سرمایه‌گذاری؟ هدف مشخص مسیر و مدارک مورد نیاز را تعیین می‌کند.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6">
        <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 2v6l4 2" />
        <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "ارزیابی شرایط شخصی",
    desc: "سابقه کاری، مدارک تحصیلی، سن، و سطح زبان را ارزیابی کنید تا مسیرهای قابل‌اجرا مشخص شوند.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6">
        <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" />
        <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M6 20v-1a4 4 0 014-4h4a4 4 0 014 4v1" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "انتخاب کشور و مسیر",
    desc: "بر اساس هدف و شرایط، کشورها و برنامه‌های مناسب (کار، تحصیل، سرمایه‌گذاری) را مقایسه کنید.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6">
        <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M3 12h18" />
        <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 3v18" />
      </svg>
    ),
  },
  {
    id: 4,
    title: "آماده‌سازی مدارک",
    desc: "پاسپورت، ترجمه مدارک، مدرک زبان، رزومه و نامه‌های پشتیبان را آماده و ترجمه رسمی کنید.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6">
        <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 20l9-5-9-5-9 5 9 5z" />
        <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 12l9-5-9-5-9 5 9 5z" />
      </svg>
    ),
  },
  {
    id: 5,
    title: "ارسال درخواست و پیگیری",
    desc: "درخواست ویزا یا پذیرش را طبق چک‌لیست ارسال کنید و وضعیت را مرتب پیگیری کنید (سفارت، دانشگاه یا برنامه مهاجرتی).",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6">
        <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
        <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 5v14" />
      </svg>
    ),
  },
  {
    id: 6,
    title: "آغاز زندگی جدید",
    desc: "بعد از دریافت ویزا یا ورود به کشور، مراحل ورود، یافتن مسکن و کار و ادغام در جامعه را برنامه‌ریزی کنید.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6">
        <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M12 3v18" />
      </svg>
    ),
  },
];

export default function OffersPage() {
  const { scrollY } = useScroll();

  // تعریف transform ها روی MotionValue
  const y1: MotionValue<number> = useTransform(scrollY, [0, 800], [0, -80]);
  const y2: MotionValue<number> = useTransform(scrollY, [0, 800], [0, -50]);
  const y3: MotionValue<number> = useTransform(scrollY, [0, 800], [0, -30]);
  const y4: MotionValue<number> = useTransform(scrollY, [0, 800], [0, -20]);

  return (
    <>
      <Head>
        <title> درباره ما - موسسه مهاجرتی ماکان</title>
        <meta name="description" content="درباره با موسسه مهاجرتی ماکان برای مشاوره و خدمات مهاجرتی" />
        <meta name="keywords" content="ویزای کانادا,موسسه مهاجرتی, تماس با ما, مشاوره مهاجرتی" />
      </Head>

      <div className='mt-4 mx-6'>
        <Breadcrumb />
        <hr className='border-gray-300 my-4' />
      </div>
      <section className="relative w-full h-[500px] flex items-center justify-center text-center overflow-hidden">
        {/* تصویر کاور با انیمیشن فید */}
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src="/images/covers/passenger-cover.jpg"
            alt="Passenger Cover"
            fill
            className="object-cover brightness-[0.65]"
            priority
          />
        </motion.div>

        {/* لایه تیره برای خوانایی متن */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0 bg-black/40"
        />

        {/* محتوای روی عکس */}
        <div className="relative z-10 text-white px-4 ">
          <motion.h1
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl md:text-4xl font-bold mb-6 "
          >
            مسیر مهاجرت را با آگاهی و برنامه‌ریزی شروع کنید.
          </motion.h1>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="text-base md:text-lg leading-relaxed text-gray-200"
          >
            در این صفحه یاد می‌گیرید چطور هدف‌گذاری کنید، مسیر مناسب خود را
            انتخاب کنید و مدارک لازم را آماده نمایید.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <Link
              href="/reservation"
              className="inline-block bg-gradient-to-br from-red-800 to-red-600 hover:from-red-800 hover:to-red-700 mt-10 transition-colors text-white px-8 py-3 rounded-full font-semibold shadow-lg"
            >
              ارزیابی شرایط من
            </Link>
          </motion.div>
        </div>
      </section>


      <section className=" my-12">
        <div className="container mx-auto py-2 px-6 ">
          <h1 className="text-center text-gray-900 text-3xl tracking-tight font-semibold">چرا اولین قدم با موسسه کایان</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center container mx-auto py-10 px-6">
          {/* بخش متن */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="z-20"
          >
            <motion.h2
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
              چرا اولین قدم مهم‌ترین قدم در مهاجرت است؟
            </motion.h2>
            <motion.p
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="text-gray-800 leading-7 text-justify max-w-3xl">
              بسیاری از افرادی که تصمیم به مهاجرت می‌گیرند، بدون برنامه‌ریزی و
              آگاهی وارد این مسیر می‌شوند. آن‌ها معمولاً تنها با شنیدن تجربه
              دیگران یا دیدن تبلیغات، اقدام به انتخاب کشور یا مسیر مهاجرتی
              می‌کنند. نتیجه‌ی این تصمیم‌های عجولانه، اتلاف زمان، هزینه و از دست
              دادن فرصت‌های واقعی مهاجرت است.

              <br />
              در حالی‌که اگر از همان ابتدا با شناخت دقیق قوانین مهاجرتی، شرایط
              کشور مقصد و مسیرهای ممکن شروع کنید، می‌توانید مسیر خود را
              هوشمندانه و هدفمند انتخاب کنید. در واقع، آگاهی و برنامه‌ریزی اولین
              قدم واقعی مهاجرت موفق است؛ قدمی که پایه و اساس تمام مراحل بعدی را
              می‌سازد.
            </motion.p>
          </motion.div>

          {/* بخش تصویر با کادر قرمز */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative flex justify-center mt-10"
          >
            {/* حلقه قرمز نازک پشت عکس */}

            <div className="absolute rounded -top-10 -left-4 w-[220px] md:w-[280px] h-[380px] md:h-[440px]  border-[3px] border-red-600 z-10"></div>

            {/* عکس اصلی */}
            <Image
              src="/images/ship.jpg"
              alt="Migration Journey"
              width={500}
              height={500}
              className="rounded-lg border-2 border-gray-200 shadow-xl z-20"
            />
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-white/5 rounded-lg my-12">
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <motion.h3
              initial={{ y: -20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-md text-red-500  font-semibold">🗺 مراحل گام‌به‌گام</motion.h3>
            <motion.h2
              initial={{ y: -20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-2xl md:text-3xl font-bold text-white mt-2">اولین قدم‌ها برای مهاجرت</motion.h2>
            <motion.p
              initial={{ y: -20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-gray-800 max-w-2xl mx-auto mt-2">یک مسیر ساده و قابل‌پیگیری شامل شش مرحله که شما را از تصمیم تا شروع زندگی جدید همراهی می‌کند.</motion.p>
          </div>


          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((step, idx) => (
              <motion.article
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.12, duration: 0.6 }}
                className="bg-gradient-to-br flex flex-col justify-between from-gray-800 to-gray-700 p-6 rounded-2xl shadow-md border border-white/5 hover:scale-[1.02] transform transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 bg-red-600/20 text-red-500 p-3 rounded-xl ring-1 ring-red-600/20">
                    {step.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">{step.title}</h4>
                    <p className="text-sm text-gray-300 mt-2 leading-relaxed">{step.desc}</p>
                  </div>
                </div>


                <div className="mt-6 flex justify-end">
                  <span className="text-xs text-red-500">مرحله {step.id}

                    <Image
                      src="/images/flesh.png"
                      alt="Arrow Right"
                      width={30}
                      height={30}
                      className="inline-block mr-2"
                    />
                  </span>
                </div>
              </motion.article>
            ))}
          </div>

        </div>
      </section>

      <section>
        <CountryGuide />
      </section>

      <section>
        <DocumentsSection />
      </section>

      <section
        className="relative py-16 my-12 overflow-hidden bg-center bg-cover"
        style={{
          backgroundImage: "url('/images/docs/laptop.jpg')", // مسیر عکس بک‌گراند کل سکشن
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 0.9, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="absolute top-0 left-0 h-full w-1/2 bg-gradient-to-br from-red-700 to-red-600 opacity-85 z-10"
          style={{
            clipPath: "polygon(0 0, 80% 0, 100% 50%, 80% 100%, 0 100%)",
          }}
        ></motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 items-center relative">
          {/* سمت چپ: متن با بکگراند سفید */}
          <div className="relative bg-white/85 backdrop-blur-sm px-6 py-10 text-center md:text-right z-10 order-2 md:order-1 shadow-xl rounded-lg m-4">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-md text-red-500 font-semibold mb-2"
            >
              ✨ جمع‌بندی پایانی
            </motion.h3>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-2xl md:text-3xl font-bold text-gray-900 mb-4"
            >
              مسیر مهاجرت خود را با اطمینان ادامه دهید
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-800 max-w-3xl mx-auto leading-7 text-justify"
            >
              مهاجرت یک مسیر پرچالش است، اما با برنامه‌ریزی، شناخت مسیر، آماده‌سازی مدارک و
              آگاهی از قوانین کشور مقصد، می‌توانید گام به گام پیش بروید و شانس موفقیت خود را
              به حداکثر برسانید. اولین قدم، پایه و اساس تمام مراحل بعدی شماست؛ با آگاهی، تصمیم
              هوشمندانه بگیرید و مسیر خود را با اطمینان ادامه دهید.
            </motion.p>
          </div>

          {/* سمت راست: ذوزنقه قرمز با عکس */}
          <div className="relative h-full md:h-[500px] flex items-center justify-center order-1 md:order-2 overflow-hidden">
            {/* کادر ذوزنقه قرمز */}



          </div>
        </div>
      </section>



    </>
  );
}
