import Image from 'next/image'
import backgroundImage from '../assets/bgImage.jpg'
import Link from 'next/link'
import NavbarComponent from '@/components/NavbarComponent'

export default function Home() {
  return (
    <>
      <NavbarComponent />

      <section className="">
        <div className="flex max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:pt-28">
          <div className="place-self-center ">
            <h1 className="max-w-2xl mb-4 text-4xl text-purple-700 font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl">
              Let's create amazing adventure
            </h1>
            <div className="space-y-4 sm:flex sm:space-y-0 sm:space-x-4"></div>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">RIGHT</div>
        </div>
      </section>
    </>
  )
}
