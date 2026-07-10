"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar"
import {
  LayoutDashboardIcon,
  UserCheckIcon,
  UsersIcon,
  KanbanIcon,
  SettingsIcon,
  MessageCircleIcon,
} from "lucide-react"

const navItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Leads",
    url: "/dashboard/leads",
    icon: UserCheckIcon,
  },
  {
    title: "Clientes",
    url: "/dashboard/clientes",
    icon: UsersIcon,
  },
  {
    title: "Pipeline",
    url: "/dashboard/pipeline",
    icon: KanbanIcon,
  },
  {
    title: "Chat",
    url: "/dashboard/chat",
    icon: MessageCircleIcon,
  },
  {
    title: "Configurações",
    url: "/dashboard/settings",
    icon: SettingsIcon,
  },
]

const user = {
  name: "Usuário",
  email: "usuario@findfee.com",
  avatar: "",
}

export function CrmSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<Link href="/dashboard" />}>
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <KanbanIcon className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">Findfee CRM</span>
                <span className="truncate text-xs">Enterprise</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  isActive={pathname === item.url || (item.url !== "/dashboard" && pathname.startsWith(item.url))}
                  tooltip={item.title}
                  render={<Link href={item.url} />}
                >
                  <item.icon className="size-4" />
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
