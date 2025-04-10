"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth";
import { UserRole } from "@prisma/client";
import {
  LoaderCircleIcon,
  LogOut,
  ShoppingBag,
  LayoutDashboard,
  BarChart,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "nextjs-toploader/app";
import { useState } from "react";

export function UserButton() {
  const router = useRouter();
  const { data: session, isPending, error } = authClient.useSession();
  const role = session?.user?.role || UserRole.REGULAR; //OR ADMIN

  const [isSigningOut, setIsSigningOut] = useState(false);

  // Handle sign out
  const handleSignOut = async () => {
    setIsSigningOut(true);
    await authClient
      .signOut({
        fetchOptions: {
          onSuccess: () => {
            router.replace("/sign-in");
          },
        },
      })
      .finally(() => {
        setIsSigningOut(false);
      });
  };

  // If loading or error, show appropriate state
  if (isPending) {
    return (
      <Button
        title="Loading user info..."
        variant="ghost"
        size="icon"
        className="relative h-8 w-8 rounded-full"
      >
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-muted">
            <LoaderCircleIcon className="h-4 w-4 animate-spin" />
          </AvatarFallback>
        </Avatar>
      </Button>
    );
  }

  if (error || !session?.user) {
    return (
      <div className="flex items-center space-x-2">
        <Button variant="outline" title="Sign in" asChild size="sm">
          <Link href={"/sign-in"}>Sign In</Link>
        </Button>
        <Button title="Sign up" size="sm" asChild>
          <Link href={"/sign-up"}>Create Account</Link>
        </Button>
      </div>
    );
  }

  // Get first letters of user name for avatar fallback
  const getInitials = (name: string) => {
    if (!name.length) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          title={`${session.user.name} options`}
          variant="outline"
          size="icon"
          className="relative h-8 w-8 rounded-full"
        >
          <Avatar className=" border">
            <AvatarImage src={""} alt={session.user.name || "User"} />
            <AvatarFallback>{getInitials(session.user.name)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {session.user.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {session.user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/my/orders" className="cursor-pointer flex items-center">
            <ShoppingBag className="mr-2 h-4 w-4" />
            <span>My Orders</span>
          </Link>
        </DropdownMenuItem>
        {role === UserRole.ADMIN && (
          <>
            <DropdownMenuItem asChild>
              <Link href="/admin" className="cursor-pointer flex items-center">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href="/admin/finance"
                className="cursor-pointer flex items-center"
              >
                <BarChart className="mr-2 h-4 w-4" />
                <span>Finance</span>
              </Link>
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer flex items-center"
          onClick={handleSignOut}
          disabled={isSigningOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>{isSigningOut ? "Signing out..." : "Log out"}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
