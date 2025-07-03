import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"
import { GoogleAnalytics } from '@next/third-parties/google'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "flowyBoard.com | Create animated & 3D flowcharts",
  description: "Create beautiful, interactive, and animated flowcharts with flowyBoard. Design professional 3D flowcharts with ease using our intuitive drag-and-drop interface.",
  keywords: "flowchart, 3D flowchart, animated flowchart, diagram maker, flow diagram, process flow, visualization tool",
  authors: [{ name: "flowyBoard" }],
  creator: "flowyBoard",
  publisher: "flowyBoard",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://flowyboard.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "flowyBoard.com | Create animated & 3D flowcharts",
    description: "Create beautiful, interactive, and animated flowcharts with flowyBoard. Design professional 3D flowcharts with ease using our intuitive drag-and-drop interface.",
    url: 'https://flowyboard.com',
    siteName: 'flowyBoard',
    images: [
      {
        url: 'mainLogo.png',
        width: 1200,
        height: 630,
        alt: 'flowyBoard - Create animated & 3D flowcharts',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
  manifest: '/manifest.json', // You'll need to create this file in your public folder
  verification: {
    google: 'your-google-site-verification', // Add your Google Search Console verification code
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
        <GoogleAnalytics gaId="G-PVNCS4DQ9V" />
      </body>
    </html>
  );
}
