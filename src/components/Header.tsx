// "use client";

// import React, { useCallback, useEffect, useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import {
//   Menu,
//   X,
//   Phone,
//   ShoppingCart,
//   ChevronRight,
//   ChevronDown,
//   Home,
//   LayoutGrid,
//   MapPin,
// } from "lucide-react";
// import { IMaskInput } from "react-imask";
// import data from "@/data/data.json";
// import logo from "../../public/assets/logo.png";

// import { useI18n } from "@/components/i18n/I18nProvider";
// import { formatCurrency } from "@/i18n/config";

// /* ===================== Types ===================== */
// type CartMap = Record<string, number>;
// type MetaMap = Record<string, { title?: string; price?: string; image?: string }>;

// type CartDetail = {
//   id: string;
//   title: string;
//   price: string;
//   image?: string;
//   quantity: number;
// };

// /* ===================== Helpers ===================== */
// const parsePriceToNumber = (s?: string) => {
//   if (!s) return 0;
//   const digits = s.match(/\d+/g);
//   if (!digits) return 0;
//   return Number(digits.join(""));
// };

// /* ===================== Storage helpers ===================== */
// const readSales = (): CartMap => {
//   if (typeof window === "undefined") return {};
//   try {
//     return JSON.parse(localStorage.getItem("sales") || "{}");
//   } catch {
//     return {};
//   }
// };

// const writeSales = (map: CartMap) => {
//   localStorage.setItem("sales", JSON.stringify(map));
//   window.dispatchEvent(new Event("storage"));
// };

// const readMeta = (): MetaMap => {
//   if (typeof window === "undefined") return {};
//   try {
//     return JSON.parse(localStorage.getItem("sales_meta") || "{}");
//   } catch {
//     return {};
//   }
// };

// const writeMeta = (map: MetaMap) => {
//   localStorage.setItem("sales_meta", JSON.stringify(map));
//   window.dispatchEvent(new Event("storage"));
// };

// /** Demo fallback — data.json dan topish (agar meta yo‘q bo‘lsa) */
// const lookupFromDemo = (id: string) => {
//   const p = (data as any)?.mainProduct?.find((x: any) => String(x.id) === String(id));
//   if (!p) return null;
//   return { title: p.title as string, price: p.price as string, image: p.image as string | undefined };
// };

// /* ===================== Cart Modal ===================== */
// type CartModalProps = {
//   isOpen: boolean;
//   onClose: () => void;
//   onOpenOrder: () => void;
//   cartDetails: CartDetail[];
//   onInc: (id: string) => void;
//   onDec: (id: string) => void;
//   onRemove: (id: string) => void;
// };

// const CartModal: React.FC<CartModalProps> = ({
//   isOpen,
//   onClose,
//   onOpenOrder,
//   cartDetails,
//   onInc,
//   onDec,
//   onRemove,
// }) => {
//   const { t, lang } = useI18n();
//   const currency = (n: number) => formatCurrency(n, lang);

//   if (!isOpen) return null;

//   const subtotal = cartDetails.reduce((sum, it) => {
//     const unit = parsePriceToNumber(it.price);
//     return sum + unit * (it.quantity || 0);
//   }, 0);

//   return (
//     <div
//       onClick={(e) => e.currentTarget === e.target && onClose()}
//       className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4"
//     >
//       <div className="bg-white rounded-lg shadow-xl w-full max-w-sm md:max-w-md max-h-[80vh] overflow-y-auto relative p-6">
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition"
//           aria-label="Close cart"
//         >
//           <X size={24} />
//         </button>

//         <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">{t("cart.title")}</h2>

//         {cartDetails.length === 0 ? (
//           <p className="text-gray-600 text-center">{t("cart.empty")}</p>
//         ) : (
//           <ul className="divide-y divide-gray-200">
//             {cartDetails.map((item) => {
//               const unit = parsePriceToNumber(item.price);
//               const qty = item.quantity || 0;
//               const lineTotal = unit * qty;

//               return (
//                 <li key={item.id} className="flex items-center gap-4 py-4">
//                   <img
//                     src={item.image || "/placeholder.svg"}
//                     alt={item.title}
//                     className="w-16 h-16 rounded-md object-contain"
//                   />
//                   <div className="flex-1">
//                     <h4 className="font-semibold text-gray-800">{item.title}</h4>

//                     <p className="text-sm text-gray-600">
//                       {item.price || t("common.price_from", { price: currency(unit) })}
//                     </p>

//                     <div className="mt-2 flex items-center justify-between">
//                       <div className="flex items-center gap-2">
//                         <button
//                           onClick={() => onDec(item.id)}
//                           className="px-2 py-1 rounded-full text-gray-600 hover:bg-gray-200 transition"
//                         >
//                           −
//                         </button>
//                         <span className="text-sm font-semibold">{qty}</span>
//                         <button
//                           onClick={() => onInc(item.id)}
//                           className="px-2 py-1 rounded-full text-gray-600 hover:bg-gray-200 transition"
//                         >
//                           +
//                         </button>
//                       </div>

//                       <div className="text-sm font-semibold">
//                         {currency(lineTotal)} т
//                       </div>
//                     </div>
//                   </div>

//                   <button
//                     onClick={() => onRemove(item.id)}
//                     className="p-1 text-red-500 hover:text-red-700 transition"
//                     aria-label="Remove item"
//                   >
//                     <X size={20} />
//                   </button>
//                 </li>
//               );
//             })}
//           </ul>
//         )}

//         {cartDetails.length > 0 && (
//           <div className="mt-6 pt-4 border-t border-gray-200 space-y-3">
//             <div className="flex items-center justify-between text-base">
//               <span className="font-medium">{t("common.total")}:</span>
//               <span className="font-semibold">{currency(subtotal)} т</span>
//             </div>

//             <button
//               onClick={onOpenOrder}
//               className="w-full bg-slate-700 text-white py-3 rounded-lg font-semibold hover:bg-slate-800 transition"
//             >
//               {t("cart.checkout")}
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// /* ===================== Order Modal ===================== */
// type OrderModalProps = {
//   isOpen: boolean;
//   onClose: () => void;
//   onSubmit: (payload: { name: string; phoneNumber: string }) => Promise<void> | void;
//   isSubmitting: boolean;
//   submitError: string | null;
//   isSuccess: boolean;
// };

// const OrderModal: React.FC<OrderModalProps> = ({
//   isOpen,
//   onClose,
//   onSubmit,
//   isSubmitting,
//   submitError,
//   isSuccess,
// }) => {
//   const { t } = useI18n();
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [name, setName] = useState("");

//   useEffect(() => {
//     if (!isOpen) {
//       setPhoneNumber("");
//       setName("");
//     }
//   }, [isOpen]);

//   if (!isOpen) return null;

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!name.trim()) return alert(t("order.error_name"));
//     const digits = phoneNumber.replace(/\D/g, "");
//     if (digits.length !== 12) return alert(t("order.error_phone"));
//     onSubmit({ name: name.trim(), phoneNumber });
//   };

//   return (
//     <div
//       onClick={(e) => e.currentTarget === e.target && onClose()}
//       className="fixed inset-0 bg-black/50 z-[101] flex items-center justify-center p-4"
//     >
//       <div className="bg-white rounded-lg shadow-xl w-full max-w-sm md:max-w-md relative p-6">
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition"
//           aria-label="Close order"
//         >
//           <X size={24} />
//         </button>

//         <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">{t("order.enter_data")}</h2>

//         {isSuccess ? (
//           <div className="text-center p-4 bg-green-100 text-green-700 rounded-md">
//             <p className="font-semibold">{t("order.success_title")}</p>
//             <p className="text-sm mt-2">{t("order.success_text")}</p>
//           </div>
//         ) : (
//           <form onSubmit={handleSubmit}>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder={t("order.name_placeholder")}
//               className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
//               required
//             />
//             <IMaskInput
//               mask={"+998 (00) 000 00 00"}
//               type="tel"
//               value={phoneNumber}
//               onAccept={(v) => setPhoneNumber(String(v))}
//               placeholder={t("order.phone_placeholder")}
//               className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
//               required
//             />
//             {submitError && <p className="text-red-500 text-sm mb-4">{submitError}</p>}
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className={`w-full py-3 rounded-lg font-semibold transition ${
//                 isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-slate-700 text-white hover:bg-slate-800"
//               }`}
//             >
//               {isSubmitting ? t("order.submitting") : t("order.submit")}
//             </button>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// /* ===================== Static menu ===================== */
// const categoriesData = [
//   { title: "Листовые материалы", link: "/listovye-materialy" },
//   { title: "Рулонные материалы", link: "/rulonnye-materialy" },
//   { title: "Источники света (светодиоды, лампы и пр.)", link: "/istochniki-sveta" },
//   { title: "Трансформаторы и источники управления", link: "/transformatory-i-upravlenie" },
//   { title: "Чернила (краски)", link: "/chernila-kraski" },
//   { title: "Рекламное и выставочное оборудование", link: "/reklamno-vystavochnoe" },
//   { title: "Алюминиевые профиля и комплектующие", link: "/alyuminievye-profily" },
//   { title: "Клеевые решения (скотч, клей)", link: "/kleevye-resheniya" },
//   { title: "Металлическая и пластиковая фурнитура", link: "/metal-i-plast-furnitura" },
//   { title: "Инструменты", link: "/instrumenty" },
//   { title: "Фрезы и граверы", link: "/frezy-i-gravery" },
// ];

// /* ===================== Header ===================== */
// export default function Header() {
//   const { t, lang, setLang } = useI18n();
//   const currency = (n: number) => formatCurrency(n, lang);

//   // nav
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

//   // cart
//   const [isCartModalOpen, setIsCartModalOpen] = useState(false);
//   const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
//   const [cartCount, setCartCount] = useState(0);
//   const [cartDetails, setCartDetails] = useState<CartDetail[]>([]);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitError, setSubmitError] = useState<string | null>(null);
//   const [isSuccess, setIsSuccess] = useState(false);

//   /* ---- build cart from storage ---- */
//   const rebuildCart = useCallback(() => {
//     const sales = readSales();
//     const meta = readMeta();
//     const ids = Object.keys(sales);

//     if (!ids.length) {
//       setCartCount(0);
//       setCartDetails([]);
//       return;
//     }

//     const details: CartDetail[] = ids
//       .map((id) => {
//         const quantity = Number(sales[id]) || 0;
//         if (quantity < 1) return null;

//         let title = meta[id]?.title;
//         let price = meta[id]?.price;
//         let image = meta[id]?.image;

//         if (!title || !price) {
//           const d = lookupFromDemo(id);
//           if (d) {
//             title = title || d.title;
//             price = price || d.price;
//             image = image || d.image;
//           }
//         }

//         return {
//           id,
//           title: title || `Товар #${id}`,
//           price: price || "",
//           image,
//           quantity,
//         } as CartDetail;
//       })
//       .filter(Boolean) as CartDetail[];

//     setCartDetails(details);
//     setCartCount(details.reduce((s, x) => s + x.quantity, 0));
//   }, []);

//   useEffect(() => {
//     if (typeof window === "undefined") return;
//     rebuildCart();
//     const h = () => rebuildCart();
//     window.addEventListener("storage", h);
//     return () => window.removeEventListener("storage", h);
//   }, [rebuildCart]);

//   /* ---- cart ops ---- */
//   const inc = (id: string) => {
//     const s = readSales();
//     s[id] = (s[id] || 0) + 1;
//     writeSales(s);
//     rebuildCart();
//   };

//   const dec = (id: string) => {
//     const s = readSales();
//     if (s[id] && s[id] > 1) s[id] -= 1;
//     else {
//       delete s[id];
//       const m = readMeta();
//       if (m[id]) {
//         delete m[id];
//         writeMeta(m);
//       }
//     }
//     writeSales(s);
//     rebuildCart();
//   };

//   const removeItem = (id: string) => {
//     const s = readSales();
//     delete s[id];
//     writeSales(s);
//     const m = readMeta();
//     if (m[id]) {
//       delete m[id];
//       writeMeta(m);
//     }
//     rebuildCart();
//   };

//   const toggleCart = () => {
//     setIsCartModalOpen((v) => !v);
//     setIsOrderModalOpen(false);
//   };
//   const openOrder = () => {
//     setIsCartModalOpen(false);
//     setIsOrderModalOpen(true);
//   };

//   /* ---- submit order ---- */
//   const handleOrderSubmit = async ({ name, phoneNumber }: { name: string; phoneNumber: string }) => {
//     setIsSubmitting(true);
//     setSubmitError(null);
//     setIsSuccess(false);

//     const sales = readSales();
//     const items = Object.entries(sales)
//       .map(([id, qty]) => {
//         const q = Number(qty) || 0;
//         if (q < 1) return null;
//         const det = cartDetails.find((d) => d.id === id);
//         const title = det?.title || lookupFromDemo(id)?.title || `Товар #${id}`;
//         return { title, quantity: q };
//       })
//       .filter(Boolean) as { title: string; quantity: number }[];

//     if (!items.length) {
//       setIsSubmitting(false);
//       setSubmitError(t("order.error_empty"));
//       return;
//     }

//     try {
//       const res = await fetch("/api/send-telegram-message", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name, phoneNumber, items }),
//       });

//       if (!res.ok) {
//         const j = await res.json().catch(() => ({}));
//         throw new Error(j.error || t("order.error_network"));
//       }

//       setIsSuccess(true);
//       localStorage.removeItem("sales");
//       localStorage.removeItem("sales_meta");
//       window.dispatchEvent(new Event("storage"));
//       rebuildCart();

//       setTimeout(() => {
//         setIsOrderModalOpen(false);
//         setIsSuccess(false);
//       }, 2000);
//     } catch (e: any) {
//       setSubmitError(e?.message || t("order.error_network"));
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <>
//       <header className="bg-blue-800 text-white">
//         {/* Top bar */}
//         <div className="bg-blue-900 text-gray-200 py-1.5 px-4 hidden md:block">
//           <div className="container mx-auto flex justify-end items-center gap-6 text-sm">
//             <div className="flex items-center gap-2">
//               <Phone className="w-4 h-4" />
//               <span>+998 (77) 900-25-86, +998 (77) 129-11-66</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <MapPin className="w-4 h-4" />
//               <span>{t("header.address")}</span>
//             </div>
//           </div>
//         </div>

//         {/* Main row */}
//         <div className="px-4 py-4 container mx-0">
//           <div className="flex items-center justify-between">
//             {/* Logo */}
//             <Link href="/" className="flex items-center gap-3">
//               <div className="w-12 h-12 rounded-full overflow-hidden">
//                 <Image src={logo} alt="Yi Long" className="w-12 h-12 object-cover" priority />
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold">Yi Long</h1>
//                 <p className="text-sm text-gray-200">{t("header.tagline")}</p>
//               </div>
//             </Link>

//             {/* Desktop nav */}
//             <nav className="hidden md:flex items-center gap-8">
//               <Link href="/" className="relative group">
//                 {t("nav.home")}
//                 <span className="absolute inset-x-0 -bottom-1 h-[2px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
//               </Link>

//               <div
//                 className="relative group"
//                 onMouseEnter={() => setIsDropdownOpen(true)}
//                 onMouseLeave={() => setIsDropdownOpen(false)}
//               >
//                 <Link href="/tovary-i-uslugi" className="flex items-center gap-1">
//                   {t("nav.products")}
//                   <ChevronDown
//                     className={`w-4 h-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
//                   />
//                 </Link>

//                 <div
//                   className={`absolute top-full left-1/2 -translate-x-1/2 mt-4 min-w-[900px] bg-slate-900 text-white rounded-lg shadow-lg z-50 transition-all duration-200 ${
//                     isDropdownOpen ? "opacity-100 visible" : "opacity-0 invisible"
//                   }`}
//                 >
//                   <div className="grid grid-cols-4 gap-6 p-8">
//                     {categoriesData.map((c, i) => (
//                       <div key={i} className="text-base font-medium flex flex-col">
//                         <Link href={c.link} className="hover:text-gray-300">
//                           {c.title}
//                         </Link>
//                         <div className="mt-2 border-b border-gray-600 w-full" />
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               <Link href="/about" className="relative group">
//                 {t("nav.about")}
//                 <span className="absolute inset-x-0 -bottom-1 h-[2px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
//               </Link>

//               <Link href="/contact" className="relative group">
//                 {t("nav.contact")}
//                 <span className="absolute inset-x-0 -bottom-1 h-[2px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
//               </Link>

//               <Link href="/certificates" className="relative group">
//                 {t("nav.certificates")}
//                 <span className="absolute inset-x-0 -bottom-1 h-[2px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
//               </Link>

//               {/* Language select */}
//               <select
//                 value={lang}
//                 onChange={(e) => setLang(e.target.value as any)}
//                 className="bg-transparent rounded px-2 py-1 text-sm hover:bg-white/10 focus-visible:outline-none"
//                 aria-label={t("nav.choose_lang")}
//               >
//                 <option value="ru" className="text-black semi-bold fw-bold">RU</option>
//                 <option value="uz" className="text-black semi-bold fw-bold">UZ</option>
//               </select>

//               <button className="relative" onClick={toggleCart} aria-label="Open cart">
//                 <ShoppingCart className="w-6 h-6" />
//                 {cartCount > 0 && (
//                   <span className="absolute -top-2 -right-2 bg-yellow-400 text-slate-800 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
//                     {cartCount > 99 ? "99+" : cartCount}
//                   </span>
//                 )}
//               </button>
//             </nav>

//             {/* Mobile buttons */}
//             <div className="md:hidden flex items-center gap-4">
//               <Link href={"tel:+77789002586"} aria-label="Call">
//                 <Phone className="w-6 h-6" />
//               </Link>
//               <button className="relative" onClick={toggleCart} aria-label="Open cart">
//                 <ShoppingCart className="w-6 h-6" />
//                 {cartCount > 0 && (
//                   <span className="absolute -top-2 -right-2 bg-yellow-400 text-slate-800 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
//                     {cartCount > 99 ? "99+" : cartCount}
//                   </span>
//                 )}
//               </button>
//               <button onClick={() => setIsMobileMenuOpen(true)} aria-label="Open menu">
//                 <Menu className="w-8 h-8" />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Mobile main menu */}
//         <div
//           className={`fixed inset-y-0 left-0 w-80 bg-blue-900 text-white z-50 transform transition-transform duration-300 md:hidden ${
//             isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
//           }`}
//         >
//           <div className="flex justify-between items-center p-4">
//             <button onClick={() => setIsMobileMenuOpen(false)} aria-label="Close menu">
//               <X className="w-8 h-8 text-white" />
//             </button>
//           </div>

//           <nav className="flex flex-col h-full overflow-y-auto pt-2 pb-8">
//             {/* Mobile language */}
//             <div className="px-6 pb-2">
//               <label className="block text-xs text-gray-300 mb-2">{t("nav.choose_lang")}</label>
//               <select
//                 value={lang}
//                 onChange={(e) => setLang(e.target.value as any)}
//                 className="w-full bg-blue-800 border border-white/30 rounded px-3 py-2 text-sm"
//               >
//                 <option value="ru">RU</option>
//                 <option value="uz">UZ</option>
//               </select>
//             </div>

//             <Link
//               href="/"
//               onClick={() => setIsMobileMenuOpen(false)}
//               className="flex items-center gap-4 px-6 py-4 border-b border-gray-700 hover:bg-slate-800"
//             >
//               <Home className="w-6 h-6" />
//               <span>{t("nav.home")}</span>
//             </Link>

//             <button
//               onClick={() => setIsCategoriesOpen(true)}
//               className="flex items-center justify-between px-6 py-4 border-b border-gray-700 hover:bg-slate-800"
//             >
//               <span className="flex items-center gap-4">
//                 <LayoutGrid className="w-6 h-6" />
//                 {t("nav.products")}
//               </span>
//               <ChevronRight className="w-6 h-6 text-white" />
//             </button>

//             <button
//               onClick={() => {
//                 setIsMobileMenuOpen(false);
//                 setIsCategoriesOpen(false);
//                 toggleCart();
//               }}
//               className="flex items-center gap-4 px-6 py-4 border-b border-gray-700 hover:bg-slate-800 text-left"
//             >
//               <ShoppingCart className="w-6 h-6" />
//               <span>{t("nav.cart")}</span>
//               {cartCount > 0 && (
//                 <span className="ml-auto bg-yellow-400 text-slate-800 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
//                   {cartCount > 99 ? "99+" : cartCount}
//                 </span>
//               )}
//             </button>

//             <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="px-6 py-4 border-b border-gray-700 hover:bg-slate-800">
//               {t("nav.about")}
//             </Link>
//             <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="px-6 py-4 border-b border-gray-700 hover:bg-slate-800">
//               {t("nav.contact")}
//             </Link>
//             <Link href="/schedule" onClick={() => setIsMobileMenuOpen(false)} className="px-6 py-4 border-b border-gray-700 hover:bg-slate-800">
//               {t("nav.schedule")}
//             </Link>
//             <Link href="/reviews" onClick={() => setIsMobileMenuOpen(false)} className="px-6 py-4 border-b border-gray-700 hover:bg-slate-800">
//               {t("nav.reviews")}
//             </Link>
//           </nav>
//         </div>

//         {/* Mobile categories */}
//         <div
//           className={`fixed inset-y-0 left-0 w-80 bg-blue-800 text-white z-50 transform transition-transform duration-300 md:hidden ${
//             isCategoriesOpen ? "translate-x-0" : "-translate-x-full"
//           }`}
//         >
//           <div className="flex items-center p-4 bg-blue-900 border-b border-gray-700">
//             <button onClick={() => setIsCategoriesOpen(false)} className="flex items-center text-gray-200" aria-label="Close categories">
//               <X className="w-8 h-8" />
//             </button>
//             <h3 className="flex-1 text-center font-semibold text-lg mr-8">{t("nav.categories")}</h3>
//           </div>
//           <div className="h-full overflow-y-auto py-2">
//             {categoriesData.map((c, i) => (
//               <Link
//                 key={i}
//                 href={c.link}
//                 onClick={() => {
//                   setIsMobileMenuOpen(false);
//                   setIsCategoriesOpen(false);
//                 }}
//                 className="flex justify-between items-center px-6 py-4 border-b border-gray-700 hover:bg-slate-800"
//               >
//                 <span className="flex-1">{c.title}</span>
//                 <ChevronRight className="w-4 h-4 text-gray-300" />
//               </Link>
//             ))}
//           </div>
//         </div>
//       </header>

//       {/* Modals */}
//       <CartModal
//         isOpen={isCartModalOpen}
//         onClose={() => setIsCartModalOpen(false)}
//         onOpenOrder={openOrder}
//         cartDetails={cartDetails}
//         onInc={inc}
//         onDec={dec}
//         onRemove={removeItem}
//       />
//       <OrderModal
//         isOpen={isOrderModalOpen}
//         onClose={() => setIsOrderModalOpen(false)}
//         onSubmit={handleOrderSubmit}
//         isSubmitting={isSubmitting}
//         submitError={submitError}
//         isSuccess={isSuccess}
//       />
//     </>
//   );
// }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  X,
  Phone,
  ShoppingCart,
  ChevronRight,
  ChevronDown,
  Home,
  LayoutGrid,
  MapPin,
} from "lucide-react";
import { IMaskInput } from "react-imask";
import data from "@/data/data.json";
import logo from "../../public/assets/icon.png";

import { useI18n } from "@/components/i18n/I18nProvider";
import { formatCurrency } from "@/i18n/config";

/* ===================== Types ===================== */
type CartMap = Record<string, number>;
type MetaMap = Record<string, { title?: string; price?: string; image?: string }>;

type CartDetail = {
  id: string;
  title: string;
  price: string;
  image?: string;
  quantity: number;
};

/* ===================== Helpers ===================== */
const parsePriceToNumber = (s?: string) => {
  if (!s) return 0;
  const digits = s.match(/\d+/g);
  if (!digits) return 0;
  return Number(digits.join(""));
};

/* ===================== Storage helpers ===================== */
const readSales = (): CartMap => {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem("sales") || "{}");
  } catch {
    return {};
  }
};
const writeSales = (map: CartMap) => {
  localStorage.setItem("sales", JSON.stringify(map));
  window.dispatchEvent(new Event("storage"));
};
const readMeta = (): MetaMap => {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem("sales_meta") || "{}");
  } catch {
    return {};
  }
};
const writeMeta = (map: MetaMap) => {
  localStorage.setItem("sales_meta", JSON.stringify(map));
  window.dispatchEvent(new Event("storage"));
};

/** Demo fallback — data.json dan topish (agar meta yo‘q bo‘lsa) */
const lookupFromDemo = (id: string) => {
  const p = (data as any)?.mainProduct?.find((x: any) => String(x.id) === String(id));
  if (!p) return null;
  return { title: p.title as string, price: p.price as string, image: p.image as string | undefined };
};

/* ===================== Cart Modal ===================== */
type CartModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onOpenOrder: () => void;
  cartDetails: CartDetail[];
  onInc: (id: string) => void;
  onDec: (id: string) => void;
  onRemove: (id: string) => void;
};

const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
  onOpenOrder,
  cartDetails,
  onInc,
  onDec,
  onRemove,
}) => {
  const { t, lang } = useI18n();
  const currency = (n: number) => formatCurrency(n, lang);

  if (!isOpen) return null;

  const subtotal = cartDetails.reduce((sum, it) => {
    const unit = parsePriceToNumber(it.price);
    return sum + unit * (it.quantity || 0);
  }, 0);

  return (
    <div
      onClick={(e) => e.currentTarget === e.target && onClose()}
      className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4"
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm md:max-w-md max-h-[80vh] overflow-y-auto relative p-6">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition"
          aria-label="Close cart"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">{t("cart.title")}</h2>

        {cartDetails.length === 0 ? (
          <p className="text-gray-600 text-center">{t("cart.empty")}</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {cartDetails.map((item) => {
              const unit = parsePriceToNumber(item.price);
              const qty = item.quantity || 0;
              const lineTotal = unit * qty;

              return (
                <li key={item.id} className="flex items-center gap-4 py-4">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="w-16 h-16 rounded-md object-contain"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{item.title}</h4>

                    <p className="text-sm text-gray-600">
                      {item.price || t("common.price_from", { price: currency(unit) })}
                    </p>

                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onDec(item.id)}
                          className="px-2 py-1 rounded-full text-gray-600 hover:bg-gray-200 transition"
                        >
                          −
                        </button>
                        <span className="text-sm font-semibold">{qty}</span>
                        <button
                          onClick={() => onInc(item.id)}
                          className="px-2 py-1 rounded-full text-gray-600 hover:bg-gray-200 transition"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-sm font-semibold">{currency(lineTotal)} т</div>
                    </div>
                  </div>

                  <button
                    onClick={() => onRemove(item.id)}
                    className="p-1 text-red-500 hover:text-red-700 transition"
                    aria-label="Remove item"
                  >
                    <X size={20} />
                  </button>
                </li>
              );
            })}
          </ul>
        )}

        {cartDetails.length > 0 && (
          <div className="mt-6 pt-4 border-t border-gray-200 space-y-3">
            <div className="flex items-center justify-between text-base">
              <span className="font-medium">{t("common.total")}:</span>
              <span className="font-semibold">{currency(subtotal)} т</span>
            </div>

            <button
              onClick={onOpenOrder}
              className="w-full bg-slate-700 text-white py-3 rounded-lg font-semibold hover:bg-slate-800 transition"
            >
              {t("cart.checkout")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

/* ===================== Order Modal ===================== */
type OrderModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payload: { name: string; phoneNumber: string }) => Promise<void> | void;
  isSubmitting: boolean;
  submitError: string | null;
  isSuccess: boolean;
};

const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting,
  submitError,
  isSuccess,
}) => {
  const { t } = useI18n();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setPhoneNumber("");
      setName("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return alert(t("order.error_name"));
    const digits = phoneNumber.replace(/\D/g, "");
    if (digits.length !== 12) return alert(t("order.error_phone"));
    onSubmit({ name: name.trim(), phoneNumber });
  };

  return (
    <div
      onClick={(e) => e.currentTarget === e.target && onClose()}
      className="fixed inset-0 bg-black/50 z-[101] flex items-center justify-center p-4"
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm md:max-w-md relative p-6">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition"
          aria-label="Close order"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
          {t("order.enter_data")}
        </h2>

        {isSuccess ? (
          <div className="text-center p-4 bg-green-100 text-green-700 rounded-md">
            <p className="font-semibold">{t("order.success_title")}</p>
            <p className="text-sm mt-2">{t("order.success_text")}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("order.name_placeholder")}
              className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
              required
            />
            <IMaskInput
              mask={"+998 (00) 000 00 00"}
              type="tel"
              value={phoneNumber}
              onAccept={(v) => setPhoneNumber(String(v))}
              placeholder={t("order.phone_placeholder")}
              className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
              required
            />
            {submitError && <p className="text-red-500 text-sm mb-4">{submitError}</p>}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 rounded-lg font-semibold transition ${
                isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-slate-700 text-white hover:bg-slate-800"
              }`}
            >
              {isSubmitting ? t("order.submitting") : t("order.submit")}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

/* ===================== Mega-menu (link saqlanadi, nom i18n) ===================== */
const MEGAMENU: { id: string; href: string; fallback: string }[] = [
  { id: "listovye-materialy", href: "/listovye-materialy", fallback: "Листовые материалы" },
  { id: "rulonnye-materialy", href: "/rulonnye-materialy", fallback: "Рулонные материалы" },
  { id: "istochniki-sveta", href: "/istochniki-sveta", fallback: "Источники света (светодиоды, лампы и пр.)" },
  { id: "transformatory-i-upravlenie", href: "/transformatory-i-upravlenie", fallback: "Трансформаторы и источники управления" },
  { id: "chernila-kraski", href: "/chernila-kraski", fallback: "Чернила (краски)" },

  // slugi boshqacha bo'lganlar:
  { id: "reklamnoe-i-vystavochnoe-oborudovanie", href: "/reklamno-vystavochnoe", fallback: "Рекламное и выставочное оборудование" },
  { id: "alyuminievye-profili", href: "/alyuminievye-profily", fallback: "Алюминиевые профили и комплектующие" },
  { id: "kleevye-resheniya", href: "/kleevye-resheniya", fallback: "Клеевые решения (скотч, клей)" },
  { id: "metallicheskaya-i-plastiknaya-furnitura", href: "/metal-i-plast-furnitura", fallback: "Металлическая и пластиковая фурнитура" },

  { id: "instrumenty", href: "/instrumenty", fallback: "Инструменты" },
  { id: "frezy-i-gravery", href: "/frezy-i-gravery", fallback: "Фрезы и граверы" },
];

/* ===================== Header ===================== */
export default function Header() {
  const { t, lang, setLang } = useI18n();
  const currency = (n: number) => formatCurrency(n, lang);

  // i18n helper
  const tr = (key: string, fallback: string) => {
    const v = t(key as any);
    return v && v !== key ? v : fallback;
    };

  // nav
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  // cart
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [cartDetails, setCartDetails] = useState<CartDetail[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  /* ---- build cart from storage ---- */
  const rebuildCart = useCallback(() => {
    const sales = readSales();
    const meta = readMeta();
    const ids = Object.keys(sales);

    if (!ids.length) {
      setCartCount(0);
      setCartDetails([]);
      return;
    }

    const details: CartDetail[] = ids
      .map((id) => {
        const quantity = Number(sales[id]) || 0;
        if (quantity < 1) return null;

        let title = meta[id]?.title;
        let price = meta[id]?.price;
        let image = meta[id]?.image;

        if (!title || !price) {
          const d = lookupFromDemo(id);
          if (d) {
            title = title || d.title;
            price = price || d.price;
            image = image || d.image;
          }
        }

        return {
          id,
          title: title || `Товар #${id}`,
          price: price || "",
          image,
          quantity,
        } as CartDetail;
      })
      .filter(Boolean) as CartDetail[];

    setCartDetails(details);
    setCartCount(details.reduce((s, x) => s + x.quantity, 0));
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    rebuildCart();
    const h = () => rebuildCart();
    window.addEventListener("storage", h);
    return () => window.removeEventListener("storage", h);
  }, [rebuildCart]);

  /* ---- cart ops ---- */
  const inc = (id: string) => {
    const s = readSales();
    s[id] = (s[id] || 0) + 1;
    writeSales(s);
    rebuildCart();
  };
  const dec = (id: string) => {
    const s = readSales();
    if (s[id] && s[id] > 1) s[id] -= 1;
    else {
      delete s[id];
      const m = readMeta();
      if (m[id]) {
        delete m[id];
        writeMeta(m);
      }
    }
    writeSales(s);
    rebuildCart();
  };
  const removeItem = (id: string) => {
    const s = readSales();
    delete s[id];
    writeSales(s);
    const m = readMeta();
    if (m[id]) {
      delete m[id];
      writeMeta(m);
    }
    rebuildCart();
  };

  const toggleCart = () => {
    setIsCartModalOpen((v) => !v);
    setIsOrderModalOpen(false);
  };
  const openOrder = () => {
    setIsCartModalOpen(false);
    setIsOrderModalOpen(true);
  };

  /* ---- submit order ---- */
  const handleOrderSubmit = async ({ name, phoneNumber }: { name: string; phoneNumber: string }) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setIsSuccess(false);

    const sales = readSales();
    const items = Object.entries(sales)
      .map(([id, qty]) => {
        const q = Number(qty) || 0;
        if (q < 1) return null;
        const det = cartDetails.find((d) => d.id === id);
        const title = det?.title || lookupFromDemo(id)?.title || `Товар #${id}`;
        return { title, quantity: q };
      })
      .filter(Boolean) as { title: string; quantity: number }[];

    if (!items.length) {
      setIsSubmitting(false);
      setSubmitError(t("order.error_empty"));
      return;
    }

    try {
      const res = await fetch("/api/send-telegram-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phoneNumber, items }),
      });

      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || t("order.error_network"));
      }

      setIsSuccess(true);
      localStorage.removeItem("sales");
      localStorage.removeItem("sales_meta");
      window.dispatchEvent(new Event("storage"));
      rebuildCart();

      setTimeout(() => {
        setIsOrderModalOpen(false);
        setIsSuccess(false);
      }, 2000);
    } catch (e: any) {
      setSubmitError(e?.message || t("order.error_network"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <header className="bg-blue-800 text-white">
        {/* Top bar */}
        <div className="bg-blue-900 text-gray-200 py-1.5 px-4 hidden md:block">
          <div className="container mx-auto flex justify-end items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>+998 (77) 900-25-86, +998 (77) 129-11-66</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{t("header.address")}</span>
            </div>
          </div>
        </div>

        {/* Main row */}
        <div className="px-4 py-4 container mx-0">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <Image src={logo} alt="Yi Long" className="w-12 h-12 object-cover" priority />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Yi Long</h1>
                <p className="text-sm text-gray-200">{t("header.tagline")}</p>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/" className="relative group">
                {t("nav.home")}
                <span className="absolute inset-x-0 -bottom-1 h-[2px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </Link>

              <div className="relative group" onMouseEnter={() => setIsDropdownOpen(true)} onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <Link href="/tovary-i-uslugi" className="flex items-center gap-1">
                  {t("nav.products")}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                  />
                </Link>

                {/* Mega menu */}
                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 mt-4 min-w-[900px] bg-slate-900 text-white rounded-lg shadow-lg z-50 transition-all duration-200 ${
                    isDropdownOpen ? "opacity-100 visible" : "opacity-0 invisible"
                  }`}
                >
                  <div className="grid grid-cols-4 gap-6 p-8">
                    {MEGAMENU.map((m) => (
                      <div key={m.id} className="text-base font-medium flex flex-col">
                        <Link href={m.href} className="hover:text-gray-300">
                          {tr(`catalog.sections.${m.id}.title`, m.fallback)}
                        </Link>
                        <div className="mt-2 border-b border-gray-600 w-full" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <Link href="/about" className="relative group">
                {t("nav.about")}
                <span className="absolute inset-x-0 -bottom-1 h-[2px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </Link>

              <Link href="/contact" className="relative group">
                {t("nav.contact")}
                <span className="absolute inset-x-0 -bottom-1 h-[2px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </Link>

              <Link href="/certificates" className="relative group">
                {t("nav.certificates")}
                <span className="absolute inset-x-0 -bottom-1 h-[2px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </Link>

              {/* Language select */}
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value as any)}
                className="bg-transparent rounded px-2 py-1 text-sm hover:bg-white/10 focus-visible:outline-none"
                aria-label={t("nav.choose_lang")}
              >
                <option value="ru" className="text-black">RU</option>
                <option value="uz" className="text-black">UZ</option>
              </select>

              <button className="relative" onClick={toggleCart} aria-label="Open cart">
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-yellow-400 text-slate-800 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </button>
            </nav>

            {/* Mobile buttons */}
            <div className="md:hidden flex items-center gap-4">
              <Link href={"tel:+77789002586"} aria-label="Call">
                <Phone className="w-6 h-6" />
              </Link>
              <button className="relative" onClick={toggleCart} aria-label="Open cart">
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-yellow-400 text-slate-800 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </button>
              <button onClick={() => setIsMobileMenuOpen(true)} aria-label="Open menu">
                <Menu className="w-8 h-8" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile main menu */}
        <div
          className={`fixed inset-y-0 left-0 w-80 bg-blue-900 text-white z-50 transform transition-transform duration-300 md:hidden ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center p-4">
            <button onClick={() => setIsMobileMenuOpen(false)} aria-label="Close menu">
              <X className="w-8 h-8 text-white" />
            </button>
          </div>

          <nav className="flex flex-col h-full overflow-y-auto pt-2 pb-8">
            {/* Mobile language */}
            <div className="px-6 pb-2">
              <label className="block text-xs text-gray-300 mb-2">{t("nav.choose_lang")}</label>
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value as any)}
                className="w-full bg-blue-800 border border-white/30 rounded px-3 py-2 text-sm"
              >
                <option value="ru">RU</option>
                <option value="uz">UZ</option>
              </select>
            </div>

            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-4 px-6 py-4 border-b border-gray-700 hover:bg-slate-800"
            >
              <Home className="w-6 h-6" />
              <span>{t("nav.home")}</span>
            </Link>

            <button
              onClick={() => setIsCategoriesOpen(true)}
              className="flex items-center justify-between px-6 py-4 border-b border-gray-700 hover:bg-slate-800"
            >
              <span className="flex items-center gap-4">
                <LayoutGrid className="w-6 h-6" />
                {t("nav.products")}
              </span>
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsCategoriesOpen(false);
                toggleCart();
              }}
              className="flex items-center gap-4 px-6 py-4 border-b border-gray-700 hover:bg-slate-800 text-left"
            >
              <ShoppingCart className="w-6 h-6" />
              <span>{t("nav.cart")}</span>
              {cartCount > 0 && (
                <span className="ml-auto bg-yellow-400 text-slate-800 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </button>

            <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="px-6 py-4 border-b border-gray-700 hover:bg-slate-800">
              {t("nav.about")}
            </Link>
            <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="px-6 py-4 border-b border-gray-700 hover:bg-slate-800">
              {t("nav.contact")}
            </Link>
            <Link href="/certificates" onClick={() => setIsMobileMenuOpen(false)} className="px-6 py-4 border-b border-gray-700 hover:bg-slate-800">
              {t("nav.certificates")}
            </Link>
            {/* <Link href="/reviews" onClick={() => setIsMobileMenuOpen(false)} className="px-6 py-4 border-b border-gray-700 hover:bg-slate-800">
              {t("nav.reviews")}
            </Link> */}
          </nav>
        </div>

        {/* Mobile categories */}
        <div
          className={`fixed inset-y-0 left-0 w-80 bg-blue-800 text-white z-50 transform transition-transform duration-300 md:hidden ${
            isCategoriesOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center p-4 bg-blue-900 border-b border-gray-700">
            <button onClick={() => setIsCategoriesOpen(false)} className="flex items-center text-gray-200" aria-label="Close categories">
              <X className="w-8 h-8" />
            </button>
            <h3 className="flex-1 text-center font-semibold text-lg mr-8">{t("nav.categories")}</h3>
          </div>
          <div className="h-full overflow-y-auto py-2">
            {MEGAMENU.map((m) => (
              <Link
                key={m.id}
                href={m.href}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsCategoriesOpen(false);
                }}
                className="flex justify-between items-center px-6 py-4 border-b border-gray-700 hover:bg-slate-800"
              >
                <span className="flex-1">{tr(`catalog.sections.${m.id}.title`, m.fallback)}</span>
                <ChevronRight className="w-4 h-4 text-gray-300" />
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* Modals */}
      <CartModal
        isOpen={isCartModalOpen}
        onClose={() => setIsCartModalOpen(false)}
        onOpenOrder={openOrder}
        cartDetails={cartDetails}
        onInc={inc}
        onDec={dec}
        onRemove={removeItem}
      />
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        onSubmit={handleOrderSubmit}
        isSubmitting={isSubmitting}
        submitError={submitError}
        isSuccess={isSuccess}
      />
    </>
  );
}
