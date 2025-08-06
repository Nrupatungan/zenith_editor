import Navbar from "@/components/Navbar";
import UploadModalButton from "@/components/UploadModalButton";
import { auth } from "@/lib/next-auth/auth";
import { prisma } from "@/lib/prisma";
import ImageGrid from "@/components/ImageGrid";

export default async function Home() {
  const session = await auth();
  const isPremiumResult = await prisma.user.findFirst({
        where: {
            id: session?.user?.id
        },
        select: { isPremium: true }
  })

  const objectCount = await prisma.object.count({
    where: {
      userId: session?.user?.id
    }
  })

  const user = {
    name: session?.user?.name ?? 'John Doe',
    email: session?.user?.email ?? 'example@email.com',
    image: session?.user?.image ?? 'https://ui.shadcn.com/avatars/shadcn.jpg',
    isPremium: isPremiumResult?.isPremium ?? false,
  }
  
  return (
    <div className="bg-gray-100 dark:bg-background">
      <Navbar user={user}/>

      <div className="fixed top-16 left-0 right-0 z-10 bg-background shadow-md">
        <div className="container mx-auto px-7 flex justify-between items-center py-5">
          <h1 className="text-2xl md:text-3xl underline font-semibold">Your Images</h1>
          <UploadModalButton />
        </div>
      </div>

      {/* Main Content Section */}
      <main className='container mx-auto px-7 relative overflow-hidden'>
        <div className={`py-8 min-h-screen pt-[90px]`}>
          <ImageGrid id={session?.user?.id!} objectCount={objectCount}/>
        </div>
      </main>
    </div>
  );
}
