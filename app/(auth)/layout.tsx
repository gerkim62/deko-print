import { Card } from "@/components/ui/card";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Authenticate",
  description: "Login or Sign Up to Deko Print",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative sm:min-h-screen min-h-[90vh] flex items-start justify-center bg-primary py-4 overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 md:w-64 h-32 md:h-64 rounded-full bg-background"></div>
        <div className="absolute bottom-10 right-20 w-20 md:w-40 h-20 md:h-40 rounded-full bg-secondary"></div>
        <div className="absolute top-40 right-40 w-10 md:w-20 h-10 md:h-20 rounded-full bg-muted"></div>
      </div>

      <div className="container relative z-10 flex flex-col items-center pt-10 space-y-6 px-4 md:px-6">
        <div className="flex flex-col space-y-2 text-center">
          <Link href="/" className="mx-auto">
            <h2 className="text-2xl font-bold text-accent">Deko Print</h2>
          </Link>
          <p className="text-sm text-primary-foreground/70">
            Your one-stop solution for all printing and repair needs
          </p>
        </div>
        <Card className="w-full max-w-md p-6 bg-background backdrop-blur-sm shadow-2xl border-primary-foreground/20">
          <Suspense
            fallback={
              <div className="h-4 w-4 animate-pulse bg-muted rounded-full"></div>
            }
          >
            {children}
          </Suspense>
        </Card>
      </div>
    </div>
  );
}
