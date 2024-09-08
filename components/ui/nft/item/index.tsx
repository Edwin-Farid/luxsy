/* eslint-disable @next/next/no-img-element */

import { FunctionComponent } from "react";
import { NftMeta, Nft } from "../../../../types/nft";
import { useRouter } from 'next/router';

type NftItemProps = {
  item: Nft;
}

function shortifyAddress(address: string) {
  return `0x****${address.slice(-4)}`
}

const NftItem: FunctionComponent<NftItemProps> = (item) => {
  const router = useRouter();

  const handleImageClick = (tokenId: number) => {
    router.push(`/nft/detail/${tokenId}`);
  };

  return (
    <>
      <div className="flex-shrink-0">
        <img
          className={`h-full w-full object-cover`}
          src={item.item.meta.image}
          alt="New NFT"
          key={item.item.tokenId}
          onClick={() => handleImageClick(item.item.tokenId)}
        />
      </div>
      <div className="flex-1 bg-white p-6 flex flex-col justify-between font-sans">
        <div className="flex-1">
          <div className="block mt-2">
            <p className="text-black text-xl font-semibold">{item.item.meta.name}</p>
          </div>
        </div>

        <div className="overflow-hidden mb-4">
          <dl className="-mx-4 mt-2 flex flex-wrap">
            <div className="flex flex-col px-4 pt-4">
              <dt className="order-1 text-sm font-medium text-gray-500">Price</dt>
              <dd className="order-2 text-black font-semibold">
                <div className="flex justify-center items-center">
                  {`${item.item.price} ETH`}
                  <img className="h-6" src="/images/small-eth.webp" alt="ether icon" />
                </div>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </>
  )
}

export default NftItem;