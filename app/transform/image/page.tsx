import { SiteHeader } from './_components/SiteHeader'
import { ImageAppSidebar } from './_components/ImageAppSidebar'
import { SidebarInset } from '@/components/ui/sidebar'
import ImageTransformationSection from './_components/ImageTransformationSection'
import { auth } from '@/lib/next-auth/auth'
import prisma from '@/lib/prisma'


const ImageTransformPage = async () => {
  const session = await auth();
  const userData = await prisma.user.findFirst({
      where: {
          id: session?.user?.id
      }
  })

  const user = {
    name: userData?.name ?? 'John Doe',
    email: userData?.email ?? 'example@email.com',
    image: userData?.image ?? 'https://ui.shadcn.com/avatars/shadcn.jpg',
    isPremium: userData?.isPremium ?? false,
  }

  return (
    <>
      <SiteHeader />
      <div className="flex flex-1">
        <ImageAppSidebar user={user} />
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