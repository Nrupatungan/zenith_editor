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
} from "@/components/ui/sidebar"
import { ChevronRight, type LucideIcon } from "lucide-react"
import ResizeOptions from "./ResizeOptions"

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

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Transformations</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip={item.title} className="cursor-pointer" 
              >
                  <div>
                    <item.icon />
                    <span>{item.title}</span>
                  </div>
              </SidebarMenuButton>
              <CollapsibleTrigger asChild>
                <SidebarMenuAction className="data-[state=open]:rotate-90"
                >
                  <ChevronRight />
                  <span className="sr-only">Toggle</span>
                </SidebarMenuAction>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.title === "Resize and Crop" && <ResizeOptions />}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}