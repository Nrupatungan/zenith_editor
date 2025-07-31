"use client"

import useModalStore from '@/store'
import { useSearchParams } from 'next/navigation'
import React, { useState } from 'react'

const ImageTransformationSection = () => {
  const { transformUrl } = useModalStore()
  const searchParams = useSearchParams()
  const objectUrl = searchParams.get('objectUrl')
  const [isLoading, setIsLoading] = useState(true)

  const imageSrc = transformUrl || (objectUrl as string)

  return (
    <div className='bg-gray-500/15 flex-1 rounded-xl shadow-xl md:min-h-min overflow-hidden'>
      <div className='w-full h-full p-6'>
        <div className='size-full flex items-center justify-center overflow-auto relative'>
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <span className="animate-spin rounded-full size-10 border-t-4 border-l-4 border-b-4 border-amber-300">
              </span>
            </div>
          )}
          <img
            src={imageSrc}
            alt="Transformed Image"
            style={{ maxWidth: '100%', maxHeight: '100%', display: isLoading ? 'none' : 'block' }}
            onLoad={() => setIsLoading(false)}
          />
        </div>
      </div>
    </div>
  )
}

export default ImageTransformationSection