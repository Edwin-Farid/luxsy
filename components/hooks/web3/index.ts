import { useHook } from "@providers/web3"

export const useAccount = () => {
    const hooks = useHook();
    const swrRes = hooks.useAccount();
        return{
            account : swrRes
        }
}

export const useNetwork = () => {
    const hooks = useHook ();
    const swrRes = hooks.useNetwork();
        return{
            network : swrRes
        }
}

export const  useListedNfts = () => {
    const hooks = useHook ();
    const swrRes = hooks.useListedNfts();
        return{
            nfts : swrRes
        }
}

export const  useOwnedNfts = () => {
    const hooks = useHook ();
    const swrRes = hooks.useOwnedNfts();
        return{
            nfts : swrRes
        }
}
