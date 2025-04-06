// lib/validations/pagination.ts
import { z } from "zod";

export const PaginationSchema = z.object({
  page: z.coerce.number().default(1).catch(1),
  limit: z.coerce.number().default(10).catch(10),
});

export type PaginationParams = z.infer<typeof PaginationSchema>;
