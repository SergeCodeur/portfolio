"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PlusIcon, PencilSimpleIcon, TrashIcon } from "@phosphor-icons/react";
import { toast } from "sonner";
import { getIcon } from "@/lib/icons";
import type { ServiceData } from "@/types";
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

export default function ServicesPage() {
  const [services, setServices] = useState<ServiceData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/services")
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
        setLoading(false);
      });
  }, []);

  async function toggleVisibility(id: string, visible: boolean) {
    await fetch(`/api/services/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ visible: !visible }),
    });
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, visible: !visible } : s))
    );
    toast.success(visible ? "Service masqué" : "Service visible");
  }

  async function handleDelete(id: string) {
    await fetch(`/api/services/${id}`, { method: "DELETE" });
    setServices((prev) => prev.filter((s) => s.id !== id));
    toast.success("Service supprimé");
  }

  async function handleReorder(reordered: ServiceData[]) {
    setServices(reordered);
    await fetch("/api/services/reorder", {
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
            <Skeleton className="h-4 w-20 mt-2" />
          </div>
          <Skeleton className="h-9 w-28" />
        </div>
        <div className="rounded-xl border border-border overflow-hidden">
            <div className="divide-y divide-border">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4 px-4 py-3">
                  <Skeleton className="h-5 w-8" />
                  <Skeleton className="h-8 w-8 rounded-md" />
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
        title="Services"
        description={`${services.length} service${services.length > 1 ? "s" : ""}`}
        action={
          <Button asChild>
            <Link href="/admin/services/nouveau">
              <PlusIcon className="w-4 h-4" />
              Nouveau
            </Link>
          </Button>
        }
      />

      <SortableTable items={services} onReorder={handleReorder}>
        <div className="rounded-xl border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10" />
                <TableHead className="w-14">Icône</TableHead>
                <TableHead>Titre</TableHead>
                <TableHead className="hidden md:table-cell">Sous-titre</TableHead>
                <TableHead className="w-24">Visibilité</TableHead>
                <TableHead className="w-28 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <SortableTableBody items={services}>
              {(service) => {
                const Icon = getIcon(service.icon);
                return (
                  <>
                    <TableCell>
                      <div className={`w-8 h-8 rounded-md ${service.color} flex items-center justify-center`}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{service.title}</TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground">
                      {service.subtitle}
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={service.visible}
                        onCheckedChange={() =>
                          toggleVisibility(service.id, service.visible)
                        }
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon-xs" asChild>
                          <Link href={`/admin/services/${service.id}`}>
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
                              <AlertDialogTitle>Supprimer ce service ?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Cette action est irréversible. Le service sera définitivement supprimé.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Annuler</AlertDialogCancel>
                              <AlertDialogAction
                                variant="destructive"
                                onClick={() => handleDelete(service.id)}
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
