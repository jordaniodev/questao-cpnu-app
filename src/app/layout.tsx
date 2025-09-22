import { type Metadata } from 'next'
import {
  ClerkProvider,
} from '@clerk/nextjs'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Script from 'next/script';
import Head from 'next/head'
import Clarity from '@microsoft/clarity';

import { ptBR } from '@clerk/localizations'
import { ModalProvider } from './(components)/AuthModal/index.hook'
import { AuthModal } from './(components)/AuthModal'
import { PaymentModalProvider } from './(components)/PaymentModal/index.hook'
import { PaymentModal } from './(components)/PaymentModal'
import { NiceModalProvider } from './(components)/NiceModal/NiceModal'
import { MenuBar } from '@/components/smart/MenuBar/MenuBar'

import { ThemeProvider } from '@/components/providers/theme.provider';
import { CountQuestionProvider } from '@/components/smart/CountQuestion/CountQuestionProvider';
import { ToastDownloadApp } from '@/components/smart/ToastDownloadApp/ToastDownloadApp';



const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Concurso.app',
  description: 'Prepare-se para o sucesso no seu próximo exame com Questões CPNU.',
  icons: {
    icon: '/favicon.png',
    apple: '/apple-icon-180x180.png',
    shortcut: '/favicon-180x180.png',
  },
  manifest: '/manifest.webmanifest',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  Clarity.init(`svhx2ik86g`);
  return (
    <ClerkProvider localization={ptBR}>
      <ModalProvider>
        <PaymentModalProvider>
          <NiceModalProvider>
            <PaymentModal />
            <AuthModal />
            <CountQuestionProvider>
              <html lang="en">
                <Head>
                  <title>Questões CPNU</title>
                  <base href="/" />
                  <meta content="width=device-width, initial-scale=1" name="viewport" />

                  <link rel="icon" type="image/x-icon" href="/favicon.ico" />
                  <link rel="manifest" href="/manifest.webmanifest" />
                  <meta name="msapplication-TileColor" content="#ffffff" />
                  <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
                  <meta name="theme-color" content="#ffffff" />
                </Head>
                <body className={`${geistSans.variable} ${geistMono.variable} antialiased pb-18`}>

                  <ToastDownloadApp />
                  {children}
                  <Script
                    src={`https://www.googletagmanager.com/gtag/js?id=G-KC1CFFB8FS`}
                    strategy="afterInteractive"
                  />
                  <Script id="google-analytics" strategy="afterInteractive">
                    {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-KC1CFFB8FS');
                  `}
                  </Script>
                  <Script id="clarity-analytics" strategy="afterInteractive">
                    {`
                      (function(c,l,a,r,i,t,y){
                          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                      })(window, document, "clarity", "script", "svhx2ik86g");
                    `}
                  </Script>
                  <MenuBar className='md:hidden fixed bottom-0 left-0 right-0' />
                </body>
              </html>
            </CountQuestionProvider>
          </NiceModalProvider>
        </PaymentModalProvider>
      </ModalProvider>
    </ClerkProvider>
  )
}

