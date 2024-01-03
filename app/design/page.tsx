'use client'
import Image from 'next/image'
import OpenAI from 'openai'
import { useEffect, useState } from 'react'
import { Audio } from 'react-loader-spinner'

export default function Design() {
  const [response, setResponse] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const getImage = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/dalle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
      const data = await res.json()
      const dataString = data.data.toString()
      setResponse(dataString)
    } catch (error) {
      console.log('Error fetching image: ', error)
    }
    setLoading(false)
  }
  return (
    <div className="h-full w-full flex flex-col items-center p-24">
      <div className="p-8">
        <p className="text-xl">Give us some information to create adventure</p>
      </div>
      <div className="flex">
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
          <div>NO loading</div>
        )}
        {response !== '' ? (
          <Image src={response} width={500} height={500} alt="image" />
        ) : (
          <div>No image</div>
        )}
        <button onClick={() => getImage()}>Generate image!</button>
      </div>
    </div>
  )
}
