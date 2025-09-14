// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // ⚠️ Next 13+ da SWC minifier default yoqilgan, shu sabab `swcMinify` kaliti keraksiz va ogohlantirish beradi.
  // swcMinify: true,

  images: {
    // Firebase storage va boshqa tashqi hostlardan rasm yuklashga ruxsat
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
      // Agar xohlasangiz aniq domenlarni ko'rsatsangiz ham bo'ladi, masalan:
      // { protocol: "https", hostname: "firebasestorage.googleapis.com" },
      // { protocol: "https", hostname: "yilong-datebase.firebasestorage.app" },
    ],
  },

  // Sizdagidek — build paytida ESLint/TS xatolarini to'smaslik uchun:
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
