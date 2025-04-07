import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { formatCurrency, formatDateTime } from "@/lib/format";
import { z } from "zod";
import Link from "next/link";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const PAGE_SIZE = 10;

const querySchema = z.object({
  page: z.coerce.number().int().positive().default(1).catch(1),
});

export default async function UserOrdersPage({ searchParams }: Props) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const { page } = querySchema.parse(await searchParams);

  const customerId = session?.user.id;
  if (!customerId) redirect("/sign-in?next=/my/orders");

  const [orders, count] = await Promise.all([
    prisma.order.findMany({
      where: { customerId },
      include: { product: true },
      orderBy: { createdAt: "desc" },
      take: PAGE_SIZE,
      skip: (page - 1) * PAGE_SIZE,
    }),
    prisma.order.count({ where: { customerId } }),
  ]);

  if (orders.length === 0 && page !== 1) redirect("/my/orders?page=1");

  const totalPages = Math.ceil(count / PAGE_SIZE);
  const hasPrev = page > 1;
  const hasNext = page < totalPages;

  const startItem = count === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const endItem = Math.min(page * PAGE_SIZE, count);

  const getPageNumbers = () => {
    const pageNumbers = [];
    if (totalPages <= 7)
      return Array.from({ length: totalPages }, (_, i) => i + 1);

    pageNumbers.push(1);
    const rangeStart = Math.max(2, page - 1);
    const rangeEnd = Math.min(totalPages - 1, page + 1);
    if (rangeStart > 2) pageNumbers.push("ellipsis-start");
    for (let i = rangeStart; i <= rangeEnd; i++) pageNumbers.push(i);
    if (rangeEnd < totalPages - 1) pageNumbers.push("ellipsis-end");
    if (totalPages > 1) pageNumbers.push(totalPages);
    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  const getStatusBadgeClasses = (status: string) => {
    switch (status) {
      case "Fulfilled":
        return "bg-green-100 text-green-800 border border-green-200";
      case "Cancelled":
        return "bg-destructive/10 text-destructive border border-destructive/20";
      default:
        return "bg-accent/20 text-accent-foreground border border-accent/30";
    }
  };

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h1 className="text-xl font-bold mb-4 text-primary">My Orders</h1>

      {count > 0 && (
        <div className="text-sm text-muted-foreground mb-4">
          Showing {startItem} - {endItem} of {count} orders
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-card rounded-md shadow-sm p-4 border border-border"
          >
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <span className="font-medium text-primary">#{order.id}</span>
                <span className="text-xs">
                  {formatDateTime(order.createdAt)}
                </span>
                {order.pricePaid === null && (
                  <Badge variant="destructive" className="text-xs">
                    Unpaid
                  </Badge>
                )}
              </div>
              <Badge
                className={`px-2 py-0.5 rounded-full text-xs ${getStatusBadgeClasses(
                  order.status
                )}`}
              >
                {order.status}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm mt-2">
              <div className="bg-muted/30 p-2 rounded">
                <div className="text-xs text-muted-foreground">Product</div>
                <div>
                  {order.product.title} × {order.quantity}
                </div>
              </div>
              <div className="bg-muted/30 p-2 rounded">
                <div className="text-xs text-muted-foreground">Price</div>
                <div>
                  {formatCurrency(order.product.price * order.quantity)}
                </div>
              </div>
            </div>

            <div className="text-xs mt-2 flex justify-between items-center">
              <span className="text-muted-foreground">
                {order.deliveryLocation} • {order.phoneNumber}
              </span>
              {order.status === "Pending" && (
                <Button hidden size="sm" variant="destructive">
                  Cancel
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      {count === 0 && (
        <div className="py-12 flex flex-col items-center justify-center text-center">
          <div className="mb-4 text-muted-foreground">
            <p className="text-lg">You haven't placed any orders yet.</p>
            <p className="mt-2">
              Browse our products and services to get started.
            </p>
          </div>
          <Button asChild className="mt-4">
            <Link href="/#products-and-services">Browse Products & Services</Link>
          </Button>
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-6">
          <Pagination>
            <PaginationContent>
              {hasPrev && (
                <PaginationItem>
                  <PaginationPrevious href={`?page=${page - 1}`} />
                </PaginationItem>
              )}
              {pageNumbers.map((p, i) =>
                p === "ellipsis-start" || p === "ellipsis-end" ? (
                  <PaginationItem key={`ellipsis-${i}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                ) : (
                  <PaginationItem key={p}>
                    <PaginationLink href={`?page=${p}`} isActive={p === page}>
                      {p}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}
              {hasNext && (
                <PaginationItem>
                  <PaginationNext href={`?page=${page + 1}`} />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
