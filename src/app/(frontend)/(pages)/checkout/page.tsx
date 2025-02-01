"use client";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { useCallback } from "react";
import { useCart } from "@/context/cart-context";
import { useAuth } from "@/context/auth-context";
const Page = () => {
  const {
    cartItems,
    // updateCartItem,
    // removeFromCart
    emptyCart,
  } = useCart();
  const { user } = useAuth();
  console.log("Cart Items in CHECKOUT: ", JSON.stringify(cartItems));
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
  );
  const fetchClientSecret = useCallback(async () => {
    try {
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItems: cartItems,
          email: user?.email,
        }),
      });
      const data = await response.json();
      if (data?.error) {
        throw new Error(data.error);
      }
      console.log("DATA IN CHECKOUT ", data);
      emptyCart();
      return data.client_secret;
    } catch (error) {
      throw error;
    }
  }, []);
  const options = { fetchClientSecret };
  return (
    <div className="flex rounded-lg p-10">
      <EmbeddedCheckoutProvider options={options} stripe={stripePromise}>
        <EmbeddedCheckout className="w-full " />
      </EmbeddedCheckoutProvider>
    </div>
  );
};

export default Page;
