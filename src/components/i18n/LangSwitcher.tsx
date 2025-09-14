"use client";
import { useI18n } from "./I18nProvider";
export default function LangSwitcher({ className }: { className?: string }) {
  const { lang, setLang, t } = useI18n();
  return (
    <div className={className}>
      <label className="sr-only">{t("nav.choose_lang")}</label>
      <select
        value={lang}
        onChange={(e) => setLang(e.target.value as any)}
        className="bg-transparent border border-white/40 rounded px-2 py-1 text-sm hover:bg-white/10"
        aria-label={t("nav.choose_lang")}
      >
        <option value="ru">RU</option>
        <option value="uz">UZ</option>
      </select>
    </div>
  );
}
