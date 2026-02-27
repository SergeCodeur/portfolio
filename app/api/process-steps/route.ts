import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const steps = await prisma.processStep.findMany({
    orderBy: { order: "asc" },
  });
  return NextResponse.json(steps);
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const count = await prisma.processStep.count();
    const step = await prisma.processStep.create({
      data: { ...data, order: data.order ?? count },
    });
    return NextResponse.json(step, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
