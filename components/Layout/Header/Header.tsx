/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import { UserIcon, CogIcon, LogoutIcon, SearchIcon } from '@heroicons/react/solid'

interface NavLink {
  name: string
  href: string
  current: false
}

const navigation: NavLink[] = [
  { name: 'Home', href: '/', current: true },
  { name: 'Collections', href: 'collections', current: false },
  { name: 'My List', href: 'list', current: false },
]

interface UserMenuItem {
  name: string
  icon: JSX.Element
  href: string
}

const userMenuNavigation: UserMenuItem[] = [
  { name: 'Profile', icon: (props) => <UserIcon {... props}/>,  href: 'profile'},
  { name: 'Settings', icon: (props) => <CogIcon {... props}/>,  href: 'settings'},
  { name: 'Log out', icon: (props) => <LogoutIcon {... props}/>,  href: 'logout'},
]

function classNames(...classes): string[] {
  return classes.filter(Boolean).join(' ')
}

function NextLink(props): JSX.Element {
  const { href, children, ...rest } = props;
  return (
    <Link href={href}>
      <a {...rest}>{children}</a>
    </Link>
  );
}

const SearchBar = (): JSX.Element => (
  <div className="flex items-center text-gray-600 rounded-full bg-white shadow-xl">
    <input className="rounded-l-full w-full py-4 px-6 leading-tight text-sm focus:outline-none"
      type="search" name="search" placeholder="Search" />
    <button type="submit" className="pr-3 pl-0">
      <SearchIcon className="h-8 w-8 bg-pink-800 rounded-full text-white p-1" />
    </button>
  </div>
)

export default function Header(): JSX.Element {
  return (
    <Disclosure as="nav" className="bg-pink-800 fixed w-full">
      {({ open }) => (
        <>
          <div className="mx-auto px-2 sm:px-6 lg:px-8 flex flex-col">
            <div className="flex items-center justify-between w-full">
              <div className="flex">
                <div className=" inset-y-0 left-0 flex items-center ">
                  {/* Hamburger menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex items-center justify-center ml-4">
                  <div className="flex items-center">
                    <Image
                      width={50}
                      height={50}
                      src="/images/logos/xcurator_logo_square.png"
                      alt="xCurator"
                    />
                  </div>
                </div>
              </div>
              <div className="py-2 hidden sm:block flex-grow max-w-3xl mx-5">
                <SearchBar/>
              </div>
              <div className="flex items-center pr-2 sm:pr-0">
                {/* Profile dropdown */}
                <Menu as="div" className="ml-3 relative">
                  {({ open }) => (
                    <>
                      <div>
                        <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                          <span className="sr-only">Open user menu</span>
                          { /* TODO: Use next.js Image component here later, and load actual user profile pic (obviously) */ }
                          <img
                            className="h-8 w-8 rounded-full"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        show={open}
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items
                          static
                          className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                        >
                          {
                            userMenuNavigation.map((userMenuItem) => (
                              <Menu.Item key={userMenuItem.name}>
                              {
                                ({ active }) => (
                                  <NextLink href={userMenuItem.href} className={classNames(active ? 'bg-gray-100' : '', "flex items-center px-4 py-2 text-sm text-gray-700")}>
                                    {userMenuItem.icon({className: 'h-5 w-5'})}
                                    <span className="ml-2"
                                    >
                                      {userMenuItem.name}
                                    </span>
                                  </NextLink>
                                )
                              }
                              </Menu.Item>
                            ))
                          }
                        </Menu.Items>
                      </Transition>
                    </>
                  )}
                </Menu>
              </div>
            </div>
            <div className="sm:hidden p-2">
              <SearchBar/>
            </div>
          </div>

          <Disclosure.Panel className="">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-pink-900 text-white' : 'text-gray-300 hover:bg-pink-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
