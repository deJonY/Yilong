// "use client";

// import { useEffect, useState } from "react";
// import { I18nProvider } from "./I18nProvider";
// import { getDictionary } from "@/i18n/dictionaries";
// import { getInitialLang, type Lang } from "@/i18n/config";

// type Props = {
//   initialLang: Lang;
//   initialDict: any;
//   children: React.ReactNode;
// };

// export function ClientProviders({ initialLang, initialDict, children }: Props) {
//   const [lang, setLang] = useState<Lang>(initialLang);
//   const [dict, setDict] = useState(initialDict);

//   useEffect(() => {
//     const m = document.cookie.match(/(?:^|; )lang=([^;]+)/);
//     const cookieLang = m ? decodeURIComponent(m[1]) : undefined;
//     const l = getInitialLang(cookieLang) as Lang;

//     if (l !== lang) {
//       (async () => {
//         setDict(await getDictionary(l));
//         setLang(l);
//       })();
//     }
//   }, []);

//   return <I18nProvider lang={lang} dict={dict}>{children}</I18nProvider>;
// }

/////////////////////////////////////////////////////////////////////////////////////////////////////

// src/components/i18n/ClientProviders.tsx
"use client";
import { createContext, useContext, useMemo, useState } from "react";
import { getDictionary, type Lang } from "@/i18n/dictionaries";

type Ctx = { lang: Lang; t: any; setLang: (l: Lang) => void };

const I18nCtx = createContext<Ctx | null>(null);
export const useI18n = () => useContext(I18nCtx)!;

export function ClientProviders({ lang, dict, children }:{
  lang: Lang; dict: any; children: React.ReactNode;
}) {
  const [curLang, setCurLang] = useState<Lang>(lang);
  const [curDict, setCurDict] = useState(dict);

  const setLang = (l: Lang) => {
    document.cookie = `lang=${l}; path=/; max-age=31536000`;
    setCurLang(l);
    setCurDict(getDictionary(l)); // ✅ sinxron
  };

  const value = useMemo(() => ({ lang: curLang, t: curDict, setLang }), [curLang, curDict]);

  return <I18nCtx.Provider value={value}>{children}</I18nCtx.Provider>;
}
