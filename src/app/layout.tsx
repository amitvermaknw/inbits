import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/src/components/layout/Header";
import BottomNav from "@/src/components/nav/BottomNav";
import ArticleProvider from "./features/context/ArticleContext";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "InBits",
  description: "News in 10 seconds",
};

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
