import { ProductCategory } from "@prisma/client";
import { z } from "zod";

export const NewProductSchema = z.object({
  title: z.string().min(1, "Please enter a product title."),
  description: z.string().min(1, "Please provide a product description."),
  tags: z.array(z.string()).default([]),
  price: z.number().positive("Price must be greater than 0."),
  image: z.string().url("Please enter a valid image.").optional(),
  category: z.nativeEnum(ProductCategory, {
    errorMap: () => ({ message: "Please select a valid category." }),
  }),
  stockRemaining: z
    .number()
    .int("Stock must be a whole number.")
    .min(1, "Stock must be at least 1.")
    .nonnegative("Stock cannot be negative."),
});
