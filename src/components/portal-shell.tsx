import type { ReactNode } from "react";

import { AppSidebar, type PortalRole } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export function PortalShell({
  role,
  title,
  description,
  actions,
  children,
}: {
  role: PortalRole;
  title: string;
  description?: string | undefined;
  actions?: ReactNode | undefined;
  children: ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar role={role} variant="inset" />
      <SidebarInset>
        <SiteHeader title={title} description={description} actions={actions} />
        <div className="@container/main flex flex-1 flex-col gap-6 py-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
