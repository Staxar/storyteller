import React, { ChangeEvent, useState } from 'react'
import UserInputComponent from '../UserInputComponent'

interface InputObject {
  value: string
  isValid: boolean
  name: string
  placeholder: string
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
    },
    gender: {
      value: '',
      isValid: true,
      name: 'Gender',
      placeholder: 'eg. male',
    },
    age: { value: '', isValid: true, name: 'Age', placeholder: 'eg. 7' },
    eyesColor: {
      value: '',
      isValid: true,
      name: 'Eyes color',
      placeholder: 'eg. blue',
    },
    hairColor: {
      value: '',
      isValid: true,
      name: 'Hair color',
      placeholder: 'eg. dark brown',
    },
  })

  const storyForm = useForm({
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
