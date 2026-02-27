"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, Eye, EyeOff, ArrowUpDown } from "lucide-react";
import { toast } from "sonner";
import type { ExpertiseCategoryData } from "@/types";

export default function ExpertisePage() {
  const [categories, setCategories] = useState<ExpertiseCategoryData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/expertise")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      });
  }, []);

  async function toggleVisibility(id: string, visible: boolean) {
    await fetch(`/api/expertise/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ visible: !visible }),
    });
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, visible: !visible } : c))
    );
    toast.success(visible ? "Catégorie masquée" : "Catégorie visible");
  }

  async function handleDelete(id: string) {
    if (!confirm("Supprimer cette catégorie ?")) return;
    await fetch(`/api/expertise/${id}`, { method: "DELETE" });
    setCategories((prev) => prev.filter((c) => c.id !== id));
    toast.success("Catégorie supprimée");
  }

  async function moveItem(index: number, direction: "up" | "down") {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= categories.length) return;
    const updated = [...categories];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    const reordered = updated.map((item, i) => ({ ...item, order: i }));
    setCategories(reordered);
    await fetch("/api/expertise/reorder", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: reordered.map((item) => ({ id: item.id, order: item.order })),
      }),
    });
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-20 rounded-lg bg-surface animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold font-heading text-foreground">
            Expertise
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {categories.length} catégorie{categories.length > 1 ? "s" : ""}
          </p>
        </div>
        <Link
          href="/admin/expertise/nouveau"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-background font-medium text-sm hover:bg-accent/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nouvelle catégorie
        </Link>
      </div>

      <div className="space-y-3">
        {categories.map((category, index) => (
          <div
            key={category.id}
            className="glass rounded-xl p-4 flex items-center gap-4"
          >
            <div className="flex flex-col gap-1">
              <button
                onClick={() => moveItem(index, "up")}
                disabled={index === 0}
                className="text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
              >
                <ArrowUpDown className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-foreground truncate">
                {category.category}
              </h3>
              <p className="text-xs text-muted-foreground truncate">
                {category.items.join(", ")}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() =>
                  toggleVisibility(category.id, category.visible)
                }
                className={`p-2 rounded-lg transition-colors ${
                  category.visible
                    ? "text-accent hover:bg-accent/10"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                {category.visible ? (
                  <Eye className="w-4 h-4" />
                ) : (
                  <EyeOff className="w-4 h-4" />
                )}
              </button>
              <Link
                href={`/admin/expertise/${category.id}`}
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <Pencil className="w-4 h-4" />
              </Link>
              <button
                onClick={() => handleDelete(category.id)}
                className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
