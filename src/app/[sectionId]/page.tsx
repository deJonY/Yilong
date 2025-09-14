// // app/[sectionId]/page.tsx
// import CategoryLayout from "@/components/CategoryLayout";
// import SectionClient from "@/components/section/SectionClient";
// import { CATALOG } from "@/lib/catalog";
// import CategoryShowcase from "@/components/section/CategoryShowcase";

// export function generateStaticParams() {
//   return CATALOG.map((s) => ({ sectionId: s.id }));
// }

// type Params = { sectionId: string };
// type MaybePromise<T> = T | Promise<T>;
// async function resolveParams(p: MaybePromise<Params>): Promise<Params> {
//   return (typeof (p as any)?.then === "function") ? await (p as Promise<Params>) : (p as Params);
// }

// export default async function SectionPage({ params }: { params: MaybePromise<Params> }) {
//   const { sectionId } = await resolveParams(params);
//   const section = CATALOG.find((s) => s.id === sectionId);
//   const title = section?.title ?? sectionId;

//   return (
//     <CategoryLayout title={title}>
//       {/* <CategoryShowcase sectionId={sectionId} limit={6} /> */}
//       <SectionClient sectionId={sectionId} />
//     </CategoryLayout>
//   );
// }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import CategoryLayout from "@/components/CategoryLayout";
import SectionClient from "@/components/section/SectionClient";
import { CATALOG } from "@/lib/catalog";
// import CategoryShowcase from "@/components/section/CategoryShowcase";

export function generateStaticParams() {
  return CATALOG.map((s) => ({ sectionId: s.id }));
}

type PageProps = { params: { sectionId: string } };

export default function SectionPage({ params }: PageProps) {
  const { sectionId } = params;
  const section = CATALOG.find((s) => s.id === sectionId);
  const title = section?.title ?? sectionId;

  return (
    <CategoryLayout title={title}>
      {/* <CategoryShowcase sectionId={sectionId} limit={6} /> */}
      <SectionClient sectionId={sectionId} />
    </CategoryLayout>
  );
}
