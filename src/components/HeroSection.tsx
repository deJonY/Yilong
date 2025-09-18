"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Circle } from "lucide-react";
import { useI18n } from "@/components/i18n/I18nProvider";
import SearchBox from "@/components/search/SearchBox";
import { useRouter } from "next/navigation";

// Firestore
import { db } from "@/lib/firebase/init";
import {
  collection,
  getDocs,
  orderBy,
  query,
  limit as fbLimit,
  doc,
  getDoc,
} from "firebase/firestore";


type BannerDoc = {
  id: string;
  image: string;
  sectionId: string;
  caption?: string | null;
  href?: string;
};

type SectionTitleMap = Record<string, string>;


// async function fetchBanners(): Promise<BannerDoc[]> {
//   const q = query(
//     collection(db, "banners"),
//     orderBy("createdAt", "desc"),
//     fbLimit(10)
//   );
//   const snap = await getDocs(q);
//   return snap.docs
//     .map((d) => {
//       const v = d.data() as any;
//       return {
//         id: d.id,
//         image: String(v.image || ""),
//         sectionId: String(v.sectionId || ""),
//         caption: v.caption ?? null,
//         href: v.href || `/${String(v.sectionId || "").trim() || ""}`,
//       } as BannerDoc;
//     })
//     .filter((b) => !!b.image && !!b.sectionId);
// }

async function fetchBanners(): Promise<BannerDoc[]> {
  try {
    const q = query(collection(db, 'banners'), orderBy('createdAt', 'desc'), fbLimit(10));
    const snap = await getDocs(q);
    return snap.docs
      .map(d => {
        const v = d.data() as any;
        return {
          id: d.id,
          image: String(v.image || ''),
          sectionId: String(v.sectionId || ''),
          caption: v.caption ?? null,
          href: v.href || `/${String(v.sectionId || '').trim() || ''}`,
        };
      })
      .filter(b => !!b.image && !!b.sectionId);
  } catch (e) {
    console.error('[banners] load failed:', e);
    return []; // xato bo'lsa ham UI yiqilmasin
  }
}

async function fetchSectionTitles(
  sectionIds: string[],
  lang: string
): Promise<SectionTitleMap> {
  const uniq = Array.from(new Set(sectionIds));
  const entries: [string, string][] = [];
  for (const sid of uniq) {
    try {
      const ref = doc(db, "products", sid);
      const d = await getDoc(ref);
      const raw = (d.data()?.title as any) ?? sid;
      const title =
        typeof raw === "string"
          ? raw
          : raw?.[lang] ?? raw?.ru ?? raw?.uz ?? sid;
      entries.push([sid, String(title)]);
    } catch {
      entries.push([sid, sid]);
    }
  }
  return Object.fromEntries(entries);
}

export default function HeroSection() {
  const { t, lang } = useI18n();
  const [banners, setBanners] = useState<BannerDoc[] | null>(null);
  const [secTitles, setSecTitles] = useState<SectionTitleMap>({});
  const [idx, setIdx] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const router = useRouter();

  // Gradient variantlari (fon overlay uchun)
  const gradients = [
    "from-black/60 via-black/30 to-black/20",
    "from-slate-900/60 via-slate-800/30 to-slate-700/20",
    "from-gray-900/60 via-gray-700/30 to-gray-600/20",
    "from-zinc-900/60 via-zinc-700/30 to-zinc-600/20",
    "from-stone-900/60 via-stone-700/30 to-stone-600/20",
    "from-neutral-900/60 via-neutral-700/30 to-neutral-600/20",
  ] as const;

  const gradientClass = `bg-gradient-to-r ${gradients[idx % gradients.length]}`;

  // Fetch banners + section titles
  useEffect(() => {
    (async () => {
      const list = await fetchBanners();
      setBanners(list);
      setIdx(0);
      const map = await fetchSectionTitles(list.map((b) => b.sectionId), lang);
      setSecTitles(map);
    })();
  }, [lang]);

  // Autoplay
  useEffect(() => {
    if (!banners?.length) return;
    const id = setInterval(() => setIdx((p) => (p + 1) % banners.length), 5000);
    return () => clearInterval(id);
  }, [banners]);

  const cur = useMemo(() => {
    if (!banners || banners.length === 0) return null;
    return banners[Math.min(idx, banners.length - 1)];
  }, [banners, idx]);

  // Har slide almashganda rasm loaderni qayta yoqamiz
  useEffect(() => {
    setImageLoaded(false);
  }, [cur?.id]);

  const goPrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIdx((p) => (banners ? (p - 1 + banners.length) % banners.length : 0));
  };
  const goNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIdx((p) => (banners ? (p + 1) % banners.length : 0));
  };

  // Juft/Toq (matn joylashuvi)
  const isOdd = idx % 2 === 1;

  const goCurrent = () => {
    if (!cur) return;
    const target = cur.href && cur.href !== "/" ? cur.href : `/${cur.sectionId}`;
    router.push(target);
  };

  return (
    <section className="relative w-full overflow-hidden rounded-lg mb-8">
      {/* Qidiruv */}
      <div className="mb-6">
        <SearchBox />
      </div>

      {/* Banner (butunlay kliklanadigan zona) */}
      {!cur ? (
        <div className="animate-pulse bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg h-[260px] sm:h-[320px] md:h-[420px]" />
      ) : (
        // <div
        //   role="button"
        //   aria-label="Open banner link"
        //   onClick={goCurrent}
        //   className="relative rounded-lg h-[260px] sm:h-[320px] md:h-[420px] cursor-pointer group"
        // >
        //   {/* Rasm: butun karuselni qoplaydi */}
        //   <div className="absolute inset-0">
        //     {!imageLoaded && (
        //       <div className="absolute inset-0 animate-pulse bg-slate-200" />
        //     )}
        //     <Image
        //       src={cur.image}
        //       alt={cur.caption || secTitles[cur.sectionId] || "banner"}
        //       fill
        //       priority
        //       sizes="100vw"
        //       className={`object-cover transition-opacity duration-300 ${
        //         imageLoaded ? "opacity-100" : "opacity-0"
        //       }`}
        //       onLoadingComplete={() => setImageLoaded(true)}
        //     />
        //     {/* Gradient overlay (o‘qilishi oson bo‘lsin) */}
        //     <div className={`absolute inset-0 ${gradientClass}`} />
        //   </div>

          <div
            role="button"
            aria-label="Open banner link"
            onClick={goCurrent}
            className="relative rounded-lg overflow-hidden h-[260px] sm:h-[320px] md:h-[420px] cursor-pointer group" // ← overflow-hidden qo'shildi
          >
          {/* Rasm: butun karuselni qoplaydi */}
          <div className="absolute inset-0">
            {!imageLoaded && (
              <div className="absolute inset-0 animate-pulse bg-slate-200" />
            )}
            <Image
              src={cur.image}
              alt={cur.caption || secTitles[cur.sectionId] || "banner"}
              fill
              priority
              sizes="100vw"
              className={`object-fill transition-opacity duration-300 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setImageLoaded(true)} // ← yangilandi
            />
            <div className={`absolute inset-0 ${gradientClass}`} />
          </div>

          {/* Kontent overlay */}
          <div className="relative z-10 h-full px-4 sm:px-6 md:px-12 py-6 md:py-10">
            <div className="max-w-6xl mx-auto h-full flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10">
              {/* Matn bloki */}
              <div
                className={`flex flex-col gap-4 md:gap-5 md:w-1/2 text-white
                ${ isOdd
                    ? "md:order-2 md:items-end md:text-right md:pl-0 md:ml-auto"
                    : "md:order-1 md:items-start md:text-left md:pr-10"
                }`} > </div>

              {/* Dekorativ karta ko‘rinishi (lekin rasm allaqachon fon) */}
              <div
                className={`relative md:w-1/2 w-full shrink-0 rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10
                ${isOdd ? "md:order-1" : "md:order-2"} hidden md:block`}
              >
                {/* Shunchaki shaffof qatlam – “karta” hissi uchun */}
                <div className="w-full h-full bg-white/0" />
              </div>
            </div>
          </div>

          {/* Navigatsiya tugmalari (klik tarqamasin) */}
          {banners && banners.length > 1 && (
            <>
              <button
                onClick={goPrev}
                className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white p-2 rounded-full transition-colors z-20 focus-visible:outline-none"
                aria-label="Previous"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={goNext}
                className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white p-2 rounded-full transition-colors z-20 focus-within:outline-none"
                aria-label="Next"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              <div
                className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-20"
                onClick={(e) => e.stopPropagation()}
              >
                {banners.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => {
                      e.stopPropagation();
                      setIdx(i);
                    }}
                    aria-label={`Go to slide ${i + 1}`}
                  >
                    <Circle
                      size={12}
                      className={`${
                        i === idx ? "fill-white text-white" : "text-white/60"
                      } transition-colors`}
                    />
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </section>
  );
}
