export default function CertificatesSection() {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6">Сертификаты качества</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((cert) => (
          <div key={cert} className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 font-bold text-xl">C{cert}</span>
            </div>
            <h3 className="font-semibold mb-2">Сертификат {cert}</h3>
            <p className="text-gray-600 text-sm">Подтверждение качества продукции</p>
          </div>
        ))}
      </div>
    </section>
  )
}
