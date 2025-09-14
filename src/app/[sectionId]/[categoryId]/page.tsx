// // import CategoryLayout from "@/components/CategoryLayout";
// // import CategoryClient from "@/components/category/CategoryClient";
// // import { CATALOG } from "@/lib/catalog";

// // // ❗ Statik eksport uchun har bir sectionId/categoryId juftligini qaytaramiz
// // export function generateStaticParams() {
// //   const params: { sectionId: string; categoryId: string }[] = [];
// //   for (const s of CATALOG) {
// //     for (const c of s.categories) {
// //       params.push({ sectionId: s.id, categoryId: c.id });
// //     }
// //   }
// //   return params;
// // }

// // export default async function CategoryPage(
// //   { params }: { params: Promise<{ sectionId: string; categoryId: string }> }
// // ) {
// //   const { sectionId, categoryId } = await params;
// //   const section = CATALOG.find(s => s.id === sectionId);
// //   const category = section?.categories.find(c => c.id === categoryId);
// //   const title = category?.title ?? categoryId;

// //   return (
// //     <CategoryLayout title={`Kategoriya: ${title}`}>
// //       <CategoryClient sectionId={sectionId} categoryId={categoryId} />
// //     </CategoryLayout>
// //   );
// // }

// //////////////////////////////////////////////////////////////////////////////////////////////////////////

// import CategoryLayout from "@/components/CategoryLayout";
// import CategoryClient from "@/components/category/CategoryClient";
// import { CATALOG } from "@/lib/catalog";

// export function generateStaticParams() {
//   const params: { sectionId: string; categoryId: string }[] = [];
//   for (const s of CATALOG) {
//     for (const c of s.categories) {
//       params.push({ sectionId: s.id, categoryId: c.id });
//     }
//   }
//   return params;
// }

// export default async function CategoryPage(
//   { params }: { params: Promise<{ sectionId: string; categoryId: string }> }
// ) {
//   const { sectionId, categoryId } = await params;
//   const section = CATALOG.find(s => s.id === sectionId);
//   const category = section?.categories.find(c => c.id === categoryId);
//   const title = category?.title ?? categoryId; // i18n sarlavha CATALOGdan keladi

//   return (
//     <CategoryLayout title={title}>
//       <CategoryClient sectionId={sectionId} categoryId={categoryId} />
//     </CategoryLayout>
//   );
// }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// // app/[sectionId]/[categoryId]/page.tsx
// import { Suspense } from "react";
// import CategoryLayout from "@/components/CategoryLayout";
// import CategoryClient from "@/components/category/CategoryClient";
// import { CATALOG } from "@/lib/catalog";

// // Statik yo'llarni oldindan generatsiya qilamiz
// export function generateStaticParams() {
//   const params: { sectionId: string; categoryId: string }[] = [];
//   for (const s of CATALOG) {
//     for (const c of s.categories) {
//       params.push({ sectionId: s.id, categoryId: c.id });
//     }
//   }
//   return params;
// }

// // generateStaticParams borligi uchun dinamik yo'l paramlariga tayanmaymiz
// export const dynamicParams = false;

// // Agar SSG kerak bo'lsa revalidate qo'ymasangiz ham bo'ladi;
// // kerak bo'lsa masalan 1 kun:
// // export const revalidate = 86400;

// type PageProps = {
//   params: { sectionId: string; categoryId: string };
//   searchParams?: Record<string, string | string[] | undefined>;
// };

// export default function CategoryPage({ params, searchParams }: PageProps) {
//   const { sectionId, categoryId } = params;

//   const section = CATALOG.find((s) => s.id === sectionId);
//   const category = section?.categories.find((c) => c.id === categoryId);
//   const title = category?.title ?? categoryId;

//   // Agar query kerak bo‘lsa, shu tarzda oling va Client'ga props sifatida uzating:
//   const q =
//     typeof searchParams?.q === "string"
//       ? searchParams!.q
//       : Array.isArray(searchParams?.q)
//       ? searchParams!.q[0]
//       : "";

//   return (
//     <CategoryLayout title={title}>
//       {/* Client komponent (unda useSearchParams ishlatilsa ham) Suspense ichida */}
//       <Suspense fallback={<div className="p-6">Yuklanmoqda…</div>}>
//         <CategoryClient sectionId={sectionId} categoryId={categoryId} q={q} />
//       </Suspense>
//     </CategoryLayout>
//   );
// }

///////////////////////////////////////////////////////////////////////////////////////////////////////////

// app/[sectionId]/[categoryId]/page.tsx
import { Suspense } from "react";
import CategoryLayout from "@/components/CategoryLayout";
import CategoryClient from "@/components/category/CategoryClient";
import { CATALOG } from "@/lib/catalog";

// Statik yo'llarni oldindan generatsiya qilamiz
export function generateStaticParams() {
  const params: { sectionId: string; categoryId: string }[] = [];
  for (const s of CATALOG) {
    for (const c of s.categories) {
      params.push({ sectionId: s.id, categoryId: c.id });
    }
  }
  return params;
}

// generateStaticParams borligi uchun dinamik yo'l paramlariga tayanmaymiz
export const dynamicParams = false;

type PageProps = {
  params: { sectionId: string; categoryId: string };
};

export default function CategoryPage({ params }: PageProps) {
  const { sectionId, categoryId } = params;

  const section = CATALOG.find((s) => s.id === sectionId);
  const category = section?.categories.find((c) => c.id === categoryId);
  const title = category?.title ?? categoryId;

  return (
    <CategoryLayout title={title}>
      <Suspense fallback={<div className="p-6">Yuklanmoqda…</div>}>
        <CategoryClient sectionId={sectionId} categoryId={categoryId} />
      </Suspense>
    </CategoryLayout>
  );
}
