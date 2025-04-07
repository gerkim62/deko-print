"use client"

import { useState } from "react"
import { Pencil, Trash2, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"

// Import types from Prisma client
import type { Order, Product, User } from "@prisma/client"
import { PaginationControls } from "./pagination-controls"
import { EmptyState } from "./ui/empty-state"

// Mock data for demonstration
const mockOrders: Order[] = [
  {
    id: 1,
    customerId: "user-1",
    productId: "prod-1",
    quantity: 2,
    pricePaid: 150.0,
    status: "Pending",
    deliveryLocation: "123 Main St, City",
    phoneNumber: "555-123-4567",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    customerId: "user-2",
    productId: "prod-2",
    quantity: 1,
    pricePaid: null,
    status: "Fullfilled",
    deliveryLocation: "456 Oak Ave, Town",
    phoneNumber: "555-987-6543",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

const mockProducts: Product[] = [
  {
    id: "prod-1",
    title: "Laptop Charger",
    description: "Universal laptop charger",
    tags: ["electronics", "charger"],
    price: 75.0,
    image: "/placeholder.svg",
    category: "Accessory",
    stockRemaining: 15,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "prod-2",
    title: "Used Smartphone",
    description: "Refurbished smartphone in excellent condition",
    tags: ["phone", "pre-owned"],
    price: 299.99,
    image: "/placeholder.svg",
    category: "Pre_owned",
    stockRemaining: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

const mockUsers: User[] = [

]

export default function OrdersTab() {
  const [orders, setOrders] = useState<Order[]>(mockOrders)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null)
  const [isDeliveredDialogOpen, setIsDeliveredDialogOpen] = useState(false)
  const [orderToMarkDelivered, setOrderToMarkDelivered] = useState<Order | null>(null)

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  const totalPages = Math.ceil(orders.length / itemsPerPage)

  const paginatedOrders = orders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const getProductTitle = (productId: string) => {
    const product = mockProducts.find((p) => p.id === productId)
    return product ? product.title : "Unknown Product"
  }

  const getCustomerName = (customerId: string) => {
    const user = mockUsers.find((u) => u.id === customerId)
    return user ? user.name : "Unknown Customer"
  }


  const handleEdit = (data: Partial<Order>) => {
    if (!currentOrder) return

    const updatedOrders = orders.map((order) =>
      order.id === currentOrder.id ? { ...order, ...data, updatedAt: new Date() } : order,
    )

    setOrders(updatedOrders)
    setIsEditDialogOpen(false)
    setCurrentOrder(null)
  }

  const handleDelete = (id: number) => {
    setOrders(orders.filter((order) => order.id !== id))
  }

  const handleMarkDelivered = (orderId: number, pricePaid: number) => {
    const updatedOrders:Order[] = orders.map((order) =>
      order.id === orderId ? { ...order, status: "Fullfilled", pricePaid, updatedAt: new Date() } : order,
    )

    setOrders(updatedOrders)
    setIsDeliveredDialogOpen(false)
    setOrderToMarkDelivered(null)
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
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead className="hidden md:table-cell">Product</TableHead>
                  <TableHead className="hidden md:table-cell">Quantity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Price Paid</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{getCustomerName(order.customerId)}</TableCell>
                    <TableCell className="hidden md:table-cell">{getProductTitle(order.productId)}</TableCell>
                    <TableCell className="hidden md:table-cell">{order.quantity}</TableCell>
                    <TableCell>
                      <Badge variant={order.status === "Pending" ? "outline" : "default"}>{order.status}</Badge>
                    </TableCell>
                    <TableCell>{order.pricePaid ? `$${order.pricePaid.toFixed(2)}` : "Unpaid"}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        {order.status === "Pending" && (
                          <Dialog
                            open={isDeliveredDialogOpen && orderToMarkDelivered?.id === order.id}
                            onOpenChange={(open) => {
                              setIsDeliveredDialogOpen(open)
                              if (open) setOrderToMarkDelivered(order)
                              else setOrderToMarkDelivered(null)
                            }}
                          >
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" className="h-8">
                                Mark Delivered
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                              <DialogHeader>
                                <DialogTitle>Mark Order as Delivered</DialogTitle>
                                <DialogDescription>Enter the amount paid by the customer.</DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="pricePaid" className="text-right">
                                    Amount Paid
                                  </Label>
                                  <Input
                                    id="pricePaid"
                                    type="number"
                                    step="0.01"
                                    defaultValue={orderToMarkDelivered?.pricePaid || ""}
                                    className="col-span-3"
                                  />
                                </div>
                              </div>
                              <DialogFooter>
                                <Button
                                  type="submit"
                                  onClick={() =>
                                    handleMarkDelivered(
                                      orderToMarkDelivered?.id || 0,
                                      200.0, // This would be the actual value from the input
                                    )
                                  }
                                >
                                  Confirm
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        )}

                        <Dialog
                          open={isEditDialogOpen && currentOrder?.id === order.id}
                          onOpenChange={(open) => {
                            setIsEditDialogOpen(open)
                            if (open) setCurrentOrder(order)
                            else setCurrentOrder(null)
                          }}
                        >
                          <DialogTrigger asChild>
                            <Button variant="outline" size="icon" className="h-8 w-8">
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Edit Order</DialogTitle>
                              <DialogDescription>
                                Make changes to the order. Click save when you're done.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-quantity" className="text-right">
                                  Quantity
                                </Label>
                                <Input
                                  id="edit-quantity"
                                  type="number"
                                  min="1"
                                  defaultValue={currentOrder?.quantity}
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-status" className="text-right">
                                  Status
                                </Label>
                                <Select defaultValue={currentOrder?.status}>
                                  <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select status" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Pending">Pending</SelectItem>
                                    <SelectItem value="Fullfilled">Fulfilled</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-pricePaid" className="text-right">
                                  Price Paid
                                </Label>
                                <Input
                                  id="edit-pricePaid"
                                  type="number"
                                  step="0.01"
                                  defaultValue={currentOrder?.pricePaid || ""}
                                  className="col-span-3"
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button
                                type="submit"
                                onClick={() =>
                                  handleEdit({
                                    quantity: currentOrder?.quantity || 1,
                                    status: "Fullfilled",
                                    pricePaid: 200.0,
                                  })
                                }
                              >
                                Save changes
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="icon" className="h-8 w-8">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the order.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(order.id)}>Delete</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        <PaginationControls currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </CardContent>
    </Card>
  )
}

