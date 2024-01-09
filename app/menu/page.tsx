'use client'
import React, { useEffect, useState } from 'react'
import jsPDF from 'jspdf'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import fakeData from '../../assets/data/fakeData.json'

export default function Menu() {
  const [pdfUrl, setPdfUrl] = useState<string>('')

  const fetchImageFromAPI = async () => {
    try {
      const response = await axios.get('/api/image')
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
      title: fakeData.story.title,
    })

    const imageData = await fetchImageFromAPI()

    if (imageData !== null) {
      pdf.addImage(imageData, 'JPEG', 0, 0, maxWidth, maxHeight)
      pdf.setFont('courier', 'bolditalic')
      pdf.setTextColor('white')
      pdf.setFontSize(30)
      const title = pdf.splitTextToSize(fakeData.story.title, 150)
      pdf.text(title, 50, 50)

      fakeData.story.chapters.forEach((chapter, index) => {
        pdf.addPage()
        pdf.addImage(imageData, 'JPEG', 0, 0, maxWidth, maxHeight)
        pdf.setFont('courier', 'bolditalic')
        pdf.setTextColor('white')
        pdf.setFontSize(30)
        const chapterTitle = pdf.splitTextToSize(chapter.title, 150)
        pdf.text(chapterTitle, 25, 50)
        pdf.setFontSize(18)
        const chapterContent = pdf.splitTextToSize(chapter.content, 150)
        pdf.text(chapterContent, maxWidth / 5, 100, { lineHeightFactor: 1.5 })
      })

      const outString = pdf.output('datauristring', { filename: 'testPDF' })
      setPdfUrl(outString)
    } else {
      console.error('Image data is null.')
    }
  }

  useEffect(() => {
    createPdf()
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
