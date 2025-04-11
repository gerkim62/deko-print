import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { location_details, name } from "@/constants";
import {
  ArrowDown,
  Phone,
  Printer,
  Wrench,
  Package,
  Utensils,
} from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative bg-primary text-primary-foreground py-4 md:py-20 overflow-hidden">
      {/* Meaningful Abstract Background Elements - Static */}
      <div className="absolute inset-0 opacity-10">
        {/* Original background elements */}
        <div className="absolute top-20 left-10 w-32 md:w-64 h-32 md:h-64 rounded-full bg-background"></div>
        <div className="absolute bottom-10 right-20 w-20 md:w-40 h-20 md:h-40 rounded-full bg-secondary"></div>
        <div className="absolute top-40 right-40 w-10 md:w-20 h-10 md:h-20 rounded-full bg-muted"></div>

        {/* Symbolic abstract elements representing services - No animation */}
        <div className="absolute bottom-20 left-40 w-16 md:w-32 h-16 md:h-32 bg-accent opacity-20">
          {/* Paper/Printing shape */}
          <div className="absolute inset-0 rotate-6 border-4 border-primary-foreground/30"></div>
          <div className="absolute inset-2 rotate-3 border-2 border-primary-foreground/20"></div>
        </div>

        <div className="absolute top-60 left-60 w-24 md:w-48 h-16 md:h-36 bg-primary-foreground/10">
          {/* Device/Repair abstract shape */}
          <div className="absolute top-0 left-1/4 right-1/4 h-1/4 bg-primary-foreground/30 rounded-t-md"></div>
          <div className="absolute inset-y-1/4 inset-x-0 bg-primary-foreground/20"></div>
        </div>

        <div className="absolute top-10 right-10 h-24 md:h-36 w-20 md:w-32 opacity-20">
          {/* Accessories abstract representation */}
          <div className="absolute top-0 left-0 right-0 h-1/2 rounded-full bg-accent"></div>
          <div className="absolute bottom-0 left-1/4 right-1/4 h-1/2 bg-accent"></div>
        </div>

        <div className="absolute bottom-40 right-60 w-20 md:w-36 h-20 md:h-36 opacity-20">
          {/* Snacks/Food abstract shape */}
          <div className="absolute inset-0 rotate-45 bg-secondary rounded-tr-3xl rounded-bl-3xl"></div>
          <div className="absolute inset-4 rotate-12 bg-accent rounded-full"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Location Badge - Hidden on small screens, visible from medium screens up */}
        <Badge
          variant="outline"
          className="absolute right-6 hidden md:flex bg-accent text-accent-foreground px-4 py-2 rounded-full font-bold items-center shadow-lg"
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
                className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold flex-grow sm:flex-none"
              >
                <Link href={"#products-and-services"}>
                  Products and Services
                  <ArrowDown className="mt-1 animate animate-bounce" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="bg-primary text-primary-foreground border-primary-foreground/20 hover:bg-primary-foreground hover:text-black font-semibold flex-grow sm:flex-none"
              >
                <Link href="/contact-us">
                  <Phone className="ml-2 h-4 w-4" />
                  Contact Us
                </Link>
              </Button>
            </div>

            {/* Location Info - More compact on mobile */}
            <div className="mt-6 -mb-4 sm:mb-0 md:mt-8 bg-primary-foreground/10 backdrop-blur-sm p-3 md:p-4 rounded-lg flex flex-col sm:flex-row items-center justify-center md:justify-start">
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

          {/* Meaningful abstract service representations with refined positioning and subtle animations */}
          <div className="hidden md:block md:w-2/5 mt-4 md:mt-0 relative">
            <div className="relative h-90 ml-4 mt-20 w-full overflow-hidden bg-muted/10 backdrop-blur-sm p-4 md:p-6 border border-primary-foreground/20 rounded-lg">
              {/* Abstract service representations positioned closer to edges */}
              <div className="relative h-full w-full">
                {/* Printing service - Top Left */}
                <div className="absolute top-4 left-4 flex flex-col items-center">
                  <div className="w-14 h-14 rounded-sm bg-background/10 flex items-center justify-center hover:bg-background/20 transition-all duration-700">
                    <Printer className="w-8 h-8 text-accent/50 transition-opacity duration-1000 opacity-50 hover:opacity-80" />
                  </div>
                  <div className="mt-2 w-12 h-0.5 bg-accent/20"></div>
                  <div className="mt-1 w-8 h-0.5 bg-accent/15"></div>
                </div>

                {/* Repair service - Top Right */}
                <div className="absolute top-4 right-4 flex flex-col items-center">
                  <div className="w-14 h-14 rounded-sm bg-background/10 flex items-center justify-center hover:bg-background/20 transition-all duration-700">
                    <Wrench className="w-8 h-8 text-accent/50 transition-opacity duration-1000 opacity-50 hover:opacity-80" />
                  </div>
                  <div className="mt-2 w-12 h-0.5 bg-accent/20"></div>
                  <div className="mt-1 w-8 h-0.5 bg-accent/15"></div>
                </div>

                {/* Accessories service - Bottom Left */}
                <div className="absolute bottom-4 left-4 flex flex-col items-center">
                  <div className="w-14 h-14 rounded-sm bg-background/10 flex items-center justify-center hover:bg-background/20 transition-all duration-700">
                    <Package className="w-8 h-8 text-accent/50 transition-opacity duration-1000 opacity-50 hover:opacity-80" />
                  </div>
                  <div className="mt-2 w-12 h-0.5 bg-accent/20"></div>
                  <div className="mt-1 w-8 h-0.5 bg-accent/15"></div>
                </div>

                {/* Snacks service - Bottom Right */}
                <div className="absolute bottom-4 right-4 flex flex-col items-center">
                  <div className="w-14 h-14 rounded-sm bg-background/10 flex items-center justify-center hover:bg-background/20 transition-all duration-700">
                    <Utensils className="w-8 h-8 text-accent/50 transition-opacity duration-1000 opacity-50 hover:opacity-80" />
                  </div>
                  <div className="mt-2 w-12 h-0.5 bg-accent/20"></div>
                  <div className="mt-1 w-8 h-0.5 bg-accent/15"></div>
                </div>

                {/* Central connecting element */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div
                    className="w-16 h-16 bg-background/5 rounded-full animate-pulse"
                    style={{ animationDuration: "12s" }}
                  ></div>
                  <div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-accent/10 animate-pulse"
                    style={{ animationDuration: "16s" }}
                  ></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-accent/15"></div>
                </div>

                {/* Subtle abstract animated elements */}
                <div
                  className="absolute top-1/3 left-1/3 w-1 h-1 bg-accent/20 rounded-full animate-ping"
                  style={{ animationDuration: "8s" }}
                ></div>
                <div
                  className="absolute top-2/3 right-1/3 w-1 h-1 bg-accent/20 rounded-full animate-ping"
                  style={{ animationDuration: "9s" }}
                ></div>
                <div
                  className="absolute bottom-1/3 left-2/3 w-1 h-1 bg-accent/20 rounded-full animate-ping"
                  style={{ animationDuration: "10s" }}
                ></div>

                {/* Flowing connection lines */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Top left to center line */}
                  <line
                    x1="14"
                    y1="14"
                    x2="50%"
                    y2="50%"
                    stroke="currentColor"
                    className="text-accent/10"
                    strokeWidth="0.5"
                    strokeDasharray="3,3"
                    strokeDashoffset="0"
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      from="0"
                      to="12"
                      dur="24s"
                      repeatCount="indefinite"
                    />
                  </line>

                  {/* Top right to center line */}
                  <line
                    x1="calc(100% - 14px)"
                    y1="14"
                    x2="50%"
                    y2="50%"
                    stroke="currentColor"
                    className="text-accent/10"
                    strokeWidth="0.5"
                    strokeDasharray="3,3"
                    strokeDashoffset="0"
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      from="0"
                      to="12"
                      dur="22s"
                      repeatCount="indefinite"
                    />
                  </line>

                  {/* Bottom left to center line */}
                  <line
                    x1="14"
                    y1="calc(100% - 14px)"
                    x2="50%"
                    y2="50%"
                    stroke="currentColor"
                    className="text-accent/10"
                    strokeWidth="0.5"
                    strokeDasharray="3,3"
                    strokeDashoffset="0"
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      from="0"
                      to="12"
                      dur="26s"
                      repeatCount="indefinite"
                    />
                  </line>

                  {/* Bottom right to center line */}
                  <line
                    x1="calc(100% - 14px)"
                    y1="calc(100% - 14px)"
                    x2="50%"
                    y2="50%"
                    stroke="currentColor"
                    className="text-accent/10"
                    strokeWidth="0.5"
                    strokeDasharray="3,3"
                    strokeDashoffset="0"
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      from="0"
                      to="12"
                      dur="20s"
                      repeatCount="indefinite"
                    />
                  </line>
                </svg>

                {/* Additional abstract animated elements */}
                <div
                  className="absolute top-1/4 left-1/2 w-6 h-6 rounded-full border border-accent/5 bg-transparent animate-pulse"
                  style={{ animationDuration: "15s" }}
                ></div>
                <div
                  className="absolute top-3/4 left-1/4 w-4 h-4 rounded-full border border-accent/5 bg-transparent animate-pulse"
                  style={{ animationDuration: "18s" }}
                ></div>
                <div
                  className="absolute bottom-1/4 right-1/4 w-5 h-5 rounded-md border border-accent/5 bg-transparent animate-pulse"
                  style={{ animationDuration: "17s" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
