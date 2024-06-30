'use client'
import React from 'react'
import { CldImage } from 'next-cloudinary'
function ImageComponent() {
  return (
    <div>
        <CldImage
            width="960"
            height="600"
            src="h0nfdeix9lpratwgk8al"
            sizes="100vw"
            alt="Description of my image"
          />
    </div>
  )
}

export default ImageComponent