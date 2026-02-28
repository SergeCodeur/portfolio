"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import IconPicker from "@/components/admin/icon-picker";
import AdminPageHeader from "@/components/admin/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function EditProcessStepPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    number: 1,
    icon: "Phone",
    title: "",
    duration: "",
    detail: "",
    description: "",
  });
  const [initialForm, setInitialForm] = useState<typeof form | null>(null);
  const hasChanges = initialForm !== null && JSON.stringify(form) !== JSON.stringify(initialForm);

  useEffect(() => {
    fetch(`/api/process-steps/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const loaded = {
          number: data.number,
          icon: data.icon,
          title: data.title,
          duration: data.duration,
          detail: data.detail || "",
          description: data.description,
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
      const res = await fetch(`/api/process-steps/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          detail: form.detail || null,
        }),
      });
      if (!res.ok) throw new Error();
      toast.success("Étape mise à jour");
      router.push("/admin/processus");
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
        title="Modifier l'étape"
        action={
          <Button type="submit" form="edit-process-form" disabled={saving || !hasChanges}>
            {saving ? "Sauvegarde..." : "Sauvegarder"}
          </Button>
        }
      />

      <div className="rounded-xl border border-border p-6">
        <div className="mb-6">
          <h2 className="font-semibold">Informations de l&apos;étape</h2>
          <p className="text-sm text-muted-foreground mt-1">Modifiez les détails de l&apos;étape.</p>
        </div>
        <form id="edit-process-form" onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="number">Numéro</Label>
                <Input
                  id="number"
                  type="number"
                  value={form.number}
                  onChange={(e) =>
                    setForm({ ...form, number: parseInt(e.target.value) || 1 })
                  }
                  min={1}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Durée</Label>
                <Input
                  id="duration"
                  type="text"
                  value={form.duration}
                  onChange={(e) => setForm({ ...form, duration: e.target.value })}
                  required
                />
              </div>
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

            <div className="space-y-2">
              <Label htmlFor="detail">Détail (optionnel)</Label>
              <Input
                id="detail"
                type="text"
                value={form.detail}
                onChange={(e) => setForm({ ...form, detail: e.target.value })}
              />
            </div>

            <Separator />

            <div className="space-y-2">
              <Label>Icône</Label>
              <IconPicker
                value={form.icon}
                onChange={(icon) => setForm({ ...form, icon })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={4}
                required
              />
            </div>

          </form>
      </div>
    </div>
  );
}
