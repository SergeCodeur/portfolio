"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PlusIcon, PencilSimpleIcon, TrashIcon } from "@phosphor-icons/react";
import { toast } from "sonner";
import type { TestimonialData } from "@/types";
import AdminPageHeader from "@/components/admin/page-header";
import { SortableTable, SortableTableBody } from "@/components/admin/sortable-table";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<TestimonialData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/testimonials")
      .then((res) => res.json())
      .then((data) => {
        setTestimonials(data);
        setLoading(false);
      });
  }, []);

  async function toggleVisibility(id: string, visible: boolean) {
    await fetch(`/api/testimonials/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ visible: !visible }),
    });
    setTestimonials((prev) =>
      prev.map((t) => (t.id === id ? { ...t, visible: !visible } : t))
    );
    toast.success(visible ? "Témoignage masqué" : "Témoignage visible");
  }

  async function handleDelete(id: string) {
    await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
    toast.success("Témoignage supprimé");
  }

  async function handleReorder(reordered: TestimonialData[]) {
    setTestimonials(reordered);
    await fetch("/api/testimonials/reorder", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: reordered.map((item) => ({ id: item.id, order: item.order })),
      }),
    });
  }

  if (loading) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-4 w-24 mt-2" />
          </div>
          <Skeleton className="h-9 w-28" />
        </div>
        <div className="rounded-xl border border-border overflow-hidden">
            <div className="divide-y divide-border">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4 px-4 py-3">
                  <Skeleton className="h-5 w-8" />
                  <Skeleton className="h-4 w-36" />
                  <Skeleton className="h-4 w-48 hidden md:block" />
                  <Skeleton className="h-5 w-10 ml-auto" />
                  <Skeleton className="h-8 w-16" />
                </div>
              ))}
            </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <AdminPageHeader
        title="Témoignages"
        description={`${testimonials.length} témoignage${testimonials.length > 1 ? "s" : ""}`}
        action={
          <Button asChild>
            <Link href="/admin/temoignages/nouveau">
              <PlusIcon className="w-4 h-4" />
              Nouveau
            </Link>
          </Button>
        }
      />

      <SortableTable items={testimonials} onReorder={handleReorder}>
        <div className="rounded-xl border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10" />
                <TableHead>Nom</TableHead>
                <TableHead className="hidden md:table-cell">Rôle</TableHead>
                <TableHead className="w-24">Visibilité</TableHead>
                <TableHead className="w-28 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <SortableTableBody items={testimonials}>
              {(testimonial) => (
                <>
                  <TableCell className="font-medium">{testimonial.name}</TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground">
                    {testimonial.role}
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={testimonial.visible}
                      onCheckedChange={() =>
                        toggleVisibility(testimonial.id, testimonial.visible)
                      }
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon-xs" asChild>
                        <Link href={`/admin/temoignages/${testimonial.id}`}>
                          <PencilSimpleIcon className="w-4 h-4" />
                        </Link>
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon-xs" className="text-muted-foreground hover:text-destructive">
                            <TrashIcon className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Supprimer ce témoignage ?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Cette action est irréversible. Le témoignage sera définitivement supprimé.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                            <AlertDialogAction
                              variant="destructive"
                              onClick={() => handleDelete(testimonial.id)}
                            >
                              Supprimer
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </>
              )}
            </SortableTableBody>
          </Table>
        </div>
      </SortableTable>
    </div>
  );
}
