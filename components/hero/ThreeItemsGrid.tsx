// import { GridTileImage } from 'components/grid/tile';
// import { getCollectionProducts } from 'lib/shopware';
// import { isSeoUrls } from 'lib/shopware/helpers';
// import type { Product } from 'lib/shopware/types';
// "use client";
import Link from "next/link";
import { GridTileImage } from "./Tile";
import { ProductType } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
// import { useEffect, useState } from "react";
import { useFetchProducts } from "@/hooks/use-products";

function ThreeItemGridItem({
  item,
  size,
  priority,
}: {
  item: ProductType;
  size: "full" | "half";
  priority?: boolean;
}) {
  return (
    <div
      className={
        size === "full"
          ? "md:col-span-4 md:row-span-2"
          : "md:col-span-2 md:row-span-1"
      }
    >
      <Link
        className="relative block aspect-square h-full w-full"
        href={`/product/${item?._id}`}
      >
        <GridTileImage
          src={item?.imageUrls[0]?.url}
          fill
          sizes={
            size === "full"
              ? "(min-width: 768px) 66vw, 100vw"
              : "(min-width: 768px) 33vw, 100vw"
          }
          priority={priority}
          alt={item?.name}
          label={{
            position: size === "full" ? "center" : "bottom",
            title: item?.name as string,
            amount: formatPrice(item?.price),
            // currencyCode: item.priceRange.maxVariantPrice.currencyCode,
          }}
        />
      </Link>
    </div>
  );
}

export function ThreeItemGrid() {
  // Collections that start with `hidden-*` are hidden from the search page.
  const { products } = useFetchProducts();
  console.log("Hero Prooducts: ", products);
  return (
    <section className="w-full h-full mx-auto grid max-w-screen-2xl gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2">
      <ThreeItemGridItem size="full" item={products[0]} priority={true} />
      <ThreeItemGridItem size="half" item={products[1]} priority={true} />
      {products.length > 2 && (
        <ThreeItemGridItem size="half" item={products[2]} />
      )}
    </section>
  );
}
