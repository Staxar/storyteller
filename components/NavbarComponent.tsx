import { LogOut, TvIcon } from 'lucide-react'
import { DropdownMenuAvatarMenu } from './DropDownAvatarMenu'
import Link from 'next/link'

interface NavbarLinkItems {
  path: string
  name: string
}

const NavbarLinktems: NavbarLinkItems[] = [
  { path: '/', name: 'Home' },
  { path: 'book', name: 'Book' },
  { path: 'about-us', name: 'About' },
  { path: 'contact', name: 'Contact' },
]

function NavbarComponent() {
  return (
    <header className="fixed w-full">
      <nav className="py-4 dark:bg-gray-900">
        <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto text-white">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            StoryTeller
          </h3>
          <div className="flex items-center lg:order-2 lg:hidden">
            <DropdownMenuAvatarMenu />
          </div>
          <div
            className="items-center justify-between hidden w-full lg:flex lg:w-auto lg:order-1 lg:m-auto"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              {NavbarLinktems.map((item, index) => {
                return (
                  <Link
                    href={item.path}
                    aria-current="page"
                    className="block py-2 pl-3 pr-4 text-white border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                    key={index}
                  >
                    <li>{item.name}</li>
                  </Link>
                )
              })}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default NavbarComponent
