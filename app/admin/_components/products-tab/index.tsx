"use client";

import { useState, useRef } from "react";
import { PlusCircle, Pencil, Trash2, Package, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
import { Textarea } from "@/components/ui/textarea";
import { PaginationControls } from "../pagination-controls";
import { EmptyState } from "../ui/empty-state";

// Import types from Prisma client
import type { Product } from "@prisma/client";
import { formatCurrency } from "@/lib/format";
import { toast } from "react-toastify";
import { updateProduct, deleteProduct } from "@/actions/product";
import { getReadableActionResult } from "@/lib/safe-action";
import { uploadFiles } from "@/actions/files";
import { z } from "zod";
import { NewProductSchema } from "@/validations/product";

type Props = {
  products: Product[];
};

export default function ProductsTab({ products }: Props) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [editImagePreview, setEditImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);

  const [createLoading, setCreateLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // New form data states
  const [createFormData, setCreateFormData] = useState({
    title: "",
    description: "",
    category: "Accessory",
    price: 0,
    stockRemaining: 0,
    tags: ["new"],
  });

  const [editFormData, setEditFormData] = useState<
    Partial<z.infer<typeof NewProductSchema>>
  >({
    title: "",
    description: "",
    category: "Accessory",
    price: 0,
    stockRemaining: 0,
    tags: [] as string[],
  });

  // Create form input handlers
  const handleCreateInputChange = (field: string, value: any) => {
    setCreateFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Edit form input handlers
  const handleEditInputChange = (field: string, value: any) => {
    setEditFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetCreateForm = () => {
    setCreateFormData({
      title: "",
      description: "",
      category: "Accessory",
      price: 0,
      stockRemaining: 0,
      tags: ["new"],
    });
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const openEditDialog = (product: Product) => {
    setCurrentProduct(product);
    setEditImagePreview(product.image);
    setEditFormData({
      title: product.title,
      description: product.description,
      category: product.category,
      price: product.price,
      stockRemaining: product.stockRemaining,
      tags: product.tags,
    });
    setIsEditDialogOpen(true);
  };

  const handleCreate = async () => {
    setCreateLoading(true);

    try {
      let imageUrl = "/placeholder.svg";

      // Upload image if provided
      const file = fileInputRef.current?.files?.[0];
      if (file && imagePreview) {
        const formData = new FormData();
        formData.append("files", file);

        const uploadResult = await uploadFiles(formData);
        const uploadedUrl = uploadResult?.data?.data?.uploaded?.[0]?.url;

        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        }
      }

      // Create the product with form data
      const result = await createProduct({
        ...createFormData,
        image: imageUrl,
      });

      const { success, message } = getReadableActionResult(result);

      if (!success) {
        toast.error(message);
        return;
      }

      toast.success("Product created successfully");
      setIsCreateDialogOpen(false);
      resetCreateForm();
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("Failed to create product. Please try again.");
    } finally {
      setCreateLoading(false);
    }
  };

  const handleEdit = async () => {
    if (!currentProduct) {
      toast.error("No product selected");
      return;
    }

    setEditLoading(true);

    try {
      let imageUrl = currentProduct.image;

      // Upload new image if provided
      const file = editFileInputRef.current?.files?.[0];
      const shouldUploadImage =
        editImagePreview && file && editImagePreview !== currentProduct.image;

      if (shouldUploadImage) {
        const formData = new FormData();
        formData.append("files", file);

        const uploadResult = await uploadFiles(formData);
        const uploadedUrl = uploadResult?.data?.data?.uploaded?.[0]?.url;

        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        } else {
          console.warn("Image upload returned no URL,");
          toast.error("Image upload failed. Please try again.");
          return;
        }
      }

      // Update the product with form data
      const result = await updateProduct({
        id: currentProduct.id,
        ...editFormData,

        image: imageUrl ?? undefined,
      });

      const { success, message } = getReadableActionResult(result);

      if (!success) {
        toast.error(message);
        return;
      }

      toast.success("Product updated successfully");
      setIsEditDialogOpen(false);
      setCurrentProduct(null);
      setEditImagePreview(null);
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product. Please try again.");
    } finally {
      setEditLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeleteLoading(id);

    try {
      const result = await deleteProduct({ id });
      const { success, message } = getReadableActionResult(result);

      if (!success) {
        toast.error(message);
        return;
      }

      toast.success("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product. Please try again.");
    } finally {
      setDeleteLoading(null);
    }
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
            onOpenChange={(open) => {
              setIsCreateDialogOpen(open);
              if (!open) resetCreateForm();
            }}
          >
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
              </DialogHeader>
              <div className="grid gap-2 py-2">
                <div className="grid grid-cols-4 items-center gap-2">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="title"
                    className="col-span-3"
                    value={createFormData.title}
                    onChange={(e) =>
                      handleCreateInputChange("title", e.target.value)
                    }
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-2">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    className="col-span-3 h-20"
                    value={createFormData.description}
                    onChange={(e) =>
                      handleCreateInputChange("description", e.target.value)
                    }
                  />
                </div>
                <div className="grid grid-cols-4 items-start gap-2">
                  <Label htmlFor="category" className="text-right">
                    Category
                  </Label>
                  <RadioGroup
                    className="col-span-3 flex gap-4"
                    value={createFormData.category}
                    onValueChange={(value) =>
                      handleCreateInputChange("category", value)
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Accessory" id="accessory" />
                      <Label htmlFor="accessory">Accessory</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Pre_owned" id="pre-owned" />
                      <Label htmlFor="pre-owned">Pre-owned</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="grid grid-cols-4 items-center gap-2">
                  <Label htmlFor="price" className="text-right">
                    Price
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    className="col-span-3"
                    value={createFormData.price}
                    onChange={(e) =>
                      handleCreateInputChange("price", Number(e.target.value))
                    }
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-2">
                  <Label htmlFor="stock" className="text-right">
                    Stock
                  </Label>
                  <Input
                    id="stock"
                    type="number"
                    className="col-span-3"
                    value={createFormData.stockRemaining}
                    onChange={(e) =>
                      handleCreateInputChange(
                        "stockRemaining",
                        Number(e.target.value)
                      )
                    }
                  />
                </div>
                <div className="grid grid-cols-4 items-start gap-2">
                  <Label htmlFor="image" className="text-right pt-2">
                    Image
                  </Label>
                  <div className="col-span-3">
                    <div
                      className="w-full h-32 border-2 border-dashed rounded-md flex items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Product preview"
                          className="h-full object-contain"
                        />
                      ) : (
                        <div className="flex flex-col items-center gap-1 text-gray-500">
                          <Upload className="h-6 w-6" />
                          <span className="text-sm">
                            Click to upload an image
                          </span>
                        </div>
                      )}
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                    />
                  </div>
                </div>
              </div>
              <DialogFooter className="mt-2">
                <Button
                  type="submit"
                  onClick={handleCreate}
                  disabled={createLoading}
                >
                  {createLoading ? "Creating..." : "Save Product"}
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
                  <TableHead className="hidden md:table-cell">
                    Category
                  </TableHead>
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
                          open={
                            isEditDialogOpen &&
                            currentProduct?.id === product.id
                          }
                          onOpenChange={(open) => {
                            if (!open) {
                              setIsEditDialogOpen(false);
                              setCurrentProduct(null);
                              setEditImagePreview(null);
                            }
                          }}
                        >
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => openEditDialog(product)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[525px]">
                            <DialogHeader>
                              <DialogTitle>Edit Product</DialogTitle>
                              <DialogDescription className="text-sm">
                                Make changes to the product.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-2 py-2">
                              <div className="grid grid-cols-4 items-center gap-2">
                                <Label
                                  htmlFor="edit-title"
                                  className="text-right"
                                >
                                  Title
                                </Label>
                                <Input
                                  id="edit-title"
                                  value={editFormData.title}
                                  onChange={(e) =>
                                    handleEditInputChange(
                                      "title",
                                      e.target.value
                                    )
                                  }
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-2">
                                <Label
                                  htmlFor="edit-description"
                                  className="text-right"
                                >
                                  Description
                                </Label>
                                <Textarea
                                  id="edit-description"
                                  value={editFormData.description}
                                  onChange={(e) =>
                                    handleEditInputChange(
                                      "description",
                                      e.target.value
                                    )
                                  }
                                  className="col-span-3 h-20"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-start gap-2">
                                <Label
                                  htmlFor="edit-category"
                                  className="text-right"
                                >
                                  Category
                                </Label>
                                <RadioGroup
                                  className="col-span-3 flex gap-4"
                                  value={editFormData.category}
                                  onValueChange={(value) =>
                                    handleEditInputChange("category", value)
                                  }
                                >
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                      value="Accessory"
                                      id="edit-accessory"
                                    />
                                    <Label htmlFor="edit-accessory">
                                      Accessory
                                    </Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                      value="Pre_owned"
                                      id="edit-pre-owned"
                                    />
                                    <Label htmlFor="edit-pre-owned">
                                      Pre-owned
                                    </Label>
                                  </div>
                                </RadioGroup>
                              </div>
                              <div className="grid grid-cols-4 items-center gap-2">
                                <Label
                                  htmlFor="edit-price"
                                  className="text-right"
                                >
                                  Price
                                </Label>
                                <Input
                                  id="edit-price"
                                  type="number"
                                  step="0.01"
                                  value={editFormData.price}
                                  onChange={(e) =>
                                    handleEditInputChange(
                                      "price",
                                      Number(e.target.value)
                                    )
                                  }
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-2">
                                <Label
                                  htmlFor="edit-stock"
                                  className="text-right"
                                >
                                  Stock
                                </Label>
                                <Input
                                  id="edit-stock"
                                  type="number"
                                  value={editFormData.stockRemaining}
                                  onChange={(e) =>
                                    handleEditInputChange(
                                      "stockRemaining",
                                      Number(e.target.value)
                                    )
                                  }
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-start gap-2">
                                <Label
                                  htmlFor="edit-image"
                                  className="text-right pt-2"
                                >
                                  Image
                                </Label>
                                <div className="col-span-3">
                                  <div
                                    className="w-full h-32 border-2 border-dashed rounded-md flex items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                                    onClick={() =>
                                      editFileInputRef.current?.click()
                                    }
                                  >
                                    {editImagePreview ? (
                                      <img
                                        src={editImagePreview}
                                        alt="Product preview"
                                        className="h-full object-contain"
                                      />
                                    ) : (
                                      <div className="flex flex-col items-center gap-1 text-gray-500">
                                        <Upload className="h-6 w-6" />
                                        <span className="text-sm">
                                          Click to upload an image
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    ref={editFileInputRef}
                                    onChange={handleEditImageUpload}
                                  />
                                </div>
                              </div>
                            </div>
                            <DialogFooter className="mt-2">
                              <Button
                                type="submit"
                                onClick={handleEdit}
                                disabled={editLoading}
                              >
                                {editLoading ? "Saving..." : "Save changes"}
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently delete the product.
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
