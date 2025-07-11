import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Download } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const ImageTransformationSection = ({
  href
}: {href: string}) => {
  
  const handleDownload = async () => {
    if (!href) return;

    try {
      const response = await fetch(href);
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

  return (
    <div className='bg-gray-500/15 flex-1 rounded-xl shadow-xl md:min-h-min overflow-hidden'>
      <div className='relative w-full h-full p-6'>
        <div className='w-full h-full flex items-center justify-center'>
          <div className='bg-muted aspect-video'>
            <Image src={href} alt="" width="600" height="500"/>
          </div>
        </div>

        <div className='absolute top-5 right-5'>
          <div className='flex gap-2'>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="sm" className='cursor-pointer' onClick={handleDownload}><Download /></Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Download</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageTransformationSection