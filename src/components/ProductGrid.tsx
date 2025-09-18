// // src/components/ProductGrid.tsx
// "use client";

// import ProductList from "./cards/first-card";
// import { useI18n } from "@/components/i18n/I18nProvider";

// export default function ProductGrid() {
//   const { t } = useI18n();

//   return (
//     <section className="mb-8 six-only">
//       <h2 className="text-xl font-bold text-gray-800 mb-6">
//         {t("home.popular_title")}
//       </h2>

//       <ProductList mode="categories" sectionId="listovye-materialy" />

//       {/* Faqat shu bo'lim ichidagi Category grid'da 6 ta karta ko'rsatamiz */}
//       <style jsx global>{`
//         .six-only .grid > *:nth-child(n + 7) {
//           display: none !important;
//         }
//       `}</style>
//     </section>
//   );
// }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

// src/components/ProductGrid.tsx
"use client";

import ProductList from "./cards/first-card";
import { useI18n } from "@/components/i18n/I18nProvider";

export default function ProductGrid() {
  const { t } = useI18n();

  return (
    <section className="mb-8 six-only">
      <h2 className="text-xl font-bold text-gray-800 mb-6">
        {t("home.popular_title")}
      </h2>

      <ProductList mode="categories" sectionId="listovye-materialy" />

      {/* Faqat shu bo'lim ichidagi Category grid'da 6 ta karta ko'rsatamiz */}
      <style jsx global>{`
        .six-only .grid > *:nth-child(n + 7) {
          display: none !important;
        }
      `}</style>
    </section>
  );
}
