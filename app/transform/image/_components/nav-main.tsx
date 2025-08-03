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
import TransformOptions from "./TransformOptions"

export function NavMain({
  items,
  transform,
  isPremium
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
  }[],
  transform: any,
  isPremium: boolean
}) {

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Transformations</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip={item.title} hidden={item.title === "AI Transformations" && !isPremium} className="cursor-pointer" 
              >
                  <div>
                    <item.icon />
                     <span>{item.title}</span>
                  </div>
              </SidebarMenuButton>
              <CollapsibleTrigger asChild>
                <SidebarMenuAction className="data-[state=open]:rotate-90"
                hidden={item.title === "AI Transformations" && !isPremium}
                >
                  <ChevronRight />
                  <span className="sr-only">Toggle</span>
                </SidebarMenuAction>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub className="p-0 mx-1">
                  {/* Options */}
                  <TransformOptions title={item.title} {...transform} isPremium={isPremium} />
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}