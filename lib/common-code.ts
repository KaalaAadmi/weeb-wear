import { v2 as cloudinary } from "cloudinary";

type UploadResponseTypes = {
  public_id?: string;
  secure_url?: string;
};
// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const validFileTypes = ["image/jpeg", "image/jpg", "image/png"];

// Upload images to Cloudinary
const uploadImagesToCloudinary = async (files: File[]) => {
  const uploadedImages = [];
  for (const file of files) {
    if (validFileTypes.includes(file.type)) {
      const buffer = await file.arrayBuffer();
      const uploadResponse: UploadResponseTypes | undefined = await new Promise<
        UploadResponseTypes | undefined
      >((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              resource_type: "auto",
              public_id: `${Date.now()}_${file.name
                .split(".")[0]
                .split(" ")
                .join("_")}`,
              folder: "weebWear/products",
            },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            }
          )
          .end(Buffer.from(buffer));
      });
      uploadedImages.push({
        key: uploadResponse?.public_id,
        url: uploadResponse?.secure_url,
      });
    } else {
      throw new Error("Invalid file type");
    }
  }
  return uploadedImages;
};

export default uploadImagesToCloudinary;
