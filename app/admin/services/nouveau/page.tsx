"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import IconPicker from "@/components/admin/icon-picker";
import ColorPicker from "@/components/admin/color-picker";
import ArrayInput from "@/components/admin/array-input";
import AdminPageHeader from "@/components/admin/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const defaultForm = {
  title: "",
  subtitle: "",
  description: "",
  deliverables: "",
  icon: "Code",
  color: "bg-blue-500",
  examples: [] as string[],
};

export default function NewServicePage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(defaultForm);
  const hasChanges = JSON.stringify(form) !== JSON.stringify(defaultForm);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      toast.success("Service créé");
      router.push("/admin/services");
    } catch {
      toast.error("Erreur lors de la création");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <AdminPageHeader
        title="Nouveau service"
        action={
          <Button type="submit" form="new-service-form" disabled={saving || !hasChanges}>
            {saving ? "Création..." : "Créer le service"}
          </Button>
        }
      />

      <form id="new-service-form" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left column — Text info */}
          <div className="rounded-xl border border-border p-6 flex flex-col gap-6">
            <div>
              <h2 className="font-semibold">Informations</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Titre, description et livrables du service.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Titre</Label>
                <Input
                  id="title"
                  type="text"
                  value={form.title}
                  onChange={(e) =>
                    setForm({ ...form, title: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subtitle">Sous-titre</Label>
                <Input
                  id="subtitle"
                  type="text"
                  value={form.subtitle}
                  onChange={(e) =>
                    setForm({ ...form, subtitle: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="flex-1 flex flex-col gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="flex-1 min-h-[100px] resize-none"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="deliverables">Livrables</Label>
              <Input
                id="deliverables"
                type="text"
                value={form.deliverables}
                onChange={(e) =>
                  setForm({ ...form, deliverables: e.target.value })
                }
                placeholder="Design • Dev • Déploiement"
                required
              />
            </div>
          </div>

          {/* Right column — Appearance & examples */}
          <div className="space-y-6">
            <div className="rounded-xl border border-border p-6 space-y-6">
              <div>
                <h2 className="font-semibold">Apparence</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Icône et couleur du service.
                </p>
              </div>

              <div className="space-y-2">
                <Label>Icône</Label>
                <IconPicker
                  value={form.icon}
                  onChange={(icon) => setForm({ ...form, icon })}
                />
              </div>

              <ColorPicker
                label="Couleur (classe Tailwind)"
                value={form.color}
                onChange={(color) => setForm({ ...form, color })}
              />
            </div>

            <div className="rounded-xl border border-border p-6 space-y-6">
              <div>
                <h2 className="font-semibold">Exemples</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Cas d&apos;usage du service.
                </p>
              </div>
              <ArrayInput
                value={form.examples}
                onChange={(examples) => setForm({ ...form, examples })}
                placeholder="Ajouter un exemple..."
              />
            </div>
          </div>
        </div>

      </form>
    </div>
  );
}
