"use client"

import { useState } from "react"
import { PlusCircle, Pencil, Trash2, Package } from "lucide-react"
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
import { Textarea } from "@/components/ui/textarea"
import { PaginationControls } from "./pagination-controls"
import { EmptyState } from "./ui/empty-state"

// Import types from Prisma client
import type { Product } from "@prisma/client"

// Mock data for demonstration
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

export default function ProductsTab() {
  const [products, setProducts] = useState<Product[]>(mockProducts)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null)

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  const totalPages = Math.ceil(products.length / itemsPerPage)

  const paginatedProducts = products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleCreate = (data: Partial<Product>) => {
    const newProduct: Product = {
      id: `prod-${products.length + 1}`,
      title: data.title || "New Product",
      description: data.description || "",
      tags: data.tags || [],
      price: data.price || 0,
      image: data.image || "/placeholder.svg",
      category: data.category || "Accessory",
      stockRemaining: data.stockRemaining || 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    setProducts([...products, newProduct])
    setIsCreateDialogOpen(false)
  }

  const handleEdit = (data: Partial<Product>) => {
    if (!currentProduct) return

    const updatedProducts = products.map((product) =>
      product.id === currentProduct.id ? { ...product, ...data, updatedAt: new Date() } : product,
    )

    setProducts(updatedProducts)
    setIsEditDialogOpen(false)
    setCurrentProduct(null)
  }

  const handleDelete = (id: string) => {
    setProducts(products.filter((product) => product.id !== id))
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Products</CardTitle>
            <CardDescription>Manage your products.</CardDescription>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
                <DialogDescription>Create a new product. Click save when you're done.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input id="title" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Textarea id="description" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">
                    Category
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pre_owned">Pre-owned</SelectItem>
                      <SelectItem value="Accessory">Accessory</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="price" className="text-right">
                    Price
                  </Label>
                  <Input id="price" type="number" step="0.01" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="stock" className="text-right">
                    Stock
                  </Label>
                  <Input id="stock" type="number" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="image" className="text-right">
                    Image URL
                  </Label>
                  <Input id="image" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  onClick={() =>
                    handleCreate({
                      title: "New Product",
                      description: "Product description",
                      category: "Accessory",
                      price: 49.99,
                      stockRemaining: 10,
                      tags: ["new", "accessory"],
                    })
                  }
                >
                  Save
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {paginatedProducts.length === 0 ? (
          <EmptyState
            icon={Package}
            title="No products yet"
            description="Add products to your inventory to see them here."
            action={{
              label: "Add Product",
              onClick: () => setIsCreateDialogOpen(true),
            }}
          />
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead className="hidden md:table-cell">Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="hidden md:table-cell">Stock</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.id}</TableCell>
                    <TableCell>{product.title}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant="outline">
                        {product.category === "Pre_owned" ? "Pre-owned" : product.category}
                      </Badge>
                    </TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell className="hidden md:table-cell">{product.stockRemaining}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Dialog
                          open={isEditDialogOpen && currentProduct?.id === product.id}
                          onOpenChange={(open) => {
                            setIsEditDialogOpen(open)
                            if (open) setCurrentProduct(product)
                            else setCurrentProduct(null)
                          }}
                        >
                          <DialogTrigger asChild>
                            <Button variant="outline" size="icon" className="h-8 w-8">
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[525px]">
                            <DialogHeader>
                              <DialogTitle>Edit Product</DialogTitle>
                              <DialogDescription>
                                Make changes to the product. Click save when you're done.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-title" className="text-right">
                                  Title
                                </Label>
                                <Input id="edit-title" defaultValue={currentProduct?.title} className="col-span-3" />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-description" className="text-right">
                                  Description
                                </Label>
                                <Textarea
                                  id="edit-description"
                                  defaultValue={currentProduct?.description}
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-price" className="text-right">
                                  Price
                                </Label>
                                <Input
                                  id="edit-price"
                                  type="number"
                                  step="0.01"
                                  defaultValue={currentProduct?.price}
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-stock" className="text-right">
                                  Stock
                                </Label>
                                <Input
                                  id="edit-stock"
                                  type="number"
                                  defaultValue={currentProduct?.stockRemaining}
                                  className="col-span-3"
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button
                                type="submit"
                                onClick={() =>
                                  handleEdit({
                                    title: currentProduct?.title,
                                    price: (currentProduct?.price || 0) + 10,
                                    stockRemaining: (currentProduct?.stockRemaining || 0) + 5,
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
                                This action cannot be undone. This will permanently delete the product.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(product.id)}>Delete</AlertDialogAction>
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

