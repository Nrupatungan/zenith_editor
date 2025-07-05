import Navbar from "@/components/Navbar";
import ObjectCard from "@/components/ObjectCard";
import UploadModalButton from "@/components/UploadModalButton";
import { apiClient } from "@/lib/api-client";
import { Object } from "./generated/prisma";
import { formatDateWithOrdinal } from "@/lib/utils";
import { auth } from "@/lib/next-auth/auth";

export default async function Home() {
  const session = await auth();
  const objects = await apiClient.getObjects(session?.user?.id!);
  
  return (
    <div className="bg-gray-200 dark:bg-background">
      <Navbar/>
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
