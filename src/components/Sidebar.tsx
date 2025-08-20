"use client"

import { Search, ChevronRight, ChevronDown } from "lucide-react"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

export default function Sidebar() {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [openCategory, setOpenCategory] = useState<number | null>(null)
  const pathname = usePathname()

  const categories = [
    {
      title: "Листовые материалы",
      link: "/listovye-materialy",
      subcategories: [
        { title: "ПВХ Yilong", link: "/pvkh-yilong" },
        { title: "Оргстекло Yilong", link: "/orgsteklo-yilong" },
        { title: "PVC Yilong", link: "/pvc-yilong" },
        { title: "Акрил JUN SHANG", link: "/akril-jun-shang" },
        { title: "Роумарк (пластик для гравировки)", link: "/roumark-plastik" },
        { title: "Алюкобонд", link: "/alyukobond" },
        { title: "Пенокартон", link: "/penokarton" },
      ],
    },
    {
      title: "Рулонные материалы",
      link: "/rulonnye-materialy",
      subcategories: [
        { title: "Баннерная ткань", link: "/bannernaya-tkan" },
        { title: "Материалы для печати", link: "/materialy-dlya-pechati" },
        { title: "Тентовая ткань", link: "/tentovaya-tkan" },
        { title: "Пленки для ламинирования", link: "/plenki-dlya-laminirovaniya" },
        { title: "Цветная самоклеящаяся виниловая пленка", link: "/tsvetnaya-samokleyushchayasya-plenka" },
        { title: "Монтажные пленки", link: "/montazhnye-plenki" },
        { title: "Витражные пленки", link: "/vitrazhnye-plenki" },
        { title: "Магнитный винил", link: "/magnitnyy-vinil" },
        { title: "Обои для печати", link: "/oboi-dlya-pechati" },
      ],
    },
    {
      title: "Источники света (светодиоды, лампы и пр.)",
      link: "/istochniki-sveta",
      subcategories: [
        { title: "LED прожекторы (софиты)", link: "/led-prozhektory" },
        { title: "Модули светодиодные", link: "/moduli-svetodiodnye" },
        { title: "Светодиодные ленты", link: "/svetodiodnye-lenty" },
      ],
    },
    {
      title: "Трансформаторы и источники управления",
      link: "/transformatory",
      subcategories: [
        { title: "Трансформаторы (внутренние и наружные)", link: "/transformatory-vnutrennie" },
        { title: "Контроллеры, диммеры, усилители", link: "/kontrollery-dimmeri" },
        { title: "Чернила (краски)", link: "/chernila" },
      ],
    },
    {
      title: "Чернила (краски)",
      link: "/chernila",
      subcategories: [
        { title: "Сольвентные краски", link: "/solventnye-kraski" },
        { title: "Экосольвентные краски", link: "/ekosolventnye-kraski" },
      ],
    },
    {
      title: "Рекламное и выставочное оборудование",
      link: "/reklamnoe-i-vystavochnoe-oborudovanie",
      subcategories: [
        { title: "Поп-ап стенды (pop up, пресс-стены)", link: "/pop-up-stendy" },
        { title: "X-конструкции, X-баннера,паучки", link: "/x-konstruktsii" },
        { title: "Ролл-стенды roll up", link: "/roll-stendy" },
        { title: "Промостолы, промостойки", link: "/promostoly" },
        { title: "Флагштоки (флаги)", link: "/flagi" },
        { title: "POSM материалы (разное)", link: "/posm-materialy" },
      ],
    },
    {
      title: "Алюминиевые профили и комплектующие",
      link: "/alyuminievye-profili",
      subcategories: [
        { title: "Профили алюминиевые", link: "/profili-alyuminievye" },
        { title: "Комплектующие для профилей", link: "/komplektuyushchie-dlya-profily" },
        { title: "Алюминиевые профили для светодиодных лент", link: "/alyuminievye-profili-dlya-svetodiodnyh-lent" },
      ],
    },
    {
      title: "Клеевые решения (скотч, клей)",
      link: "/kleevye-resheniya",
      subcategories: [{ title: "Клеи", link: "/klei" }],
    },
    {
      title: "Металлическая и пластиковая фурнитура",
      link: "/metallicheskaya-i-plastiknaya-furnitura",
      subcategories: [
        { title: "Кайма пластиковая", link: "/kaima-plastiknaya" },
        { title: "Металлическая фурнитура", link: "/metallicheskaya-furnitura" },
        { title: "Неодимовые магниты", link: "/neodimovye-magnity" },
      ],
    },
    {
      title: "Инструменты",
      link: "/instrumenty",
      subcategories: [
        { title: "Ручные инструменты", link: "/ruchnye-instrumenty" },
        { title: "Постпечатные инструменты", link: "/postpechatnye-instrumenty" },
      ],
    },
    {
      title: "Фрезы и граверы",
      link: "/frezy-i-gravery",
      subcategories: [
        { title: "Фрезы", link: "/frezy" },
        { title: "Граверы", link: "/gravery" },
      ],
    },
  ]

  const contacts = [
    { type: "Консультант", phone: "+7 (777) 123-45-67" },
    { type: "Адрес", info: "г. Алматы, ул. Есим хана 12, Алматы, Казахстан" },
    { type: "Email", info: "info@yilong.kz" },
    { type: "Телефон", phone: "+7 (777) 123-45-67" },
    { type: "Телефон", phone: "+7 (777) 123-45-67" },
    { type: "Телефон", phone: "+7 (777) 123-45-67" },
  ]

  useEffect(() => {
    categories.forEach((category, index) => {
      const isCurrentCategory = pathname === category.link
      const hasActiveSubcategory = category.subcategories.some((sub) => pathname === sub.link)

      if (isCurrentCategory || hasActiveSubcategory) {
        setOpenCategory(index)
      }
    })
  }, [pathname])

  const handleCategoryClick = (index: number) => {
    setOpenCategory(openCategory === index ? null : index)
  }

  return (
    <aside className="w-80 bg-white/50 backdrop-blur-sm p-4 min-h-screen">
      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Поиск"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-400 rounded-lg pr-10 bg-white/50"
          />
          <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-900" />
        </div>
      </div>

      {/* Menu */}
      <div className="mb-8">
        <h3 className="bg-slate-700 text-white px-4 py-2 font-semibold">Меню</h3>
        <div className="bg-white border border-gray-200">
          {categories.map((category, index) => (
            <div key={index} className="border-b border-gray-200 last:border-b-0">
              <div className="flex items-center justify-between group">
                <a
                  href={category.link}
                  className={`flex-grow px-4 py-3 text-left hover:bg-gray-50 text-sm ${
                    pathname === category.link ? "bg-blue-50 text-blue-700 font-medium" : ""
                  }`}
                >
                  {category.title}
                </a>
                {category.subcategories.length > 0 && (
                  <button
                    className="h-full px-4 py-3 hover:bg-gray-50 flex items-center justify-center"
                    onClick={() => handleCategoryClick(index)}
                  >
                    {openCategory === index ? (
                      <ChevronDown className="w-4 h-4 text-gray-600" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                    )}
                  </button>
                )}
              </div>
              {openCategory === index && category.subcategories.length > 0 && (
                <div className="bg-gray-100 p-2">
                  {category.subcategories.map((subcategory, subIndex) => (
                    <a
                      key={subIndex}
                      href={subcategory.link}
                      className={`block px-4 py-2 text-sm rounded ${
                        pathname === subcategory.link
                          ? "bg-blue-100 text-blue-700 font-medium"
                          : "text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {subcategory.title}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contacts */}
      <div className="relative sticky top-5 mt-0">
        <h3 className="bg-slate-700 text-white px-4 py-2 font-semibold">Контакты</h3>
        <div className="bg-white border border-gray-200 p-4">
          {contacts.map((contact, index) => (
            <div key={index} className="mb-3 last:mb-0">
              <div className="text-sm font-medium text-gray-700">{contact.type}</div>
              <div className="text-sm text-gray-600">{contact.phone || contact.info}</div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}
