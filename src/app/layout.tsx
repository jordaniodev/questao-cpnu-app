import { type Metadata } from 'next'
import {
  ClerkProvider,
} from '@clerk/nextjs'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/smart/Header/Header'
import Head from 'next/head'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Questões CPNU',
  description: 'Prepare-se para o sucesso no seu próximo exame com Questões CPNU.',
   icons: {
    icon: '/favicon.png',
    apple: '/apple-touch-72x72.png',
    shortcut: '/favicon-32x32.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  const isShowHeader = !(typeof window !== 'undefined' && (window.location.pathname.startsWith('/sign-in') || window.location.pathname.startsWith('/sign-up')));
  return (
    <ClerkProvider>
      <html lang="en">
        <Head>
          <title>Questões CPNU</title>
          <base href="/" />
          <meta content="width=device-width, initial-scale=1" name="viewport" />

          <meta charSet="UTF-8" />
          <meta content="width=device-width, initial-scale=1.0" name="viewport" />
          <meta content="Prepare-se para o sucesso no seu próximo exame com Questões CPNU." name="description" />
          <meta content="exame, preparação, simulados, feedback, estudo" name="keywords" />
          <meta content="8 Pixel Design" name="author" />
          <meta content="index, follow" name="robots" />
          <meta content="Questões CPNU - Prepare-se para o sucesso no seu próximo exame" property="og:title" />
          <meta content="Personalize seus simulados e obtenha feedback instantâneo para melhorar seus resultados."
            property="og:description" />
          <meta content="capa.png" property="og:image" />
          <meta content="https://questoes.cpnu.com.br" property="og:url" />
          <meta content="capa.png" name="twitter:card" />
          <meta content="@luigi_flu" name="twitter:site" />
          <meta content="Personalize seus simulados e obtenha feedback instantâneo para melhorar seus resultados."
            name="twitter:description" />
          <meta content="favicon-32x32.png" name="twitter:image" />
          <meta content="website" property="og:type" />
          <meta content="pt_BR" property="og:locale" />
          <meta content="1200" property="og:image:width" />
          <meta content="675" property="og:image:height" />
          <meta content="Questões CPNU" property="og:site_name" />
          <meta content="Logo da Questões CPNU" name="twitter:image:alt" />
          <meta content="Questões CPNU - Prepare-se para o sucesso no seu próximo exame" name="twitter:title" />
          <meta content="Personalize seus simulados e obtenha feedback instantâneo para melhorar seus resultados."
            name="twitter:description" />
          <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
          <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
          <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
          <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
          <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png" />
          <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
          <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png" />
          <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
          <link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/manifest.json" />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          {isShowHeader && <Header />}
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}