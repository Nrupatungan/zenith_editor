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
import { BrainCircuit, Download, DownloadIcon, FileVideo2, Images, Trash2Icon } from "lucide-react"
import { Button } from "./ui/button"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import Image from "next/image"
import { Video } from "@imagekit/next"
import { apiClient } from "@/lib/api-client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { deleteImageKitFile } from "@/actions/delete-imagekit-file-action"
import { getInitials } from "@/lib/utils"

export interface ObjectCardProps{
    title: string
    createdAt?: string
    alt?: string
    objectUrl: string
    id: string
    fileId: string
}

const ObjectCard = ({
    title,
    createdAt,
    alt,
    objectUrl,
    id,
    fileId
}: ObjectCardProps) => {
  const router = useRouter()

  const backgroundStyles = {backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${objectUrl})`, backgroundSize: "cover", backgroundRepeat: "no-repeat"};

  const handleClick = () => {
    const params = new URLSearchParams({
      id,
      fileId,
      objectUrl,
    }).toString();
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
      const deletePromise = deleteImageKitFile(fileId);
      toast.promise(deletePromise, {
        loading: 'Loading...',
        success: () => {
          return `File deleted from ImageKit`;
        },
        error: 'Error deleting from ImageKit',
      });

      const deleteImagekitResponse = await deletePromise;
      
      if (deleteImagekitResponse) {
        const deleteDbPromise = apiClient.deleteObject(id);
        toast.promise(deleteDbPromise, {
          loading: 'Loading...',
          success: () => {
            return `Deleted Successfully from database`;
          },
          error: 'Error deleting from database',
        })
      }

    } catch (error) {
      console.error(error);
      toast.error("Couldn't delete the file");
    } finally {
      router.push("/");
    }
  }

  return (
    <Card className="overflow-hidden bg-slate-400/20 dark:bg-card shadow-xl rounded-3xl">
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Images />
                Image File
            </CardTitle>

            <CardDescription className="overflow-ellipsis line-clamp-1 mt-1 text-white">{title}</CardDescription>
            
            <CardAction>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="icon" className="bg-[#fb2c36] hover:bg-[#fb2c36]/80 active:scale-75 cursor-pointer" 
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
        
        <CardFooter className="flex justify-between">
          <Button className="bg-[#5ea500] hover:bg-[#5ea500]/80 font-semibold cursor-pointer" 
          onClick={handleDownload}>
            <Download/> 
            Download
          </Button>
          <Button className="font-semibold cursor-pointer hover:bg-primary/80"
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