import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import dotenv from "dotenv";

dotenv.config();

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "QwikCal AI",
  description:
    "AI-powered calendar management for effortless scheduling and event organization.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow">{children}</main>
          <footer className="border-t py-4">
            <div className="container mx-auto px-4 text-center">
              © {new Date().getFullYear()} QwikCal AI. All rights reserved.
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
