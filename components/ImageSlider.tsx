"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";
import { motion } from "framer-motion"

export default function ImageSlider() {
  const images = [
    "/images/pic2.jpg",
    "/images/pic1.jpg",
    "/images/pic4.jpg",
    "/images/pic3.jpg",
    "/images/pic5.jpg",
    "/images/pic6.jpg",
    "/images/pic7.jpg",
    "/images/pic8.jpg",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="w-full min-h-[450px] flex items-center px-4">
      <Swiper
        modules={[Autoplay]}
        loop={true}
        spaceBetween={20}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          0: { slidesPerView: 3 },   // موبایل
          640: { slidesPerView: 4 }, // تبلت
          1024: { slidesPerView: 5 } // دسکتاپ
        }}
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className={`w-full rounded-lg transition-transform duration-500 ${index % 2 === 0 ? "h-50" : "h-56"
                } object-cover`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
}
