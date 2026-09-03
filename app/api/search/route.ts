import { NextResponse } from "next/server";
import { searchAll } from "@/lib/study-queries";

// Runs server-side only — this is what actually fixes the bug.
// process.env vars here (Sheet.best URLs etc.) are read on the server,
// never bundled into client JS, so they resolve correctly instead of
// evaluating to `undefined` in the browser like they did when
// SearchBar called searchAll() directly.
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") ?? "";

  const results = await searchAll(query, 8);

  return NextResponse.json({ results });
}