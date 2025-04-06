import { z } from "zod";

export const NewProductSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  tags: z.array(z.string()).default([]),
  price: z.number().positive("Price must be positive"),
  image: z.string().url("Image must be a valid URL").optional(),
  category: z.enum(["Pre_owned", "Accessory"]),
  stockRemaining: z.number().int().nonnegative("Stock must be zero or more"),
});
