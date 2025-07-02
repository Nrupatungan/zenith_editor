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
import { DownloadIcon, FileVideo2, Images, Trash2Icon } from "lucide-react"
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
    type: "video" | "image"
    id: string
    fileId: string
}

const ObjectCard = ({
    title,
    createdAt,
    alt,
    objectUrl,
    type,
    id,
    fileId
}: ObjectCardProps) => {
  const router = useRouter()

  const handleClick = () => {
    console.log({
      title,
      createdAt,
      alt,
      objectUrl,
      type,
      id,
      fileId
    });
  }

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
    <Card className="bg-slate-400/20 dark:bg-card shadow-xl">
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                {type === "image"
                ? (
                    <>
                     <Images/> Image File
                    </>
                  )
                : (
                    <>
                      <FileVideo2/> Video File
                    </>
                  )
                }
            </CardTitle>

            <CardDescription className="overflow-ellipsis line-clamp-1 mt-1">{title}</CardDescription>
            
            <CardAction className="space-x-3">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="active:scale-75 cursor-pointer"
                    onClick={handleDownload}
                    >
                      <DownloadIcon/>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Download {type === "image" ? "image" : "video"}</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="destructive" size="icon" className="active:scale-75 cursor-pointer" 
                    onClick={handleDelete}
                    >
                      <Trash2Icon/>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Delete {type === "image" ? "image" : "video"}</p>
                  </TooltipContent>
                </Tooltip>
                
            </CardAction>
        </CardHeader>

        <CardContent
        className="cursor-pointer"
        onClick={handleClick}
        >
          <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg">
            {type === "image"
            ? <Image src={objectUrl} 
            alt={alt ?? title}  
            fill
            className="h-full w-full rounded-lg object-cover"
            />
            
            : <Video 
            src={objectUrl}
            className="h-full w-full rounded-lg object-cover" />
            }
          </AspectRatio>
        </CardContent>
        
        <CardFooter className="justify-end">
          <p className="text-xs">{createdAt}</p>
        </CardFooter>
    </Card>
  )
}

export default ObjectCard