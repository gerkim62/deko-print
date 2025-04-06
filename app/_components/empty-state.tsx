import { Button } from "@/components/ui/button";
import { PackageOpen } from "lucide-react";

// Empty state component
export function EmptyState({
  message, category,
}: {
  message: string;
  category: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 border border-dashed border-border rounded-lg w-full bg-muted/30">
      <PackageOpen
        className="h-12 w-12 text-muted-foreground mb-4"
        aria-hidden="true" />
      <h4 className="text-lg font-medium text-foreground mb-2">
        Nothing to show
      </h4>
      <p className="text-muted-foreground text-center mb-6">{message}</p>
      <Button variant="outline">Browse other {category}</Button>
    </div>
  );
}