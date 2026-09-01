import { NextResponse } from "next/server";
import { searchArtimist } from "../../../lib/artimist-search-runtime";

export const dynamic = "force-dynamic";

function response(query: string) {
  return NextResponse.json(searchArtimist(query), {
    headers: {
      "Cache-Control": "no-store, max-age=0",
      "X-Robots-Tag": "noindex",
    },
  });
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  return response(url.searchParams.get("q") || "");
}

export async function POST(request: Request) {
  let body: { query?: unknown } = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (typeof body.query !== "string") {
    return NextResponse.json({ error: "A text query is required." }, { status: 400 });
  }

  return response(body.query);
}
