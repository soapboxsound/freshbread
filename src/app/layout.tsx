import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono, Syne } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import { PageEnter } from "@/components/PageEnter";
import { VinylGrooves } from "@/components/VinylGrooves";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["500", "600", "700", "800"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500"],
});

const siteDescription =
  "The right music for the right moment. Fresh Bread is a New York music supervision and development company working across advertising, film, and television.";

export const metadata: Metadata = {
  metadataBase: new URL("https://freshbread.music"),
  title: {
    default: "Fresh Bread — Music Supervision & Development",
    template: "%s — Fresh Bread",
  },
  description: siteDescription,
  keywords: [
    "music supervision",
    "music development",
    "sonic branding",
    "music licensing",
    "New York",
    "advertising music",
    "Fresh Bread",
  ],
  openGraph: {
    title: "Fresh Bread — Music Supervision & Development",
    description: siteDescription,
    url: "https://freshbread.music",
    siteName: "Fresh Bread",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fresh Bread — Music Supervision & Development",
    description: siteDescription,
  },
  icons: {
    icon: "/assets/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${syne.variable} ${jetbrains.variable} antialiased`}
      >
        <div className="animate-bar fixed top-0 left-0 z-[95] h-1.5 w-full bg-accent" />
        <VinylGrooves />
        <SiteHeader />
        <main className="relative z-10 min-h-screen">
          <PageEnter>{children}</PageEnter>
        </main>
      </body>
    </html>
  );
}
