import * as React from "react";
import { Link } from "@tanstack/react-router";
import {
  BuildingIcon,
  CircleHelpIcon,
  LayoutDashboardIcon,
  LayersIcon,
  MapPinnedIcon,
  ReceiptIndianRupeeIcon,
  SettingsIcon,
  ShieldCheckIcon,
  StoreIcon,
  TagsIcon,
  UserRoundIcon,
} from "lucide-react";

import { NavMain, type NavItem } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export type PortalRole = "merchant" | "admin";

const merchantNav: NavItem[] = [
  { title: "Dashboard", url: "/merchant", icon: LayoutDashboardIcon },
  { title: "Business profile", url: "/merchant/profile", icon: BuildingIcon },
  { title: "Stores", url: "/merchant/stores", icon: StoreIcon, badge: "4" },
  { title: "Offers", url: "/merchant/offers", icon: TagsIcon, badge: "4" },
  { title: "Transactions", url: "/merchant/transactions", icon: ReceiptIndianRupeeIcon },
];

const adminNav: NavItem[] = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboardIcon },
  { title: "Merchants", url: "/admin/merchants", icon: UserRoundIcon, badge: "2" },
  { title: "Stores", url: "/admin/stores", icon: MapPinnedIcon, badge: "2" },
  { title: "Offers", url: "/admin/offers", icon: TagsIcon, badge: "3" },
  { title: "Categories", url: "/admin/categories", icon: LayersIcon },
  { title: "Transactions", url: "/admin/transactions", icon: ReceiptIndianRupeeIcon },
];

const users = {
  merchant: { name: "Rohan Mehta", email: "rohan@abcfitness.in", avatar: "" },
  admin: { name: "Platform Admin", email: "admin@districtly.in", avatar: "" },
};

export function AppSidebar({
  role,
  ...props
}: { role: PortalRole } & React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <Link to="/">
                <ShieldCheckIcon className="!size-5" />
                <span className="text-base font-semibold tracking-tight">Districtly</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain
          label={role === "merchant" ? "Merchant portal" : "Admin portal"}
          items={role === "merchant" ? merchantNav : adminNav}
        />
        <NavSecondary
          className="mt-auto"
          items={[
            {
              title: role === "merchant" ? "Switch to Admin" : "Switch to Merchant",
              url: role === "merchant" ? "/admin" : "/merchant",
              icon: SettingsIcon,
            },
            { title: "Help & docs", url: "/", icon: CircleHelpIcon },
          ]}
        />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={users[role]} />
      </SidebarFooter>
    </Sidebar>
  );
}
