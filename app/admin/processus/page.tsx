"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PlusIcon, PencilSimpleIcon, TrashIcon } from "@phosphor-icons/react";
import { toast } from "sonner";
import { getIcon } from "@/lib/icons";
import type { ProcessStepData } from "@/types";
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

export default function ProcessPage() {
  const [steps, setSteps] = useState<ProcessStepData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/process-steps")
      .then((res) => res.json())
      .then((data) => {
        setSteps(data);
        setLoading(false);
      });
  }, []);

  async function toggleVisibility(id: string, visible: boolean) {
    await fetch(`/api/process-steps/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ visible: !visible }),
    });
    setSteps((prev) =>
      prev.map((s) => (s.id === id ? { ...s, visible: !visible } : s))
    );
    toast.success(visible ? "Étape masquée" : "Étape visible");
  }

  async function handleDelete(id: string) {
    await fetch(`/api/process-steps/${id}`, { method: "DELETE" });
    setSteps((prev) => prev.filter((s) => s.id !== id));
    toast.success("Étape supprimée");
  }

  async function handleReorder(reordered: ProcessStepData[]) {
    setSteps(reordered);
    await fetch("/api/process-steps/reorder", {
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
            <Skeleton className="h-8 w-36" />
            <Skeleton className="h-4 w-20 mt-2" />
          </div>
          <Skeleton className="h-9 w-36" />
        </div>
        <div className="rounded-xl border border-border overflow-hidden">
            <div className="divide-y divide-border">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4 px-4 py-3">
                  <Skeleton className="h-5 w-8" />
                  <Skeleton className="h-7 w-7 rounded-full" />
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-4 w-24 hidden md:block" />
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
        title="Processus"
        description={`${steps.length} étape${steps.length > 1 ? "s" : ""}`}
        action={
          <Button asChild>
            <Link href="/admin/processus/nouveau">
              <PlusIcon className="w-4 h-4" />
              Nouvelle étape
            </Link>
          </Button>
        }
      />

      <SortableTable items={steps} onReorder={handleReorder}>
        <div className="rounded-xl border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10" />
                <TableHead className="w-12">#</TableHead>
                <TableHead>Titre</TableHead>
                <TableHead className="hidden md:table-cell">Durée</TableHead>
                <TableHead className="w-24">Visibilité</TableHead>
                <TableHead className="w-28 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <SortableTableBody items={steps}>
              {(step) => {
                const Icon = getIcon(step.icon);
                return (
                  <>
                    <TableCell>
                      <div className="w-7 h-7 rounded-full bg-accent/10 flex items-center justify-center">
                        <span className="text-xs font-bold text-accent">{step.number}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{step.title}</TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground">
                      {step.duration}
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={step.visible}
                        onCheckedChange={() =>
                          toggleVisibility(step.id, step.visible)
                        }
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon-xs" asChild>
                          <Link href={`/admin/processus/${step.id}`}>
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
                              <AlertDialogTitle>Supprimer cette étape ?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Cette action est irréversible. L&apos;étape sera définitivement supprimée.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Annuler</AlertDialogCancel>
                              <AlertDialogAction
                                variant="destructive"
                                onClick={() => handleDelete(step.id)}
                              >
                                Supprimer
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </>
                );
              }}
            </SortableTableBody>
          </Table>
        </div>
      </SortableTable>
    </div>
  );
}
