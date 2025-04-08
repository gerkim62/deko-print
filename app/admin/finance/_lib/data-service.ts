import prisma from "@/lib/prisma";
import type {
  RevenueSummary,
  ProductPerformanceItem,
  Transaction,
} from "../_types";

// Server-side data fetching functions using Prisma

export async function getRevenueSummary(): Promise<RevenueSummary> {
  const [orderRevenueResult, walkInRevenueResult, pendingOrders] =
    await Promise.all([
      prisma.order.aggregate({ _sum: { pricePaid: true } }),
      prisma.walkIn.aggregate({ _sum: { pricePaid: true } }),
      prisma.order.findMany({
        where: { pricePaid: null },
        include: { product: true },
      }),
    ]);

  const pendingPayments = pendingOrders.reduce(
    (sum, order) => sum + order.product.price * order.quantity,
    0
  );

  const orderRevenue = orderRevenueResult._sum.pricePaid || 0;
  const walkInRevenue = walkInRevenueResult._sum.pricePaid || 0;

  return {
    totalRevenue: orderRevenue + walkInRevenue,
    orderRevenue,
    walkInRevenue,
    pendingPayments,
  };
}

export async function getRevenueData() {
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const [orders, walkIns, recentOrders] = await Promise.all([
    prisma.order.findMany({
      where: {
        createdAt: { gte: sixMonthsAgo },
        pricePaid: { not: null },
      },
      include: { product: true },
      orderBy: { createdAt: "asc" },
    }),
    prisma.walkIn.findMany({
      include: { product: true },
    }),
    prisma.order.findMany({
      where: {
        createdAt: { gte: sevenDaysAgo },
        pricePaid: { not: null },
      },
      include: { product: true },
      orderBy: { createdAt: "asc" },
    }),
  ]);

  const monthlyData = Array.from({ length: 6 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - 5 + i);
    const month = date.toLocaleString("default", { month: "short" });

    const monthOrders = orders.filter(
      (order) =>
        order.createdAt.getMonth() === date.getMonth() &&
        order.createdAt.getFullYear() === date.getFullYear()
    );

    const orderRevenue = monthOrders.reduce(
      (sum, order) => sum + (order.pricePaid || 0),
      0
    );

    const walkInRevenue =
      i === 5 ? walkIns.reduce((sum, walkIn) => sum + walkIn.pricePaid, 0) : 0;

    return {
      name: month,
      orders: orderRevenue,
      walkIns: walkInRevenue,
    };
  });

  const weeklyData = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - 6 + i);
    const day = date.toLocaleString("default", { weekday: "short" });

    const dayOrders = recentOrders.filter(
      (order) =>
        order.createdAt.getDate() === date.getDate() &&
        order.createdAt.getMonth() === date.getMonth() &&
        order.createdAt.getFullYear() === date.getFullYear()
    );

    const orderRevenue = dayOrders.reduce(
      (sum, order) => sum + (order.pricePaid || 0),
      0
    );

    const walkInRevenue =
      i === 6
        ? walkIns.reduce((sum, walkIn) => sum + walkIn.pricePaid, 0) / 7
        : 0;

    return {
      name: day,
      orders: orderRevenue,
      walkIns: walkInRevenue,
    };
  });

  return {
    monthly: monthlyData,
    weekly: weeklyData,
  };
}

export async function getTopProducts(): Promise<ProductPerformanceItem[]> {
  const products = await prisma.product.findMany({
    include: {
      orders: {
        where: {
          pricePaid: { not: null },
        },
      },
      walkIns: true,
    },
  });

  const productPerformance = products.map((product) => {
    const orderRevenue = product.orders.reduce(
      (sum, order) => sum + (order.pricePaid || 0),
      0
    );
    const walkInRevenue = product.walkIns.reduce(
      (sum, walkIn) => sum + walkIn.pricePaid,
      0
    );
    const totalRevenue = orderRevenue + walkInRevenue;

    const orderUnitsSold = product.orders.reduce(
      (sum, order) => sum + order.quantity,
      0
    );
    const walkInUnitsSold = product.walkIns.reduce(
      (sum, walkIn) => sum + walkIn.quantity,
      0
    );
    const totalUnitsSold = orderUnitsSold + walkInUnitsSold;

    return {
      id: product.id,
      title: product.title,
      category: formatCategory(product.category),
      revenue: totalRevenue,
      unitsSold: totalUnitsSold,
      stockRemaining: product.stockRemaining,
    };
  });

  return productPerformance.sort((a, b) => b.revenue - a.revenue).slice(0, 5);
}

export async function getRecentTransactions(): Promise<Transaction[]> {
  const [orders, walkIns] = await Promise.all([
    prisma.order.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
      include: { customer: true, product: true },
    }),
    prisma.walkIn.findMany({
      take: 10,
      include: { product: true, service: true },
    }),
  ]);

  const orderTransactions: Transaction[] = orders.map((order) => ({
    id: `order-${order.id}`,
    date: order.createdAt,
    description: `Order: ${order.product.title} (x${order.quantity})`,
    amount: order.pricePaid || 0,
    type: "order",
    status: order.status,
    customer: order.customer.name,
  }));

  const walkInTransactions: Transaction[] = walkIns.map((walkIn) => ({
    id: `walkin-${walkIn.id}`,
    date: new Date(), // WalkIn doesn't have date in schema
    description: walkIn.product
      ? `Walk-in: ${walkIn.product.title} (x${walkIn.quantity})`
      : `Walk-in: Service${walkIn.service ? ` - ${walkIn.service.title}` : ""}`,
    amount: walkIn.pricePaid,
    type: "walkIn",
    customer: walkIn.customerName || "Walk-in Customer",
  }));

  return [...orderTransactions, ...walkInTransactions]
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 10);
}

function formatCategory(category: string): string {
  return category.replace("_", " ");
}
