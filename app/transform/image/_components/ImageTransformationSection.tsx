import { AspectRatio } from '@/components/ui/aspect-ratio'
import Image from 'next/image'
import React from 'react'

const ImageTransformationSection = ({
  href
}: {href: string}) => {
  return (
    <div className='bg-gray-500/15 flex-1 rounded-xl md:min-h-min overflow-hidden'>
      <div className='w-full h-full flex items-center justify-center'>
        <div className='bg-muted aspect-video'>
          <Image src={href} alt="" width="600" height="500"/>
        </div>
      </div>
    </div>
  )
}

export default ImageTransformationSection