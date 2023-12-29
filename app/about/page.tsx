'use client'
import Image from 'next/image'
import React, { useRef, forwardRef } from 'react'
import { DNA } from 'react-loader-spinner'
import HTMLFlipBook from 'react-pageflip'
import bgImage from '../../assets/Firefly landing page background, illustration from book, kids playing in forest, some of them has bo.jpg'
import BOOK from '../../assets/data/bookStory.json'
import { v4 as uuidv4 } from 'uuid'
type BookProps = {
  content?: string
  title: string
}

export default function About() {
  const PageCover = forwardRef<HTMLDivElement, BookProps>((props, ref) => {
    return (
      <div
        className="pageCover bg-cover bg-center text-center"
        ref={ref}
        style={{ backgroundImage: `url(${bgImage.src})` }}
      >
        <p className="p-8 text-5xl text-white">{props.title}</p>
      </div>
    )
  })

  const Page = forwardRef<HTMLDivElement, BookProps>((props, ref) => {
    return (
      <div className="demoPage bg-[url('/bgImage.jpg)]" ref={ref}>
        <p className="text-3xl p-4 bg-slate-700">{props.title}</p>
        <p className="text-xl p-4 bg-slate-700">{props.content}</p>
      </div>
    )
  })

  function MyBook() {
    const pageRef = useRef<HTMLDivElement>(null)
    return (
      <HTMLFlipBook
        width={500}
        height={450}
        className={''}
        startPage={0}
        size={'fixed'}
        minWidth={300}
        maxWidth={500}
        minHeight={450}
        maxHeight={500}
        drawShadow={true}
        flippingTime={1000}
        usePortrait={false}
        startZIndex={0}
        autoSize={true}
        maxShadowOpacity={0}
        showCover={true}
        mobileScrollSupport={true}
        clickEventForward={true}
        useMouseEvents={true}
        swipeDistance={0}
        showPageCorners={true}
        disableFlipByClick={true}
        style={{}}
      >
        <PageCover key={uuidv4()} ref={pageRef} title={BOOK.title} />
        {BOOK.chapters.map((chapter, index) => {
          return (
            <Page
              key={uuidv4()}
              ref={pageRef}
              content={chapter.content}
              title={chapter.title}
            />
          )
        })}
        <PageCover key={uuidv4()} ref={pageRef} title={'THE END'} />
      </HTMLFlipBook>
    )
  }
  return (
    <div>
      <h1>
        <DNA />
      </h1>
      <div className="flex justify-center items-center h-600">
        <MyBook />
      </div>
    </div>
  )
}
