// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { BsInstagram, BsTelegram } from "react-icons/bs";
// import qr_code from "../../public/assets/qr-code.png";

// export default function Footer() {
//   return (
//     <footer className="bg-blue-800 text-white py-8 mt-12">
//       <div className="container mx-auto px-12">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//           <div>
//             <h3 className="text-lg font-semibold mb-4">Yi Long</h3>
//             <p className="text-white-300">Материалы для наружной рекламы</p>

//             <div className="social-media flex space-x-6">
//               <Image src={qr_code} alt="QR Code" width={80} height={80} className="mt-4 rounded" />
//               <Link href="https://www.instagram.com/yilong_ads/" className="h-full">
//                 <BsInstagram className="mt-4 text-white-300 hover:text-white cursor-pointer w-10 h-10"  />
//               </Link>
//               <Link href="https://t.me/+998772686658" className="h-full">
//                 <BsTelegram className="mt-4 text-white-300 hover:text-white cursor-pointer w-10 h-10"  />
//               </Link>
//             </div>
//           </div>
//           <div>
//             <h4 className="text-lg font-semibold mb-4">Контакты</h4>
//             <p className="text-white-300">
//               1-й пр-д Эски отчопар 42 (Рисовый б-р)
//             </p>
//             <p className="text-white-300">+998 77 268 66 58</p>
//             <p className="text-white-300">+998 77 268 66 59</p>
//           </div>
//           <div>
//             <h4 className="text-lg font-semibold mb-4">Режим работы</h4>
//             <p className="text-white-300">Пн-Сб: 9:00 - 18:00</p>
//             <p className="text-white-300">Вс: выходной</p>
//           </div>
//           {/* <div className="big-map">
//             <iframe
//               src="https://yandex.uz/map-widget/v1/?ll=69.308781%2C41.266877&mode=search&poi%5Bpoint%5D=69.308279%2C41.267117&poi%5Buri%5D=ymapsbm1%3A%2F%2Forg%3Foid%3D124411172752&sctx=ZAAAAAgBEAAaKAoSCb048dWOVVFAEXtMpDSbp0RAEhIJUtUEUfcBwj8R%2BGwdHOxNsD8iBgABAgMEBSgKOABAl6AGSAFqAnV6nQHNzMw9oAEAqAEAvQEkd4ZLwgEG7vaNsYoEggIHd2lubGFuZIoCAJICAJoCDGRlc2t0b3AtbWFwcw%3D%3D&sll=69.308781%2C41.266877&sspn=0.001927%2C0.000873&text=winland&z=19.5"
//               width="100%"
//               height="200"
//               style={{ border: 0 }}
//               allowFullScreen={false}
//               loading="lazy"
//               referrerPolicy="no-referrer-when-downgrade"
//               title="Yi Long Location"
//             ></iframe>
//           </div> */}
          
//           <div className="big-map">
//             <iframe
//               src="https://yandex.uz/map-widget/v1/?ll=69.308106%2C41.267395&mode=search&poi%5Bpoint%5D=69.308278%2C41.267115&poi%5Buri%5D=ymapsbm1%3A%2F%2Forg%3Foid%3D124411172752&sctx=ZAAAAAgBEAAaKAoSCT1FDhE3k09AEQmkxK7t4URAEhIJMISc9%2F%2FhLUARFkuRfCVAIEAiBgABAgMEBSgKOABAl6AGSAFiRnJlYXJyPXNjaGVtZV9Mb2NhbC9HZW91cHBlci9BZHZlcnRzL1JlYXJyYW5nZUJ5QXVjdGlvbi9DYWNoZS9FbmFibGVkPTFqAnV6nQHNzMw9oAEAqAEAvQEkd4ZLggIHd2lubGFuZIoCAJICAJoCDGRlc2t0b3AtbWFwcw%3D%3D&sll=69.308106%2C41.267395&sspn=0.003110%2C0.001705&text=winland&z=18.23"
//               width="100%"
//               height="200"
//               style={{ border: 0 }}
//               allowFullScreen={false}
//               loading="lazy"
//               referrerPolicy="no-referrer-when-downgrade"
//               title="Yi Long Location"
//             ></iframe>
//           </div>
//         </div>
          
//         <div className="border-t border-gray-700 mt-8 pt-8 text-center">
//           <p className="text-white-400">
//             &copy; 2024 Yi Long. Все права защищены.
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// }

//////////////////////////////////////////////////////////////////////////////////////////////////////

"use client";

import Image from "next/image";
import Link from "next/link";
import { BsInstagram, BsTelegram } from "react-icons/bs";
import qr_code from "../../public/assets/YiLong.png";
import { useI18n } from "@/components/i18n/I18nProvider";

export default function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-blue-800 text-white py-8 mt-12">
      <div className="container mx-auto px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Yi Long</h3>
            <p className="text-white-300">{t("header.tagline")}</p>

            <div className="social-media flex space-x-6">
              <Image
                src={qr_code}
                alt={t("footer.qr_alt")}
                width={80}
                height={80}
                className="mt-4 rounded"
              />
              <Link href="https://www.instagram.com/yilong_ads/" className="h-full" aria-label="Instagram">
                <BsInstagram className="mt-4 text-white-300 hover:text-white cursor-pointer w-10 h-10" />
              </Link>
              <Link href="https://t.me/+998772686658" className="h-full" aria-label="Telegram">
                <BsTelegram className="mt-4 text-white-300 hover:text-white cursor-pointer w-10 h-10" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">{t("footer.contacts.title")}</h4>
            <p className="text-white-300">{t("footer.contacts.address")}</p>
            <p className="text-white-300">+998 77 268 66 58</p>
            <p className="text-white-300">+998 77 268 66 59</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">{t("footer.hours.title")}</h4>
            <p className="text-white-300">{t("footer.hours.weekdays")}</p>
            <p className="text-white-300">{t("footer.hours.sunday")}</p>
          </div>

          <div className="big-map">
            <iframe
              src="https://yandex.uz/map-widget/v1/?ll=69.308106%2C41.267395&mode=search&poi%5Bpoint%5D=69.308278%2C41.267115&poi%5Buri%5D=ymapsbm1%3A%2F%2Forg%3Foid%3D124411172752&sctx=ZAAAAAgBEAAaKAoSCT1FDhE3k09AEQmkxK7t4URAEhIJMISc9%2F%2FhLUARFkuRfCVAIEAiBgABAgMEBSgKOABAl6AGSAFiRnJlYXJyPXNjaGVtZV9Mb2NhbC9HZW91cHBlci9BZHZlcnRzL1JlYXJyYW5nZUJ5QXVjdGlvbi9DYWNoZS9FbmFibGVkPTFqAnV6nQHNzMw9oAEAqAEAvQEkd4ZLggIHd2lubGFuZIoCAJICAJoCDGRlc2t0b3AtbWFwcw%3D%3D&sll=69.308106%2C41.267395&sspn=0.003110%2C0.001705&text=winland&z=18.23"
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={t("footer.map_title")}
              className="rounded-lg"
            ></iframe>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-white-400">
            &copy; {year} Yi Long. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
