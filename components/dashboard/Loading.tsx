import { useEffect, useState } from "react";

export default function Loading() {
  const [dots, setDots] = useState("");
  const [loading, setLoading] = useState(true);

  // انیمیشن نقطه‌ها
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 300);
    return () => clearInterval(interval);
  }, []);

  // شبیه‌سازی تاخیر لود صفحه
  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 5000); // ۵ ثانیه تاخیر
    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return (
      <p className="flex items-center justify-center h-screen text-xl">
        در حال بارگذاری{dots}
      </p>
    );
  }

  return <p className="flex items-center justify-center h-screen text-xl">صفحه لود شد!</p>;
}
