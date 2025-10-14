
import Breadcrumb from '@/components/Beadcrunmb'
import ContactForm from '@/components/ContactForm'
import CustomTabs from '@/components/Tabs'
import { AlertCircle } from 'lucide-react'
import  type { Metadata } from 'next'
import Head from 'next/head'



export const metadata: Metadata = {
  title: "تماس با ما",
  description: " تماس با موسسه مهاجرتی ماکان",
};

export default function ContactPage() {

  const phone = ["۰۲۱-۸۸۸۸۱۱۵۸", "۰۲۱-۲۳۶۵۲۱۴۶"]
  

  
  return (
    <>
      <Head>
        <title>تماس با ما - موسسه مهاجرتی ماکان</title>
        <meta name="description" content="تماس با موسسه مهاجرتی ماکان برای مشاوره و خدمات مهاجرتی" />
        <meta name="keywords" content=",ویزای کانادا,موسسه مهاجرتی, تماس با ما, مشاوره مهاجرتی" />
      </Head>

      <div className='min-h-screen container mx-auto '>
        {/* breadcumb */}
        <div className='mt-4'>
          <Breadcrumb />
          <hr className='border-gray-300 my-4' />
        </div>

        {/* notice */}
        <div className='border flex items-center gap-2 max-w-6xl mx-4 md:mx-auto p-4 my-6 rounded-xl border-amber-200'>
          <AlertCircle className='text-amber-500/70' />
          <p className='text-xs md:text-sm text-amber-900'>توجه: تمام امور مربوط به مشاوره مهاجرت کاری، فقط در شعبه تهران انجام می پذیرد.</p>
        </div>


        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-12'>
          {/* ارتباط با موسسه ما */}
          <div className='max-w-md md:mx-auto mx-4 md:shadow-none shadow-md p-4 rounded-lg'>
            <div>
              <h1 className='text-xl font-bold text-gray-800 tracking-tighter'>ارتباط با موسسه مهاجرتی کایان</h1>
              <p className='text-gray-600 mt-4 text-sm md:text-md'>مهاجرت پلی به سوی آینده‌ای روشن است.
                ما این پل را برای شما هموار می‌کنیم تا بدون نگرانی، مسیر موفقیت و آرامش را تجربه کنید. موسسه مهاجرتی کایان همراه شماست.</p>
            </div>
            <div className='mt-12'>
              <h2 className='text-xl font-bold mb-4'>اطلاعات تماس</h2>
              <p className='text-gray-400 font-bold'>آدرس دفتر مرکزی</p>
              <p className='text-gray-600 mt-4 text-sm md:text-md'>تهران، خ ولیعصر، بالاتر از پارک ساعی، مجتمع صدف، طبقه ۷، واحد ۱</p>
            </div>
            <div className='mt-12 '>
              <h1 className='text-xl font-bold text-gray-400'>ساعات کاری</h1>
              <p className='text-gray-600 mt-4 text-sm md:text-md'>شنبه تا چهارشنبه: 9:00 الی 17:00</p>
              <p className='text-gray-600 mt-2 text-sm md:text-md'>پنج‌شنبه: 9:00 الی 15:00</p>
            </div>
            <div className='mt-12'>
              <h1 className='text-xl font-bold text-gray-400'>شماره تماس</h1>
              <p className='text-cyan-600 '>{phone.map((num, index) => (
                                                <span key={index}>
                                                      {num}
                                                      {index < phone.length - 1 && <br />}
                                                </span>
                                          ))}</p>
            </div>
          </div>

          {/* فرم ارتباط با ما */}
          <div className='mx-4'>
            <ContactForm />
          </div>


        </div>

        <div className='my-20'>
          <h1 className='text-center text-xl font-bold tracking-tighter text-gray-800'>
            دفاتر مهاجرتی ماکان
          </h1>

          {/* تب‌ها */}
         
          <CustomTabs />
          

        </div>

      </div>
    </>
  )
}
