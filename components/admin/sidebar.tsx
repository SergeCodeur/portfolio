"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  SquaresFourIcon,
  FolderSimpleIcon,
  BriefcaseIcon,
  ChatCircleIcon,
  GitBranchIcon,
  CodeSimpleIcon,
  GearSixIcon,
  ArrowSquareOutIcon,
  SignOutIcon,
} from "@phosphor-icons/react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: SquaresFourIcon },
  { label: "Projets", href: "/admin/projets", icon: FolderSimpleIcon },
  { label: "Services", href: "/admin/services", icon: BriefcaseIcon },
  { label: "Témoignages", href: "/admin/temoignages", icon: ChatCircleIcon },
  { label: "Processus", href: "/admin/processus", icon: GitBranchIcon },
  { label: "Expertise", href: "/admin/expertise", icon: CodeSimpleIcon },
];

export default function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  }

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/admin">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-accent">
                  <span className="text-background font-bold text-sm">P</span>
                </div>
                <span className="font-heading font-bold">Portfolio CMS</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.href)}
                    tooltip={item.label}
                  >
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Système</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive("/admin/parametres")}
                  tooltip="Paramètres"
                >
                  <Link href="/admin/parametres">
                    <GearSixIcon />
                    <span>Paramètres</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarSeparator />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Voir le site">
              <Link href="/" target="_blank">
                <ArrowSquareOutIcon />
                <span>Voir le site</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Déconnexion"
              onClick={handleLogout}
              className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            >
              <SignOutIcon />
              <span>Déconnexion</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
