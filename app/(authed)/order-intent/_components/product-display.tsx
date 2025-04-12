import { formatCurrency } from "@/lib/format";
import { Product } from "@prisma/client";
import Image from "next/image";
import React from "react";
interface ProductDisplayProps {
  product: Product;
}

export const ProductDisplay: React.FC<ProductDisplayProps> = ({ product }) => {
  return (
    <>
      {/* Mobile view - horizontal layout */}
      <div className="flex lg:hidden mb-6">
        <div className="mr-4">
          <Image
            width={80}
            height={80}
            src={product.image || "/api/placeholder/100/100"}
            alt={product.title}
            className="rounded-md w-20 h-20 object-cover border border-border/50 shadow-sm"
          />
        </div>
        <div>
          <h3 className="font-medium">{product.title}</h3>
          <p className="text-sm text-muted-foreground">
            {product.description.substring(0, 60)}
            {product.description.length > 60 ? "..." : ""}
          </p>
          <p className="font-medium text-lg mt-1">
            {formatCurrency(product.price)}
          </p>
          <p className="text-sm text-muted-foreground">
            {product.stockRemaining} in stock
          </p>
        </div>
      </div>

      {/* Desktop view - vertical layout with more details */}
      <div className="hidden lg:flex lg:flex-col">
        <div className="mb-4">
          <Image
            height={192}
            width={192}
            src={product.image || "/no-image.png"}
            alt={product.title}
            className="rounded-lg w-full h-48 object-cover border border-border/50 shadow-sm"
          />
        </div>
        <div>
          <h3 className="text-xl font-medium ">{product.title}</h3>
          <p className="text-muted-foreground my-2">{product.description}</p>
          <div className="mt-4 bg-secondary/20 p-4 rounded-lg border border-border/50">
            <div className="flex justify-between items-center">
              <span className="font-medium">Price:</span>
              <span className="font-medium text-lg">
                {formatCurrency(product.price)}
              </span>
            </div>
            <div className="flex justify-between items-center mt-1">
              <span>Category:</span>
              <span className="capitalize">
                {product.category.replace("_", " ")}
              </span>
            </div>
            <div className="flex justify-between items-center mt-1">
              <span>Availability:</span>
              <span
                className={
                  product.stockRemaining > 2
                    ? "text-green-600 font-medium"
                    : "text-amber-600 font-medium"
                }
              >
                {product.stockRemaining} in stock
              </span>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-accent/20 text-accent-foreground px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
