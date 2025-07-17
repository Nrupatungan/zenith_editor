import { SiteHeader } from './_components/SiteHeader'
import { ImageAppSidebar } from './_components/ImageAppSidebar'
import { SidebarInset } from '@/components/ui/sidebar'
import ImageTransformationSection from './_components/ImageTransformationSection'

const ImageTransformPage = () => {
  
  return (
    <>
      <SiteHeader />
      <div className="flex flex-1">
        <ImageAppSidebar />
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