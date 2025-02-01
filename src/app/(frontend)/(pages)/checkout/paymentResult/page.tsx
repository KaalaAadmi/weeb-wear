import { stripe } from "@/lib/stripe";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { redirect } from "next/navigation";

async function getSession(sessionId: string) {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return session;
  } catch (error) {
    console.log(error);
    return null;
  }
}

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) => {
  try {
    // Await the searchParams Promise
    const params = await searchParams;
    const sessionId = params?.session_id;

    if (!sessionId) {
      redirect("/");
    }

    const session = await getSession(sessionId);
    if (!session) {
      return <div>Session not found</div>;
    }
    if (session?.status === "expired") {
      return <div>Session expired</div>;
    }
    if (session.status === "open") {
      return <div>Payment in progress</div>;
    }

    return (
      <div className="flex flex-col gap-4 items-center">
        <div className="w-12 h-12">
          <CheckCircleIcon className="text-green-400" />
        </div>
        <h1 className="text-2xl font-semibold">Payment Successful!</h1>
        <p className="text-lg max-w-lg text-center">
          Hello {session?.customer_details?.name}, your payment was successful.
          <br />
          Your order is being processed. <br />
          Receipt of your purchase will be sent to your email:{" "}
          {session?.customer_email}.
        </p>
      </div>
    );
  } catch (error) {
    console.log(error);
    return <div>Something went wrong</div>;
  }
};

export default page;
