"use client";

import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // dev server logida stack trace chiqadi
    console.error("[App Error]", error);
  }, [error]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "#0b1020",
        color: "#fff",
        padding: 24,
      }}
    >
      <div style={{ maxWidth: 720 }}>
        <h1 style={{ fontSize: 28, marginBottom: 8 }}>Nimadir xato ketdi 😕</h1>
        <p style={{ opacity: 0.8, marginBottom: 16 }}>
          Quyidagi tugma sahifani qaytadan yuklaydi. Terminal logida to‘liq
          xabar chiqadi.
        </p>
        <pre
          style={{
            whiteSpace: "pre-wrap",
            background: "#141a33",
            padding: 12,
            borderRadius: 8,
            marginBottom: 16,
          }}
        >
          {error?.message}
          {error?.name ? `\n${error.name}` : ""}
          {(error as any)?.digest ? `\ndigest: ${(error as any)?.digest}` : ""}
        </pre>
        <button
          onClick={() => reset()}
          style={{
            background: "#2563eb",
            color: "#fff",
            padding: "10px 16px",
            borderRadius: 8,
          }}
        >
          Qayta urinib ko‘rish
        </button>
      </div>
    </div>
  );
}
