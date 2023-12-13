import React, { ChangeEvent, useState } from 'react'
import UserInputComponent from '../UserInputComponent'

interface inputObject {
  value: string
  isValid: boolean
  name: string
  placeholder: string
}

interface PersonalInformations {
  [key: string]: inputObject
}

function PersonalInformationsForm() {
  const [personalInformations, setPersonalInformations] =
    useState<PersonalInformations>({
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
      age: {
        value: '',
        isValid: true,
        name: 'Age',
        placeholder: 'eg. 7',
      },
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
      height: {
        value: '',
        isValid: true,
        name: 'Height',
        placeholder: 'eg. 183',
      },
    })

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    const { value } = event.target

    setPersonalInformations((prev) => ({
      ...prev,
      [key]: { ...prev[key], value },
    }))
  }
  return (
    <div className="flex flex-col gap-4">
      {Object.entries(personalInformations).map(([key, info]) => (
        <UserInputComponent
          placeholder={info.placeholder}
          value={info.value}
          onChangeHandler={(event) => handleInputChange(event, key)}
          label={info.name}
        />
      ))}
    </div>
  )
}

export default PersonalInformationsForm
