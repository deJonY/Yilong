// src/app/api/send-telegram-message/route.js
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const BACKEND_URL = process.env.BACKEND_URL;
    if (!BACKEND_URL) {
      return NextResponse.json({ error: "BACKEND_URL is not set" }, { status: 500 });
    }

    const body = await req.json(); // { name, phoneNumber, items }

    // Minimal tekshiruv (422 bermasligi uchun toza JSda)
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid body" }, { status: 422 });
    }
    if (!body.name || !body.phoneNumber) {
      return NextResponse.json({ error: "name and phoneNumber required" }, { status: 422 });
    }
    if (!Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json({ error: "items must be a non-empty array" }, { status: 422 });
    }
    for (const it of body.items) {
      if (!it || typeof it.title !== "string" || !it.title.trim()) {
        return NextResponse.json({ error: "each item.title is required" }, { status: 422 });
      }
      if (!Number.isInteger(it.quantity) || it.quantity < 1) {
        return NextResponse.json({ error: "each item.quantity must be >= 1" }, { status: 422 });
      }
    }

    const resp = await fetch(`${BACKEND_URL}/api/send-telegram-message`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    // Backend JSON qaytaradi — o‘sha JSONni uzatamiz
    const text = await resp.text();
    return new NextResponse(text, {
      status: resp.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return NextResponse.json({ error: e?.message || "Unknown error" }, { status: 500 });
  }
}
