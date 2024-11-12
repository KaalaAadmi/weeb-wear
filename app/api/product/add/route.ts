import { NextResponse } from "next/server";
import connect from "@/lib/db";
import Product from "@/lib/models/Product";
import uploadImagesToCloudinary from "@/lib/common-code";
import { type NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    const name = formData.get("name");
    const descriptionPara1 = formData.get("descriptionPara1");
    const descriptionPara2 = formData.get("descriptionPara2");
    const descriptionPara3 = formData.get("descriptionPara3");
    const highlights = formData.getAll("highlight");
    const colors = formData.get("colors");

    const price = formData.get("price");
    const images = formData.getAll("image") as File[]; // Get uploaded files and cast to File[]
    const category = formData.get("category");
    const sizes = formData.getAll("size");
    const featured = formData.get("featured");
    // const high=highlights.split("\n\n")
    // console.log(highlights);
    // Check for exisiting product
    await connect();

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
    const uploadedImageUrls = await uploadImagesToCloudinary(images as File[]);

    // Save product to MongoDB
    const newProduct = new Product({
      name,
      descriptionPara1,
      descriptionPara2,
      descriptionPara3,
      highlights,
      colors: JSON.parse(colors as string),
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
