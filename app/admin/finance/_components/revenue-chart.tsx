import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type DataPoint = {
  name: string;
  orders: number;
  walkIns: number;
};

type ChartProps = {
  data: DataPoint[];
};

// Chart component for displaying data
const Chart = ({ data }: ChartProps) => {
  // Find the maximum value for scaling
  const maxValue = Math.max(
    ...data.map((item) => Math.max(item.orders, item.walkIns))
  );

  return (
    <div className="h-[300px] w-full">
      <div className="flex items-center justify-between mb-2 text-sm text-muted-foreground">
        <div>Orders</div>
        <div>Walk-ins</div>
      </div>
      <div className="flex items-end h-[250px] gap-2">
        {data.map((item, index) => (
          <div key={index} className="flex-1 flex flex-col items-center gap-1">
            <div className="w-full flex flex-col items-center gap-1">
              {/* Orders bar */}
              <div
                className="w-full bg-primary rounded-t"
                style={{
                  height: `${(item.orders / maxValue) * 200}px`,
                }}
              />
              {/* Walk-ins bar */}
              <div
                className="w-full bg-green-500 rounded-t"
                style={{
                  height: `${(item.walkIns / maxValue) * 200}px`,
                }}
              />
            </div>
            <div className="text-xs mt-1">{item.name}</div>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-primary rounded-sm"></div>
          <span className="text-sm">Order Revenue</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
          <span className="text-sm">Walk-in Revenue</span>
        </div>
      </div>
    </div>
  );
};

type RevenueChartProps = {
  monthlyData: DataPoint[];
  weeklyData: DataPoint[];
};

export function RevenueChart({ monthlyData, weeklyData }: RevenueChartProps) {
  return (
    <Tabs defaultValue="monthly" className="w-full mb-4">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="monthly">Monthly</TabsTrigger>
        <TabsTrigger value="weekly">Weekly</TabsTrigger>
      </TabsList>
      <TabsContent value="monthly">
        <Chart data={monthlyData} />
      </TabsContent>
      <TabsContent value="weekly">
        <Chart data={weeklyData} />
      </TabsContent>
    </Tabs>
  );
}
