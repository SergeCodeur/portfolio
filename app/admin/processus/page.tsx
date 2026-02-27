"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, Eye, EyeOff, ArrowUpDown } from "lucide-react";
import { toast } from "sonner";
import { getIcon } from "@/lib/icons";
import type { ProcessStepData } from "@/types";

export default function ProcessPage() {
  const [steps, setSteps] = useState<ProcessStepData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/process-steps")
      .then((res) => res.json())
      .then((data) => {
        setSteps(data);
        setLoading(false);
      });
  }, []);

  async function toggleVisibility(id: string, visible: boolean) {
    await fetch(`/api/process-steps/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ visible: !visible }),
    });
    setSteps((prev) =>
      prev.map((s) => (s.id === id ? { ...s, visible: !visible } : s))
    );
    toast.success(visible ? "Étape masquée" : "Étape visible");
  }

  async function handleDelete(id: string) {
    if (!confirm("Supprimer cette étape ?")) return;
    await fetch(`/api/process-steps/${id}`, { method: "DELETE" });
    setSteps((prev) => prev.filter((s) => s.id !== id));
    toast.success("Étape supprimée");
  }

  async function moveItem(index: number, direction: "up" | "down") {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= steps.length) return;
    const updated = [...steps];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    const reordered = updated.map((item, i) => ({ ...item, order: i }));
    setSteps(reordered);
    await fetch("/api/process-steps/reorder", {
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
            Processus
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {steps.length} étape{steps.length > 1 ? "s" : ""}
          </p>
        </div>
        <Link
          href="/admin/processus/nouveau"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-background font-medium text-sm hover:bg-accent/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nouvelle étape
        </Link>
      </div>

      <div className="space-y-3">
        {steps.map((step, index) => {
          const Icon = getIcon(step.icon);
          return (
            <div
              key={step.id}
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

              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-accent" />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-foreground truncate">
                  {step.number}. {step.title}
                </h3>
                <p className="text-xs text-muted-foreground truncate">
                  {step.duration} {step.detail && `- ${step.detail}`}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => toggleVisibility(step.id, step.visible)}
                  className={`p-2 rounded-lg transition-colors ${
                    step.visible
                      ? "text-accent hover:bg-accent/10"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {step.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
                <Link
                  href={`/admin/processus/${step.id}`}
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  <Pencil className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => handleDelete(step.id)}
                  className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
