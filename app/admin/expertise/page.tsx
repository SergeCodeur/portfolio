"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PlusIcon, PencilSimpleIcon, TrashIcon } from "@phosphor-icons/react";
import { toast } from "sonner";
import type { ExpertiseCategoryData } from "@/types";
import AdminPageHeader from "@/components/admin/page-header";
import { SortableTable, SortableTableBody } from "@/components/admin/sortable-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

export default function ExpertisePage() {
  const [categories, setCategories] = useState<ExpertiseCategoryData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/expertise")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      });
  }, []);

  async function toggleVisibility(id: string, visible: boolean) {
    await fetch(`/api/expertise/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ visible: !visible }),
    });
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, visible: !visible } : c))
    );
    toast.success(visible ? "Catégorie masquée" : "Catégorie visible");
  }

  async function handleDelete(id: string) {
    await fetch(`/api/expertise/${id}`, { method: "DELETE" });
    setCategories((prev) => prev.filter((c) => c.id !== id));
    toast.success("Catégorie supprimée");
  }

  async function handleReorder(reordered: ExpertiseCategoryData[]) {
    setCategories(reordered);
    await fetch("/api/expertise/reorder", {
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
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-4 w-24 mt-2" />
          </div>
          <Skeleton className="h-9 w-40" />
        </div>
        <div className="rounded-xl border border-border overflow-hidden">
            <div className="divide-y divide-border">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4 px-4 py-3">
                  <Skeleton className="h-5 w-8" />
                  <Skeleton className="h-4 w-32" />
                  <div className="hidden md:flex gap-1">
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-6 w-20 rounded-full" />
                    <Skeleton className="h-6 w-14 rounded-full" />
                  </div>
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
        title="Expertise"
        description={`${categories.length} catégorie${categories.length > 1 ? "s" : ""}`}
        action={
          <Button asChild>
            <Link href="/admin/expertise/nouveau">
              <PlusIcon className="w-4 h-4" />
              Nouvelle catégorie
            </Link>
          </Button>
        }
      />

      <SortableTable items={categories} onReorder={handleReorder}>
        <div className="rounded-xl border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10" />
                <TableHead>Catégorie</TableHead>
                <TableHead className="hidden md:table-cell">Items</TableHead>
                <TableHead className="w-24">Visibilité</TableHead>
                <TableHead className="w-28 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <SortableTableBody items={categories}>
              {(category) => (
                <>
                  <TableCell className="font-medium">{category.category}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex flex-wrap gap-1 max-w-[300px]">
                      {category.items.slice(0, 5).map((item) => (
                        <Badge key={item} variant="secondary">
                          {item}
                        </Badge>
                      ))}
                      {category.items.length > 5 && (
                        <Badge variant="outline">
                          +{category.items.length - 5}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={category.visible}
                      onCheckedChange={() =>
                        toggleVisibility(category.id, category.visible)
                      }
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon-xs" asChild>
                        <Link href={`/admin/expertise/${category.id}`}>
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
                            <AlertDialogTitle>Supprimer cette catégorie ?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Cette action est irréversible. La catégorie sera définitivement supprimée.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                            <AlertDialogAction
                              variant="destructive"
                              onClick={() => handleDelete(category.id)}
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
