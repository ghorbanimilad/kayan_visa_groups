"use client"
import { useInView } from "react-intersection-observer"
import CountUp from "react-countup"
import Image from "next/image"
import { motion } from "framer-motion"

function toPersianNumber(num: number) {
      return num.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d, 10)]);
}

export default function OurExperince() {
      const { ref, inView } = useInView({ triggerOnce: true });

      return (
            <div className="relative  my-30 flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 py-12 md:py-20 overflow-visible">
                  {/* Container اصلی */}
                  <div className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-12 gap-8 relative">

                        {/* بخش آمار */}
                        <div
                              ref={ref}
                              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 flex-1 text-center z-10"
                        >
                              <motion.div
                              initial={{ opacity: 0, y: 50 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: 0.7 }}
                              className="space-y-2 flex flex-col items-center">
                                    <span className="bg-red-800 text-white px-3 py-1 rounded-xl text-2xl inline-block min-w-[24px] text-center">
                                          {inView && (
                                                <>
                                                      <CountUp
                                                            start={0}
                                                            end={13}
                                                            duration={4}
                                                            formattingFn={toPersianNumber}
                                                      />

                                                      +
                                                </>
                                          )}
                                    </span>
                                    <h3 className="text-xl md:text-2xl font-semibold text-white">

                                          سال تجربه
                                    </h3>
                                    <p className="text-sm text-gray-300">
                                          مشاوره تخصصی در زمینه مهاجرت
                                    </p>
                              </motion.div>

                              <motion.div 
                              initial={{ opacity: 0, y: -50 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: 0.7 }}
                              className="space-y-2 flex flex-col items-center">
                                    <span className="bg-red-800 text-white px-3 py-1 rounded-xl text-2xl inline-block min-w-[24px] text-center">
                                          {inView && (
                                                <>
                                                      <CountUp
                                                            start={0}
                                                            end={2000}
                                                            duration={2}
                                                            formattingFn={toPersianNumber}
                                                      />

                                                      +
                                                </>
                                          )}
                                    </span>
                                    <h3 className="text-xl md:text-2xl font-semibold text-white">

                                          پرونده موفق
                                    </h3>
                                    <p className="text-sm text-gray-300">در اروپا و کانادا</p>
                              </motion.div>

                              <motion.div
                              initial={{ opacity: 0, y: 50 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: 0.7 }}
                              className="space-y-2 flex flex-col items-center">
                                    <span className="bg-red-800 text-white px-3 py-1 rounded-xl text-2xl inline-block min-w-[24px] text-center">
                                          {inView && (
                                                <>
                                                      <CountUp
                                                            start={0}
                                                            end={2}
                                                            duration={2}
                                                            formattingFn={toPersianNumber}
                                                      />

                                                      +
                                                </>
                                          )}
                                    </span>
                                    <h3 className="text-xl md:text-2xl font-semibold text-white">
                                          شعبه فعال
                                    </h3>
                                    <p className="text-sm text-gray-300">در ایران، کانادا</p>
                              </motion.div>
                        </div>


                        {/* بخش تصویر */}
                        <motion.div
                              initial={{ opacity: 0, x: -50 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: 0.7 }}
                              className="relative flex-1 flex mb-40 md:mb-0 justify-center md:justify-end items-center">
                              {/* عکس خارج از مرز سکشن */}
                              <div className="absolute top-0 md:top-0 -translate-y-1/2  w-72 h-72 md:w-[420px] md:h-[420px] z-20">
                                    <Image
                                          src="/images/headphone.jpg"
                                          alt="تجربه ما"
                                          fill
                                          className="object-cover rounded-2xl shadow-2xl "
                                    />
                              </div>
                        </motion.div>

                  </div>
            </div>
      );
}
