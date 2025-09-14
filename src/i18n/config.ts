  // import { dictionaries, type Lang } from "./dictionaries";

  // export function getInitialLang(): Lang {
  //   if (typeof window === "undefined") return "ru";
  //   const saved = (localStorage.getItem("lang") || "ru") as Lang;
  //   return saved === "uz" ? "uz" : "ru";
  // }

  // export function formatCurrency(n: number, lang: Lang) {
  //   const locale = lang === "uz" ? "uz-UZ" : "ru-RU";
  //   return new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(n);
  // }


  // src/i18n/config.ts

  // export type Lang = "ru" | "uz";

  // export const supportedLangs: Lang[] = ["ru", "uz"];

  // // Pastdagi nom aynan `defaultLang` bo‘lsin — layout.tsx shu nomni import qilyapti
  // export const defaultLang: Lang = "ru";

  // // Foydali helper: cookie/paramdan tilni tekshiradi
  // export function getInitialLang(candidate?: string): Lang {
  //   const c = (candidate || "").toLowerCase();
  //   return supportedLangs.includes(c as Lang) ? (c as Lang) : defaultLang;
  // }
  // src/i18n/config.ts
  // export type Lang = "ru" | "uz";
  // export const defaultLang: Lang = "ru";
  // export const locales: Lang[] = ["ru","uz"];
  // export const getInitialLang = (): Lang => defaultLang;

  // // Narx formatlash — siz bunga Layout/Header ichida murojaat qilyapsiz
  // export function formatCurrency(n: number, lang: Lang): string {
  //   try {
  //     const locale = lang === "uz" ? "uz-UZ" : "ru-RU";
  //     return new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(n);
  //   } catch {
  //     return String(n);
  //   }
  // }


  // src/i18n/config.ts

  export type Lang = "ru" | "uz";

  export const i18n_locales: Lang[] = ["ru", "uz"];
  export const DEFAULT_LANG: Lang = "ru";

  // backward-compat (ixtiyoriy)
  export const defaultLang = DEFAULT_LANG;
  export const i18n = {
    locales: i18n_locales,
    defaultLocale: DEFAULT_LANG,
  };

  export function getInitialLang(): Lang {
    return DEFAULT_LANG;
  }

  export function isLang(val: unknown): val is Lang {
    return typeof val === "string" && (val === "ru" || val === "uz");
  }

  /** Narx formatlagich.
   *  withSymbol=false bo‘lsa — faqat 1 234 567 ko‘rinishida qaytaradi.
   *  withSymbol=true bo‘lsa — valyuta belgisi bilan: ₸ / so‘m.
   */
  export function formatCurrency(
    value: number | string,
    lang: Lang = DEFAULT_LANG,
    opts: { withSymbol?: boolean; currency?: string } = {}
  ): string {
    const n = Number(value) || 0;
    const locale = lang === "uz" ? "uz-UZ" : "ru-KZ";
    const { withSymbol = false, currency } = opts;

    try {
      if (withSymbol) {
        const cur = currency ?? (lang === "uz" ? "UZS" : "KZT");
        return new Intl.NumberFormat(locale, {
          style: "currency",
          currency: cur,
          maximumFractionDigits: 0,
        }).format(n);
      }
      return new Intl.NumberFormat(locale, {
        maximumFractionDigits: 0,
      }).format(n);
    } catch {
      return `${Math.round(n)}`;
    }
  }

