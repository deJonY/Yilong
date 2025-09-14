// import Footer from "@/components/Footer";
// import Header from "@/components/Header";

// export default function ContactPage() {
//   return (
//     <>
//       <Header />
//       <div className="min-h-screen bg-white">

//         {/* Main Content */}
//         <main className="max-w-6xl mx-auto px-4 py-8">
//           <h1 className="text-3xl font-bold text-gray-800 mb-8">Контакты</h1>

//           <div className="grid lg:grid-cols-2 gap-12">
//             {/* Contact Information */}
//             <div className="space-y-8">
//               {/* Company Info */}
//               <div className="bg-gray-50 p-6 rounded-lg">
//                 <h2 className="text-xl font-bold text-gray-800 mb-4">Yilong.kz</h2>
//                 <div className="space-y-3">
//                   <div className="flex items-start space-x-3">
//                     <div className="w-5 h-5 bg-blue-600 rounded-full mt-1"></div>
//                     <div>
//                       <p className="font-semibold text-gray-800">Адрес:</p>
//                       <p className="text-gray-700">ул. Есим хана 12, Алматы, Казахстан</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Phone Numbers */}
//               <div className="bg-blue-50 p-6 rounded-lg">
//                 <h3 className="text-lg font-bold text-gray-800 mb-4">Телефоны</h3>
//                 <div className="space-y-3">
//                   <div className="flex items-center space-x-3">
//                     <div className="w-4 h-4 bg-green-500 rounded-full"></div>
//                     <div>
//                       <p className="font-semibold text-gray-800">+7 (778) 900-25-86</p>
//                       <p className="text-sm text-gray-600">Олеся (мен-р по г. Алматы)</p>
//                     </div>
//                   </div>

//                   <div className="flex items-center space-x-3">
//                     <div className="w-4 h-4 bg-green-500 rounded-full"></div>
//                     <div>
//                       <p className="font-semibold text-gray-800">+7 (777) 128-11-66</p>
//                       <p className="text-sm text-gray-600">Қуандық (Региональный мен-р)</p>
//                     </div>
//                   </div>

//                   <div className="flex items-center space-x-3">
//                     <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
//                     <div>
//                       <p className="font-semibold text-gray-800">+7 (727) 379-19-70</p>
//                     </div>
//                   </div>

//                   <div className="flex items-center space-x-3">
//                     <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
//                     <div>
//                       <p className="font-semibold text-gray-800">+7 (727) 379-19-82</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Email and Website */}
//               <div className="bg-green-50 p-6 rounded-lg">
//                 <h3 className="text-lg font-bold text-gray-800 mb-4">Электронная почта и сайт</h3>
//                 <div className="space-y-3">
//                   <div className="flex items-center space-x-3">
//                     <div className="w-4 h-4 bg-red-500 rounded-full"></div>
//                     <a href="mailto:yi-long@mail.ru" className="text-blue-600 hover:underline font-semibold">
//                       yi-long@mail.ru
//                     </a>
//                   </div>

//                   <div className="flex items-center space-x-3">
//                     <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
//                     <a href="https://yilong.kz/" className="text-blue-600 hover:underline font-semibold">
//                       https://yilong.kz/
//                     </a>
//                   </div>
//                 </div>
//               </div>

//               {/* Quick Contact */}
//               <div className="bg-yellow-50 p-6 rounded-lg">
//                 <h3 className="text-lg font-bold text-gray-800 mb-4">Быстрая связь</h3>
//                 <div className="flex flex-wrap gap-4">
//                   <a
//                     href="tel:+77789002586"
//                     className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
//                   >
//                     +7 778 900 25 86
//                   </a>
//                   <a
//                     href="tel:+77771281166"
//                     className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
//                   >
//                     +7 777 128 11 66
//                   </a>
//                 </div>
//               </div>
//             </div>

//             {/* Map Section */}
//             <div>
//               <h2 className="text-xl font-bold text-gray-800 mb-4">Местоположение компании</h2>
//               <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
//                 <div className="text-center text-gray-600">
//                   <div className="w-16 h-16 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
//                     <div className="w-8 h-8 bg-white rounded-full"></div>
//                   </div>
//                   <p className="font-semibold">Карта местоположения</p>
//                   <p className="text-sm">ул. Есим хана 12, Алматы, Казахстан</p>
//                 </div>
//               </div>

//               {/* Contact Form */}
//               <div className="mt-8 bg-gray-50 p-6 rounded-lg">
//                 <h3 className="text-lg font-bold text-gray-800 mb-4">Свяжитесь с нами</h3>
//                 <form className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Имя</label>
//                     <input
//                       type="text"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Телефон</label>
//                     <input
//                       type="tel"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Сообщение</label>
//                     <textarea
//                       rows={4}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     ></textarea>
//                   </div>
//                   <button
//                     type="submit"
//                     className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
//                   >
//                     Отправить сообщение
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </main>

//         <Footer />
//       </div>
//     </>
//   )
// }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useI18n } from "@/components/i18n/I18nProvider";

export default function ContactPage() {
  const { t } = useI18n(); // <— tarjimalar provider’dan

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-white">
        <main className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">
            {t("contact.title")}
          </h1>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Chap: kontakt ma'lumotlari */}
            <div className="space-y-8">
              {/* Kompaniya */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  {t("contact.company.title")}
                </h2>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-5 h-5 bg-blue-600 rounded-full mt-1" />
                    <div>
                      <p className="font-semibold text-gray-800">
                        {t("contact.company.address_label")}
                      </p>
                      <p className="text-gray-700">
                        {t("contact.company.address_text")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Telefonlar */}
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  {t("contact.phones.title")}
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-green-500 rounded-full" />
                    <div>
                      <p className="font-semibold text-gray-800">
                        +998 77 268 66 58
                      </p>
                      <p className="text-sm text-gray-600">
                        {t("contact.phones.p1_desc")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-green-500 rounded-full" />
                    <div>
                      <p className="font-semibold text-gray-800">
                        +998 77 268 66 59
                      </p>
                      <p className="text-sm text-gray-600">
                        {t("contact.phones.p2_desc")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-blue-500 rounded-full" />
                    <div>
                      <p className="font-semibold text-gray-800">
                        +7 (727) 379-19-70
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-blue-500 rounded-full" />
                    <div>
                      <p className="font-semibold text-gray-800">
                        +7 (727) 379-19-82
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Email va sayt */}
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  {t("contact.mail_web.title")}
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-red-500 rounded-full" />
                    <a
                      href="mailto:yi-long@mail.ru"
                      className="text-blue-600 hover:underline font-semibold"
                    >
                      yi-long@mail.ru
                    </a>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-blue-500 rounded-full" />
                    <a
                      href="https://yilong.uz/"
                      className="text-blue-600 hover:underline font-semibold"
                    >
                      https://yilong.uz/
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* O'ng: xarita va forma */}
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                {t("contact.map.title")}
              </h2>
              <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
                <iframe
                  src="https://yandex.uz/map-widget/v1/?ll=69.308106%2C41.267395&mode=search&poi%5Bpoint%5D=69.308278%2C41.267115&poi%5Buri%5D=ymapsbm1%3A%2F%2Forg%3Foid%3D124411172752&sctx=ZAAAAAgBEAAaKAoSCT1FDhE3k09AEQmkxK7t4URAEhIJMISc9%2F%2FhLUARFkuRfCVAIEAiBgABAgMEBSgKOABAl6AGSAFiRnJlYXJyPXNjaGVtZV9Mb2NhbC9HZW91cHBlci9BZHZlcnRzL1JlYXJyYW5nZUJ5QXVjdGlvbi9DYWNoZS9FbmFibGVkPTFqAnV6nQHNzMw9oAEAqAEAvQEkd4ZLggIHd2lubGFuZIoCAJICAJoCDGRlc2t0b3AtbWFwcw%3D%3D&sll=69.308106%2C41.267395&sspn=0.003110%2C0.001705&text=winland&z=18.23"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={t("footer.map_title")}
                  className="rounded-lg"
                ></iframe>
              </div>

              {/* Forma */}
              {/* <div className="mt-8 bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  {t("contact.form.title")}
                </h3>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("contact.form.name_label")}
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("contact.form.phone_label")}
                    </label>
                    <input
                      type="tel"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("contact.form.message_label")}
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    {t("contact.form.submit")}
                  </button>
                </form>
              </div> */}

              {/* Tez aloqa */}
              <div className="bg-yellow-50 p-6 rounded-lg mt-10">
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  {t("contact.quick.title")}
                </h3>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="tel:+998 77 268 66 58"
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                  >
                    +998 77 268 66 58
                  </a>
                  <a
                    href="tel:+998 77 268 66 59"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    +998 77 268 66 59
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
