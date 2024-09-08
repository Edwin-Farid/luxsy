

import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Web3Provider from '@providers/web3'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Open_Sans, Italiana } from '@next/font/google';

const openSans = Open_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});

const italiana = Italiana({
  weight: ['400'],
  subsets: ['latin'],
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ToastContainer />
      <Web3Provider>
        <div className={`${openSans.className} ${italiana.className}`}>
          <Component {...pageProps} />
        </div>
      </Web3Provider>
    </>
  )
}

export default MyApp