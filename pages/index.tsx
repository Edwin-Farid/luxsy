
/* eslint-disable @next/next/no-img-element */

import type { NextPage } from 'next';
import { BaseLayout, NftItem, NftList } from '@ui';
import { useNetwork } from '@hooks/web3';
import { ExclamationTriangleIcon } from '@heroicons/react/20/solid';
import { useListedNfts } from "@hooks/web3";

const Home: NextPage = () => {
  const { network } = useNetwork();
  const { nfts } = useListedNfts();

  return (
    <BaseLayout>
      <img className="w-full h-[550px]" src="/images/hero/hero.webp" />

      <div className="py-16 bg-white overflow-hidden min-h-screen">
        <div className="max-w-7xl mx-auto px-4 space-y-8 sm:px-6 lg:px-8">
          <div className="text-stone-500 text-[40px] text-center font-normal font-['Open Sans']">Explore a Selection of the Seni Waktu’s Creations</div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="w-full sm:w-[278px] h-[323px] flex-col justify-start items-center gap-[18px] inline-flex">
              <img className="w-full h-[278px]" src="/images/category/pen-on-canvas.webp" alt="Pen on Canvas" />
              <div className="text-black text-xl font-light font-['Open Sans'] tracking-wide">Pen on Canvas</div>
            </div>
            <div className="w-full sm:w-[278px] h-[323px] flex-col justify-start items-center gap-[18px] inline-flex">
              <img className="w-full h-[278px]" src="/images/category/pencil-on-sketchbook.webp" alt="Pencil on Sketchbook" />
              <div className="text-black text-xl font-light font-['Open Sans'] tracking-wide">Pencil on Sketchbook</div>
            </div>
            <div className="w-full sm:w-[278px] h-[323px] flex-col justify-start items-center gap-[18px] inline-flex">
              <img className="w-full h-[278px]" src="/images/category/watercolor.webp" alt="Watercolor" />
              <div className="text-black text-xl font-light font-['Open Sans'] tracking-wide">Watercolor</div>
            </div>
            <div className="w-full sm:w-[278px] h-[323px] flex-col justify-start items-center gap-[18px] inline-flex">
              <img className="w-full h-[278px]" src="/images/category/acrilict.webp" alt="Acrilict" />
              <div className="text-black text-xl font-light font-['Open Sans'] tracking-wide">Acrilict</div>
            </div>
            <div className="w-full sm:w-[278px] h-[323px] flex-col justify-start items-center gap-[18px] inline-flex">
              <img className="w-full h-[278px]" src="/images/category/sketch.webp" alt="Sketch" />
              <div className="text-black text-xl font-light font-['Open Sans'] tracking-wide">Sketch</div>
            </div>
            <div className="w-full sm:w-[278px] h-[323px] flex-col justify-start items-center gap-[18px] inline-flex">
              <img className="w-full h-[278px]" src="/images/category/kubisme.webp" alt="Kubisme" />
              <div className="text-black text-xl font-light font-['Open Sans'] tracking-wide">Kubisme</div>
            </div>
            <div className="w-full sm:w-[278px] h-[323px] flex-col justify-start items-center gap-[18px] inline-flex">
              <img className="w-full h-[278px]" src="/images/category/surealisme.webp" alt="Surealisme" />
              <div className="text-black text-xl font-light font-['Open Sans'] tracking-wide">Surealisme</div>
            </div>
            <div className="w-full sm:w-[278px] h-[323px] flex-col justify-start items-center gap-[18px] inline-flex">
              <img className="w-full h-[278px]" src="/images/category/oil-paste-in-canvas.webp" alt="Oil Paste in Canvas" />
              <div className="text-black text-xl font-light font-['Open Sans'] tracking-wide">Oil Paste in Canvas</div>
            </div>
          </div>

          <div className="text-stone-500 text-xl font-normal font-['Open Sans'] tracking-widest text-center lg:pt-28">REALISME</div>
          <div className="text-stone-500 text-[40px] font-normal font-['Open Sans'] text-center">LY By The Art </div>
          <div className="text-stone-500 text-xl font-normal font-['Open Sans'] underline tracking-wide text-center">Check Seni Waktu’s Realisme Collection</div>

        </div>
      </div>

      <img className="w-full h-[788px]" src="/images/hero/statue.webp" />

      <div className="py-16 bg-white overflow-hidden min-h-screen">
        <div className="max-w-7xl mx-auto px-4 space-y-8 sm:px-6 lg:px-8">
          {/* <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="w-[278px] h-[438.99px] justify-start items-start gap-2.5 inline-flex">
              <div className="flex-col justify-start items-start gap-[18px] inline-flex">
                <img className="w-[278px] h-[360.99px]" src="/images/nft/rasa-sepi1.webp" />
                <div className="self-stretch h-[60px] flex-col justify-start items-start gap-2 flex">
                  <div className="self-stretch text-black text-xl font-semibold font-['Open Sans'] tracking-wide">Rasa Sepi</div>
                  <div className="self-stretch text-black text-lg font-normal font-['Open Sans']">Rp. 5.000.000</div>
                </div>
              </div>
              <div className="w-[18px] h-[18px] relative" />
            </div>
            <div className="w-[278px] h-[438.99px] justify-start items-start gap-2.5 inline-flex">
              <div className="flex-col justify-start items-start gap-[18px] inline-flex">
                <img className="w-[278px] h-[360.99px]" src="/images/nft/rasa-sepi2.webp" />
                <div className="self-stretch h-[60px] flex-col justify-start items-start gap-2 flex">
                  <div className="self-stretch text-black text-xl font-semibold font-['Open Sans'] tracking-wide">Rasa Sepi</div>
                  <div className="self-stretch text-black text-lg font-normal font-['Open Sans']">Rp. 5.000.000</div>
                </div>
              </div>
              <div className="w-[18px] h-[18px] relative" />
            </div>
            <div className="w-[278px] h-[438.99px] justify-start items-start gap-2.5 inline-flex">
              <div className="flex-col justify-start items-start gap-[18px] inline-flex">
                <img className="w-[278px] h-[360.99px]" src="/images/nft/rasa-sepi3.webp" />
                <div className="self-stretch h-[60px] flex-col justify-start items-start gap-2 flex">
                  <div className="self-stretch text-black text-xl font-semibold font-['Open Sans'] tracking-wide">Rasa Sepi</div>
                  <div className="self-stretch text-black text-lg font-normal font-['Open Sans']">Rp. 5.000.000</div>
                </div>
              </div>
              <div className="w-[18px] h-[18px] relative" />
            </div>
            <div className="w-[278px] h-[438.99px] justify-start items-start gap-2.5 inline-flex">
              <div className="flex-col justify-start items-start gap-[18px] inline-flex">
                <img className="w-[278px] h-[360.99px]" src="/images/nft/rasa-sepi4.webp" />
                <div className="self-stretch h-[60px] flex-col justify-start items-start gap-2 flex">
                  <div className="self-stretch text-black text-xl font-semibold font-['Open Sans'] tracking-wide">Rasa Sepi</div>
                  <div className="self-stretch text-black text-lg font-normal font-['Open Sans']">Rp. 5.000.000</div>
                </div>
              </div>
              <div className="w-[18px] h-[18px] relative" />
            </div>
          </div> */}

          {network.isConnectedToNetwork ?
            <div className="max-w-lg mx-auto grid gap-5 lg:grid-cols-4 lg:max-w-none">
              {nfts.data?.filter(nft => nft.meta.attributes[0].value.toLocaleLowerCase() == "realisme").slice(0, 8).map(nft =>
                <div key={nft.meta.image} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                  <NftItem
                    item={nft}
                    buyNft={nfts.buyNft}
                  />
                </div>
              )}
            </div> :
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

          <div className="text-stone-500 text-xl font-normal font-['Open Sans'] tracking-widest text-center lg:pt-28">ABSTRACK</div>
          <div className="text-stone-500 text-[40px] font-normal font-['Open Sans'] text-center">LY By The Art </div>
          <div className="text-stone-500 text-xl font-normal font-['Open Sans'] underline tracking-wide text-center">Check Seni Waktu’s ABSTRACK Collection</div>

        </div>
      </div>

      <img className="w-full h-[788px]" src="/images/hero/abstrack.webp" />

      <div className="py-16 bg-white overflow-hidden min-h-screen">
        <div className="max-w-7xl mx-auto px-4 space-y-8 sm:px-6 lg:px-8">
          {/* <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="w-[278px] h-[438.99px] justify-start items-start gap-2.5 inline-flex">
              <div className="flex-col justify-start items-start gap-[18px] inline-flex">
                <img className="w-[278px] h-[360.99px]" src="/images/nft/rasa-sepi5.webp" />
                <div className="self-stretch h-[60px] flex-col justify-start items-start gap-2 flex">
                  <div className="self-stretch text-black text-xl font-semibold font-['Open Sans'] tracking-wide">Rasa Sepi</div>
                  <div className="self-stretch text-black text-lg font-normal font-['Open Sans']">Rp. 5.000.000</div>
                </div>
              </div>
              <div className="w-[18px] h-[18px] relative" />
            </div>
            <div className="w-[278px] h-[438.99px] justify-start items-start gap-2.5 inline-flex">
              <div className="flex-col justify-start items-start gap-[18px] inline-flex">
                <img className="w-[278px] h-[360.99px]" src="/images/nft/rasa-sepi6.webp" />
                <div className="self-stretch h-[60px] flex-col justify-start items-start gap-2 flex">
                  <div className="self-stretch text-black text-xl font-semibold font-['Open Sans'] tracking-wide">Rasa Sepi</div>
                  <div className="self-stretch text-black text-lg font-normal font-['Open Sans']">Rp. 5.000.000</div>
                </div>
              </div>
              <div className="w-[18px] h-[18px] relative" />
            </div>
            <div className="w-[278px] h-[438.99px] justify-start items-start gap-2.5 inline-flex">
              <div className="flex-col justify-start items-start gap-[18px] inline-flex">
                <img className="w-[278px] h-[360.99px]" src="/images/nft/rasa-sepi7.webp" />
                <div className="self-stretch h-[60px] flex-col justify-start items-start gap-2 flex">
                  <div className="self-stretch text-black text-xl font-semibold font-['Open Sans'] tracking-wide">Rasa Sepi</div>
                  <div className="self-stretch text-black text-lg font-normal font-['Open Sans']">Rp. 5.000.000</div>
                </div>
              </div>
              <div className="w-[18px] h-[18px] relative" />
            </div>
            <div className="w-[278px] h-[438.99px] justify-start items-start gap-2.5 inline-flex">
              <div className="flex-col justify-start items-start gap-[18px] inline-flex">
                <img className="w-[278px] h-[360.99px]" src="/images/nft/rasa-sepi8.webp" />
                <div className="self-stretch h-[60px] flex-col justify-start items-start gap-2 flex">
                  <div className="self-stretch text-black text-xl font-semibold font-['Open Sans'] tracking-wide">Rasa Sepi</div>
                  <div className="self-stretch text-black text-lg font-normal font-['Open Sans']">Rp. 5.000.000</div>
                </div>
              </div>
              <div className="w-[18px] h-[18px] relative" />
            </div>
          </div> */}

          {network.isConnectedToNetwork ?
            <div className="max-w-lg mx-auto grid gap-5 lg:grid-cols-4 lg:max-w-none">
              {nfts.data?.filter(nft => nft.meta.attributes[0].value.toLocaleLowerCase() == "abstract").slice(0, 8).map(nft =>
                <div key={nft.meta.image} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                  <NftItem
                    item={nft}
                    buyNft={nfts.buyNft}
                  />
                </div>
              )}
            </div> :
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

      <div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
        <div className="absolute inset-0">
          <div className="bg-white h-1/3 sm:h-2/3" />
        </div>
        <div className="relative">
          <div className="text-center">
            <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">Amazing Creatures NFTs</h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Mint a NFT to get unlimited ownership forever!
            </p>
          </div>
          <div className="py-16 bg-white overflow-hidden min-h-screen">
            <div className="max-w-7xl mx-auto px-4 space-y-8 sm:px-6 lg:px-8">
              {network.isConnectedToNetwork ?
                <NftList /> :
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

      <div className="w-full h-[626px] relative">
        <div className="w-full h-[626px] left-0 top-0 absolute bg-stone-500" />
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

export default Home