import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { OrderForm } from "../_components/order-form";
import { ProductDisplay } from "../_components/product-display";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function OrderPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const productId = (await params).productId;

  if (!session) redirect(`/sign-in?next=/order-intent/${productId}`);

  const product = await prisma.product.findUnique({
    where: {
      id: productId,
      stockRemaining: {
        gt: 0,
      },
    },
  });

  if (!product) throw notFound();

  return (
    <Card className="container shadow-md border-0 sm:border mx-auto sm:my-4 rounded-none sm:rounded-lg max-w-5xl sm:pt-0">
      <CardHeader className="bg-primary/5 rounded-t-lg border-b border-border/50 mx-4 sm:mx-0">
        <CardTitle className="text-primary pt-4">Order Product</CardTitle>
        <CardDescription>
          Complete this form to place your order
        </CardDescription>
      </CardHeader>

      <CardContent className="p-4 sm:p-6">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          {/* Product Information */}
          <div className="mb-6 lg:mb-0">
            <ProductDisplay product={product} />
          </div>

          {/* Order Form */}
          <div>
            <OrderForm product={product} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
