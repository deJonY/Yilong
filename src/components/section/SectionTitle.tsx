// src/components/section/SectionTitle.tsx
"use client";
import { useI18n } from "@/components/i18n/I18nProvider";
import { getSectionTitle } from "@/lib/catalog";

export default function SectionTitle({ sectionId }: { sectionId: string }) {
  const { lang, t } = useI18n();
  // ixtiyoriy: i18n key bor bo‘lsa undan, bo‘lmasa helper
  const key = `catalog.sections.${sectionId}.title`;
  const fromDict = t(key);
  const title =
    typeof fromDict === "string" && !fromDict.startsWith("catalog.")
      ? fromDict
      : getSectionTitle(sectionId, lang);

  return <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{title}</h1>;
}
