"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ImageUpload from "@/components/admin/image-upload";
import ColorPicker from "@/components/admin/color-picker";
import AdminPageHeader from "@/components/admin/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";

export default function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: "",
    description: "",
    imagePath: "",
    link: "",
    color: "#050816",
    textColor: "#FFFFFF",
  });
  const [initialForm, setInitialForm] = useState<typeof form | null>(null);

  const hasChanges = initialForm !== null && JSON.stringify(form) !== JSON.stringify(initialForm);

  useEffect(() => {
    fetch(`/api/projects/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const loaded = {
          title: data.title,
          description: data.description,
          imagePath: data.imagePath,
          link: data.link,
          color: data.color,
          textColor: data.textColor,
        };
        setForm(loaded);
        setInitialForm(loaded);
        setLoading(false);
      });
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error();

      toast.success("Projet mis à jour");
      router.push("/admin/projets");
    } catch {
      toast.error("Erreur lors de la mise à jour");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="rounded-xl border border-border p-6 space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <AdminPageHeader
        title="Modifier le projet"
        action={
          <Button type="submit" form="edit-project-form" disabled={saving || !hasChanges}>
            {saving ? "Sauvegarde..." : "Sauvegarder"}
          </Button>
        }
      />

      <form id="edit-project-form" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left column — Text info */}
          <div className="rounded-xl border border-border p-6 flex flex-col gap-6">
            <div>
              <h2 className="font-semibold">Informations</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Titre, description et lien du projet.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Titre</Label>
              <Input
                id="title"
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="flex-1 min-h-[120px] resize-none"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="link">Lien du projet</Label>
              <Input
                id="link"
                type="url"
                value={form.link}
                onChange={(e) => setForm({ ...form, link: e.target.value })}
                placeholder="https://..."
                required
              />
            </div>
          </div>

          {/* Right column — Media & colors */}
          <div className="space-y-6">
            <div className="rounded-xl border border-border p-6 space-y-6">
              <div>
                <h2 className="font-semibold">Image</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Capture d&apos;écran ou visuel du projet.
                </p>
              </div>
              <ImageUpload
                value={form.imagePath}
                onChange={(imagePath) => setForm({ ...form, imagePath })}
              />
            </div>

            <div className="rounded-xl border border-border p-6 space-y-6">
              <div>
                <h2 className="font-semibold">Apparence</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Couleurs de la carte projet.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <ColorPicker
                  label="Couleur de fond"
                  value={form.color}
                  onChange={(color) => setForm({ ...form, color })}
                />
                <ColorPicker
                  label="Couleur du texte"
                  value={form.textColor}
                  onChange={(textColor) => setForm({ ...form, textColor })}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
