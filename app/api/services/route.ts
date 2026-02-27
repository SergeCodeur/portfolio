import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const services = await prisma.service.findMany({
    orderBy: { order: "asc" },
  });
  return NextResponse.json(services);
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const count = await prisma.service.count();
    const service = await prisma.service.create({
      data: { ...data, order: data.order ?? count },
    });
    return NextResponse.json(service, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
