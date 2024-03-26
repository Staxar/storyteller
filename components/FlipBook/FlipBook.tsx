import Image from 'next/image'
import React, { forwardRef, useRef } from 'react'
import HTMLFlipBook from 'react-pageflip'
import { StoryObject } from '../../app/book/page'
import { v4 as uuidv4 } from 'uuid'

interface BookProps {
  chapter: {
    chapter_number: string
    title: string
    content: string
  }
  direction?: 'right' | 'left'
  imgUrl?: string
}

interface CoverProps {
  title: string
  imgUrl: string
}

interface FlipBookProps {
  story: StoryObject
  images: string[]
}

export default function FlipBook({ story, images }: FlipBookProps) {
  const Page = forwardRef<HTMLDivElement, BookProps>((props, ref) => {
    return (
      <div
        className={`demo page ${
          props.direction === 'left' ? 'page-left' : 'page-right'
        }`}
        ref={ref}
      >
        <p className="text-3xl p-4">{props.chapter.title}</p>
        <div className="p-2 w-full mx-2 h-1/3 relative flex justify-center">
          <Image
            src={props.imgUrl ? props.imgUrl : ''}
            width={200}
            height={200}
            alt="bgimage"
            className="rounded"
            style={{ objectFit: 'fill' }}
          />
        </div>
        <p className="text-sm p-4">{props.chapter.content}</p>
      </div>
    )
  })

  const Cover = forwardRef<HTMLDivElement, CoverProps>((props, ref) => {
    return (
      <div className="cover-page page-right" ref={ref}>
        <div className="overlay relative w-full h-full ">
          <Image
            src={props.imgUrl ? props.imgUrl : ''}
            alt="Cover"
            style={{
              objectFit: 'cover',
              objectPosition: 'center center',
              position: 'absolute',
              inset: '0',
              width: '100%',
              height: '100% ',
            }}
            width={400}
            height={400}
            sizes=""
            priority
            loading="eager"
          />
          <div className="text-container absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
            <p className="text-2xl font-bold">{props.title}</p>
          </div>
        </div>
      </div>
    )
  })

  const pageRef = useRef<HTMLDivElement>(null)
  return (
    <HTMLFlipBook
      width={400}
      height={400}
      className={'demo-book page-left'}
      startPage={0}
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
      <Cover ref={pageRef} title={story.story.title} imgUrl={images[0]} />
      {story.story.chapters.map((chapter, index) => {
        return (
          <Page
            key={uuidv4()}
            chapter={chapter}
            imgUrl={images[index + 1]}
            direction={index % 2 === 0 ? 'right' : 'left'}
            ref={pageRef}
          />
        )
      })}

      <Cover ref={pageRef} title="cover" imgUrl={images[0]} />
    </HTMLFlipBook>
  )
}
