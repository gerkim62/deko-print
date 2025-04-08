import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RevenueChart } from "./revenue-chart"
type DataPoint = {
  name: string
  orders: number
  walkIns: number
}

type RevenueChartContainerProps = {
  monthlyData: DataPoint[]
  weeklyData: DataPoint[]
}

// Server component that passes data to the client component
export function RevenueChartContainer({ monthlyData, weeklyData }: RevenueChartContainerProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Overview</CardTitle>
        <CardDescription>Breakdown of revenue from orders and walk-ins</CardDescription>
      </CardHeader>
      <CardContent>
        <RevenueChart monthlyData={monthlyData} weeklyData={weeklyData} />
      </CardContent>
    </Card>
  )
}
