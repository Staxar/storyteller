import Image from 'next/image'
import backgroundImage from '../assets/bgImage.jpg'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-8 p-8">
      <section id='header' className='p-4 w-full'>
        <header className='flex flex-row gap-6 w-full'>  
            <p>Menu</p>
            <p>About</p>
            <p>Design</p>
            <Link href={"/book"}>Book</Link>
          </header> 
      </section>
      <section className='w-full h-full'>
        <div className="flex flex-row w-full justify-between">
          <div className="flex-1/2 w-full left-0">
            <p className='text-2xl'>Your child would adore this book</p>
          </div>
          <div className="flex-1/2 w-full"><Image title='background' src={backgroundImage} alt='bgImage' style={{borderTopRightRadius: 50, borderTopLeftRadius: 150, borderBottomLeftRadius: 25, borderBottomRightRadius: 140}}/></div>
        </div>
      </section>
    </main>
  )
}
