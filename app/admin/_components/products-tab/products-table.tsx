"use client";

import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
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
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/format";
import { toast } from "react-toastify";
import { deleteProduct } from "@/actions/product";
import { getReadableActionResult } from "@/lib/safe-action";

// Import types from Prisma client
import type { Product } from "@prisma/client";
import { EditProductForm } from "./edit-product-form";

type Props = {
  products: Product[];
  onEdit: (product: Product) => void;
  isEditDialogOpen: boolean;
  currentProduct: Product | null;
  setIsEditDialogOpen: (open: boolean) => void;
  setCurrentProduct: (product: Product | null) => void;
};

export function ProductsTable({
  products,
  onEdit,
  isEditDialogOpen,
  currentProduct,
  setIsEditDialogOpen,
  setCurrentProduct,
}: Props) {
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  const [canClose, setCanClose] = useState(false);

  const handleDelete = async (id: string) => {
    setDeleteLoading(id);

    try {
      const result = await toast.promise(deleteProduct({ id }), {
        pending: "Deleting product...",
      });
      const { success, message } = getReadableActionResult(result);

      if (!success) {
        toast.error(message);
        return;
      }

      toast.success(message);
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product. Please try again.");
    } finally {
      setDeleteLoading(null);
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead className="hidden md:table-cell">Category</TableHead>
          <TableHead>Price</TableHead>
          <TableHead className="hidden md:table-cell">Stock</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>
              {product.title} ({product.stockRemaining})
            </TableCell>
            <TableCell className="hidden md:table-cell">
              <Badge variant="outline">
                {product.category === "Pre_owned"
                  ? "Pre-owned"
                  : product.category}
              </Badge>
            </TableCell>
            <TableCell>{formatCurrency(product.price)}</TableCell>
            <TableCell className="hidden md:table-cell">
              {product.stockRemaining}
            </TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Dialog
                  open={isEditDialogOpen && currentProduct?.id === product.id}
                  onOpenChange={(open) => {
                    if (!open && canClose) {
                      setIsEditDialogOpen(false);
                      setCurrentProduct(null);
                    }
                  }}
                >
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => onEdit(product)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  {currentProduct && (
                    <EditProductForm
                      setCanClose={setCanClose}
                      product={currentProduct}
                      onSuccess={() => {
                        setIsEditDialogOpen(false);
                        setCurrentProduct(null);
                      }}
                    />
                  )}
                </Dialog>

                <AlertDialog
                  onOpenChange={(open) => {
                    if (!open && !deleteLoading) {
                      setDeleteLoading(null);
                    }
                  }}
                >
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete the product. All orders associated with this
                        product will also be deleted.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(product.id)}
                        disabled={deleteLoading === product.id}
                      >
                        {deleteLoading === product.id
                          ? "Deleting..."
                          : "Delete"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
