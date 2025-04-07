"use server";

import prisma from "@/lib/prisma";
import actionClient from "@/lib/safe-action";
import { NewProductSchema } from "@/validations/product";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const addProduct = actionClient
  .schema(NewProductSchema)
  .action(async ({ parsedInput }) => {
    const { title, description, tags, price, image, category, stockRemaining } =
      parsedInput;

    console.log(parsedInput);

    const createdProduct = await prisma.product.create({
      data: {
        title,
        description,
        tags,
        price,
        image,
        category,
        stockRemaining,
      },
    });

    revalidatePath("/");

    return {
      success: true,
      message: "Product added successfully",
      product: createdProduct,
    };
  });

const updateProduct = actionClient
  .schema(NewProductSchema.partial().extend({ id: z.string() }))
  .action(async ({ parsedInput }) => {
    const {
      id,
      title,
      description,
      tags,
      price,
      image,
      category,
      stockRemaining,
    } = parsedInput;

    console.log("parsedInput", parsedInput);

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        title: title ?? Prisma.skip,
        description: description ?? Prisma.skip,
        tags: tags ?? Prisma.skip,
        price: price ?? Prisma.skip,
        image: image ?? Prisma.skip,
        category: category ?? Prisma.skip,
        stockRemaining: stockRemaining ?? Prisma.skip,
      },
    });

    revalidatePath("/");

    return {
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    };
  });

const deleteProduct = actionClient
  .schema(z.object({ id: z.string() }))
  .action(async ({ parsedInput }) => {
    const { id } = parsedInput;

    const res = await prisma.product.delete({
      where: { id },
    });

    revalidatePath("/");

    return {
      success: true,
      message: "Product deleted successfully",
    };
  });

export { addProduct, updateProduct, deleteProduct };
