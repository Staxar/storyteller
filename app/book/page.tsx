'use client'
import { useEffect, useState } from 'react'
import BookForm from '@/components/Form/BookForm'
import BookData from '../../assets/data/booksMood.json'
import { Card } from '@/components/ui/card'
import {} from 'react'
import { DNA } from 'react-loader-spinner'
import StoryData from '../../assets/data/fakeData.json'
import jsPDF from 'jspdf'
import axios, { AxiosResponse } from 'axios'

const PersonalFormData: dataObject[] = [
  {
    field: 'name',
    data: {
      placeholder: 'eg. Tom',
      name: 'Name',
      type: 'input',
    },
  },
  {
    field: 'gender',
    data: {
      placeholder: 'eg. Male',
      name: 'Gender',
      type: 'input',
    },
  },
  {
    field: 'age',
    data: {
      placeholder: 'eg. Tom',
      name: 'Age',
      type: 'input',
    },
  },
  {
    field: 'eyesColor',
    data: {
      placeholder: 'eg. blue',
      name: 'Eyes Color',
      type: 'input',
    },
  },
  {
    field: 'hairColor',
    data: {
      placeholder: 'eg. dark brown',
      name: 'Hair Color',
      type: 'input',
    },
  },
]

const StoryFormData: dataObject[] = [
  {
    field: 'genre',
    data: {
      placeholder: 'eg. Fantasy',
      name: 'Book genre',
      type: 'select',
      additionalData: BookData.bookGenre,
    },
  },
  {
    field: 'mood',
    data: {
      placeholder: 'eg. Humorous',
      name: 'Book mood',
      type: 'select',
      additionalData: BookData.bookMoods,
    },
  },
  {
    field: 'placeOfAction',
    data: {
      placeholder: 'eg. Forest',
      name: 'Place of action',
      type: 'input',
    },
  },
  {
    field: 'additionalInfo',
    data: {
      placeholder: 'eg. Magic items, characters...',
      name: 'Additional informations',
      type: 'input',
    },
  },
]

export interface dataObject {
  field:
    | 'name'
    | 'gender'
    | 'age'
    | 'eyesColor'
    | 'hairColor'
    | 'genre'
    | 'mood'
    | 'placeOfAction'
    | 'additionalInfo'
  data: {
    placeholder: string
    name: string
    type: string
    additionalData?: string[]
  }
}

export interface formObject {
  additionalInfo: string
  age: number
  eyesColor: string
  gender: string
  genre: string
  hairColor: string
  mood: string
  name: string
  placeOfAction: string
}
export interface StoryObject {
  story: {
    title: string
    chapters: Array<{
      chapter_number: string
      title: string
      content: string
    }>
  }
  prompts: Array<{
    chapter: string
    description: string
  }>
}

const formData: dataObject[][] = [PersonalFormData, StoryFormData]

const Book: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [loadingDescription, setLoadingDescription] = useState<string>('')
  const [response, setResponse] = useState<StoryObject | null>(null)
  const [images, setImages] = useState<string[]>([])
  const [formResponse, setFormResponse] = useState<formObject | undefined>()
  const [pdfUrl, setPdfUrl] = useState<string>('')

  const getData = async (message: string): Promise<StoryObject | null> => {
    try {
      const res = await fetch('/api/openai', {
        method: 'POST',
        body: JSON.stringify({
          messages: [{ role: 'user', content: message }],
        }),
        headers: { 'Content-Type': 'application/json' },
      })

      if (!res.ok) {
        throw new Error('Failed to fetch data!')
      }

      return res.json()
    } catch (error) {
      console.error('Error fetching data:', error)
      return null
    }
  }

  const getImage = async (prompt: string): Promise<string | null> => {
    try {
      const res = await fetch('/api/dalle', {
        method: 'POST',
        body: JSON.stringify({
          messages: [{ prompt: prompt }],
        }),
        headers: { 'Content-Type': 'application/json' },
      })

      if (!res.ok) {
        throw new Error('Failed to fetch image!')
      }

      const data = await res.json()
      const dataString = data.data.toString()
      return dataString
    } catch (error) {
      console.log('Error fetching image: ', error)
      return null
    }
  }

  useEffect(() => {
    const getOpenAIData = async () => {
      if (formResponse) {
        setLoading(true)
        try {
          const prompt = generatePrompt()
          const responseData = await getData(prompt)
          setResponse(responseData)

          const newData = responseData
          const imagePromises =
            newData?.prompts.map(async (item) => {
              const res = await getImage(item.description)
              return res
            }) || []

          const imageResults = await Promise.all(imagePromises)
          setImages(imageResults.filter((image) => image !== null) as string[])
          let pdf = await createPdf()
          setPdfUrl(pdf ? pdf : '')
        } catch (error) {
          console.log('getOpenAIData:', error)
        } finally {
          setLoading(false)
        }
      }
    }

    getOpenAIData()
  }, [formResponse])

  const generatePrompt = (): string => {
    const prompt = `Write a short story for children based on the information. Add a title for the story, each chapter should have its own title, use proper formatting to separate the title from the content, feel free to create additional characters or whatever you want, Main Character: {Name: ${formResponse?.name}, Gender: ${formResponse?.gender}, Age: ${formResponse?.age}, Eyes color: ${formResponse?.eyesColor}, Hair color: ${formResponse?.hairColor}} Story: {Story genre: ${formResponse?.genre}, Story mood: ${formResponse?.mood}, Place of action: ${formResponse?.placeOfAction}, Additional informations: ${formResponse?.additionalInfo}} Use appropriate story length guidelines for different age groups, depending on the age of the child. The story should be no longer than a few pages. When you finish the story write prompts for dall-e api to create a picture for the cover of the book and each chapter based on the story. Each prompt should include a description of the protagonist (no name, just his characteristics), for each prompt add ",digital art" at the end. The photos should represent as best as possible what happened in the story. Do not add unnecessary comments, the output format is JSON. Split only into story and prompts in format - story: An object containing the title of the overall story and an array of chapters. - title: A string representing the title of the entire story.    - chapters: An array of objects, each representing a chapter in the story. - chapter_number: A string representing the chapter number or identifier.      - title: A string representing the title of the chapter.      - content: A string representing the content or narrative of the chapter.    - prompts: An array of objects, each representing a prompt related to the story.    - chapter: A string representing the chapter to which the prompt is associated.    - description: A string describing the prompt content.`
    return prompt
  }

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

  console.log(response)

  const createPdf = async () => {
    const pdf = new jsPDF()
    const maxWidth = pdf.internal.pageSize.getWidth()
    const maxHeight = pdf.internal.pageSize.getHeight()
    pdf.setProperties({
      title: response?.story.title,
    })

    if (typeof response?.story.title === 'string') {
      const imageDataPromises = images.map((image) => fetchImageFromAPI(image))
      const imageDataArray = await Promise.all(imageDataPromises)

      imageDataArray.forEach((imageData, index) => {
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
          const title = pdf.splitTextToSize(response?.story.title, 150)
          pdf.text(title, 50, 50)
        } else {
          const chapter = response.story.chapters[index - 1]
          const chapterTitle = pdf.splitTextToSize(chapter.title, 150)
          pdf.text(chapterTitle, 25, 50)
          pdf.setFontSize(18)
          const chapterContent = pdf.splitTextToSize(chapter.content, 150)
          pdf.text(chapterContent, maxWidth / 5, 100, { lineHeightFactor: 1.5 })
        }
      })

      const outString = pdf.output('datauristring', { filename: 'testPDF' })
      return outString
    } else {
      console.error('Title is not a string.')
    }
  }

  return (
    <div className="flex flex-col p-8 justify-center items-center">
      <div className="p-4 text-4xl">
        <p>Give us some information to create a unique story</p>
      </div>
      <Card className="p-2">
        {loading ? (
          <DNA />
        ) : (
          <BookForm data={formData} formDataResponse={setFormResponse} />
        )}
      </Card>
      <Card>
        {pdfUrl !== '' && (
          <iframe
            src={`${pdfUrl}#zoom=40`}
            id="pdf"
            width={1000}
            height={600}
          />
        )}
      </Card>
      <button onClick={() => createPdf()}>Test IMAGE</button>
    </div>
  )
}

export default Book
