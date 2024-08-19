/* eslint-disable @next/next/no-img-element */
import { FunctionComponent, useEffect } from "react";
import NftItem from "../item";
import { useListedNfts } from "@hooks/web3";

interface NftListProps {
  typeFilter: string;
  paintFilter: string;
}

const NftList: FunctionComponent<NftListProps> = ({ typeFilter, paintFilter }) => {
  const { nfts } = useListedNfts();

  useEffect(() => {
    // console.log("Type Filter:", typeFilter);
    // console.log("Paint Filter:", paintFilter);
    // console.log("NFT Data:", nfts.data);
  }, [typeFilter, paintFilter, nfts.data]);

  const filteredNfts = nfts.data?.filter(nft => {
    const matchesType = typeFilter ? nft.meta.attributes[0].value.toLocaleLowerCase() === typeFilter.toLowerCase() : true;
    const matchesPaint = paintFilter ? nft.meta.attributes[1].value.toLocaleLowerCase() === paintFilter.toLowerCase() : true;
    return matchesType && matchesPaint;
  });

  useEffect(() => {
    // console.log("Filtered NFTs:", filteredNfts);
  }, [filteredNfts]);

  return (
    <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-4 lg:max-w-none">
      {filteredNfts?.map(nft =>
        <div key={nft.tokenId} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
          <NftItem
            item={nft}
            buyNft={nfts.buyNft}
          />
        </div>
      )}
    </div>
  )
}

export default NftList;