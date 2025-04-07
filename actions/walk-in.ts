"use server";

import prisma from "@/lib/prisma";
import actionClient from "@/lib/safe-action";
import { NewWalkInSaleSchema } from "@/validations/walk-in";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const addWalkIn = actionClient
  .schema(NewWalkInSaleSchema)
  .action(async ({ parsedInput }) => {
    const { customerName, quantity, pricePaid, productId, serviceId } =
      parsedInput;
    console.log(parsedInput);

    const result = await prisma.$transaction(async (tx) => {
      if (productId) {
        await tx.product.update({
          where: { id: productId },
          data: { stockRemaining: { decrement: quantity } },
        });

        const walkIn = await tx.walkIn.create({
          data: {
            customerName,
            quantity,
            pricePaid,
            productId,
          },
        });

        return walkIn;
      }

      if (serviceId) {
        const walkIn = await tx.walkIn.create({
          data: {
            customerName,
            quantity,
            pricePaid,
            serviceId,
          },
        });

        return walkIn;
      }

      return null; // Neither productId nor serviceId provided
    });

    revalidatePath("/admin");

    if (!result) {
      return {
        message: "Either product or service must be selected",
        success: false,
      };
    }

    return {
      message: "Walk-in sale added successfully",
      walkIn: result,
      success: true,
    };
  });

const DeleteWalkInSchema = z.object({
  id: z.number(),
});

const deleteWalkIn = actionClient
  .schema(DeleteWalkInSchema)
  .action(async ({ parsedInput }) => {
    const { id } = parsedInput;

    const result = await prisma.$transaction(async (tx) => {
      const walkIn = await tx.walkIn.findUnique({
        where: { id },
      });

      if (!walkIn) {
        return null;
      }

      if (walkIn.productId) {
        await tx.product.update({
          where: { id: walkIn.productId },
          data: { stockRemaining: { increment: walkIn.quantity } },
        });
      }

      await tx.walkIn.delete({
        where: { id },
      });

      return walkIn;
    });

    revalidatePath("/admin");

    if (!result) {
      return {
        message: "Walk-in sale not found",
        success: false,
      };
    }

    return {
      message: "Walk-in sale deleted successfully",
      walkIn: result,
      success: true,
    };
  });

export { addWalkIn, deleteWalkIn };
