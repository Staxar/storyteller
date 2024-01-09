'use client'
import React, { useEffect, useState } from 'react'
import jsPDF from 'jspdf'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import fakeData from '../../assets/data/fakeData.json'

export default function Menu() {
  const [pdfUrl, setPdfUrl] = useState<string>('')
  const [images, setImages] = useState<string[]>([
    'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
    'https://st2.depositphotos.com/2001755/8564/i/450/depositphotos_85647140-stock-photo-beautiful-landscape-with-birds.jpg',
  ])
  const fetchImageFromAPI = async (url: string) => {
    try {
      const response = await axios.get('/api/image', {
        params: { url: url },
      })
      const base64 = Buffer.from(response.data, 'binary').toString('base64')
      const imageUrl = `data:${response.headers['content-type']};base64,${base64}`
      return imageUrl
    } catch (error) {
      console.error('Error fetching image:', error)
      return null
    }
  }

  const createPdf = async () => {
    const pdf = new jsPDF()
    const maxWidth = pdf.internal.pageSize.getWidth()
    const maxHeight = pdf.internal.pageSize.getHeight()
    pdf.setProperties({
      title: fakeData?.story.title,
    })

    if (typeof fakeData?.story.title === 'string') {
      const imageDataPromises = images.map((image) => fetchImageFromAPI(image))
      const imageDataArray = await Promise.all(imageDataPromises)

      imageDataArray.forEach((imageData, index) => {
        if (index === 0 && !imageData) {
          console.error('Image data is null for the first page.')
          return // Skip the first page if there's no image data.
        }

        pdf.addPage()
        pdf.addImage(
          imageData ? imageData : '',
          'JPEG',
          0,
          0,
          maxWidth,
          maxHeight
        )
        pdf.setFont('courier', 'bolditalic')
        pdf.setTextColor('white')
        pdf.setFontSize(30)

        if (index === 0) {
          const title = pdf.splitTextToSize(fakeData?.story.title, 150)
          pdf.text(title, 50, 50)
        } else {
          const chapter = fakeData.story.chapters[index - 1]
          const chapterTitle = pdf.splitTextToSize(chapter.title, 150)
          pdf.text(chapterTitle, 25, 50)
          pdf.setFontSize(18)
          const chapterContent = pdf.splitTextToSize(chapter.content, 150)
          pdf.text(chapterContent, maxWidth / 5, 100, { lineHeightFactor: 1.5 })
        }
      })

      const outString = pdf.output('datauristring', { filename: 'testPDF' })
      setPdfUrl(outString)
    } else {
      console.error('Title is not a string.')
    }
  }

  const newCreatePDF = async () => {
    const pdf = new jsPDF({ orientation: 'landscape' })

    const maxWidth = pdf.internal.pageSize.getWidth()
    const maxHeight = pdf.internal.pageSize.getHeight()

    const dataImage = await fetchImageFromAPI(
      'https://media.istockphoto.com/id/472360831/vector/opened-book-with-blank-pages.jpg?s=612x612&w=0&k=20&c=0Jkv-D0qiB-aW5XAs50pBDgjur6-dTbMGExWrSx2zu8='
    )
    console.log(dataImage)
    pdf.addImage(dataImage ? dataImage : '', 'PNG', 0, 0, maxWidth, maxHeight)
    pdf.text('test', 10, 10)
    pdf.addPage('', 'portrait')

    const outString = pdf.output('datauristring', { filename: 'testPDF' })
    setPdfUrl(outString)
  }

  useEffect(() => {
    // createPdf()
    newCreatePDF()
  }, [])

  return (
    <div className="flex flex-1 p-8">
      <div className="">
        <Card className="p-2">
          <Button onClick={createPdf} size="lg" className="text-white">
            Generate PDF
          </Button>
          {pdfUrl !== '' && (
            <iframe
              src={`${pdfUrl}#zoom=40`}
              id="pdf"
              width={1000}
              height={600}
            />
          )}
        </Card>
      </div>
    </div>
  )
}
