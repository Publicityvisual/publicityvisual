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

import { ThemeProvider } from "@/components/ui/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Expires" content="0" />
      </head>
      <body className={`${poppins.variable} ${openSans.variable} antialiased`}>
        <ThemeProvider
            defaultTheme="dark"
            storageKey="pv-theme"
          >
            {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
