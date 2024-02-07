import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col min-h-screen bg-green-900 dark">
          <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-green-800 shadow-md">
          <Link className="flex items-center text-white" href="/">
            <h2 className="text-2xl font-bold">Micro Greens</h2>
          </Link>
          <Link className="text-lg text-white hover:text-green-200 transition-colors" href="/about">
            About Us
          </Link>
        </header>
          {children}
        </div>
      </body>
    </html>
  );
}
