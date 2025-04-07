import { Button } from "@/components/ui/button";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileQuestionIcon } from "lucide-react";

export default function ProductNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-full bg-background p-4 py-16">
      <Card className="w-full max-w-lg shadow">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto bg-muted p-3 rounded-full mb-6">
            <FileQuestionIcon className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-3xl font-semibold">
            Not Available
          </CardTitle>
          <CardDescription className="text-base mt-2">
            The item you’re looking for isn’t here.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4 pt-2">
          <p className="text-muted-foreground text-balance">
            This product or service might have been removed, is temporarily
            unavailable or out of stock.
          </p>
          <div className="border-t pt-4 mt-4">
            <p className="text-sm text-muted-foreground">
              Still need help?{" "}
              <Link href={"/contact-us"} className="text-primary font-medium">
                Contact us
              </Link>
              .
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-3 pt-2">
          <Button asChild className="w-full">
            <Link href="/">Browse Other Products</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
