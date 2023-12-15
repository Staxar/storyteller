import { OpenAIStream, StreamingTextResponse } from 'ai'
import { NextResponse } from 'next/server'
import OpenAI from 'openai'

export async function GET(request: Request) {
  return NextResponse.json({ message: 'askdasodj' })
}

const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OpenAI_SecretKey })

export async function POST(req: Request) {
  const { messages } = await req.json()
  console.log('SERVER:::: ', messages)
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages,
  })

  console.log('RESPONSE:::: ', response)

  const stream = OpenAIStream(response)

  return new StreamingTextResponse(stream)
}
