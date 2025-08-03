import { SiteHeader } from './_components/SiteHeader'
import { ImageAppSidebar } from './_components/ImageAppSidebar'
import { SidebarInset } from '@/components/ui/sidebar'
import ImageTransformationSection from './_components/ImageTransformationSection'
import { auth } from '@/lib/next-auth/auth'
import { prisma } from '@/lib/prisma'


const ImageTransformPage = async () => {
  const session = await auth();
  const isPremiumResult = await prisma.user.findFirst({
      where: {
          id: session?.user?.id
      },
      select: { isPremium: true }
  })

  return (
    <>
      <SiteHeader />
      <div className="flex flex-1">
        <ImageAppSidebar isPremium={isPremiumResult?.isPremium} />
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