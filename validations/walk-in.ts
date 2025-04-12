import { z } from "zod";

// Distinguish between product and service line items
const productLineItemSchema = z.object({
  productId: z.string(),
  serviceId: z.undefined(),
});

const serviceLineItemSchema = z.object({
  serviceId: z.string(),
  productId: z.undefined(),
});

// Common fields for both product and service sales
const sharedSaleDetailsSchema = z.object({
  customerName: z.string().optional(),
  quantity: z.number({
    message:"Quantity is required"
  }),
  pricePaid: z
    .number({
      required_error: "Total price paid is required",
    })
    .gt(0, {
      message: "Total price paid must be greater than zero",
    }),
});

// Allow either a product or a service as the sale item
const saleItemSchema = z.union([productLineItemSchema, serviceLineItemSchema]);

// Final schema for a walk-in sale
export const NewWalkInSaleSchema = sharedSaleDetailsSchema.and(saleItemSchema);
