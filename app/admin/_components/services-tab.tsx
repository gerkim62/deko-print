"use client";

import { useState } from "react";
import { PlusCircle, Pencil, Trash2, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Textarea } from "@/components/ui/textarea";
import { PaginationControls } from "./pagination-controls";
import { EmptyState } from "./ui/empty-state";

// Import types from Prisma client
import type { Service } from "@prisma/client";

// Mock data for demonstration
const mockServices: Service[] = [
  {
    id: "serv-1",
    title: "Screen Repair",
    description: "Fix broken screens",
    tags: ["repair", "screen"],
    startingPrice: 120.0,
    image: "/placeholder.svg",
    category: "Repair",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "serv-2",
    title: "Photo Printing",
    description: "High quality photo printing service",
    tags: ["printing", "photo"],
    startingPrice: 15.0,
    image: "/placeholder.svg",
    category: "Printing",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function ServicesTab() {
  const [services, setServices] = useState<Service[]>(mockServices);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentService, setCurrentService] = useState<Service | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(services.length / itemsPerPage);

  const paginatedServices = services.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCreate = (data: Partial<Service>) => {
    const newService: Service = {
      id: `serv-${services.length + 1}`,
      title: data.title || "New Service",
      description: data.description || "",
      tags: data.tags || [],
      startingPrice: data.startingPrice || null,
      image: data.image || "/placeholder.svg",
      category: data.category || "Repair",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setServices([...services, newService]);
    setIsCreateDialogOpen(false);
  };

  const handleEdit = (data: Partial<Service>) => {
    if (!currentService) return;

    const updatedServices = services.map((service) =>
      service.id === currentService.id
        ? { ...service, ...data, updatedAt: new Date() }
        : service
    );

    setServices(updatedServices);
    setIsEditDialogOpen(false);
    setCurrentService(null);
  };

  const handleDelete = (id: string) => {
    setServices(services.filter((service) => service.id !== id));
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
            onOpenChange={setIsCreateDialogOpen}
          >
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Service
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Add New Service</DialogTitle>
                <DialogDescription>
                  Create a new service. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input id="title" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Textarea id="description" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">
                    Category
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Printing">Printing</SelectItem>
                      <SelectItem value="Repair">Repair</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="startingPrice" className="text-right">
                    Starting Price
                  </Label>
                  <Input
                    id="startingPrice"
                    type="number"
                    step="0.01"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="image" className="text-right">
                    Image URL
                  </Label>
                  <Input id="image" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  onClick={() =>
                    handleCreate({
                      title: "New Service",
                      description: "Service description",
                      category: "Repair",
                      startingPrice: 49.99,
                      tags: ["new", "repair"],
                    })
                  }
                >
                  Save
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {paginatedServices.length === 0 ? (
          <EmptyState
            icon={Wrench}
            title="No services yet"
            description="Add services to your offerings to see them here."
            action={{
              label: "Add Service",
              onClick: () => setIsCreateDialogOpen(true),
            }}
          />
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Category
                  </TableHead>
                  <TableHead>Starting Price</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedServices.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell>{service.id}</TableCell>
                    <TableCell>{service.title}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant="outline">{service.category}</Badge>
                    </TableCell>
                    <TableCell>
                      {service.startingPrice
                        ? `$${service.startingPrice.toFixed(2)}`
                        : "N/A"}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Dialog
                          open={
                            isEditDialogOpen &&
                            currentService?.id === service.id
                          }
                          onOpenChange={(open) => {
                            setIsEditDialogOpen(open);
                            if (open) setCurrentService(service);
                            else setCurrentService(null);
                          }}
                        >
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[525px]">
                            <DialogHeader>
                              <DialogTitle>Edit Service</DialogTitle>
                              <DialogDescription>
                                Make changes to the service. Click save when
                                you're done.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="edit-title"
                                  className="text-right"
                                >
                                  Title
                                </Label>
                                <Input
                                  id="edit-title"
                                  defaultValue={currentService?.title}
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="edit-description"
                                  className="text-right"
                                >
                                  Description
                                </Label>
                                <Textarea
                                  id="edit-description"
                                  defaultValue={currentService?.description}
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="edit-startingPrice"
                                  className="text-right"
                                >
                                  Starting Price
                                </Label>
                                <Input
                                  id="edit-startingPrice"
                                  type="number"
                                  step="0.01"
                                  defaultValue={
                                    currentService?.startingPrice || ""
                                  }
                                  className="col-span-3"
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button
                                type="submit"
                                onClick={() =>
                                  handleEdit({
                                    title: currentService?.title,
                                    startingPrice:
                                      (currentService?.startingPrice || 0) + 10,
                                  })
                                }
                              >
                                Save changes
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>

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
                                This action cannot be undone. This will
                                permanently delete the service.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(service.id)}
                              >
                                Delete
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
