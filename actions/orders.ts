"use server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import actionClient from "@/lib/safe-action";
import { createProductOrderSchema } from "@/validations/order";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const createOrder = actionClient
  .schema(
    createProductOrderSchema(1)
      .pick({
        deliveryLocation: true,
        phoneNumber: true,
      })
      .extend({
        productId: z.string().min(1, "Product ID is required"),
        quantity: z.number().min(1, "Quantity must be at least 1"),
      })
  )
  .action(
    async ({
      parsedInput: { deliveryLocation, phoneNumber, productId, quantity },
    }) => {
      const session = await auth.api.getSession({
        headers: await headers(),
      });

      if (!session?.user.id)
        redirect(`/sign-in?next=/order-intent/${productId}`);

      const order = await prisma.order.create({
        data: {
          deliveryLocation,
          phoneNumber,
          quantity,
          customerId: session.user.id,
          productId,
        },
      });

      return {
        success: true,
        message: "Order placed successfully",
        order,
      };
    }
  );

export { createOrder };
