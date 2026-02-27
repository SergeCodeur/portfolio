"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, Trash2, Eye, EyeOff, ArrowUpDown } from "lucide-react";
import { toast } from "sonner";
import type { ProjectData } from "@/types";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    const res = await fetch("/api/projects");
    const data = await res.json();
    setProjects(data);
    setLoading(false);
  }

  async function toggleVisibility(id: string, visible: boolean) {
    await fetch(`/api/projects/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ visible: !visible }),
    });
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, visible: !visible } : p))
    );
    toast.success(visible ? "Projet masqué" : "Projet visible");
  }

  async function handleDelete(id: string) {
    if (!confirm("Supprimer ce projet ?")) return;
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    setProjects((prev) => prev.filter((p) => p.id !== id));
    toast.success("Projet supprimé");
  }

  async function moveItem(index: number, direction: "up" | "down") {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= projects.length) return;

    const updated = [...projects];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    const reordered = updated.map((item, i) => ({ ...item, order: i }));
    setProjects(reordered);

    await fetch("/api/projects/reorder", {
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
          <div
            key={i}
            className="h-20 rounded-lg bg-surface animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold font-heading text-foreground">
            Projets
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {projects.length} projet{projects.length > 1 ? "s" : ""}
          </p>
        </div>
        <Link
          href="/admin/projets/nouveau"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-background font-medium text-sm hover:bg-accent/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nouveau
        </Link>
      </div>

      <div className="space-y-3">
        {projects.map((project, index) => (
          <div
            key={project.id}
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

            {project.imagePath && (
              <div className="relative w-16 h-12 rounded-lg overflow-hidden border border-border shrink-0">
                <Image
                  src={project.imagePath}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-foreground truncate">
                {project.title}
              </h3>
              <p className="text-xs text-muted-foreground truncate">
                {project.description}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => toggleVisibility(project.id, project.visible)}
                className={`p-2 rounded-lg transition-colors ${
                  project.visible
                    ? "text-accent hover:bg-accent/10"
                    : "text-muted-foreground hover:bg-muted"
                }`}
                title={project.visible ? "Masquer" : "Afficher"}
              >
                {project.visible ? (
                  <Eye className="w-4 h-4" />
                ) : (
                  <EyeOff className="w-4 h-4" />
                )}
              </button>

              <Link
                href={`/admin/projets/${project.id}`}
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <Pencil className="w-4 h-4" />
              </Link>

              <button
                onClick={() => handleDelete(project.id)}
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
