import { ZodError } from "zod";

export function formatCurrency(amount: number, prefix: string = "Ksh") {
  const formatted = new Intl.NumberFormat(undefined, {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

  return `${prefix} ${formatted}`;
}

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
