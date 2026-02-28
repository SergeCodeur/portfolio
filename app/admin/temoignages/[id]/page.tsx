"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import AdminPageHeader from "@/components/admin/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";

export default function EditTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    quote: "",
    name: "",
    role: "",
  });
  const [initialForm, setInitialForm] = useState<typeof form | null>(null);
  const hasChanges = initialForm !== null && JSON.stringify(form) !== JSON.stringify(initialForm);

  useEffect(() => {
    fetch(`/api/testimonials/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const loaded = { quote: data.quote, name: data.name, role: data.role };
        setForm(loaded);
        setInitialForm(loaded);
        setLoading(false);
      });
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`/api/testimonials/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      toast.success("Témoignage mis à jour");
      router.push("/admin/temoignages");
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
        title="Modifier le témoignage"
        action={
          <Button type="submit" form="edit-testimonial-form" disabled={saving || !hasChanges}>
            {saving ? "Sauvegarde..." : "Sauvegarder"}
          </Button>
        }
      />

      <form id="edit-testimonial-form" onSubmit={handleSubmit}>
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
                onChange={(e) => setForm({ ...form, quote: e.target.value })}
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
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Rôle</Label>
              <Input
                id="role"
                type="text"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
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
