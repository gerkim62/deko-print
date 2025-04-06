"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PaginationInfo } from "@/lib/pagination";

interface PaginationProps {
  paginationInfo: PaginationInfo;
}

export function Pagination({ paginationInfo }: PaginationProps) {
  const { currentPage, totalPages, hasNextPage, hasPrevPage } = paginationInfo;

  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Function to create URL with updated search params
  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  if (totalPages <= 1) {
    return null; // Don't show pagination if only one page
  }

  return (
    <div className="flex items-center justify-center space-x-2 mt-8">
      <Button
        variant="outline"
        size="icon"
        disabled={!hasPrevPage}
        asChild={hasPrevPage}
      >
        {hasPrevPage ? (
          <Link
            href={createPageURL(currentPage - 1)}
            aria-label="Go to previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </Link>
        ) : (
          <span>
            <ChevronLeft className="h-4 w-4" />
          </span>
        )}
      </Button>

      <div className="flex items-center text-sm">
        <span>
          Page {currentPage} of {totalPages}
        </span>
      </div>

      <Button
        variant="outline"
        size="icon"
        disabled={!hasNextPage}
        asChild={hasNextPage}
      >
        {hasNextPage ? (
          <Link
            href={createPageURL(currentPage + 1)}
            aria-label="Go to next page"
          >
            <ChevronRight className="h-4 w-4" />
          </Link>
        ) : (
          <span>
            <ChevronRight className="h-4 w-4" />
          </span>
        )}
      </Button>
    </div>
  );
}
