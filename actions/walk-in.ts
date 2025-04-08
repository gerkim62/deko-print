"use server";

import prisma from "@/lib/prisma";
import actionClient from "@/lib/safe-action";
import { NewWalkInSaleSchema } from "@/validations/walk-in";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

async function getAdminSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user.role !== "ADMIN") {
    return null;
  }

  return session;
}

const addWalkIn = actionClient
  .schema(NewWalkInSaleSchema)
  .action(async ({ parsedInput }) => {
    const session = await getAdminSession();
    if (!session) {
      return {
        message: "You are not authorized to add a walk-in sale",
        success: false,
      };
    }

    const { customerName, quantity, pricePaid, productId, serviceId } =
      parsedInput;

    const result = await prisma.$transaction(async (tx) => {
      if (productId) {
        await tx.product.update({
          where: { id: productId },
          data: { stockRemaining: { decrement: quantity } },
        });

        return await tx.walkIn.create({
          data: {
            customerName,
            quantity,
            pricePaid,
            productId,
          },
        });
      }

      if (serviceId) {
        return await tx.walkIn.create({
          data: {
            customerName,
            quantity,
            pricePaid,
            serviceId,
          },
        });
      }

      return null;
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
    const session = await getAdminSession();
    if (!session) {
      return {
        message: "You are not authorized to delete this walk-in sale",
        success: false,
      };
    }

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
