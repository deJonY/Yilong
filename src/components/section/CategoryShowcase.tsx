// src/components/section/CategoryShowcase.tsx
"use client";

import ProductList from "@/components/cards/first-card";
import { useI18n } from "@/components/i18n/I18nProvider";

type Props = {
  sectionId: string;     // masalan: "listovye-materialy"
  limit?: number;        // nechtasini ko'rsatamiz (default 6)
  titleKey?: string;     // i18n kaliti (default: "home.popular_title")
};

export default function CategoryShowcase({
  sectionId,
  limit = 6,
  titleKey = "home.popular_title",
}: Props) {
  const { t } = useI18n();

  return (
    <section className={`mb-8 limit-${limit}`}>
      <h2 className="text-xl font-bold text-gray-800 mb-6">
        {t(titleKey as any)}
      </h2>

      {/* Home’dagi kabi kategoriya grid */}
      <ProductList mode="categories" sectionId={sectionId} />

      {/* limit > N bo'lsa, N+ elementlarni yashiramiz */}
      <style jsx global>{`
        .limit-${limit} .grid > *:nth-child(n + ${limit + 1}) {
          display: none !important;
        }
      `}</style>
    </section>
  );
}
