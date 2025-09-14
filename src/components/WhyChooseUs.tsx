"use client";

import { useI18n } from "@/components/i18n/I18nProvider";

export default function WhyChooseUs() {
  const { t } = useI18n();

  const advantages = [
    {
      title: t("why.cards.quality.title"),
      description: t("why.cards.quality.description"),
    },
    {
      title: t("why.cards.experience.title"),
      description: t("why.cards.experience.description"),
    },
    {
      title: t("why.cards.service.title"),
      description: t("why.cards.service.description"),
    },
    {
      title: t("why.cards.prices.title"),
      description: t("why.cards.prices.description"),
    },
  ];

  return (
    <section className="mb-12 px-3 sm:px-6">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-center sm:text-left">
        {t("why.title")}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {advantages.map((advantage, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-4 sm:p-6 text-center sm:text-left"
          >
            <h3 className="font-semibold mb-2 text-blue-600 text-base sm:text-lg">
              {advantage.title}
            </h3>
            <p className="text-gray-600 text-sm sm:text-base">
              {advantage.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
