import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/src/components/layout/Header";
import BottomNav from "@/src/components/nav/BottomNav";
import ArticleProvider from "./features/context/ArticleContext";
import { generateMetadata } from "@/src/lib/metadata";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Best Daily News in 60 Seconds - Politics, Sports, Business, Health, Entertainment, Science, Tech, World',
  description: 'Stay informed with the latest political, tech, and world news in 60 seconds. Fast, reliable, and always up to date.',
  keywords: ['news', 'politics', 'technology', 'world news', 'sports'],
  robots: 'index, follow',
  icons: {
    icon: '/favicon.ico'
  },
  openGraph: {
    title: 'Best Daily News in 60 seconds',
    description: 'Latest and breaking news across categories in 60 seconds.',
    url: 'https://www.inbits.co',
    siteName: 'InBits',
    type: 'website',
    images: [
      {
        url: 'https://res.cloudinary.com/dxhnwasub/image/upload/v1747003467/inbits/ajpjmilvkxnthsedtetv.png',
        width: 1200,
        height: 630,
        alt: 'InBits News Summary',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'InBits - Best Daily News in 60 seconds',
    description: 'Latest and breaking news across categories in 60 seconds.',
    images: ['https://res.cloudinary.com/dxhnwasub/image/upload/v1747003467/inbits/ajpjmilvkxnthsedtetv.png'],
  },
};

generateMetadata({
  title: 'Best Daily News in 60 seconds',
  summary: 'Latest and breaking news across categories in 60 seconds.',
  image: 'https://res.cloudinary.com/dxhnwasub/image/upload/v1747003467/inbits/ajpjmilvkxnthsedtetv.png'
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ArticleProvider>
          <Header />
          <div className='md:container md:mx-auto mb-24'>
            {children}
          </div>
          <BottomNav />
        </ArticleProvider>
      </body>
    </html>
  );
}
