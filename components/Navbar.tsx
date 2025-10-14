"use client"
import { ArrowRight, CalendarClock, ChevronDown, ChevronLeft, Instagram, MenuIcon, SearchIcon, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { BsWhatsapp } from 'react-icons/bs'
import { PiTelegramLogoFill } from 'react-icons/pi'

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
      showInNavbar: boolean;
      showInFooter: boolean;
};

export default function Navbar({ visaTypes }: { visaTypes: VisaType[] }) {

      const [isOpen, setIsOpen] = useState(false);
      const [openSearch, setOpenSearch] = useState(false)

      const [activeMenu, setActiveMenu] = useState<string | null>(null)
      const [searchInput, setSearchInput] = useState("");
      const router = useRouter();

      const pathname = usePathname();

      const [isAdmin, setIsAdmin] = useState(false);

      useEffect(() => {
            fetch('/api/check-admin')
                  .then(res => res.json())
                  .then(data => setIsAdmin(data.isAdmin));
      }, []);

      useEffect(() => {
            if (isOpen) {
                  document.body.style.overflow = "hidden"; // جلوگیری از اسکرول صفحه
            } else {
                  document.body.style.overflow = "auto"; // بازگشت اسکرول
            }

            // برای جلوگیری از باگ هنگام unmount
            return () => {
                  document.body.style.overflow = "auto";
            };
      }, [isOpen]);

      // برای بسته شدن منو بعد کلیک روی لینک ها
      useEffect(() => {
            setIsOpen(false);
      }, [pathname]);

      const now = new Date();
      const formatter = new Intl.DateTimeFormat("fa-IR", {
            dateStyle: "full",
      });


      const handleSearch = () => {
            const query = searchInput.trim().toLowerCase();
            if (!query) return;

            // ایجاد تاخیر مصنوعی 400ms
            setTimeout(() => {
                  // جستجوی ویزا و کشور
                  for (const visa of visaTypes) {
                        if (query.includes(visa.name.toLowerCase())) {
                              const matchedCountry = visa.countries.find(c =>
                                    query.includes(c.name.toLowerCase())
                              );

                              if (matchedCountry) {
                                    router.push(`/${visa.slug}/${matchedCountry.slug}`);
                              } else {
                                    router.push(`/${visa.slug}`);
                              }

                              setOpenSearch(false);
                              setSearchInput(""); // پاک کردن input بعد از هدایت
                              return;
                        }
                  }

                  // اگر هیچ match پیدا نشد
                  router.push(`/search?query=${encodeURIComponent(query)}`);
                  setOpenSearch(false);
                  setSearchInput(""); // پاک کردن input
            }, 400); // 400ms تاخیر قبل از انجام جستجو
      };

      return (
            <div className='relative z-50 '>

                  <div className='bg-gray-800  px-4 md:px-14 flex items-center justify-between py-4 '>
                        {isAdmin && <Link href="/dashboard"
                              className='text-white hover:text-gray-200'>داشبورد
                              <ChevronLeft className='w-4 h-4 inline-block mr-1' />
                        </Link>}

                        <div className='text-white'>
                              {formatter.format(now)}
                        </div>

                        <div className="flex items-center gap-3 text-white">
                             <Link href="https://www.instagram.com/Kayan_immigrationco" target="_blank" rel="noopener noreferrer"><Instagram className="w-5 h-5 cursor-pointer hover:text-gray-300" /></Link>
                              <Link href="https://t.me/Kayan_immigrationco" target="_blank" rel="noopener noreferrer"><PiTelegramLogoFill className="w-5 h-5 cursor-pointer hover:text-gray-300" /></Link>
                              <Link href="https://wa.me/16475944461" target="_blank" rel="noopener noreferrer"><BsWhatsapp className="w-5 h-5 cursor-pointer hover:text-gray-300" /></Link>

                        </div>


                  </div>
                  <nav className='bg-white px-4 md:px-10 h-16 md:h-22 flex items-center justify-between gap-4 shadow'>
                        {/* Mobile Menu Button */}
                        <div className='lg:hidden'>
                              <button
                                    onClick={() => setIsOpen(!isOpen)}
                                    className='flex items-center justify-start p-2 text-gray-600 '>
                                    {isOpen ? <X className='w-5 h-5' /> : <MenuIcon className='w-5 h-5' />}
                              </button>
                        </div>


                        {/****************  logo section *************/}
                        <div>
                              <Link href="/" className='flex items-center gap-6'>
                                    <Image src="/logo.png" alt="موسسه مهاجرتی کایان" width={90} height={90} />
                              </Link>
                        </div>


                        {/************* Menu section *****************/}
                        <div className='hidden lg:flex text-sm flex-grow font-bold items-center lg:space-x-7 text-nowrap z-50'>
                              <Link href="/" className='text-gray-500 hover:translate-y-1 transition-all duration-200 '>خانه</Link>

                              {visaTypes
                                    .filter(menu => menu.showInNavbar)
                                    .map(menu => (
                                          <div key={menu.id} className="relative group z-50 ">
                                                <button className="flex items-center gap-1 text-gray-600 hover:text-red-600 transition-all">
                                                      {menu.name}
                                                      <ChevronDown className="transition-transform group-hover:rotate-180 group-hover:text-red-500" />
                                                </button>

                                                <div className="absolute right-0 top-full mt-4 border-t-4 border-red-600 w-lg bg-white shadow-xl rounded-lg p-2 space-y-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-1 transition-all duration-200 z-50">
                                                      {menu.countries.map(sub => (
                                                            <Link
                                                                  key={sub.id}
                                                                  href={`/${menu.slug}/${sub.slug}`}
                                                                  className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-red-600 hover:text-white rounded"
                                                            >
                                                                  <img
                                                                        src={
                                                                              sub.flagUrl ??
                                                                              `https://flagcdn.com/w20/${sub.countryCode.toLowerCase()}.png`
                                                                        }
                                                                        alt={`${sub.name} flag`}
                                                                        className="w-5 h-4 object-cover rounded-sm"
                                                                  />
                                                                  {sub.name}
                                                            </Link>
                                                      ))}
                                                </div>
                                          </div>
                                    ))}
                              <Link href="/about" className='text-gray-500 hover:translate-y-1 transition-all duration-200 '>درباره ما</Link>
                              <Link href="/contact" className='text-gray-500 hover:translate-y-1 transition-all duration-200 '>تماس با ما</Link>


                        </div>

                        {/****** Search and Reservation section ******/}
                        <div className='flex gap-6 items-center justify-center'>
                              <div className='flex bg-gray-50 rounded-xl border-2 border-red-700/60 p-2 '>

                                    <button
                                          onClick={() => setOpenSearch(true)}
                                          className='font-bold text-gray-800 cursor-pointer '>
                                          <SearchIcon className='w-5 h-5 ' strokeWidth={2} />
                                    </button>
                              </div>
                              <div>
                                    <Link
                                          href="/reservation"
                                          className='hidden md:block font-bold hover:animate-pulse bg-gradient-to-br from-red-800 to-red-600 transition-bg text-nowrap duration-300 px-8 py-2 rounded-lg text-white shadow-md'>رزرو وقت مشاوره
                                          <CalendarClock className='w-5 h-5 inline-block mr-2' />
                                    </Link>
                              </div>
                        </div>


                        {/***************  Search section ***********/}
                        {openSearch && (
                              <div
                                    onClick={() => setOpenSearch(false)}
                                    className="fixed inset-0 bg-black/60 z-50 flex items-start justify-center p-0.5"
                              >
                                    <div
                                          onClick={(e) => e.stopPropagation()}
                                          className="bg-white w-full md:max-w-5xl mx-5 rounded-xl shadow-lg p-2 relative"
                                    >
                                          <div className="flex flex-col items-center justify-center">
                                                <div className="relative w-full">
                                                      <input
                                                            type="text"
                                                            value={searchInput}
                                                            onChange={(e) => setSearchInput(e.target.value)}
                                                            placeholder="دنبال چی میگردی؟"
                                                            className="w-full md:text-lg rounded-lg px-4 py-2 focus:outline-none border-r-[3.5px] border-red-500"
                                                      />
                                                      <button
                                                            onClick={handleSearch}
                                                            className="absolute left-0 top-1/2 -translate-y-1/2 
              w-[120px] md:w-[210px] 
              bg-gradient-to-br from-cyan-600 to-cyan-500 
              text-white text-sm md:text-lg font-bold tracking-wider 
              rounded-lg 
              flex items-center justify-center 
              px-2 md:px-10 py-2"
                                                      >
                                                            جستجو
                                                      </button>

                                                      {/* ---------- Autocomplete List ---------- */}
                                                      {searchInput.trim() && (
                                                            <ul className="absolute z-50 w-full bg-white border mt-3 max-h-64 overflow-auto rounded-lg shadow-lg
                                                            custom-scrollbar">
                                                                  {visaTypes.flatMap((visa) =>
                                                                        visa.countries.map((country) => ({
                                                                              type: "visa-country",
                                                                              visa,
                                                                              country,
                                                                              label: `${visa.name}-${country.name}`,
                                                                        }))
                                                                  ).filter(item =>
                                                                        item.label.toLowerCase().includes(searchInput.toLowerCase())
                                                                  ).map((item) => (
                                                                        <li
                                                                              key={`${item.visa.id}-${item.country.id}`}
                                                                              className="p-2 cursor-pointer hover:bg-gray-200 flex items-center gap-2"
                                                                              onClick={() => {
                                                                                    router.push(`/${item.visa.slug}/${item.country.slug}`);
                                                                                    setOpenSearch(false);
                                                                                    setSearchInput("");
                                                                              }}
                                                                        >
                                                                              <span className='text-red-700'>{item.visa.name}</span>
                                                                              <span className='text-red-700'>{item.country.name}</span>
                                                                        </li>
                                                                  ))}
                                                            </ul>
                                                      )}
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        )}





                  </nav>


                  {/**********  Mobile Menu Hamberger *******/}

                  <div
                        className={`fixed mobile-menu inset-x-0 top-30 md:top-32 border-t-2 border-red-600 bottom-0 bg-white z-50 overflow-y-auto p-6 transform transition-transform duration-500
    ${isOpen ? "translate-x-0" : "translate-x-full"}`}
                  >

                        {/* لیست اصلی */}
                        {activeMenu === null && (
                              <div className="flex flex-col space-y-4 text-gray-700 font-semibold text-lg">
                                    <Link href="/" className="hover:bg-red-700 hover:text-white p-2 rounded">
                                          خانه
                                    </Link>

                                    {visaTypes.map(menu => (
                                          <button
                                                key={menu.id}
                                                onClick={() => setActiveMenu(menu.slug)}
                                                className="text-right hover:bg-red-700 flex items-center justify-between hover:text-white p-2 rounded"
                                          >

                                                {menu.name}
                                                <ChevronLeft />
                                          </button>
                                    ))}

                                    <Link href="/about" className="hover:bg-red-700 hover:text-white p-2 rounded">
                                          درباره ما
                                    </Link>
                                    <Link href="/contact" className="hover:bg-red-700 hover:text-white p-2 rounded">
                                          تماس با ما
                                    </Link>

                                    <div className="flex items-center absolute bottom-6 left-1/2 -translate-x-1/2 opacity-20  justify-center mb-6">
                                          <Image src="/file.svg" alt="Logo" width={80} height={80} className="rounded-lg pointer-events-none select-none" />
                                    </div>

                              </div>
                        )}

                        {/********** زیرمنوها **********/}

                        {visaTypes.map(menu => (
                              activeMenu === menu.slug &&
                              <div key={menu.id} className="flex flex-col space-y-4 text-gray-700 font-semibold text-lg">
                                    <button onClick={() => setActiveMenu(null)} className="flex items-center text-red-700 font-bold mb-4">
                                          <ArrowRight className="ml-2" /> برگشت
                                    </button>
                                    {menu.countries.map(sub => (
                                          <Link key={sub.id} href={`/${menu.slug}/${sub.slug}`} className="flex items-center gap-2 hover:bg-red-700 hover:text-white p-2 rounded">
                                                <img
                                                      src={
                                                            sub.flagUrl ??
                                                            `https://flagcdn.com/w20/${sub.countryCode.toLowerCase()}.png`
                                                      }
                                                      alt={`${sub.name} flag`}
                                                      className="w-5 h-4 object-cover rounded-sm"
                                                />
                                                {sub.name}
                                          </Link>
                                    ))}
                              </div>
                        ))}

                  </div>
            </div>
      )
}
