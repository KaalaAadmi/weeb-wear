// import { getCollectionProducts } from "lib/shopify";
import Link from "next/link";
import { GridTileImage } from "./grid/tile";
// import { home_products } from "../../test-data";
import { fetchDocs } from "@/app/(frontend)/(api)/fetchDocs";
import { Product } from "@/payload-types";

export async function Carousel() {
  // Collections that start with `hidden-*` are hidden from the search page.
  //   const products = await getCollectionProducts({
  //     collection: "hidden-homepage-carousel",
  //   });
  // const products = home_products;
  const productsArray = await fetchDocs<Product[]>("featured_products");
  const products = productsArray.flat();
  if (!products?.length) return null;

  // Purposefully duplicating products to make the carousel loop and not run out of products on wide screens.
  const carouselProducts = [...products, ...products, ...products];

  return (
    <div className="w-full overflow-x-auto pb-6 pt-1">
      <ul className="flex animate-carousel gap-4">
        {carouselProducts.map((product, i) => (
          <li
            key={`${product.id}${i}`}
            className="relative aspect-square h-[30vh] max-h-[275px] w-2/3 max-w-[475px] flex-none md:w-1/3"
          >
            <Link
              href={`/product/${product.id}`}
              className="relative h-full w-full"
            >
              <GridTileImage
                alt={product.name}
                label={{
                  title: product.name,
                  amount: product.price.toString(),
                  //   currencyCode: product.priceRange.maxVariantPrice.currencyCode,
                }}
                src={
                  typeof product?.images?.[0]?.image === "object" &&
                  product.images[0].image.cloudinaryUrl
                    ? product.images[0].image.cloudinaryUrl
                    : ""
                }
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
