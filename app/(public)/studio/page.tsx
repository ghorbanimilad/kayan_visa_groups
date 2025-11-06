"use client"
import Breadcrumb from '@/components/Beadcrunmb'
import Head from 'next/head'
import React, { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from "framer-motion"
import Image from 'next/image'
import Link from 'next/link'

// const cardVariants = {
//   hidden: { opacity: 0, y: 30 },
//   visible: (i: number) => ({
//     opacity: 1,
//     y: 0,
//     transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
//   }),
// };

export default function StudioPage() {


  // پارالکس تصویر بک‌گراند

  const advantages = [
    { title: "اقامت دائم", icon: "🏡", desc: "با ایجاد کسب‌وکار، مسیر دریافت اقامت دائم کانادا را هموار کنید." },
    { title: "همراهی خانواده", icon: "👨‍👩‍👧‍👦", desc: "همسر و فرزندان شما می‌توانند همراه شما اقامت بگیرند." },
    { title: "رشد کسب‌وکار", icon: "🚀", desc: "فرصت‌های جهانی برای توسعه ایده و استارت‌آپ شما فراهم می‌شود." },
    { title: "حمایت سازمان‌ها", icon: "🤝", desc: "نامه حمایت از سازمان‌های معتبر کانادایی مسیر مهاجرت را تضمین می‌کند." },
  ];

  const services = [
    "نگارش بیزنس پلن",
    "طراحی Pitch Deck",
    "منتورینگ و مشاوره",
    "ارائه راه حل برای مشکلات مردم در سراسر جهان",
    "تیم‌سازی اعضای استارت‌آپ‌ها با افراد ماهر برای رشد کسب‌وکار نوپا",
    "ارتباط با Designated Organizations",
    "بررسی Eligibility (واجد شرایط بودن)",
  ];
  const steps = [
    "بررسی ایده",
    "ساخت تیم و بیزنس پلن",
    "دریافت نامه حمایت (Letter of Support)",
    "ارسال پرونده مهاجرتی",
  ];
  const ref = useRef(null);
  const { scrollY } = useScroll({ target: ref });
  const bgY = useTransform(scrollY, [0, 800], [0, -50]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // پارالکس تصویر و متن
  const imageY = useTransform(scrollY, [0, 300], [0, isMobile ? 0 : -50]);
  const textY = useTransform(scrollY, [0, 300], [0, isMobile ? 0 : -20]);
  const itemY = useTransform(scrollY, [0, 500], [0, -15]);
  const textScale = useTransform(scrollY, [0, 300], [1, isMobile ? 1 : 1.03]);
  const textRotate = useTransform(scrollY, [0, 300], [0, isMobile ? 0 : 1.2]);

  return (
    <>
      <Head>
        <title> درباره ما - موسسه مهاجرتی کایان</title>
        <meta name="description" content="درباره با موسسه مهاجرتی کایان برای مشاوره و خدمات مهاجرتی" />
        <meta name="keywords" content="ویزای کانادا,موسسه مهاجرتی, تماس با ما, مشاوره مهاجرتی" />
      </Head>

      <div className='min-h-screen '>
        {/* breadcumb */}
        <div className='mt-4 mx-6'>
          <Breadcrumb />
          <hr className='border-gray-300 my-4' />
        </div>

        {/* hero section */}
        <section
          ref={ref}
          className="relative w-full h-[500px] md:h-[600px] flex items-center justify-center text-center overflow-hidden"
        >
          {/* تصویر کاور با پارالکس */}
          <motion.div
            style={{ y: imageY }}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src="/images/covers/studio-visa.jpg"
              alt="Studio Visa Cover"
              fill
              className="object-cover brightness-[0.65]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/50"></div>
          </motion.div>

          {/* محتوای روی تصویر */}
          <motion.div
            style={{ y: textY, scale: textScale, rotate: textRotate }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative z-10 px-4 md:px-0"
          >
            <motion.h1
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-white"
            >
              استارت‌آپ ویزا – با ایده خود اقامت دائم بگیرید
            </motion.h1>

            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              className="text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed text-gray-200"
            >
              ما در استارت‌آپ ویزا استودیو، از ارزیابی ایده تا دریافت نامه حمایت و آماده‌سازی پرونده مهاجرتی، همراه شما هستیم
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <Link
                href="/immigration-evaluation"
                className="inline-block bg-gradient-to-br from-red-800 to-red-600 hover:from-red-800 hover:to-red-700 mt-6 md:mt-10 transition-colors text-white px-6 md:px-8 py-2 md:py-3 rounded-full font-semibold shadow-lg"
              >
                درخواست ارزیابی رایگان 
              </Link>
            </motion.div>
          </motion.div>

          {/* Floating Elements کوچک متحرک */}
          <motion.div
            className="absolute top-10 left-5 w-5 h-5 md:w-6 md:h-6 bg-red-600 rounded-full opacity-50 cursor-pointer"
            whileHover={{ scale: 1.3, rotate: 15 }}
            animate={{ y: [0, 20, 0], x: [0, 10, 0], rotate: [0, 45, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-20 right-8 w-3 h-3 md:w-4 md:h-4 bg-yellow-400 rounded-full opacity-40 cursor-pointer"
            whileHover={{ scale: 1.2, rotate: 20 }}
            animate={{ y: [0, -15, 0], rotate: [0, 360, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute top-1/2 right-20 w-4 h-4 md:w-5 md:h-5 bg-blue-500 rounded-full opacity-40 cursor-pointer"
            whileHover={{ scale: 1.2, rotate: 20 }}
            animate={{ y: [0, 10, 0], x: [0, -10, 0], rotate: [0, -45, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
        </section>



        <section className=" my-12">
          <div className="container mx-auto py-2 px-6 ">
            <h1 className="text-center text-gray-900 text-3xl tracking-tight font-semibold"> چرا استادیو استارت‌آپ موسسه کایان</h1>
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
                درباره استارت‌آپ ویزا
              </motion.h2>
              <motion.p
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
                className="text-gray-800 leading-7 text-justify max-w-3xl">
                موسسه مهاجرتی کایان از سال ۱۳۹۰ با هدف ارائه خدمات جامع مهاجرت و ایجاد مسیرهای قانونی و مطمئن برای متقاضیان مهاجرت به کشورهای مختلف فعالیت خود را آغاز کرد. این موسسه افتخار دارد تا در طول فعالیت خود، به صدها متقاضی در تحقق اهداف مهاجرتی‌شان کمک کرده و تجربه‌ای حرفه‌ای و مطمئن ارائه دهد.

                موسسه کایان خدمات کاملی را ارائه می‌دهد؛ شامل ارزیابی شرایط متقاضی، تهیه مدارک و مستندات، نگارش بیزنس پلن و طرح‌های مهاجرتی، مشاوره و منتورینگ تخصصی، و پیگیری کامل پرونده تا دریافت ویزا و مهاجرت.
                <br />
                تیم حرفه‌ای موسسه با کارشناسان مجرب در حوزه مهاجرت، حقوق بین‌الملل، و توسعه کسب‌وکار، در تمامی طول مسیر همراه مراجعین خواهد بود و با ارائه راهنمایی‌های دقیق و استراتژیک، مسیر مهاجرت و توسعه زندگی یا کسب‌وکار متقاضیان را هموار می‌سازد.



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
                src="/images/docs/studio-office.jpg"
                alt="Migration Journey"
                width={500}
                height={500}
                className="rounded-lg border-2 border-gray-200 shadow-xl z-20"
              />
            </motion.div>
          </div>
        </section>

        {/* درباره برنامه استارت‌آپ ویزا */}
        <section className="relative py-16 my-16 md:my-24 overflow-hidden">
          {/* تصویر بک‌گراند با پارالکس */}
          <motion.div
            style={{ y: bgY }}
            className="absolute inset-0 z-0"
          >
            {/* تصویر بک‌گراند */}
            <Image
              src="/images/covers/visa-black.jpg"
              alt="Startup Visa Background"
              fill
              className="object-cover opacity-95 py-24"
              priority
            />

            {/* متن روی تصویر، وسط و چسبیده به تصویر */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 flex justify-center items-center">
              <h1 className="text-6xl md:text-9xl font-bold text-red-500 bg-white rounded-2xl px-6  opacity-85 select-none pointer-events-none rotate-12">
                Visa
              </h1>
            </motion.div>
          </motion.div>

          {/* عنوان و توضیح کوتاه */}
          <div className="relative z-10 max-w-3xl bg-gray-50/90 rounded-2xl p-6 mx-auto text-center mb-12 px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-red-500">
              برنامه استارت‌آپ ویزا
            </h2>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed">
              برنامه استارت‌آپ ویزا فرصتی استثنایی برای کارآفرینان خلاق فراهم می‌کند
              تا با ایجاد کسب‌وکار نوآورانه در کانادا، اقامت دائم دریافت کنند.
              این برنامه از طریق سازمان‌های معتبر کانادایی حمایت شده و مسیر مهاجرت
              شما را هموار می‌کند.
            </p>
          </div>

          {/* کارت‌ها روی تصویر */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
            {advantages.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.15)" }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: idx * 0.1, duration: 0.2, ease: "easeOut" }}
                className="bg-white rounded-xl border-2 border-gray-700 p-6 flex flex-col items-center text-center cursor-pointer transition-transform"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-semibold text-lg mb-2 text-gray-900">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>


        <section className="relative py-16 my-16 md:my-24 overflow-hidden ">

          {/* عنوان بخش */}
          <div className="max-w-3xl mx-auto text-center mb-10 px-4">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-xl md:text-2xl font-bold mb-4 text-red-500">
              خدمات استودیو ما
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-gray-800 text-base md:text-lg leading-relaxed">
              موسسه کایان با ارائه خدمات تخصصی، مسیر مهاجرت و موفقیت کسب‌وکار شما را هموار می‌کند.
            </motion.p>
          </div>

          {/* لیست خدمات با بک‌گراند لوگو */}
          <div className="relative max-w-2xl mx-auto px-4">
            {/* تصویر بک‌گراند */}
            <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
              <Image
                src="/logo.png" // مسیر لوگو سایت
                alt="Logo Background"
                className="opacity-20 object-contain"
                width={400}
                height={400}
              />
            </div>

            {/* لیست */}
            <ul className="relative space-y-4">
              {services.map((service, idx) => (
                <motion.li
                  key={idx}
                  style={{ y: itemY }}
                  initial={{ opacity: 0, x: -30, scale: 0.95 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: idx * 0.15, duration: 0.5, ease: "easeOut" }}
                  className="flex items-center text-gray-800 text-md md:text-lg font-medium"
                >
                  {/* دایره قرمز با ستاره سفید */}
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: idx * 0.15, duration: 0.5, ease: "easeOut" }}
                    className="text-white w-5 h-5 bg-red-500 rounded-full ml-3 text-center text-base md:text-lg font-bold"
                  >
                    *
                  </motion.span>

                  {/* متن آیتم */}
                  <span className="flex-1">{service}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </section>



        <section
          className="relative py-16 my-16 md:my-24 overflow-hidden bg-center bg-cover"

        >
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 0.9, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="absolute top-0 left-0 h-full w-1/2   z-10"
            style={{
              clipPath: "polygon(0 0, 80% 0, 100% 50%, 80% 100%, 0 100%)",
            }}
          >
            <img
              src="/images/docs/studio-steps.jpg"
              alt="Steps Illustration"
              className="w-full h-full object-cover shadow-lg"
            />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 items-center relative">
            {/* سمت چپ: متن با بکگراند سفید */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="relative z-20"
            >
              <motion.h2
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-xl md:text-2xl px-4 font-bold mb-6 text-red-500">
                مراحل همکاری (Step by Step)
              </motion.h2>
              <p className="text-gray-800 mb-8 px-4 text-base md:text-lg leading-relaxed">
                مسیر گام به گام همکاری با موسسه کایان از ایده اولیه تا ارسال پرونده مهاجرتی
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-2">
                {steps.map((step, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: idx * 0.15, duration: 0.5, ease: "easeOut" }}
                    className="bg-gray-900 border border-gray-700 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-shadow cursor-pointer flex items-start"
                  >
                    <span className="flex-shrink-0 w-6 h-6 bg-red-500 text-white font-bold flex items-center justify-center rounded-full text-lg ml-4">
                      {idx + 1}
                    </span>
                    <p className="text-gray-100 text-base md:text-md">{step}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* سمت راست: ذوزنقه قرمز با عکس */}

          </div>
        </section>


      </div>
    </>
  )
}
