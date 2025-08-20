export default function Footer() {
  return (
    <footer className="bg-slate-800 text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Yi Long</h3>
            <p className="text-gray-300">Материалы для наружной рекламы</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Контакты</h4>
            <p className="text-gray-300">г. Алматы, ул. Есим хана 12</p>
            <p className="text-gray-300">+7 (777) 123-45-67</p>
            <p className="text-gray-300">info@yilong.kz</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Режим работы</h4>
            <p className="text-gray-300">Пн-Пт: 9:00 - 18:00</p>
            <p className="text-gray-300">Сб: 9:00 - 15:00</p>
            <p className="text-gray-300">Вс: выходной</p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">&copy; 2024 Yi Long. Все права защищены.</p>
        </div>
      </div>
    </footer>
  )
}
