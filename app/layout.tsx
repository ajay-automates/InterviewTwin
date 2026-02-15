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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log('RootLayout rendering...');
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
        >
          <Navbar />
          <main className="pt-16 min-h-screen">
            {children}
          </main>
          <script dangerouslySetInnerHTML={{ __html: "console.log('Client-side script executed');" }} />
        </body>
      </html>
    </ClerkProvider>
  );
}
