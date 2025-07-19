"use client"

import useModalStore from '@/store'
import { useSearchParams } from 'next/navigation'
import React from 'react'

const ImageTransformationSection = () => {
  const {transformUrl} = useModalStore()
  const searchParams = useSearchParams()
  const objectUrl = searchParams.get('objectUrl')

  return (
    <div className='bg-gray-500/15 flex-1 rounded-xl shadow-xl md:min-h-min overflow-hidden'>
      <div className='w-full h-full p-6'>
        <div className='size-full flex items-center justify-center overflow-auto'>
            <img
                src={transformUrl || objectUrl as string}
                alt="Transformed Image"
              />
        </div>
      </div>
    </div>
  )
}

export default ImageTransformationSection