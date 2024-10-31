import connect from "@/lib/db";
import Product from "@/lib/models/Product";
// import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";
export const GET = async (req: NextRequest) => {
  try {
    await connect();

    const featuredProducts = await Product.find({ featured: true })
      .sort({ updatedAt: -1 })
      .limit(4);
    // const allProducts = await Product.find({}).sort({ updatedAt: -1 });
    // const featuredProducts = [];
    // for (let i = 0; i < allProducts.length; i++) {
    //   if (featuredProducts.length < 4) {
    //     if (allProducts[i].featured) {
    //       featuredProducts.push(allProducts[i]);
    //     }
    //   }
    // }
    // allProducts.forEach((product) => {
    //   //   while (featuredProducts.length < 4) {
    //   if (product.featured) {
    //     featuredProducts.push(product);
    //   }
    //   //   }
    // });
    return new NextResponse(
      JSON.stringify({
        success: true,
        featuredProducts,
        length: featuredProducts.length,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("Error in API route:", error);

    return new NextResponse(
      JSON.stringify({
        success: false,
        message: "Server Error",
        error: error.message,
        stack: error.stack,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
