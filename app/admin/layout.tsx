"use client";

import AppSidebar from "@/components/admin/sidebar";
import AdminHeader from "@/components/admin/header";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AdminHeader />
        <div className="flex-1 p-4 lg:p-6 overflow-auto">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
