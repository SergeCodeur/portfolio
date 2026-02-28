"use client";

import { useState } from "react";
import { toast } from "sonner";
import AdminPageHeader from "@/components/admin/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const defaultForm = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export default function SettingsPage() {
  const [form, setForm] = useState(defaultForm);
  const [saving, setSaving] = useState(false);
  const hasChanges = JSON.stringify(form) !== JSON.stringify(defaultForm);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas");
      return;
    }

    if (form.newPassword.length < 6) {
      toast.error("Le mot de passe doit contenir au moins 6 caractères");
      return;
    }

    setSaving(true);

    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Erreur");
        return;
      }

      toast.success("Mot de passe modifié");
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch {
      toast.error("Erreur de connexion");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <AdminPageHeader
        title="Paramètres"
        action={
          <Button type="submit" form="settings-form" disabled={saving || !hasChanges}>
            {saving ? "Modification..." : "Modifier le mot de passe"}
          </Button>
        }
      />

      <div className="rounded-xl border border-border p-6">
        <div className="mb-6">
          <h2 className="font-semibold">Changer le mot de passe</h2>
          <p className="text-sm text-muted-foreground mt-1">Mettez à jour votre mot de passe de connexion.</p>
        </div>
        <form id="settings-form" onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Mot de passe actuel</Label>
              <Input
                id="currentPassword"
                type="password"
                value={form.currentPassword}
                onChange={(e) =>
                  setForm({ ...form, currentPassword: e.target.value })
                }
                required
              />
            </div>

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="newPassword">Nouveau mot de passe</Label>
              <Input
                id="newPassword"
                type="password"
                value={form.newPassword}
                onChange={(e) =>
                  setForm({ ...form, newPassword: e.target.value })
                }
                required
                minLength={6}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmer le nouveau mot de passe</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={(e) =>
                  setForm({ ...form, confirmPassword: e.target.value })
                }
                required
                minLength={6}
              />
            </div>

          </form>
      </div>
    </div>
  );
}
