import { ChangeEvent, useState } from 'react'
import UserInputComponent from '../UserInputComponent'

interface inputObject {
  value: string
  isValid: boolean
  name: string
  placeholder: string
}

interface StoryInformations {
  [key: string]: inputObject
}

function StoryInformationForm() {
  const [storyInformations, setStoryInformations] = useState<StoryInformations>(
    {
      genre: {
        value: '',
        isValid: true,
        name: 'Book genre',
        placeholder: 'eg. Fantasy',
      },
      mood: {
        value: '',
        isValid: true,
        name: 'Book mood',
        placeholder: 'eg. Humorous',
      },
      placeOfAction: {
        value: '',
        isValid: true,
        name: 'Place of action',
        placeholder: 'eg. Forest',
      },
      additionalInfo: {
        value: '',
        isValid: true,
        name: 'Additional informations',
        placeholder: 'eg. Magic items, characters...',
      },
    }
  )

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    const { value } = event.target

    setStoryInformations((prev) => ({
      ...prev,
      [key]: { ...prev[key], value },
    }))
  }

  return (
    <div className="flex flex-col gap-4">
      {Object.entries(storyInformations).map(([key, info]) => (
        <UserInputComponent
          key={key}
          placeholder={info.placeholder}
          value={info.value}
          onChangeHandler={(event) => handleInputChange(event, key)}
          label={info.name}
        />
      ))}
    </div>
  )
}

export default StoryInformationForm
