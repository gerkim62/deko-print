import * as z from "zod";

export const createProductOrderSchema = (stockRemaining: number) => {
  return z.object({
    quantity: z.coerce
      .number()
      .min(1, "Please order at least 1 item.")
      .max(stockRemaining, `We only have ${stockRemaining} in stock.`),
    deliveryLocation: z
      .string()
      .min(5, "Please enter a more detailed delivery location.")
      .max(200, "Your delivery location is too long (maximum 200 characters)."),
    phoneNumber: z
      .string()
      .min(8, "Phone number is too short.")
      .max(15, "Phone number is too long.")
      .regex(/^[0-9+\-\s()]+$/, "Please enter a valid phone number."),
  });
};

export type ProductOrderFormValues = z.infer<
  ReturnType<typeof createProductOrderSchema>
>;
