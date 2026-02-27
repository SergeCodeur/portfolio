"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, Eye, EyeOff, ArrowUpDown } from "lucide-react";
import { toast } from "sonner";
import { getIcon } from "@/lib/icons";
import type { ServiceData } from "@/types";

export default function ServicesPage() {
  const [services, setServices] = useState<ServiceData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/services")
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
        setLoading(false);
      });
  }, []);

  async function toggleVisibility(id: string, visible: boolean) {
    await fetch(`/api/services/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ visible: !visible }),
    });
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, visible: !visible } : s))
    );
    toast.success(visible ? "Service masqué" : "Service visible");
  }

  async function handleDelete(id: string) {
    if (!confirm("Supprimer ce service ?")) return;
    await fetch(`/api/services/${id}`, { method: "DELETE" });
    setServices((prev) => prev.filter((s) => s.id !== id));
    toast.success("Service supprimé");
  }

  async function moveItem(index: number, direction: "up" | "down") {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= services.length) return;
    const updated = [...services];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    const reordered = updated.map((item, i) => ({ ...item, order: i }));
    setServices(reordered);
    await fetch("/api/services/reorder", {
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
            Services
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {services.length} service{services.length > 1 ? "s" : ""}
          </p>
        </div>
        <Link
          href="/admin/services/nouveau"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-background font-medium text-sm hover:bg-accent/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nouveau
        </Link>
      </div>

      <div className="space-y-3">
        {services.map((service, index) => {
          const Icon = getIcon(service.icon);
          return (
            <div
              key={service.id}
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

              <div className={`w-10 h-10 rounded-lg ${service.color} flex items-center justify-center shrink-0`}>
                <Icon className="w-5 h-5 text-white" />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-foreground truncate">
                  {service.title}
                </h3>
                <p className="text-xs text-muted-foreground truncate">
                  {service.subtitle}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => toggleVisibility(service.id, service.visible)}
                  className={`p-2 rounded-lg transition-colors ${
                    service.visible
                      ? "text-accent hover:bg-accent/10"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {service.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
                <Link
                  href={`/admin/services/${service.id}`}
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  <Pencil className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => handleDelete(service.id)}
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
