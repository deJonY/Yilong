export default function WhyChooseUs() {
  const advantages = [
    {
      title: "Качество",
      description: "Только проверенные материалы от надежных поставщиков",
    },
    {
      title: "Опыт",
      description: "Более 10 лет работы в сфере наружной рекламы",
    },
    {
      title: "Сервис",
      description: "Индивидуальный подход к каждому клиенту",
    },
    {
      title: "Цены",
      description: "Конкурентные цены и гибкая система скидок",
    },
  ]

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6">Почему выбирают нас</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {advantages.map((advantage, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
            <h3 className="font-semibold mb-2 text-blue-600">{advantage.title}</h3>
            <p className="text-gray-600 text-sm">{advantage.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
