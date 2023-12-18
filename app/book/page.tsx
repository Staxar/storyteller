'use client'
import { useEffect, useState } from 'react'
import PersonalInformationsForm, {
  FormInformations,
} from '@/components/Form/PersonalInformationsForm'
import { Audio } from 'react-loader-spinner'

export default function Book() {
  const [response, setResponse] = useState<string | null>(null)
  const [personalFormData, setPersonalFormData] = useState<FormInformations>()
  const [loading, setLoading] = useState<boolean>(false)
  const [storyFormData, setStoryFormData] = useState<FormInformations>()

  const getData = async (message: string): Promise<string | null> => {
    try {
      const res = await fetch('http://localhost:3000/api/openai', {
        method: 'POST',
        body: JSON.stringify({
          messages: [{ role: 'user', content: message }],
        }),
        headers: { 'Content-Type': 'application/json' },
      })

      if (!res.ok) {
        throw new Error('Failed to fetch data!')
      }

      return res.text()
    } catch (error) {
      console.error('Error fetching data:', error)

      return null
    }
  }

  useEffect(() => {
    const getOpenAIData = async () => {
      if (personalFormData !== undefined && storyFormData !== undefined) {
        setLoading(true)
        try {
          const prompt = generatePrompt()
          await getData(prompt)
            .then((response) => setResponse(response))
            .finally(() => setLoading(false))
        } catch (error) {
          setLoading(false)
          console.log('getOpenAIData:', error)
        }
      }
    }
    getOpenAIData()
  }, [personalFormData, storyFormData])

  const generatePrompt = (): string => {
    const prompt = `Write a short story for children based on information. Feel free to create additional characters or anything you want, Main Character: {Name: ${personalFormData?.childName.value}, Gender: ${personalFormData?.gender.value}, Age: ${personalFormData?.age.value}, Eyes color: ${personalFormData?.eyesColor.value}, Hair color: ${personalFormData?.hairColor.value}} Story: {Story genre: ${storyFormData?.genre.value}, Story mood: ${storyFormData?.mood.value}, Place of action: ${storyFormData?.placeOfAction.value}, Additional informations: ${storyFormData?.additionalInfo.value}}`
    return prompt
  }

  return (
    <div className="h-full w-full flex flex-col items-center p-24">
      <div className="p-8">
        <p className="text-xl">Give us some information to create adventure</p>
      </div>

      <div className="p-4 w-[500px]">
        {loading ? (
          <Audio
            height="100"
            width="100"
            color="#4fa94d"
            ariaLabel="audio-loading"
            wrapperStyle={{}}
            wrapperClass="wrapper-class"
            visible={true}
          />
        ) : (
          <PersonalInformationsForm
            data={(personalFormData, storyFormData) => {
              setPersonalFormData(personalFormData)
              setStoryFormData(storyFormData)
            }}
          />
        )}
        <div className="h-full w-full">
          <p className="h-full w-full">{response}</p>
        </div>
      </div>
    </div>
  )
}
