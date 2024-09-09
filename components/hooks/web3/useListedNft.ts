
import { CryptoHookFactory } from "@_types/hooks";
import { Nft } from "@_types/nft";
import { ethers } from "ethers";
import { useCallback } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";
import { useRouter } from 'next/router';
import axios from 'axios';

type UseListedNftsResponse = {
  buyNft: (token: number, value: number,owner: String, artName: String,  address: String, postalCode: number) => Promise<void>
}
type ListedNftsHookFactory = CryptoHookFactory<Nft[], UseListedNftsResponse>

export type UseListedNftsHook = ReturnType<ListedNftsHookFactory>

export const hookFactory: ListedNftsHookFactory = ({contract}) => () => {
  const router = useRouter();
  const {data,...swr} = useSWR(
    contract ? "web3/useListedNfts" : null,
    async () => {
        const nfts = [] as Nft[];
        const coreNfts = await contract!.getAllNftsOnSale();

        for (let i = 0; i < coreNfts.length; i++){
          const item  = coreNfts[i];
          const tokenURI = await contract!.tokenURI(item.tokenId);
          const metaRes = await fetch(tokenURI);
          
          const meta = await metaRes.json();
          
          nfts.push({
            price: parseFloat (ethers.utils.formatEther(item.price)),
            tokenId: item.tokenId.toNumber(),
            creator: item.creator,
            isListed: item.isListed,
            meta
          })

        }
        return nfts;
    }
  )
  
  const _contract = contract;
  const buyNft = useCallback (async (tokenId: number, value: number, owner: String, artName: String, address: String, postalCode: number) => {
    try{
      const result = await _contract!.buyNft(
        tokenId,{
          value: ethers.utils.parseEther(value.toString())
        }
      )

      await toast.promise(
        result?.wait(), {
          pending : "Processing transaction",
          success: "Nft is yours! Go to profile page",
          error: "processing error"
        }
       );

      alert("You have bought Nft.See profile page");

      const postData = {
        tokenId,
        artName,
        price: value,
        owner,
        address,
        postalCode,
      };

      const token = sessionStorage.getItem('token');
      axios.post('https://luxsy-admin.blocdev.id/api/shipment', postData, {
          headers: { Authorization: `Bearer ${token}` }
      })
          .then(response => {
              toast.success("Shipment status updated successfully");
          })
          .catch(error => { 
              toast.error("Error updating shipment");
              console.error('Error updating shipment:', error);
          });

      router.push(`/`);
    } catch (e: any){
    const reason = e?.data?.data?.reason || e.message; 

    toast.promise(
        new Promise((_, reject) => reject(e)), 
        {
            pending: reason, 
            success: "Nft is yours! Go to profile page",
            error: reason, 
        }
    );
    }
  },[_contract])
  return {
    ...swr,
    buyNft,
    data: data || [],
  };
}