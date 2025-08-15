"use client"

import * as React from "react"
import {
  ArrowLeft,
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
import { data } from "@/lib/data"
import { useTransform } from '@/hooks/use-transform'
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { NavUserProps } from "@/components/Navbar/_components/nav-user"

export function ImageAppSidebar({ user, ...props }: NavUserProps) {
  const transform = useTransform();

  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]! w-[260px]"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg"
            className="cursor-pointer"
            onClick={() => redirect('/')}
            asChild>
              <div className="flex justify-between">
                <div className="flex gap-3">
                  <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                    <Command className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">Zenith Inc</span>
                    <span className="truncate text-xs">Enterprise</span>
                  </div>
                </div>
                <Button variant="outline"><ArrowLeft/>Back</Button>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} transform={transform} isPremium={user.isPremium}/>
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={user}
        />
      </SidebarFooter>
    </Sidebar>
  )
}
