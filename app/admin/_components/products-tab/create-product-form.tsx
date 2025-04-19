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
import { uploadFiles } from "@/actions/files";
import { getReadableActionResult } from "@/lib/safe-action";

// This is missing from the original code, but needed
// You'll need to create this function in your actions/product.ts file
import { addProduct } from "@/actions/product";
import { z } from "zod";
import { NewProductSchema } from "@/validations/product";
import { compressImage } from "@/lib/utils";
import { ProductCategory } from "@prisma/client";
import Image from "next/image";

type Props = {
  onSuccess: () => void;
  setCanClose: (canClose: boolean) => void;
};

export function CreateProductForm({ onSuccess, setCanClose }: Props) {
  console.log(ProductCategory)
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [createLoading, setCreateLoading] = useState(false);

  useEffect(() => {
    setCanClose(!createLoading);
  }, [createLoading, setCanClose]);

  // Form data state
  const [formData, setFormData] = useState<z.infer<typeof NewProductSchema>>({
    title: "",
    description: "",
    category: "Accessory",
    price: 0,
    stockRemaining: 0,
    tags: [],
  });

  // Form input handlers
  const handleInputChange = (field: string, value: string | number) => {
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

  const resetForm = () => {
    setFormData({
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

  const handleCreate = async () => {
    setCreateLoading(true);

    // Validate form data
    const validationResult = NewProductSchema.safeParse(formData);

    if (!validationResult.success) {
      const errorMessage = validationResult.error.errors[0].message;
      toast.error(errorMessage);
      setCreateLoading(false);
      return;
    }

    try {
      let imageUrl = "/placeholder.svg";

      // Upload image if provided
      const file = fileInputRef.current?.files?.[0];
      if (file && imagePreview) {
        // Compress the image before uploading
        const compressedFile = await toast.promise(compressImage(file), {
          pending: "Processing image...",
          error: "Failed to compress image",
        });
        if (!compressedFile) {
          toast.error("Failed to compress image");
          return;
        }

        const formData = new FormData();
        formData.append("files", compressedFile);

        const uploadResult = await toast.promise(uploadFiles(formData), {
          pending: "Uploading image...",
          error: "Failed to upload image",
        });

        const { message: imgMsg, success: imgSuccess } =
          getReadableActionResult(uploadResult);
        const uploadedUrl = uploadResult?.data?.data?.uploaded?.[0]?.url;

        if (!imgSuccess || !uploadedUrl) {
          toast.error(imgMsg);
          return;
        }

        imageUrl = uploadedUrl;
      } else {
        toast.error("Image is required");
        return;
      }

      // Create the product with form data
      const result = await toast.promise(
        addProduct({
          ...formData,
          image: imageUrl,
        }),
        {
          pending: "Adding product...",
        }
      );

      const { success, message } = getReadableActionResult(result);

      if (!success) {
        toast.error(message);
        return;
      }

      toast.success(message);
      resetForm();
      onSuccess();
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("Failed to add product. Please try again.");
    } finally {
      setCreateLoading(false);
    }
  };

  return (
    <DialogContent className="sm:max-w-[525px]">
      <DialogHeader>
        <DialogTitle>Add New Product</DialogTitle>
        <DialogDescription>
          Fill in the details to create a new product.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-2 py-2">
        <div className="grid grid-cols-4 items-center gap-2">
          <Label htmlFor="title" className="text-right">
            Name
          </Label>
          <Input
            id="title"
            className="col-span-3"
            value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-2">
          <Label htmlFor="description" className="text-right">
            Description
          </Label>
          <Textarea
            id="description"
            className="col-span-3 h-20"
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
          />
        </div>
        <div className="grid grid-cols-4 items-start gap-2">
          <Label htmlFor="category" className="text-right">
            Category
          </Label>
          <RadioGroup
            className="col-span-3 flex flex-wrap gap-4"
            value={formData.category}
            onValueChange={(value) => handleInputChange("category", value)}
          >
            {Object.values(ProductCategory).map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <RadioGroupItem value={category} id={category} />
                <Label htmlFor={category}>{category.replace("_", "-")}</Label>
              </div>
            ))}
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
            value={formData.price}
            onChange={(e) => handleInputChange("price", e.target.valueAsNumber)}
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
            value={formData.stockRemaining}
            onChange={(e) =>
              handleInputChange("stockRemaining", e.target.valueAsNumber)
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
                <Image
                  width={320}
                  height={320}
                  src={imagePreview}
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
        <Button type="submit" onClick={handleCreate} disabled={createLoading}>
          {createLoading ? "Creating..." : "Save Product"}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
