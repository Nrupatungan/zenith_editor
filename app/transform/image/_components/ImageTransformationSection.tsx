"use client"

import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import useModalStore from '@/store'
import { Download, RotateCcw } from 'lucide-react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import React from 'react'

const ImageTransformationSection = () => {
  const {transformUrl, url, setTransformUrl} = useModalStore()
  const searchParams = useSearchParams()
  const objectUrl = searchParams.get('objectUrl')
  
  const handleDownload = async () => {
    if (!transformUrl) return;

    try {
      const response = await fetch(transformUrl);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const blob = await response.blob();
      const newUrl = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = newUrl;
      a.download = "downloaded-file"; // set your filename here
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(newUrl);
    } catch (error) {
      console.error("Download failed:", error);
    }
  }

  const handleReset = () => {
    setTransformUrl(url)
  }

  return (
    <div className='bg-gray-500/15 flex-1 rounded-xl shadow-xl md:min-h-min overflow-hidden'>
      <div className='relative w-full h-full p-6'>
        <div className='w-full h-full flex items-center justify-center'>
            <Image
              src={transformUrl || objectUrl}
              alt="Transformed Image"
              width="1200"
              height="800"
              style={{
                width: 'auto', 
                height: 'auto',
                maxWidth: '100%',
                maxHeight: '100%'
              }}
            />
        </div>

        <div className='absolute top-5 right-5'>
          <div className='flex gap-2'>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="sm" className='cursor-pointer' onClick={handleReset}><RotateCcw/></Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Reset</p>
              </TooltipContent>
            </Tooltip>

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