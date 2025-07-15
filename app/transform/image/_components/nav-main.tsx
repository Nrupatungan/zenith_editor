"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import useModalStore from "@/store"

export function NavMain({
  items,
}: {
  items: {
    title: string
    icon: LucideIcon
    isActive?: boolean
    modalName?: string
    items?: {
      title: string
      info: string
      subItems?: {
        title: string
        info: string,
      }[]
    }[]
  }[]
}) {
  const {openResizeModal, openAiModal, openEffectsModal, openOverlayModal} = useModalStore();

  const handleClick = (modal: string) => {

    switch (modal) {
      case "resize":
        openResizeModal()
        break;
      case "overlay":
        openOverlayModal()
        break;
      case "ai":
        openAiModal()
        break;
      case "effect":
        openEffectsModal()
        break;
    }
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Transformations</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible key={item.title} asChild>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip={item.title} className="cursor-pointer" onClick={() => handleClick(item.modalName!)}>
                  <div>
                    <item.icon />
                    <span>{item.title}</span>
                  </div>
              </SidebarMenuButton>
              {item.items?.length ? (
                <>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuAction className="data-[state=open]:rotate-90"
                    onClick={() => handleClick(item.modalName!)}
                    >
                      <ChevronRight />
                      <span className="sr-only">Toggle</span>
                    </SidebarMenuAction>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span className="text-sm">{subItem.title}</span>
                              </TooltipTrigger>
                              <TooltipContent side="right" className="w-sm">
                                <h2 className="text-sm font-semibold">{subItem.title}</h2>
                                <p className="text-sm">{subItem.info}</p>
                              </TooltipContent>
                            </Tooltip>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </>
              ) : null}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}