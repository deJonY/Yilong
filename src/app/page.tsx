import Header from "../components/Header"
import Sidebar from "../components/nav/Sidebar"
import MainContent from "../components/MainContent"
import Footer from "../components/Footer"
import ProductPageClient from "@/components/product/ProductPageClient";
import RelatedProducts from "@/components/product/RelatedProducts";
import { Suspense } from "react";

export default async function Home({ params, } : { params: Promise<{ sectionId: string; categoryId: string; itemId: string }>;}) {
  const { sectionId, categoryId, itemId } = await params; 
  
  return (
    // <div className="min-h-screen bg-gradient-to-b from-pink-200 to-purple-300">
    //   <Header />
    //   <div className="container mx-auto">
    //     <div className="flex">
    //       <Sidebar />
    //       <MainContent />
    //     </div>
    //   </div>
    //   <Footer />
    // </div>

    <div className="min-h-screen bg-gradient-to-b from-pink-200 to-purple-300">
      <Header />
      <div className="container mx-auto">
        <div className="flex">
          <Sidebar />
          <main className="flex-1 px-6 pt-6">
            <Suspense fallback={<div>Loading product...</div>}>
              <MainContent />
            </Suspense>
          </main>
        </div>
      </div>
      <Footer />
    </div>

    // <div className="min-h-screen bg-gradient-to-b from-pink-200 to-purple-300">
    //   <Header />
    //   <div className="container mx-auto">
    //     <div className="flex">
    //       <aside aria-label="Sidebar">
    //         <Sidebar />
    //       </aside>
    //       <main className="flex-1" aria-label="Main content">
    //         <MainContent />
    //       </main>
    //     </div>
    //   </div>
    //   <Footer />
    // </div>

  )
}
