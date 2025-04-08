"use client";

import { deleteOrder, markOrderAsFullfilled } from "@/actions/orders";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatCurrency, formatDateTime } from "@/lib/format";
import { getReadableActionResult } from "@/lib/safe-action";
import { MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import type { OrderWithProductAndCustomer } from "./index";
import { MarkDeliveredDialog } from "./mark-delivered-dialog";

type OrderDetailsDialogProps = {
  order: OrderWithProductAndCustomer;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function OrderDetailsDialog({
  order,
  open,
  onOpenChange,
}: OrderDetailsDialogProps) {
  const [isDeliveredDialogOpen, setIsDeliveredDialogOpen] = useState(false);

  const [markingDelivered, setMarkingDelivered] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async (id: number) => {
    setDeleting(true);

    try {
      const result = await toast.promise(deleteOrder({ id }), {
        pending: "Deleting order...",
      });

      const { message, success } = getReadableActionResult(result);

      if (success) {
        toast.success(message);

        onOpenChange(false);
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error("Error deleting order:", error);
      toast.error("Error deleting order. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  const handleMarkDelivered = async (orderId: number, pricePaid: number) => {
    try {
      setMarkingDelivered(true);
      const result = await toast.promise(
        markOrderAsFullfilled({
          id: orderId,
          pricePaid,
        }),
        {
          pending: "Updating order...",
        }
      );

      const { message, success } = getReadableActionResult(result);

      if (success) {
        toast.success(message);
        onOpenChange(false);
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error("Error marking order as delivered:", error);
      toast.error("Error marking order as delivered. Please try again.");
    } finally {
      setIsDeliveredDialogOpen(false);
      setMarkingDelivered(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Order #{order.id} Details</DialogTitle>
            <DialogDescription>
              Detailed information about this order
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
            {/* Order Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Order Information</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-sm font-medium">Status:</div>
                <div>
                  <Badge
                    variant={order.status === "Pending" ? "outline" : "default"}
                  >
                    {order.status}
                  </Badge>
                </div>

                <div className="text-sm font-medium">Ordered:</div>
                <div className="text-sm">{formatDateTime(order.createdAt)}</div>

                <div className="text-sm font-medium">Price Paid:</div>
                <div className="text-sm">
                  {order.pricePaid
                    ? `${formatCurrency(order.pricePaid)}`
                    : "Unpaid"}
                </div>

                <div className="text-sm font-medium">Quantity:</div>
                <div className="text-sm">{order.quantity}</div>
              </div>
            </div>

            {/* Customer Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Customer Information</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-sm font-medium">Name:</div>
                <div className="text-sm">{order.customer.name}</div>

                <div className="text-sm font-medium">Phone:</div>
                <div className="text-sm flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  {order.phoneNumber}
                </div>

                <div className="text-sm font-medium">Delivery Location:</div>
                <div className="text-sm flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {order.deliveryLocation}
                </div>
              </div>
            </div>

            {/* Product Information */}
            <div className="md:col-span-2 space-y-4">
              <h3 className="text-lg font-medium">Product Information</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-sm font-medium">Product:</div>
                <div className="text-sm">{order.product.title}</div>

                <div className="text-sm font-medium">Price:</div>
                <div className="text-sm">
                  {formatCurrency(order.product.price)} per one
                </div>

                <div className="text-sm font-medium">Stock Remaining:</div>
                <div className="text-sm">{order.product.stockRemaining}</div>
              </div>
            </div>
          </div>

          <DialogFooter className="flex flex-wrap gap-2">
            {order.status === "Pending" && (
              <Button
                disabled={markingDelivered}
                onClick={() => setIsDeliveredDialogOpen(true)}
              >
                Mark Delivered
              </Button>
            )}

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  hidden={order.status === "Fullfilled"}
                  variant="outline"
                >
                  Delete Order
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    the order.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel disabled={deleting}>
                    Cancel
                  </AlertDialogCancel>
                  <Button
                    disabled={deleting}
                    variant="destructive"
                    onClick={() => handleDelete(order.id)}
                  >
                    Delete
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <MarkDeliveredDialog
        loading={markingDelivered}
        order={order}
        open={isDeliveredDialogOpen}
        onOpenChange={setIsDeliveredDialogOpen}
        onConfirm={handleMarkDelivered}
      />
    </>
  );
}
