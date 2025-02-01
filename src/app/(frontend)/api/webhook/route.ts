import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const payload = await req.text();

  const res = JSON.parse(payload);

  const sig = req.headers.get("stripe-signature");

  const dateTime = new Date(res.created * 1000).toLocaleDateString();
  const timeString = new Date(res.created * 1000).toLocaleDateString();

  try {
    const event = stripe.webhooks.constructEvent(
      payload,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
    console.log(
      res?.data?.object?.billing_details?.email,
      res?.data?.object?.amount,
      JSON.stringify(res),
      res?.type,
      String(timeString),
      String(dateTime),
      res?.data?.object?.receipt_email,
      res?.data?.object?.receipt_url,
      JSON.stringify(res?.data?.object?.payment_method_details),
      JSON.stringify(res?.data?.object?.billing_details),
      res?.data.object?.currency
    );
    console.log("event", event.type);
    return NextResponse.json({ status: "success", event: event.type });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: "error", error: error });
  }
}
