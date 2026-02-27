import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  try {
    const { items } = await request.json();
    const updates = items.map(
      (item: { id: string; order: number }) =>
        prisma.expertiseCategory.update({
          where: { id: item.id },
          data: { order: item.order },
        })
    );
    await Promise.all(updates);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
