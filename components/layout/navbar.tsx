import { Button } from "../ui/button";

export default function Navbar() {
  return (
    <header className="bg-background shadow-md">
      <div className="container mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-xl md:text-2xl font-bold text-primary tracking-tight">
            Deko Print
          </h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
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
          <Button
            size="sm"
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Login
          </Button>
        </div>
      </div>
    </header>
  );
}