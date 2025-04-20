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
import { updateService } from "@/actions/service";
import { uploadFiles } from "@/actions/files";
import { getReadableActionResult } from "@/lib/safe-action";
import { compressImage } from "@/lib/utils";
import type { z } from "zod";
import type { NewServiceSchema } from "@/validations/service";
import { ServiceCategory, type Service } from "@prisma/client";
import Image from "next/image";

type Props = {
  service: Service;
  onSuccess: () => void;
  setCanClose: (canClose: boolean) => void;
};

export function EditServiceForm({ service, onSuccess, setCanClose }: Props) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [editLoading, setEditLoading] = useState(false);

  const [formData, setFormData] = useState<
    Partial<z.infer<typeof NewServiceSchema>>
  >({
    title: "",
    description: "",
    category: "Printing",
    startingPrice: 0,
    tags: [],
  });

  useEffect(() => {
    setCanClose(!editLoading);
  }, [editLoading, setCanClose]);

  useEffect(() => {
    if (service) {
      setFormData({
        title: service.title,
        description: service.description,
        category: service.category,
        startingPrice: service.startingPrice || 0,
        tags: service.tags,
      });
      setImagePreview(service.image);
    }
  }, [service]);

  const handleInputChange = (
    field: string,
    value: string | number | string[] | null
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
    if (!service) {
      toast.error("No service selected");
      return;
    }

    setEditLoading(true);

    try {
      let imageUrl = service.image;

      const file = fileInputRef.current?.files?.[0];
      const shouldUploadImage =
        imagePreview && file && imagePreview !== service.image;

      if (shouldUploadImage) {
        const compressedFile = await toast.promise(compressImage(file), {
          pending: "Processing image...",
          error: "Failed to compress image",
        });

        if (!compressedFile) {
          toast.error("Failed to compress image");
          setEditLoading(false);
          return;
        }

        const formData = new FormData();
        formData.append("files", compressedFile);

        const uploadResult = await toast.promise(uploadFiles(formData), {
          pending: "Uploading image...",
          error: "Image upload failed",
        });

        const { message: imgMsg, success: imgSuccess } =
          getReadableActionResult(uploadResult);
        const uploadedUrl = uploadResult?.data?.data?.uploaded?.[0]?.url;

        if (!imgSuccess || !uploadedUrl) {
          toast.error(imgMsg);
          setEditLoading(false);
          return;
        }

        imageUrl = uploadedUrl;
      }

      const result = await toast.promise(
        updateService({
          id: service.id,
          ...formData,
          image: imageUrl ?? undefined,
        }),
        {
          pending: "Updating service...",
        }
      );

      const { success, message } = getReadableActionResult(result);

      if (!success) {
        toast.error(message);
        return;
      }

      toast.success("Service updated successfully");
      onSuccess();
    } catch (error) {
      console.error("Error updating service:", error);
      toast.error("Failed to update service. Please try again.");
    } finally {
      setEditLoading(false);
    }
  };

  return (
    <DialogContent className="sm:max-w-[525px]">
      <DialogHeader>
        <DialogTitle>Edit Service</DialogTitle>
        <DialogDescription className="text-sm">
          Make changes to the service.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-2 py-2">
        <div className="grid grid-cols-4 items-center gap-2">
          <Label htmlFor="edit-title" className="">
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
          <Label htmlFor="edit-description" className="">
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
          <Label htmlFor="edit-category" className="">
            Category
          </Label>
          <RadioGroup
            className="col-span-3 flex flex-wrap gap-4"
            value={formData.category}
            onValueChange={(value) => handleInputChange("category", value)}
          >
            {Object.values(ServiceCategory).map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <RadioGroupItem value={category} id={category} />
                <Label htmlFor={category}>{category.replaceAll("_"," ")}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <div className="grid grid-cols-4 items-center gap-2">
          <Label htmlFor="edit-startingPrice" className=" ">
            Price
          </Label>
          <Input
            id="edit-startingPrice"
            type="number"
            step="0.01"
            value={formData.startingPrice ?? ""}
            onChange={(e) =>
              handleInputChange("startingPrice", Number(e.target.valueAsNumber))
            }
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-start gap-2">
          <Label htmlFor="edit-image" className=" pt-2">
            Image
          </Label>
          <div className="col-span-3">
            <div
              className="w-full h-32 border-2 border-dashed rounded-md flex items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              {imagePreview ? (
                <Image
                  height={128}
                  width={128}
                  src={imagePreview || "/placeholder.svg"}
                  alt="Service preview"
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
