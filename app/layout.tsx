import type { Metadata } from "next";
import "./globals.css";
import { Barlow } from "next/font/google";

import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import ConvexClientProvider from "@/components/ConvexClientProvider";
import { Toaster } from "@/components/ui/sonner";

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
    <ConvexAuthNextjsServerProvider>
      <html lang="en">
        <body className={`${barlow.className}  antialiased bg-GREY_10`}>
          <ConvexClientProvider>
            {children}
            <Toaster />
          </ConvexClientProvider>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}
