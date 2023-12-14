import Image from 'next/image'
import backgroundImage from '../assets/bgImage.jpg'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-8 p-8">
      <section id="header" className="p-4 w-full ">
        <header className="flex flex-row gap-6 w-full">
          <p>Menu</p>
          <p>About</p>
          <p>Design</p>
          <Link href={'/book'}>Book</Link>
        </header>
      </section>
      <section className="w-full h-full">
        <div className="flex flex-row justify-between">
          <div className="w-1/2">
            <p className="text-5xl">Let's start your kid journey!</p>
          </div>
          <Image src={backgroundImage} alt="bg-image" className="w-1/2" />
        </div>
      </section>
      <section>
        <div className="">x</div>
      </section>
      <section>
        <div className="">x</div>
      </section>
    </main>
  )
}
