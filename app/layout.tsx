import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import {
  ClerkProvider,
} from "@clerk/nextjs";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "InterviewTwin | AI-Powered Interview Preparation",
  description: "Master your interviews with your AI twin or practice with an AI interviewer.",
};

import Script from "next/script";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        <Script
          defer
          src="https://analytics-production-7300.up.railway.app/script.js"
          data-website-id="a498c2f5-ada1-43bf-a989-f483d8ddebcf"
          strategy="afterInteractive"
        />
        <ClerkProvider
          signInUrl="/sign-in"
          signUpUrl="/sign-up"
        >
          <Navbar />
          <main className="pt-16 min-h-screen">
            {children}
          </main>
        </ClerkProvider>
      </body>
    </html>
  );
}
