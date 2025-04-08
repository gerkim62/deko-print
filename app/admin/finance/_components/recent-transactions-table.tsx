import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency, formatDate, formatDateTime } from "@/lib/format";
import type { Transaction } from "../_types";

// Server component that receives data as props
export function RecentTransactionsTable({
  transactions,
}: {
  transactions: Transaction[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>Latest financial activities</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Table view (hidden on mobile, shown on md screens and up) */}
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    No transactions available
                  </TableCell>
                </TableRow>
              )}
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">
                    {formatDate(transaction.date)}
                  </TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>{transaction.customer}</TableCell>
                  <TableCell>
                    {transaction.type === "order" ? (
                      <Badge
                        variant={
                          transaction.status === "Pending" ? "outline" : "default"
                        }
                      >
                        {transaction.status}
                      </Badge>
                    ) : (
                      <Badge variant="secondary">Walk-in</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(transaction.amount)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Card view (shown on mobile, hidden on md screens and up) */}
        <div className="md:hidden space-y-4">
          {transactions.length === 0 ? (
            <div className="text-center py-4 text-gray-500">No transactions available</div>
          ) : (
            transactions.map((transaction) => (
              <div 
                key={transaction.id}
                className="border rounded-lg p-4 shadow-sm"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="font-medium">{formatDateTime(transaction.date)}</div>
                  <div>
                    {transaction.type === "order" ? (
                      <Badge
                        variant={
                          transaction.status === "Pending" ? "outline" : "default"
                        }
                      >
                        {transaction.status}
                      </Badge>
                    ) : (
                      <Badge variant="secondary">Walk-in</Badge>
                    )}
                  </div>
                </div>
                
                <div className="mb-1 text-sm text-gray-500">{transaction.description}</div>
                <div className="mb-3 text-sm">{transaction.customer}</div>
                
                <div className="flex justify-end font-medium">
                  {formatCurrency(transaction.amount)}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}