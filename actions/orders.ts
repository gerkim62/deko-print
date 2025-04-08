"use server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import actionClient from "@/lib/safe-action";
import { createProductOrderSchema } from "@/validations/order";
import { revalidatePath } from "next/cache";
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

      revalidatePath("/");

      return {
        success: true,
        message: "Order placed successfully",
        order,
      };
    }
  );

const deleteOrder = actionClient
  .schema(z.object({ id: z.number() }))
  .action(async ({ parsedInput: { id } }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (session?.user.role !== "ADMIN") {
      return {
        success: false,
        message: "You are not authorized to delete this order",
      };
    }

    const order = await prisma.order.delete({
      where: {
        id,
      },
    });

    revalidatePath("/");

    return {
      success: true,
      message: "Order deleted successfully",
      order,
    };
  });

const markOrderAsFullfilled = actionClient
  .schema(
    z.object({
      id: z.number(),
      pricePaid: z.number().gt(0, {
        message: "Price paid must be greater than 0",
      }),
    })
  )
  .action(async ({ parsedInput: { id, pricePaid } }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (session?.user.role !== "ADMIN") {
      return {
        success: false,
        message: "You are not authorized to do this",
      };
    }

    await prisma.$transaction(async (tx) => {
      const order = await tx.order.update({
        where: { id },
        data: {
          status: "Fullfilled",
          pricePaid,
        },
      });

      await tx.product.update({
        where: { id: order.productId },
        data: {
          stockRemaining: {
            decrement: order.quantity,
          },
        },
      });
    });

    revalidatePath("/");

    return {
      success: true,
      message: "Order marked as fulfilled successfully",
    };
  });

export { createOrder, deleteOrder, markOrderAsFullfilled };
