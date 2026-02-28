"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PlusIcon, PencilSimpleIcon, TrashIcon } from "@phosphor-icons/react";
import { toast } from "sonner";
import type { ProjectData } from "@/types";
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

export default function ProjectsPage() {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    const res = await fetch("/api/projects");
    const data = await res.json();
    setProjects(data);
    setLoading(false);
  }

  async function toggleVisibility(id: string, visible: boolean) {
    await fetch(`/api/projects/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ visible: !visible }),
    });
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, visible: !visible } : p))
    );
    toast.success(visible ? "Projet masqué" : "Projet visible");
  }

  async function handleDelete(id: string) {
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    setProjects((prev) => prev.filter((p) => p.id !== id));
    toast.success("Projet supprimé");
  }

  async function handleReorder(reordered: ProjectData[]) {
    setProjects(reordered);
    await fetch("/api/projects/reorder", {
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
                  <Skeleton className="h-10 w-14 rounded-md" />
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-4 w-60 hidden md:block" />
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
        title="Projets"
        description={`${projects.length} projet${projects.length > 1 ? "s" : ""}`}
        action={
          <Button asChild>
            <Link href="/admin/projets/nouveau">
              <PlusIcon className="w-4 h-4" />
              Nouveau
            </Link>
          </Button>
        }
      />

      <SortableTable items={projects} onReorder={handleReorder}>
        <div className="rounded-xl border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10" />
                <TableHead className="w-20">Image</TableHead>
                <TableHead>Titre</TableHead>
                <TableHead className="hidden md:table-cell">Description</TableHead>
                <TableHead className="w-24">Visibilité</TableHead>
                <TableHead className="w-28 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <SortableTableBody items={projects}>
              {(project) => (
                <>
                  <TableCell>
                    {project.imagePath && (
                      <div className="relative w-14 h-10 rounded-md overflow-hidden border border-border">
                        <Image
                          src={project.imagePath}
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{project.title}</TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground max-w-[200px] truncate">
                    {project.description}
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={project.visible}
                      onCheckedChange={() =>
                        toggleVisibility(project.id, project.visible)
                      }
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon-xs" asChild>
                        <Link href={`/admin/projets/${project.id}`}>
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
                            <AlertDialogTitle>Supprimer ce projet ?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Cette action est irréversible. Le projet sera définitivement supprimé.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                            <AlertDialogAction
                              variant="destructive"
                              onClick={() => handleDelete(project.id)}
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
