import { Truck, Shield } from "lucide-react"

export default function CompanyAdvantages() {
  const advantages = [
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Быстрая доставка",
      description: "Доставка собственным транспортом по Алматы в день заказа",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Гарантия качества",
      description: "Все материалы сертифицированы и соответствуют стандартам качества",
    },
  ]

  return (
    <section className="mb-8">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Конкурентные преимущества наших рекламных материалов</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {advantages.map((advantage, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-start gap-4">
              <div className="text-blue-600 flex-shrink-0">{advantage.icon}</div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">{advantage.title}</h3>
                <p className="text-gray-600 text-sm">{advantage.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-6">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
          В каталог
        </button>
      </div>
    </section>
  )
}
