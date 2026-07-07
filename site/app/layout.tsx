import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import FormspreeProviders from "@/components/FormspreeProvider";
import ZeroShotFeedbackPopup from "@/components/ZeroShotFeedbackPopup";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aretex Labs",
  description:
    "Aretex Labs builds systems that elevate the human — not replace them. We leverage technology to help people achieve and surpass their fullest potential.",
  robots: {
    index: false,
    follow: false,
  },
  icons: {
    icon: "/images/logo-white.png",
    shortcut: "/images/logo-white.png",
    apple: "/images/logo-white.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Inline script to set dark class before hydration to avoid flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(t===null&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})()`,
          }}
        />
        {/* Always start fresh loads at the top of the page (don't restore scroll on refresh) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if('scrollRestoration' in history){history.scrollRestoration='manual'}window.scrollTo(0,0)}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col site-shell">
        <ThemeProvider>
          <FormspreeProviders>
            <ZeroShotFeedbackPopup />
            {children}
          </FormspreeProviders>
        </ThemeProvider>
      </body>
    </html>
  );
}
