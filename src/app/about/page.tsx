// import Footer from "@/components/Footer";
// import Header from "@/components/Header";

// import { cookies } from "next/headers";
// import { getDictionary } from "@/i18n/dictionaries";
// import { getInitialLang, type Lang } from "@/i18n/config";



// export default function AboutPage() {
//   const cookieLang = cookies().get("lang")?.value as Lang | undefined;
//   const lang: Lang = cookieLang ?? getInitialLang();
//   const t = getDictionary(lang); // ✅ endi await shart emas
//   return (
//     <>
//         <Header />
        
//         <div className="min-h-screen bg-white">

//         {/* Main Content */}
//         <main className="max-w-6xl mx-auto px-4 py-8">
//             {/* Company Title */}
//             <div className="text-center mb-12">
//             <h1 className="text-3xl font-bold text-gray-800 mb-4">
//                 YiLong — поставщик материалов для наружной рекламы №1!
//             </h1>
//             </div>

//             {/* Company Points */}
//             <div className="grid md:grid-cols-2 gap-8 mb-12">
//             <div className="space-y-6">
//                 <div className="flex items-start space-x-4">
//                 <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg">
//                     1
//                 </div>
//                 <p className="text-gray-700 leading-relaxed">
//                     Мы на рынке рекламных материалов с 2013 года, с первого дня своей работы стабильно растем, о чем
//                     свидетельствует постоянное увеличение числа наших клиентов.
//                 </p>
//                 </div>

//                 <div className="flex items-start space-x-4">
//                 <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg">
//                     2
//                 </div>
//                 <p className="text-gray-700 leading-relaxed">
//                     Являемся производителем и поставщиком в одном лице, именно поэтому гарантируем высокое качество всей
//                     продукции и предоставляем самые выгодные цены.
//                 </p>
//                 </div>
//             </div>

//             <div className="space-y-6">
//                 <div className="flex items-start space-x-4">
//                 <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg">
//                     3
//                 </div>
//                 <p className="text-gray-700 leading-relaxed">
//                     Мы всегда учитываем потребности партнеров, поэтому регулярно расширяем свой ассортимент самыми
//                     актуальными товарами и новинками рекламного рынка.
//                 </p>
//                 </div>

//                 <div className="flex items-start space-x-4">
//                 <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg">
//                     4
//                 </div>
//                 <p className="text-gray-700 leading-relaxed">
//                     При необходимости консультируем по всему ассортименту, предоставляя полную информацию по любому
//                     интересующему материалу и его альтернативе.
//                 </p>
//                 </div>
//             </div>
//             </div>

//             {/* Advantages Section */}
//             <div className="bg-gray-50 rounded-lg p-8 mb-12">
//             <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Ваши выгоды при сотрудничестве с нами</h2>

//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 <div className="bg-white p-6 rounded-lg shadow-sm">
//                 <p className="text-gray-700">Широкий ассортимент, удовлетворяющий любые запросы.</p>
//                 </div>

//                 <div className="bg-white p-6 rounded-lg shadow-sm">
//                 <p className="text-gray-700">Индивидуальные скидки (от объема и при повторных заказах).</p>
//                 </div>

//                 <div className="bg-white p-6 rounded-lg shadow-sm">
//                 <p className="text-gray-700">Бесплатная доставка по г. Алматы заказов на сумму от 30 000 тг.</p>
//                 </div>

//                 <div className="bg-white p-6 rounded-lg shadow-sm">
//                 <p className="text-gray-700">Постоянное наличие материалов и их доставка в сжатые сроки.</p>
//                 </div>

//                 <div className="bg-white p-6 rounded-lg shadow-sm">
//                 <p className="text-gray-700">Условия оплаты и доставки оговариваются индивидуально.</p>
//                 </div>

//                 <div className="bg-white p-6 rounded-lg shadow-sm">
//                 <p className="text-gray-700">Постоянная информационная поддержка специалистами.</p>
//                 </div>
//             </div>
//             </div>

//             {/* Quality and Price Section */}
//             <div className="grid md:grid-cols-2 gap-8 mb-12">
//             <div className="bg-blue-50 p-8 rounded-lg">
//                 <h3 className="text-xl font-bold text-gray-800 mb-4">Высокое качество</h3>
//                 <p className="text-gray-700">
//                 Вся продукция изготовлена в соответствии с высокими современными стандартами качества, что подтверждается
//                 наличием сертификатов.
//                 </p>
//             </div>

//             <div className="bg-green-50 p-8 rounded-lg">
//                 <h3 className="text-xl font-bold text-gray-800 mb-4">Умеренные цены</h3>
//                 <p className="text-gray-700">
//                 Предлагаемые нами цены ниже рыночных за счет наличия собственного производства в Китае и поставок без
//                 привлечения посредников.
//                 </p>
//             </div>
//             </div>

//             {/* Bottom Section */}
//             <div className="text-center bg-blue-600 text-white p-8 rounded-lg">
//             <h2 className="text-2xl font-bold mb-4">YiLong — комплексные поставки материалов для наружной рекламы!</h2>
//             <h3 className="text-lg mb-4">
//                 Все самое качественное и по самым низким ценам напрямую с крупных заводов КНР!
//             </h3>
//             <p className="text-blue-100">
//                 Обширный ассортимент самых востребованных и перспективных рекламных материалов, быстрота доставки и высокий
//                 уровень сервиса делают нашу компанию удобным партнером и надежным поставщиком для вашего бизнеса.
//             </p>
//             </div>
//         </main>

//         <Footer />

//         </div>
    
//     </>
//   )
// }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useI18n } from '@/components/i18n/I18nProvider';

export default function AboutPage() {
  const { t } = useI18n();

  const leftPoints = ['1', '2'].map((n) => t(`about.points.${n}`));
  const rightPoints = ['3', '4'].map((n) => t(`about.points.${n}`));

  return (
    <>
      <Header />

      <div className="min-h-screen bg-white">
        <main className="max-w-6xl mx-auto px-4 py-8">
          {/* Title */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {t('about.title_main')}
            </h1>
          </div>

          {/* Points 1–4 */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="space-y-6">
              {leftPoints.map((text, i) => (
                <div key={i} className="flex items-start space-x-4">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg">
                    {i + 1}
                  </div>
                  <p className="text-gray-700 leading-relaxed">{text}</p>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              {rightPoints.map((text, i) => (
                <div key={i} className="flex items-start space-x-4">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg">
                    {i + 3}
                  </div>
                  <p className="text-gray-700 leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-gray-50 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
              {t('about.benefits.title')}
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="bg-white p-6 rounded-lg shadow-sm">
                  <p className="text-gray-700">{t(`about.benefits.items.${n}`)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quality & Price */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-blue-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {t('about.quality.title')}
              </h3>
              <p className="text-gray-700">{t('about.quality.text')}</p>
            </div>

            <div className="bg-green-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {t('about.price.title')}
              </h3>
              <p className="text-gray-700">{t('about.price.text')}</p>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center bg-blue-600 text-white p-8 rounded-lg">
            <h3 className="text-[26px] font-semibold mb-4">{t('about.bottom.title')}</h3>
            <h6 className="text-[16.5px] mb-4">{t('about.bottom.subtitle')}</h6>
            {/* <p className="text-blue-100">{t('about.bottom.text')}</p> */}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
