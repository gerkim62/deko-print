import { ArrowDownIcon, ArrowUpIcon, DollarSignIcon, PackageIcon, ShoppingCartIcon, TimerIcon } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/lib/format"
import type { RevenueSummary } from "../_types"

function getPercentage(part: number, total: number): string {
  if (!total || isNaN(part)) return "0.0%"
  return ((part / total) * 100).toFixed(1) + "%"
}

function getChange(current: number, previous: number): { value: string; isPositive: boolean } {
  if (!previous) return { value: "0.0%", isPositive: false }
  const change = ((current - previous) / previous) * 100
  return {
    value: Math.abs(change).toFixed(1) + "%",
    isPositive: change >= 0,
  }
}

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
          <div className="text-2xl font-bold">{formatCurrency(data.totalRevenue.cumulative)}</div>
          <div className="grid grid-cols-3 gap-2 mt-2 text-xs">
            <MetricChange
              label="Today"
              value={formatCurrency(data.totalRevenue.today)}
              change={getChange(data.totalRevenue.today, data.totalRevenue.yesterday)}
            />
            <MetricChange
              label="This Week"
              value={formatCurrency(data.totalRevenue.week)}
              change={getChange(data.totalRevenue.week, data.totalRevenue.lastWeek)}
            />
            <MetricChange
              label="This Month"
              value={formatCurrency(data.totalRevenue.month)}
              change={getChange(data.totalRevenue.month, data.totalRevenue.lastMonth)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Order Revenue</CardTitle>
          <ShoppingCartIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(data.orderRevenue.cumulative)}</div>
          <p className="text-xs text-muted-foreground mb-2">
            {getPercentage(data.orderRevenue.cumulative, data.totalRevenue.cumulative)} of total revenue
          </p>
          <div className="grid grid-cols-3 gap-2 mt-2 text-xs">
            <MetricChange
              label="Today"
              value={formatCurrency(data.orderRevenue.today)}
              change={getChange(data.orderRevenue.today, data.orderRevenue.yesterday)}
            />
            <MetricChange
              label="This Week"
              value={formatCurrency(data.orderRevenue.week)}
              change={getChange(data.orderRevenue.week, data.orderRevenue.lastWeek)}
            />
            <MetricChange
              label="This Month"
              value={formatCurrency(data.orderRevenue.month)}
              change={getChange(data.orderRevenue.month, data.orderRevenue.lastMonth)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Walk-in Revenue</CardTitle>
          <PackageIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(data.walkInRevenue.cumulative)}</div>
          <p className="text-xs text-muted-foreground mb-2">
            {getPercentage(data.walkInRevenue.cumulative, data.totalRevenue.cumulative)} of total revenue
          </p>
          <div className="grid grid-cols-3 gap-2 mt-2 text-xs">
            <MetricChange
              label="Today"
              value={formatCurrency(data.walkInRevenue.today)}
              change={getChange(data.walkInRevenue.today, data.walkInRevenue.yesterday)}
            />
            <MetricChange
              label="This Week"
              value={formatCurrency(data.walkInRevenue.week)}
              change={getChange(data.walkInRevenue.week, data.walkInRevenue.lastWeek)}
            />
            <MetricChange
              label="This Month"
              value={formatCurrency(data.walkInRevenue.month)}
              change={getChange(data.walkInRevenue.month, data.walkInRevenue.lastMonth)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending Orders Revenue</CardTitle>
          <TimerIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(data.pendingPayments.cumulative)}</div>
          <p className="text-xs text-muted-foreground mb-2">
            <span className="text-amber-500">
              {getPercentage(data.pendingPayments.cumulative, data.totalRevenue.cumulative)}
            </span>{" "}
            of potential revenue
          </p>
          <div className="grid grid-cols-3 gap-2 mt-2 text-xs">
            <MetricChange
              label="Today"
              value={formatCurrency(data.pendingPayments.today)}
              change={getChange(data.pendingPayments.today, data.pendingPayments.yesterday)}
            />
            <MetricChange
              label="This Week"
              value={formatCurrency(data.pendingPayments.week)}
              change={getChange(data.pendingPayments.week, data.pendingPayments.lastWeek)}
            />
            <MetricChange
              label="This Month"
              value={formatCurrency(data.pendingPayments.month)}
              change={getChange(data.pendingPayments.month, data.pendingPayments.lastMonth)}
            />
          </div>
        </CardContent>
      </Card>
    </>
  )
}

// Helper component for displaying metric changes with arrows
function MetricChange({
  label,
  value,
  change,
}: {
  label: string
  value: string
  change: { value: string; isPositive: boolean }
}) {
  return (
    <div className="bg-muted/50 rounded p-1.5">
      <div className="font-medium">{label}</div>
      <div>{value}</div>
      <div className={`flex items-center ${change.isPositive ? "text-green-500" : "text-red-500"}`}>
        {change.isPositive ? <ArrowUpIcon className="h-3 w-3 mr-1" /> : <ArrowDownIcon className="h-3 w-3 mr-1" />}
        {change.value}
      </div>
    </div>
  )
}
