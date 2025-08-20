"use client"

import { useState } from "react"
import { ChevronDown, Phone, MapPin } from "lucide-react"
import Link from "next/link"

const categoriesData = [
  { title: "Листовые материалы", link: "/listovye-materialy" },
  { title: "Рулонные материалы", link: "/rulonnye-materialy" },
  { title: "Источники света (светодиоды, лампы и пр.)", link: "/istochniki-sveta" },
  { title: "Трансформаторы и источники управления", link: "/transformatory" },
  { title: "Чернила (краски)", link: "/chernila" },
  { title: "Рекламное и выставочное оборудование", link: "/reklamnoe-oborudovanie" },
  { title: "Алюминиевые профили и комплектующие", link: "/profili-i-komplektuyushchie" },
  { title: "Клеевые решения (скотч, клей)", link: "/kleevye-resheniya" },
  { title: "Металлическая и пластиковая фурнитура", link: "/furnitura" },
  { title: "Инструменты", link: "/instrumenty" },
  { title: "Фрезы и граверы", link: "/frezy-i-gravery" },
]

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  return (
    <header className="bg-slate-700 text-white">
      {/* Top Bar with Contacts and Location */}
      <div className="bg-slate-800 text-gray-400 py-1.5 px-4 hidden md:block">
        <div className="container mx-auto flex justify-end items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <span>+998 (77) 900-25-86, +998 (77) 129-11-66</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>г. Ташкент, ул. Хамида Алимжана 10А</span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="px-4 py-4 container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <span className="text-slate-700 font-bold text-xl">YL</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">Yi Long</h1>
              <p className="text-sm text-gray-300">Материалы для наружной рекламы</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 w-max">
            <div className="relative group">
              <Link href="/" className="relative transition-colors">
                Главная
                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-white origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-300"></div>
              </Link>
            </div>

            <div
              className="relative group"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <a href="/tovary-i-uslugi" className="flex items-center gap-1 transition-colors">
                Товары и услуги
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : "rotate-0"}`}
                />
                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-white origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-300"></div>
              </a>

              <div
                className={`absolute top-full  -translate-x-1/2 mt-4 min-w-[900px] bg-slate-900 text-white rounded-lg shadow-lg z-50 transition-all duration-300 ease-in-out ${isDropdownOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"}`}
              >
                <div className="grid grid-cols-4 gap-6 p-8">
                  {categoriesData.map((category, index) => (
                    <div key={index} className="text-base font-medium flex flex-col justify-between">
                      <a href={category.link} className="hover:text-gray-300">
                        {category.title}
                      </a>
                      <div className="mt-2 border-b border-gray-600 w-full"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative group">
              <Link href="/about" className="relative transition-colors">
                О нас
                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-white origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-300"></div>
              </Link>
            </div>

            <div className="relative group">
              <Link href="/contact" className="relative transition-colors">
                Контакты
                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-white origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-300"></div>
              </Link>
            </div>

            <div className="relative group">
              <Link href="/certificates" className="relative transition-colors">
                Сертификаты
                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-white origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-300"></div>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
