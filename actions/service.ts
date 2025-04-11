"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import actionClient from "@/lib/safe-action";
import { NewServiceSchema, UpdateServiceSchema } from "@/validations/service";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { z } from "zod";

async function getAdminSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user.role !== "ADMIN") {
    return null;
  }

  return session;
}

const addService = actionClient
  .schema(NewServiceSchema)
  .action(async ({ parsedInput }) => {
    const session = await getAdminSession();
    if (!session) {
      return {
        success: false,
        message: "You are not authorized to add this service",
      };
    }

    const newService = await prisma.service.create({
      data: {
        title: parsedInput.title,
        description: parsedInput.description,
        category: parsedInput.category,
        startingPrice: parsedInput.startingPrice ?? null,
        tags: parsedInput.tags,
        image: parsedInput.image ?? null,
      },
    });

    revalidatePath("/");

    return {
      success: true,
      message: "Service added successfully",
      service: newService,
    };
  });

const updateService = actionClient
  .schema(UpdateServiceSchema)
  .action(async ({ parsedInput }) => {
    const session = await getAdminSession();
    if (!session) {
      return {
        success: false,
        message: "You are not authorized to update service",
      };
    }

    const { id, ...data } = parsedInput;

    const updatedService = await prisma.service.update({
      where: { id },
      data,
    });

    revalidatePath("/");

    return {
      success: true,
      message: "Service updated successfully",
      service: updatedService,
    };
  });

const deleteService = actionClient
  .schema(z.object({ id: z.string() }))
  .action(async ({ parsedInput }) => {
    const session = await getAdminSession();
    if (!session) {
      return {
        success: false,
        message: "You are not authorized to delete this service",
      };
    }

    await prisma.service.delete({
      where: { id: parsedInput.id },
    });

    revalidatePath("/");

    return {
      success: true,
      message: "Service deleted successfully",
    };
  });

export { addService, deleteService, updateService };

