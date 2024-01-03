import { NextApiResponse } from 'next'
import { NextResponse } from 'next/server'
import OpenAI from 'openai'

type ResponseData = {
  url?: string | undefined
  error?: string
}

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OpenAI_SecretKey,
})

export async function POST(
  request: Request,
  response: NextApiResponse<ResponseData>
) {
  const { messages } = await request.json()

  try {
    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt: messages[0].prompt,
      size: '1024x1024',
      quality: 'standard',
      n: 1,
    })
    const imageUrl = response.data[0].url

    return NextResponse.json({ data: imageUrl })
  } catch (error) {
    return NextResponse.json({ error })
  }
}
