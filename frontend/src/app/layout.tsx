import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { ThemeToggle } from "@/components/theme-toggle";
import { Header } from "@/components/layouts/header";
// import { Geist } from 'next/font/google'

const inter = Inter({
  subsets: ["latin"],
});

export const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DAGSeer – Forecast the Future, On-Chain",
  description:
    "DAGSeer makes it simple to forecast the future on-chain. Stake with confidence, say Yes or No, and earn Seer tokens by joining the winning side.",
  icons: [
    { rel: "icon", url: "/icon.svg", media: "(prefers-color-scheme: light)" },
    {
      rel: "icon",
      url: "/icon-dark.svg",
      media: "(prefers-color-scheme: dark)",
    },
  ],
  openGraph: {
    images: [
      {
        url: "/og_img.png",
        width: 1200,
        height: 630,
        alt: "DAGSeer Open Graph Image",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          {children}
          {/* <div className="fixed bottom-5 right-5">
            <ThemeToggle />
          </div> */}
        </Providers>
      </body>
    </html>
  );
}
