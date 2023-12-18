'use client'
import PersonalInformationsForm, {
  FormInformations,
} from '@/components/Form/PersonalInformationsForm'
import { useState } from 'react'

async function getData(message: string) {
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

export default function Book() {
  const [response, setResponse] = useState<string | undefined | null>(null)
  const [promt, setPrompt] = useState<string>('')
  const [personalFormData, setPersonalFormData] = useState<FormInformations>()
  const [storyFormData, setStoryFormData] = useState<FormInformations | null>(
    null
  )
  async function getOpenAIData() {
    let prompt = generatePrompt()
    await getData(prompt)
      .then((res) => setResponse(res))
      .catch((error) => console.log('getOpenAIData: ', error))
  }

  function generatePrompt() {
    console.log(personalFormData?.childName.value)
    const prompt = `Write a short story for childrens depends on information about main character and book. Feel free to create additional charactes or anything you want, Main Character: {Name: ${personalFormData?.childName.value}, Gender: ${personalFormData?.gender.value}, Age: ${personalFormData?.age.value}, Eyes color: ${personalFormData?.eyesColor.value}, Hair color: ${personalFormData?.hairColor.value}} Book: {Book genre: ${storyFormData?.genre.value}, Book mood: ${storyFormData?.mood.value}, Place of action: ${storyFormData?.placeOfAction.value}, Additional informations: ${storyFormData?.additionalInfo.value}}`
    return prompt
  }

  console.log(response)
  return (
    <div className="h-full w-full flex flex-col items-center p-24">
      <div className="p-8">
        <p className="text-xl">Give us some information to create adventure</p>
      </div>

      {/* <div className="h-12 flex flex-row gap-6 justify-center w-1/2">
        <UserCircleIcon />
        <RocketLaunchIcon />
      </div> */}

      <div className="p-4 w-[500px] ">
        <PersonalInformationsForm
          data={(personalFormData, storyFormData) => {
            setPersonalFormData(personalFormData),
              setStoryFormData(storyFormData)
          }}
          getOpenAI={getOpenAIData}
        />
      </div>
    </div>
  )
}

//<label className="p-4">Child name:</label>
//<input className="p-2 text-black border-1 " type="text" value={personalInformation.childName} onChange={handleInputChange} name='childName' placeholder="eg. Tom"/>
