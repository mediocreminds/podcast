import { Head, Html, Main, NextScript } from 'next/document'
import Favicons from '../components/player/Favicons'

export default function Document() {
  return (
    <Html className="bg-white antialiased" lang="en">
      <Head>
        <link
          rel="preconnect"
          href="https://cdn.fontshare.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=space-grotesk@700,500,400&display=swap"
        />
        <Favicons />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
