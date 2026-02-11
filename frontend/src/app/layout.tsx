import type { Metadata } from "next";
import { Poppins, Open_Sans } from "next/font/google";
import "./globals.css";

const poppins = Poppins({ 
  subsets: ["latin"], 
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

const openSans = Open_Sans({ 
  subsets: ["latin"], 
  weight: ['400', '600'],
  variable: '--font-open-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Publicity Visual | Digital Media Hub",
  description: "The premium digital media and entertainment hub in partnership with T ENTERTAINMENT.",
};

import { Providers } from "./providers";
import { SelectAndShare } from "@/components/ui/SelectAndShare";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="font-sans antialiased text-gray-900 bg-white dark:bg-[#0a0c0e] dark:text-gray-100 selection:bg-[#f14d5d] selection:text-white">
        <Providers>
          <SelectAndShare />
          {children}
        </Providers>
      </body>
    </html>
  );
}
