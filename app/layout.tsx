import type { Metadata } from "next";
import "./globals.css";
import { Barlow } from "next/font/google";

import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import ConvexClientProvider from "@/components/ConvexClientProvider";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-geist-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: " recruter by AI",
  description: "recruter by AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" 
    className="dark"
 style={{"colorScheme": "dark"}}
    >
      <body
        className={`${barlow.className} antialiased bg-GREY_10`}
        data-new-gr-c-s-check-loaded="14.1234.0"
        data-gr-ext-installed=""
        cz-shortcut-listen="true"
      >
        <ConvexAuthNextjsServerProvider>
          <ConvexClientProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Toaster />
            </ThemeProvider>
          </ConvexClientProvider>
        </ConvexAuthNextjsServerProvider>
      </body>
    </html>
  );
}
