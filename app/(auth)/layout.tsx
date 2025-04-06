import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
