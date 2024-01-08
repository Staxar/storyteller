import { StoryObject } from '@/app/book/page'
import React, { useEffect } from 'react'
import jsPDF from 'jspdf'
//{ story }: StoryObject
const PdfGenerator = () => {
  useEffect(() => {
    const generatePDF = async () => {
      const pdf = new jsPDF()
      pdf.text('This is centred text.', 105, 80, { align: 'center' })
      pdf.output('dataurlnewwindow')
    }

    generatePDF()
  }, [])
  return null
}

export default PdfGenerator
