"use client"

import * as React from "react"
import {
  Command,
} from "lucide-react"

import { NavMain } from "./nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NavUser } from "./nav-user"
import { useSession } from "next-auth/react"
import { data } from "@/lib/data"

interface ImageAppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  transform: any;
}

export function ImageAppSidebar({ transform, ...props }: ImageAppSidebarProps) {
  const session = useSession();

  const user = {
    name: session.data?.user?.name ?? 'John Doe',
    email: session.data?.user?.email ?? 'example@email.com',
    image: session.data?.user?.image ?? 'https://ui.shadcn.com/avatars/shadcn.jpg'
  }

  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]! w-[260px]"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div>
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Zenith Inc</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} transform={transform} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={user}
        />
      </SidebarFooter>
    </Sidebar>
  )
}
