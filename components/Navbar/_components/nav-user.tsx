"use client"

import {
    BadgeCheck,
    Bell,
    CreditCard,
    LogOut,
    Sparkles,
  } from "lucide-react"
  import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { getInitials } from "@/lib/utils"
import { signoutAction } from "@/actions/signout-action"
import { redirect } from "next/navigation"


export interface NavUserProps {
    user: {
      name: string,
      email: string,
      image: string
    }
}

const NavUser = ({
    user,
  }: NavUserProps) => {
  
  const handleLogOut = async () => {
    try{
      await signoutAction()
    }catch(err){
      console.error(err)
    }
  }

  return (
    <DropdownMenu>
          <DropdownMenuTrigger asChild>
              <Avatar className="h-8 w-8 rounded-full cursor-pointer">
                <AvatarImage src={user.image} alt={user.name} />
                <AvatarFallback className="rounded-lg">{getInitials(user.name)}</AvatarFallback>
              </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side="bottom"
            align="center"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.image} alt={user.name} />
                  <AvatarFallback className="rounded-lg">{getInitials(user.name)}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="text-amber-600 focus:text-amber-600 focus:bg-slate-200/80 dark:focus:bg-slate-50/20 cursor-pointer dark:text-amber-300 dark:focus:text-amber-500 font-semibold">
                <Sparkles className="text-amber-500 fill-amber-500" />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
              onClick={() => redirect("/profile")}
              >
                <BadgeCheck />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem
              onClick={() => redirect("/pricing")}
              >
                <CreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem
              onClick={() => redirect("/notifications")}
              >
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
             variant="destructive"
             className="text-red-600 focus:text-red-600 focus:bg-slate-200/80 dark:focus:bg-slate-50/20 cursor-pointer dark:text-red-300 dark:focus:text-red-500 font-semibold"
             onClick={handleLogOut}
            >
              <LogOut className="text-red-500" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
  )
}

export default NavUser