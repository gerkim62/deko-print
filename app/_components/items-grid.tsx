"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import type { Product, Service } from "@prisma/client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

type ButtonTexts = {
  details: string;
  action: string;
};

type ItemCardGridProps = {
  items: (Product | Service)[];
  itemType: "services" | "products";
  title: string;
  tabId: string;
  buttonTexts: Record<string, ButtonTexts>;
};

const ItemsGrid: React.FC<ItemCardGridProps> = ({
  items,
  itemType,
  title,
  tabId,
  buttonTexts,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Calculate total pages
  const totalPages = Math.ceil(items.length / itemsPerPage);

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  // Helper function to render price based on item type
  const renderPrice = (
    item: Product | Service,
    itemType: "products" | "services"
  ) => {
    if (itemType === "products" && "price" in item) {
      return `$${item.price.toFixed(2)}`;
    } else if (itemType === "services" && "startingPrice" in item) {
      const startingPrice = item.startingPrice;
      return startingPrice
        ? `Starting at $${startingPrice.toFixed(2)}`
        : "Contact for pricing";
    } else return "N/A";
  };

  // Page change handlers
  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  // Generate page numbers
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      // Show all pages if total pages is less than max pages to show
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always show first page
      pageNumbers.push(1);

      // Calculate start and end of middle pages
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      // Adjust if we're near the beginning
      if (currentPage <= 3) {
        endPage = 4;
      }

      // Adjust if we're near the end
      if (currentPage >= totalPages - 2) {
        startPage = totalPages - 3;
      }

      // Add ellipsis after first page if needed
      if (startPage > 2) {
        pageNumbers.push("...");
      }

      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      // Add ellipsis before last page if needed
      if (endPage < totalPages - 1) {
        pageNumbers.push("...");
      }

      // Always show last page
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  return (
    <div className="space-y-8">
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        aria-label={`${title} offerings`}
      >
        {currentItems.map((item, index) => (
          <Card
            key={index}
            className="border border-border shadow-sm hover:shadow-md transition-shadow overflow-hidden focus-within:ring-2 focus-within:ring-ring"
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-semibold text-foreground">
                {item.title}
              </CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent>
              {item.image && (
                <Image
                  height={208}
                  width={208}
                  src={item.image || "/placeholder.svg"}
                  alt={`${item.title} ${
                    itemType === "services" ? "service" : "product"
                  }`}
                  className="rounded-md w-full h-52 object-cover mb-4"
                />
              )}
              <div
                className="flex gap-2 mb-3 flex-wrap"
                aria-label="Item features"
              >
                {item.tags.map((tag, tagIndex) => (
                  <Badge
                    key={tagIndex}
                    className="bg-primary/20 text-primary hover:bg-primary/30 font-normal"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              <p
                className="text-sm text-muted-foreground font-medium"
                aria-label="Price"
              >
                {renderPrice(item, itemType)}
              </p>
            </CardContent>
            <CardFooter className="flex justify-between pt-2 border-t border-border">
              <Button
                variant="outline"
                className="focus-visible:ring-2 focus-visible:ring-ring"
              >
                {buttonTexts[tabId].details}
              </Button>
              <Button asChild className="focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 items-center justify-center flex">
                <Link
                href={`/order-intent/${item.id}`}
                >
                {buttonTexts[tabId].action} &rarr;
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <nav
          className="flex justify-center items-center space-x-2"
          aria-label="Pagination"
        >
          <Button
            variant="outline"
            size="icon"
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {getPageNumbers().map((page, index) =>
            typeof page === "number" ? (
              <Button
                key={index}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => goToPage(page)}
                aria-label={`Page ${page}`}
                aria-current={currentPage === page ? "page" : undefined}
                className="min-w-[2.5rem]"
              >
                {page}
              </Button>
            ) : (
              <span key={index} className="px-2">
                {page}
              </span>
            )
          )}

          <Button
            variant="outline"
            size="icon"
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </nav>
      )}

      {/* Items count and page info */}
      {totalPages > 1 && (
        <div className="text-center text-sm text-muted-foreground">
          Showing {indexOfFirstItem + 1}-
          {Math.min(indexOfLastItem, items.length)} of {items.length} items
        </div>
      )}
    </div>
  );
};

export default ItemsGrid;
