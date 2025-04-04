import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChevronRight,
  Printer,
  ShoppingBag,
  Smartphone,
  Wrench,
} from "lucide-react";
import Hero from "./_components/hero";

const ShopLandingPage = () => {
  // Service tabs data
  const serviceTabs = [
    {
      id: "printing",
      label: "Printing",
      icon: Printer,
      title: "Printing Solutions",
      description:
        "High-quality printing for business and personal requirements",
    },
    {
      id: "repairs",
      label: "Repairs",
      icon: Wrench,
      title: "Repair Services",
      description: "Expert device repairs with professional turnaround",
    },
    {
      id: "accessories",
      label: "Accessories",
      icon: Smartphone,
      title: "Professional Accessories",
      description: "Premium accessories for all your devices",
    },
    {
      id: "secondhand",
      label: "Pre-Owned",
      icon: ShoppingBag,
      title: "Pre-Owned Equipment",
      description: "Quality certified used devices at competitive prices",
    },
  ] as const;

  // Services data - organized by tab ID
  const serviceItems = {
    printing: [
      {
        title: "T-Shirt Printing",
        description: "Premium custom designs on high-quality fabric",
        image:
          "https://images.unsplash.com/photo-1562157873-818bc0726f68?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        badges: [
          { label: "Premium", variant: "default" },
          { label: "Same-Day Available", variant: "outline" },
        ],
        price: "Starting from Ksh 800 per shirt",
      },
      {
        title: "Document Printing",
        description: "Professional documents, flyers, and posters",
        image:
          "https://images.unsplash.com/photo-1589986005992-e173198b1246?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        badges: [
          { label: "High Resolution", variant: "default" },
          { label: "Color/B&W", variant: "outline" },
        ],
        price: "Starting from Ksh 5 per page",
      },
      {
        title: "Banner Production",
        description: "Large format prints for corporate events",
        image:
          "https://images.unsplash.com/photo-1561020013-ac55931ecef1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        badges: [
          { label: "Large Format", variant: "default" },
          { label: "Weather-Resistant", variant: "outline" },
        ],
        price: "Starting from Ksh 1,500 per banner",
      },
    ],
    repairs: [
      {
        title: "Laptop Repair",
        description: "Hardware and software solutions for all brands",
        image:
          "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        badges: [
          { label: "Professional", variant: "default" },
          { label: "Warranty", variant: "outline" },
        ],
        price: "Starting from Ksh 1,000",
      },
      {
        title: "Phone Repair",
        description:
          "Screen replacement, battery, and comprehensive diagnostics",
        image:
          "https://images.unsplash.com/photo-1595941069915-4ebc5197c14a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        badges: [
          { label: "Same-day", variant: "default" },
          { label: "Certified Parts", variant: "outline" },
        ],
        price: "Starting from Ksh 800",
      },
      {
        title: "Audio Equipment",
        description: "Professional speaker, headphone and amplifier repairs",
        image:
          "https://images.unsplash.com/photo-1558124044-eb772a1a8966?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        badges: [
          { label: "Expert", variant: "default" },
          { label: "Guaranteed", variant: "outline" },
        ],
        price: "Starting from Ksh 1,200",
      },
    ],
    accessories: [
      {
        title: "Premium Phone Cases",
        description: "Protect your device with professional-grade protection",
        image:
          "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        badges: [
          { label: "Durable", variant: "default" },
          { label: "Professional", variant: "outline" },
        ],
        price: "Starting from Ksh 500",
      },
      {
        title: "Professional Headphones",
        description: "Wired and wireless solutions for business and leisure",
        image:
          "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        badges: [
          { label: "Bluetooth", variant: "default" },
          { label: "Noise-Cancelling", variant: "outline" },
        ],
        price: "Starting from Ksh 900",
      },
      {
        title: "Charging Solutions",
        description: "Enterprise-grade power solutions for all devices",
        image:
          "https://images.unsplash.com/photo-1583863788344-a671a9818ab6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        badges: [
          { label: "Fast Charging", variant: "default" },
          { label: "Universal", variant: "outline" },
        ],
        price: "Starting from Ksh 400",
      },
    ],
    secondhand: [
      {
        title: "Certified Laptops",
        description: "Refurbished business laptops with warranty",
        image:
          "https://images.unsplash.com/photo-1542744094-3a31f272c490?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        badges: [
          { label: "Certified", variant: "default" },
          { label: "90-Day Warranty", variant: "outline" },
        ],
        price: "Starting from Ksh 15,000",
      },
      {
        title: "Refurbished Smartphones",
        description: "Factory-restored phones at competitive prices",
        image:
          "https://images.unsplash.com/photo-1556656793-08538906a9f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        badges: [
          { label: "Unlocked", variant: "default" },
          { label: "Tested", variant: "outline" },
        ],
        price: "Starting from Ksh 5,000",
      },
      {
        title: "Business Electronics",
        description: "Pre-owned electronics suitable for office environments",
        image:
          "https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        badges: [
          { label: "Inspected", variant: "default" },
          { label: "As-Is", variant: "outline" },
        ],
        price: "Various prices",
      },
    ],
  } as const;

  // Button texts - could be customized per category if needed
  const buttonTexts = {
    printing: { details: "Services", action: "Book Appointment" },
    repairs: { details: "Services", action: "Book Appointment" },
    accessories: { details: "Details", action: "Order Now" },
    secondhand: { details: "View Specifications", action: "Order Now" },
  } as const;

  return (
    <>
      <Hero />

      {/* Main Content */}
      <main className="container mx-auto px-4 md:px-6 py-12">
        <Tabs defaultValue="printing" className="w-full">
          {/* Services Navigation Tabs */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center md:text-left">
              Professional Services
            </h2>
            <TabsList
              className="w-full flex flex-wrap justify-center md:justify-start gap-2 bg-transparent"
              aria-label="Services Categories"
            >
              {serviceTabs.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="px-5 py-3 rounded-md font-medium flex items-center border border-gray-300 hover:bg-gray-100 active:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 data-[state=active]:bg-gray-800 data-[state=active]:text-white"
                  aria-controls={`panel-${tab.id}`}
                >
                  <tab.icon className="h-4 w-4 mr-2" aria-hidden="true" />
                  <span>{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Tab Panel Content */}
          {serviceTabs.map((tab) => (
            <TabsContent
              key={tab.id}
              value={tab.id}
              className="space-y-10"
              id={`panel-${tab.id}`}
              role="tabpanel"
              aria-labelledby={tab.id}
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {tab.title}
                  </h3>
                  <p className="text-gray-600 mt-2 text-base">
                    {tab.description}
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 self-start border-gray-300 hover:bg-gray-50"
                >
                  All Services{" "}
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>

              {/* Service Items Grid */}
              <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                aria-label={`${tab.title} offerings`}
              >
                {serviceItems[tab.id].map((item, index) => (
                  <Card
                    key={index}
                    className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden focus-within:ring-2 focus-within:ring-gray-400"
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl font-semibold text-gray-800">
                        {item.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600">
                        {item.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <img
                        src={item.image}
                        alt={`${item.title} service`}
                        className="rounded-md w-full h-52 object-cover mb-4"
                      />
                      <div
                        className="flex gap-2 mb-3"
                        aria-label="Service features"
                      >
                        {item.badges.map((badge, badgeIndex) =>
                          badge.variant === "default" ? (
                            <Badge
                              key={badgeIndex}
                              className="bg-gray-100 text-gray-800 hover:bg-gray-200 font-normal"
                            >
                              {badge.label}
                            </Badge>
                          ) : (
                            <Badge
                              key={badgeIndex}
                              variant="outline"
                              className="text-gray-600 font-normal"
                            >
                              {badge.label}
                            </Badge>
                          )
                        )}
                      </div>
                      <p
                        className="text-sm text-gray-600 font-medium"
                        aria-label="Price"
                      >
                        {item.price}
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-between pt-2 border-t border-gray-100">
                      <Button
                        variant="outline"
                        className="border-gray-300 hover:bg-gray-50 text-gray-700 focus:ring-2 focus:ring-gray-400"
                      >
                        {buttonTexts[tab.id].details}
                      </Button>
                      <Button className="bg-gray-800 hover:bg-gray-900 text-white focus:ring-2 focus:ring-gray-800 focus:ring-offset-2">
                        {buttonTexts[tab.id].action}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </>
  );
};

export default ShopLandingPage;
