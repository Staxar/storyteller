import React, { ChangeEvent, ReactNode, useState } from 'react'
import UserInputComponent from '../UserInputComponent'
import { UserCircleIcon } from '@heroicons/react/24/outline'
interface InputObject {
  value: string
  isValid: boolean
  name: string
  placeholder: string
  icon: ReactNode
}

interface FormInformations {
  [key: string]: InputObject
}

function useForm(initialState: FormInformations) {
  const [formInformations, setFormInformations] =
    useState<FormInformations>(initialState)

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    const { value } = event.target
    setFormInformations((prev) => ({
      ...prev,
      [key]: { ...prev[key], value },
    }))
  }

  return { formInformations, handleInputChange }
}

function PersonalInformationsForm() {
  const personalForm = useForm({
    childName: {
      value: '',
      isValid: true,
      name: 'Name',
      placeholder: 'eg. Tom',
      icon: <UserCircleIcon className="h-4 w-4" />,
    },
    gender: {
      value: '',
      isValid: true,
      name: 'Gender',
      placeholder: 'eg. male',
      icon: <UserCircleIcon className="h-4 w-4" />,
    },
    age: {
      value: '',
      isValid: true,
      name: 'Age',
      placeholder: 'eg. 7',
      icon: <UserCircleIcon className="h-4 w-4" />,
    },
    eyesColor: {
      value: '',
      isValid: true,
      name: 'Eyes color',
      placeholder: 'eg. blue',
      icon: <UserCircleIcon className="h-4 w-4" />,
    },
    hairColor: {
      value: '',
      isValid: true,
      name: 'Hair color',
      placeholder: 'eg. dark brown',
      icon: <UserCircleIcon className="h-4 w-4" />,
    },
  })

  const storyForm = useForm({
    genre: {
      value: '',
      isValid: true,
      name: 'Book genre',
      placeholder: 'eg. Fantasy',
      icon: <UserCircleIcon className="h-4 w-4" />,
    },
    mood: {
      value: '',
      isValid: true,
      name: 'Book mood',
      placeholder: 'eg. Humorous',
      icon: <UserCircleIcon className="h-4 w-4" />,
    },
    placeOfAction: {
      value: '',
      isValid: true,
      name: 'Place of action',
      placeholder: 'eg. Forest',
      icon: <UserCircleIcon className="h-4 w-4" />,
    },
    additionalInfo: {
      value: '',
      isValid: true,
      name: 'Additional informations',
      placeholder: 'eg. Magic items, characters...',
      icon: <UserCircleIcon className="h-4 w-4" />,
    },
  })

  return (
    <div className="flex flex-row gap-4">
      {['personal', 'book'].map((formType) => (
        <div key={formType} className="flex flex-col gap-4">
          {Object.entries(
            formType === 'personal'
              ? personalForm.formInformations
              : storyForm.formInformations
          ).map(([key, info]) => (
            <UserInputComponent
              key={key}
              icon={info.icon}
              placeholder={info.placeholder}
              value={info.value}
              onChangeHandler={(event) =>
                formType === 'personal'
                  ? personalForm.handleInputChange(event, key)
                  : storyForm.handleInputChange(event, key)
              }
              label={info.name}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default PersonalInformationsForm
