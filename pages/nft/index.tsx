/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import type { NextPage } from 'next';
import { BaseLayout, NftList } from '@ui';
import { useNetwork } from '@hooks/web3';
import { ExclamationTriangleIcon } from '@heroicons/react/20/solid';
import { useListedNfts } from "@hooks/web3";

const Home: NextPage = () => {
    const { network } = useNetwork();
    const { nfts } = useListedNfts();
    const [typeFilter, setTypeFilter] = useState('');
    const [paintFilter, setPaintFilter] = useState('');

    const handleTypeChange = (event) => {
        setTypeFilter(event.target.value);
    };

    const handlePaintChange = (event) => {
        setPaintFilter(event.target.value);
    };

    return (
        <BaseLayout>
            <img className="w-full h-[550px]" src="/images/hero/hero2.webp" />

            <div className="relative bg-white pb-20 px-4 sm:px-6 lg:pb-28 lg:px-8">
                {/* dropdown filter */}
                <div className="relative py-4">
                    <div className="flex space-x-4">
                        <select 
                            value={typeFilter} 
                            onChange={handleTypeChange} 
                            className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="">All Types</option>
                            <option value="abstract">Abstract</option>
                            <option value="realisme">Realism</option>
                        </select>

                        <select 
                            value={paintFilter} 
                            onChange={handlePaintChange} 
                            className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="">All Paints</option>
                            <option value="Pen on Canvas">Pen on Canvas</option>
                            <option value="Pencil on Sketchbook">Pencil on Sketchbook</option>
                            <option value="Watercolor">Watercolor</option>
                            <option value="Acrilict">Acrilict</option>
                            <option value="Sketch">Sketch</option>
                            <option value="Kubisme">Kubisme</option>
                            <option value="Surealisme">Surealisme</option>
                            <option value="Oil Paste in Canvas">Oil Paste in Canvas</option>
                        </select>
                    </div>
                </div>

                <div className="relative">
                    <div className="py-16 bg-white overflow-hidden min-h-screen">
                        <div className="max-w-7xl mx-auto px-4 space-y-8 sm:px-6 lg:px-8">
                            {network.isConnectedToNetwork ?
                                <NftList typeFilter={typeFilter} paintFilter={paintFilter} /> :
                                <div className="rounded-md bg-yellow-50 p-4 mt-10">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                                        </div>
                                        <div className="ml-3">
                                            <h3 className="text-sm font-medium text-yellow-800">Attention needed</h3>
                                            <div className="mt-2 text-sm text-yellow-700">
                                                <p>
                                                    {network.isLoading ?
                                                        "Loading..." :
                                                        `Connect to ${network.targetNetwork}`
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-[1440px] h-[626px] relative">
                <div className="w-[1440px] h-[626px] left-0 top-0 absolute bg-stone-500" />
                <div className="w-[314px] h-[164px] left-[1022px] top-[88px] absolute flex-col justify-start items-end gap-8 inline-flex">
                    <div className="text-white text-5xl font-normal font-['Italiana']">Luxsy</div>
                    <div className="w-[314px] text-justify text-white text-xs font-normal font-['Inter'] tracking-wide">Lorem ipsum dolor sit amet consectetur. Morbi tristique quis diam pellentesque proin donec. Euismod pretium gravida in nulla aliquam. Diam condimentum mi arcu elit sit. Accumsan eget morbi quam ante.</div>
                </div>
                <div className="w-[786px] h-[441px] left-[145px] top-[112px] absolute justify-start items-start gap-[244px] inline-flex">
                    <div className="flex-col justify-start items-start gap-[42px] inline-flex">
                        <div className="text-white text-xs font-normal font-['Inter'] tracking-wide">Help</div>
                        <div className="text-white text-xs font-normal font-['Inter'] leading-[48px]">FAQ<br />Product<br />Comunity</div>
                    </div>
                    <div className="flex-col justify-start items-start gap-[42px] inline-flex">
                        <div className="text-white text-xs font-normal font-['Inter'] tracking-wide">Service</div>
                        <div className="text-white text-xs font-normal font-['Inter'] leading-[48px]">Realism<br />Kubisme<br />Romantisme<br />Abstrack</div>
                    </div>
                    <div className="flex-col justify-start items-start gap-[42px] inline-flex">
                        <div className="text-white text-xs font-normal font-['Inter'] tracking-wide">Learn</div>
                        <div className="text-white text-xs font-normal font-['Inter'] leading-[48px]">What is an NFT?<br />How to buy an NFT<br />What are NFT drops?<br />How to sell an NFT<br />What is a crypto wallet?<br />What is cryptocurrency?<br />What are blockchain gas fees?<br />What is a blockchain?</div>
                    </div>
                </div>
            </div>

        </BaseLayout>
    )
}

export default Home;