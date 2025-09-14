// // src/components/nav/Breadcrumbs.tsx
// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { Home } from "lucide-react";
// import { useMemo } from "react";

// export type Crumb = { label: string; href?: string };

// type Props = {
//   items?: Crumb[];                 // qo'lda berish
//   className?: string;
//   separator?: React.ReactNode;     // masalan: "›" yoki icon
//   showHome?: boolean;              // boshida "home" bo'lsinmi
//   homeHref?: string;
//   homeLabel?: string;
//   autoFromPath?: boolean;          // true bo'lsa, URL'dan crumbs tuzadi (items bo'lmasa)
//   truncate?: boolean;              // uzun label'larni qirqib ko'rsatish
//   maxLabelChars?: number;          // truncate bo'lsa, max belgilar
// };

// function humanize(seg: string) {
//   const s = decodeURIComponent(seg.replace(/\-/g, " ").trim());
//   if (!s) return s;
//   return s.charAt(0).toUpperCase() + s.slice(1);
// }

// function buildFromPath(pathname: string): Crumb[] {
//   // "/a/b/c" => [{label:a, href:/a}, {label:b, href:/a/b}, {label:c}]
//   const parts = pathname.split("/").filter(Boolean);
//   const crumbs: Crumb[] = [];
//   let acc = "";
//   parts.forEach((p, i) => {
//     acc += `/${p}`;
//     const isLast = i === parts.length - 1;
//     crumbs.push({
//       label: humanize(p),
//       href: isLast ? undefined : acc,
//     });
//   });
//   return crumbs;
// }

// export default function Breadcrumbs({
//   items,
//   className = "",
//   separator = <span className="text-slate-400">›</span>,
//   showHome = true,
//   homeHref = "/",
//   homeLabel = "",
//   autoFromPath = false,
//   truncate = true,
//   maxLabelChars = 40,
// }: Props) {
//   const pathname = usePathname();

//   const computed = useMemo(() => {
//     if (items && items.length) return items;
//     if (autoFromPath) return buildFromPath(pathname || "/");
//     return [];
//   }, [items, autoFromPath, pathname]);

//   const safeText = (v: unknown) =>
//   typeof v === "string" ? v : v == null ? "" : String(v);

// const truncateLabel = (label: unknown, max = 28) => {
//   const s = safeText(label);
//   if (!s) return "";                  // undefined/null bo‘lsa ham yiqilmaydi
//   return s.length > max ? s.slice(0, max - 1) + "…" : s;
// };

//   // const truncateLabel = (txt: string) => {
//   //   if (!truncate) return txt;
//   //   if (txt.length <= maxLabelChars) return txt;
//   //   return txt.slice(0, Math.max(3, maxLabelChars - 1)) + "…";
//   // };

//   return (
//     <nav
//       aria-label="Breadcrumb"
//       className={`mb-4 bg-white/90 dark:bg-white/80 rounded-lg shadow px-3 py-2 text-sm text-slate-700 ${className}`}
//       itemScope
//       itemType="https://schema.org/BreadcrumbList"
//     >
//       <ol className="flex flex-wrap items-center gap-2 overflow-x-auto no-scrollbar">
//         {showHome && (
//           <li
//             className="flex items-center"
//             itemProp="itemListElement"
//             itemScope
//             itemType="https://schema.org/ListItem"
//           >
//             <Link
//               href={homeHref}
//               className="inline-flex items-center gap-1 text-slate-800 hover:text-slate-900"
//               itemProp="item"
//             >
//               <Home className="w-4 h-4" />
//               {homeLabel ? (
//                 <span className="sr-only md:not-sr-only md:inline" itemProp="name">
//                   {homeLabel}
//                 </span>
//               ) : null}
//             </Link>
//             <meta itemProp="position" content="1" />
//           </li>
//         )}

//         {computed.map((it, i) => {
//           const isLast = i === computed.length - 1;
//           const pos = (showHome ? 2 : 1) + i;
//           const label = truncateLabel(it.label);

//           return (
//             <li
//               key={`${it.label}-${i}`}
//               className="flex items-center gap-2 max-w-full"
//               itemProp="itemListElement"
//               itemScope
//               itemType="https://schema.org/ListItem"
//               aria-current={isLast ? "page" : undefined}
//             >
//               {/* separator */}
//               { (showHome || i > 0) && <span className="shrink-0">{separator}</span> }

//               {it.href && !isLast ? (
//                 <Link
//                   href={it.href}
//                   className="hover:underline text-slate-700 hover:text-slate-900 max-w-[50ch] truncate"
//                   itemProp="item"
//                   title={it.label}
//                 >
//                   <span itemProp="name">{label}</span>
//                 </Link>
//               ) : (
//                 <span
//                   className="font-medium text-slate-900 max-w-[60ch] truncate"
//                   title={it.label}
//                   itemProp="name"
//                 >
//                   {label}
//                 </span>
//               )}
//               <meta itemProp="position" content={String(pos)} />
//             </li>
//           );
//         })}
//       </ol>
//     </nav>
//   );
// }

// /* Optional: kichik skelet komponenti */
// export function BreadcrumbsSkeleton() {
//   return (
//     <div className="mb-4 h-8 w-full max-w-xl rounded-lg bg-slate-200/70 animate-pulse" />
//   );
// }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home } from "lucide-react";
import { useMemo } from "react";
import { candidateSectionKeys, candidateCategoryKeys } from "@/lib/i18n/ids";
import { pickLabel, humanize } from "@/lib/i18n/labels";
import { useI18n } from "@/components/i18n/I18nProvider";

export type Crumb = { label: string; href?: string };

type Props = {
  items?: Crumb[];
  className?: string;
  separator?: React.ReactNode;
  showHome?: boolean;
  homeHref?: string;
  homeLabel?: string;
  autoFromPath?: boolean;
  truncate?: boolean;
  maxLabelChars?: number;
};

function buildFromPath(pathname: string, t: any): Crumb[] {
  const parts = pathname.split("/").filter(Boolean);
  const crumbs: Crumb[] = [];
  let acc = "";

  parts.forEach((seg, i) => {
    acc += `/${seg}`;
    const isLast = i === parts.length - 1;

    let label = humanize(seg);
    if (i === 0) {
      label = pickLabel(t, candidateSectionKeys(seg), label);
    } else if (i === 1) {
      const sectionId = parts[0];
      label = pickLabel(t, candidateCategoryKeys(sectionId, seg), label);
    }

    crumbs.push({ label, href: isLast ? undefined : acc });
  });

  return crumbs;
}

export default function Breadcrumbs({
  items,
  className = "",
  separator = <span className="text-slate-400">›</span>,
  showHome = true,
  homeHref = "/",
  homeLabel = "",
  autoFromPath = false,
  truncate = true,
  maxLabelChars = 40
}: Props) {
  const pathname = usePathname();
  const { t } = useI18n();

  const computed = useMemo(() => {
    if (items && items.length) return items;
    if (autoFromPath) return buildFromPath(pathname || "/", t);
    return [];
  }, [items, autoFromPath, pathname, t]);

  const safeText = (v: unknown) => (typeof v === "string" ? v : v == null ? "" : String(v));
  const truncateLabel = (label: unknown, max = maxLabelChars) => {
    if (!truncate) return safeText(label);
    const s = safeText(label);
    if (!s) return "";
    return s.length > max ? s.slice(0, Math.max(3, max - 1)) + "…" : s;
  };

  return (
    <nav
      aria-label="Breadcrumb"
      className={`mb-4 bg-white/90 dark:bg-white/80 rounded-lg shadow px-3 py-2 text-sm text-slate-700 ${className}`}
      itemScope
      itemType="https://schema.org/BreadcrumbList"
    >
      <ol className="flex flex-wrap items-center gap-2 overflow-x-auto no-scrollbar">
        {showHome && (
          <li className="flex items-center" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <Link href={homeHref} className="inline-flex items-center gap-1 text-slate-800 hover:text-slate-900" itemProp="item">
              <Home className="w-4 h-4" />
              {homeLabel ? (
                <span className="sr-only md:not-sr-only md:inline" itemProp="name">
                  {homeLabel}
                </span>
              ) : null}
            </Link>
            <meta itemProp="position" content="1" />
          </li>
        )}

        {computed.map((it, i) => {
          const isLast = i === computed.length - 1;
          const pos = (showHome ? 2 : 1) + i;
          const label = truncateLabel(it.label);

          return (
            <li
              key={`${it.label}-${i}`}
              className="flex items-center gap-2 max-w-full"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
              aria-current={isLast ? "page" : undefined}
            >
              {(showHome || i > 0) && <span className="shrink-0">{separator}</span>}

              {it.href && !isLast ? (
                <Link
                  href={it.href}
                  className="hover:underline text-slate-700 hover:text-slate-900 max-w-[50ch] truncate"
                  itemProp="item"
                  title={it.label}
                >
                  <span itemProp="name">{label}</span>
                </Link>
              ) : (
                <span className="font-medium text-slate-900 max-w-[60ch] truncate" title={it.label} itemProp="name">
                  {label}
                </span>
              )}
              <meta itemProp="position" content={String(pos)} />
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function BreadcrumbsSkeleton() {
  return <div className="mb-4 h-8 w-full max-w-xl rounded-lg bg-slate-200/70 animate-pulse" />;
}
