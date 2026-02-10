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
  title: "Publicity Visual - Super App",
  description: "La plataforma de noticias más avanzada.",
};

import { ThemeProvider } from "@/components/ui/ThemeProvider";

// ... existing code ...

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${poppins.variable} ${openSans.variable} antialiased`}>
        <ThemeProvider
            defaultTheme="dark"
            storageKey="vite-ui-theme"
          >
            {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
