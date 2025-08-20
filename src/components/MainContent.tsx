import HeroSection from "./HeroSection"
import ProductGrid from "./ProductGrid"
import CompanyAdvantages from "./CompanyAdvantages"
import CertificatesSection from "./CertificatesSection"
import WhyChooseUs from "./WhyChooseUs"
import OrderProcess from "./OrderProcess"

export default function MainContent() {
  return (
    <main className="flex-1 px-6 pt-6">
      <HeroSection />
      <ProductGrid />
      <CompanyAdvantages />
      <CertificatesSection />
      <WhyChooseUs />
      <OrderProcess />
    </main>
  )
}
