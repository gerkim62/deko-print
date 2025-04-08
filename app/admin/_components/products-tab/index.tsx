"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Package, PlusCircle } from "lucide-react";
import { useState } from "react";
import { PaginationControls } from "../pagination-controls";
import { EmptyState } from "../ui/empty-state";
// Import types from Prisma client
import type { Product } from "@prisma/client";
import { ProductsTable } from "./products-table";
import { CreateProductForm } from "./create-product-form";

type Props = {
  products: Product[];
};

export default function ProductsTab({ products }: Props) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  const [canClose, setCanClose] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const openEditDialog = (product: Product) => {
    setCurrentProduct(product);
    setIsEditDialogOpen(true);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Products</CardTitle>
            <CardDescription>Manage your products.</CardDescription>
          </div>
          <Dialog
            open={isCreateDialogOpen}
            onOpenChange={(open) => canClose && setIsCreateDialogOpen(open)}
          >
            <DialogTrigger asChild>
              <Button size={"sm"}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </DialogTrigger>
            <CreateProductForm
              setCanClose={setCanClose}
              onSuccess={() => setIsCreateDialogOpen(false)}
            />
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
            <ProductsTable
              products={paginatedProducts}
              onEdit={openEditDialog}
              isEditDialogOpen={isEditDialogOpen}
              currentProduct={currentProduct}
              setIsEditDialogOpen={setIsEditDialogOpen}
              setCurrentProduct={setCurrentProduct}
            />
          </div>
        )}

        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </CardContent>
    </Card>
  );
}
