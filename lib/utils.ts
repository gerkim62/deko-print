import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Compressor from "compressorjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const compressionOptions = {
  quality: 0.8, // Between 0 and 1
  maxWidth: 1920,
  maxHeight: 1920,
  convertSize: 1024 * 1024, // Convert images larger than 1MB to JPEG
};
export const compressImage = (file: File): Promise<File | null> => {
  return new Promise((resolve) => {
    new Compressor(file, {
      ...compressionOptions,
      success(result: Blob) {
        const compressedFile = new File([result], file.name, {
          type: result.type,
        });
        resolve(compressedFile);
      },
      error(err: Error) {
        console.error("Error compressing image:", err);
        resolve(null);
      },
    });
  });
};
