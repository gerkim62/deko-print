import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { ToastContainer } from "react-toastify";
import "./globals.css";
import { ClientOnly } from "@/components/client-only";
import { InstallPrompt } from "@/components/install-prompt";

const font = Nunito({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Deko Print",
    template: "Deko Print | %s",
    absolute: "Deko Print",
  },
  description:
    "Deko Print - Your one-stop shop for printing, repairs, and more!",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
  },
  manifest: "/site.webmanifest",
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
          toastClassName="!max-w-[95%] mt-2 !rounded-md !border"
        />

        <div className="min-h-screen bg-gray-50">
          <Navbar />
          {children}
          <Footer />
          <ClientOnly>
            <InstallPrompt />
          </ClientOnly>
        </div>
      </body>
    </html>
  );
}
