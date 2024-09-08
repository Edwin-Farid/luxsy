/* eslint-disable @next/next/no-img-element */

import type { NextPage } from 'next'
import { BaseLayout } from '@ui'

import { Nft } from '@_types/nft';
import { useOwnedNfts } from '@hooks/web3';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useWeb3 } from '@providers/web3';

const tabs = [
  { name: 'Your Collection', href: '#', current: true },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const Profile: NextPage = () => {
  const { ethereum } = useWeb3();
  const { nfts } = useOwnedNfts();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [shippingMeta, setShippingMeta] = useState({
    deliveryNumber: '',
    status: '',
    withdraw: '',
    owner: '',
  });

  const [activeNft, setActiveNft] = useState<Nft>();

  useEffect(() => {
    if (nfts.data && nfts.data.length > 0) {
      setActiveNft(nfts.data[0]);
      getSignedData();
    }

    return () => setActiveNft(undefined);
  }, [nfts.data, shippingMeta.deliveryNumber])

  const getSignedData = async () => {
    const accounts = await ethereum?.request({ method: "eth_requestAccounts" }) as string[];
    const account = accounts[0];
    setShippingMeta({ ...shippingMeta, owner: account });
  }

  const handlePopupToggle = () => {
    const url = process.env.NODE_ENV === "production" ? process.env.LUXSY_ADMIN_URL : "http://127.0.0.1:8000/api";

    axios.get(url + '/shipment', {
      params: { tokenId: activeNft?.tokenId, owner: shippingMeta.owner },
    })
      .then(response => {
        setShippingMeta(response.data.data.data[0]);

      })
      .catch(error => {
        console.error('Error fetching shipments:', error);
      });


    setIsPopupVisible(!isPopupVisible);
  };
  return (
    <BaseLayout>
      <div className="pb-16 pt-8 bg-white overflow-hidden min-h-screen font-sans">
        <div className="max-w-7xl mx-auto px-4 space-y-8 sm:px-6 lg:px-8">
          <div className="h-full flex">
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="flex-1 flex items-stretch overflow-hidden">
                <main className="flex-1 overflow-y-auto">
                  <div className="pt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex">
                      <h1 className="flex-1 text-2xl text-gray-900 font-italiana">Your NFTs</h1>
                    </div>
                    <div className="mt-3 sm:mt-2">
                      <div className="hidden sm:block">
                        <div className="flex items-center border-b border-gray-200">
                          <nav className="flex-1 -mb-px flex space-x-6 xl:space-x-8" aria-label="Tabs">
                            {tabs.map((tab) => (
                              <a
                                key={tab.name}
                                href={tab.href}
                                aria-current={tab.current ? 'page' : undefined}
                                className={classNames(
                                  tab.current
                                    ? 'border-[#776B5D] text-[#4F473E]'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                                  'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
                                )}
                              >
                                {tab.name}
                              </a>
                            ))}
                          </nav>
                        </div>
                      </div>
                    </div>

                    <section className="mt-8 pb-16" aria-labelledby="gallery-heading">
                      <ul
                        role="list"
                        className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                        {(nfts.data as Nft[]).map((nft) => (
                          <li
                            key={nft.tokenId}
                            onClick={() => setActiveNft(nft)}
                            className="relative">
                            <div
                              className={classNames(
                                nft.tokenId === activeNft?.tokenId
                                  ? 'ring-2 ring-offset-2 ring-[#776B5D]'
                                  : 'focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-[#776B5D]',
                                'group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 overflow-hidden'
                              )}>
                              <img
                                src={nft.meta.image}
                                alt=""
                                className={classNames(
                                  nft.tokenId === activeNft?.tokenId ? '' : 'group-hover:opacity-75',
                                  'object-cover pointer-events-none'
                                )}
                              />
                              <button type="button" className="absolute inset-0 focus:outline-none">
                                <span className="sr-only">View details for {nft.meta.name}</span>
                              </button>
                            </div>
                            <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">
                              {nft.meta.name}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </section>
                  </div>
                </main>

                {/* Details sidebar */}
                <aside className="hidden w-96 bg-white p-8 border-l border-gray-200 overflow-y-auto lg:block">
                  {activeNft &&
                    <div className="pb-16 space-y-6">
                      <div>
                        <div className="block w-full aspect-w-10 aspect-h-7 rounded-lg overflow-hidden">
                          <img src={activeNft.meta.image} alt="" className="object-cover" />
                        </div>
                        <div className="mt-4 flex items-start justify-between">
                          <div>
                            <h2 className="text-lg font-medium text-gray-900">
                              <span className="sr-only">Details for</span>
                              {activeNft.meta.name}
                            </h2>
                            <p className="text-sm font-medium text-gray-500">{activeNft.meta.artistName}</p>
                            <div className="pt-3 text-sm font-medium">
                              <p className="text-gray-900 text-left">{activeNft.meta.description}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Information</h3>
                        <dl className="mt-2 border-t border-b border-gray-200 divide-y divide-gray-200">
                          <div className="py-3 flex justify-between text-sm font-medium">
                            <p className="text-sm font-medium text-gray-500">Year:</p>
                            <p className="text-gray-900 text-right">{activeNft.meta.createdAt}</p>
                          </div>
                          {activeNft.meta.attributes.map((attr) => (
                            <div key={attr.traitType} className="py-3 flex justify-between text-sm font-medium">
                              <dt className="text-gray-500">{attr.traitType}: </dt>
                              <dd className="text-gray-900 text-right">{attr.value}</dd>
                            </div>
                          ))}
                          <div className="py-3 flex justify-between text-sm font-medium">
                            <p className="text-sm font-medium text-gray-500">Width x Height:</p>
                            <p className="text-gray-900 text-right">{activeNft.meta.width + ' Cm x ' + activeNft.meta.height + ' Cm'}</p>
                          </div>
                        </dl>
                      </div>

                      <div className="flex">
                        <button
                          // onClick={handlePopupToggle(activeNft.tokenId)}
                          onClick={handlePopupToggle}
                          type="button"
                          className="flex-1 bg-[#776B5D] w-full  py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-[#4F473E] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#776B5D]">
                          Check shipping
                        </button>
                        {/* <button
                        disabled={activeNft.isListed}
                        onClick={() => {
                          nfts.listNft(
                            activeNft.tokenId,
                            activeNft.price
                          )
                        }}
                        type="button"
                        className="disable: text- gray-400 disabled:cursor-not-allowed flex-1 ml-3 bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#776B5D]">
                        {activeNft.isListed ? "Nft is listed" : "List Nft"}
                      </button> */}
                      </div>
                    </div>
                  }
                </aside>

                {/* Main modal */}
                {isPopupVisible && (
                  <div tabIndex={-1} aria-hidden="true" className={`fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50 transition-opacity duration-300 ${isPopupVisible ? 'opacity-100' : 'opacity-0'}`}>
                    <div className={`relative p-4 w-full max-w-md max-h-full transition-transform duration-300 transform ${isPopupVisible ? 'translate-y-0' : 'translate-y-[-100px]'
                      }`}>
                      {/* Modal content */}
                      <div className="relative bg-white rounded-lg shadow">
                        {/* Modal header */}
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                          <h3 className="text-lg font-semibold text-gray-900">
                            Status
                          </h3>
                          <button
                            type="button"
                            onClick={handlePopupToggle}
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center ">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                          </button>
                        </div>

                        {/* Modal body */}
                        <div className="p-4 md:p-5">
                          <ol className="relative border-l border-gray-200 ms-3.5 mb-4 md:mb-5">
                            {/* Timeline Item 1 */}
                            <li className="mb-10 ms-8">
                              <span className="absolute flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full -start-3.5 ring-8 ring-white">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path fillRule="evenodd" clipRule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM8 13C8.55228 13 9 12.5523 9 12C9 11.4477 8.55228 11 8 11C7.44772 11 7 11.4477 7 12C7 12.5523 7.44772 13 8 13ZM12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13ZM16 13C16.5523 13 17 12.5523 17 12C17 11.4477 16.5523 11 16 11C15.4477 11 15 11.4477 15 12C15 12.5523 15.4477 13 16 13Z" fill="#1C274C" />
                                </svg>
                              </span>
                              <h3 className="flex items-start mb-1 text-lg font-semibold text-gray-900 justify-between">
                                Approve Transaction
                                {/* <span className="bg-[#DDF6E8] text-[#28C76F] text-sm font-medium mr-2 px-2.5 py-0.5 rounded">Done</span> */}
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path fillRule="evenodd" clipRule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM16.0303 8.96967C16.3232 9.26256 16.3232 9.73744 16.0303 10.0303L11.0303 15.0303C10.7374 15.3232 10.2626 15.3232 9.96967 15.0303L7.96967 13.0303C7.67678 12.7374 7.67678 12.2626 7.96967 11.9697C8.26256 11.6768 8.73744 11.6768 9.03033 11.9697L10.5 13.4393L12.7348 11.2045L14.9697 8.96967C15.2626 8.67678 15.7374 8.67678 16.0303 8.96967Z" fill="#1C274C" />
                                </svg>
                              </h3>
                            </li>
                            {/* Add more timeline items here */}
                            {/* Timeline Item 1 */}
                            <li className="mb-10 ms-8">
                              {(shippingMeta.status === 'pending') ? (<span className="absolute flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full -start-3.5 ring-8 ring-white">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path opacity="0.5" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#1C274C" />
                                  <path d="M8 13C8.55228 13 9 12.5523 9 12C9 11.4477 8.55228 11 8 11C7.44772 11 7 11.4477 7 12C7 12.5523 7.44772 13 8 13Z" fill="#1C274C" />
                                  <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" fill="#1C274C" />
                                  <path d="M16 13C16.5523 13 17 12.5523 17 12C17 11.4477 16.5523 11 16 11C15.4477 11 15 11.4477 15 12C15 12.5523 15.4477 13 16 13Z" fill="#1C274C" />
                                </svg>
                              </span>) : (<span className="absolute flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full -start-3.5 ring-8 ring-white">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path fillRule="evenodd" clipRule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM8 13C8.55228 13 9 12.5523 9 12C9 11.4477 8.55228 11 8 11C7.44772 11 7 11.4477 7 12C7 12.5523 7.44772 13 8 13ZM12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13ZM16 13C16.5523 13 17 12.5523 17 12C17 11.4477 16.5523 11 16 11C15.4477 11 15 11.4477 15 12C15 12.5523 15.4477 13 16 13Z" fill="#1C274C" />
                                </svg>
                              </span>)
                              }

                              <h3 className="flex items-start mb-1 text-lg font-semibold text-gray-900 justify-between">
                                Shipping - {shippingMeta.status}
                                {(shippingMeta.status === 'pending') ? (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M16.1139 21.9317C14.1495 22.7453 11.9881 22.9582 9.90278 22.5434C7.81749 22.1287 5.90202 21.1048 4.39861 19.6014C2.89519 18.098 1.87135 16.1825 1.45656 14.0972C1.04177 12.0119 1.25466 9.85046 2.0683 7.88615C2.88194 5.92185 4.2598 4.24293 6.02763 3.0617C7.79545 1.88048 9.87386 1.25 12 1.25C12.4142 1.25 12.75 1.58579 12.75 2C12.75 2.41421 12.4142 2.75 12 2.75C10.1705 2.75 8.38213 3.2925 6.86098 4.30891C5.33983 5.32531 4.15423 6.76996 3.45412 8.46018C2.75401 10.1504 2.57083 12.0103 2.92774 13.8046C3.28465 15.5989 4.16563 17.2471 5.45927 18.5407C6.7529 19.8344 8.4011 20.7154 10.1954 21.0723C11.9897 21.4292 13.8496 21.246 15.5398 20.5459C17.23 19.8458 18.6747 18.6602 19.6911 17.139C20.7075 15.6179 21.25 13.8295 21.25 12C21.25 11.5858 21.5858 11.25 22 11.25C22.4142 11.25 22.75 11.5858 22.75 12C22.75 14.1262 22.1195 16.2046 20.9383 17.9724C19.7571 19.7402 18.0782 21.1181 16.1139 21.9317Z" fill="#1C274C" />
                                  <path d="M14.6869 1.58861C14.2858 1.48537 13.8769 1.72686 13.7737 2.128C13.6704 2.52914 13.9119 2.93802 14.3131 3.04127C17.5625 3.8776 20.1223 6.43745 20.9586 9.68684C21.0619 10.088 21.4708 10.3295 21.8719 10.2262C22.273 10.123 22.5145 9.71409 22.4113 9.31295C21.4387 5.5343 18.4656 2.56117 14.6869 1.58861Z" fill="#1C274C" />
                                </svg>) : (shippingMeta.status === 'sending') ?
                                  (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM13.9563 14.0949C13.763 14.2644 13.5167 14.3629 13.024 14.56C10.7142 15.4839 9.55936 15.9459 8.89971 15.4976C8.7433 15.3913 8.6084 15.2564 8.50212 15.1C8.05386 14.4404 8.51582 13.2855 9.43973 10.9757C9.6368 10.483 9.73533 10.2367 9.9048 10.0434C9.94799 9.99419 9.99435 9.94782 10.0436 9.90464C10.2368 9.73517 10.4832 9.63663 10.9759 9.43956C13.2856 8.51565 14.4405 8.0537 15.1002 8.50196C15.2566 8.60824 15.3915 8.74314 15.4978 8.89954C15.946 9.5592 15.4841 10.7141 14.5602 13.0239C14.3631 13.5165 14.2646 13.7629 14.0951 13.9561C14.0519 14.0054 14.0055 14.0517 13.9563 14.0949Z" fill="#1C274C" />
                                  </svg>)
                                  : (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM16.0303 8.96967C16.3232 9.26256 16.3232 9.73744 16.0303 10.0303L11.0303 15.0303C10.7374 15.3232 10.2626 15.3232 9.96967 15.0303L7.96967 13.0303C7.67678 12.7374 7.67678 12.2626 7.96967 11.9697C8.26256 11.6768 8.73744 11.6768 9.03033 11.9697L10.5 13.4393L12.7348 11.2045L14.9697 8.96967C15.2626 8.67678 15.7374 8.67678 16.0303 8.96967Z" fill="#1C274C" />
                                  </svg>)}
                              </h3>
                            </li>
                            {/* Add more timeline items here */}
                          </ol>

                          <h3 className="flex items-start mb-1 text-lg font-semibold text-gray-900 justify-between">
                            Delivery Number</h3>
                          <div className="mt-1">
                            <textarea
                              id="deliveryNumber"
                              name="deliveryNumber"
                              value={shippingMeta.deliveryNumber}
                              disabled
                              rows={2}
                              className="shadow-sm focus:ring-[#776B5D] bg-gray-300 focus:border-[#776B5D] mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                              placeholder="Some delivery number..." />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}

export default Profile