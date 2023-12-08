'use client'
import { ChangeEvent, useState } from "react"


export default function Book() {

    const [childName, setChildName] = useState<string>('')

    return (
    <div className="flex flex-col items-center p-24">
        <div className="p-8">
            <p className="text-xl">Give us some information to create adventure</p>
        </div>
        <div className="">
            <form>
                <label className="p-4">Child name:</label>
                <input className="p-2 text-black border-1 " type="text" value={childName} onChange={(e: ChangeEvent<HTMLInputElement>) => setChildName(e.target.value)}/>
            </form>
        </div>
    </div>
    )


}