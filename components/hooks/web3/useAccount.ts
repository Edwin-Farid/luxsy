
import { CryptoHookFactory } from "@_types/hooks";
import { useEffect } from "react";
import useSWR from "swr"; // untuk mengambil data dari pengguna atau dari codingan kita

type UseAccountResponse = {
  connect: () => void;
  isLoading: boolean ;
  isInstalled: boolean;
}

type AccountHookFactory = CryptoHookFactory<string, UseAccountResponse>

export type UseAccountHook = ReturnType<AccountHookFactory>

export const hookFactory: AccountHookFactory = ({provider, ethereum, isLoading}) => () => {
  const {data, mutate, isValidating,...swr} = useSWR(
    provider ? "web3/useAccount" : null, // provider wallet seperti metamask
    async () => {
      const accounts = await provider!.listAccounts(); // banyak account
      const account = accounts[0]; // akan mengambil account pertama dari metamask

      if (!account) { // jika nggk bisa connect
        throw "Cannot retreive account! Please, connect to web3 wallet."
      }

      return account;
    }, {
      revalidateOnFocus: false, 
      shouldRetryOnError : false // coba lagi jika error
    }
  )

  useEffect(() => { // mengganti account address di ui
    ethereum?.on("accountsChanged", handleAccountsChanged);
    return () =>{
      ethereum?.removeListener("accountsChanged", handleAccountsChanged )
    }
  })

  const handleAccountsChanged = (...args: unknown[]) => { // ngambil data account untuk ui menggunakan useEffect
    const account = args[0] as string[];
    if(account.length === 0) {
      console.error("Please, connect to Web3 wallet");
    } else if (account[0] !== data) {
      mutate(account[0]); // untuk memperbaharui data
    }
  }

  const connect = async () => {
    try {
      ethereum?.request({method: "eth_requestAccounts"}); //standart untuk connect ke web3 wallet
    } catch(e) {
      console.error(e);
    }
  }

  return {
    ...swr,
    data,
    isValidating,
    isLoading: isLoading as boolean,
    isInstalled: ethereum?.isMetaMask || false,
    mutate,
    connect
  };
}