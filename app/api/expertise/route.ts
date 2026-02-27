import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const categories = await prisma.expertiseCategory.findMany({
    orderBy: { order: "asc" },
  });
  return NextResponse.json(categories);
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const count = await prisma.expertiseCategory.count();
    const category = await prisma.expertiseCategory.create({
      data: { ...data, order: data.order ?? count },
    });
    return NextResponse.json(category, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
