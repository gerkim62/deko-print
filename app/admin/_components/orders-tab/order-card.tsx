"use client";

import { useState } from "react";
import { ChevronRight, ChevronDown, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { OrderWithProductAndCustomer } from "./index";
import { formatCurrency } from "@/lib/format";

type OrderCardProps = {
  order: OrderWithProductAndCustomer;
  onViewDetails: () => void;
};

export function OrderCard({ order, onViewDetails }: OrderCardProps) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-4">
        <div
          onClick={toggleExpanded}
          className="flex justify-between items-center"
        >
          <div>
            <div className="font-medium">Order #{order.id}</div>
            <div className="text-sm text-muted-foreground">
              {order.customer.name}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={order.status === "Pending" ? "outline" : "default"}>
              {order.status}
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 p-0 hover:bg-transparent"
            >
              {expanded ? (
                <ChevronDown className="h-5 w-5" />
              ) : (
                <ChevronRight className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </CardHeader>

      {expanded && (
        <CardContent className="pb-4 pt-0 px-4 bg-muted/20">
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-1">
              <div className="text-sm font-medium">Product:</div>
              <div className="text-sm">{order.product.title}</div>

              <div className="text-sm font-medium">Quantity:</div>
              <div className="text-sm">{order.quantity}</div>

              <div className="text-sm font-medium">
                {order.pricePaid ? "Price Paid:" : `Price × ${order.quantity}:`}
              </div>
              <div className="text-sm">
                {order.pricePaid
                  ? `${formatCurrency(order.pricePaid)}`
                  : `${formatCurrency(order.product.price * order.quantity)}`}
              </div>

              <div className="text-sm font-medium">Delivery Location:</div>
              <div className="text-sm flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {order.deliveryLocation}
              </div>

              <div className="text-sm font-medium">Phone:</div>
              <div className="text-sm flex items-center gap-1">
                <Phone className="h-3 w-3" />
                {order.phoneNumber}
              </div>
            </div>

            <div className="pt-2">
              <Button
                variant="outline"
                size="sm"
                className="h-8"
                onClick={onViewDetails}
              >
                Full Details
              </Button>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
