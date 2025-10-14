"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white"
    >
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-lg mb-8">صفحه مورد نظر یافت نشد.</p>
      <Link
        href="/"
        className="bg-white text-gray-900 px-6 py-3 rounded-xl font-medium hover:bg-gray-200 transition"
      >
        بازگشت به صفحه اصلی
      </Link>
    </motion.div>
  );
}
