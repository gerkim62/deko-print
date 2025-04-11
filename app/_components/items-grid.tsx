"use client";

import type React from "react";
import { useState, useEffect } from "react";
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
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Image from "next/image";
import type { Product, Service } from "@prisma/client";
import { Phone } from "lucide-react";
import Link from "next/link";
import { formatCurrency } from "@/lib/format";
import { contacts } from "@/constants";
import { PaginationControls } from "@/components/pagination-controls";

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

const PriceDisplay: React.FC<{
  item: Product | Service;
  itemType: "products" | "services";
}> = ({ item, itemType }) => {
  if (itemType === "products" && "price" in item) {
    return <>{formatCurrency(item.price)}</>;
  } else if (itemType === "services" && "startingPrice" in item) {
    return item.startingPrice ? (
      <>{formatCurrency(item.startingPrice)}</>
    ) : (
      <>WhatsApp or Call us for pricing information.</>
    );
  }
  return <>N/A</>;
};

const ItemsGrid: React.FC<ItemCardGridProps> = ({
  items,
  itemType,
  title,
  tabId,
  buttonTexts,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState(items);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filter items based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredItems(items);
    } else {
      const query = searchQuery.toLowerCase().trim();
      const filtered = items.filter((item) => {
        const titleMatch = item.title.toLowerCase().includes(query);
        const descMatch = item.description.toLowerCase().includes(query);
        const tagsMatch = item.tags.some((tag) =>
          tag.toLowerCase().includes(query)
        );
        return titleMatch || descMatch || tagsMatch;
      });
      setFilteredItems(filtered);
    }
    // Reset to first page when search query changes
    setCurrentPage(1);
  }, [searchQuery, items]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="space-y-8">
      {/* Search input */}
      <div className="relative w-full max-w-md mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={`Search ${title.toLowerCase()}...`}
            className="pl-10 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label={`Search ${title}`}
          />
        </div>
        {filteredItems.length === 0 && searchQuery && (
          <p className="text-sm text-muted-foreground my-8 text-center">
            No items found matching "{searchQuery}"
          </p>
        )}
      </div>

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
                  src={item.image}
                  alt={`${item.title} ${
                    itemType === "services" ? "service" : "product"
                  }`}
                  className="rounded-md w-full h-52 object-contain mb-4"
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
                <PriceDisplay item={item} itemType={itemType} />
              </p>
            </CardContent>
            <CardFooter className="flex justify-between pt-2 border-t border-border">
              {itemType === "products" ? (
                <div></div>
              ) : (
                <Button asChild className="items-center justify-center flex">
                  <a
                    href={`tel:${contacts.calls[0]
                      .replaceAll("+", "")
                      .replaceAll(" ", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Phone className="ml-2 h-4 w-4" />
                    Call Us
                  </a>
                </Button>
              )}

              {itemType !== "products" ? (
                <Button
                  asChild
                  className="bg-green-500 hover:bg-green-600 text-white focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 items-center justify-center flex"
                >
                  <a
                    href={`https://wa.me/${contacts.whatsapp[0]
                      .replaceAll("+", "")
                      .replaceAll(" ", "")}?text=${encodeURIComponent(
                      `I'm interested in ${item.title}. I'm from your website.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {buttonTexts[tabId].action} &rarr;
                  </a>
                </Button>
              ) : (
                <Button
                  asChild
                  className="focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 items-center justify-center flex"
                >
                  <Link href={`/order-intent/${item.id}`}>
                    {buttonTexts[tabId].action} &rarr;
                  </Link>
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredItems.length > 0 && totalPages > 1 && (
        <>
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />

          <div className="text-center text-sm text-muted-foreground">
            Showing {indexOfFirstItem + 1} -{" "}
            {Math.min(indexOfLastItem, filteredItems.length)} of{" "}
            {filteredItems.length} items
          </div>
        </>
      )}
    </div>
  );
};

export default ItemsGrid;
