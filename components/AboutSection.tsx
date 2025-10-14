"use client";
import React from "react";
import Image from "next/image";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { motion, useAnimation, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const stats = [
      { value: 90, label: "رضایت مشتری" },
      { value: 65, label: "راهکارهای فناوری واقعی" },
];

export default function AboutSection() {
      return (
            <section className="relative py-20 bg-white mx-2">
                  <div className="mx-auto px-6 md:px-4 grid grid-cols-1 lg:grid-cols-2  gap-12">
                        {/* بخش متن */}
                        <motion.div
                              initial={{ opacity: 0, x: 50 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 1 }}
                              className="space-y-5 text-gray-700 "
                        >
                              <motion.h1
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 1 }}
                                    viewport={{ once: true }}
                                    className="text-md mb-2 text-red-500">
                                    درباره موسسه ما
                              </motion.h1>
                              <motion.h2
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 1 }}
                                    viewport={{ once: true }}
                                    className="text-4xl md:text-5xl font-extrabold text-gray-900">
                                    به موسسه مشاوره مهاجرتی کایان خوش آمدید
                              </motion.h2>
                              <p className="text-base leading-relaxed">
                                    موسسه مهاجرتی کایان با سال‌ها تجربه در زمینه ویزا و مهاجرت،
                                    خدمات تخصصی و شفاف به متقاضیان ارائه می‌دهد. هدف ما،
                                    همراهی در تمام مراحل مهاجرت با صداقت و مسئولیت‌پذیری است.
                              </p>

                              <motion.div
                                    initial={{ opacity: 0, y: -50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1 }}
                                    viewport={{ once: true }}
                                    className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {stats.map((stat, idx) => (
                                          <CircularStat key={idx} value={stat.value} label={stat.label} />
                                    ))}
                              </motion.div>


                              <motion.button
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1, delay: 1 }}
                                    viewport={{ once: true }}
                                    className="mt-4 px-6 py-2 bg-rose-600 text-white rounded-lg shadow hover:bg-rose-700 transition">
                                    <Link href="/about" className="flex items-center gap-2">
                                          بیشتر بدانید
                                          <ChevronLeft />
                                    </Link>
                              </motion.button>
                        </motion.div>

                        {/* بخش تصویر */}
                        <div className="relative flex justify-center ">
                              {/* عکس بزرگ‌تر */}
                              <motion.div
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 1 }}
                                    viewport={{ once: true }}
                                    className="relative w-[350px] md:w-[450px] h-[400px] rounded-2xl overflow-hidden shadow-lg"
                              >
                                    <Image
                                          src="/images/pass-1.jpg"
                                          alt="درباره ما"
                                          fill
                                          
                                          className="object-cover rounded-2xl"
                                    />

                                    {/* کادر قرمز بیرون زده */}
                                    <div className="absolute -bottom-6 -left-6 w-18 h-18 bg-rose-500 rounded-md z-0"></div>
                              </motion.div>

                              {/* عکس کوچک‌تر */}
                              <motion.div
                                    initial={{ opacity: 0, y: 60 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1, delay: 0.3 }}
                                    viewport={{ once: true }}
                                    className="absolute bottom-[-40px] right-[40px] w-[200px] md:w-[250px] h-[220px] rounded-2xl overflow-hidden shadow-xl border-4 border-white z-10"
                              >
                                    <Image
                                          src="/images/pass-2.jpg"
                                          alt="درباره ما"
                                          fill
                                          className="object-cover rounded-2xl"
                                    />
                              </motion.div>
                        </div>



                  </div>
            </section>
      );
}


function CircularStat({ value, label }: { value: number; label: string }) {
      const radius = 35;
      const stroke = 4;
      const normalizedRadius = radius - stroke / 2;
      const circumference = normalizedRadius * 2 * Math.PI;

      const [progress, setProgress] = useState(0);
      const ref = useRef(null);
      const inView = useInView(ref, { once: true });

      useEffect(() => {
            if (inView) {
                  let start = 0;
                  const end = value;
                  const duration = 1000; // 1 ثانیه
                  const stepTime = Math.abs(Math.floor(duration / end));

                  const timer = setInterval(() => {
                        start += 1;
                        if (start > end) {
                              clearInterval(timer);
                              start = end;
                        }
                        setProgress(start);
                  }, stepTime);

                  return () => clearInterval(timer);
            }
      }, [inView, value]);

      return (
            <div ref={ref} className="flex items-center space-x-2">
                  <svg
                        height={radius * 2 + stroke}
                        width={radius * 2 + stroke}
                  >
                        <circle
                              stroke="#eee"
                              fill="transparent"
                              strokeWidth={stroke}
                              r={normalizedRadius}
                              cx={radius + stroke / 2}
                              cy={radius + stroke / 2}
                        />
                        <motion.circle
                              stroke="#f43f5e"
                              fill="transparent"
                              strokeWidth={stroke}
                              strokeLinecap="round"
                              r={normalizedRadius}
                              cx={radius + stroke / 2}
                              cy={radius + stroke / 2}
                              strokeDasharray={circumference + " " + circumference}
                              strokeDashoffset={circumference - (progress / 100) * circumference}
                              initial={{ strokeDashoffset: circumference }}
                              animate={{ strokeDashoffset: circumference - (progress / 100) * circumference }}
                              transition={{ duration: 1 }}
                              transform={`rotate(-90 ${radius + stroke / 2} ${radius + stroke / 2})`}
                        />
                        <text
                              x="50%"
                              y="50%"
                              dominantBaseline="middle"
                              textAnchor="middle"
                              className="text-lg font-bold fill-rose-600"
                        >
                              {progress}%
                        </text>
                  </svg>
                  <div>
                        <p className="text-gray-700 font-medium">{label}</p>
                  </div>
            </div>
      );
}
