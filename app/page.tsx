import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import ObjectCard from "@/components/ObjectCard";
import UploadModalButton from "@/components/UploadModalButton";



export default function Home() {
  
  return (
    <>
      <Navbar/>
      <div className='container mx-auto px-7 bg-background'>
        <div className='py-8 min-h-screen'>
          <div className="flex justify-between items-center mb-8">
            <Header className="">Your Content</Header>
            <UploadModalButton />
          </div>
          <div className="grid gap-8 md:gap-6  grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
            <ObjectCard objectUrl="https://ik.imagekit.io/zoner/default-image.jpg?updatedAt=1750259607629" type="image" title="A video shenanigan that deals with. Lorem ipsum dolor set amet" alt="original image" updatedAt="June 18th 2025" />

            <ObjectCard objectUrl="https://ik.imagekit.io/zoner/sample-video.mp4?updatedAt=1750259608301" type="video" title="An image shenanigan" updatedAt="June 18th 2025"/>
          </div>
        </div>
      </div>
    </>    
  );
}
