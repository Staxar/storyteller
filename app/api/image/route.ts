import { NextResponse } from 'next/server'
import axios from 'axios'
import { NextApiResponse } from 'next'

export async function GET(res: NextApiResponse, req: Request) {
  const url =
    'https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg'
  const oldUrl =
    'https://oaidalleapiprodscus.blob.core.windows.net/private/org-qHFRKeO2CgyIFjnT9eJhf34F/user-roZO4rRMe6HpBEAPcFyMPcUv/img-CCVMDUbsIDwNS2uWwWiDcj93.png?st=2024-01-08T12%3A33%3A11Z&se=2024-01-08T14%3A33%3A11Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-01-08T10%3A01%3A00Z&ske=2024-01-09T10%3A01%3A00Z&sks=b&skv=2021-08-06&sig=HDu6tILdxIkqB6YMH42RTi8dA%2BA5eFXvMUvF0AVB9EM%3D'
  try {
    const response = await axios.get(oldUrl, { responseType: 'arraybuffer' })

    // Assuming you want to check if the request was successful
    if (response.status === 200) {
      // Return the image data as the response
      return NextResponse.json(response.data)
    } else {
      // Handle other status codes as needed
      return NextResponse.json({
        message: `Request failed with status ${response.status}`,
      })
    }
  } catch (err) {
    console.error(err)
    return NextResponse.json({ message: 'Internal server error' })
  }
}
