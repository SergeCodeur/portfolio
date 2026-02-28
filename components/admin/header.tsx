"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const segmentLabels: Record<string, string> = {
  admin: "Dashboard",
  projets: "Projets",
  services: "Services",
  temoignages: "Témoignages",
  processus: "Processus",
  expertise: "Expertise",
  parametres: "Paramètres",
  nouveau: "Nouveau",
};

export default function AdminHeader() {
  const pathname = usePathname();

  // Build breadcrumb from pathname — skip "admin" prefix
  const segments = pathname.split("/").filter(Boolean);
  // segments: ["admin"] or ["admin", "projets"] or ["admin", "projets", "nouveau"] or ["admin", "projets", "cm..."]

  const crumbs: { label: string; href: string }[] = [];

  if (segments.length <= 1) {
    // /admin -> just "Dashboard"
    crumbs.push({ label: "Dashboard", href: "/admin" });
  } else {
    // Skip "admin", build from the rest
    for (let i = 1; i < segments.length; i++) {
      const segment = segments[i];
      const href = "/" + segments.slice(0, i + 1).join("/");

      if (segmentLabels[segment]) {
        crumbs.push({ label: segmentLabels[segment], href });
      } else {
        // Dynamic segment like [id] -> "Modifier"
        crumbs.push({ label: "Modifier", href });
      }
    }
  }

  return (
    <header className="flex h-14 shrink-0 items-center border-b px-4 sticky top-0 z-30 bg-background/80 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4!" />

        <Breadcrumb>
          <BreadcrumbList>
            {crumbs.map((crumb, i) => {
              const isLast = i === crumbs.length - 1;
              return (
                <React.Fragment key={crumb.href}>
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link href={crumb.href}>{crumb.label}</Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {!isLast && <BreadcrumbSeparator />}
                </React.Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
}
