// import ProductPageClient from "@/components/product/ProductPageClient";

// export default function Page({
//   params,
// }: {
//   params: { sectionId: string; categoryId: string; sizeId: string; itemId: string };
// }) {
//   const { sectionId, categoryId, sizeId, itemId } = params;
//   return (
//     <ProductPageClient
//       sectionId={sectionId}
//       categoryId={categoryId}
//       sizeId={sizeId}
//       itemId={itemId}
//     />
//   );
// }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import RelatedProducts from "@/components/product/RelatedProducts";
import ProductPageClient from "@/components/product/ProductPageClient";

export default function Page({
  params,
}: {
  params: { sectionId: string; categoryId: string; sizeId: string; itemId: string };
}) {
  const { sectionId, categoryId, sizeId, itemId } = params;
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-200 to-purple-300">
      <Header />
      <div className="container mx-auto">
        <div className="flex">
          <Sidebar />
          <main className="flex-1 px-6 pt-6">
            <ProductPageClient
              sectionId={sectionId}
              categoryId={categoryId}
              sizeId={sizeId}
              itemId={itemId}
            />
            <RelatedProducts sectionId={sectionId} categoryId={categoryId} />
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
