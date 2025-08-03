import Navbar from '@/components/Navbar'
import PricingPage from './_components/pricing-page'
import { auth } from '@/lib/next-auth/auth';
import { prisma } from '@/lib/prisma';

async function PurchasePage() {
  const session = await auth();
    const isPremiumResult = await prisma.user.findFirst({
          where: {
              id: session?.user?.id
          },
          select: { isPremium: true }
    })
  
    const user = {
        name: session?.user?.name ?? 'John Doe',
        email: session?.user?.email ?? 'example@email.com',
        image: session?.user?.image ?? 'https://ui.shadcn.com/avatars/shadcn.jpg',
        isPremium: isPremiumResult?.isPremium ?? false,
    }
  
  return (
    <div className='min-h-screen bg-gray-200 dark:bg-background'>
        <Navbar user={user}/>
        <PricingPage />
    </div>
  )
}

export default PurchasePage