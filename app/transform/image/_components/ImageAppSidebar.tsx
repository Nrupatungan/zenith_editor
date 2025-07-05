"use client"

import * as React from "react"
import {
  BookOpen,
  Bot,
  BrainCircuit,
  BringToFront,
  Command,
  Crop,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
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

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    image: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Resize and Crop",
      url: "#",
      icon: Crop,
      isActive: true,
      items: [
        {
          title: "Width",
          url: "#",
        },
        {
          title: "Height",
          url: "#",
        },
        {
          title: "Aspect Ratio",
          url: "#",
        },
        {
          title: "Pad resize crop",
          url: "#",
        },
        {
          title: "Forced crop",
          url: "#",
        },
        {
          title: "Max-size crop",
          url: "#",
        },
        {
          title: "Max-size-enlarge crop",
          url: "#",
        },
        {
          title: "Maintain ratio crop",
          url: "#",
        },
        {
          title: "Extract crop",
          url: "#",
        },
        {
          title: "Pad extract crop",
          url: "#",
        },
        {
          title: "Focus",
          url: "#",
        },
        {
          title: "Zoom",
          url: "#",
        }
      ],
    },
    {
      title: "Add overlays",
      url: "#",
      icon: BringToFront,
      items: [
        {
          title: "Add image overlay",
          url: "#",
          subitems: [
            {
                title: "Position image",
                url: "#",
            },
            {
                title: "Apply transformation",
                url: "#",
            },
            {
                title: "Nest images",
                url: "#",
            }
          ]
        },
        {
          title: "Add text overlay",
          url: "#",
          subitems: [
            {
                title: "Position text",
                url: "#",
            },
            {
                title: "Apply transformation",
                url: "#",
            },
            {
                title: "Change font family",
                url: "#",
            },
            {
                title: "Non english text",
                url: "#",
            },
            
          ]
        },
        {
            title: "Add color blocks",
            url: "#",
            subItems: [
                {
                    title: "Control position",
                    url: "#",
                },
                {
                    title: "Multiple blocks",
                    url: "#",
                },
                {
                    title: "Apply transformation",
                    url: "#",
                },
            ]
        }
      ],
    },
    {
      title: "AI Transformations",
      url: "#",
      icon: BrainCircuit,
      items: [
        {
          title: "Backgrond removal",
          url: "#",
        },
        {
          title: "Change background",
          url: "#",
        },
        {
          title: "Edit image",
          url: "#",
        },
        {
          title: "AI drop shadow",
          url: "#",
        },
        {
          title: "Retouch",
          url: "#",
        },
        {
          title: "Upscale",
          url: "#",
        },
        {
          title: "Generative fill",
          url: "#",
        },
        {
          title: "Generative variation",
          url: "#",
        },
        {
          title: "Face crop",
          url: "#",
        },
        {
          title: "Object aware cropping",
          url: "#",
        },
        {
          title: "Smart crop",
          url: "#",
        }
      ],
    },
    {
      title: "Effects and Enhancements",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Contrast stretch",
          url: "#",
        },
        {
          title: "Sharpen",
          url: "#",
        },
        {
          title: "Unsharp mask",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function ImageAppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const session = useSession();

  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
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
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: session.data?.user?.name ?? "Unknown",
            email: session.data?.user?.email ?? "unknown@example.com",
            image: session.data?.user?.image ?? undefined,
          }}
        />
      </SidebarFooter>
    </Sidebar>
  )
}
