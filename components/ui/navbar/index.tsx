/* eslint-disable @next/next/no-img-element */

import { Disclosure, } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import ActiveLink from '../link';
import { useAccount, useNetwork } from '@hooks/web3';
import Walletbar from './Walletbar';

const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'NFT', href: '/nft', current: false },
  { name: 'Create', href: '/nft/create', current: false },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const { account } = useAccount();
  const { network } = useNetwork();
  return (
    <Disclosure as="nav" className="bg-white">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="relative flex items-center justify-between h-16">

              {/* mobile icon */}
              <div className="absolute inset-y-0 left-0 flex items-center lg:hidden md:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              {/* menu navbar */}
              <div className="flex-1 flex items-center lg:justify-between md:justify-between sm:items-stretch sm:justify-between">
                {/* Left section with Home and NFT */}
                <div className="items-center hidden lg:block md:block sm:hidden sm:ml-6">
                  <a href="/" className="text-gray-800 hover:text-black px-3 py-2 rounded-md text-sm font-medium">
                    Home
                  </a>
                  <a href="/nft" className="ml-4 text-gray-800 hover:text-black px-3 py-2 rounded-md text-sm font-medium">
                    NFT
                  </a>
                </div>

                {/* Center section with logo */}
                <div className="items-center hidden lg:block md:block sm:hidden sm:ml-6">
                  <span className="text-black text-5xl font-normal font-['Italiana']">Luxsy</span>
                </div>

                {/* profile */}
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <a href="#" className="text-gray-800 hover:text-black">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h18l-2 13H5L3 3z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 21a2 2 0 110-4 2 2 0 010 4zm-8 0a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                  </a>

                  <div className="text-gray-300 self-center mr-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-purple-100 text-purple-800">
                      <svg className="-ml-0.5 mr-1.5 h-2 w-2 text-indigo-400" fill="currentColor" viewBox="0 0 8 8">
                        <circle cx={4} cy={4} r={3} />
                      </svg>
                      {network.isLoading ?
                        "Loading...." :
                        account.isInstalled ?
                          network.data :
                          "Install Web 3 Wallet"
                      }
                    </span>
                  </div>

                  <Walletbar
                    isInstalled={account.isInstalled}
                    isLoading={account.isLoading}
                    connect={account.connect}
                    account={account.data}
                  />
                </div>
              </div>
            </div>
          </div>
          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>)
}