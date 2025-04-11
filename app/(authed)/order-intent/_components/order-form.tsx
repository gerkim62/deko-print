"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

import {
  ProductOrderFormValues,
  createProductOrderSchema,
} from "@/validations/order";
import { Product } from "@prisma/client";
import { formatCurrency } from "@/lib/format";
import Link from "next/link";
import { createOrder } from "@/actions/orders";
import { getReadableActionResult } from "@/lib/safe-action";
import { useRouter } from "nextjs-toploader/app";

interface ProductOrderFormComponentProps {
  product: Product;
}

export const OrderForm: React.FC<ProductOrderFormComponentProps> = ({
  product,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);

  const router = useRouter();

  // Initialize the form with product-specific schema
  const formSchema = createProductOrderSchema(product.stockRemaining);

  const form = useForm<ProductOrderFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quantity: 1,
      deliveryLocation: "",
      phoneNumber: "",
    },
  });

  // Get the current form values to calculate total price
  const quantity = form.watch("quantity") || 0;
  const totalPrice = product.price * quantity;

  // Form submission handler
  const onSubmit = async (data: ProductOrderFormValues) => {
    setIsSubmitting(true);
    setGlobalError(null); // Clear any previous errors

    // Simulate API call
    try {
      // In a real app, you would send this data to your API
      console.log("Order data:", {
        productId: product.id,
        ...data,
        totalPrice,
      });

      const result = await createOrder({
        ...data,
        productId: product.id,
        quantity,
      });

      const { message, success } = getReadableActionResult(result);

      if (success) {
        setOrderPlaced(true);
        router.replace("/my/orders"); // Redirect to orders page after successful order
      } else {
        // Display the error message from the server
        setGlobalError(
          message || "An error occurred while processing your order."
        );
      }
    } catch (error) {
      console.error("Error placing order:", error);
      setGlobalError("An unexpected error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderPlaced) {
    return (
      <Card className="container mx-auto pt-0 max-w-3xl">
        <CardHeader className="bg-primary/5 rounded-t-lg">
          <CardTitle className="text-primary  mt-4 ">Order Received!</CardTitle>
          <CardDescription className="pb-2">
            {" "}
            We've received your order request.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Alert className="bg-primary/10 text-primary-foreground border-primary/30">
            <AlertDescription className="text-foreground">
              Thank you for your order. We will contact you shortly at your
              provided phone number to confirm the delivery details.
            </AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter className="flex justify-center pt-4">
          <Button asChild className="w-full lg:max-w-md">
            <Link href="/my/orders">View my Orders &rarr;</Link>
          </Button>
        </CardFooter>
      </Card>
    );
  }

  // Global error component
  const GlobalErrorAlert = () =>
    globalError ? (
      <Alert variant="destructive" className="mb-4">
        <AlertDescription>{globalError}</AlertDescription>
      </Alert>
    ) : null;

  return (
    <>
      {/* Mobile style - Now with same functional implementation as desktop */}
      <div className="lg:hidden">
        <Separator className="my-4" />

        <div className="bg-secondary/10 p-4 rounded-lg border border-border/50 shadow-sm">
          <h3 className="font-medium mb-3 text-primary">Order Details</h3>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <GlobalErrorAlert />

              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        max={product.stockRemaining}
                        {...field}
                        className="focus:border-primary/50"
                      />
                    </FormControl>
                    <FormMessage className="text-destructive" />
                  </FormItem>
                )}
              />

              <div className="py-2 px-3 bg-background rounded-md border border-border/40">
                <div className="flex justify-between items-center py-1">
                  <Label className="text-muted-foreground">
                    Price per item:
                  </Label>
                  <span>{formatCurrency(product.price)}</span>
                </div>
                <Separator className="my-2 bg-border/40" />
                <div className="flex justify-between items-center font-medium text-lg mt-1 py-1">
                  <Label>Total to pay:</Label>
                  <span className="text-primary">
                    {formatCurrency(totalPrice)}
                  </span>
                </div>
              </div>

              <Separator className="my-3 bg-border/60" />

              <div className="space-y-4">
                <h3 className="font-medium text-primary">
                  Delivery Information
                </h3>

                <FormField
                  control={form.control}
                  name="deliveryLocation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Delivery Location</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Where should we deliver your order?"
                          className="resize-none focus:border-primary/50"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-muted-foreground text-xs">
                        Please provide your complete address for delivery
                      </FormDescription>
                      <FormMessage className="text-destructive" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. +1 234 567 8900"
                          {...field}
                          className="focus:border-primary/50"
                        />
                      </FormControl>
                      <FormDescription className="text-muted-foreground text-xs">
                        We'll contact you on this number for delivery
                        coordination
                      </FormDescription>
                      <FormMessage className="text-destructive" />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 transition-colors"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Confirm Order"}
              </Button>
            </form>
          </Form>
        </div>
      </div>

      {/* Desktop style - Enhanced with better styling */}
      <div className="hidden lg:block">
        <div className="bg-secondary/10 p-6 rounded-lg border border-border/50 shadow-sm">
          <h3 className="font-medium mb-4 text-primary">Order Summary</h3>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <GlobalErrorAlert />

              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        max={product.stockRemaining}
                        {...field}
                        className="focus:ring-primary/30 focus:border-primary/50"
                      />
                    </FormControl>
                    <FormMessage className="text-destructive" />
                  </FormItem>
                )}
              />

              <div className="py-2 px-4 bg-background rounded-md border border-border/40">
                <div className="flex justify-between items-center py-2">
                  <Label className="text-muted-foreground">
                    Price per item:
                  </Label>
                  <span>{formatCurrency(product.price)}</span>
                </div>
                <Separator className="my-2 bg-border/40" />
                <div className="flex justify-between items-center font-bold text-lg mt-1 py-1">
                  <Label>Total to pay:</Label>
                  <span className="text-primary">
                    {formatCurrency(totalPrice)}
                  </span>
                </div>
              </div>

              <Separator className="my-4 bg-border/60" />

              <div className="space-y-4">
                <h3 className="font-medium text-primary">
                  Delivery Information
                </h3>

                <FormField
                  control={form.control}
                  name="deliveryLocation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Delivery Location</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Where should we deliver your order?"
                          className="resize-none focus:ring-primary/30 focus:border-primary/50"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-muted-foreground text-xs">
                        Please provide your complete address for delivery
                      </FormDescription>
                      <FormMessage className="text-destructive" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. +1 234 567 8900"
                          {...field}
                          className="focus:ring-primary/30 focus:border-primary/50"
                        />
                      </FormControl>
                      <FormDescription className="text-muted-foreground text-xs">
                        We'll contact you on this number for delivery
                        coordination
                      </FormDescription>
                      <FormMessage className="text-destructive" />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full mt-6 bg-primary hover:bg-primary/90 transition-colors"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Confirm Order"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};
