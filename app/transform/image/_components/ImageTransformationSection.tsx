"use client"

import { Slider } from '@/components/ui/slider'
import useModalStore from '@/store'
import { useSearchParams } from 'next/navigation'
import React, { useState } from 'react'

const ImageTransformationSection = () => {
  const { transformUrl } = useModalStore()
  const searchParams = useSearchParams()
  const objectUrl = searchParams.get('objectUrl')
  const [isLoading, setIsLoading] = useState(true)
  const [sliderValue, setSliderValue] = useState([100]); // Start at 100 for no zoom

  const imageSrc = transformUrl || (objectUrl as string)

  // Calculate the scale factor from the slider value (e.g., 100 -> 1, 50 -> 0.5)
  const scale = sliderValue[0] / 100;

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
            style={{
              transform: `scale(${scale})`,
              transformOrigin: 'center center',
              display: isLoading ? 'none' : 'block'
            }}
            onLoad={() => setIsLoading(false)}
          />
          <div className='fixed bottom-3 w-[10rem] py-3 h-5 bg-transparent backdrop-blur-sm flex items-center'>
            <Slider
              defaultValue={[50]}
              value={sliderValue}
              min={10}
              max={200} // Increased max to allow for zoom-in
              step={10}
              onValueChange={setSliderValue}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageTransformationSection