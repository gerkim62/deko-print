import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BarChart3 } from "lucide-react";

import { FinanceSummaryCards } from "./_components/finance-summary-cards";
import { RevenueChartContainer } from "./_components/revenue-chart-container";
import { RecentTransactionsTable } from "./_components/recent-transactions-table";
import { ProductPerformanceList } from "./_components/product-performance-list";
import {
  getRevenueSummary,
  getRevenueData,
  getTopItems,
  getRecentTransactions,
} from "./_lib/data-service";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { forbidden, redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Finance Dashboard",
  description: "Overview of financial performance and metrics",
};

export default async function FinanceDashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/sign-in?next=/admin/finance");

  if (session.user.role !== "ADMIN") forbidden();

  const [summaryData, revenueData, topProducts, recentTransactions] =
    await Promise.all([
      getRevenueSummary(),
      getRevenueData(),
      getTopItems(),
      getRecentTransactions(),
    ]);

  return (
    <div className="flex flex-col gap-6 p-4 py-8 container mx-auto sm:p-6">
      <div className="flex flex-wrap mx-2 items-start sm:items-center justify-between gap-4">
        <h1 className="flex items-center gap-2 text-2xl sm:text-3xl font-bold tracking-tight">
          <BarChart3 className="h-6 w-6 text-primary" />
          Finance
        </h1>
        <Link
          href="/admin"
          className="inline-flex items-center justify-center rounded-md bg-primary px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          <span className=" sm:inline">Back to Dashboard</span>
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <FinanceSummaryCards data={summaryData} />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <RevenueChartContainer
          monthlyData={revenueData.monthly}
          weeklyData={revenueData.weekly}
        />
        <ProductPerformanceList products={topProducts} />
      </div>
      <RecentTransactionsTable transactions={recentTransactions} />
    </div>
  );
}
