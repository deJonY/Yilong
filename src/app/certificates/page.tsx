// import Footer from "@/components/Footer";
// import Header from "@/components/Header";

// export default function CertificatesPage() {
//   // Sample certificate data based on the original site
//   const certificates = [
//     { id: 1, title: "Сертификат качества ПВХ", image: "/pvc-certificate.png" },
//     { id: 2, title: "Сертификат соответствия акрил", image: "/acrylic-compliance-certificate.png", },
//     { id: 3, title: "Сертификат безопасности красок", image: "/paint-safety-certificate.png", },
//     { id: 4, title: "Сертификат качества баннерной ткани", image: "/certificate-banner-fabric.png", },
//     { id: 5, title: "Сертификат LED модулей", image: "/certificate-led-modules.png", },
//     { id: 6, title: "Сертификат экологической безопасности", image: "/placeholder-pipvl.png", },
//   ];

//   return (
//     <>
//       <Header />

//       <div className="min-h-screen bg-white">

//         {/* Main Content */}
//         <main className="max-w-6xl mx-auto px-4 py-8">
//           <div className="text-center mb-12">
//             <h1 className="text-3xl font-bold text-gray-800 mb-4">
//               Сертификаты на продукцию
//             </h1>
//             <p className="text-lg text-gray-600 max-w-3xl mx-auto">
//               Вся наша продукция сертифицирована и соответствует международным
//               стандартам качества. Мы гарантируем безопасность и надежность всех
//               материалов для наружной рекламы.
//             </p>
//           </div>

//           {/* Quality Assurance Section */}
//           <div className="bg-blue-50 p-8 rounded-lg mb-12">
//             <div className="grid md:grid-cols-2 gap-8 items-center">
//               <div>
//                 <h2 className="text-2xl font-bold text-gray-800 mb-4">
//                   Гарантия качества
//                 </h2>
//                 <p className="text-gray-700 mb-4">
//                   Все материалы проходят строгий контроль качества и имеют
//                   соответствующие сертификаты. Мы работаем только с проверенными
//                   производителями, которые соблюдают международные стандарты.
//                 </p>
//                 <ul className="space-y-2 text-gray-700">
//                   <li className="flex items-center space-x-2">
//                     <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                     <span>Сертификаты качества ISO 9001</span>
//                   </li>
//                   <li className="flex items-center space-x-2">
//                     <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                     <span>Экологическая безопасность</span>
//                   </li>
//                   <li className="flex items-center space-x-2">
//                     <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                     <span>Пожарная безопасность</span>
//                   </li>
//                   <li className="flex items-center space-x-2">
//                     <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                     <span>Соответствие ГОСТ стандартам</span>
//                   </li>
//                 </ul>
//               </div>
//               <div className="bg-white p-6 rounded-lg shadow-sm">
//                 <div className="text-center">
//                   <div className="w-20 h-20 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
//                     <div className="w-10 h-10 bg-white rounded-sm flex items-center justify-center">
//                       <div className="w-6 h-6 bg-blue-600 rounded-sm"></div>
//                     </div>
//                   </div>
//                   <h3 className="text-lg font-bold text-gray-800 mb-2">
//                     100% Сертифицированная продукция
//                   </h3>
//                   <p className="text-gray-600">
//                     Каждый товар имеет документы, подтверждающие качество
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Certificates Grid */}
//           <div className="mb-12">
//             <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
//               Наши сертификаты
//             </h2>
//             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
//               {certificates.map((cert) => (
//                 <div
//                   key={cert.id}
//                   className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer"
//                 >
//                   <div className="aspect-[3/4] mb-4 bg-gray-100 rounded-md overflow-hidden">
//                     <img src={cert.image || "/placeholder.svg"} alt={cert.title} className="w-full h-full object-cover" />
//                   </div>
//                   <h3 className="text-sm font-semibold text-gray-800 text-center leading-tight">
//                     {cert.title}
//                   </h3>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Contact Section */}
//           <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8 rounded-lg text-center">
//             <h2 className="text-2xl font-bold mb-4">
//               Нужна консультация по сертификатам?
//             </h2>
//             <p className="text-blue-100 mb-6">
//               Наши специалисты готовы предоставить подробную информацию о любом
//               сертификате и помочь с выбором подходящих материалов для вашего
//               проекта.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <a
//                 href="tel:+998 77 268 66 58"
//                 className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
//               >
//                 Позвонить: +998 77 268 66 58
//               </a>
//               <a
//                 href="mailto:yi-long@mail.ru"
//                 className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-400 transition-colors"
//               >
//                 Написать: yi-long@mail.ru
//               </a>
//             </div>
//           </div>
//         </main>

//         <Footer />
//       </div>
//     </>
//   );
// }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useI18n } from '@/components/i18n/I18nProvider';
import logo from "../../../public/assets/icon.png";
import Image from 'next/image';
import img1 from "../../../public/assets/img1.png"
import img2 from "../../../public/assets/img2.png"
import img3 from "../../../public/assets/img3.png"
import img4 from "../../../public/assets/img4.png"
import img5 from "../../../public/assets/img5.png"
import img6 from "../../../public/assets/img6.png"

export default function CertificatesPage() {
  const { t } = useI18n();

  const certificates = [
    { id: 1, title: t('certificates.items.pvc'),     image: img1.src },
    { id: 2, title: t('certificates.items.acrylic'), image: img2.src },
    { id: 3, title: t('certificates.items.paint'),   image: img3.src },
    { id: 4, title: t('certificates.items.banner'),  image: img4.src },
    { id: 5, title: t('certificates.items.led'),     image: img5.src },
    { id: 6, title: t('certificates.items.eco'),     image: img6.src },
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white">
        <main className="max-w-6xl mx-auto px-4 py-8">
          {/* Title & intro */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {t('certificates.title')}
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t('certificates.intro')}
            </p>
          </div>

          {/* Quality assurance */}
          <div className="bg-blue-50 p-8 rounded-lg mb-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  {t('certificates.qa.title')}
                </h2>
                <p className="text-gray-700 mb-4">
                  {t('certificates.qa.text')}
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span>{t('certificates.qa.bullets.iso')}</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span>{t('certificates.qa.bullets.eco')}</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span>{t('certificates.qa.bullets.fire')}</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span>{t('certificates.qa.bullets.gost')}</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Image src={logo} alt="Logo" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {t('certificates.qa.kpi_title')}
                  </h3>
                  <p className="text-gray-600">{t('certificates.qa.kpi_text')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
              {t('certificates.grid_title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
              {certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className="aspect-[3/4] mb-4 bg-gray-100 rounded-md overflow-hidden">
                    <img
                      src={cert.image || '/placeholder.svg'}
                      alt={cert.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 text-center leading-tight">
                    {cert.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-4">{t('certificates.cta.title')}</h2>
            <p className="text-blue-100 mb-6">{t('certificates.cta.text')}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+998772686658"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                {t('certificates.cta.call')}: +998 77 268 66 58
              </a>
              <a
                href="mailto:yi-long@mail.ru"
                className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-400 transition-colors"
              >
                {t('certificates.cta.write')}: yi-long@mail.ru
              </a>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
