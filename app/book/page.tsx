'use client'
import { ChangeEvent, useState } from "react"

interface PersonalInformations {
    childName: string,
    gender: string,
    dateBirth: string,
    eyesColor: string,
    hairColor: string,
    height: string
}

interface Intrests {
    favoriesGames: string,
    favoritesBooks: string,
    favoriesMovies: string,
    favoritesColors: string,
    favoritesHobby: string
}

interface Characterisc {
    characterAnimals: string,
    characterWords: string,
    characterFeature: string
}
interface Places {
    favoriesHome: string,
    favoriesOutside: string,
    favoritesVacation: string
}

interface Dreams {
    dream: string, 
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
    childPictureFace: string,
    familyPicture: string,
    homePicture: string,
    favoritesPicture: string
}


export default function Book() {

    const [personalInformation, setPersonalInformaton] = useState<PersonalInformations>({childName: '', gender: '', dateBirth: '', eyesColor: '', hairColor: '', height: ''})

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setPersonalInformaton((prevInfo) => ({
          ...prevInfo,
          [name]: value,
        }));
    }

    return (
    <div className="flex flex-col items-center p-24">
        <div className="p-8">
            <p className="text-xl">Give us some information to create adventure</p>
        </div>
        <div className="">
            <form className="flex flex-col">
                <label className="p-4">Child name:</label>
                <input className="p-2 text-black border-1 " type="text" value={personalInformation.childName} onChange={handleInputChange} name='childName' placeholder="eg. Tom"/>
                <label className="p-4">Gender:</label>
                <input className="p-2 text-black border-1 " type="text" value={personalInformation.gender} onChange={handleInputChange} name='gender' placeholder="eg. male"/>
                <label className="p-4">Date Birth:</label>
                <input className="p-2 text-black border-1 " type="text" value={personalInformation.dateBirth} onChange={handleInputChange} name='dateBirth' placeholder="eg. 2000-12-12"/>
                <label className="p-4">Eyes Color:</label>
                <input className="p-2 text-black border-1 " type="text" value={personalInformation.eyesColor} onChange={handleInputChange} name='eyesColor' placeholder="eg. blue"/>
                <label className="p-4">Hair Color:</label>
                <input className="p-2 text-black border-1 " type="text" value={personalInformation.hairColor} onChange={handleInputChange} name='hairColor' placeholder="eg. brown"/>
                <label className="p-4">Height:</label>
                <input className="p-2 text-black border-1 " type='text' value={personalInformation.height} onChange={handleInputChange} name='height' placeholder="eg. 183"/>
            </form>
        </div>
    </div>
    )


}