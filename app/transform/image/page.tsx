"use client"

import { SiteHeader } from './_components/SiteHeader'
import { ImageAppSidebar } from './_components/ImageAppSidebar'
import { SidebarInset } from '@/components/ui/sidebar'
import ImageTransformationSection from './_components/ImageTransformationSection'
import { useTransform } from '@/hooks/use-transform'

const ImageTransformPage = () => {
  const transform = useTransform();
  
  return (
    <>
      <SiteHeader />
      <div className="flex flex-1">
        <ImageAppSidebar transform={transform} />
        <SidebarInset className='overflow-hidden'>
            <div className="flex flex-1 flex-col">
              <ImageTransformationSection />
            </div>
        </SidebarInset>
      </div>
    </>
  )
}

export default ImageTransformPage