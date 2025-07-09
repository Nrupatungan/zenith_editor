"use client"

import { useSearchParams } from 'next/navigation'
import { SiteHeader } from './_components/SiteHeader'
import { ImageAppSidebar } from './_components/ImageAppSidebar'
import { SidebarInset } from '@/components/ui/sidebar'
import ImageTransformationSection from './_components/ImageTransformationSection'

const ImageTransformPage = () => {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const fileId = searchParams.get('fileId')
  const objectUrl = searchParams.get('objectUrl')
  
  return (
    <>
      <SiteHeader />
      <div className="flex flex-1">
        <ImageAppSidebar />
        <SidebarInset className='overflow-hidden'>
            <div className="flex flex-1 flex-col gap-4 p-4">
              <div className="grid grid-flow-col auto-cols-max gap-4 h-[14rem] w-full overflow-x-auto">
                <div className="bg-gray-500/15 aspect-video rounded-xl w-80 md:w-96 h-[90%]" />
                <div className="bg-gray-500/15 aspect-video rounded-xl w-80 md:w-96 h-[90%]" />
                <div className="bg-gray-500/15 aspect-video rounded-xl w-80 md:w-96 h-[90%]" />
                <div className="bg-gray-500/15 aspect-video rounded-xl w-80 md:w-96 h-[90%]" />
                <div className="bg-gray-500/15 aspect-video rounded-xl w-80 md:w-96 h-[90%]" />
              </div>
              <ImageTransformationSection href={objectUrl ?? "https://ik.imagekit.io/ikmedia/docs_images/examples/example_portrait_1.jpg"} />
            </div>
          </SidebarInset>
      </div>
    </>
  )
}

export default ImageTransformPage