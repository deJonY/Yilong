"use client";

import { useEffect, useState } from "react";
import ProductList from "src/components/cards/first-card";
import CategoryLayout from "../../components/CategoryLayout";
import data from "src/data/data.json";
import { RiGalleryView2 } from "react-icons/ri";
import { PiListBold } from "react-icons/pi";

// Cookie o‘qish/yozish uchun oddiy helper funksiyalar
function setCookie(name: string, value: string, days: number) {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + d.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name: string) {
  const cname = name + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(cname) === 0) {
      return c.substring(cname.length, c.length);
    }
  }
  return null;
}

export default function ListovyeMaterialy() {
  const products = data.mainProduct;

  // default holat — cookie’dan olinadi, yo‘q bo‘lsa 'default'
  const [view, setView] = useState<"default" | "single">("default");

  useEffect(() => {
    const saved = getCookie("productView");
    if (saved === "default" || saved === "single") {
      setView(saved);
    }
  }, []);

  const handleChangeView = (newView: "default" | "single") => {
    setView(newView);
    setCookie("productView", newView, 7); // 7 kun saqlanadi
  };

  return (
    <CategoryLayout title="Листовые материалы">
      <ProductList products={products} type="simple" size="default" />

      <div className="w-full h-20 text-black flex items-center justify-between mt-28 mb-8">
        <div className="flex items-center gap-4">
          <p>Сортировка: по порядку</p>
          <p>Товаров на странице</p>
        </div>
        <div className="flex items-center gap-4 text-2xl cursor-pointer">
          <RiGalleryView2
            className={view === "default" ? "text-blue-600" : "text-gray-500"}
            onClick={() => handleChangeView("default")}
          />
          <PiListBold
            className={view === "single" ? "text-blue-600" : "text-gray-500"}
            onClick={() => handleChangeView("single")}
          />
        </div>
      </div>

      <ProductList products={products} type="detailed" size={view} />
    </CategoryLayout>
  );
}
