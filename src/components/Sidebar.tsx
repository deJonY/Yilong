"use client";

import { ChevronRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { getCatalogForLang } from "@/lib/catalog";
import { useI18n } from "@/components/i18n/I18nProvider";

export default function Sidebar() {
  const { t, lang } = useI18n() as any; // lang: "ru" | "uz"
  const pathname = usePathname();
  const [openId, setOpenId] = useState<string | null>(null);

  // Tanlangan tilga mos katalog (title'lar allaqachon string)
  const CATALOG = getCatalogForLang(lang);

  useEffect(() => {
    const segs = pathname.split("/").filter(Boolean);
    setOpenId(segs[0] || null);
  }, [pathname]);

  const toggle = (id: string) => setOpenId((p) => (p === id ? null : id));

  const contacts = [
    { label: t("sidebar.contact_labels.consultant") ?? (lang === "uz" ? "Yordamchi" : "Консультант"), value: "+998 77 268 66 58" },
    { label: t("sidebar.contact_labels.address") ?? (lang === "uz" ? "Manzil" : "Адрес"), value: t("sidebar.contacts.address") ?? "1-dovon Eski Otchopar, Mirobod tumani, Toshkent" },
    { label: t("sidebar.contact_labels.email") ?? "Email", value: "info@yilong.uz" },
    { label: t("sidebar.contact_labels.phone") ?? (lang === "uz" ? "Telefon" : "Телефон"), value: "+998 77 268 66 59" },
  ];

  return (
    <aside className="w-64 bg-white/50 backdrop-blur-sm p-4 min-h-screen hidden md:block">
      <div className="mb-8">
        <h3 className="bg-blue-800 text-white px-4 py-2 font-semibold">
          {t("sidebar.menu") ?? (lang === "uz" ? "Menyu" : "Меню")}
        </h3>

        <div className="bg-white border border-gray-200">
          {CATALOG.map((sec) => {
            const secHref = `/${sec.id}`;
            const isOpen = openId === sec.id;
            const isActive = pathname.startsWith(secHref);

            return (
              <div key={sec.id} className="border-b border-gray-200 last:border-b-0">
                <div className="flex items-center justify-between group">
                  <Link
                    href={secHref}
                    className={`flex-grow px-4 py-3 text-left hover:bg-gray-50 text-sm ${
                      isActive ? "bg-blue-50 text-blue-700 font-medium" : ""
                    }`}
                  >
                    {sec.title}
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
                      const catHref = `/${sec.id}/${cat.id}`;
                      const catActive = pathname.startsWith(catHref);

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
                          {cat.title}
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

      <div className="relative sticky top-5 mt-0">
        <h3 className="bg-blue-800 text-white px-4 py-2 font-semibold">
          {t("sidebar.contacts_title") ?? (lang === "uz" ? "Aloqa" : "Контакты")}
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
