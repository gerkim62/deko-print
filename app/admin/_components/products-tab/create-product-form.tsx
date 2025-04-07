"use client";

import type React from "react";

import { useState, useRef } from "react";
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

type Props = {
  onSuccess: () => void;
};

export function CreateProductForm({ onSuccess }: Props) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [createLoading, setCreateLoading] = useState(false);

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
  const handleInputChange = (field: string, value: any) => {
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
      const errorMessages = validationResult.error.errors.map(
        (error) => error.message
      );
      toast.error(errorMessages.join(", "));
      setCreateLoading(false);
      return;
    }

    try {
      let imageUrl = "/placeholder.svg";

      // Upload image if provided
      const file = fileInputRef.current?.files?.[0];
      if (file && imagePreview) {
        const formData = new FormData();
        formData.append("files", file);

        const uploadResult = await toast.promise(uploadFiles(formData), {
          pending: "Uploading image...",
          error: "Failed to upload image",
        });

        const { message: imgMsg, success: imgSuccess } =
          getReadableActionResult(uploadResult);

        if (!imgSuccess) {
          toast.error(imgMsg);
          return;
        }

        const uploadedUrl = uploadResult?.data?.data?.uploaded?.[0]?.url;

        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        }
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
            Title
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
            className="col-span-3 flex gap-4"
            value={formData.category}
            onValueChange={(value) => handleInputChange("category", value)}
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
        <Button type="submit" onClick={handleCreate} disabled={createLoading}>
          {createLoading ? "Creating..." : "Save Product"}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
