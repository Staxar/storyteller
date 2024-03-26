import { OpenAIStream, StreamingTextResponse } from 'ai'
import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OpenAI_SecretKey })
// export const runtime = 'edge' // is that really needed?
export async function POST(req: Request) {
  const { messages } = await req.json()
  console.log('🚀 ~ POST ~ messages:', messages)

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    stream: true,
    messages,
  })

  const stream = OpenAIStream(response)
  return new StreamingTextResponse(stream)
}
