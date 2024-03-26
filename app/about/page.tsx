'use client'
import Image from 'next/image'
import React, { useRef, forwardRef, useState } from 'react'
import { DNA } from 'react-loader-spinner'
import HTMLFlipBook from 'react-pageflip'
import bgImage from '../../public/backgroundRocket.jpg'
import fakeData from '../../assets/data/fakeData.json'
import { v4 as uuidv4 } from 'uuid'
import FlipBook from '@/components/FlipBook/FlipBook'
type BookProps = {
  content?: string
  title: string
  direction?: 'right' | 'left'
  imgUrl?: string
}
export default function About() {
  const [images, setImages] = useState<string[]>([
    'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg',
    'https://st2.depositphotos.com/2001755/8564/i/450/depositphotos_85647140-stock-photo-beautiful-landscape-with-birds.jpg',
    'https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg',
  ])

  return (
    <div className="flex flex-1 w-full h-full p-12">
      <div className="flex justify-center items-center flex-1">
        <div className="h-full">
          <FlipBook story={fakeData} images={images} />
        </div>
      </div>
    </div>
  )
}
