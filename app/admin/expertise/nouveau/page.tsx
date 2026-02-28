"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ArrayInput from "@/components/admin/array-input";
import AdminPageHeader from "@/components/admin/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const defaultForm = {
  category: "",
  description: "",
  items: [] as string[],
};

export default function NewExpertisePage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(defaultForm);
  const hasChanges = JSON.stringify(form) !== JSON.stringify(defaultForm);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/expertise", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      toast.success("Catégorie créée");
      router.push("/admin/expertise");
    } catch {
      toast.error("Erreur lors de la création");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <AdminPageHeader
        title="Nouvelle catégorie d'expertise"
        action={
          <Button type="submit" form="new-expertise-form" disabled={saving || !hasChanges}>
            {saving ? "Création..." : "Créer la catégorie"}
          </Button>
        }
      />

      <div className="rounded-xl border border-border p-6">
        <div className="mb-6">
          <h2 className="font-semibold">Informations de la catégorie</h2>
          <p className="text-sm text-muted-foreground mt-1">Remplissez les détails de la nouvelle catégorie.</p>
        </div>
        <form id="new-expertise-form" onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="category">Catégorie</Label>
              <Input
                id="category"
                type="text"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                placeholder="Frontend"
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
