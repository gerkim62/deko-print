import {
  DollarSignIcon,
  PackageIcon,
  ShoppingCartIcon,
  TimerIcon
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/format";
import type { RevenueSummary } from "../_types";

// This component receives data as props from the server component
export function FinanceSummaryCards({ data }: { data: RevenueSummary }) {
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(data.totalRevenue)}
          </div>
          <p className="text-xs text-muted-foreground">
            {/* just any text */}
            Revenue from all sources
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Order Revenue</CardTitle>
          <ShoppingCartIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(data.orderRevenue)}
          </div>
          <p className="text-xs text-muted-foreground">
            {((data.orderRevenue / data.totalRevenue) * 100).toFixed(1)}% of
            total revenue
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Walk-in Revenue</CardTitle>
          <PackageIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(data.walkInRevenue)}
          </div>
          <p className="text-xs text-muted-foreground">
            {((data.walkInRevenue / data.totalRevenue) * 100).toFixed(1)}% of
            total revenue
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Pending Orders Revenue
          </CardTitle>
          <TimerIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(data.pendingPayments)}
          </div>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <span className="text-amber-500 flex items-center">
              {((data.pendingPayments / data.totalRevenue) * 100).toFixed(1)}%
            </span>{" "}
            of potential revenue
          </span>
        </CardContent>
      </Card>
    </>
  );
}
