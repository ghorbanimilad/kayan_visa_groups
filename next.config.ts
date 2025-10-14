import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**", // اجازه تمام مسیرهای زیر دامنه
      },
      {
        protocol: "https",
        hostname: "flagcdn.com",
        pathname: "/w80/**", // اجازه تمام مسیرهای زیر دامنه
      }
      ,
      {
        protocol: "https",
        hostname: "flagcdn.com",
        pathname: "/w100/**", // اجازه تمام مسیرهای زیر دامنه
      }
    ],
  },
};

export default nextConfig;
