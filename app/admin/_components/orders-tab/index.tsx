"use client"

import { useState } from "react"
import { ShoppingCart } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import type { Order, Product, User } from "@prisma/client"
import { PaginationControls } from "../pagination-controls"
import { EmptyState } from "../ui/empty-state"
import { OrderCard } from "./order-card" 
import { OrderDetailsDialog } from "./order-details-dialog"
import { formatCurrency } from "@/lib/format"
export type OrderWithProductAndCustomer = Order & {
  product: Product
  customer: User
}

type Props = {
  orders: OrderWithProductAndCustomer[]
}

export default function OrdersTab({ orders }: Props) {
  const [openDetailDialog, setOpenDetailDialog] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<OrderWithProductAndCustomer | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 5
  const totalPages = Math.ceil(orders.length / itemsPerPage)
  const paginatedOrders = orders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const openOrderDetails = (order: OrderWithProductAndCustomer) => {
    setSelectedOrder(order)
    setOpenDetailDialog(true)
  }

  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Orders</CardTitle>
          <CardDescription>Manage customer orders and their status.</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        {paginatedOrders.length === 0 ? (
          <EmptyState
            icon={ShoppingCart}
            title="No orders yet"
            description="Orders will appear here when customers make purchases."
          />
        ) : (
          <>
            {/* Desktop view - Full table */}
            <div className="hidden md:block overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Price Paid</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>#{order.id}</TableCell>
                      <TableCell>{order.customer.name}</TableCell>
                      <TableCell>{order.product.title}</TableCell>
                      <TableCell>{order.quantity}</TableCell>
                      <TableCell>
                        <Badge variant={order.status === "Pending" ? "outline" : "default"}>
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{order.pricePaid ? `${formatCurrency(order.pricePaid)}` : "Unpaid"}</TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8"
                          onClick={() => openOrderDetails(order)}
                        >
                          Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Mobile view - Cards with expandable details */}
            <div className="md:hidden space-y-4">
              {paginatedOrders.map((order) => (
                <OrderCard key={order.id} order={order} onViewDetails={() => openOrderDetails(order)} />
              ))}
            </div>
          </>
        )}

        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />

        {selectedOrder && (
          <OrderDetailsDialog
            order={selectedOrder}
            open={openDetailDialog}
            onOpenChange={setOpenDetailDialog}
          />
        )}
      </CardContent>
    </Card>
  )
}
