import { getPayloadHMR } from "@payloadcms/next/utilities";
import configPromise from "@payload-config";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const payload = await getPayloadHMR({
    config: configPromise,
  });
  const body = await req.json();
  try {
    const res = await payload.create({
      collection: "orders",
      data: {
        name: body?.name,
        email: body?.email,
        currency: body?.currency,
        amount: body?.amount,
        address: body?.address,
        date: body?.date,
        receipt_url: body?.receipt_url,
        checkout_session_id: body?.checkout_session_id,
        transaction_id: body?.transaction_id,
        payment_intent_id: body?.payment_intent_id as string,
        orderType: body?.orderType,
      },
    });
    return new NextResponse(JSON.stringify(res), { status: 200 });
  } catch (error) {
    console.error("Error adding order:", error);
    return new NextResponse(JSON.stringify({ error: "Error adding order" }), {
      status: 500,
    });
  }
};
