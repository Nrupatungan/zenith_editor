"use client"

import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { BrainCircuit, Download, Images, Trash2Icon } from "lucide-react"
import { Button } from "./ui/button"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import Image from "next/image"
import { apiClient } from "@/lib/api-client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import useModalStore from "@/store"

export interface ObjectCardProps{
    title: string
    alt?: string
    objectUrl: string
    fileId: string
}

const ObjectCard = ({
    title,
    alt,
    objectUrl,
    fileId
}: ObjectCardProps) => {
  const router = useRouter()
  const {setUrl, setTransformUrl, mutateObject} = useModalStore()

  const handleClick = () => {
    const params = new URLSearchParams({
      objectUrl,
    }).toString();

    setUrl(objectUrl);
    setTransformUrl(objectUrl);
    router.push(`/transform/image?${params}`);
  };

  const handleDownload = async() => {
    if (!objectUrl) return;

    try {
      const response = await fetch(objectUrl);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "downloaded-file"; // set your filename here
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  }

  const handleDelete = async () => {

    try {
      const deleteObjectResult = apiClient.deleteObject(fileId);
      toast.promise(deleteObjectResult, {
        loading: 'Loading...',
        success: () => {
          if(mutateObject) mutateObject();
          router.refresh();
          return `Deleted Successfully from database and S3`;
        },
        error: 'Error deleting from database',
      })
    } catch (error) {
      console.error(error);
      toast.error("Couldn't delete the file");
    }
  }

  return (
    <Card className="overflow-hidden bg-primary/20 dark:bg-card shadow-xl rounded-xl">
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Images />
                Original File
            </CardTitle>

            <CardDescription className="overflow-ellipsis line-clamp-1 mt-1 font-semibold">{title}</CardDescription>
            
            <CardAction>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="sm" className="bg-[#fb2c36]/80 hover:bg-[#fb2c36] active:scale-75 cursor-pointer" 
                    onClick={handleDelete}
                    >
                      <Trash2Icon/>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Delete image</p>
                  </TooltipContent>
                </Tooltip>
                
            </CardAction>
        </CardHeader>

        <CardContent>
          <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg">
            <Image src={objectUrl} 
            alt={alt ?? title}  
            fill
            className="h-full w-full rounded-lg object-cover"
            />
          </AspectRatio>
        </CardContent>
        
        <CardFooter className="flex gap-2 justify-between">
          <Button className="bg-[#5ea500]/80 hover:bg-[#5ea500] font-semibold cursor-pointer" 
          onClick={handleDownload}>
            <Download/> 
            Download
          </Button>
          <Button className="font-semibold cursor-pointer bg-primary/80"
          onClick={handleClick}
          >
            <BrainCircuit/>
            Apply Transformation
          </Button>
        </CardFooter>
    </Card>
  )
}

export default ObjectCard