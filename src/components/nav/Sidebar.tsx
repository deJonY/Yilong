// "use client";

// import { ChevronRight, ChevronDown } from "lucide-react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useEffect, useMemo, useState } from "react";
// import { CATALOG } from "@/lib/catalog";
// import { useI18n } from "@/components/i18n/I18nProvider";

// /* =========================================================
//  * 1) SECTION/CATEGORY aliastari (ko‘p uchraydigan variantlar)
//  * ======================================================= */
// const SECTION_ID_ALIASES: Record<string, string> = {
//   // qisqa yoki noto‘liq variantlar → kanonik
//   "reklamno-vystavochnoe": "reklamnoe-i-vystavochnoe-oborudovanie",
//   "reklamno-vystavochnoe-oborudovanie": "reklamnoe-i-vystavochnoe-oborudovanie",

//   "alyuminievye-profily": "alyuminievye-profili",
//   "alyuminievye-profilya-i-komplektuyushchie": "alyuminievye-profili",

//   "metal-i-plast-furnitura": "metallicheskaya-i-plastiknaya-furnitura",

//   // yozilish variantlari
//   "rulon-materialy": "rulonnye-materialy",
//   "rulon_materialy": "rulonnye-materialy",
//   "rulonnyye-materialy": "rulonnye-materialy",
//   "rulonnie-materialy": "rulonnye-materialy",

//   // kanonik nomlar (o‘zini-o‘zi)
//   "rulonnye-materialy": "rulonnye-materialy",
//   "istochniki-sveta": "istochniki-sveta",
//   "transformatory-i-upravlenie": "transformatory-i-upravlenie",
//   "chernila-kraski": "chernila-kraski",
//   "kleevye-resheniya": "kleevye-resheniya",
//   "instrumenty": "instrumenty",
//   "frezy-i-gravery": "frezy-i-gravery",
//   "listovye-materialy": "listovye-materialy",
// };

// const CATEGORY_ID_ALIASES: Record<string, Record<string, string>> = {
//   "rulonnye-materialy": {
//     "bannernaya-tkan": "bannernaya-tkan",
//     "materialy-dlya-pechati": "materialy-dlya-pechati",
//     "tentovaya-tkan": "tentovaya-tkan",
//     "plenki-dlya-laminirovaniya": "plenki-dlya-laminirovaniya",
//     "montazhnye-plenki": "montazhnye-plenki",
//     "vitrazhnye-plenki": "vitrazhnye-plenki",
//     "magnitnyy-vinil": "magnitnyy-vinil",
//     "oboi-dlya-pechati": "oboi-dlya-pechati",

//     // rangli vinil uchun ko‘p yozilishlar
//     "tsvetnaya-samokleyushchayasya-plenka": "tsvetnaya-samokleyushchayasya-plenka",
//     "tsvetnaya-samokleyushchaya-plenka": "tsvetnaya-samokleyushchayasya-plenka",

//     // qisqa/variant ID lar
//     "banner-tkan": "bannernaya-tkan",
//     "oboi-pechati": "oboi-dlya-pechati",
//     "plenki-laminirovaniya": "plenki-dlya-laminirovaniya",
//     "montazhnyye-plenki": "montazhnye-plenki",
//     "magnitnyj-vinil": "magnitnyy-vinil",
//     "tent-tkan": "tentovaya-tkan",
//   },

//   "istochniki-sveta": {
//     "led-prozhektory": "led-prozhektory",
//     "moduli-svetodiodnye": "moduli-svetodiodnye",
//     "svetodiodnye-lenty": "svetodiodnye-lenty",
//     "led-prozhektory-sofity": "led-prozhektory",
//     "svetodiodnye-lenty-led": "svetodiodnye-lenty",
//   },

//   "transformatory-i-upravlenie": {
//     "transformatory-vnutrennie": "transformatory-vnutrennie",
//     "kontrollery-dimmeri": "kontrollery-dimmeri",
//     "chernila-kraski": "chernila-kraski",
//   },

//   "chernila-kraski": {
//     "solventnye-kraski": "solventnye-kraski",
//     "ekosolventnye-kraski": "ekosolventnye-kraski",
//     solvent: "solventnye-kraski",
//     ecosolvent: "ekosolventnye-kraski",
//   },

//   "reklamnoe-i-vystavochnoe-oborudovanie": {
//     "pop-up-stendy": "pop-up-stendy",
//     "x-konstruktsii": "x-konstruktsii",
//     "roll-stendy": "roll-stendy",
//     "promostoly": "promostoly",
//     "flagi": "flagi",
//     "posm-materialy": "posm-materialy",

//     // ba’zan alyuminiy bo‘limidagi punktlar shu yerga kelib qoladi
//     "profily-alyuminievye": "profili-alyuminievye",
//     "komplektuyushchie-dlya-profilya": "komplektuyushchie-dlya-profily",
//     "profil-dlya-lent": "alyuminievye-profili-dlya-svetodiodnyh-lent",
//   },

//   "alyuminievye-profili": {
//     "profily-alyuminievye": "profili-alyuminievye",
//     "profili-alyuminievye": "profili-alyuminievye",
//     "komplektuyushchie-dlya-profily": "komplektuyushchie-dlya-profily",
//     "komplektuyushchie-dlya-profilya": "komplektuyushchie-dlya-profily",
//     "alyuminievye-profili-dlya-svetodiodnyh-lent": "alyuminievye-profili-dlya-svetodiodnyh-lent",
//     "profil-dlya-lent": "alyuminievye-profili-dlya-svetodiodnyh-lent",
//   },

//   "kleevye-resheniya": {
//     "klei": "klei",
//     "skotch": "klei", // i18n kalitlarda odatda faqat "klei"
//   },

//   "metallicheskaya-i-plastiknaya-furnitura": {
//     "kaima-plastiknaya": "kaima-plastiknaya",
//     "kajma-plastikovaya": "kaima-plastiknaya",
//     "metallicheskaya-furnitura": "metallicheskaya-furnitura",
//     "metal-furnitura": "metallicheskaya-furnitura",
//     "neodimovye-magnity": "neodimovye-magnity",
//   },

//   "instrumenty": {
//     "ruchnye-instrumenty": "ruchnye-instrumenty",
//     "postpechatnye-instrumenty": "postpechatnye-instrumenty",
//   },

//   "frezy-i-gravery": {
//     "frezy": "frezy",
//     "gravery": "gravery",
//   },
// };

// /* =========================================================
//  * 2) Normalizatorlar (oxirgi chora sifatida turli yozilishlar)
//  * ======================================================= */
// function normalizeSectionIdGuess(id: string): string[] {
//   const out = new Set<string>([id]);

//   // underscore ↔ hyphen
//   out.add(id.replace(/_/g, "-"));

//   // rulonli bo‘limning yozilishlari
//   out.add(id.replace(/rulonnyye|rulonnie/gi, "rulonnye"));

//   // “reklamno-vystavochnoe(-oborudovanie)” → to‘liq kanonik nom
//   if (id.startsWith("reklamno-vystavochnoe")) {
//     out.add("reklamnoe-i-vystavochnoe-oborudovanie");
//   }

//   return Array.from(out);
// }

// function normalizeCatIdGuess(id: string): string[] {
//   const variants = new Set<string>([id]);

//   // y/j
//   variants.add(id.replace(/magnitnyj/g, "magnitnyy"));

//   // qisqartma → kanonik
//   variants.add(id.replace(/banner-tkan/g, "bannernaya-tkan"));
//   variants.add(id.replace(/oboi-pechati/g, "oboi-dlya-pechati"));
//   variants.add(id.replace(/plenki-laminirovaniya/g, "plenki-dlya-laminirovaniya"));
//   variants.add(id.replace(/montazhnyye-plenki/g, "montazhnye-plenki"));
//   variants.add(id.replace(/tent-tkan/g, "tentovaya-tkan"));

//   // profily/profili
//   variants.add(id.replace(/profily-alyuminievye/g, "profili-alyuminievye"));

//   // profil-dlya-lent → alyuminievye-profili-dlya-svetodiodnyh-lent
//   variants.add(
//     id.replace(/profil-dlya-lent/g, "alyuminievye-profili-dlya-svetodiodnyh-lent"),
//   );

//   // samokleyushchaya → samokleyushchayasya
//   variants.add(id.replace(/samokleyushchaya(sya)?/g, "samokleyushchayasya"));

//   return Array.from(variants);
// }

// /* =========================================================
//  * 3) I18n helperlar
//  * ======================================================= */
// const canonSectionId = (id: string) => SECTION_ID_ALIASES[id] ?? id;
// const canonCategoryId = (sectionId: string, categoryId: string) => {
//   const s = canonSectionId(sectionId);
//   return CATEGORY_ID_ALIASES[s]?.[categoryId] ?? categoryId;
// };

// export default function Sidebar() {
//   const { t } = useI18n();
//   const pathname = usePathname();
//   const [openId, setOpenId] = useState<string | null>(null);

//   // bir nechta kalitni ketma-ket sinash
//   const trMany = (keys: string[], fallback: string) => {
//     for (const k of keys) {
//       const got = t(k as any);
//       if (got && got !== k) return got;
//     }
//     return fallback;
//   };

//   // SECTION uchun nomzod i18n kalitlari
//   const sectionKeyCandidates = useMemo(() => {
//     return (secId: string) => {
//       const canonical = canonSectionId(secId);
//       const cands = new Set<string>([`catalog.sections.${canonical}.title`]);
//       normalizeSectionIdGuess(canonical).forEach((v) =>
//         cands.add(`catalog.sections.${v}.title`),
//       );
//       return Array.from(cands);
//     };
//   }, []);

//   // CATEGORY uchun nomzod i18n kalitlari
//   const categoryKeyCandidates = useMemo(() => {
//     return (secId: string, catId: string) => {
//       const sCanon = canonSectionId(secId);
//       const cCanon = canonCategoryId(secId, catId);

//       const cands = new Set<string>([
//         `catalog.sections.${sCanon}.categories.${cCanon}`,
//       ]);
//       normalizeCatIdGuess(cCanon).forEach((v) =>
//         cands.add(`catalog.sections.${sCanon}.categories.${v}`),
//       );
//       return Array.from(cands);
//     };
//   }, []);

//   // ochilgan bo‘limni URL’dan aniqlash
//   useEffect(() => {
//     const segs = pathname.split("/").filter(Boolean); // [sectionId, categoryId, ...]
//     setOpenId(segs[0] || null);
//   }, [pathname]);

//   const toggle = (id: string) => setOpenId((p) => (p === id ? null : id));

//   // Kontaktlar (i18n mavjud, ishlayapti)
//   const contacts = [
//     { label: t("sidebar.contact_labels.consultant"), value: "+998 77 268 66 58" },
//     {
//       label: t("sidebar.contact_labels.address"),
//       value: t("sidebar.contacts.address"),
//     },
//     { label: t("sidebar.contact_labels.email"), value: "info@yilong.uz" },
//     { label: t("sidebar.contact_labels.phone"), value: "+998 77 268 66 59" },
//   ];

//   return (
//     <aside className="w-64 bg-white/50 backdrop-blur-sm p-4 min-h-screen hidden md:block">
//       {/* Menu */}
//       <div className="mb-8">
//         <h3 className="bg-blue-800 text-white px-4 py-2 font-semibold">{t("sidebar.menu")}</h3>

//         <div className="bg-white border border-gray-200">
//           {CATALOG.map((sec) => {
//             const secHref = `/${sec.id}`;                // Link o‘zgarmaydi
//             const isOpen = openId === sec.id;
//             const isActive = pathname.startsWith(secHref);

//             const secTitle = trMany(
//               sectionKeyCandidates(sec.id),
//               sec.title || sec.id,                      // i18n topilmasa — CATALOG dagi nom
//             );

//             return (
//               <div key={sec.id} className="border-b border-gray-200 last:border-b-0">
//                 <div className="flex items-center justify-between group">
//                   <Link
//                     href={secHref}
//                     className={`flex-grow px-4 py-3 text-left hover:bg-gray-50 text-sm ${
//                       isActive ? "bg-blue-50 text-blue-700 font-medium" : ""
//                     }`}
//                   >
//                     {secTitle}
//                   </Link>

//                   {!!sec.categories?.length && (
//                     <button
//                       className="h-full px-4 py-3 hover:bg-gray-50 flex items-center justify-center"
//                       onClick={() => toggle(sec.id)}
//                       aria-label="toggle"
//                     >
//                       {isOpen ? (
//                         <ChevronDown className="w-4 h-4 text-gray-600" />
//                       ) : (
//                         <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
//                       )}
//                     </button>
//                   )}
//                 </div>

//                 {isOpen && !!sec.categories?.length && (
//                   <div className="bg-gray-100 p-2">
//                     {sec.categories.map((cat) => {
//                       const catHref = `/${sec.id}/${cat.id}`; // Link o‘zgarmaydi
//                       const catActive = pathname.startsWith(catHref);

//                       const catTitle = trMany(
//                         categoryKeyCandidates(sec.id, cat.id),
//                         cat.title || cat.id,
//                       );

//                       return (
//                         <Link
//                           key={cat.id}
//                           href={catHref}
//                           className={`block px-4 py-2 text-sm rounded ${
//                             catActive
//                               ? "bg-blue-100 text-blue-700 font-medium"
//                               : "text-gray-700 hover:bg-gray-200"
//                           }`}
//                         >
//                           {catTitle}
//                         </Link>
//                       );
//                     })}
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* Contacts (sticky) */}
//       <div className="relative sticky top-5 mt-0">
//         <h3 className="bg-blue-800 text-white px-4 py-2 font-semibold">
//           {t("sidebar.contacts_title")}
//         </h3>

//         <div className="bg-white border border-gray-200 p-4">
//           {contacts.map((c, i) => (
//             <div key={i} className="mb-3 last:mb-0">
//               <div className="text-sm font-medium text-gray-700">{c.label}</div>
//               <div className="text-sm text-gray-600">{c.value}</div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </aside>
//   );
// }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

"use client";

import { ChevronRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { CATALOG } from "@/lib/catalog";
import { useI18n } from "@/components/i18n/I18nProvider";

/* =========================================================
 * 1) SECTION/CATEGORY aliastari (ko‘p uchraydigan variantlar)
 * ======================================================= */
const SECTION_ID_ALIASES: Record<string, string> = {
  // qisqa yoki noto‘liq variantlar → kanonik
  "reklamno-vystavochnoe": "reklamnoe-i-vystavochnoe-oborudovanie",
  "reklamno-vystavochnoe-oborudovanie": "reklamnoe-i-vystavochnoe-oborudovanie",

  "alyuminievye-profily": "alyuminievye-profili",
  "alyuminievye-profilya-i-komplektuyushchie": "alyuminievye-profili",

  "metal-i-plast-furnitura": "metallicheskaya-i-plastiknaya-furnitura",

  // yozilish variantlari
  "rulon-materialy": "rulonnye-materialy",
  "rulon_materialy": "rulonnye-materialy",
  "rulonnyye-materialy": "rulonnye-materialy",
  "rulonnie-materialy": "rulonnye-materialy",

  // kanonik nomlar (o‘zini-o‘zi)
  "rulonnye-materialy": "rulonnye-materialy",
  "istochniki-sveta": "istochniki-sveta",
  "transformatory-i-upravlenie": "transformatory-i-upravlenie",
  "chernila-kraski": "chernila-kraski",
  "kleevye-resheniya": "kleevye-resheniya",
  "instrumenty": "instrumenty",
  "frezy-i-gravery": "frezy-i-gravery",
  "listovye-materialy": "listovye-materialy",
};

const CATEGORY_ID_ALIASES: Record<string, Record<string, string>> = {
  "rulonnye-materialy": {
    "bannernaya-tkan": "bannernaya-tkan",
    "materialy-dlya-pechati": "materialy-dlya-pechati",
    "tentovaya-tkan": "tentovaya-tkan",
    "plenki-dlya-laminirovaniya": "plenki-dlya-laminirovaniya",
    "montazhnye-plenki": "montazhnye-plenki",
    "vitrazhnye-plenki": "vitrazhnye-plenki",
    "magnitnyy-vinil": "magnitnyy-vinil",
    "oboi-dlya-pechati": "oboi-dlya-pechati",

    // rangli vinil uchun ko‘p yozilishlar
    "tsvetnaya-samokleyushchayasya-plenka": "tsvetnaya-samokleyushchayasya-plenka",
    "tsvetnaya-samokleyushchaya-plenka": "tsvetnaya-samokleyushchayasya-plenka",

    // qisqa/variant ID lar
    "banner-tkan": "bannernaya-tkan",
    "oboi-pechati": "oboi-dlya-pechati",
    "plenki-laminirovaniya": "plenki-dlya-laminirovaniya",
    "montazhnyye-plenki": "montazhnye-plenki",
    "magnitnyj-vinil": "magnitnyy-vinil",
    "tent-tkan": "tentovaya-tkan",
  },

  "istochniki-sveta": {
    "led-prozhektory": "led-prozhektory",
    "moduli-svetodiodnye": "moduli-svetodiodnye",
    "svetodiodnye-lenty": "svetodiodnye-lenty",
    "led-prozhektory-sofity": "led-prozhektory",
    "svetodiodnye-lenty-led": "svetodiodnye-lenty",
  },

  "transformatory-i-upravlenie": {
    "transformatory-vnutrennie": "transformatory-vnutrennie",
    "kontrollery-dimmeri": "kontrollery-dimmeri",
    "chernila-kraski": "chernila-kraski",
  },

  "chernila-kraski": {
    "solventnye-kraski": "solventnye-kraski",
    "ekosolventnye-kraski": "ekosolventnye-kraski",
    solvent: "solventnye-kraski",
    ecosolvent: "ekosolventnye-kraski",
  },

  "reklamnoe-i-vystavochnoe-oborudovanie": {
    "pop-up-stendy": "pop-up-stendy",
    "x-konstruktsii": "x-konstruktsii",
    "roll-stendy": "roll-stendy",
    "promostoly": "promostoly",
    "flagi": "flagi",
    "posm-materialy": "posm-materialy",

    // ba’zan alyuminiy bo‘limidagi punktlar shu yerga kelib qoladi
    "profily-alyuminievye": "profili-alyuminievye",
    "komplektuyushchie-dlya-profilya": "komplektuyushchie-dlya-profily",
    "profil-dlya-lent": "alyuminievye-profili-dlya-svetodiodnyh-lent",
  },

  "alyuminievye-profili": {
    "profily-alyuminievye": "profili-alyuminievye",
    "profili-alyuminievye": "profili-alyuminievye",
    "komplektuyushchie-dlya-profily": "komplektuyushchie-dlya-profily",
    "komplektuyushchie-dlya-profilya": "komplektuyushchie-dlya-profily",
    "alyuminievye-profili-dlya-svetodiodnyh-lent": "alyuminievye-profili-dlya-svetodiodnyh-lent",
    "profil-dlya-lent": "alyuminievye-profili-dlya-svetodiodnyh-lent",
  },

  "kleevye-resheniya": {
    "klei": "klei",
    "skotch": "klei", // i18n kalitlarda odatda faqat "klei"
  },

  "metallicheskaya-i-plastiknaya-furnitura": {
    "kaima-plastiknaya": "kaima-plastiknaya",
    "kajma-plastikovaya": "kaima-plastiknaya",
    "metallicheskaya-furnitura": "metallicheskaya-furnitura",
    "metal-furnitura": "metallicheskaya-furnitura",
    "neodimovye-magnity": "neodimovye-magnity",
  },

  "instrumenty": {
    "ruchnye-instrumenty": "ruchnye-instrumenty",
    "postpechatnye-instrumenty": "postpechatnye-instrumenty",
  },

  "frezy-i-gravery": {
    "frezy": "frezy",
    "gravery": "gravery",
  },
};

/* =========================================================
 * 2) Normalizatorlar (oxirgi chora sifatida turli yozilishlar)
 * ======================================================= */
function normalizeSectionIdGuess(id: string): string[] {
  const out = new Set<string>([id]);

  // underscore ↔ hyphen
  out.add(id.replace(/_/g, "-"));

  // rulonli bo‘limning yozilishlari
  out.add(id.replace(/rulonnyye|rulonnie/gi, "rulonnye"));

  // “reklamno-vystavochnoe(-oborudovanie)” → to‘liq kanonik nom
  if (id.startsWith("reklamno-vystavochnoe")) {
    out.add("reklamnoe-i-vystavochnoe-oborudovanie");
  }

  return Array.from(out);
}

function normalizeCatIdGuess(id: string): string[] {
  const variants = new Set<string>([id]);

  // y/j
  variants.add(id.replace(/magnitnyj/g, "magnitnyy"));

  // qisqartma → kanonik
  variants.add(id.replace(/banner-tkan/g, "bannernaya-tkan"));
  variants.add(id.replace(/oboi-pechati/g, "oboi-dlya-pechati"));
  variants.add(id.replace(/plenki-laminirovaniya/g, "plenki-dlya-laminirovaniya"));
  variants.add(id.replace(/montazhnyye-plenki/g, "montazhnye-plenki"));
  variants.add(id.replace(/tent-tkan/g, "tentovaya-tkan"));

  // profily/profili
  variants.add(id.replace(/profily-alyuminievye/g, "profili-alyuminievye"));

  // profil-dlya-lent → alyuminievye-profili-dlya-svetodiodnyh-lent
  variants.add(
    id.replace(/profil-dlya-lent/g, "alyuminievye-profili-dlya-svetodiodnyh-lent"),
  );

  // samokleyushchaya → samokleyushchayasya
  variants.add(id.replace(/samokleyushchaya(sya)?/g, "samokleyushchayasya"));

  return Array.from(variants);
}

/* =========================================================
 * 3) I18n helperlar
 * ======================================================= */
const canonSectionId = (id: string) => SECTION_ID_ALIASES[id] ?? id;
const canonCategoryId = (sectionId: string, categoryId: string) => {
  const s = canonSectionId(sectionId);
  return CATEGORY_ID_ALIASES[s]?.[categoryId] ?? categoryId;
};

export default function Sidebar() {
  const { t } = useI18n();
  const pathname = usePathname();
  const [openId, setOpenId] = useState<string | null>(null);

  // bir nechta kalitni ketma-ket sinash
  const trMany = (keys: string[], fallback: string) => {
    for (const k of keys) {
      const got = t(k as any);
      if (got && got !== k) return got;
    }
    return fallback;
  };

  // SECTION uchun nomzod i18n kalitlari
  const sectionKeyCandidates = useMemo(() => {
    return (secId: string) => {
      const canonical = canonSectionId(secId);
      const cands = new Set<string>([`catalog.sections.${canonical}.title`]);
      normalizeSectionIdGuess(canonical).forEach((v) =>
        cands.add(`catalog.sections.${v}.title`),
      );
      return Array.from(cands);
    };
  }, []);

  // CATEGORY uchun nomzod i18n kalitlari
  const categoryKeyCandidates = useMemo(() => {
    return (secId: string, catId: string) => {
      const sCanon = canonSectionId(secId);
      const cCanon = canonCategoryId(secId, catId);

      const cands = new Set<string>([
        `catalog.sections.${sCanon}.categories.${cCanon}`,
      ]);
      normalizeCatIdGuess(cCanon).forEach((v) =>
        cands.add(`catalog.sections.${sCanon}.categories.${v}`),
      );
      return Array.from(cands);
    };
  }, []);

  // ochilgan bo‘limni URL’dan aniqlash
  useEffect(() => {
    const segs = pathname.split("/").filter(Boolean); // [sectionId, categoryId, ...]
    setOpenId(segs[0] || null);
  }, [pathname]);

  const toggle = (id: string) => setOpenId((p) => (p === id ? null : id));

  // Kontaktlar (i18n mavjud, ishlayapti)
  const contacts = [
    { label: t("sidebar.contact_labels.consultant"), value: "+998 77 268 66 58" },
    {
      label: t("sidebar.contact_labels.address"),
      value: t("sidebar.contacts.address"),
    },
    { label: t("sidebar.contact_labels.email"), value: "info@yilong.uz" },
    { label: t("sidebar.contact_labels.phone"), value: "+998 77 268 66 59" },
  ];

  return (
    <aside className="w-64 bg-white/50 backdrop-blur-sm p-4 min-h-screen hidden md:block">
      {/* Menu */}
      <div className="mb-8">
        <h3 className="bg-blue-800 text-white px-4 py-2 font-semibold">{t("sidebar.menu")}</h3>

        <div className="bg-white border border-gray-200">
          {CATALOG.map((sec) => {
            const secHref = `/${sec.id}`;                // Link o‘zgarmaydi
            const isOpen = openId === sec.id;
            const isActive = pathname.startsWith(secHref);

            const secTitle = trMany(
              sectionKeyCandidates(sec.id),
              sec.title || sec.id,                      // i18n topilmasa — CATALOG dagi nom
            );

            return (
              <div key={sec.id} className="border-b border-gray-200 last:border-b-0">
                <div className="flex items-center justify-between group">
                  <Link
                    href={secHref}
                    className={`flex-grow px-4 py-3 text-left hover:bg-gray-50 text-sm ${
                      isActive ? "bg-blue-50 text-blue-700 font-medium" : ""
                    }`}
                  >
                    {secTitle}
                  </Link>

                  {!!sec.categories?.length && (
                    <button
                      className="h-full px-4 py-3 hover:bg-gray-50 flex items-center justify-center"
                      onClick={() => toggle(sec.id)}
                      aria-label="toggle"
                    >
                      {isOpen ? (
                        <ChevronDown className="w-4 h-4 text-gray-600" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                      )}
                    </button>
                  )}
                </div>

                {isOpen && !!sec.categories?.length && (
                  <div className="bg-gray-100 p-2">
                    {sec.categories.map((cat) => {
                      const catHref = `/${sec.id}/${cat.id}`; // Link o‘zgarmaydi
                      const catActive = pathname.startsWith(catHref);

                      const catTitle = trMany(
                        categoryKeyCandidates(sec.id, cat.id),
                        cat.title || cat.id,
                      );

                      return (
                        <Link
                          key={cat.id}
                          href={catHref}
                          className={`block px-4 py-2 text-sm rounded ${
                            catActive
                              ? "bg-blue-100 text-blue-700 font-medium"
                              : "text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {catTitle}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Contacts (sticky) */}
      <div className="relative sticky top-5 mt-0">
        <h3 className="bg-blue-800 text-white px-4 py-2 font-semibold">
          {t("sidebar.contacts_title")}
        </h3>

        <div className="bg-white border border-gray-200 p-4">
          {contacts.map((c, i) => (
            <div key={i} className="mb-3 last:mb-0">
              <div className="text-sm font-medium text-gray-700">{c.label}</div>
              <div className="text-sm text-gray-600">{c.value}</div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

