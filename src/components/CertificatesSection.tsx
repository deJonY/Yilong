"use client";

import { useI18n } from "@/components/i18n/I18nProvider";

export default function CertificatesSection() {
  const { t } = useI18n();

  return (
    <section className="mb-12 px-4">
      <h2 className="text-xl md:text-2xl font-bold mb-6 text-center md:text-left">
        {t("certSection.title")}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {[1, 2, 3].map((cert) => (
          <div
            key={cert}
            className="bg-white rounded-lg shadow-md p-4 md:p-6 text-center hover:shadow-lg transition-shadow"
          >
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 font-bold text-lg md:text-xl">C{cert}</span>
            </div>
            <h3 className="font-semibold mb-1 md:mb-2 text-base md:text-lg">
              {t("certSection.card_title", { n: cert })}
            </h3>
            <p className="text-gray-600 text-sm md:text-base">
              {t("certSection.card_desc")}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
