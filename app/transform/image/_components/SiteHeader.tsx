"use client"

import { SidebarIcon, SlashIcon } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useSidebar } from "@/components/ui/sidebar"
import Link from "next/link"
import { Download, RotateCcw } from 'lucide-react'
import useModalStore from '@/store'
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

export function SiteHeader() {
  const { toggleSidebar } = useSidebar()
  const {transformUrl, resetForm} = useModalStore()

  const handleDownload = async () => {
    if (!transformUrl) return;

    try {
      const response = await fetch(transformUrl);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const blob = await response.blob();
      const newUrl = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = newUrl;
      a.download = "downloaded-file"; // set your filename here
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(newUrl);
    } catch (error) {
      console.error("Download failed:", error);
    }
  }

  return (
    <header className="bg-background sticky top-0 z-50 flex w-full items-center border-b">
      <div className="flex h-(--header-height) w-full items-center gap-2 px-4">
        <Button
          className="h-8 w-8"
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
        >
          <SidebarIcon />
        </Button>
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb className="hidden sm:block">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator>
                <SlashIcon />
            </BreadcrumbSeparator>

            <BreadcrumbItem>
                <BreadcrumbPage>Image Transformation</BreadcrumbPage>
            </BreadcrumbItem>   
            
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className='flex items-center gap-2 pr-6'>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button className='cursor-pointer' onClick={() => resetForm && resetForm()}><RotateCcw/></Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Reset</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button className='cursor-pointer' onClick={handleDownload}><Download /></Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Download</p>
              </TooltipContent>
            </Tooltip>
      </div>
    </header>
  )
}