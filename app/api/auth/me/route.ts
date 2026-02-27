import { getAuthCookie, verifyToken } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const token = await getAuthCookie();
  if (!token) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  const payload = await verifyToken(token);
  if (!payload) {
    return NextResponse.json({ error: "Token invalide" }, { status: 401 });
  }

  return NextResponse.json({ email: payload.email, userId: payload.userId });
}
