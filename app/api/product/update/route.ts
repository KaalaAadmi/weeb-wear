import connect from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import Product from "@/lib/models/Product";
import uploadImagesToCloudinary from "@/lib/common-code";
import { ProductType } from "@/lib/types";

const validImageTypes = ["image/jpeg", "image/jpg", "image/png"];

export const PUT = async (req: NextRequest) => {
  try {
    // Parse the form data
    const formData = await req.formData();
    const productId = formData.get("productId");
    const name = formData.get("name");
    const descriptionPara1 = formData.get("descriptionPara1");
    const descriptionPara2 = formData.get("descriptionPara2");
    const descriptionPara3 = formData.get("descriptionPara3");
    const price = formData.get("price");
    const newImages = formData.getAll("image"); // New image files if any

    if (!productId) {
      return new NextResponse(
        JSON.stringify({ message: "Product ID is required" }),
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await connect();

    // Fetch the product from MongoDB
    const product = await Product.findById(productId);
    if (!product) {
      return new NextResponse(
        JSON.stringify({ message: "Product not found" }),
        { status: 404 }
      );
    }

    // If the product doesn't have an images array, initialize it
    if (!Array.isArray(product.imageUrls)) {
      product.imageUrls = [];
    }

    // If there are new image files, upload them to Cloudinary
    let uploadedImages = [];
    if (newImages && newImages.length > 0) {
      uploadedImages = await uploadImagesToCloudinary(newImages as File[]);

      // Append new images to the existing product images
      product?.imageUrls?.push(...uploadedImages);
    }

    // Update the other product fields
    product.name = (name as string) || product.name;
    product.descriptionPara1 =
      (descriptionPara1 as string) || product.descriptionPara1;
    product.descriptionPara2 =
      (descriptionPara2 as string) || product.descriptionPara2;
    product.descriptionPara3 =
      (descriptionPara3 as string) || product.descriptionPara3;
    product.price = price ? parseFloat(price as string) : product.price;

    // Save the updated product back to MongoDB
    await (product as any).save();

    return new NextResponse(
      JSON.stringify({ message: "Product updated successfully", product }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating product:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return new NextResponse(
      JSON.stringify({ message: `Error updating product: ${errorMessage}` }),
      { status: 500 }
    );
  }
};
