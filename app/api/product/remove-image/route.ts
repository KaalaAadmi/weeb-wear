import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

import connect from "@/lib/db";
import Product from "@/lib/models/Product";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const DELETE = async (req: NextRequest) => {
  try {
    const { imageAssetId, productId } = await req.json(); // Retrieve data from the request body
    console.log(imageAssetId, productId);
    // Connect to MongoDB
    await connect();

    // Find the product by ID
    const product = await Product.findById(productId);
    console.log(product);
    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    // Check if the image exists in the product
    interface DeleteRequestBody {
      imageAssetId: string;
      productId: string;
    }

    interface ProductDocument {
      _id: string;
      imageUrls: { key: string }[];
      save: () => Promise<void>;
    }

    const imageIndex: number = (product as ProductDocument).imageUrls.findIndex(
      (img: { key: string }) => img.key === imageAssetId
    );
    if (imageIndex === -1) {
      return NextResponse.json(
        { message: "Image not found in product" },
        { status: 404 }
      );
    }

    // Delete the image from Cloudinary
    await cloudinary.uploader.destroy(imageAssetId, {
      resource_type: "image",
    });

    // Remove the image from the product's images array
    product.imageUrls.splice(imageIndex, 1);
    await product.save();

    return NextResponse.json(
      { message: "Image deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting image:", error);
    return NextResponse.json(
      { message: "Error deleting image", error: (error as Error).message },
      { status: 500 }
    );
  }
};
