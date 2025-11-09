import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import type { ReactNode } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "fuckingship",
  description: "Private Avalanche builders. Ship weekly or leave.",
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🔻</text></svg>",
      },
    ],
  },
  openGraph: {
    title: "f🔻ckingship",
    description: "Private builder community. Ship weekly or leave.",
    url: "https://fuckingship.org",
    siteName: "f🔻ckingship",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "f🔻ckingship",
    description: "Private builder community. Ship weekly or leave.",
    creator: "@freakingship",
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black min-h-screen`}>{children}</body>
    </html>
  )
}
