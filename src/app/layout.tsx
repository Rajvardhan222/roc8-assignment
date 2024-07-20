import Navbar from "@/components/Navbar";
import UserContextProvider from "@/components/userContext/context";
import "@/styles/globals.css";
import { Inter } from '@next/font/google';

const inter = Inter({ subsets: ['latin'] });


import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Ecommerce app roc8 assignment",
  description: "This is a assignment created by Rajvardhan Ranawat",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.className}`}>
      <body>
        <UserContextProvider>
        <Navbar/>
        {children}
        </UserContextProvider>
        </body>
    </html>
  );
}
