import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const font = Nunito({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Deko Print",
  description:
    "Deko Print - Your one-stop shop for printing, repairs, and more!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${font.className} antialiased`}>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
