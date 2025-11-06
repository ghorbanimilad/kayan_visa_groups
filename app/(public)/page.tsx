import dynamic from "next/dynamic";
import { Metadata } from "next";

// ---------- کامپوننت‌هایی که بالا صفحه هستند ----------
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";

// ---------- کامپوننت‌های پایین صفحه (lazy load) ----------
const OurServices = dynamic(() => import("@/components/OurServices"));
const Introduction = dynamic(() => import("@/components/Introduction"));
const ImageSlider = dynamic(() => import("@/components/ImageSlider"));
const OurExperince = dynamic(() => import("@/components/OurExperince"));
const CountrySlider = dynamic(() => import("@/components/CountrySlider"));
const VisaStudio = dynamic(() => import("@/components/VisaStudio"));
const LetterAccept = dynamic(() => import("@/components/LetterAccept"));

// ---------- متادیتا ----------
export const metadata: Metadata = {
  title: "موسسه مهاجرتی کایان | مشاوره تخصصی مهاجرت و اخذ ویزا",
  description:
    "موسسه مهاجرتی کایان با تیمی حرفه‌ای در زمینه ویزا، اقامت دائم، تحصیلی و کاری، بهترین راه مهاجرت را برای شما طراحی می‌کند. مشاوره رایگان و خدمات تضمینی.",
  keywords:
    "موسسه مهاجرتی کایان, ویزای تحصیلی, ویزای کاری, اقامت دائم, مهاجرت به کانادا, ویزای شینگن, مشاوره مهاجرتی",
  authors: [{ name: "Kayan Immigration" }],
  openGraph: {
    title: "موسسه مهاجرتی کایان | مشاوره تخصصی مهاجرت و اخذ ویزا",
    description:
      "خدمات مهاجرتی حرفه‌ای شامل ویزای کاری، تحصیلی و اقامت دائم با موسسه کایان.",
    url: "https://kayanimmigration.com",
    siteName: "کایان مهاجرت",
    images: [
      {
        url: "https://kayanimmigration.com/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Kayan Immigration",
      },
    ],
    locale: "fa_IR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "موسسه مهاجرتی کایان | مشاوره مهاجرت و ویزا",
    description: "کایان، همراه شما در مسیر مهاجرت و دریافت ویزا.",
    images: ["https://kayanimmigration.com/images/og-image.jpg"],
  },
  alternates: {
    canonical: "https://kayanimmigration.com",
  },
};


// ---------- صفحه اصلی ----------
export default function HomePage() {
  return (
    <div className="overflow-hidden">
      <HeroSection />
      <AboutSection />

      <OurServices />
      <Introduction />
      <ImageSlider />
      <OurExperince />
      <CountrySlider />
      <VisaStudio />
      <LetterAccept />
    </div>
  );
}
