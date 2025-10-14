"use client"

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const COUNTRIES = [
  {
    id: "canada",
    name: "کانادا",
    flag: "https://flagcdn.com/w80/ca.png",
    paths: ["تحصیلی", "کاری", "اقامت دائم"],
    difficulty: "متوسط",
    language: "انگلیسی / فرانسوی",
    short: "کشوری با برنامه‌های متعدد مهاجرتی و مسیر اکسپرس انتری.",
  },
  {
    id: "germany",
    name: "آلمان",
    flag: "https://flagcdn.com/w80/de.png",
    paths: ["تحصیلی", "کاری"],
    difficulty: "متوسط",
    language: "آلمانی / انگلیسی",
    short: "بازار کار قوی برای مهارت‌های فنی و رشته‌های مهندسی.",
  },
  {
    id: "finland",
    name: "فنلاند",
    flag: "https://flagcdn.com/w80/fi.png",
    paths: ["تحصیلی", "کاری"],
    difficulty: "متوسط",
    language: "انگلیسی / فنلاندی",
    short: "کیفیت زندگی بالا و سیستم آموزشی قوی.",
  },
  {
    id: "netherlands",
    name: "هلند",
    flag: "https://flagcdn.com/w80/nl.png",
    paths: ["تحصیلی", "استارتاپ", "کاری"],
    difficulty: "متوسط",
    language: "انگلیسی / هلندی",
    short: "مناسب استارتاپ‌ها و دانشجویان بین‌المللی.",
  },
  {
    id: "portugal",
    name: "پرتغال",
    flag: "https://flagcdn.com/w80/pt.png",
    paths: ["تحصیلی", "کاری", "سرمایه‌گذاری"],
    difficulty: "متوسط",
    language: "پرتغالی / انگلیسی",
    short: "کشوری با شرایط زندگی مناسب و برنامه‌های مهاجرتی جذاب.",
  },
  {
    id: "oman",
    name: "عمان",
    flag: "https://flagcdn.com/w80/om.png",
    paths: ["کاری", "سرمایه‌گذاری"],
    difficulty: "سخت",
    language: "عربی / انگلیسی",
    short: "بازار کار محدود اما فرصت‌های سرمایه‌گذاری وجود دارد.",
  },
  {
    id: "spain",
    name: "اسپانیا",
    flag: "https://flagcdn.com/w80/es.png",
    paths: ["تحصیلی", "کاری", "اقامت دائم"],
    difficulty: "متوسط",
    language: "اسپانیایی / انگلیسی",
    short: "زندگی با کیفیت، فرهنگ جذاب و برنامه‌های اقامت بلندمدت.",
  },
  {
    id: "italy",
    name: "ایتالیا",
    flag: "https://flagcdn.com/w80/it.png",
    paths: ["تحصیلی", "کاری", "اقامت دائم"],
    difficulty: "متوسط",
    language: "ایتالیایی / انگلیسی",
    short: "کشور تاریخی با فرصت‌های تحصیلی و کاری متنوع.",
  },
  {
    id: "greece",
    name: "یونان",
    flag: "https://flagcdn.com/w80/gr.png",
    paths: ["تحصیلی", "کاری", "سرمایه‌گذاری"],
    difficulty: "متوسط",
    language: "یونانی / انگلیسی",
    short: "جزایر زیبا و برنامه‌های جذاب برای مهاجران و سرمایه‌گذاران.",
  },
  {
    id: "uk",
    name: "انگلستان",
    flag: "https://flagcdn.com/w80/gb.png",
    paths: ["تحصیلی", "کاری", "سرمایه‌گذاری"],
    difficulty: "سخت",
    language: "انگلیسی",
    short: "کشوری با سیستم آموزشی و کاری معتبر و فرصت‌های سرمایه‌گذاری.",
  },
  {
    id: "france",
    name: "فرانسه",
    flag: "https://flagcdn.com/w80/fr.png",
    paths: ["تحصیلی", "کاری", "اقامت دائم"],
    difficulty: "متوسط",
    language: "فرانسوی / انگلیسی",
    short: "فرهنگ غنی و فرصت‌های تحصیلی و کاری در شهرهای بزرگ.",
  },
];

export default function CountryGuideTable() {
      const [query, setQuery] = useState("");
      const [filter, setFilter] = useState("همه");

      const pathways = useMemo(() => {
            const setp = new Set();
            COUNTRIES.forEach((c) => c.paths.forEach((p) => setp.add(p)));
            return ["همه", ...Array.from(setp)];
      }, []);

      const filtered = useMemo(() => {
            return COUNTRIES.filter((c) => {
                  const matchesQuery = c.name.includes(query) || c.short.includes(query);
                  const matchesFilter = filter === "همه" || c.paths.includes(filter);
                  return matchesQuery && matchesFilter;
            });
      }, [query, filter]);

      return (
            <section className="py-12 my-8">
                  <div className="container mx-auto px-6">
                        <div className="text-center mb-8">
                              <motion.h3
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.6 }}
                               className="text-md  text-red-500 font-semibold mb-2">📍 راهنمای انتخاب کشور</motion.h3>
                              <motion.h2 
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.6 }}
                              className="text-2xl md:text-3xl font-bold text-gray-800 mt-1">جدول مقایسه کشورها</motion.h2>
                              <motion.p
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.6 }}
                               className="text-gray-800 mt-4 max-w-xl mx-auto">کشورها را از نظر مسیر مهاجرتی، زبان، سختی و توضیح کوتاه مقایسه کنید.</motion.p>
                        </div>

                        <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.6 }}
                              className="overflow-x-auto rounded-xl border border-white/10"
                        >
                              <table className="min-w-full text-sm text-gray-600">
                                    <thead className="bg-gradient-to-r from-gray-800 to-gray-700 text-gray-100">
                                          <tr>
                                                <th className="py-3 px-4 text-right">پرچم</th>
                                                <th className="py-3 px-4 text-right">کشور</th>
                                                <th className="py-3 px-4 text-right">مسیرها</th>
                                                <th className="py-3 px-4 text-right">زبان</th>
                                                <th className="py-3 px-4 text-right">سختی</th>
                                                <th className="py-3 px-4 text-right">توضیح کوتاه</th>
                                          </tr>
                                    </thead>
                                    <tbody>
                                          {filtered.map((c, idx) => (
                                                <motion.tr
                                                      key={c.id}
                                                      initial={{ opacity: 0, y: 10 }}
                                                      whileInView={{ opacity: 1, y: 0 }}
                                                      viewport={{ once: true }}
                                                      transition={{ delay: idx * 0.08, duration: 0.4 }}
                                                      className="hover:bg-gray-800/40 border-b border-white/5 transition-colors"
                                                >
                                                      <td className="py-3 px-4">
                                                            <div className="w-12 h-9 rounded overflow-hidden">
                                                                  <Image src={c.flag} alt={c.name} width={120} height={120} className="object-contain" />
                                                            </div>
                                                      </td>
                                                      <td className="py-3 px-4 font-semibold text-gray-600">{c.name}</td>
                                                      <td className="py-3 px-4">
                                                            <div className="flex flex-wrap gap-2">
                                                                  {c.paths.map((p) => (
                                                                        <span key={p} className="bg-white/5 text-gray-600 px-3 py-1 rounded-full text-xs">{p}</span>
                                                                  ))}
                                                            </div>
                                                      </td>
                                                      <td className="py-3 px-4">{c.language}</td>
                                                      <td className="py-3 px-4 text-red-500 font-semibold">{c.difficulty}</td>
                                                      <td className="py-3 px-4">{c.short}</td>
                                                </motion.tr>
                                          ))}
                                    </tbody>
                              </table>
                        </motion.div>
                  </div>
            </section>
      );
}
