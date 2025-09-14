// import ProductPageClient from "@/components/product/ProductPageClient";

// export default function Page({
//   params,
// }: {
//   params: { sectionId: string; categoryId: string; itemId: string };
// }) {
//   const { sectionId, categoryId, itemId } = params;
//   return (
//     <ProductPageClient
//       sectionId={sectionId}
//       categoryId={categoryId}
//       itemId={itemId}
//     />
//   );
// }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import Header from "@/components/Header";
// import Sidebar from "@/components/Sidebar";
// import Footer from "@/components/Footer";
// import RelatedProducts from "@/components/product/RelatedProducts";
// import ProductPageClient from "@/components/product/ProductPageClient";

// export default function Page({ params, }: { params: { sectionId: string; categoryId: string; itemId: string }; }) {
//   const { sectionId, categoryId, itemId } = params;

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-pink-200 to-purple-300">
//       <Header />
//       <div className="container mx-auto">
//         <div className="flex">
//           <Sidebar />
//           <main className="flex-1 px-6 pt-6">
//             <ProductPageClient sectionId={sectionId} categoryId={categoryId} itemId={itemId} />
//             <RelatedProducts sectionId={sectionId} categoryId={categoryId} />
//           </main>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// app/[sectionId]/[categoryId]/[itemId]/page.tsx
// import Header from "@/components/Header";
// import Sidebar from "@/components/Sidebar";
// import Footer from "@/components/Footer";
// import RelatedProducts from "@/components/product/RelatedProducts";
// import ProductPageClient from "@/components/product/ProductPageClient";

// // Agar bu sahifani SSG/ISR qilmoqchi bo'lsangiz, revalidate qo'ying (ixtiyoriy):
// // export const revalidate = 3600;

// type PageProps = {
//   params: { sectionId: string; categoryId: string; itemId: string };
// };

// export default function Page({ params }: PageProps) {
//   const { sectionId, categoryId, itemId } = params;

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-pink-200 to-purple-300">
//       <Header />
//       <div className="container mx-auto">
//         <div className="flex">
//           <Sidebar />
//           <main className="flex-1 px-6 pt-6">
//             <ProductPageClient sectionId={sectionId} categoryId={categoryId} itemId={itemId} />
//             <RelatedProducts sectionId={sectionId} categoryId={categoryId} />
//           </main>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import RelatedProducts from "@/components/product/RelatedProducts";
import ProductPageClient from "@/components/product/ProductPageClient";

type PageProps = {
  params: { sectionId: string; categoryId: string; itemId: string };
};

export default function Page({ params }: PageProps) {
  const { sectionId, categoryId, itemId } = params;

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
