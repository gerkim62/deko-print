"use client";

import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/format";
import { toast } from "react-toastify";
import { deleteService } from "@/actions/service";
import { getReadableActionResult } from "@/lib/safe-action";

// Import types from Prisma client
import type { Service } from "@prisma/client";
import { EditServiceForm } from "./edit-service-form";

type Props = {
  services: Service[];
  onEdit: (service: Service) => void;
  isEditDialogOpen: boolean;
  currentService: Service | null;
  setIsEditDialogOpen: (open: boolean) => void;
  setCurrentService: (service: Service | null) => void;
};

export function ServicesTable({
  services,
  onEdit,
  isEditDialogOpen,
  currentService,
  setIsEditDialogOpen,
  setCurrentService,
}: Props) {
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  const [canClose, setCanClose] = useState(false);

  const handleDelete = async (id: string) => {
    setDeleteLoading(id);

    try {
      const result = await toast.promise(deleteService({ id }), {
        pending: "Deleting service...",
      });
      const { success, message } = getReadableActionResult(result);

      if (!success) {
        toast.error(message);
        return;
      }

      toast.success(message);
    } catch (error) {
      console.error("Error deleting service:", error);
      toast.error("Failed to delete service. Please try again.");
    } finally {
      setDeleteLoading(null);
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead className="hidden md:table-cell">Category</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {services.map((service) => (
          <TableRow key={service.id}>
            <TableCell>{service.title}</TableCell>
            <TableCell className="hidden md:table-cell">
              <Badge variant="outline">
                {service.category.replaceAll("_", " ")}
              </Badge>
            </TableCell>
            <TableCell>
              {service.startingPrice
                ? formatCurrency(service.startingPrice)
                : "-"}
            </TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Dialog
                  open={isEditDialogOpen && currentService?.id === service.id}
                  onOpenChange={(open) => {
                    if (!open && canClose) {
                      setIsEditDialogOpen(false);
                      setCurrentService(null);
                    }
                  }}
                >
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => onEdit(service)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  {currentService && (
                    <EditServiceForm
                      setCanClose={setCanClose}
                      service={currentService}
                      onSuccess={() => {
                        setIsEditDialogOpen(false);
                        setCurrentService(null);
                      }}
                    />
                  )}
                </Dialog>

                <AlertDialog
                  onOpenChange={(open) => {
                    if (!open && !deleteLoading) {
                      setDeleteLoading(null);
                    }
                  }}
                >
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete the service.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(service.id)}
                        disabled={deleteLoading === service.id}
                      >
                        {deleteLoading === service.id
                          ? "Deleting..."
                          : "Delete"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
