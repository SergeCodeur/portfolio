"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ArrayInput from "@/components/admin/array-input";
import AdminPageHeader from "@/components/admin/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function EditExpertisePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    category: "",
    description: "",
    items: [] as string[],
  });
  const [initialForm, setInitialForm] = useState<typeof form | null>(null);
  const hasChanges = initialForm !== null && JSON.stringify(form) !== JSON.stringify(initialForm);

  useEffect(() => {
    fetch(`/api/expertise/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const loaded = {
          category: data.category,
          description: data.description,
          items: data.items,
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
      const res = await fetch(`/api/expertise/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      toast.success("Catégorie mise à jour");
      router.push("/admin/expertise");
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
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <AdminPageHeader
        title="Modifier la catégorie"
        action={
          <Button type="submit" form="edit-expertise-form" disabled={saving || !hasChanges}>
            {saving ? "Sauvegarde..." : "Sauvegarder"}
          </Button>
        }
      />

      <div className="rounded-xl border border-border p-6">
        <div className="mb-6">
          <h2 className="font-semibold">Informations de la catégorie</h2>
          <p className="text-sm text-muted-foreground mt-1">Modifiez les détails de la catégorie.</p>
        </div>
        <form id="edit-expertise-form" onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="category">Catégorie</Label>
              <Input
                id="category"
                type="text"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                type="text"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                required
              />
            </div>

            <Separator />

            <div className="space-y-2">
              <Label>Technologies / Outils</Label>
              <ArrayInput
                value={form.items}
                onChange={(items) => setForm({ ...form, items })}
                placeholder="Ajouter une technologie..."
              />
            </div>

          </form>
      </div>
    </div>
  );
}
