import connect from "@/lib/db";
import Cart from "@/lib/models/Cart";
import { type NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams;
    const userId = searchParams.get("userId");

    console.log(userId);
    await connect();
    const cartItems = await Cart.find({ userId });
    return new NextResponse(JSON.stringify({ cartItems: cartItems }), {
      status: 200,
    });
  } catch (error: any) {
    console.error("Error getting cart items:", error);
    return new NextResponse(
      JSON.stringify({
        message: "Error getting cart items",
        error: error.message,
      }),
      { status: 500 }
    );
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const {
      userId,
      productId,
      productName,
      productCategory,
      productSize,
      productImage,
      productColor,
      productQuantity,
      productPrice,
    } = await req.json();
    await connect();
    const cartItem = await Cart.findOne({
      userId,
      productId,
      productSize,
      productColor,
      productCategory,
    });
    if (cartItem) {
      // Update the quantity of the existing item
      cartItem.productQuantity += productQuantity;
      await cartItem.save();
      return new NextResponse(
        JSON.stringify({ message: "Item quantity updated" }),
        { status: 200 }
      );
    }
    const newCartItem = new Cart({
      userId,
      productId,
      productName,
      productSize,
      productCategory,
      productImage,
      productColor,
      productQuantity,
      productPrice,
    });
    await newCartItem.save();
    return new NextResponse(JSON.stringify({ message: "Item added to cart" }), {
      status: 200,
    });
  } catch (error: any) {
    console.error("Error adding item to cart:", error);
    return new NextResponse(
      JSON.stringify({
        message: "Error adding item to cart",
        error: error.message,
      }),
      { status: 500 }
    );
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    const { userId, itemId } = await req.json();
    // const userId = request.userId;
    await connect();
    const item = await Cart.findOne({ _id: itemId, userId });
    if (!item) {
      return new NextResponse(
        JSON.stringify({ message: "Item not found in cart" }),
        { status: 404 }
      );
    }
    await Cart.deleteOne({ _id: itemId, userId });

    return new NextResponse(
      JSON.stringify({ message: "Item removed from cart" }),
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error removing item from cart:", error);
    return new NextResponse(
      JSON.stringify({
        message: "Error removing item from cart",
        error: error.message,
      }),
      { status: 500 }
    );
  }
};
