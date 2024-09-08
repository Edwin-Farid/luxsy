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

    const handleTypeChange = (event: any) => {
        setTypeFilter(event.target.value);
    };

    const handlePaintChange = (event: any) => {
        setPaintFilter(event.target.value);
    };

    return (
        <BaseLayout>
            <img className="w-full h-[550px]" src="/images/hero/hero2.webp" alt='hero' />

            <div className="relative bg-white pb-20 px-4 sm:px-6 lg:pb-28 lg:px-8">
                {/* dropdown filter */}
                <div className="relative py-4">
                    <div className="flex space-x-4">
                        <select
                            value={typeFilter}
                            onChange={handleTypeChange}
                            className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#776B5D] focus:border-[#776B5D] sm:text-sm"
                        >
                            <option value="">All Types</option>
                            <option value="abstract">Abstract</option>
                            <option value="realisme">Realisme</option>
                        </select>

                        <select
                            value={paintFilter}
                            onChange={handlePaintChange}
                            className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#776B5D] focus:border-[#776B5D] sm:text-sm"
                        >
                            <option value="">All Paints</option>
                            <option value="Pen on Canvas">Pen on Canvas</option>
                            <option value="Pencil on Sketchbook">Pencil on Sketchbook</option>
                            <option value="Watercolor on Paper">Watercolor on Paper</option>
                            <option value="Acrylic Paint on Canvas">Acrylic Paint on Canvas</option>
                            <option value="Ink on Paper">Ink on Paper</option>
                            <option value="Tempera on Wood Panel">Tempera on Wood Panel</option>
                            <option value="Gouache on Paper">Gouache on Paper</option>
                            <option value="Oil Paste on Canvas">Oil Paste on Canvas</option>
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
        </BaseLayout>
    )
}

export default Home;