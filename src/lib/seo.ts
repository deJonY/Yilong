// // src/lib/seo.ts
// import type { Metadata } from "next";

// const SITE_NAME = "YiLong";
// const SITE_URL = "https://yilong.uz"; // <-- domeningiz
// const DEFAULT_TITLE = "YiLong — Reklama materiallari va uskunalari";
// const DEFAULT_DESC =
//   "YiLong: list va rulonli materiallar, LED manbalar, uskunalar va boshqalar. Tez yetkazib berish va sifatli servis.";

// export type CreateSeoOptions = {
//   title?: string;
//   description?: string;
//   canonical?: string; // path yoki absolute URL
//   images?: Array<{ url: string; width?: number; height?: number; alt?: string }>;
//   keywords?: string[];
// };

// export function absoluteUrl(path = "") {
//   if (/^https?:\/\//.test(path)) return path;
//   const p = path.startsWith("/") ? path : `/${path}`;
//   return `${SITE_URL}${p}`;
// }

// export function createSeo(opts: CreateSeoOptions = {}): Metadata {
//   const title = opts.title || DEFAULT_TITLE;
//   const description = opts.description || DEFAULT_DESC;
//   const canonical = absoluteUrl(opts.canonical || "/");
//   const images = (opts.images?.length ? opts.images : [{ url: absoluteUrl("/og.jpg") }]).map(
//     (it) => ({ url: absoluteUrl(it.url), width: it.width, height: it.height, alt: it.alt })
//   );

//   return {
//     metadataBase: new URL(SITE_URL),
//     title,
//     description,
//     applicationName: SITE_NAME,
//     keywords: opts.keywords,
//     alternates: {
//       canonical,
//     },
//     openGraph: {
//       type: "website",
//       url: canonical,
//       siteName: SITE_NAME,
//       title,
//       description,
//       images,
//     },
//     twitter: {
//       card: "summary_large_image",
//       site: "@yilong_uz", // bor bo'lsa
//       creator: "@yilong_uz",
//       title,
//       description,
//       images: images.map((i) => i.url),
//     },
//     icons: {
//       icon: [
//         { url: "/favicon.ico" },
//         { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
//         { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
//       ],
//       apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
//     },
//     other: {
//       "theme-color": "#ffffff",
//     },
//   };
// }

