"use client";

import Price from "@/components/price";
import Prose from "@/components/prose";
import { Suspense, useState } from "react";
import { VariantSelector } from "./variant-selector";
import { Product, Review } from "../../payload-types";
import { AddToCart } from "../cart/add-to-cart";
import { useAuth } from "@/context/auth-context";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { ScrollArea } from "../ui/scroll-area";
import ReviewComponent from "./review";
import { StarIcon } from "@heroicons/react/24/solid";

type Highlight = {
  highlight?: string | null;
  id?: string | null;
};
type ProductVariant = {
  productId: string;
  userId: string;
  name: string;
  price: number;
  color: string;
  size: string;
  category: string;
  quantity: number;
  image: string;
  highlights?: Highlight[] | null;
};

export function ProductDescription({
  product,
  reviews,
}: {
  product: Product;
  reviews?: Review[];
}) {
  const [activeColor, setActiveColor] = useState<string | null>(null);
  const [activeSize, setActiveSize] = useState<string | null>(null);
  const { user } = useAuth();

  const productData: ProductVariant = {
    productId: product?.id as string,
    userId: user?.id as string,
    name: product?.name,
    price: product?.price,
    color: activeColor ?? "",
    size: activeSize ?? "",
    category: product?.category,
    quantity: 1,
    image:
      typeof product?.images?.[0]?.image === "object" &&
      product.images[0].image.cloudinaryUrl
        ? product.images[0].image.cloudinaryUrl
        : "",
    highlights: product?.highlights,
  };
  // fetch reviews
  // const reviews = [
  //   { id: "1", highlight: "good", rating: 5 },
  //   { id: "2", highlight: "bad", rating: 1 },
  //   { id: "3", highlight: "okay", rating: 4 },
  // ];
  let averageRating = 0;

  if (Array.isArray(reviews) && reviews.length > 0) {
    averageRating =
      reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  }
  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
        <h1 className="mb-2 text-5xl font-medium">{product.name}</h1>
        <div className="mr-auto w-auto rounded-full bg-blue-600 p-2 text-sm text-white">
          <Price amount={product.price.toString()} />
        </div>
      </div>

      <Suspense fallback={null}>
        <VariantSelector
          colors={product?.colors ?? []}
          sizes={product?.sizes ?? []}
          category={product?.category ?? ""}
          activeColor={activeColor}
          activeSize={activeSize}
          setActiveColor={setActiveColor}
          setActiveSize={setActiveSize}
        />
      </Suspense>

      <Suspense fallback={null}>
        <AddToCart product={productData} />
      </Suspense>

      {/* Accordion Section */}
      <Accordion type="single" defaultValue="description" collapsible>
        <AccordionItem value="description">
          <AccordionTrigger>Description</AccordionTrigger>
          <AccordionContent>
            {product.descriptionPara1 && (
              <Prose
                className="m-6 mt-3 max-h-96 overflow-y-auto text-sm leading-tight dark:text-white/[60%]"
                html={product.descriptionPara1}
              />
            )}
            {product.descriptionPara2 && (
              <Prose
                className="m-6 mt-3 max-h-96 overflow-y-auto text-sm leading-tight dark:text-white/[60%]"
                html={product.descriptionPara2}
              />
            )}
            {product.descriptionPara3 && (
              <Prose
                className="m-6 mt-3 max-h-96 overflow-y-auto text-sm leading-tight dark:text-white/[60%]"
                html={product.descriptionPara3}
              />
            )}
          </AccordionContent>
        </AccordionItem>

        {product.highlights !== null &&
          product.highlights !== undefined &&
          product.highlights.length !== 0 && (
            <AccordionItem value="highlights">
              <AccordionTrigger>Highlights</AccordionTrigger>
              <AccordionContent>
                {/* Replace with actual highlights content */}
                <ul className=" list-inside list-disc">
                  {product.highlights?.map((highlight) => (
                    <li key={highlight.id}>{highlight.highlight}</li>
                  ))}
                </ul>
                {/* <p>Highlights about the product go here.</p> */}
              </AccordionContent>
            </AccordionItem>
          )}

        {product.category.toLowerCase() !== "poster" && (
          <AccordionItem value="fabric-and-care">
            <AccordionTrigger>Fabric and Care</AccordionTrigger>
            <AccordionContent>
              {/* Replace with actual fabric and care content */}
              <p>Fabric and care instructions go here.</p>
            </AccordionContent>
          </AccordionItem>
        )}
        {reviews !== null && reviews !== undefined && reviews.length !== 0 && (
          <AccordionItem value="reviews">
            <AccordionTrigger>Reviews</AccordionTrigger>
            <AccordionContent>
              {/* Replace with actual reviews content */}
              {/* <p>Reviews about the product go here.</p> */}
              <Sheet>
                <div className="flex items-center">
                  <div className="flex items-center">
                    <div className="flex items-center">
                      <StarIcon className="h-4 w-4 text-yellow-500" />
                      <span className="ml-1 text-sm text-gray-500 dark:text-white">
                        {averageRating.toFixed(1)}
                      </span>
                    </div>
                    <span className="ml-2 text-sm text-gray-500 dark:text-white">
                      based on{" "}
                      <SheetTrigger className="underline">
                        {reviews.length} reviews
                      </SheetTrigger>
                    </span>
                  </div>
                  {/* <button className="ml-auto text-sm text-blue-600 dark:text-blue-400">
                      Write a review
                    </button> */}
                </div>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Reviews</SheetTitle>
                    <SheetDescription>
                      <ScrollArea>
                        <div className="flex justify-between p-2">
                          <div>
                            <span>
                              {averageRating}
                              <span className="flex items-center">
                                {Array.from(
                                  { length: Math.ceil(averageRating) },
                                  (_, index) => (
                                    <StarIcon
                                      key={index}
                                      className="h-4 w-4 text-yellow-500"
                                    />
                                  )
                                )}
                              </span>
                              {/* <StarIcon className="h-4 w-4" /> */}
                            </span>
                          </div>
                          <div>
                            <span>
                              Based on {reviews.length} customer review(s)
                            </span>
                          </div>
                        </div>
                        <hr className="pb-2" />
                        {Array.isArray(reviews) &&
                          reviews.length > 0 &&
                          reviews.map((review) => (
                            <div key={review.id}>
                              <ReviewComponent review={review} />
                              <hr className="py-2" />
                            </div>
                          ))}
                      </ScrollArea>
                    </SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            </AccordionContent>
          </AccordionItem>
        )}
      </Accordion>
    </>
  );
}
