import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ProductPerformanceItem } from "../_types";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/format";

// Server component that receives data as props
export function ProductPerformanceList({
  products,
}: {
  products: ProductPerformanceItem[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Performing Items</CardTitle>
        <CardDescription>
          Products and services generating the most revenue
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {products.length === 0 && (
            <div className="text-center text-sm text-muted-foreground">
              No items available
            </div>
          )}
          {products.map((product) => (
            <div key={product.id} className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {product.title}
                </p>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{product.category}</Badge>
                  <p className="text-xs text-muted-foreground">
                    {product.unitsSold} sold
                    {product.stockRemaining !== null
                      ? ` • ${product.stockRemaining} in stock`
                      : " • Service"}
                  </p>
                </div>
              </div>
              <div className="font-medium">
                {formatCurrency(product.revenue)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
