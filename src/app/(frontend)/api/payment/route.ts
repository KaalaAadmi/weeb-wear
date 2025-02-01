import { stripe } from "@/lib/stripe";
// import { color } from "framer-motion";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    console.log("DATA IN API PAYMENT: ", JSON.stringify(data.cartItems));
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      line_items: data.cartItems.map((item: any) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.productId.name,
            images: [item.image],
            // color: item.color,
            // size: item.size,
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),
      customer_email: data.email,
      payment_method_types: ["card"],
      mode: "payment",
      return_url: `${req.headers.get("referer")}/paymentResult?session_id={CHECKOUT_SESSION_ID}`,
    });
    return NextResponse.json({
      id: session.id,
      client_secret: session.client_secret as string,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 400 }
    );
  }
}
