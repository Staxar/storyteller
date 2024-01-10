'use client'
import Image from 'next/image'
import React, { useRef, forwardRef, useState } from 'react'
import { DNA } from 'react-loader-spinner'
import HTMLFlipBook from 'react-pageflip'
import bgImage from '../../public/backgroundRocket.jpg'
import fakeData from '../../assets/data/fakeData.json'
import { v4 as uuidv4 } from 'uuid'
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
  const PageCover = forwardRef<HTMLDivElement, BookProps>((props, ref) => {
    return (
      <div className="demo-page" ref={ref}>
        <div className="p-8">
          <p>{props.title}</p>
        </div>
      </div>
    )
  })

  const Page = forwardRef<HTMLDivElement, BookProps>((props, ref) => {
    return (
      <div
        className={`demo page ${
          props.direction === 'left' ? 'page-left' : 'page-right'
        }`}
        ref={ref}
      >
        <p className="text-3xl p-4">{props.title}</p>
        <div className="p-2 w-full mx-2 h-1/3 flex justify-center">
          <Image
            src={props.imgUrl ? props.imgUrl : ''}
            width={200}
            height={200}
            alt="bgimage"
            className="rounded"
          />
        </div>
        <p className="text-sm p-4">{props.content}</p>
      </div>
    )
  })

  const Cover = forwardRef<HTMLDivElement, BookProps>((props, ref) => {
    return (
      <div className="cover-page page-right" ref={ref}>
        <div className="overlay fixed w-full h-full ">
          <Image
            src={bgImage}
            alt="Cover"
            layout="fill"
            objectFit="cover"
            objectPosition="center center"
            sizes=""
          />
          <div className="text-container absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
            <p className="text-2xl font-bold">{fakeData.story.title}</p>
          </div>
        </div>
      </div>
    )
  })

  function MyBook() {
    const pageRef = useRef<HTMLDivElement>(null)
    return (
      <HTMLFlipBook
        width={400}
        height={400}
        className={'demo-book page-left'}
        startPage={1}
        size="fixed"
        minWidth={315}
        maxWidth={1000}
        minHeight={300}
        maxHeight={400}
        drawShadow={true}
        flippingTime={1000}
        usePortrait={false}
        startZIndex={1000}
        autoSize={true}
        maxShadowOpacity={0.5}
        showCover={true}
        mobileScrollSupport={true}
        clickEventForward={true}
        useMouseEvents={true}
        swipeDistance={0}
        showPageCorners={true}
        disableFlipByClick={true}
        style={{}}
      >
        <Cover ref={pageRef} title="cover" />
        {fakeData.story.chapters.map((chapter, index) => {
          return (
            <Page
              key={uuidv4()}
              title={chapter.title}
              content={chapter.content}
              direction={index % 2 === 0 ? 'right' : 'left'}
              imgUrl={images[index]}
            />
          )
        })}

        <Cover ref={pageRef} title="cover" />
      </HTMLFlipBook>
    )
  }
  return (
    <div className="flex flex-1 w-full h-full p-12">
      <div className="flex justify-center items-center flex-1">
        <div className="h-full">
          <MyBook />
        </div>
      </div>
    </div>
  )
}
