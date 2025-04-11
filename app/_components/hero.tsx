import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { location_details, name } from "@/constants";
import {
  ArrowDown,
  Package,
  Phone,
  Printer,
  Utensils,
  Wrench,
} from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative bg-primary text-primary-foreground py-12 md:py-20 overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 md:w-64 h-32 md:h-64 rounded-full bg-background"></div>
        <div className="absolute bottom-10 right-20 w-20 md:w-40 h-20 md:h-40 rounded-full bg-secondary"></div>
        <div className="absolute top-40 right-40 w-10 md:w-20 h-10 md:h-20 rounded-full bg-muted"></div>
      </div>

      {/* Location Badge - Hidden on small screens, visible from medium screens up */}
      <Badge
        variant="outline"
        className="absolute top-6 right-6 hidden md:flex bg-accent text-accent-foreground px-4 py-2 rounded-full font-bold items-center shadow-lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        {location_details}
      </Badge>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left w-full md:w-3/5 mb-8 md:mb-0">
            <div className="mb-4 md:mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-accent mb-1">
                {name}
              </h2>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight text-pretty">
                All Your <span className="text-accent">Needs</span>,{" "}
                <br className="hidden sm:block" />
                One Convenient Stop
              </h1>
            </div>
            <p className="text-lg md:text-xl max-w-xl mx-auto md:mx-0 mb-6 md:mb-8 text-primary-foreground/80 text-pretty">
              From printing services and device repairs to unique accessories
              and delicious snacks - we've got everything you need in one
              convenient location.
            </p>
            <div className="flex justify-center flex-wrap-reverse gap-2 md:justify-start">
              <Button
                asChild
                className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold "
              >
                <Link href={"#products-and-services"}>
                  Products and Services
                  <ArrowDown className="animate animate-bounce mt-1" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="ml-4 bg-primary text-primary-foreground border-primary-foreground/20 hover:bg-primary-foreground hover:text-black font-semibold"
              >
                <Link href="/contact-us">
                  <Phone className="ml-2 h-4 w-4" />
                  Contact Us
                </Link>
              </Button>
            </div>

            {/* Location Info - More compact on mobile */}
            <div className="mt-6 md:mt-8 bg-primary-foreground/10 backdrop-blur-sm p-3 md:p-4 rounded-lg flex flex-col sm:flex-row items-center justify-center md:justify-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mb-2 sm:mb-0 sm:mr-3 text-accent flex-shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <div className="flex flex-wrap justify-center md:justify-start gap-x-1">
                <span className="whitespace-nowrap text-sm md:text-base font-medium">
                  {name}
                </span>
                <span className="whitespace-nowrap text-sm md:text-base font-medium">
                  • {location_details}.
                </span>
                <span className="whitespace-nowrap text-sm md:text-base font-medium">
                  <span className=""> </span> Online 24/7
                </span>
              </div>
            </div>
          </div>

          <div className="w-full md:w-2/5 mt-4 md:mt-0">
            <Card className="relative bg-primary-foreground/10 backdrop-blur-sm p-4 md:p-6 rounded-lg shadow-2xl border-primary-foreground/20 text-primary-foreground">
              <div className="grid grid-cols-2 gap-3 md:gap-5">
                {/* Printing */}
                <div
                  className="bg-accent/25 p-3 md:p-5 rounded-lg text-center select-none animate-fade-in hover:bg-accent/20 transition-colors duration-300"
                  style={{ animationDelay: "0.1s" }}
                >
                  <Printer className="h-6 w-6 md:h-8 md:w-8 mx-auto mb-2 md:mb-3 animate-pulse" />
                  <span className="text-sm md:text-base font-medium">
                    Printing
                  </span>
                </div>

                {/* Repairs */}
                <div
                  className="bg-secondary/25 p-3 md:p-5 rounded-lg text-center select-none animate-fade-in hover:bg-secondary/20 transition-colors duration-300"
                  style={{ animationDelay: "0.2s" }}
                >
                  <Wrench className="h-6 w-6 md:h-8 md:w-8 mx-auto mb-2 md:mb-3 animate-pulse" />
                  <span className="text-sm md:text-base font-medium">
                    Repairs
                  </span>
                </div>

                {/* Accessories */}
                <div
                  className="bg-muted/25 p-3 md:p-5 rounded-lg text-center select-none animate-fade-in hover:bg-muted/20 transition-colors duration-300"
                  style={{ animationDelay: "0.3s" }}
                >
                  <Package className="h-6 w-6 md:h-8 md:w-8 mx-auto mb-2 md:mb-3 animate-pulse" />
                  <span className="text-sm md:text-base font-medium">
                    Accessories
                  </span>
                </div>

                {/* Snacks */}
                <div
                  className="bg-accent/25 p-3 md:p-5 rounded-lg text-center select-none animate-fade-in hover:bg-accent/20 transition-colors duration-300"
                  style={{ animationDelay: "0.4s" }}
                >
                  <Utensils className="h-6 w-6 md:h-8 md:w-8 mx-auto mb-2 md:mb-3 animate-pulse" />
                  <span className="text-sm md:text-base font-medium">
                    Snacks
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
