// // src/components/i18n/LocalizedTitle.tsx
// "use client";

// import * as React from "react";
// import { translateProductTitle } from "@/lib/titleTranslate";

// // Agar loyihada o'z hook'ingiz bo'lsa, shuni ishlating.
// // Quyidagi minimal variant fallback sifatida:
// function useLang() {
//   // 1) Agar sizda i18n Provider bo'lsa: const { lang } = useI18n();
//   // 2) Yoki Next params: const params = useParams(); const lang = params?.lang ?? "ru";
//   // Hozircha window.location dan taxmin qilamiz (soddaroq usul):
//   if (typeof window !== "undefined") {
//     const m = window.location.pathname.match(/^\/(uz|ru)(\/|$)/i);
//     if (m?.[1]) return m[1].toLowerCase();
//   }
//   return "ru";
// }

// export default function LocalizedTitle({ text }: { text?: string }) {
//   const lang = useLang();
//   const shown = translateProductTitle(text, lang);
//   return <>{shown}</>;
// }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

// src/components/i18n/LocalizedTitle.tsx
"use client";

import * as React from "react";
import { useI18n } from "@/components/i18n/I18nProvider";
import { translateProductTitle } from "@/lib/titleTranslate";

export default function LocalizedTitle({ text }: { text?: string }) {
  const { lang } = useI18n() as any;
  const src = text ?? "";
  const shown = lang === "uz" ? translateProductTitle(src, "uz") : src;
  return <>{shown}</>;
}
