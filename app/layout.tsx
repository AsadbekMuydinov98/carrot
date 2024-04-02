import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ChildProps } from "@/types";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { MyContextProvider } from "./userContext";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sell and buy",
  description: "A website similar to the Carrot app",
};

export default function RootLayout({children}:ChildProps) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <MyContextProvider>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
            storageKey='blog-theme'
          >
            {children}
            <Toaster position='top-center' />
          </ThemeProvider>
        </MyContextProvider>
      </body>
    </html>
  );
}
