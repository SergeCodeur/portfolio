"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import IconPicker from "@/components/admin/icon-picker";
import AdminPageHeader from "@/components/admin/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

const defaultForm = {
  number: 1,
  icon: "Phone",
  title: "",
  duration: "",
  detail: "",
  description: "",
};

export default function NewProcessStepPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(defaultForm);
  const hasChanges = JSON.stringify(form) !== JSON.stringify(defaultForm);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/process-steps", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          detail: form.detail || null,
        }),
      });
      if (!res.ok) throw new Error();
      toast.success("Étape créée");
      router.push("/admin/processus");
    } catch {
      toast.error("Erreur lors de la création");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <AdminPageHeader
        title="Nouvelle étape"
        action={
          <Button type="submit" form="new-process-form" disabled={saving || !hasChanges}>
            {saving ? "Création..." : "Créer l'étape"}
          </Button>
        }
      />

      <div className="rounded-xl border border-border p-6">
        <div className="mb-6">
          <h2 className="font-semibold">Informations de l&apos;étape</h2>
          <p className="text-sm text-muted-foreground mt-1">Remplissez les détails de la nouvelle étape.</p>
        </div>
        <form id="new-process-form" onSubmit={handleSubmit} className="space-y-6">
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
                  placeholder="30 min"
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
                placeholder="Gratuit"
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
