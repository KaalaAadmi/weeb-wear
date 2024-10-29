import { createUploadthing, type FileRouter } from "uploadthing/next";
import { z } from "zod";
import sharp from "sharp";
import connect from "@/lib/db";
import Custom from "@/lib/models/Custom";

const saveOrUpdateConfiguration = async (
  file: { url: string },
  configId?: string,
  height?: number,
  width?: number
) => {
  // Connect to the database
  await connect();

  if (!configId) {
    // Create a new configuration if `configId` is not provided
    const configuration = await Custom.create({
      imageUrl: file.url,
      height: height || 500,
      width: width || 500,
    });

    return { configId: configuration._id };
  } else {
    // Update the existing configuration with the new croppedImageUrl
    const updatedConfiguration = await Custom.findByIdAndUpdate(
      configId,
      { croppedImageUrl: file.url },
      { new: true }
    );

    return { configId: updatedConfiguration?._id };
  }
};

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .input(z.object({ configId: z.string().optional() }))
    .middleware(async ({ input }) => {
      return { input };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // Connect to the database
      await connect();

      const { configId } = metadata.input;

      // Fetch the image and extract dimensions using sharp
      const res = await fetch(file.url);
      const buffer = await res.arrayBuffer();
      const imgMetadata = await sharp(buffer).metadata();
      const { width, height } = imgMetadata;

      // Call the saveOrUpdateConfiguration function
      const result = await saveOrUpdateConfiguration(
        file,
        configId,
        height,
        width
      );

      return result;
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
