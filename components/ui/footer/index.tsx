/* eslint-disable @next/next/no-img-element */

import { Disclosure, } from '@headlessui/react';

export default function Footer() {
    return (
        <Disclosure as="footer" className="bg-stone-500">
            <>
                <div className="w-full h-[626px] relative">
                    <div className="w-full h-[626px] left-0 top-0 absolute bg-stone-500" />
                    <div className="w-[314px] h-[164px] left-[1022px] top-[88px] absolute flex-col justify-start items-end gap-8 inline-flex">
                        <div className="text-white text-5xl font-normal">Luxsy</div>
                        <div className="w-[314px] text-justify text-white text-xs font-normal tracking-wide">Welcome to Luxsy, where luxury meets art. Discover the beauty that transcends imagination in every stroke, color, and detail of the finest paintings we offer. Here, art is not just a decoration; it’s an investment in timeless elegance. With a carefully curated and exclusive selection, Luxsy is the premier destination for those who seek more than just a painting—it’s an unparalleled art experience. Let yourself be captivated by the luxury in every masterpiece that inspires and embodies true prestige. Discover the luxury of art, only at Luxsy.</div>
                    </div>
                    <div className="w-[786px] h-[441px] left-[145px] top-[112px] absolute justify-start items-start gap-[244px] inline-flex font-sans">
                        <div className="flex-col justify-start items-start gap-[42px] inline-flex">
                            <div className="text-white text-xs font-normal tracking-wide">Help</div>
                            <div className="text-white text-xs font-normal leading-[48px]">FAQ<br />Product<br />Comunity</div>
                        </div>
                        <div className="flex-col justify-start items-start gap-[42px] inline-flex">
                            <div className="text-white text-xs font-normal tracking-wide">Service</div>
                            <div className="text-white text-xs font-normal leading-[48px]">Realism<br />Kubisme<br />Romantisme<br />Abstrack</div>
                        </div>
                        <div className="flex-col justify-start items-start gap-[42px] inline-flex">
                            <div className="text-white text-xs font-normal tracking-wide">Learn</div>
                            <div className="text-white text-xs font-normal leading-[48px]">What is an NFT?<br />How to buy an NFT<br />What are NFT drops?<br />How to sell an NFT<br />What is a crypto wallet?<br />What is cryptocurrency?<br />What are blockchain gas fees?<br />What is a blockchain?</div>
                        </div>
                    </div>
                </div>
            </>
        </Disclosure>)
}