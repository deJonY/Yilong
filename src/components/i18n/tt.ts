export function tt(
  t: (k: string) => string | undefined,
  key: string,
  fallback?: string
) {
  const v = t(key);
  if (typeof v === "string" && v.trim()) return v;
  if (process.env.NODE_ENV !== "production") {
    console.warn("[i18n-missing]", key);
  }
  if (fallback?.trim()) return fallback;
  return "";
}
