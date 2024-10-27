import connect from "@/lib/db";
import Product from "@/lib/models/Product";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connect();
    const products = await Product.find();
    if (!products) {
      return NextResponse.json(
        { message: "No product found in DB" },
        { status: 404 }
      );
    } else {
      // return new NextResponse(
      //   { products: JSON.stringify(products) },
      //   { status: 200 }
      // );
      // Return the products in JSON format
      return NextResponse.json(
        { products }, // products directly in the response body
        { status: 200 }
      );
    }
  } catch (error: any) {}
};
