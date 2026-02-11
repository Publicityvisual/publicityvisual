"use client";

import { ThemeProvider } from "@/components/ui/ThemeProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      defaultTheme="dark"
      storageKey="pv-theme"
    >
      {children}
    </ThemeProvider>
  );
}
