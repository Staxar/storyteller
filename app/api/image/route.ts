import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

export async function GET(req: NextRequest, { params }: any) {
  const url = req.nextUrl.searchParams.get('url')
  if (url)
    try {
      const response = await axios.get(url, { responseType: 'arraybuffer' })

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
      return NextResponse.json({ message: 'Internal server error' })
    }
}
