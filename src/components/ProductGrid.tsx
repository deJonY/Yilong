import FirstCard from "./cards/first-card"
import data from "../data/data.json"

export default function ProductGrid() {
  const products = data.mainProduct

  return (
    <section className="mb-8">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Самое востребованное в ассортименте</h2>
      <FirstCard products={products} /> {/* type="simple" or "detailed" and size="default" or "single" */}
    </section>
  )
}
