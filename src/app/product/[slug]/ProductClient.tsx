// "use client";

// import { useState, useEffect } from "react";
// import type { Product } from "@/types/product";

// /* sales_meta ga meta yozuvchi helper */
// function persistCartMeta(p: Product) {
//   try {
//     const raw = localStorage.getItem("sales_meta");
//     const meta = raw ? JSON.parse(raw) : {};
//     const id = String(p.id);
//     meta[id] = {
//       title: p.title,
//       price: p.price,
//       image: p.image || meta[id]?.image || "",
//     };
//     localStorage.setItem("sales_meta", JSON.stringify(meta));
//     window.dispatchEvent(new Event("storage"));
//   } catch {}
// }

// export default function ProductClient({ product }: { product: Product }) {
//   const [position, setPosition] = useState({ x: "50%", y: "50%" });
//   const [quantity, setQuantity] = useState<number>(0);

//   const updateCart = (action: "add" | "increment" | "decrement") => {
//     const raw = localStorage.getItem("sales");
//     const sales = raw ? JSON.parse(raw) : {};
//     const id = String(product.id);

//     if (action === "add") {
//       if (!sales[id]) sales[id] = 1;
//       // 👉 meta’ni shu yerda yozamiz
//       persistCartMeta(product);
//     } else if (action === "increment") {
//       if (sales[id]) sales[id] += 1;
//     } else if (action === "decrement") {
//       if (sales[id] && sales[id] > 1) sales[id] -= 1;
//       else delete sales[id];
//     }

//     localStorage.setItem("sales", JSON.stringify(sales));
//     setQuantity(sales[id] || 0);
//     window.dispatchEvent(new Event("storage"));
//   };

//   useEffect(() => {
//     const sales = localStorage.getItem("sales") ? JSON.parse(localStorage.getItem("sales") as string) : {};
//     setQuantity(sales[String(product.id)] || 0);

//     const handle = () => {
//       const s = localStorage.getItem("sales") ? JSON.parse(localStorage.getItem("sales") as string) : {};
//       setQuantity(s[String(product.id)] || 0);
//     };
//     window.addEventListener("storage", handle);
//     return () => window.removeEventListener("storage", handle);
//   }, [product.id]);

//   const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
//     const { left, width, top, height } = e.currentTarget.getBoundingClientRect();
//     const x = ((e.clientX - left) / width) * 100;
//     const y = ((e.clientY - top) / height) * 100;
//     setPosition({ x: `${x}%`, y: `${y}%` });
//   };

//   return (
//     <div className="container mx-auto p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
//       <div className="flex justify-center items-center overflow-hidden py-5 px-5" onMouseMove={handleMouseMove}>
//         <img
//           src={product.image || "/placeholder.svg"}
//           alt={product.title}
//           style={{ transformOrigin: `${position.x} ${position.y}` }}
//           className="w-auto h-full object-contain rounded transition-transform duration-300 hover:scale-[2]"
//         />
//       </div>

//       <div className="flex flex-col justify-between">
//         <div>
//           <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
//           <p className="text-2xl text-orange-600 font-semibold mb-2">{product.price}</p>
//           {product.available ? (
//             <p className="text-green-600 mb-4">В наличии</p>
//           ) : (
//             <p className="text-red-600 mb-4">Нет в наличии</p>
//           )}

//           {quantity > 0 ? (
//             <div className="flex items-center gap-2">
//               <button className="px-4 py-2 bg-red-600 text-white font-bold rounded-md" onClick={() => updateCart("decrement")}>-</button>
//               <span className="px-3 py-2 border rounded-md">{quantity}</span>
//               <button className="px-4 py-2 bg-red-600 text-white font-bold rounded-md" onClick={() => updateCart("increment")}>+</button>
//             </div>
//           ) : (
//             <button
//               className="bg-orange-600 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-orange-700 transition cursor-pointer"
//               onClick={() => updateCart("add")}
//             >
//               Купить
//             </button>
//           )}
//         </div>

//         <div className="mt-6 text-gray-600">
//           <h2 className="font-semibold text-lg mb-2">Описание товара</h2>
//           <p>{product.description}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

"use client";

import { useState, useEffect } from "react";
import type { Product } from "@/types/product";
import { useI18n } from "@/components/i18n/I18nProvider";

/* sales_meta ga meta yozuvchi helper */
function persistCartMeta(p: Product) {
  try {
    const raw = localStorage.getItem("sales_meta");
    const meta = raw ? JSON.parse(raw) : {};
    const id = String(p.id);
    meta[id] = {
      title: p.title,
      price: p.price,
      image: p.image || meta[id]?.image || "",
    };
    localStorage.setItem("sales_meta", JSON.stringify(meta));
    window.dispatchEvent(new Event("storage"));
  } catch {}
}

export default function ProductClient({ product }: { product: Product }) {
  const { t } = useI18n();
  const [position, setPosition] = useState({ x: "50%", y: "50%" });
  const [quantity, setQuantity] = useState<number>(0);

  const updateCart = (action: "add" | "increment" | "decrement") => {
    const raw = localStorage.getItem("sales");
    const sales = raw ? JSON.parse(raw) : {};
    const id = String(product.id);

    if (action === "add") {
      if (!sales[id]) sales[id] = 1;
      persistCartMeta(product);
    } else if (action === "increment") {
      if (sales[id]) sales[id] += 1;
    } else if (action === "decrement") {
      if (sales[id] && sales[id] > 1) sales[id] -= 1;
      else delete sales[id];
    }

    localStorage.setItem("sales", JSON.stringify(sales));
    setQuantity(sales[id] || 0);
    window.dispatchEvent(new Event("storage"));
  };

  useEffect(() => {
    const sales = localStorage.getItem("sales") ? JSON.parse(localStorage.getItem("sales") as string) : {};
    setQuantity(sales[String(product.id)] || 0);

    const handle = () => {
      const s = localStorage.getItem("sales") ? JSON.parse(localStorage.getItem("sales") as string) : {};
      setQuantity(s[String(product.id)] || 0);
    };
    window.addEventListener("storage", handle);
    return () => window.removeEventListener("storage", handle);
  }, [product.id]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, width, top, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setPosition({ x: `${x}%`, y: `${y}%` });
  };

  return (
    <div className="container mx-auto p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
      <div className="flex justify-center items-center overflow-hidden py-5 px-5" onMouseMove={handleMouseMove}>
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.title}
          style={{ transformOrigin: `${position.x} ${position.y}` }}
          className="w-auto h-full object-contain rounded transition-transform duration-300 hover:scale-[2]"
        />
      </div>

      <div className="flex flex-col justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-2xl text-orange-600 font-semibold mb-2">{product.price}</p>
          {product.available ? (
            <p className="text-green-600 mb-4">{t("productDetail.in_stock")}</p>
          ) : (
            <p className="text-red-600 mb-4">{t("productDetail.out_of_stock")}</p>
          )}

          {quantity > 0 ? (
            <div className="flex items-center gap-2">
              <button
                className="px-4 py-2 bg-red-600 text-white font-bold rounded-md"
                onClick={() => updateCart("decrement")}
                aria-label={t("productDetail.decrease")}
              >
                -
              </button>
              <span className="px-3 py-2 border rounded-md" aria-live="polite">{quantity}</span>
              <button
                className="px-4 py-2 bg-red-600 text-white font-bold rounded-md"
                onClick={() => updateCart("increment")}
                aria-label={t("productDetail.increase")}
              >
                +
              </button>
            </div>
          ) : (
            <button
              className="bg-orange-600 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-orange-700 transition cursor-pointer"
              onClick={() => updateCart("add")}
              aria-label={t("productDetail.buy")}
            >
              {t("productDetail.buy")}
            </button>
          )}
        </div>

        <div className="mt-6 text-gray-600">
          <h2 className="font-semibold text-lg mb-2">{t("productDetail.description_title")}</h2>
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  );
}
