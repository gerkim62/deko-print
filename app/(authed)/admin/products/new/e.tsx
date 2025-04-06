// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm, SubmitHandler } from "react-hook-form";
// import { z } from "zod";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { useState } from "react";
// import { Badge } from "@/components/ui/badge";
// import { X } from "lucide-react";

// // Define the schema here to ensure type consistency
// const NewProductSchema = z.object({
//   title: z.string().min(1, "Title is required"),
//   description: z.string().min(1, "Description is required"),
//   tags: z.array(z.string()).default([]),
//   price: z.number().positive("Price must be positive"),
//   image: z.string().url("Image must be a valid URL").optional().or(z.literal("")),
//   category: z.enum(["Pre_owned", "Accessory"]),
//   stockRemaining: z.number().int().nonnegative("Stock must be zero or more"),
// });

// // Define the form values type
// type NewProductFormValues = z.infer<typeof NewProductSchema>;

// export default function NewProductPage() {
//   const [tagInput, setTagInput] = useState("");
  
//   // Define form with explicit generic type
//   const form = useForm<NewProductFormValues>({
//     resolver: zodResolver<NewProductFormValues>(NewProductSchema),
//     defaultValues: {
//       title: "",
//       description: "",
//       tags: [],
//       price: 0,
//       image: "",
//       category: "Accessory" as const,
//       stockRemaining: 0,
//     },
//   });

//   // Handle form submission with explicit SubmitHandler type
//   const onSubmit: SubmitHandler<NewProductFormValues> = (data) => {
//     console.log("Form submitted:", data);
//     // Here you would typically send this data to your API
//     alert("Product added successfully");
//     form.reset();
//   };

//   // Handle adding tags
//   const addTag = () => {
//     if (tagInput.trim() !== "") {
//       const currentTags = form.getValues("tags");
//       form.setValue("tags", [...currentTags, tagInput.trim()]);
//       setTagInput("");
//     }
//   };

//   // Handle removing tags
//   const removeTag = (tagToRemove: string) => {
//     const currentTags = form.getValues("tags");
//     form.setValue(
//       "tags",
//       currentTags.filter((tag) => tag !== tagToRemove)
//     );
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
      
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//           {/* Title Field */}
//           <FormField<NewProductFormValues>
//             control={form.control}
//             name="title"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Title</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Product title" {...field} />
//                 </FormControl>
//                 <FormDescription>
//                   Enter a descriptive title for your product.
//                 </FormDescription>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
          
//           {/* Description Field */}
//           <FormField<NewProductFormValues>
//             control={form.control}
//             name="description"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Description</FormLabel>
//                 <FormControl>
//                   <Textarea
//                     placeholder="Product description"
//                     className="h-32"
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormDescription>
//                   Provide detailed information about the product.
//                 </FormDescription>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
          
//           {/* Tags Field */}
//           <FormField<NewProductFormValues>
//             control={form.control}
//             name="tags"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Tags</FormLabel>
//                 <div className="flex gap-2 mb-2">
//                   <Input
//                     value={tagInput}
//                     onChange={(e) => setTagInput(e.target.value)}
//                     placeholder="Add a tag"
//                     className="flex-1"
//                     onKeyDown={(e) => {
//                       if (e.key === "Enter") {
//                         e.preventDefault();
//                         addTag();
//                       }
//                     }}
//                   />
//                   <Button type="button" onClick={addTag}>
//                     Add
//                   </Button>
//                 </div>
//                 <div className="flex flex-wrap gap-2 mt-2">
//                   {field.value.map((tag) => (
//                     <Badge key={tag} className="px-2 py-1">
//                       {tag}
//                       <Button
//                         type="button"
//                         variant="ghost"
//                         size="sm"
//                         className="h-4 w-4 p-0 ml-2"
//                         onClick={() => removeTag(tag)}
//                       >
//                         <X className="h-3 w-3" />
//                       </Button>
//                     </Badge>
//                   ))}
//                 </div>
//                 <FormDescription>
//                   Add relevant tags to help categorize the product.
//                 </FormDescription>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
          
//           {/* Price Field */}
//           <FormField<NewProductFormValues>
//             control={form.control}
//             name="price"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Price</FormLabel>
//                 <FormControl>
//                   <Input
//                     type="number"
//                     placeholder="0.00"
//                     {...field}
//                     onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
//                   />
//                 </FormControl>
//                 <FormDescription>
//                   Enter the product price (must be greater than 0).
//                 </FormDescription>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
          
//           {/* Image URL Field */}
//           <FormField<NewProductFormValues>
//             control={form.control}
//             name="image"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Image URL</FormLabel>
//                 <FormControl>
//                   <Input placeholder="https://example.com/image.jpg" {...field} />
//                 </FormControl>
//                 <FormDescription>
//                   Enter a valid URL for the product image (optional).
//                 </FormDescription>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
          
//           {/* Category Field */}
//           <FormField<NewProductFormValues>
//             control={form.control}
//             name="category"
//             render={({ field }) => (
//               <FormItem className="space-y-3">
//                 <FormLabel>Category</FormLabel>
//                 <FormControl>
//                   <RadioGroup
//                     onValueChange={field.onChange}
//                     defaultValue={field.value}
//                     className="flex flex-col space-y-1"
//                   >
//                     <FormItem className="flex items-center space-x-3 space-y-0">
//                       <FormControl>
//                         <RadioGroupItem value="Pre_owned" />
//                       </FormControl>
//                       <FormLabel className="font-normal">Pre-owned</FormLabel>
//                     </FormItem>
//                     <FormItem className="flex items-center space-x-3 space-y-0">
//                       <FormControl>
//                         <RadioGroupItem value="Accessory" />
//                       </FormControl>
//                       <FormLabel className="font-normal">Accessory</FormLabel>
//                     </FormItem>
//                   </RadioGroup>
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
          
//           {/* Stock Remaining Field */}
//           <FormField<NewProductFormValues>
//             control={form.control}
//             name="stockRemaining"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Stock Remaining</FormLabel>
//                 <FormControl>
//                   <Input
//                     type="number"
//                     placeholder="0"
//                     {...field}
//                     onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
//                   />
//                 </FormControl>
//                 <FormDescription>
//                   Enter the available stock quantity (must be 0 or more).
//                 </FormDescription>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
          
//           <Button type="submit" className="w-full">Add Product</Button>
//         </form>
//       </Form>
//     </div>
//   );
// }