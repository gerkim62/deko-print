import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";
import { UserButton } from "../user-button";

export default function Navbar() {
  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-4 md:px-6 py-2 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Logo"
            width={40}
            height={40}
            className="mr-2 rounded-full border"
          />
          <h1 className="text-xl md:text-2xl font-bold text-primary tracking-tight">
            Deko Print
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden m:flex items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-primary"
          >
            Home
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-primary"
          >
            Services
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-primary"
          >
            Printing
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-primary"
          >
            Repairs
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-primary"
          >
            Shop
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-primary"
          >
            Contact
          </Button>
        </nav>

        <div className="flex items-center gap-2">
          <UserButton />
        </div>
      </div>
    </header>
  );
}
