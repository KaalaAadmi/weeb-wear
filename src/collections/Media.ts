import type { CollectionConfig } from "payload";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
    {
      name: "cloudinaryUrl",
      label: "Cloudinary URL",
      type: "text",
      admin: {
        readOnly: true,
      },
    },
  ],
  upload: {
    disableLocalStorage: true,
  }, // Enables file upload
  hooks: {
    beforeChange: [
      async ({ data, req, operation }) => {
        if (operation === "create" || operation === "update") {
          try {
            if (req.file) {
              // Upload the file buffer directly to Cloudinary
              const result: { secure_url: string } = await new Promise(
                (resolve, reject) => {
                  const uploadStream = cloudinary.uploader.upload_stream(
                    {
                      resource_type: "auto",
                      public_id: `${Date.now()}_${req?.file?.name.replace(/\s+/g, "_")}`,
                      folder: "weebWear/products",
                    }, // Customize folder name
                    (error, result) => {
                      if (error) {
                        reject(
                          new Error(`Cloudinary upload error: ${error.message}`)
                        );
                      } else {
                        if (result) {
                          resolve(result);
                        } else {
                          reject(
                            new Error("Cloudinary upload result is undefined")
                          );
                        }
                      }
                    }
                  );

                  // Write the file buffer to the upload stream
                  uploadStream.end(req?.file?.data);
                }
              );

              if (result) {
                data.cloudinaryUrl = result?.secure_url;
                console.log("Uploaded to Cloudinary:", result?.secure_url);
              }
            }
          } catch (error) {
            console.error("Error uploading to Cloudinary:", error);
            throw new Error("Failed to upload file to Cloudinary.");
          }
        }
      },
    ],
  },
};
