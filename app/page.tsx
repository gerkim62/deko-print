import BgSecondaryLogo from "@/components/layout/bg-secondary-logo";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import prisma from "@/lib/prisma";
import {
  Product,
  ProductCategory,
  Service,
  ServiceCategory,
} from "@prisma/client";
import {
  ChevronRight,
  LucideIcon,
  Printer,
  ShoppingBag,
  Smartphone,
  Utensils,
  Wrench,
} from "lucide-react";
import { EmptyState } from "./_components/empty-state";
import Hero from "./_components/hero";
import ItemsGrid from "./_components/items-grid";
// Define a union type for our tab item types
type TabItem = {
  id: string;
  label: string;
  icon: LucideIcon;
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
  const productsPromise = prisma.product.findMany({
    where: {
      stockRemaining: {
        gt: 0,
      },
    },
  });

  const [services, products] = await Promise.all([
    servicesPromise,
    productsPromise,
  ]);

  // Service tabs data
  const serviceTabs: AnyTabItem[] = [
    {
      id: "accessories",
      label: "Accessories",
      icon: Smartphone,
      title: "Professional Accessories",
      description: "Premium accessories for all your devices",
      items: products.filter(
        (product) => product.category === ProductCategory.Accessory
      ),
      emptyMessage:
        "No accessories are currently in stock. Please check back soon.",
      itemType: "products",
    },
    {
      id: "secondhand",
      label: "Pre-Owned",
      icon: ShoppingBag,
      title: "Second-hand Products and Equipment",
      description: "Quality certified used devices at competitive prices",
      items: products.filter(
        (product) => product.category === ProductCategory.Pre_owned
      ),
      emptyMessage:
        "No second-hand equipment is currently available. Please check back soon.",
      itemType: "products",
    },
    {
      id: "printing",
      label: "Printing",
      icon: Printer,
      title: "Printing Solutions",
      description:
        "High-quality printing for business and personal requirements",
      items: services.filter(
        (service) => service.category === ServiceCategory.Printing
      ),
      emptyMessage:
        "No printing services are currently available. Please check back soon.",
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
      emptyMessage:
        "No repair services are currently available. Please check back soon.",
      itemType: "services",
    },

    {
      id: "snacks",
      label: "Snacks",
      icon: Utensils,
      title: "Snacks",
      description: "Sweet bhajias and other snacks",
      items: products.filter(
        (product) => product.category === ProductCategory.Snack
      ),
      emptyMessage:
        "No snacks are currently available. Please check back soon.",
      itemType: "products",
    },
  ];

  // Button texts - could be customized per category if needed
  const buttonTexts = {
    printing: { details: "Services", action: "WhatsApp Us" },
    repairs: { details: "Services", action: "WhatsApp Us" },
    accessories: { details: "Details", action: "Place order" },
    secondhand: { details: "View Specifications", action: "Place order " },
    snacks: { details: "Details", action: "Place order" },
  } as const;

  return (
    <>
      <Hero />

      <BgSecondaryLogo />
      {/* Main Content */}
      <main
        id="products-and-services"
        className="container mx-auto px-4 md:px-6 py-12"
      >
        <Tabs defaultValue="accessories" className="w-full">
          {/* Services Navigation Tabs */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center md:text-left">
              Our Products and Services
            </h2>
            <TabsList
              className="w-full flex flex-wrap justify-center md:justify-start gap-2 bg-transparent sm:mb-0 mb-4"
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
                  hidden
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
                <ItemsGrid
                  items={tab.items}
                  itemType={tab.itemType}
                  title={tab.title}
                  tabId={tab.id}
                  buttonTexts={buttonTexts}
                />
              ) : (
                <EmptyState
                  message={tab.emptyMessage}
                  category={tab.itemType}
                />
              )}
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </>
  );
}

export default ShopLandingPage;
