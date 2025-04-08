"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OrderWithProductAndCustomer } from "./index";
import { toast } from "react-toastify";

type MarkDeliveredDialogProps = {
  order: OrderWithProductAndCustomer;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (orderId: number, pricePaid: number) => void;
  loading: boolean;
};

export function MarkDeliveredDialog({
  order,
  open,
  onOpenChange,
  onConfirm,
  loading,
}: MarkDeliveredDialogProps) {
  const [pricePaid, setPricePaid] = useState(
    order.pricePaid || order.product.price * order.quantity
  );

  const handleSubmit = () => {
    if (pricePaid <= 0) {
      toast.error("Please enter a valid amount paid.");
      return;
    }
    onConfirm(order.id, pricePaid);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!loading) {
          onOpenChange(open);
        }
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Mark Order as Delivered</DialogTitle>
          <DialogDescription>
            Enter the amount paid by the customer.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="pricePaid" className="text-right">
              Amount Paid
            </Label>
            <Input
              id="pricePaid"
              type="number"
              step="0.01"
              value={pricePaid}
              onChange={(e) => setPricePaid(parseFloat(e.target.value))}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button disabled={loading} type="button" onClick={handleSubmit}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
