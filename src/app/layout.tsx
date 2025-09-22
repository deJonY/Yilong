// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { I18nProvider } from "@/components/i18n/I18nProvider";
import { getDictionary } from "@/i18n/dictionaries";
import { DEFAULT_LANG, type Lang } from "@/i18n/config";

// --- SEO metadata (faqat qo'shimcha) ---
export const metadata: Metadata = {
  metadataBase: new URL("https://yilong.uz"),
  title: {
    default: "YiLong.uz — Tashqi reklama materiallari, PVX, akril, banner, LED, profillar",
    template: "%s | YiLong.uz",
  },
  description:
    "YiLong.uz — tashqi reklama uchun materiallar: PVX, akril (orgsteklo), banner matolari, laminatsiya plyonkalari, rangli vinil, LED modullar, alyuminiy profillar, elimlar va anjomlar. Tez yetkazib berish va sifat kafolati.",
  applicationName: "YiLong.uz",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  keywords: [
    // Uzbek
    "tashqi reklama materiallari",
    "PVX",
    "akril",
    "orgsteklo",
    "banner matosi",
    "laminatsiya plyonkasi",
    "rangli vinil",
    "LED modul",
    "alyuminiy profil",
    "elim",
    "anjomlar",
    "reklama uskunalari",
    // Russian
    "материалы для наружной рекламы",
    "ПВХ",
    "акрил",
    "оргстекло",
    "баннерная ткань",
    "пленки для ламинирования",
    "цветная виниловая пленка",
    "LED модули",
    "алюминиевые профили",
    "клей",
    "инструменты",
  ],
  authors: [{ name: "YiLong" }],
  creator: "YiLong",
  publisher: "YiLong",
  category: "ecommerce",
  alternates: {
    canonical: "/",
    // Agar /uz segmentingiz bo'lsa, kerak bo'lsa keyin qo'shasiz:
    // languages: { ru: "/", uz: "/uz" },
  },
  openGraph: {
    type: "website",
    url: "https://yilong.uz",
    siteName: "YiLong.uz",
    title: "YiLong.uz — Tashqi reklama materiallari",
    description:
      "PVX, akril, banner, laminatsiya, rangli vinil, LED modullar, alyuminiy profillar va ko‘proq. Sifat va tez yetkazib berish.",
    images: [
      {
        url: "/og.jpg", // mavjud bo'lsa; bo'lmasa keyin qo'shib qo'yasiz
        width: 1200,
        height: 630,
        alt: "YiLong.uz — tashqi reklama materiallari",
      },
    ],
    locale: "ru_RU", // asosiy tilingiz ru bo'lgani uchun
    alternateLocale: ["uz_UZ"],
  },
  twitter: {
    card: "summary_large_image",
    title: "YiLong.uz — Tashqi reklama materiallari",
    description:
      "PVX, akril (orgsteklo), banner matolari, laminatsiya plyonkalari, rangli vinil, LED modullar, alyuminiy profillar, elimlar va asboblar.",
    images: ["/og.jpg"], // mavjud bo'lsa
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" }, // bo'lsa
    ],
    apple: [{ url: "/apple-touch-icon.png" }], // bo'lsa
  },
  manifest: "/site.webmanifest", // bo'lsa
  formatDetection: {
    telephone: true,
    email: true,
    address: false,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const initialLang: Lang = DEFAULT_LANG;        // "ru"
  const initialDict = getDictionary(initialLang); // sync obyekt

  return (
    <html lang={initialLang}>
      <body>
        <I18nProvider initialLang={initialLang} initialDict={initialDict}>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
