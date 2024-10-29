import connect from "@/lib/db";
import Product from "@/lib/models/Product";
import { type NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    await connect();

    const url = new URL(req.url);
    const searchParams = url.searchParams;

    const category = searchParams.get("category") || "";
    // Get colors and sizes from the filters object using the [color] format
    const colors = [];
    let i = 0;
    while (searchParams.has(`filters[color][${i}]`)) {
      colors.push(searchParams.get(`filters[color][${i}]`));
      i++;
    }

    const sizes = [];
    i = 0;
    while (searchParams.has(`filters[size][${i}]`)) {
      sizes.push(searchParams.get(`filters[size][${i}]`));
      i++;
    }
    const sortOption = searchParams.get("sort");

    console.log(
      "Query Parameters - Category:",
      category,
      "Color Filters:",
      colors,
      "Sizes:",
      sizes,
      "Sort Option:",
      sortOption
    );

    const filters: any = {};
    if (category) filters.category = category;
    // Map-specific color filtering
    if (colors.length > 0) {
      filters["$or"] = colors.map((color) => ({
        [`colors.${color}`]: { $exists: true },
      }));
    }
    if (sizes.length > 0) filters["sizes"] = { $in: sizes };

    const sortCriteria: any = {};
    switch (sortOption) {
      case "popular":
        sortCriteria.popularity = -1;
        break;
      case "best":
        sortCriteria.rating = -1;
        break;
      case "newest":
        sortCriteria.createdAt = -1;
        break;
      case "pricelow":
        sortCriteria.price = 1;
        break;
      case "pricehigh":
        sortCriteria.price = -1;
        break;
      default:
        sortCriteria.name = 1;
    }

    const products = await Product.find(filters).sort(sortCriteria);

    if (!products || products.length === 0) {
      return new NextResponse(
        JSON.stringify({ message: "No products found" }),
        { status: 404 }
      );
    }

    return new NextResponse(JSON.stringify({ products: products }), {
      status: 200,
    });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        error: error.message || "An error occurred while fetching products",
      }),
      { status: 500 }
    );
  }
};
