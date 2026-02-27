import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: { order: "asc" },
  });
  return NextResponse.json(testimonials);
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const count = await prisma.testimonial.count();
    const testimonial = await prisma.testimonial.create({
      data: { ...data, order: data.order ?? count },
    });
    return NextResponse.json(testimonial, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
