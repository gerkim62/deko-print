import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { ArrowRight, LayoutDashboard } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import OrdersTab from "./_components/orders-tab";
import ProductsTab from "./_components/products-tab";
import ServicesTab from "./_components/services-tab";
import WalkInsTab from "./_components/walk-ins-tab";
import { forbidden, redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if(!session) redirect("/sign-in?next=/admin")

  if (session.user.role !== "ADMIN") forbidden()

  const walkInsPromise = prisma.walkIn.findMany({
    orderBy: { updatedAt: "desc" },
  });

  const productsPromise = prisma.product.findMany({
    orderBy: { updatedAt: "desc" },
  });

  const servicesPromise = prisma.service.findMany({
    orderBy: { updatedAt: "desc" },
  });

  const ordersPromise = prisma.order.findMany({
    orderBy: { updatedAt: "desc" },
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
    <div className="container min-h-screen mx-auto py-8 px-4 sm:px-4 md:py-10">
      <div className="flex flex-wrap items-start md:items-center justify-between gap-2 sm:gap-4 mb-4 md:mb-6">
        <h1 className="flex items-center gap-2 text-2xl sm:text-3xl font-bold tracking-tight">
          <LayoutDashboard className="h-6 w-6 text-primary" />
          Dashboard
        </h1>
        <Link
          href="/admin/finance"
          className="inline-flex items-center rounded-md bg-primary px-3 py-1.5 text-xs sm:text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
        >
          View Finance
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>

      <Tabs defaultValue="walk-ins" className="w-full">
        <TabsList className="grid w-full grid-cols-4 md:grid-cols-4 mb-4">
          <TabsTrigger value="walk-ins">Walk-ins</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
        </TabsList>

        <TabsContent value="walk-ins">
          <WalkInsTab
            products={products.filter((product) => product.stockRemaining > 0)}
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
