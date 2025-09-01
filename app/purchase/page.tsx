import Navbar from '@/components/Navbar'
import PricingPage from './_components/pricing-page'
import { auth } from '@/lib/next-auth/auth';
import prisma from '@/lib/prisma';

async function PurchasePage() {
  const session = await auth();
  const userData = await prisma.user.findFirst({
      where: {
          id: session?.user?.id
      },
      select: {
        id: true,
        payments: true,
        name: true,
        email: true,
        image: true
      }
  })

  const user = {
    name: userData?.name ?? 'John Doe',
    email: userData?.email ?? 'example@email.com',
    image: userData?.image ?? 'https://ui.shadcn.com/avatars/shadcn.jpg',
    isPremium: userData?.payments[0]?.isPremium ?? false,
  }
  
  return (
    <div className='min-h-screen bg-gray-200 dark:bg-background'>
        <Navbar user={user}/>
        <PricingPage id={userData?.id!} />
    </div>
  )
}

export default PurchasePage