// app/layout.tsx
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Script from "next/script";

const iranSans = localFont({
  src: "../public/fonts/IRANSansWeb.woff2",
  variable: "--font-iran-sans",
  display: "swap",
});

// ✅ متادیتای اصلی سایت
export const metadata: Metadata = {
  title: {
    template: "%s | موسسه مهاجرتی کایان",
    default: "موسسه مهاجرتی کایان",
  },
  description:
    "موسسه مهاجرتی کایان با تیم مجرب در زمینه مهاجرت، ویزا و مشاوره تخصصی.",
  keywords:
    "مهاجرت, ویزا, مشاوره, موسسه کایان, وکیل مهاجرتی, ویزای استارت آپ",
  authors: [{ name: "موسسه کایان", url: "https://yourwebsite.com" }],
  creator: "موسسه کایان",
  robots: "index, follow",
  openGraph: {
    title: "موسسه مهاجرتی کایان",
    description:
      "تیم مجرب موسسه کایان در زمینه مهاجرت، ویزا و مشاوره تخصصی",
    url: "https://yourwebsite.com",
    siteName: "موسسه مهاجرتی کایان",
    locale: "fa_IR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "موسسه مهاجرتی کایان",
    description: "تیم مجرب موسسه کایان در زمینه مهاجرت و ویزا",
    site: "@YourTwitterHandle",
    creator: "@YourTwitterHandle",
  },
};

// ✅ تعریف صحیح viewport در Next.js جدید
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#ffffff",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${iranSans.variable} antialiased`}>
        <main>{children}</main>

        <Toaster position="top-center" />

        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "موسسه مهاجرتی کایان",
              url: "https://yourwebsite.com",
              logo: "https://yourwebsite.com/logo.png",
              sameAs: [
                "https://www.instagram.com/Kayan_immigrationco",
                "https://www.linkedin.com/company/yourcompany",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                telephone: ["+982188881158", "+982188886359"],
                address: {
                  "@type": "PostalAddress",
                  streetAddress:
                    "تهران، خ ولیعصر، بالاتر از پارک ساعی، مجتمع صدف، طبقه ۷، واحد ۱",
                  addressLocality: "تهران",
                  addressCountry: "IR",
                },
                contactType: "customer service",
                areaServed: "IR",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
