// src/components/section/AllSectionsClient.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchSections, fetchCategories, getCategoryImage } from "@/lib/firebase/queries";

type Section = { id: string; title: string };
type Card = { id: string; title: string; image?: string };

export default function AllSectionsClient() {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setErr(null);
      try {
        const sections = await fetchSections();

        const withCovers = await Promise.all(
          sections.map(async (s: Section) => {
            try {
              const cats = await fetchCategories(s.id);
              let cover: string | undefined;
              for (const c of cats) {
                const img = await getCategoryImage(s.id, c.id);
                if (img) {
                  cover = img; break;
                }
              }
              return { id: s.id, title: s.title, image: cover } as Card;
            } catch {
              return { id: s.id, title: s.title } as Card;
            }
          })
        );

        if (!cancelled) setCards(withCovers);
      } catch (e: any) {
        if (!cancelled) setErr(e?.message || "Yuklashda xatolik.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  if (loading) return <div className="bg-white rounded-lg shadow p-6 text-gray-600">Yuklanmoqda…</div>;
  if (err)     return <div className="bg-white rounded-lg shadow p-6 text-red-600">{err}</div>;
  if (!cards.length) return <div className="bg-white rounded-lg shadow p-6 text-gray-600">Bo‘limlar topilmadi.</div>;

  return (
    <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((s) => (
        <Link key={s.id} href={`/${s.id}`}>
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
            <div className="w-full h-56 overflow-hidden">
              <img
                src={s.image || "/placeholder.svg"}
                alt={s.title}
                className="w-full h-full object-contain bg-white"
              />
            </div>
            <div className="p-4">
              <h3 className="text-center font-semibold text-gray-800">{s.title}</h3>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
