// // app/product/[slug]/page.tsx
// import { notFound } from "next/navigation";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import ProductClient from "./ProductClient";

// import { db } from "@/lib/firebase/init";
// import {
//   collection,
//   doc,
//   getDoc,
//   getDocs,
// } from "firebase/firestore";

// /** ====== Tiplar ====== */
// type FireProduct = {
//   title?: string;
//   price?: string;
//   image?: string;
//   description?: string;
//   available?: boolean;
//   sectionId?: string;
//   categoryId?: string;
//   sizeId?: string;
//   [k: string]: any;
// };

// type FoundProduct = {
//   product: FireProduct & { id: string; slug: string };
//   context: { sectionId: string; categoryId: string; sizeId?: string };
// };

// /** ====== Bitta slug bo‘yicha mahsulotni topish ====== */
// async function findProductBySlug(slug: string): Promise<FoundProduct | null> {
//   // 1) sections
//   const secSnap = await getDocs(collection(db, "products"));
//   for (const sec of secSnap.docs) {
//     const sectionId = sec.id;

//     // 2) categories
//     const catsSnap = await getDocs(
//       collection(db, "products", sectionId, "categories")
//     );
//     for (const cat of catsSnap.docs) {
//       const categoryId = cat.id;

//       // 3a) category/items ichidan doc(slug)
//       const itemRef = doc(
//         db,
//         "products",
//         sectionId,
//         "categories",
//         categoryId,
//         "items",
//         slug
//       );
//       const itemDoc = await getDoc(itemRef);
//       if (itemDoc.exists()) {
//         const data = itemDoc.data() as FireProduct;
//         return {
//           product: {
//             ...data,
//             id: slug,
//             slug,
//             sectionId,
//             categoryId,
//           },
//           context: { sectionId, categoryId },
//         };
//       }

//       // 3b) category/sizes/*/items ichidan qidiramiz
//       const sizesSnap = await getDocs(
//         collection(db, "products", sectionId, "categories", categoryId, "sizes")
//       );
//       for (const size of sizesSnap.docs) {
//         const sizeId = size.id;
//         const sizeItemRef = doc(
//           db,
//           "products",
//           sectionId,
//           "categories",
//           categoryId,
//           "sizes",
//           sizeId,
//           "items",
//           slug
//         );
//         const sizeItemDoc = await getDoc(sizeItemRef);
//         if (sizeItemDoc.exists()) {
//           const data = sizeItemDoc.data() as FireProduct;
//           return {
//             product: {
//               ...data,
//               id: slug,
//               slug,
//               sectionId,
//               categoryId,
//               sizeId,
//             },
//             context: { sectionId, categoryId, sizeId },
//           };
//         }
//       }
//     }
//   }
//   return null;
// }

// /** ====== (Statik eksport uchun) barcha product ID’larni yig‘ish ====== */
// async function getAllProductIdsForExport(): Promise<string[]> {
//   const ids: string[] = [];
//   try {
//     const secSnap = await getDocs(collection(db, "products"));
//     for (const sec of secSnap.docs) {
//       const sectionId = sec.id;

//       const catsSnap = await getDocs(
//         collection(db, "products", sectionId, "categories")
//       );
//       for (const cat of catsSnap.docs) {
//         const categoryId = cat.id;

//         const itemsSnap = await getDocs(
//           collection(db, "products", sectionId, "categories", categoryId, "items")
//         );
//         itemsSnap.forEach((d) => ids.push(d.id));

//         const sizesSnap = await getDocs(
//           collection(db, "products", sectionId, "categories", categoryId, "sizes")
//         );
//         for (const size of sizesSnap.docs) {
//           const sizeId = size.id;
//           const sizeItemsSnap = await getDocs(
//             collection(
//               db,
//               "products",
//               sectionId,
//               "categories",
//               categoryId,
//               "sizes",
//               sizeId,
//               "items"
//             )
//           );
//           sizeItemsSnap.forEach((d) => ids.push(d.id));
//         }
//       }
//     }
//   } catch {
//     // build vaqtida Firestore’ga ulana olmasa — bo‘sh qaytamiz
//     return [];
//   }
//   // noyoblashtiramiz
//   return Array.from(new Set(ids));
// }

// /** 
// export async function generateStaticParams() {
//   const ids = await getAllProductIdsForExport();
//   return ids.map((slug) => ({ slug }));
// }

// /** ====== Sahifa ====== */
// export default async function ProductPage({
//   params,
// }: {
//   params: { slug: string };
// }) {
//   const { slug } = params;

//   const found = await findProductBySlug(slug);
//   if (!found) {
//     notFound();
//   }

//   const p = found!.product;

//   // Majburiy maydonlarga default qiymatlar
//   const normalized = {
//     id: p.id,
//     slug: p.slug,
//     title: p.title ?? "Без названия",
//     price: p.price ?? "",
//     image: p.image ?? "",
//     description: p.description ?? "",
//     available: p.available ?? true,
//   };

//   return (
//     <div className="flex min-h-screen flex-col justify-between">
//       <Header />
//       <ProductClient product={normalized as any} />
//       <Footer />
//     </div>
//   );
// }

///////////////////////////////////////////////////////////////////////////////////////////////////////

// app/product/[slug]/page.tsx
// import { notFound } from "next/navigation";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import ProductClient from "./ProductClient";

// import { db } from "@/lib/firebase/init";
// import { collection, doc, getDoc, getDocs } from "firebase/firestore";

// // 🔽 i18n (serverda)
// import { cookies } from "next/headers";
// import { getDictionary } from "@/i18n/dictionaries";
// import { i18n } from "@/i18n/config";

// /** ====== Tiplar ====== */
// type FireProduct = {
//   title?: string;
//   price?: string;
//   image?: string;
//   description?: string;
//   available?: boolean;
//   sectionId?: string;
//   categoryId?: string;
//   sizeId?: string;
//   [k: string]: any;
// };

// type FoundProduct = {
//   product: FireProduct & { id: string; slug: string };
//   context: { sectionId: string; categoryId: string; sizeId?: string };
// };

// /** ====== Bitta slug bo‘yicha mahsulotni topish ====== */
// async function findProductBySlug(slug: string): Promise<FoundProduct | null> {
//   // 1) sections
//   const secSnap = await getDocs(collection(db, "products"));
//   for (const sec of secSnap.docs) {
//     const sectionId = sec.id;

//     // 2) categories
//     const catsSnap = await getDocs(collection(db, "products", sectionId, "categories"));
//     for (const cat of catsSnap.docs) {
//       const categoryId = cat.id;

//       // 3a) category/items ichidan doc(slug)
//       const itemRef = doc(db, "products", sectionId, "categories", categoryId, "items", slug);
//       const itemDoc = await getDoc(itemRef);
//       if (itemDoc.exists()) {
//         const data = itemDoc.data() as FireProduct;
//         return {
//           product: {
//             ...data,
//             id: slug,
//             slug,
//             sectionId,
//             categoryId,
//           },
//           context: { sectionId, categoryId },
//         };
//       }

//       // 3b) category/sizes/*/items ichidan qidiramiz
//       const sizesSnap = await getDocs(
//         collection(db, "products", sectionId, "categories", categoryId, "sizes")
//       );
//       for (const size of sizesSnap.docs) {
//         const sizeId = size.id;
//         const sizeItemRef = doc(
//           db,
//           "products",
//           sectionId,
//           "categories",
//           categoryId,
//           "sizes",
//           sizeId,
//           "items",
//           slug
//         );
//         const sizeItemDoc = await getDoc(sizeItemRef);
//         if (sizeItemDoc.exists()) {
//           const data = sizeItemDoc.data() as FireProduct;
//           return {
//             product: {
//               ...data,
//               id: slug,
//               slug,
//               sectionId,
//               categoryId,
//               sizeId,
//             },
//             context: { sectionId, categoryId, sizeId },
//           };
//         }
//       }
//     }
//   }
//   return null;
// }

// /** ====== (Statik eksport uchun) barcha product ID’larni yig‘ish ====== */
// async function getAllProductIdsForExport(): Promise<string[]> {
//   const ids: string[] = [];
//   try {
//     const secSnap = await getDocs(collection(db, "products"));
//     for (const sec of secSnap.docs) {
//       const sectionId = sec.id;

//       const catsSnap = await getDocs(collection(db, "products", sectionId, "categories"));
//       for (const cat of catsSnap.docs) {
//         const categoryId = cat.id;

//         const itemsSnap = await getDocs(
//           collection(db, "products", sectionId, "categories", categoryId, "items")
//         );
//         itemsSnap.forEach((d) => ids.push(d.id));

//         const sizesSnap = await getDocs(
//           collection(db, "products", sectionId, "categories", categoryId, "sizes")
//         );
//         for (const size of sizesSnap.docs) {
//           const sizeId = size.id;
//           const sizeItemsSnap = await getDocs(
//             collection(db, "products", sectionId, "categories", categoryId, "sizes", sizeId, "items")
//           );
//           sizeItemsSnap.forEach((d) => ids.push(d.id));
//         }
//       }
//     }
//   } catch {
//     // build vaqtida Firestore’ga ulana olmasa — bo‘sh qaytadi
//     return [];
//   }
//   return Array.from(new Set(ids));
// }

// /** Statik marshrutlar (agar `output: 'export'`) */
// export async function generateStaticParams() {
//   const ids = await getAllProductIdsForExport();
//   return ids.map((slug) => ({ slug }));
// }

// /** ====== Sahifa ====== */
// export default async function ProductPage({ params }: { params: { slug: string } }) {
//   const { slug } = params;

//   // 🔽 Tilni aniqlab, lug‘atni olamiz (cookie: 'lang')
//   // const cookieLang = cookies().get("lang")?.value;
//   // const lang = (i18n.locales as string[]).includes(cookieLang || "") ? cookieLang! : i18n.defaultLocale;
//   // const dict = await getDictionary(lang);

//   const cookieStore = await cookies();                 // <-- muhim o'zgarish
//   const cookieLang = cookieStore.get("lang")?.value;   // endi xato yo'q
//   const lang = (i18n.locales as string[]).includes(cookieLang ?? "")
//     ? (cookieLang as string)
//     : i18n.defaultLocale;

//   const dict = await getDictionary(lang);

//   const found = await findProductBySlug(slug);
//   if (!found) {
//     notFound();
//   }

//   const p = found!.product;

//   // Majburiy maydonlarga i18n fallback’lar
//   const normalized = {
//     id: p.id,
//     slug: p.slug,
//     title: p.title ?? dict.productDetail.untitled,   // <— i18n fallback
//     price: p.price ?? "",
//     image: p.image ?? "",
//     description: p.description ?? dict.productDetail.no_description, // <— i18n fallback
//     available: p.available ?? true,
//   };

//   return (
//     <div className="flex min-h-screen flex-col justify-between">
//       <Header />
//       <ProductClient product={normalized as any} />
//       <Footer />
//     </div>
//   );
// }

///////////////////////////////////////////////////////////////////////////////////////////////////////////

// app/product/[slug]/page.tsx
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductClient from "./ProductClient";

import { db } from "@/lib/firebase/init";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

// i18n (server)
import { cookies } from "next/headers";
import { getDictionary } from "@/i18n/dictionaries";
import { i18n } from "@/i18n/config";
import type { Lang } from "@/i18n/config";

/** ====== Tiplar ====== */
type FireProduct = {
  title?: string;
  price?: string;
  image?: string;
  description?: string;
  available?: boolean;
  sectionId?: string;
  categoryId?: string;
  sizeId?: string;
  [k: string]: any;
};

type FoundProduct = {
  product: FireProduct & { id: string; slug: string };
  context: { sectionId: string; categoryId: string; sizeId?: string };
};

/** ====== Bitta slug bo‘yicha mahsulotni topish ====== */
async function findProductBySlug(slug: string): Promise<FoundProduct | null> {
  // 1) sections
  const secSnap = await getDocs(collection(db, "products"));
  for (const sec of secSnap.docs) {
    const sectionId = sec.id;

    // 2) categories
    const catsSnap = await getDocs(
      collection(db, "products", sectionId, "categories")
    );
    for (const cat of catsSnap.docs) {
      const categoryId = cat.id;

      // 3a) category/items ichidan doc(slug)
      const itemRef = doc(
        db,
        "products",
        sectionId,
        "categories",
        categoryId,
        "items",
        slug
      );
      const itemDoc = await getDoc(itemRef);
      if (itemDoc.exists()) {
        const data = itemDoc.data() as FireProduct;
        return {
          product: {
            ...data,
            id: slug,
            slug,
            sectionId,
            categoryId,
          },
          context: { sectionId, categoryId },
        };
      }

      // 3b) category/sizes/*/items ichidan qidiramiz
      const sizesSnap = await getDocs(
        collection(db, "products", sectionId, "categories", categoryId, "sizes")
      );
      for (const size of sizesSnap.docs) {
        const sizeId = size.id;
        const sizeItemRef = doc(
          db,
          "products",
          sectionId,
          "categories",
          categoryId,
          "sizes",
          sizeId,
          "items",
          slug
        );
        const sizeItemDoc = await getDoc(sizeItemRef);
        if (sizeItemDoc.exists()) {
          const data = sizeItemDoc.data() as FireProduct;
          return {
            product: {
              ...data,
              id: slug,
              slug,
              sectionId,
              categoryId,
              sizeId,
            },
            context: { sectionId, categoryId, sizeId },
          };
        }
      }
    }
  }
  return null;
}

/** ====== (Statik eksport uchun) barcha product ID’larni yig‘ish ====== */
async function getAllProductIdsForExport(): Promise<string[]> {
  const ids: string[] = [];
  try {
    const secSnap = await getDocs(collection(db, "products"));
    for (const sec of secSnap.docs) {
      const sectionId = sec.id;

      const catsSnap = await getDocs(
        collection(db, "products", sectionId, "categories")
      );
      for (const cat of catsSnap.docs) {
        const categoryId = cat.id;

        const itemsSnap = await getDocs(
          collection(
            db,
            "products",
            sectionId,
            "categories",
            categoryId,
            "items"
          )
        );
        itemsSnap.forEach((d) => ids.push(d.id));

        const sizesSnap = await getDocs(
          collection(
            db,
            "products",
            sectionId,
            "categories",
            categoryId,
            "sizes"
          )
        );
        for (const size of sizesSnap.docs) {
          const sizeId = size.id;
          const sizeItemsSnap = await getDocs(
            collection(
              db,
              "products",
              sectionId,
              "categories",
              categoryId,
              "sizes",
              sizeId,
              "items"
            )
          );
          sizeItemsSnap.forEach((d) => ids.push(d.id));
        }
      }
    }
  } catch {
    // build vaqtida Firestore’ga ulana olmasa — bo‘sh qaytadi
    return [];
  }
  return Array.from(new Set(ids));
}

/** Statik marshrutlar (agar `output: 'export'`) */
export async function generateStaticParams() {
  const ids = await getAllProductIdsForExport();
  return ids.map((slug) => ({ slug }));
}

/** ====== Sahifa ====== */
export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  // 🔽 Tilni aniqlash (cookie: 'lang') va to'g'ri tipga toraytirish
  const cookieStore = await cookies();
  const cookieLang = cookieStore.get("lang")?.value;

  const isLang = (v: string | undefined): v is Lang => v === "ru" || v === "uz";
  const lang: Lang = isLang(cookieLang)
    ? cookieLang
    : (i18n.defaultLocale as Lang);

  const dict = await getDictionary(lang);

  const found = await findProductBySlug(slug);
  if (!found) {
    notFound();
  }

  const p = found.product;

  // Majburiy maydonlarga i18n fallback’lar
  const normalized = {
    id: p.id,
    slug: p.slug,
    title: p.title ?? dict.productDetail.untitled,
    price: p.price ?? "",
    image: p.image ?? "",
    description: p.description ?? dict.productDetail.no_description,
    available: p.available ?? true,
  };

  return (
    <div className="flex min-h-screen flex-col justify-between">
      <Header />
      <ProductClient product={normalized as any} />
      <Footer />
    </div>
  );
}
