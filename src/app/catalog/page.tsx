"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useI18n } from "@/components/i18n/I18nProvider";
import { fetchSections } from "@/lib/firebase/queries";
import { sectionTitle } from "@/lib/i18n/labels";

type SectionDoc = {
  id: string;
  title?: string;
  image?: string;
  slug?: string;
};

export default function CatalogPage() {
  const { t, lang } = useI18n() as any;
  const [sections, setSections] = useState<SectionDoc[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        const secs = (await fetchSections(lang)) as SectionDoc[];
        if (alive) setSections(secs || []);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [lang]);

  const pageTitle = t?.("nav.products") ?? "Tovarlar va xizmatlar";
  const loadingText = t?.("common.loading") ?? "Yuklanmoqda...";

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">{pageTitle}</h1>

      {loading && sections.length === 0 ? (
        <div className="text-sm text-gray-500">{loadingText}</div>
      ) : null}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sections.map((s) => {
          const title = sectionTitle(t, s.id, s.title ?? s.id);
          const href = `/${s.id}`;
          const img = s.image || "/placeholder.svg";
          return (
            <Link
              key={s.id}
              href={href}
              className="block rounded-2xl bg-white shadow hover:shadow-md border p-4 transition"
            >
              <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl bg-gray-50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img}
                  alt={title}
                  className="absolute inset-0 h-full w-full object-contain"
                  loading="lazy"
                />
              </div>
              <div className="mt-3 text-center font-medium">{title}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
