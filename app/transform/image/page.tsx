import { SiteHeader } from './_components/SiteHeader'
import { ImageAppSidebar } from './_components/ImageAppSidebar'
import { SidebarInset } from '@/components/ui/sidebar'
import ImageTransformationSection from './_components/ImageTransformationSection'
import HistoryCard from './_components/HistoryCard'

const ImageTransformPage = () => {
  
  return (
    <>
      <SiteHeader />
      <div className="flex flex-1">
        <ImageAppSidebar />
        <SidebarInset className='overflow-hidden'>
            <div className="flex flex-1 flex-col gap-2 p-4">
              <p className='text-sm'>History</p>
              <div className="grid grid-flow-col auto-cols-max gap-4 h-[14rem] w-full overflow-x-auto">
                <HistoryCard />
                <HistoryCard />
                <HistoryCard />
              </div>
              <p className='text-sm'>Transformation section</p>
              <ImageTransformationSection />
            </div>
        </SidebarInset>
      </div>
    </>
  )
}

export default ImageTransformPage