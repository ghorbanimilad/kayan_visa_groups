
import AboutSection from "@/components/AboutSection";
import CountrySlider from "@/components/CountrySlider";
import HeroSection from "@/components/HeroSection";
import ImageSlider from "@/components/ImageSlider";
import Introduction from "@/components/Introduction";
import LetterAccept from "@/components/LetterAccept";
import OurExperince from "@/components/OurExperince";
import OurServices from "@/components/OurServices";
import VisaStudio from "@/components/VisaStudio";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "موسسه مهاجرتی کایان | مشاوره و ویزای مهاجرتی",
  description: "موسسه مهاجرتی کایان، ارائه خدمات ویزا، مشاوره مهاجرت، وکیل مهاجرتی و ویزای استارت‌آپ با تجربه حرفه‌ای.",
  keywords: "ویزا, مشاوره مهاجرتی, وکیل مهاجرتی, سایت مهاجرتی, ویزای کار, موسسه مهاجرتی, مهاجرت, اقامت, ویزای شینگن, ویزای استارت آپ",
  authors: [{ name: "موسسه مهاجرتی کایان" }],
  openGraph: {
    title: "موسسه مهاجرتی کایان | مشاوره و ویزای مهاجرتی",
    description: "مشاوره مهاجرت و ویزا با موسسه کایان، تجربه‌ای حرفه‌ای و خدمات تخصصی برای مهاجرت.",
    url: "https://yourwebsite.com",
    siteName: "کایان",
    images: [
      {
        url: "https://yourwebsite.com/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "موسسه مهاجرتی کایان",
      },
    ],
    locale: "fa_IR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "موسسه مهاجرتی کایان | مشاوره و ویزای مهاجرتی",
    description: "مشاوره و خدمات ویزا با موسسه کایان",
    images: ["https://yourwebsite.com/images/og-image.jpg"],
  },
};


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
