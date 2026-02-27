export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import {
  FolderKanban,
  Briefcase,
  MessageSquare,
  GitBranch,
  Code2,
} from "lucide-react";
import StatCard from "@/components/admin/stat-card";

export default async function AdminDashboard() {
  const [projects, services, testimonials, processSteps, expertise] =
    await Promise.all([
      prisma.project.count(),
      prisma.service.count(),
      prisma.testimonial.count(),
      prisma.processStep.count(),
      prisma.expertiseCategory.count(),
    ]);

  const stats = [
    {
      title: "Projets",
      value: projects,
      icon: FolderKanban,
      href: "/admin/projets",
    },
    {
      title: "Services",
      value: services,
      icon: Briefcase,
      href: "/admin/services",
    },
    {
      title: "Témoignages",
      value: testimonials,
      icon: MessageSquare,
      href: "/admin/temoignages",
    },
    {
      title: "Étapes processus",
      value: processSteps,
      icon: GitBranch,
      href: "/admin/processus",
    },
    {
      title: "Catégories expertise",
      value: expertise,
      icon: Code2,
      href: "/admin/expertise",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-heading text-foreground">
          Tableau de bord
        </h1>
        <p className="text-muted-foreground mt-1">
          Vue d&apos;ensemble de votre contenu
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>
    </div>
  );
}
