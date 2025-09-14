"use client";

import { Truck, Shield } from "lucide-react";
import { useI18n } from "@/components/i18n/I18nProvider";

export default function CompanyAdvantages() {
  const { t } = useI18n();

  const advantages = [
    {
      icon: <Truck className="w-8 h-8" />,
      title: t("advantages.cards.fast_delivery.title"),
      description: t("advantages.cards.fast_delivery.description"),
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: t("advantages.cards.quality_guarantee.title"),
      description: t("advantages.cards.quality_guarantee.description"),
    },
  ];

  return (
    <section className="mb-12 px-4">
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 text-center md:text-left">
        {t("advantages.title")}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {advantages.map((advantage, index) => (
          <div key={index} className="bg-white p-4 md:p-6 rounded-lg shadow-md">
            <div className="flex items-start gap-3 md:gap-4">
              <div className="text-blue-600 flex-shrink-0">{advantage.icon}</div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1 md:mb-2 text-base md:text-lg">
                  {advantage.title}
                </h3>
                <p className="text-gray-600 text-sm md:text-base">
                  {advantage.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-6">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 md:px-8 md:py-3 rounded-lg font-semibold transition-colors text-sm md:text-base">
          {t("advantages.cta_catalog")}
        </button>
      </div>
    </section>
  );
}
