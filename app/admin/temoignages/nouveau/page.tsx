"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import AdminPageHeader from "@/components/admin/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const defaultForm = {
  quote: "",
  name: "",
  role: "",
};

export default function NewTestimonialPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(defaultForm);
  const hasChanges = JSON.stringify(form) !== JSON.stringify(defaultForm);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      toast.success("Témoignage créé");
      router.push("/admin/temoignages");
    } catch {
      toast.error("Erreur lors de la création");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <AdminPageHeader
        title="Nouveau témoignage"
        action={
          <Button type="submit" form="new-testimonial-form" disabled={saving || !hasChanges}>
            {saving ? "Création..." : "Créer le témoignage"}
          </Button>
        }
      />

      <form id="new-testimonial-form" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left — Quote */}
          <div className="rounded-xl border border-border p-6 flex flex-col gap-6">
            <div>
              <h2 className="font-semibold">Citation</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Le témoignage du client.
              </p>
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <Label htmlFor="quote">Texte</Label>
              <Textarea
                id="quote"
                value={form.quote}
                onChange={(e) =>
                  setForm({ ...form, quote: e.target.value })
                }
                className="flex-1 min-h-[120px] resize-none"
                required
              />
            </div>
          </div>

          {/* Right — Author */}
          <div className="rounded-xl border border-border p-6 space-y-6">
            <div>
              <h2 className="font-semibold">Auteur</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Identité de la personne citée.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Nom</Label>
              <Input
                id="name"
                type="text"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Rôle</Label>
              <Input
                id="role"
                type="text"
                value={form.role}
                onChange={(e) =>
                  setForm({ ...form, role: e.target.value })
                }
                placeholder="CEO, Company Name"
                required
              />
            </div>
          </div>
        </div>

      </form>
    </div>
  );
}
