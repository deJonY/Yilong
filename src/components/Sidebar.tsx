// "use client"

// import { Search, ChevronRight, ChevronDown } from "lucide-react"
// import { useState, useEffect } from "react"
// import { usePathname } from "next/navigation"

// export default function Sidebar() {
//   const [searchTerm, setSearchTerm] = useState<string>("")
//   const [openCategory, setOpenCategory] = useState<number | null>(null)
//   const pathname = usePathname()

//   const categories = [
//     {
//       title: "Листовые материалы",
//       link: "/listovye-materialy",
//       subcategories: [
//         { title: "ПВХ Yilong", link: "/pvkh-yilong" },
//         { title: "Оргстекло Yilong", link: "/orgsteklo-yilong" },
//         { title: "PVC Yilong", link: "/pvc-yilong" },
//         { title: "Акрил JUN SHANG", link: "/akril-jun-shang" },
//         { title: "Роумарк (пластик для гравировки)", link: "/roumark-plastik" },
//         { title: "Алюкобонд", link: "/alyukobond" },
//         { title: "Пенокартон", link: "/penokarton" },
//       ],
//     },
//     {
//       title: "Рулонные материалы",
//       link: "/rulonnye-materialy",
//       subcategories: [
//         { title: "Баннерная ткань", link: "/bannernaya-tkan" },
//         { title: "Материалы для печати", link: "/materialy-dlya-pechati" },
//         { title: "Тентовая ткань", link: "/tentovaya-tkan" },
//         { title: "Пленки для ламинирования", link: "/plenki-dlya-laminirovaniya" },
//         { title: "Цветная самоклеящаяся виниловая пленка", link: "/tsvetnaya-samokleyushchayasya-plenka" },
//         { title: "Монтажные пленки", link: "/montazhnye-plenki" },
//         { title: "Витражные пленки", link: "/vitrazhnye-plenki" },
//         { title: "Магнитный винил", link: "/magnitnyy-vinil" },
//         { title: "Обои для печати", link: "/oboi-dlya-pechati" },
//       ],
//     },
//     {
//       title: "Источники света (светодиоды, лампы и пр.)",
//       link: "/istochniki-sveta",
//       subcategories: [
//         { title: "LED прожекторы (софиты)", link: "/led-prozhektory" },
//         { title: "Модули светодиодные", link: "/moduli-svetodiodnye" },
//         { title: "Светодиодные ленты", link: "/svetodiodnye-lenty" },
//       ],
//     },
//     {
//       title: "Трансформаторы и источники управления",
//       link: "/transformatory",
//       subcategories: [
//         { title: "Трансформаторы (внутренние и наружные)", link: "/transformatory-vnutrennie" },
//         { title: "Контроллеры, диммеры, усилители", link: "/kontrollery-dimmeri" },
//         { title: "Чернила (краски)", link: "/chernila-kraski" },
//       ],
//     },
//     {
//       title: "Чернила (краски)",
//       link: "/chernila-kraski",
//       subcategories: [
//         { title: "Сольвентные краски", link: "/solventnye-kraski" },
//         { title: "Экосольвентные краски", link: "/ekosolventnye-kraski" },
//       ],
//     },
//     {
//       title: "Рекламное и выставочное оборудование",
//       link: "/reklamnoe-i-vystavochnoe-oborudovanie",
//       subcategories: [
//         { title: "Поп-ап стенды (pop up, пресс-стены)", link: "/pop-up-stendy" },
//         { title: "X-конструкции, X-баннера,паучки", link: "/x-konstruktsii" },
//         { title: "Ролл-стенды roll up", link: "/roll-stendy" },
//         { title: "Промостолы, промостойки", link: "/promostoly" },
//         { title: "Флагштоки (флаги)", link: "/flagi" },
//         { title: "POSM материалы (разное)", link: "/posm-materialy" },
//       ],
//     },
//     {
//       title: "Алюминиевые профили и комплектующие",
//       link: "/alyuminievye-profili",
//       subcategories: [
//         { title: "Профили алюминиевые", link: "/profili-alyuminievye" },
//         { title: "Комплектующие для профилей", link: "/komplektuyushchie-dlya-profily" },
//         { title: "Алюминиевые профили для светодиодных лент", link: "/alyuminievye-profili-dlya-svetodiodnyh-lent" },
//       ],
//     },
//     {
//       title: "Клеевые решения (скотч, клей)",
//       link: "/kleevye-resheniya",
//       subcategories: [{ title: "Клеи", link: "/klei" }],
//     },
//     {
//       title: "Металлическая и пластиковая фурнитура",
//       link: "/metallicheskaya-i-plastiknaya-furnitura",
//       subcategories: [
//         { title: "Кайма пластиковая", link: "/kaima-plastiknaya" },
//         { title: "Металлическая фурнитура", link: "/metallicheskaya-furnitura" },
//         { title: "Неодимовые магниты", link: "/neodimovye-magnity" },
//       ],
//     },
//     {
//       title: "Инструменты",
//       link: "/instrumenty",
//       subcategories: [
//         { title: "Ручные инструменты", link: "/ruchnye-instrumenty" },
//         { title: "Постпечатные инструменты", link: "/postpechatnye-instrumenty" },
//       ],
//     },
//     {
//       title: "Фрезы и граверы",
//       link: "/frezy-i-gravery",
//       subcategories: [
//         { title: "Фрезы", link: "/frezy" },
//         { title: "Граверы", link: "/gravery" },
//       ],
//     },
//   ]

//   const contacts = [
//     { type: "Консультант", phone: "+7 (777) 123-45-67" },
//     { type: "Адрес", info: "г. Алматы, ул. Есим хана 12, Алматы, Казахстан" },
//     { type: "Email", info: "info@yilong.kz" },
//     { type: "Телефон", phone: "+7 (777) 123-45-67" },
//     { type: "Телефон", phone: "+7 (777) 123-45-67" },
//     { type: "Телефон", phone: "+7 (777) 123-45-67" },
//   ]

//   useEffect(() => {
//     categories.forEach((category, index) => {
//       const isCurrentCategory = pathname === category.link
//       const hasActiveSubcategory = category.subcategories.some((sub) => pathname === sub.link)

//       if (isCurrentCategory || hasActiveSubcategory) {
//         setOpenCategory(index)
//       }
//     })
//   }, [pathname])

//   const handleCategoryClick = (index: number) => {
//     setOpenCategory(openCategory === index ? null : index)
//   }

//   return (
//     <aside className="w-65 bg-white/50 backdrop-blur-sm p-4 min-h-screen hidden md:block">
//       {/* Search */}
//       {/* <div className="mb-6">
//         <div className="relative">
//           <input
//             type="text"
//             placeholder="Поиск"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full px-4 py-2 border border-gray-400 rounded-lg pr-10 bg-white/50"
//           />
//           <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-900" />
//         </div>
//       </div> */}

//       {/* Menu */}
//       <div className="mb-8">
//         <h3 className="bg-blue-800 text-white px-4 py-2 font-semibold">Меню</h3>
//         <div className="bg-white border border-gray-200">
//           {categories.map((category, index) => (
//             <div key={index} className="border-b border-gray-200 last:border-b-0">
//               <div className="flex items-center justify-between group">
//                 <a
//                   href={category.link}
//                   className={`flex-grow px-4 py-3 text-left hover:bg-gray-50 text-sm ${
//                     pathname === category.link ? "bg-blue-50 text-blue-700 font-medium" : ""
//                   }`}
//                 >
//                   {category.title}
//                 </a>
//                 {category.subcategories.length > 0 && (
//                   <button
//                     className="h-full px-4 py-3 hover:bg-gray-50 flex items-center justify-center"
//                     onClick={() => handleCategoryClick(index)}
//                   >
//                     {openCategory === index ? (
//                       <ChevronDown className="w-4 h-4 text-gray-600" />
//                     ) : (
//                       <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
//                     )}
//                   </button>
//                 )}
//               </div>
//               {openCategory === index && category.subcategories.length > 0 && (
//                 <div className="bg-gray-100 p-2">
//                   {category.subcategories.map((subcategory, subIndex) => (
//                     <a
//                       key={subIndex}
//                       href={subcategory.link}
//                       className={`block px-4 py-2 text-sm rounded ${
//                         pathname === subcategory.link
//                           ? "bg-blue-100 text-blue-700 font-medium"
//                           : "text-gray-700 hover:bg-gray-200"
//                       }`}
//                     >
//                       {subcategory.title}
//                     </a>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Contacts */}
//       <div className="relative sticky top-5 mt-0">
//         <h3 className="bg-blue-800 text-white px-4 py-2 font-semibold">Контакты</h3>
//         <div className="bg-white border border-gray-200 p-4">
//           {contacts.map((contact, index) => (
//             <div key={index} className="mb-3 last:mb-0">
//               <div className="text-sm font-medium text-gray-700">{contact.type}</div>
//               <div className="text-sm text-gray-600">{contact.phone || contact.info}</div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </aside>
//   )
// }

//////////////////////////////////////////////////////////////////////////////////////////////////////////

// "use client";

// import { ChevronRight, ChevronDown } from "lucide-react";
// import { useState, useEffect } from "react";
// import { usePathname } from "next/navigation";
// import { useI18n } from "@/components/i18n/I18nProvider";

// export default function Sidebar() {
//   // const [searchTerm, setSearchTerm] = useState<string>("");
//   const [openCategory, setOpenCategory] = useState<number | null>(null);
//   const pathname = usePathname();
//   const { t } = useI18n();

//   const categories = [
//     {
//       title: "Листовые материалы",
//       link: "/listovye-materialy",
//       subcategories: [
//         { title: "ПВХ Yilong", link: "/pvkh-yilong" },
//         { title: "Оргстекло Yilong", link: "/orgsteklo-yilong" },
//         { title: "PVC Yilong", link: "/pvc-yilong" },
//         { title: "Акрил JUN SHANG", link: "/akril-jun-shang" },
//         { title: "Роумарк (пластик для гравировки)", link: "/roumark-plastik" },
//         { title: "Алюкобонд", link: "/alyukobond" },
//         { title: "Пенокартон", link: "/penokarton" },
//       ],
//     },
//     {
//       title: "Рулонные материалы",
//       link: "/rulonnye-materialy",
//       subcategories: [
//         { title: "Баннерная ткань", link: "/bannernaya-tkan" },
//         { title: "Материалы для печати", link: "/materialy-dlya-pechati" },
//         { title: "Тентовая ткань", link: "/tentovaya-tkan" },
//         { title: "Пленки для ламинирования", link: "/plenki-dlya-laminirovaniya" },
//         { title: "Цветная самоклеящаяся виниловая пленка", link: "/tsvetnaya-samokleyushchayasya-plenka" },
//         { title: "Монтажные пленки", link: "/montazhnye-plenki" },
//         { title: "Витражные пленки", link: "/vitrazhnye-plenki" },
//         { title: "Магнитный винил", link: "/magnitnyy-vinil" },
//         { title: "Обои для печати", link: "/oboi-dlya-pechati" },
//       ],
//     },
//     {
//       title: "Источники света (светодиоды, лампы и пр.)",
//       link: "/istochniki-sveta",
//       subcategories: [
//         { title: "LED прожекторы (софиты)", link: "/led-prozhektory" },
//         { title: "Модули светодиодные", link: "/moduli-svetodiodnye" },
//         { title: "Светодиодные ленты", link: "/svetodiodnye-lenty" },
//       ],
//     },
//     {
//       title: "Трансформаторы и источники управления",
//       link: "/transformatory",
//       subcategories: [
//         { title: "Трансформаторы (внутренние и наружные)", link: "/transformatory-vnutrennie" },
//         { title: "Контроллеры, диммеры, усилители", link: "/kontrollery-dimmeri" },
//         { title: "Чернила (краски)", link: "/chernila-kraski" },
//       ],
//     },
//     {
//       title: "Чернила (краски)",
//       link: "/chernila-kraski",
//       subcategories: [
//         { title: "Сольвентные краски", link: "/solventnye-kraski" },
//         { title: "Экосольвентные краски", link: "/ekosolventnye-kraski" },
//       ],
//     },
//     {
//       title: "Рекламное и выставочное оборудование",
//       link: "/reklamnoe-i-vystavochnoe-oborudovanie",
//       subcategories: [
//         { title: "Поп-ап стенды (pop up, пресс-стены)", link: "/pop-up-stendy" },
//         { title: "X-конструкции, X-баннера,паучки", link: "/x-konstruktsii" },
//         { title: "Ролл-стенды roll up", link: "/roll-stendy" },
//         { title: "Промостолы, промостойки", link: "/promostoly" },
//         { title: "Флагштоки (флаги)", link: "/flagi" },
//         { title: "POSM материалы (разное)", link: "/posm-materialy" },
//       ],
//     },
//     {
//       title: "Алюминиевые профили и комплектующие",
//       link: "/alyuminievye-profili",
//       subcategories: [
//         { title: "Профили алюминиевые", link: "/profili-alyuminievye" },
//         { title: "Комплектующие для профилей", link: "/komplektuyushchie-dlya-profily" },
//         { title: "Алюминиевые профили для светодиодных лент", link: "/alyuminievye-profili-dlya-svetodiodnyh-lent" },
//       ],
//     },
//     {
//       title: "Клеевые решения (скотч, клей)",
//       link: "/kleevye-resheniya",
//       subcategories: [{ title: "Клеи", link: "/klei" }],
//     },
//     {
//       title: "Металлическая и пластиковая фурнитура",
//       link: "/metallicheskaya-i-plastiknaya-furnitura",
//       subcategories: [
//         { title: "Кайма пластиковая", link: "/kaima-plastiknaya" },
//         { title: "Металлическая фурнитура", link: "/metallicheskaya-furnitura" },
//         { title: "Неодимовые магниты", link: "/neodimovye-magnity" },
//       ],
//     },
//     {
//       title: "Инструменты",
//       link: "/instrumenty",
//       subcategories: [
//         { title: "Ручные инструменты", link: "/ruchnye-instrumenty" },
//         { title: "Постпечатные инструменты", link: "/postpechatnye-instrumenty" },
//       ],
//     },
//     {
//       title: "Фрезы и граверы",
//       link: "/frezy-i-gravery",
//       subcategories: [
//         { title: "Фрезы", link: "/frezy" },
//         { title: "Граверы", link: "/gravery" },
//       ],
//     },
//   ];

//   const contacts = [
//     { label: t("sidebar.contact_labels.consultant"), value: "+7 (777) 123-45-67" },
//     { label: t("sidebar.contact_labels.address"), value: t("sidebar.contacts.address") },
//     { label: t("sidebar.contact_labels.email"), value: "info@yilong.kz" },
//     { label: t("sidebar.contact_labels.phone"), value: "+7 (777) 123-45-67" },
//     { label: t("sidebar.contact_labels.phone"), value: "+7 (777) 123-45-67" },
//     { label: t("sidebar.contact_labels.phone"), value: "+7 (777) 123-45-67" },
//   ];

//   useEffect(() => {
//     categories.forEach((category, index) => {
//       const isCurrentCategory = pathname === category.link;
//       const hasActiveSubcategory = category.subcategories.some((sub) => pathname === sub.link);
//       if (isCurrentCategory || hasActiveSubcategory) setOpenCategory(index);
//     });
//   }, [pathname]); // eslint-disable-line

//   const handleCategoryClick = (index: number) => {
//     setOpenCategory(openCategory === index ? null : index);
//   };

//   return (
//     <aside className="w-65 bg-white/50 backdrop-blur-sm p-4 min-h-screen hidden md:block">
//       {/* Search (ixtiyoriy)
//       <div className="mb-6">
//         <div className="relative">
//           <input
//             type="text"
//             placeholder={t("sidebar.search_placeholder")}
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full px-4 py-2 border border-gray-400 rounded-lg pr-10 bg-white/50"
//           />
//           <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-900" />
//         </div>
//       </div> */}

//       {/* Menu */}
//       <div className="mb-8">
//         <h3 className="bg-blue-800 text-white px-4 py-2 font-semibold">{t("sidebar.menu")}</h3>
//         <div className="bg-white border border-gray-200">
//           {categories.map((category, index) => (
//             <div key={index} className="border-b border-gray-200 last:border-b-0">
//               <div className="flex items-center justify-between group">
//                 <a
//                   href={category.link}
//                   className={`flex-grow px-4 py-3 text-left hover:bg-gray-50 text-sm ${
//                     pathname === category.link ? "bg-blue-50 text-blue-700 font-medium" : ""
//                   }`}
//                 >
//                   {category.title}
//                 </a>
//                 {category.subcategories.length > 0 && (
//                   <button
//                     className="h-full px-4 py-3 hover:bg-gray-50 flex items-center justify-center"
//                     onClick={() => handleCategoryClick(index)}
//                     aria-label="Toggle submenu"
//                   >
//                     {openCategory === index ? (
//                       <ChevronDown className="w-4 h-4 text-gray-600" />
//                     ) : (
//                       <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
//                     )}
//                   </button>
//                 )}
//               </div>
//               {openCategory === index && category.subcategories.length > 0 && (
//                 <div className="bg-gray-100 p-2">
//                   {category.subcategories.map((subcategory, subIndex) => (
//                     <a
//                       key={subIndex}
//                       href={subcategory.link}
//                       className={`block px-4 py-2 text-sm rounded ${
//                         pathname === subcategory.link
//                           ? "bg-blue-100 text-blue-700 font-medium"
//                           : "text-gray-700 hover:bg-gray-200"
//                       }`}
//                     >
//                       {subcategory.title}
//                     </a>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Contacts */}
//       <div className="relative sticky top-5 mt-0">
//         <h3 className="bg-blue-800 text-white px-4 py-2 font-semibold">{t("sidebar.contacts_title")}</h3>
//         <div className="bg-white border border-gray-200 p-4">
//           {contacts.map((c, i) => (
//             <div key={i} className="mb-3 last:mb-0">
//               <div className="text-sm font-medium text-gray-700">{c.label}</div>
//               <div className="text-sm text-gray-600">{c.value}</div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </aside>
//   );
// }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// "use client";

// import { ChevronRight, ChevronDown } from "lucide-react";
// import { useState, useEffect } from "react";
// import { usePathname } from "next/navigation";
// import { useI18n } from "@/components/i18n/I18nProvider";

// type Cat = {
//   titleKey: string;
//   link: string;
//   subcategories: { titleKey: string; link: string }[];
// };

// export default function Sidebar() {
//   const { t } = useI18n();
//   const [openCategory, setOpenCategory] = useState<number | null>(null);
//   const pathname = usePathname();

//   const categories: Cat[] = [
//     {
//       titleKey: "categories.sheet.title",
//       link: "/listovye-materialy",
//       subcategories: [
//         { titleKey: "categories.sheet.sub.pvh_yilong", link: "/pvkh-yilong" },
//         { titleKey: "categories.sheet.sub.orgsteklo_yilong", link: "/orgsteklo-yilong" },
//         { titleKey: "categories.sheet.sub.pvc_yilong", link: "/pvc-yilong" },
//         { titleKey: "categories.sheet.sub.akril_jun_shang", link: "/akril-jun-shang" },
//         { titleKey: "categories.sheet.sub.roumark", link: "/roumark-plastik" },
//         { titleKey: "categories.sheet.sub.alyukobond", link: "/alyukobond" },
//         { titleKey: "categories.sheet.sub.penokarton", link: "/penokarton" },
//       ],
//     },
//     {
//       titleKey: "categories.roll.title",
//       link: "/rulonnye-materialy",
//       subcategories: [
//         { titleKey: "categories.roll.sub.banner", link: "/bannernaya-tkan" },
//         { titleKey: "categories.roll.sub.printing", link: "/materialy-dlya-pechati" },
//         { titleKey: "categories.roll.sub.tent", link: "/tentovaya-tkan" },
//         { titleKey: "categories.roll.sub.lamination", link: "/plenki-dlya-laminirovaniya" },
//         { titleKey: "categories.roll.sub.colored_vinyl", link: "/tsvetnaya-samokleyushchayasya-plenka" },
//         { titleKey: "categories.roll.sub.montage", link: "/montazhnye-plenki" },
//         { titleKey: "categories.roll.sub.stained_glass", link: "/vitrazhnye-plenki" },
//         { titleKey: "categories.roll.sub.magnetic_vinyl", link: "/magnitnyy-vinil" },
//         { titleKey: "categories.roll.sub.wallpaper", link: "/oboi-dlya-pechati" },
//       ],
//     },
//     {
//       titleKey: "categories.lighting.title",
//       link: "/istochniki-sveta",
//       subcategories: [
//         { titleKey: "categories.lighting.sub.floodlight", link: "/led-prozhektory" },
//         { titleKey: "categories.lighting.sub.modules", link: "/moduli-svetodiodnye" },
//         { titleKey: "categories.lighting.sub.strips", link: "/svetodiodnye-lenty" },
//       ],
//     },
//     {
//       titleKey: "categories.power.title",
//       link: "/transformatory",
//       subcategories: [
//         { titleKey: "categories.power.sub.transformers", link: "/transformatory-vnutrennie" },
//         { titleKey: "categories.power.sub.controllers", link: "/kontrollery-dimmeri" },
//         { titleKey: "categories.power.sub.inks", link: "/chernila-kraski" },
//       ],
//     },
//     {
//       titleKey: "categories.inks.title",
//       link: "/chernila-kraski",
//       subcategories: [
//         { titleKey: "categories.inks.sub.solvent", link: "/solventnye-kraski" },
//         { titleKey: "categories.inks.sub.ecosolvent", link: "/ekosolventnye-kraski" },
//       ],
//     },
//     {
//       titleKey: "categories.expo.title",
//       link: "/reklamnoe-i-vystavochnoe-oborudovanie",
//       subcategories: [
//         { titleKey: "categories.expo.sub.popup", link: "/pop-up-stendy" },
//         { titleKey: "categories.expo.sub.x_structures", link: "/x-konstruktsii" },
//         { titleKey: "categories.expo.sub.rollup", link: "/roll-stendy" },
//         { titleKey: "categories.expo.sub.promo", link: "/promostoly" },
//         { titleKey: "categories.expo.sub.flags", link: "/flagi" },
//         { titleKey: "categories.expo.sub.posm", link: "/posm-materialy" },
//       ],
//     },
//     {
//       titleKey: "categories.aluminum.title",
//       link: "/alyuminievye-profili",
//       subcategories: [
//         { titleKey: "categories.aluminum.sub.profiles", link: "/profili-alyuminievye" },
//         { titleKey: "categories.aluminum.sub.accessories", link: "/komplektuyushchie-dlya-profily" },
//         { titleKey: "categories.aluminum.sub.led_profiles", link: "/alyuminievye-profili-dlya-svetodiodnyh-lent" },
//       ],
//     },
//     {
//       titleKey: "categories.adhesives.title",
//       link: "/kleevye-resheniya",
//       subcategories: [{ titleKey: "categories.adhesives.sub.glues", link: "/klei" }],
//     },
//     {
//       titleKey: "categories.fittings.title",
//       link: "/metallicheskaya-i-plastiknaya-furnitura",
//       subcategories: [
//         { titleKey: "categories.fittings.sub.plastic_edge", link: "/kaima-plastiknaya" },
//         { titleKey: "categories.fittings.sub.metal", link: "/metallicheskaya-furnitura" },
//         { titleKey: "categories.fittings.sub.neodymium", link: "/neodimovye-magnity" },
//       ],
//     },
//     {
//       titleKey: "categories.tools.title",
//       link: "/instrumenty",
//       subcategories: [
//         { titleKey: "categories.tools.sub.hand", link: "/ruchnye-instrumenty" },
//         { titleKey: "categories.tools.sub.postpress", link: "/postpechatnye-instrumenty" },
//       ],
//     },
//     {
//       titleKey: "categories.cutters.title",
//       link: "/frezy-i-gravery",
//       subcategories: [
//         { titleKey: "categories.cutters.sub.mills", link: "/frezy" },
//         { titleKey: "categories.cutters.sub.engravers", link: "/gravery" },
//       ],
//     },
//   ];

//   const contacts = [
//     { labelKey: "sidebar.contact_labels.consultant", value: "+7 (777) 123-45-67" },
//     { labelKey: "sidebar.contact_labels.address", value: "г. Алматы, ул. Есим хана 12, Алматы, Казахстан" },
//     { labelKey: "sidebar.contact_labels.email", value: "info@yilong.kz" },
//     { labelKey: "sidebar.contact_labels.phone", value: "+7 (777) 123-45-67" },
//     { labelKey: "sidebar.contact_labels.phone", value: "+7 (777) 123-45-67" },
//     { labelKey: "sidebar.contact_labels.phone", value: "+7 (777) 123-45-67" },
//   ];

//   useEffect(() => {
//     categories.forEach((category, index) => {
//       const isCurrentCategory = pathname === category.link;
//       const hasActiveSubcategory = category.subcategories.some((sub) => pathname === sub.link);
//       if (isCurrentCategory || hasActiveSubcategory) setOpenCategory(index);
//     });
//   }, [pathname]); // eslint-disable-line

//   const handleCategoryClick = (index: number) =>
//     setOpenCategory(openCategory === index ? null : index);

//   return (
//     <aside className="w-65 bg-white/50 backdrop-blur-sm p-4 min-h-screen hidden md:block">
//       {/* Menu */}
//       <div className="mb-8">
//         <h3 className="bg-blue-800 text-white px-4 py-2 font-semibold">{t("sidebar.menu")}</h3>
//         <div className="bg-white border border-gray-200">
//           {categories.map((category, index) => (
//             <div key={index} className="border-b border-gray-200 last:border-b-0">
//               <div className="flex items-center justify-between group">
//                 <a
//                   href={category.link}
//                   className={`flex-grow px-4 py-3 text-left hover:bg-gray-50 text-sm ${
//                     pathname === category.link ? "bg-blue-50 text-blue-700 font-medium" : ""
//                   }`}
//                 >
//                   {t(category.titleKey)}
//                 </a>
//                 {category.subcategories.length > 0 && (
//                   <button
//                     className="h-full px-4 py-3 hover:bg-gray-50 flex items-center justify-center"
//                     onClick={() => handleCategoryClick(index)}
//                   >
//                     {openCategory === index ? (
//                       <ChevronDown className="w-4 h-4 text-gray-600" />
//                     ) : (
//                       <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
//                     )}
//                   </button>
//                 )}
//               </div>
//               {openCategory === index && category.subcategories.length > 0 && (
//                 <div className="bg-gray-100 p-2">
//                   {category.subcategories.map((subcategory, subIndex) => (
//                     <a
//                       key={subIndex}
//                       href={subcategory.link}
//                       className={`block px-4 py-2 text-sm rounded ${
//                         pathname === subcategory.link
//                           ? "bg-blue-100 text-blue-700 font-medium"
//                           : "text-gray-700 hover:bg-gray-200"
//                       }`}
//                     >
//                       {t(subcategory.titleKey)}
//                     </a>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Contacts */}
//       <div className="relative sticky top-5 mt-0">
//         <h3 className="bg-blue-800 text-white px-4 py-2 font-semibold">{t("sidebar.contacts_title")}</h3>
//         <div className="bg-white border border-gray-200 p-4">
//           {contacts.map((c, idx) => (
//             <div key={idx} className="mb-3 last:mb-0">
//               <div className="text-sm font-medium text-gray-700">{t(c.labelKey)}</div>
//               <div className="text-sm text-gray-600">{c.value}</div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </aside>
//   );
// }

///////////////////////////////////////////////////////////////////////////////////////////////////////////

// "use client";

// import { ChevronRight, ChevronDown } from "lucide-react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useEffect, useState } from "react";
// import { CATALOG } from "@/lib/catalog";
// import { useI18n } from "@/components/i18n/I18nProvider";

// export default function Sidebar() {
//   const { t } = useI18n();
//   const pathname = usePathname();
//   const [openId, setOpenId] = useState<string | null>(null);

//   // t() uchun xavfsiz fallback helper
//   const tr = (key: string, fallback: string) => {
//     const val = t(key as any);
//     return val && val !== key ? val : fallback;
//   };

//   useEffect(() => {
//     const segs = pathname.split("/").filter(Boolean); // [sectionId, categoryId, ...]
//     setOpenId(segs[0] || null);
//   }, [pathname]);

//   const toggle = (id: string) => setOpenId((p) => (p === id ? null : id));

//   const contacts = [
//     {
//       label: tr("sidebar.contact_labels.consultant", "Maslahatchi"),
//       value: "+7 (777) 123-45-67",
//     },
//     {
//       label: tr("sidebar.contact_labels.address", "Manzil"),
//       // ❗ lug‘atdagi to‘g‘ri kalit: sidebar.contacts.address
//       value: tr("sidebar.contacts.address", "г. Алматы, ул. Есим хана 12, Алматы, Казахстан"),
//     },
//     {
//       label: tr("sidebar.contact_labels.email", "Email"),
//       value: "info@yilong.kz",
//     },
//     {
//       label: tr("sidebar.contact_labels.phone", "Telefon"),
//       value: "+7 (777) 123-45-67",
//     },
//   ];

//   return (
//     <aside className="w-64 bg-white/50 backdrop-blur-sm p-4 min-h-screen hidden md:block">
//       {/* Menu */}
//       <div className="mb-8">
//         <h3 className="bg-blue-800 text-white px-4 py-2 font-semibold">
//           {t("sidebar.menu")}
//         </h3>

//         <div className="bg-white border border-gray-200">
//           {CATALOG.map((sec) => {
//             const secHref = `/${sec.id}`;
//             const isOpen = openId === sec.id;
//             // kategoriya sahifasida ham bo‘lim aktiv ko‘rinishi uchun:
//             const isActive = pathname.startsWith(secHref);

//             const secTitle = tr(
//               `catalog.sections.${sec.id}.title`,
//               sec.title || sec.id
//             );

//             return (
//               <div key={sec.id} className="border-b border-gray-200 last:border-b-0">
//                 <div className="flex items-center justify-between group">
//                   <Link
//                     href={secHref}
//                     className={`flex-grow px-4 py-3 text-left hover:bg-gray-50 text-sm ${
//                       isActive ? "bg-blue-50 text-blue-700 font-medium" : ""
//                     }`}
//                   >
//                     {secTitle}
//                   </Link>

//                   {!!sec.categories?.length && (
//                     <button
//                       className="h-full px-4 py-3 hover:bg-gray-50 flex items-center justify-center"
//                       onClick={() => toggle(sec.id)}
//                       aria-label="toggle"
//                     >
//                       {isOpen ? (
//                         <ChevronDown className="w-4 h-4 text-gray-600" />
//                       ) : (
//                         <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
//                       )}
//                     </button>
//                   )}
//                 </div>

//                 {isOpen && !!sec.categories?.length && (
//                   <div className="bg-gray-100 p-2">
//                     {sec.categories.map((cat) => {
//                       const catHref = `/${sec.id}/${cat.id}`;
//                       const catActive = pathname.startsWith(catHref);

//                       const catTitle = tr(
//                         `catalog.sections.${sec.id}.categories.${cat.id}`,
//                         cat.title || cat.id
//                       );

//                       return (
//                         <Link
//                           key={cat.id}
//                           href={catHref}
//                           className={`block px-4 py-2 text-sm rounded ${
//                             catActive
//                               ? "bg-blue-100 text-blue-700 font-medium"
//                               : "text-gray-700 hover:bg-gray-200"
//                           }`}
//                         >
//                           {catTitle}
//                         </Link>
//                       );
//                     })}
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* Contacts */}
//       <div className="relative sticky top-5 mt-0">
//         <h3 className="bg-blue-800 text-white px-4 py-2 font-semibold">
//           {t("sidebar.contacts_title")}
//         </h3>

//         <div className="bg-white border border-gray-200 p-4">
//           {contacts.map((c, i) => (
//             <div key={i} className="mb-3 last:mb-0">
//               <div className="text-sm font-medium text-gray-700">{c.label}</div>
//               <div className="text-sm text-gray-600">{c.value}</div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </aside>
//   );
// }

//////////////////////////////////////////////////////////////////////////////////////////////////////////

// src/components/layout/sidebar/Sidebar.tsx
// "use client";

// import { ChevronRight, ChevronDown } from "lucide-react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useEffect, useMemo, useState } from "react";
// import { CATALOG } from "@/lib/catalog";
// import { useI18n } from "@/components/i18n/I18nProvider";

// /**
//  * ===================== Alias xaritalar (section & category) =====================
//  * CATALOG ichida uchrashi mumkin bo‘lgan “qisqa/variant” id’larni
//  * kanonik i18n kalitlarga bog‘laymiz.
//  */
// const SECTION_ID_ALIASES: Record<string, string> = {
//   // qisqa -> kanonik
//   "reklamno-vystavochnoe": "reklamnoe-i-vystavochnoe-oborudovanie",
//   "alyuminievye-profily": "alyuminievye-profili",
//   "alyuminievye-profilya-i-komplektuyushchie": "alyuminievye-profili",
//   "metal-i-plast-furnitura": "metallicheskaya-i-plastiknaya-furnitura",

//   // ehtimoliy variantlar (o‘zini-o‘zi ko‘rsatadi)
//   "rulon-materialy": "rulonnye-materialy",
//   "rulonnye-materialy": "rulonnye-materialy",
//   "istochniki-sveta": "istochniki-sveta",
//   "transformatory-i-upravlenie": "transformatory-i-upravlenie",
//   "chernila-kraski": "chernila-kraski",
//   "kleevye-resheniya": "kleevye-resheniya",
//   instrumenty: "instrumenty",
//   "frezy-i-gravery": "frezy-i-gravery",
//   "listovye-materialy": "listovye-materialy",
// };

// const CATEGORY_ID_ALIASES: Record<string, Record<string, string>> = {
//   // Rulonli materiallar
//   "rulonnye-materialy": {
//     "bannernaya-tkan": "bannernaya-tkan",
//     "materialy-dlya-pechati": "materialy-dlya-pechati",
//     "tentovaya-tkan": "tentovaya-tkan",
//     "plenki-dlya-laminirovaniya": "plenki-dlya-laminirovaniya",
//     "tsvetnaya-samokleyushchayasya-plenka":
//       "tsvetnaya-samokleyushchayasya-plenka",
//     "montazhnye-plenki": "montazhnye-plenki",
//     "vitrazhnye-plenki": "vitrazhnye-plenki",
//     "magnitnyy-vinil": "magnitnyy-vinil",
//     "oboi-dlya-pechati": "oboi-dlya-pechati",

//     // qisqa/variant id’lar
//     "banner-tkan": "bannernaya-tkan",
//     "oboi-pechati": "oboi-dlya-pechati",
//     "plenki-laminirovaniya": "plenki-dlya-laminirovaniya",
//     "montazhnyye-plenki": "montazhnye-plenki",
//     "magnitnyj-vinil": "magnitnyy-vinil",
//     "tent-tkan": "tentovaya-tkan",
//   },

//   // Yoritish manbalari
//   "istochniki-sveta": {
//     "led-prozhektory": "led-prozhektory",
//     "moduli-svetodiodnye": "moduli-svetodiodnye",
//     "svetodiodnye-lenty": "svetodiodnye-lenty",
//     "led-prozhektory-sofity": "led-prozhektory",
//     "svetodiodnye-lenty-led": "svetodiodnye-lenty",
//   },

//   // Transformatorlar va boshqaruv
//   "transformatory-i-upravlenie": {
//     "transformatory-vnutrennie": "transformatory-vnutrennie",
//     "kontrollery-dimmeri": "kontrollery-dimmeri",
//     "chernila-kraski": "chernila-kraski",
//   },

//   // Bo‘yoqlar
//   "chernila-kraski": {
//     "solventnye-kraski": "solventnye-kraski",
//     "ekosolventnye-kraski": "ekosolventnye-kraski",
//     solvent: "solventnye-kraski",
//     ecosolvent: "ekosolventnye-kraski",
//   },

//   // Reklama & ko‘rgazma uskunalari (uzun kanonik nom)
//   "reklamnoe-i-vystavochnoe-oborudovanie": {
//     "pop-up-stendy": "pop-up-stendy",
//     "x-konstruktsii": "x-konstruktsii",
//     "roll-stendy": "roll-stendy",
//     promostoly: "promostoly",
//     flagi: "flagi",
//     "posm-materialy": "posm-materialy",

//     // ba’zan Alyuminiy bo‘limi elementlari shu yerga aralashib qolishi mumkin
//     "profily-alyuminievye": "profili-alyuminievye",
//     "komplektuyushchie-dlya-profilya": "komplektuyushchie-dlya-profily",
//     "profil-dlya-lent": "alyuminievye-profili-dlya-svetodiodnyh-lent",
//   },

//   // Alyuminiy profillar
//   "alyuminievye-profili": {
//     "profily-alyuminievye": "profili-alyuminievye",
//     "profili-alyuminievye": "profili-alyuminievye",
//     "komplektuyushchie-dlya-profily": "komplektuyushchie-dlya-profily",
//     "komplektuyushchie-dlya-profilya": "komplektuyushchie-dlya-profily",
//     "alyuminievye-profili-dlya-svetodiodnyh-lent":
//       "alyuminievye-profili-dlya-svetodiodnyh-lent",
//     "profil-dlya-lent": "alyuminievye-profili-dlya-svetodiodnyh-lent",
//   },

//   // Yopishtirish yechimlari
//   "kleevye-resheniya": {
//     klei: "klei",
//     skotch: "skotch",
//   },

//   // Metall/plastik furnitura
//   "metallicheskaya-i-plastiknaya-furnitura": {
//     "kaima-plastiknaya": "kaima-plastiknaya",
//     "kajma-plastikovaya": "kaima-plastiknaya",
//     "metallicheskaya-furnitura": "metallicheskaya-furnitura",
//     "metal-furnitura": "metallicheskaya-furnitura",
//     "neodimovye-magnity": "neodimovye-magnity",
//   },

//   // Asboblar
//   instrumenty: {
//     "ruchnye-instrumenty": "ruchnye-instrumenty",
//     "postpechatnye-instrumenty": "postpechatnye-instrumenty",
//   },

//   // Frezalar & graverlar
//   "frezy-i-gravery": {
//     frezy: "frezy",
//     gravery: "gravery",
//   },
// };

// /** Kichik normalizator: ba’zi yozilish farqlarini avtomatik to‘g‘rilash (oxirgi chora) */
// function normalizeCatIdGuess(id: string): string[] {
//   const variants = new Set<string>([id]);

//   // y/j (magnitnyy vs magnitnyj)
//   variants.add(id.replace(/magnitnyj/g, "magnitnyy"));

//   // qisqartmalar → kanonik
//   variants.add(id.replace(/banner-tkan/g, "bannernaya-tkan"));
//   variants.add(id.replace(/oboi-pechati/g, "oboi-dlya-pechati"));
//   variants.add(
//     id.replace(/plenki-laminirovaniya/g, "plenki-dlya-laminirovaniya")
//   );
//   variants.add(id.replace(/montazhnyye-plenki/g, "montazhnye-plenki"));
//   variants.add(id.replace(/tent-tkan/g, "tentovaya-tkan"));

//   // profily/profili
//   variants.add(id.replace(/profily-alyuminievye/g, "profili-alyuminievye"));

//   // profil-dlya-lent → alyuminievye-profili-dlya-svetodiodnyh-lent
//   variants.add(
//     id.replace(
//       /profil-dlya-lent/g,
//       "alyuminievye-profili-dlya-svetodiodnyh-lent"
//     )
//   );

//   // samokleyushchayasya yozilishidagi farqlar
//   variants.add(id.replace(/samokleyushchay(a|as)ya/g, "samokleyushchayasya"));

//   return Array.from(variants);
// }

// /** Kanonik ID yordamchilari (kerak bo‘lsa tashqarida ham ishlatishingiz mumkin) */
// export const canonSectionId = (id: string) => SECTION_ID_ALIASES[id] ?? id;

// export const canonCategoryId = (sectionId: string, categoryId: string) => {
//   const s = canonSectionId(sectionId);
//   return CATEGORY_ID_ALIASES[s]?.[categoryId] ?? categoryId;
// };

// /** ===================== Sidebar ===================== */
// export default function Sidebar() {
//   const { t } = useI18n();
//   const pathname = usePathname();
//   const [openId, setOpenId] = useState<string | null>(null);

//   // i18n helper (fallback bilan)
//   const tr = (key: string, fallback: string) => {
//     const val = t(key as any);
//     return val && val !== key ? val : fallback;
//   };

//   // Section & Category uchun i18n kalitlari nomzodlari
//   const sectionKeyCandidates = useMemo(() => {
//     return (secId: string) => {
//       const canonical = SECTION_ID_ALIASES[secId] || secId;
//       return [`catalog.sections.${canonical}.title`];
//     };
//   }, []);

//   const categoryKeyCandidates = useMemo(() => {
//     return (secId: string, catId: string) => {
//       const canonicalSec = SECTION_ID_ALIASES[secId] || secId;
//       const catAliases = CATEGORY_ID_ALIASES[canonicalSec] || {};
//       const canonicalCat = catAliases[catId] || catId;

//       const cands = new Set<string>();
//       cands.add(`catalog.sections.${canonicalSec}.categories.${canonicalCat}`);
//       normalizeCatIdGuess(canonicalCat).forEach((v) =>
//         cands.add(`catalog.sections.${canonicalSec}.categories.${v}`)
//       );
//       return Array.from(cands);
//     };
//   }, []);

//   const trMany = (keys: string[], fallback: string) => {
//     for (const k of keys) {
//       const got = t(k as any);
//       if (got && got !== k) return got;
//     }
//     return fallback;
//   };

//   useEffect(() => {
//     const segs = pathname.split("/").filter(Boolean);
//     setOpenId(segs[0] || null);
//   }, [pathname]);

//   const toggle = (id: string) => setOpenId((p) => (p === id ? null : id));

//   const contacts = [
//     {
//       label: tr("sidebar.contact_labels.consultant", "Yordamchi"),
//       value: "+998 77 268 66 58",
//     },
//     {
//       label: tr("sidebar.contact_labels.address", "Manzil"),
//       value: tr(
//         "sidebar.contacts.address",
//         "1-dovon Eski Otchopar, Mirobod tumani, Toshkent"
//       ),
//     },
//     {
//       label: tr("sidebar.contact_labels.email", "Email"),
//       value: "info@yilong.uz",
//     },
//     {
//       label: tr("sidebar.contact_labels.phone", "Telefon"),
//       value: "+998 77 268 66 59",
//     },
//   ];

//   return (
//     <aside className="w-64 bg-white/50 backdrop-blur-sm p-4 min-h-screen hidden md:block">
//       {/* Menu */}
//       <div className="mb-8">
//         <h3 className="bg-blue-800 text-white px-4 py-2 font-semibold">
//           {t("sidebar.menu")}
//         </h3>

//         <div className="bg-white border border-gray-200">
//           {CATALOG.map((sec) => {
//             const secHref = `/${sec.id}`; // Link saqlanadi (ID bilan)
//             const isOpen = openId === sec.id;
//             const isActive = pathname.startsWith(secHref);

//             const secTitle = trMany(
//               sectionKeyCandidates(sec.id),
//               sec.title || sec.id
//             );

//             return (
//               <div
//                 key={sec.id}
//                 className="border-b border-gray-200 last:border-b-0"
//               >
//                 <div className="flex items-center justify-between group">
//                   <Link
//                     href={secHref}
//                     className={`flex-grow px-4 py-3 text-left hover:bg-gray-50 text-sm ${
//                       isActive ? "bg-blue-50 text-blue-700 font-medium" : ""
//                     }`}
//                   >
//                     {secTitle}
//                   </Link>

//                   {!!sec.categories?.length && (
//                     <button
//                       className="h-full px-4 py-3 hover:bg-gray-50 flex items-center justify-center"
//                       onClick={() => toggle(sec.id)}
//                       aria-label="toggle"
//                     >
//                       {isOpen ? (
//                         <ChevronDown className="w-4 h-4 text-gray-600" />
//                       ) : (
//                         <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
//                       )}
//                     </button>
//                   )}
//                 </div>

//                 {isOpen && !!sec.categories?.length && (
//                   <div className="bg-gray-100 p-2">
//                     {sec.categories.map((cat) => {
//                       const catHref = `/${sec.id}/${cat.id}`; // Link saqlanadi (ID bilan)
//                       const catActive = pathname.startsWith(catHref);

//                       const catTitle = trMany(
//                         categoryKeyCandidates(sec.id, cat.id),
//                         cat.title || cat.id
//                       );

//                       return (
//                         <Link
//                           key={cat.id}
//                           href={catHref}
//                           className={`block px-4 py-2 text-sm rounded ${
//                             catActive
//                               ? "bg-blue-100 text-blue-700 font-medium"
//                               : "text-gray-700 hover:bg-gray-200"
//                           }`}
//                         >
//                           {catTitle}
//                         </Link>
//                       );
//                     })}
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* Contacts (sticky) */}
//       <div className="relative sticky top-5 mt-0">
//         <h3 className="bg-blue-800 text-white px-4 py-2 font-semibold">
//           {t("sidebar.contacts_title")}
//         </h3>

//         <div className="bg-white border border-gray-200 p-4">
//           {contacts.map((c, i) => (
//             <div key={i} className="mb-3 last:mb-0">
//               <div className="text-sm font-medium text-gray-700">{c.label}</div>
//               <div className="text-sm text-gray-600">{c.value}</div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </aside>
//   );
// }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
