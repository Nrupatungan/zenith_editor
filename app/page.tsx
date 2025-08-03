import Navbar from "@/components/Navbar";
import ObjectCard from "@/components/ObjectCard";
import UploadModalButton from "@/components/UploadModalButton";
import { apiClient } from "@/lib/api-client";
import { Object } from "./generated/prisma";
import { formatDateWithOrdinal } from "@/lib/utils";
import { auth } from "@/lib/next-auth/auth";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const session = await auth();
  const objects = await apiClient.getObjects(session?.user?.id!);
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
    <div className="bg-gray-100 dark:bg-background">
      <Navbar user={user}/>
      <main className='container mx-auto px-7'>
          <div className='py-8 min-h-screen'>
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl md:text-3xl underline font-semibold">Your Images</h1>
              <UploadModalButton />
            </div>

            <div className="grid gap-8 md:gap-6  grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
              {(Array.isArray(objects) ? objects : []).map((object: Object) => (
                <ObjectCard
                key={object.id}
                id={object.id}
                fileId={object.fileId}
                objectUrl={object.objectUrl}
                title={object.title} 
                alt={object.alt ?? ""}
                createdAt={formatDateWithOrdinal(object.createdAt)} />
              ))}
            </div>
          </div>
      </main>
    </div>    
  );
}
