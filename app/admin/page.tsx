export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import {
  FolderSimpleIcon,
  BriefcaseIcon,
  ChatCircleIcon,
  GitBranchIcon,
  CodeSimpleIcon,
  ArrowRightIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@phosphor-icons/react/dist/ssr";
import StatCard from "@/components/admin/stat-card";
import AnalyticsWidget from "@/components/admin/analytics-widget";
import AdminPageHeader from "@/components/admin/page-header";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function AdminDashboard() {
  const [
    projects,
    services,
    testimonials,
    processSteps,
    expertise,
    recentProjects,
    visibleProjects,
    visibleServices,
    visibleTestimonials,
  ] = await Promise.all([
    prisma.project.count(),
    prisma.service.count(),
    prisma.testimonial.count(),
    prisma.processStep.count(),
    prisma.expertiseCategory.count(),
    prisma.project.findMany({
      orderBy: { updatedAt: "desc" },
      take: 5,
      select: {
        id: true,
        title: true,
        imagePath: true,
        visible: true,
        updatedAt: true,
      },
    }),
    prisma.project.count({ where: { visible: true } }),
    prisma.service.count({ where: { visible: true } }),
    prisma.testimonial.count({ where: { visible: true } }),
  ]);

  const stats = [
    {
      title: "Projets",
      value: projects,
      icon: FolderSimpleIcon,
      href: "/admin/projets",
    },
    {
      title: "Services",
      value: services,
      icon: BriefcaseIcon,
      href: "/admin/services",
    },
    {
      title: "Témoignages",
      value: testimonials,
      icon: ChatCircleIcon,
      href: "/admin/temoignages",
    },
    {
      title: "Étapes processus",
      value: processSteps,
      icon: GitBranchIcon,
      href: "/admin/processus",
    },
    {
      title: "Catégories expertise",
      value: expertise,
      icon: CodeSimpleIcon,
      href: "/admin/expertise",
    },
  ];

  const quickActions = [
    {
      label: "Nouveau projet",
      description: "Ajouter un projet au portfolio",
      href: "/admin/projets/nouveau",
      icon: FolderSimpleIcon,
    },
    {
      label: "Nouveau service",
      description: "Créer une offre de service",
      href: "/admin/services/nouveau",
      icon: BriefcaseIcon,
    },
    {
      label: "Nouveau témoignage",
      description: "Ajouter un avis client",
      href: "/admin/temoignages/nouveau",
      icon: ChatCircleIcon,
    },
  ];

  function formatDate(date: Date) {
    return new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "short",
    }).format(date);
  }

  return (
    <div>
      <AdminPageHeader
        title="Tableau de bord"
        description="Vue d'ensemble de votre contenu"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <AnalyticsWidget />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
        {/* Recent projects */}
        <div className="lg:col-span-2 rounded-xl border border-border overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <h2 className="font-semibold text-sm">Derniers projets modifiés</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/projets" className="gap-1 text-muted-foreground">
                Voir tout
                <ArrowRightIcon className="w-3.5 h-3.5" />
              </Link>
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Image</TableHead>
                <TableHead>Titre</TableHead>
                <TableHead className="w-24">Statut</TableHead>
                <TableHead className="w-24 text-right">Modifié</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentProjects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>
                    <div className="relative w-10 h-7 rounded overflow-hidden border border-border">
                      <Image
                        src={project.imagePath}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`/admin/projets/${project.id}`}
                      className="font-medium hover:underline"
                    >
                      {project.title}
                    </Link>
                  </TableCell>
                  <TableCell>
                    {project.visible ? (
                      <span className="inline-flex items-center gap-1 text-xs text-emerald-400">
                        <EyeIcon className="w-3 h-3" />
                        Visible
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                        <EyeSlashIcon className="w-3 h-3" />
                        Masqué
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-right text-sm text-muted-foreground">
                    {formatDate(project.updatedAt)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Quick actions */}
          <div className="rounded-xl border border-border p-4">
            <h2 className="font-semibold text-sm mb-3">Accès rapides</h2>
            <div className="space-y-1.5">
              {quickActions.map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className="group flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-white/5"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent transition-colors group-hover:bg-accent/15">
                    <action.icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{action.label}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {action.description}
                    </p>
                  </div>
                  <ArrowRightIcon className="ml-auto h-3.5 w-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              ))}
            </div>
          </div>

          {/* Visibility overview */}
          <div className="rounded-xl border border-border p-4">
            <h2 className="font-semibold text-sm mb-3">Visibilité</h2>
            <div className="space-y-3">
              <VisibilityRow label="Projets" visible={visibleProjects} total={projects} />
              <VisibilityRow label="Services" visible={visibleServices} total={services} />
              <VisibilityRow label="Témoignages" visible={visibleTestimonials} total={testimonials} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function VisibilityRow({
  label,
  visible,
  total,
}: {
  label: string;
  visible: number;
  total: number;
}) {
  const pct = total > 0 ? Math.round((visible / total) * 100) : 0;
  return (
    <div>
      <div className="flex items-center justify-between text-sm mb-1.5">
        <span className="text-muted-foreground">{label}</span>
        <span>
          {visible}/{total}
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-white/5">
        <div
          className="h-full rounded-full bg-accent transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
