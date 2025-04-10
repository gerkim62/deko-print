import { z } from "zod";
import { ServiceCategory } from "@prisma/client";

export const NewServiceSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  category: z.nativeEnum(ServiceCategory),
  startingPrice: z.coerce
    .number({
      message: "Starting price is required",
    })
    .min(0, "Starting price must be greater than 0")
    .optional(),
  tags: z.array(z.string()),
  image: z.string().optional(),
});

export const UpdateServiceSchema = NewServiceSchema.partial().extend({
  id: z.string(),
});
