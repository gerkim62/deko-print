import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { ToastContainer } from "react-toastify";

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
    <html className="scroll-smooth" lang="en">
      <body className={` ${font.className} antialiased`}>
        <NextTopLoader />

        <ToastContainer
          position="top-center"
          toastClassName="!max-w-[90%] mt-2 !rounded-md !border"
        />

        <div className="min-h-screen bg-gray-50">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
