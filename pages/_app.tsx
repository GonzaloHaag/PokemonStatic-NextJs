import type { AppProps } from 'next/app';

import '@/styles/globals.css';

import {NextUIProvider} from '@nextui-org/react';
import { darkTheme } from '@/themes';



export default function App({ Component, pageProps }: AppProps) {
  return (
  <NextUIProvider theme={darkTheme}>
    {/*Para utilizar el tema oscuro le indico el theme */}

  <Component {...pageProps} />
  
  </NextUIProvider>
  )
}
