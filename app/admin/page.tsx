import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OrdersTab from "./_components/orders-tab";
import ProductsTab from "./_components/products-tab";
import ServicesTab from "./_components/services-tab";
import WalkInsTab from "./_components/walk-ins-tab";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export default async function AdminPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user.role !== "ADMIN") {
    return (
      <div className="container min-h-[88vh] mx-auto flex flex-col justify-center items-center px-4 py-12 text-center">
        <div className="text-6xl mb-4">🚫😅</div>
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">
          Oops! You're not supposed to be here
        </h1>
        <p className="text-muted-foreground max-w-md">
          This page is for admins only. If you think this is a mistake, try
          contacting the site owner or go back to safety.
        </p>
      </div>
    );
  }

  const walkInsPromise = prisma.walkIn.findMany();
  const productsPromise = prisma.product.findMany();
  const servicesPromise = prisma.service.findMany();
  const ordersPromise = prisma.order.findMany({
    include: {
      product: true,
      customer: true,
    },
  });

  const [walkIns, products, services, orders] = await Promise.all([
    walkInsPromise,
    productsPromise,
    servicesPromise,
    ordersPromise,
  ]);

  return (
    <div className="container min-h-screen mx-auto py-4 px-2 sm:px-4 md:py-10">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
        Admin Dashboard
      </h1>

      <Tabs defaultValue="walk-ins" className="w-full">
        <TabsList className="grid w-full grid-cols-4 md:grid-cols-4 mb-4">
          <TabsTrigger value="walk-ins">Walk-ins</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
        </TabsList>

        <TabsContent value="walk-ins">
          <WalkInsTab
            products={products}
            services={services}
            walkIns={walkIns}
          />
        </TabsContent>

        <TabsContent value="orders">
          <OrdersTab orders={orders} />
        </TabsContent>

        <TabsContent value="products">
          <ProductsTab products={products} />
        </TabsContent>

        <TabsContent value="services">
          <ServicesTab services={services} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
