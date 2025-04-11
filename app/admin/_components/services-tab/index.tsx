"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Wrench, PlusCircle } from "lucide-react";
import { useState } from "react";
import { PaginationControls } from "../../../../components/pagination-controls";
import { EmptyState } from "../ui/empty-state";
// Import types from Prisma client
import type { Service } from "@prisma/client";
import { ServicesTable } from "./services-table";
import { CreateServiceForm } from "./create-service-form";

type Props = {
  services: Service[];
};

export default function ServicesTab({ services }: Props) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentService, setCurrentService] = useState<Service | null>(null);

  const [canClose, setCanClose] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(services.length / itemsPerPage);

  const paginatedServices = services.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const openEditDialog = (service: Service) => {
    setCurrentService(service);
    setIsEditDialogOpen(true);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Services</CardTitle>
            <CardDescription>Manage your services.</CardDescription>
          </div>
          <Dialog
            open={isCreateDialogOpen}
            onOpenChange={(open) => canClose && setIsCreateDialogOpen(open)}
          >
            <DialogTrigger asChild>
              <Button size={"sm"}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Service
              </Button>
            </DialogTrigger>
            <CreateServiceForm
              setCanClose={setCanClose}
              onSuccess={() => setIsCreateDialogOpen(false)}
            />
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {paginatedServices.length === 0 ? (
          <EmptyState
            icon={Wrench}
            title="No services yet"
            description="Add services to your catalog to see them here."
            action={{
              label: "Add Service",
              onClick: () => setIsCreateDialogOpen(true),
            }}
          />
        ) : (
          <div className="overflow-x-auto">
            <ServicesTable
              services={paginatedServices}
              onEdit={openEditDialog}
              isEditDialogOpen={isEditDialogOpen}
              currentService={currentService}
              setIsEditDialogOpen={setIsEditDialogOpen}
              setCurrentService={setCurrentService}
            />
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
