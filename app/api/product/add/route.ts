import { NextResponse } from "next/server";
import connect from "@/lib/db";
import Product from "@/lib/models/Product";
import uploadImagesToCloudinary from "@/lib/common-code";
import { type NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    const name = formData.get("name");
    const description = formData.get("description");
    const price = formData.get("price");
    const images = formData.getAll("image"); // Get uploaded files
    const category = formData.get("category");
    const sizes = formData.getAll("size");
    const featured = formData.get("featured");

    // Check for exisiting product
    const product = await Product.findOne({ name: name, price: price });
    console.log("EXISTING PRODUCT: ", product);
    if (product) {
      console.log(JSON.stringify(product));
      return new NextResponse(
        JSON.stringify({ message: "Product already exists" }),
        { status: 400 }
      );
    }

    // Upload images to Cloudinaryf
    const uploadedImageUrls = await uploadImagesToCloudinary(images);

    // Save product to MongoDB
    await connect();
    const newProduct = new Product({
      name,
      description,
      price,
      imageUrls: uploadedImageUrls,
      featured,
      category,
      sizes,
    });
    await newProduct.save();

    return NextResponse.json(
      { message: "Product added successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error adding product:", error);
    return NextResponse.json(
      { message: "Error adding product", error: error.message },
      { status: 500 }
    );
  }
};
