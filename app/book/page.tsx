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
import Image from 'next/image'

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
  const [response, setResponse] = useState<StoryObject | null>(null)
  const [images, setImages] = useState<string[]>([])
  const [formResponse, setFormResponse] = useState<formObject | undefined>()

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
    setLoading(true)

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
    } finally {
      setLoading(false)
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
        } catch (error) {
          console.log('getOpenAIData:', error)
        } finally {
          setLoading(false)
        }
      }
    }

    getOpenAIData()
  }, [formResponse])

  const [pdfUrl, setPdfUrl] = useState('')

  const generatePrompt = (): string => {
    const prompt = `Write a short story for children based on the information. Add a title for the story, each chapter should have its own title, use proper formatting to separate the title from the content, feel free to create additional characters or whatever you want, Main Character: {Name: ${formResponse?.name}, Gender: ${formResponse?.gender}, Age: ${formResponse?.age}, Eyes color: ${formResponse?.eyesColor}, Hair color: ${formResponse?.hairColor}} Story: {Story genre: ${formResponse?.genre}, Story mood: ${formResponse?.mood}, Place of action: ${formResponse?.placeOfAction}, Additional informations: ${formResponse?.additionalInfo}} Use appropriate story length guidelines for different age groups, depending on the age of the child. The story should be no longer than a few pages. When you finish the story write prompts for dall-e api to create a picture for the cover of the book and each chapter based on the story. Each prompt should include a description of the protagonist (no name, just his characteristics), for each prompt add ",digital art" at the end. The photos should represent as best as possible what happened in the story. Do not add unnecessary comments, the output format is JSON. Split only into story and prompts in format - story: An object containing the title of the overall story and an array of chapters. - title: A string representing the title of the entire story.    - chapters: An array of objects, each representing a chapter in the story. - chapter_number: A string representing the chapter number or identifier.      - title: A string representing the title of the chapter.      - content: A string representing the content or narrative of the chapter.    - prompts: An array of objects, each representing a prompt related to the story.    - chapter: A string representing the chapter to which the prompt is associated.    - description: A string describing the prompt content.`
    return prompt
  }

  const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
    const binary = String.fromCharCode.apply(
      null,
      new Uint8Array(buffer) as unknown as number[]
    )
    return btoa(binary)
  }
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

  const createpdf = async () => {
    const text = 'Your text here'
    const pdf = new jsPDF()
    pdf.text(text, 10, 10)

    const imageData = await fetchImageFromAPI()
    if (imageData !== null) {
      pdf.addImage(imageData, 'JPEG', 10, 30, 100, 75)
      pdf.save('output.pdf')
    } else {
      console.error('Image data is null.')
    }
  }

  const generateImage = async () => {
    try {
      const response = await fetch('/api/oneimage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
      if (!response.ok) {
        throw new Error('Failed to fetch image!')
      }

      const data = await response.json()
      const dataString = data.data.toString()
      console.log(dataString)
    } catch (error) {
      console.log("Something wen't wrong!", error)
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

        {pdfUrl && (
          <iframe
            title="Generated PDF"
            src={pdfUrl}
            width="600"
            height="400"
            style={{ border: '1px solid #ddd' }}
          />
        )}
      </Card>
      <button onClick={() => createpdf()}>Press me!</button>
    </div>
  )
}

export default Book
