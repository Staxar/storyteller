import Image from 'next/image'
import backgroundImage from '../assets/bgImage.jpg'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-8 p-8">
      <section id="header" className="p-4 w-full ">
        <header className="flex flex-row gap-6 w-full justify-between">
          <div className="flex">
            <p>Logo</p>
          </div>
          <div className="flex gap-4">
            <p>Menu</p>
            <Link href={'about'}>About</Link>
            <Link href={'/design'}>Design</Link>
            <Link href={'/book'}>Book</Link>
          </div>
          <div className="flex">
            <p>User icon</p>
          </div>
        </header>
      </section>
      <section className="w-full h-full">
        <div className="flex flex-row justify-between">
          <div className="w-1/2">
            <p className="text-5xl">Let's start your kid journey!</p>
            <p className="text-4xl">Create your own personalized book!</p>
          </div>
        </div>
      </section>
      <section>
        <div className=""></div>
      </section>
      <section>
        <div className="">x</div>
      </section>
    </main>
  )
}
