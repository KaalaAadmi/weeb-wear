import { getPayloadHMR } from "@payloadcms/next/utilities";
import configPromise from "@payload-config";
import { NextRequest, NextResponse } from "next/server";
import { headersWithCors } from "payload";

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

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const email = searchParams.get("email");
  let orderType = searchParams.get("orderType");
  if (!orderType) {
    orderType = "charge.succeeded";
  }
  const payload = await getPayloadHMR({
    config: configPromise,
  });
  try {
    const res = await payload.find({
      collection: "orders",
      limit: 10,
      sort: "-createdAt",
      // direction: 'desc',
      where: {
        and: [
          { email: { equals: email } },
          { orderType: { equals: orderType } },
        ],
      },
    });
    const response = new NextResponse(JSON.stringify(res.docs), {
      status: 200,
    });
    response.headers.set("Content-Type", "application/json");
    Object.entries(headersWithCors).forEach(([key, value]) => {
      response.headers.set(key, value);
    });
    return response;
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ error: `Error fetching orders: ${error}` }),
      { status: 500 }
    );
  }
};
