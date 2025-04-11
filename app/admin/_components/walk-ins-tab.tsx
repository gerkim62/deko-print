"use client";

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
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlusCircle, Trash2 } from "lucide-react";
import { useState } from "react";

import { PaginationControls } from "@/components/pagination-controls";
import { EmptyState } from "./ui/empty-state";

// Import types from Prisma client
import { addWalkIn, deleteWalkIn } from "@/actions/walk-in";
import { getReadableActionResult } from "@/lib/safe-action";
import { NewWalkInSaleSchema } from "@/validations/walk-in";
import type { Product, Service, WalkIn } from "@prisma/client";
import { toast } from "react-toastify";
import { formatCurrency } from "@/lib/format";

type Props = {
  walkIns: WalkIn[];
  products: Product[];
  services: Service[];
};

export default function WalkInsTab({ products, services, walkIns }: Props) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<
    "product" | "service" | null
  >(null);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [pricePaid, setPricePaid] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(walkIns.length / itemsPerPage);

  const paginatedWalkIns = walkIns.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getProductTitle = (productId: string | null) => {
    if (!productId) return "-";
    const product = products.find((p) => p.id === productId);
    return product ? product.title : "Unknown Product";
  };

  const getServiceTitle = (serviceId: string | null) => {
    if (!serviceId) return "-";
    const service = services.find((s) => s.id === serviceId);
    return service ? service.title : "Unknown Service";
  };

  const handleCreate = async () => {
    try {
      // Prepare data according to the schema requirements
      const walkInData = {
        customerName: customerName || "Anonymous",
        quantity,
        pricePaid: pricePaid ? parseFloat(pricePaid) : undefined,
        // Set only one of productId or serviceId based on the selected type
        productId: selectedType === "product" ? selectedItemId : undefined,
        serviceId: selectedType === "service" ? selectedItemId : undefined,
      };

      const validationResult = NewWalkInSaleSchema.safeParse(walkInData);

      if (!validationResult.success)
        return toast.error(validationResult.error.message);

      setLoading(true);

      const result = await addWalkIn(validationResult.data);
      const { message, success } = getReadableActionResult(result);

      setLoading(false);
      if (success) {
        toast.success(message);
        // Reset form state and close dialog on success
        resetDialog();
        setIsCreateDialogOpen(false);
      } else toast.error(message);
    } catch (error) {
      toast.error("An error occurred while adding the walk-in record.");
      console.error("Error adding walk-in:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      setLoading(true);

      const result = await deleteWalkIn({ id });
      const { message, success } = getReadableActionResult(result);

      if (success) toast.success(message);
      else toast.error(message);
    } catch (error) {
      console.error("Error deleting walk-in:", error);
      toast.error("An error occurred while deleting the walk-in record.");
    } finally {
      setLoading(false);
    }
  };

  const resetDialog = () => {
    setSelectedType(null);
    setSelectedItemId(null);
    setCustomerName("");
    setQuantity(1);
    setPricePaid("");
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Walk-ins</CardTitle>
            <CardDescription>Manage walk-in customers.</CardDescription>
          </div>
          <Dialog
            open={isCreateDialogOpen}
            onOpenChange={(open) => {
              setIsCreateDialogOpen(open);
              if (!open) resetDialog();
            }}
          >
            <DialogTrigger asChild>
              <Button size={"sm"}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Walk-in
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Walk-in</DialogTitle>
                <DialogDescription>
                  Create a new walk-in record. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="customerName" className="text-right">
                    Customer
                  </Label>
                  <Input
                    id="customerName"
                    className="col-span-3"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">
                    Type
                  </Label>
                  <RadioGroup
                    className="col-span-3 flex flex-row gap-4"
                    value={selectedType || undefined}
                    onValueChange={(value) => {
                      setSelectedType(value as "product" | "service");
                      setSelectedItemId(null); // Reset selected item when type changes
                    }}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="product" id="product" />
                      <Label htmlFor="product">Product</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="service" id="service" />
                      <Label htmlFor="service">Service</Label>
                    </div>
                  </RadioGroup>
                </div>
                {selectedType && (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="itemSelect" className="text-right">
                      {selectedType === "product" ? "Product" : "Service"}
                    </Label>
                    <select
                      id="itemSelect"
                      className="col-span-3 flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      value={selectedItemId || ""}
                      onChange={(e) => setSelectedItemId(e.target.value)}
                    >
                      <option value="" disabled>
                        Select a {selectedType}
                      </option>
                      {selectedType === "product"
                        ? products.map((product) => (
                            <option key={product.id} value={product.id}>
                              {product.title}
                            </option>
                          ))
                        : services.map((service) => (
                            <option key={service.id} value={service.id}>
                              {service.title}
                            </option>
                          ))}
                    </select>
                  </div>
                )}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="quantity" className="text-right">
                    Quantity
                  </Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="pricePaid" className="text-right">
                    Total Price Paid
                  </Label>
                  <Input
                    id="pricePaid"
                    type="number"
                    step="0.01"
                    value={pricePaid}
                    onChange={(e) => setPricePaid(e.target.value)}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  disabled={
                    !selectedType || !selectedItemId || !pricePaid || loading
                  }
                  onClick={handleCreate}
                >
                  {loading ? "Saving..." : "Save"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {paginatedWalkIns.length === 0 ? (
          <EmptyState
            icon={PlusCircle}
            title="No walk-ins yet"
            description="When customers walk in, their records will appear here."
            action={{
              label: "Add Walk-in",
              onClick: () => setIsCreateDialogOpen(true),
            }}
          />
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Product
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Service
                  </TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price Paid</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedWalkIns.map((walkIn) => (
                  <TableRow key={walkIn.id}>
                    <TableCell>{walkIn.customerName || "Anonymous"}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {getProductTitle(walkIn.productId)}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {getServiceTitle(walkIn.serviceId)}
                    </TableCell>
                    <TableCell>{walkIn.quantity}</TableCell>
                    <TableCell>
                      {walkIn.pricePaid
                        ? `${formatCurrency(walkIn.pricePaid)}`
                        : "Unpaid"}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                You can't undo this action. If this was for a
                                product, the stock will be added back.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel disabled={loading}>
                                Cancel
                              </AlertDialogCancel>
                              <Button
                                variant={"destructive"}
                                disabled={loading}
                                onClick={() => handleDelete(walkIn.id)}
                              >
                                {loading ? "Deleting..." : "Delete"}
                              </Button>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </CardContent>
    </Card>
  );
}
