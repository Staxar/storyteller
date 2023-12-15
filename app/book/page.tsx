'use client'

import PersonalInformationsForm from '@/components/Form/PersonalInformationsForm'
import StoryInformationForm from '@/components/Form/StoryInformationForm'
import { GlobeAsiaAustraliaIcon } from '@heroicons/react/20/solid'
import {
  RocketLaunchIcon,
  UserCircleIcon,
  CloudIcon,
} from '@heroicons/react/24/outline'
import {
  BoltIcon,
  StarIcon,
  InformationCircleIcon,
  PhotoIcon,
} from '@heroicons/react/24/solid'

import { ChangeEvent, useState } from 'react'

interface Intrests {
  favoriesGames: string
  favoritesBooks: string
  favoriesMovies: string
  favoritesColors: string
  favoritesHobby: string
}

interface Characterisc {
  characterAnimals: string
  characterWords: string
  characterFeature: string
}
interface Places {
  favoriesHome: string
  favoriesOutside: string
  favoritesVacation: string
}

interface Dreams {
  dream: string
  ambitions: string
}

interface SpecialEvents {
  specialEvent: string
  specyficEvent: string
}

interface AdditionalInfo {
  additionalInformations: string
}

//to Change
interface Pictures {
  childPictureFace: string
  familyPicture: string
  homePicture: string
  favoritesPicture: string
}

export default function Book() {
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
        <PersonalInformationsForm />
      </div>
      <button
        title="Press me!"
        className="h-6 bg-cyan-500 rounded p-4 items-center justify-center text-center flex active:bg-slate-600"
        onClick={() => console.log('first')}
      >
        Press me!
      </button>
    </div>
  )
}

//<label className="p-4">Child name:</label>
//<input className="p-2 text-black border-1 " type="text" value={personalInformation.childName} onChange={handleInputChange} name='childName' placeholder="eg. Tom"/>
