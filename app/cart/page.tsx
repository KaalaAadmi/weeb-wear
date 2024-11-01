"use client";
// http://localhost:3000/product/67193da50a8ea2007031ca27
// http://localhost:3000/product/6724bac1106a4f678fe2c6dd
import { Button } from "@/components/ui/button";
import { PRODUCT_CATEGORIES } from "@/config";
import { useStore } from "@/context/StoreContext";
import { useFetchCartItems } from "@/hooks/useFetchCartItems";
// import { ItemCart } from "@/lib/types";
// import { useCart } from "@/hooks/use-cart";
import { cn, formatPrice } from "@/lib/utils";
import { useUser } from "@clerk/clerk-react";
// import { trpc } from "@/trpc/client";
import { Check, Loader2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
// import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Page = () => {
  const { user } = useUser();
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const { cartItems, fetchCartItems } = useFetchCartItems(user?.id || "");
  const { setRefresh, refresh } = useStore(); // Access refresh from context
  console.log("LOGGED IN USER ID:", user?.id);
  useEffect(() => {
    setIsMounted(true);
    if (user) {
      fetchCartItems();
    }
  }, [user, refresh]); // Add `refresh` to trigger re-fetch
  const handleRemoveItem = async (id: string, userId: string) => {
    console.log(id, userId);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/cart`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId: id, userId: userId }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Item removed from cart");
        fetchCartItems(); // Trigger the cart re-fetch
        setRefresh((prev) => !prev); // Triggers re-fetch in `cart.tsx`
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Failed to remove item:", error);
      toast.error("Failed to remove item from cart");
    }
  };

  const cartTotal = cartItems?.reduce(
    (total, item) => total + item?.productPrice,
    0
  );

  const fee = 1;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Shopping Cart
        </h1>

        <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <div
            className={cn("lg:col-span-7", {
              "rounded-lg border-2 border-dashed border-zinc-200 p-12":
                isMounted && cartItems.length === 0,
            })}
          >
            <h2 className="sr-only">Items in your shopping cart</h2>

            {isMounted && cartItems.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center space-y-1">
                <div
                  aria-hidden="true"
                  className="relative mb-4 h-40 w-40 text-muted-foreground"
                >
                  <Image
                    src="/assets/images/hippo-empty-cart.png"
                    fill
                    loading="eager"
                    alt="empty shopping cart hippo"
                  />
                </div>
                <h3 className="font-semibold text-2xl">Your cart is empty</h3>
                <p className="text-muted-foreground text-center">
                  Whoops! Nothing to show here yet.
                </p>
              </div>
            ) : null}

            <ul
              className={cn({
                "divide-y divide-gray-200 border-b border-t border-gray-200":
                  isMounted && cartItems.length > 0,
              })}
            >
              {isMounted &&
                cartItems.map((product, idx) => {
                  const label = PRODUCT_CATEGORIES.find(
                    (c) => c.value === product.productCategory
                  )?.label;

                  const image = product.productImage || "";
                  // console.log(product);
                  console.log("PRODUCT USER ID:", product.userId);
                  return (
                    <li key={idx} className="flex py-6 sm:py-10">
                      <div className="flex-shrink-0">
                        <div className="relative h-24 w-24">
                          {typeof image === "string" && image ? (
                            <Image
                              fill
                              src={image}
                              alt="product image"
                              className="h-full w-full rounded-md object-cover object-center sm:h-48 sm:w-48"
                            />
                          ) : null}
                        </div>
                      </div>

                      <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                          <div>
                            <div className="flex justify-between">
                              <h3 className="text-sm">
                                <Link
                                  href={`/product/${product.productId}`}
                                  className="font-medium text-gray-700 hover:text-gray-800"
                                >
                                  {product.productName}
                                </Link>
                              </h3>
                            </div>

                            <div className="mt-1 flex text-sm">
                              <p className="text-muted-foreground">
                                Category: {label}
                              </p>
                            </div>

                            <p className="mt-1 text-sm font-medium text-gray-900">
                              {formatPrice(product.productPrice)}
                            </p>
                          </div>

                          <div className="mt-4 sm:mt-0 sm:pr-9 w-20">
                            <div className="absolute right-0 top-0">
                              <Button
                                aria-label="remove product"
                                onClick={() =>
                                  handleRemoveItem(
                                    product?._id || "",
                                    product.userId || ""
                                  )
                                }
                                variant="ghost"
                              >
                                <X className="h-5 w-5" aria-hidden="true" />
                              </Button>
                            </div>
                          </div>
                        </div>

                        <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                          <Check className="h-5 w-5 flex-shrink-0 text-green-500" />

                          <span>Eligible for instant delivery</span>
                        </p>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>

          <section className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
            <h2 className="text-lg font-medium text-gray-900">Order summary</h2>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">Subtotal</p>
                <p className="text-sm font-medium text-gray-900">
                  {isMounted ? (
                    formatPrice(cartTotal)
                  ) : (
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  )}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <span>Flat Transaction Fee</span>
                </div>
                <div className="text-sm font-medium text-gray-900">
                  {isMounted ? (
                    formatPrice(fee)
                  ) : (
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <div className="text-base font-medium text-gray-900">
                  Order Total
                </div>
                <div className="text-base font-medium text-gray-900">
                  {isMounted ? (
                    formatPrice(cartTotal + fee)
                  ) : (
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Button
                disabled={cartItems.length === 0}
                // onClick={() => createCheckoutSession({ productIds })}
                className="w-full"
                size="lg"
              >
                {/* {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-1.5" />
                ) : null} */}
                Checkout
              </Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Page;
