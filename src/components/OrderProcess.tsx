"use client";

import { Phone, Clock, Truck, CheckCircle, CreditCard, Headphones, Wallet } from "lucide-react";
import { useI18n } from "@/components/i18n/I18nProvider";

export default function OrderProcess() {
  const { t } = useI18n();

  const steps = [
    {
      icon: <Phone className="w-8 h-8" />,
      title: t("orderProcess.steps.consultation.title"),
      description: t("orderProcess.steps.consultation.description"),
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: t("orderProcess.steps.preparation.title"),
      description: t("orderProcess.steps.preparation.description"),
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: t("orderProcess.steps.delivery.title"),
      description: t("orderProcess.steps.delivery.description"),
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: t("orderProcess.steps.receiving.title"),
      description: t("orderProcess.steps.receiving.description"),
    },
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: t("orderProcess.steps.payment.title"),
      description: t("orderProcess.steps.payment.description"),
    },
    {
      icon: <Headphones className="w-8 h-8" />,
      title: t("orderProcess.steps.aftersales.title"),
      description: t("orderProcess.steps.aftersales.description"),
    },
  ];

  return (
    <section className="px-3 sm:px-6 mb-12">
      {/* Title */}
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center sm:text-left">
        {t("orderProcess.title")}
      </h2>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-gray-800 text-white p-4 sm:p-6 rounded-lg text-center"
          >
            <div className="flex justify-center mb-4 text-blue-400">{step.icon}</div>
            <h3 className="font-semibold mb-2 text-sm sm:text-base">{step.title}</h3>
            <p className="text-xs sm:text-sm text-gray-300">{step.description}</p>
          </div>
        ))}
      </div>

      {/* CTA button */}
      <div className="text-center mt-6 mb-10">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold transition-colors text-sm sm:text-base"
          aria-label={t("orderProcess.cta_online")}
        >
          {t("orderProcess.cta_online")}
        </button>
      </div>

      {/* Order Steps with Arrows */}
      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 sm:p-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 text-center mb-8 sm:mb-12">
          {t("orderProcess.simple_title")}
        </h2>

        <div className="flex flex-col sm:flex-row items-center justify-center sm:space-x-12 md:space-x-16 space-y-8 sm:space-y-0">
          {/* Step 1 */}
          <div className="text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-600 rounded-full flex items-center justify-center mb-4 sm:mb-6 mx-auto shadow-lg">
              <Phone className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <p className="font-semibold text-gray-800 text-sm sm:text-lg">
              {t("orderProcess.simple_steps.call_or_request")}
            </p>
          </div>

          {/* Arrow */}
          <div className="flex items-center justify-center sm:rotate-0 rotate-90">
            <svg
              className="w-8 h-8 sm:w-10 sm:h-10 text-gray-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z" />
            </svg>
          </div>

          {/* Step 2 */}
          <div className="text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-600 rounded-full flex items-center justify-center mb-4 sm:mb-6 mx-auto shadow-lg">
              <Headphones className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <p className="font-semibold text-gray-800 text-sm sm:text-lg">
              {t("orderProcess.simple_steps.confirm_details")}
            </p>
          </div>

          {/* Arrow */}
          <div className="flex items-center justify-center sm:rotate-0 rotate-90">
            <svg
              className="w-8 h-8 sm:w-10 sm:h-10 text-gray-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z" />
            </svg>
          </div>

          {/* Step 3 */}
          <div className="text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-600 rounded-full flex items-center justify-center mb-4 sm:mb-6 mx-auto shadow-lg">
              <Wallet className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <p className="font-semibold text-gray-800 text-sm sm:text-lg">
              {t("orderProcess.simple_steps.pay_conveniently")}
            </p>
          </div>

          {/* Arrow */}
          <div className="flex items-center justify-center sm:rotate-0 rotate-90">
            <svg
              className="w-8 h-8 sm:w-10 sm:h-10 text-gray-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z" />
            </svg>
          </div>

          {/* Step 4 */}
          <div className="text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-600 rounded-full flex items-center justify-center mb-4 sm:mb-6 mx-auto shadow-lg">
              <Truck className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <p className="font-semibold text-gray-800 text-sm sm:text-lg">
              {t("orderProcess.simple_steps.wait_for_delivery")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
