import type { OrderStatus, ProductCategory } from "@prisma/client";

// Define types based on Prisma schema
export type User = {
  id: string;
  name: string;
  email: string;
};

export type Product = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  price: number;
  image?: string | null;
  category: ProductCategory;
  stockRemaining: number;
  createdAt: Date;
  updatedAt: Date;
  orders?: Order[];
  walkIns?: WalkIn[];
};

export type Order = {
  id: number;
  customer: User;
  customerId: string;
  product: Product;
  productId: string;
  quantity: number;
  pricePaid: number | null;
  status: OrderStatus;
  deliveryLocation: string;
  phoneNumber: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Service = {
  id: string;
  name: string;
  price: number;
};

export type WalkIn = {
  id: number;
  customerName?: string | null;
  product?: Product | null;
  productId?: string | null;
  service?: Service | null;
  serviceId?: string | null;
  quantity: number;
  pricePaid: number;
};

// Define summary types for the dashboard
export type RevenueSummary = {
  totalRevenue: number;
  orderRevenue: number;
  walkInRevenue: number;
  pendingPayments: number;
};

export type CategoryRevenue = {
  category: string;
  revenue: number;
  percentage: number;
};

export type ProductPerformanceItem = {
  id: string;
  title: string;
  category: string;
  revenue: number;
  unitsSold: number;
  stockRemaining: number | null; //null if service
};

export type Transaction = {
  id: string;
  date: Date;
  description: string;
  amount: number;
  type: "order" | "walkIn";
  status?: string;
  customer?: string;
};
