import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Duck Clicker",
  description: "Duck Clicker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-stone-950`}>
        <div className="flex items-center ml-5">
          <Image src="/images/duck.png" width={50} height={50} alt='Duck' />
          <h1 className="p-5 text-yellow-500 text-4xl">Duck Clicker</h1>
        </div>
        <div className="mb-auto">{children}</div>
      </body>
    </html>
  );
}
