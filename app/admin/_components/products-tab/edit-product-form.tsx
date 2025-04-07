"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-toastify";
import { updateProduct } from "@/actions/product";
import { uploadFiles } from "@/actions/files";
import { getReadableActionResult } from "@/lib/safe-action";
import type { z } from "zod";
import type { NewProductSchema } from "@/validations/product";

// Import types from Prisma client
import type { Product } from "@prisma/client";

type Props = {
  product: Product;
  onSuccess: () => void;
};

export function EditProductForm({ product, onSuccess }: Props) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [editLoading, setEditLoading] = useState(false);

  // Form data state
  const [formData, setFormData] = useState<
    Partial<z.infer<typeof NewProductSchema>>
  >({
    title: "",
    description: "",
    category: "Accessory",
    price: 0,
    stockRemaining: 0,
    tags: [] as string[],
  });

  // Initialize form data when product changes
  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title,
        description: product.description,
        category: product.category,
        price: product.price,
        stockRemaining: product.stockRemaining,
        tags: product.tags,
      });
      setImagePreview(product.image);
    }
  }, [product]);

  // Form input handlers
  const handleInputChange = (field: string, value:string | number | string[] | null

  ) => {
    setFormData((prev) => ({
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

  const handleEdit = async () => {
    if (!product) {
      toast.error("No product selected");
      return;
    }

    setEditLoading(true);

    try {
      let imageUrl = product.image;

      // Upload new image if provided
      const file = fileInputRef.current?.files?.[0];
      const shouldUploadImage =
        imagePreview && file && imagePreview !== product.image;

      if (shouldUploadImage) {
        const formData = new FormData();
        formData.append("files", file);

        const uploadResult = await toast.promise(uploadFiles(formData), {
          pending: "Uploading image...",
        });
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
      const result = await toast.promise(
        updateProduct({
          id: product.id,
          ...formData,
          image: imageUrl ?? undefined,
        }),
        {
          pending: "Updating product...",
        }
      );

      const { success, message } = getReadableActionResult(result);

      if (!success) {
        toast.error(message);
        return;
      }

      toast.success("Product updated successfully");
      onSuccess();
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product. Please try again.");
    } finally {
      setEditLoading(false);
    }
  };

  return (
    <DialogContent className="sm:max-w-[525px]">
      <DialogHeader>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogDescription className="text-sm">
          Make changes to the product.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-2 py-2">
        <div className="grid grid-cols-4 items-center gap-2">
          <Label htmlFor="edit-title" className="text-right">
            Name
          </Label>
          <Input
            id="edit-title"
            value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-2">
          <Label htmlFor="edit-description" className="text-right">
            Description
          </Label>
          <Textarea
            id="edit-description"
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            className="col-span-3 h-20"
          />
        </div>
        <div className="grid grid-cols-4 items-start gap-2">
          <Label htmlFor="edit-category" className="text-right">
            Category
          </Label>
          <RadioGroup
            className="col-span-3 flex gap-4"
            value={formData.category}
            onValueChange={(value) => handleInputChange("category", value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Accessory" id="edit-accessory" />
              <Label htmlFor="edit-accessory">Accessory</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Pre_owned" id="edit-pre-owned" />
              <Label htmlFor="edit-pre-owned">Pre-owned</Label>
            </div>
          </RadioGroup>
        </div>
        <div className="grid grid-cols-4 items-center gap-2">
          <Label htmlFor="edit-price" className="text-right">
            Price
          </Label>
          <Input
            id="edit-price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => handleInputChange("price", Number(e.target.value))}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-2">
          <Label htmlFor="edit-stock" className="text-right">
            Stock
          </Label>
          <Input
            id="edit-stock"
            type="number"
            value={formData.stockRemaining}
            onChange={(e) =>
              handleInputChange("stockRemaining", Number(e.target.value))
            }
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-start gap-2">
          <Label htmlFor="edit-image" className="text-right pt-2">
            Image
          </Label>
          <div className="col-span-3">
            <div
              className="w-full h-32 border-2 border-dashed rounded-md flex items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              {imagePreview ? (
                <img
                  src={imagePreview || "/placeholder.svg"}
                  alt="Product preview"
                  className="h-full object-contain"
                />
              ) : (
                <div className="flex flex-col items-center gap-1 text-gray-500">
                  <Upload className="h-6 w-6" />
                  <span className="text-sm">Click to upload an image</span>
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
        <Button type="submit" onClick={handleEdit} disabled={editLoading}>
          {editLoading ? "Saving..." : "Save changes"}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
