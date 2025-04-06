import BgSecondaryLogo from "@/components/layout/bg-secondary-logo";
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
import prisma from "@/lib/prisma";
import {
  ChevronRight,
  Printer,
  ShoppingBag,
  Smartphone,
  Wrench,
} from "lucide-react";
import Image from "next/image";
import Hero from "./_components/hero";
import { EmptyState } from "./_components/empty-state";
import {
  Product,
  ProductCategory,
  Service,
  ServiceCategory,
} from "@prisma/client";

// Define a union type for our tab item types
type TabItem = {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  emptyMessage: string;
  itemType: "services" | "products";
};

// Define separate tab items for services and products
type ServiceTabItem = TabItem & {
  items: Service[];
  itemType: "services";
};

type ProductTabItem = TabItem & {
  items: Product[];
  itemType: "products";
};

// Union type for all tab items
type AnyTabItem = ServiceTabItem | ProductTabItem;

async function ShopLandingPage() {
  const servicesPromise = prisma.service.findMany();
  const productsPromise = prisma.product.findMany();

  const [services, products] = await Promise.all([
    servicesPromise,
    productsPromise,
  ]);

  // Service tabs data
  const serviceTabs: AnyTabItem[] = [
    {
      id: "printing",
      label: "Printing",
      icon: Printer,
      title: "Printing Solutions",
      description: "High-quality printing for business and personal requirements",
      items: services.filter(
        (service) => service.category === ServiceCategory.Printing
      ),
      emptyMessage: "No printing services are currently available. Please check back soon.",
      itemType: "services",
    },
    {
      id: "repairs",
      label: "Repairs",
      icon: Wrench,
      title: "Repair Services",
      description: "Expert device repairs with professional turnaround",
      items: services.filter(
        (service) => service.category === ServiceCategory.Repair
      ),
      emptyMessage: "No repair services are currently available. Please check back soon.",
      itemType: "services",
    },
    {
      id: "accessories",
      label: "Accessories",
      icon: Smartphone,
      title: "Professional Accessories",
      description: "Premium accessories for all your devices",
      items: products.filter(
        (product) => product.category === ProductCategory.Accessory
      ),
      emptyMessage: "No accessories are currently in stock. Please check back soon.",
      itemType: "products",
    },
    {
      id: "secondhand",
      label: "Pre-Owned",
      icon: ShoppingBag,
      title: "Pre-Owned Equipment",
      description: "Quality certified used devices at competitive prices",
      items: products.filter(
        (product) => product.category === ProductCategory.Pre_owned
      ),
      emptyMessage: "No pre-owned equipment is currently available. Please check back soon.",
      itemType: "products",
    },
  ];

  // Button texts - could be customized per category if needed
  const buttonTexts = {
    printing: { details: "Services", action: "Book Appointment" },
    repairs: { details: "Services", action: "Book Appointment" },
    accessories: { details: "Details", action: "Order Now" },
    secondhand: { details: "View Specifications", action: "Order Now" },
  } as const;

  // Helper function to render price based on item type
  const renderPrice = (
    item: Product | Service,
    itemType: "products" | "services"
  ) => {
    if (itemType === "products") {
      return `$${(item as Product).price.toFixed(2)}`;
    } else {
      const startingPrice = (item as Service).startingPrice;
      return startingPrice
        ? `Starting at $${startingPrice.toFixed(2)}`
        : "Contact for pricing";
    }
  };

  return (
    <>
      <Hero />

      <BgSecondaryLogo />
      {/* Main Content */}
      <main
        id="products-and-services"
        className="container mx-auto px-4 md:px-6 py-12"
      >
        <Tabs defaultValue="printing" className="w-full">
          {/* Services Navigation Tabs */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center md:text-left">
              Our Products and Services
            </h2>
            <TabsList
              className="w-full flex flex-wrap justify-center md:justify-start gap-2 bg-transparent"
              aria-label="Services Categories"
            >
              {serviceTabs.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="px-5 py-3 rounded-md font-medium flex items-center border border-input hover:bg-accent active:bg-accent/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
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
                  <h3 className="text-2xl font-bold text-foreground">
                    {tab.title}
                  </h3>
                  <p className="text-muted-foreground mt-2 text-base">
                    {tab.description}
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 self-start"
                >
                  All{" "}
                  {tab.itemType.charAt(0).toUpperCase() + tab.itemType.slice(1)}{" "}
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>

              {/* Items Grid or Empty State */}
              {tab.items.length > 0 ? (
                <div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  aria-label={`${tab.title} offerings`}
                >
                  {tab.items.map((item, index) => (
                    <Card
                      key={index}
                      className="border border-border shadow-sm hover:shadow-md transition-shadow overflow-hidden focus-within:ring-2 focus-within:ring-ring"
                    >
                      <CardHeader className="pb-2">
                        <CardTitle className="text-xl font-semibold text-foreground">
                          {item.title}
                        </CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        {item.image && (
                          <Image
                            height={208}
                            width={208}
                            src={item.image}
                            alt={`${item.title} ${tab.itemType === "services"
                                ? "service"
                                : "product"}`}
                            className="rounded-md w-full h-52 object-cover mb-4" />
                        )}
                        <div
                          className="flex gap-2 mb-3"
                          aria-label="Item features"
                        >
                          {item.tags.map((tag, tagIndex) => (
                            <Badge
                              key={tagIndex}
                              className="bg-primary/20 text-primary hover:bg-primary/30 font-normal"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <p
                          className="text-sm text-muted-foreground font-medium"
                          aria-label="Price"
                        >
                          {renderPrice(item, tab.itemType)}
                        </p>
                      </CardContent>
                      <CardFooter className="flex justify-between pt-2 border-t border-border">
                        <Button
                          variant="outline"
                          className="focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          {buttonTexts[tab.id as keyof typeof buttonTexts]
                            .details}
                        </Button>
                        <Button className="focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                          {buttonTexts[tab.id as keyof typeof buttonTexts]
                            .action}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <EmptyState
                  message={tab.emptyMessage}
                  category={tab.itemType} />
              )}
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </>
  );
}

export default ShopLandingPage;
