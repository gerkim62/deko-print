"use server";

import { auth } from "@/lib/auth";
import actionClient from "@/lib/safe-action";
import utapi from "@/lib/uploadthing";
import { headers } from "next/headers";
import { UTFile } from "uploadthing/server";
import { z } from "zod";

const FormDataSchema = z
  .instanceof(FormData)
  .transform((formData) => {
    console.log(formData);
    const files = formData
      .getAll(`files`)

      .map((file) => {
        console.log(file, typeof file);
        return file;
      })

      .filter((file) => file instanceof File);
    return files;
  })

  .pipe(
    z.array(z.instanceof(File)).nonempty({
      message: "Upload at least one file",
    })
  );

const uploadFiles = actionClient
  .schema(FormDataSchema)
  .action(async ({ parsedInput: files }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return {
        message: "You must be logged in to upload files",
        success: false,
      };
    }

    console.log(files);
    console.log("converting files to UTFile");
    const utFiles = await Promise.all(
      files.map(
        async (file) => new UTFile([await file.arrayBuffer()], file.name)
      )
    );

    console.log("uploading files to uploadthing");
    const results = await utapi.uploadFiles(utFiles);
    console.log("uploadthing results", results);

    const succeededFiles = results
      .filter((res) => !res.error)
      .map((res) => ({
        name: res.data.name,
        url: res.data.ufsUrl,
        key: res.data.key,
      }));
    const failedFiles = results
      .filter((res) => !!res.error)
      .map((res) => res.error);

    //  5 succeeded, 2 failed
    const message =
      [
        succeededFiles.length > 0 &&
          `${succeededFiles.length} uploaded successfully`,
        failedFiles.length > 0 && `${failedFiles.length} failed to upload`,
      ]
        .filter(Boolean)
        .join(". ") || "No files uploaded";

    return {
      message,
      success: true,
      data: {
        uploaded: succeededFiles,
        failed: failedFiles,
      },
    };
  });

export { uploadFiles };

