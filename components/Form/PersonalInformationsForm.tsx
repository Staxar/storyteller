'use client'

import React, { ChangeEvent, ReactNode, useCallback, useState } from 'react'
import UserInputComponent from '../UserInputComponent'
import { UserCircleIcon } from '@heroicons/react/24/outline'
interface InputObject {
  value: string
  isValid: boolean
  name: string
  placeholder: string
  icon: ReactNode
}

export interface FormInformations {
  [key: string]: InputObject
}

interface PersonalForm {
  data: (Personaldata: FormInformations, Storydata: FormInformations) => void
  // getOpenAI: () => void
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
      [key]: { ...prev[key], value, isValid: validateInput(key, value) },
    }))
  }

  const validateInput = (key: string, value: string): boolean => {
    if (key === 'age') {
      const age = parseInt(value, 10)
      return !isNaN(age) && age > 0
    }
    return true
  }

  return { formInformations, handleInputChange }
}

function PersonalInformationsForm({ data }: PersonalForm) {
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

  async function buttonHandler() {
    Object.keys(personalForm.formInformations).forEach((key) => {
      const info = personalForm.formInformations[key]
      personalForm.formInformations[key].isValid = info.value.trim() !== ''
    })
    Object.keys(storyForm.formInformations).forEach((key) => {
      const info = storyForm.formInformations[key]
      storyForm.formInformations[key].isValid = info.value.trim() !== ''
    })
    const personalFormValid = Object.values(
      personalForm.formInformations
    ).every((info) => info.isValid)

    const storyFormValid = Object.values(storyForm.formInformations).every(
      (info) => info.isValid
    )
    if (personalFormValid && storyFormValid) {
      data(personalForm.formInformations, storyForm.formInformations)
    } else {
      console.error(
        'Form validation failed. Please fill in all required inputs.'
      )
    }
  }

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
              isValid={info.isValid}
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
      <button
        title="Press me!"
        className="box-content h-6 bg-cyan-500 rounded p-4 items-center justify-center text-center flex active:bg-slate-600"
        onClick={buttonHandler}
      >
        Press me!
      </button>
    </div>
  )
}

export default PersonalInformationsForm
