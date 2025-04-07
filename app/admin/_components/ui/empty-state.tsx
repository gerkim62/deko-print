import { type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-12",
        className
      )}
    >
      {Icon && (
        <Icon
          className="h-12 w-12 text-muted-foreground mb-4"
          strokeWidth={1.5}
        />
      )}
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="text-sm text-muted-foreground text-center max-w-md mt-1 mb-4">
        {description}
      </p>
      {action && <Button onClick={action.onClick}>{action.label}</Button>}
    </div>
  );
}
