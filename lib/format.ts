import { Prisma } from "@prisma/client";
import { ZodError } from "zod";

export const formatCurrency = (
  amount: number | string | Prisma.Decimal,
  currency: string = "KES",
  locale: string = "en-KE"
): string => {
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(
    Number(amount.valueOf())
  );
};

export const formatDate = (date: Date): string => {
  // without the time part

  return new Intl.DateTimeFormat("en-KE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};

export const formatDateTime = (date: Date): string => {
  return new Intl.DateTimeFormat("en-KE", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).format(date);
};

export const formatTime = (date: Date): string => {
  return new Intl.DateTimeFormat("en-KE", {
    hour: "numeric",
    minute: "numeric",
  }).format(date);
};

export function formatFlattenedZodError(
  flattened: ReturnType<ZodError["flatten"]>
): string {
  const { fieldErrors, formErrors } = flattened;
  const lines: string[] = [];

  // Add form-wide errors
  formErrors.forEach((error) => {
    lines.push(`- form: ${error}`);
  });

  // Add field-specific errors
  Object.entries(fieldErrors).forEach(([field, errors]) => {
    errors?.forEach((error) => {
      lines.push(`- ${field}: ${error}`);
    });
  });

  return lines.join("\n");
}
