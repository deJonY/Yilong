// src/lib/firebase/queries.ts
import { db } from "./init";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  orderBy,
  limit as fsLimit,
} from "firebase/firestore";

export type SectionDoc = {
  id: string;
  title: string;
  order?: number;
  image?: string;
};

export type CategoryDoc = {
  id: string;
  title: string;
  order?: number;
  image?: string;
};

export type SizeDoc = {
  id: string;
  name: string;
  size: string;
  image?: string;
};

export type ItemDoc = {
  id: string;
  title: string;
  price: string;
  image?: string;
  description?: string;
  available?: boolean;
  /** fetchAllSizeItems orqali keladi: item qaysi size’dan ekanini bilish uchun */
  _sizeId?: string;
};

function sortByTitle<T extends { title?: string }>(arr: T[], locale = "ru") {
  return arr.sort((a, b) => (a.title || "").localeCompare(b.title || "", locale));
}
function sortByName<T extends { name?: string }>(arr: T[], locale = "ru") {
  return arr.sort((a, b) => (a.name || "").localeCompare(b.name || "", locale));
}

/** `Название (Размер)` ko‘rinishi uchun, agar size allaqachon qavsda bo‘lsa – yana qavs qo‘shmaydi */
export function joinNameSize(name?: string, size?: string) {
  const s = (size ?? "").trim();
  const sizeText = s ? (/^[\(\[]/.test(s) ? s : `(${s})`) : "";
  return [name, sizeText].filter(Boolean).join(" ");
}


export async function fetchSections(locale: string = "ru"): Promise<SectionDoc[]> {
  const col = collection(db, "products");
  const qref = query(col, orderBy("order"));
  const snap = await getDocs(qref);
  const list: SectionDoc[] = snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
  // Title bo'yicha sort hohlasangiz, shu yerda qoldiring; odatda order yetarli
  return list;
}

export async function fetchSectionTitle(sectionId: string): Promise<string> {
  const s = await getDoc(doc(db, "products", sectionId));
  return (s.data()?.title as string) || sectionId;
}


export async function fetchCategories(
  sectionId: string,
  locale: string = "ru"
): Promise<CategoryDoc[]> {
  const qref = query(collection(db, "products", sectionId, "categories"), orderBy("order"));
  const snap = await getDocs(qref);
  const list: CategoryDoc[] = snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
  return list;
}

export async function fetchCategoryTitle(
  sectionId: string,
  categoryId: string
): Promise<string> {
  const snap = await getDoc(doc(db, "products", sectionId, "categories", categoryId));
  return (snap.data()?.title as string) || categoryId;
}

export async function getCategoryImage(
  sectionId: string,
  categoryId: string
): Promise<string | undefined> {
  const dref = doc(db, "products", sectionId, "categories", categoryId);
  const d = await getDoc(dref);
  return (d.data()?.image as string) || undefined;
}


export async function fetchSizes(
  sectionId: string,
  categoryId: string,
  lim = 50,
  locale: string = "ru"
): Promise<SizeDoc[]> {
  const qref = query(
    collection(db, "products", sectionId, "categories", categoryId, "sizes"),
    fsLimit(lim)
  );
  const snap = await getDocs(qref);
  const list: SizeDoc[] = snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
  return sortByName(list, locale);
}

export async function fetchSizeLabel(
  sectionId: string,
  categoryId: string,
  sizeId: string
): Promise<string | undefined> {
  const sdoc = await getDoc(doc(db, "products", sectionId, "categories", categoryId, "sizes", sizeId));
  const data = sdoc.data() as any | undefined;
  if (!data) return undefined;
  return joinNameSize(data.name, data.size);
}


export async function fetchItemsCat(
  sectionId: string,
  categoryId: string,
  lim = 60,
  locale: string = "ru"
): Promise<ItemDoc[]> {
  const qref = query(
    collection(db, "products", sectionId, "categories", categoryId, "items"),
    fsLimit(lim)
  );
  const snap = await getDocs(qref);
  const list: ItemDoc[] = snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
  return sortByTitle(list, locale);
}


export async function fetchItemsSize(
  sectionId: string,
  categoryId: string,
  sizeId: string,
  lim = 120,
  locale: string = "ru"
): Promise<ItemDoc[]> {
  const qref = query(
    collection(
      db,
      "products",
      sectionId,
      "categories",
      categoryId,
      "sizes",
      sizeId,
      "items"
    ),
    fsLimit(lim)
  );
  const snap = await getDocs(qref);
  const list: ItemDoc[] = snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
  return sortByTitle(list, locale);
}

export async function fetchAllSizeItems(
  sectionId: string,
  categoryId: string,
  limPerSize = 200,
  locale: string = "ru"
): Promise<ItemDoc[]> {
  const sizes = await fetchSizes(sectionId, categoryId, 500, locale);
  const all = await Promise.all(
    sizes.map(async (s) => {
      const items = await fetchItemsSize(sectionId, categoryId, s.id, limPerSize, locale);
      // muhim: qaysi size’dan kelganini belgilab qo'yamiz
      return items.map((it) => ({ ...it, _sizeId: s.id }));
    })
  );
  return all.flat();
}

export async function getItemsByCategory(sectionId: string, categoryId: string) {
  const colRef = collection(db, "products", sectionId, "categories", categoryId, "items");
  const snap = await getDocs(colRef);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
}