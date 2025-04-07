// // app/my/orders/components/cancel-order-dialog.tsx
// "use client";

// import React from "react";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog";
// import { Loader2 } from "lucide-react";

// interface CancelOrderDialogProps {
//   isOpen: boolean;
//   isLoading: boolean;
//   onClose: () => void;
//   onConfirm: () => void;
// }

// export function CancelOrderDialog({
//   isOpen,
//   isLoading,
//   onClose,
//   onConfirm,
// }: CancelOrderDialogProps) {
//   return (
//     <AlertDialog open={isOpen} onOpenChange={(open) => !isLoading && !open && onClose()}>
//       <AlertDialogContent>
//         <AlertDialogHeader>
//           <AlertDialogTitle>Cancel Order</AlertDialogTitle>
//           <AlertDialogDescription>
//             Are you sure you want to cancel this order? This action cannot be undone.
//           </AlertDialogDescription>
//         </AlertDialogHeader>
//         <AlertDialogFooter>
//           <AlertDialogCancel disabled={isLoading}>No, keep order</AlertDialogCancel>
//           <AlertDialogAction 
//             onClick={(e) => {
//               e.preventDefault();
//               onConfirm();
//             }}
//             disabled={isLoading}
//             className="bg-destructive hover:bg-destructive/90"
//           >
//             {isLoading ? (
//               <>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 Cancelling...
//               </>
//             ) : (
//               "Yes, cancel order"
//             )}
//           </AlertDialogAction>
//         </AlertDialogFooter>
//       </AlertDialogContent>
//     </AlertDialog>
//   );
// }