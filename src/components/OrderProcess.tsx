import { Phone, Clock, Truck, CheckCircle, CreditCard, Headphones, Wallet } from "lucide-react"

export default function OrderProcess() {
  const steps = [
    {
      icon: <Phone className="w-8 h-8" />,
      title: "Консультация и расчет стоимости",
      description: "Обращение к нашим специалистам",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Подготовка заказа",
      description: "Мы быстро подготовим ваш заказ к отгрузке",
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Доставка",
      description: "Доставляем заказ в удобное время",
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Получение заказа",
      description: "Проверяете качество и получаете товар",
    },
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: "Оплата",
      description: "Наличный и безналичный расчет",
    },
    {
      icon: <Headphones className="w-8 h-8" />,
      title: "Послепродажное обслуживание",
      description: "Поддержка клиентов после покупки",
    },
  ]

  return (
    <section className="">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Этапы выполнения при сотрудничестве с нами</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {steps.map((step, index) => (
          <div key={index} className="bg-gray-800 text-white p-6 rounded-lg text-center">
            <div className="flex justify-center mb-4 text-blue-400">{step.icon}</div>
            <h3 className="font-semibold mb-2 text-sm">{step.title}</h3>
            <p className="text-xs text-gray-300">{step.description}</p>
          </div>
        ))}
      </div>

      <div className="text-center mt-6 mb-6">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
          СДЕЛАТЬ ЗАКАЗ ОНЛАЙН ЗА 1 МИН
        </button>
      </div>

      {/* <div className="bg-white/80 backdrop-blur-sm rounded-lg p-12">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Сделать заказ очень просто</h2>

        <div className="flex items-center justify-center space-x-16">
          <div className="text-center">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg">
              <Phone className="w-10 h-10 text-white" />
            </div>
            <p className="font-semibold text-gray-800 text-lg">Позвоните нам</p>
          </div>

          <div className="flex items-center justify-center">
            <svg className="w-7 h-7 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z"/>
            </svg>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <p className="font-semibold text-gray-800 text-lg">Получите консультацию</p>
          </div>

          <div className="flex items-center justify-center">
            <svg className="w-7 h-7 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z"/>
            </svg>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg">
              <Truck className="w-10 h-10 text-white" />
            </div>
            <p className="font-semibold text-gray-800 text-lg">Получите заказ</p>
          </div>
        </div>
      </div> */}

      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-12">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Сделать заказ очень просто</h2>

        <div className="flex items-center justify-center space-x-16">
          {/* Step 1 */}
          <div className="text-center">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg">
              <Phone className="w-10 h-10 text-white" />
            </div>
            <p className="font-semibold text-gray-800 text-lg">Позвоните нам или оставьте заявку</p>
          </div>

          {/* Arrow */}
          <div className="flex items-center justify-center">
            <svg
              className="w-10 h-10 text-gray-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z" />
            </svg>
          </div>

          {/* Step 2 */}
          <div className="text-center">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg">
              <Headphones className="w-10 h-10 text-white" />
            </div>
            <p className="font-semibold text-gray-800 text-lg">Согласуйте детали заказа</p>
          </div>

          {/* Arrow */}
          <div className="flex items-center justify-center">
            <svg
              className="w-10 h-10 text-gray-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z" />
            </svg>
          </div>

          {/* Step 3 */}
          <div className="text-center">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg">
              <Wallet className="w-10 h-10 text-white" />
            </div>
            <p className="font-semibold text-gray-800 text-lg">Оплатите удобно</p>
          </div>

          {/* Arrow */}
          <div className="flex items-center justify-center">
            <svg
              className="w-10 h-10 text-gray-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z" />
            </svg>
          </div>

          {/* Step 4 */}
          <div className="text-center">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg">
              <Truck className="w-10 h-10 text-white" />
            </div>
            <p className="font-semibold text-gray-800 text-lg">Дождитесь доставки</p>
          </div>
        </div>
      </div>
    </section>
  )
}
