// import { getCollectionProducts } from 'lib/shopware';
// import { isSeoUrls } from 'lib/shopware/helpers';
import Link from "next/link";
import { GridTileImage } from "./Tile";
import { useFetchProducts } from "@/hooks/use-products";
import { formatPrice } from "@/lib/utils";
// import { GridTileImage } from './grid/tile';

export function Carousel() {
  const { products } = useFetchProducts();

  return (
    <div className=" w-full overflow-x-auto pb-6 pt-1">
      <ul className="flex animate-carousel gap-4">
        {products.map((product, i) => (
          <li
            key={`${product?._id}${i}`}
            className="relative aspect-square h-[30vh] max-h-[275px] w-2/3 max-w-[475px] flex-none md:w-1/3"
          >
            <Link
              href={`/product/${product?._id}`}
              className="relative h-full w-full"
            >
              <GridTileImage
                alt={product?.name}
                label={{
                  title: product?.name,
                  amount: formatPrice(product?.price),
                  //   currencyCode: product.priceRange.maxVariantPrice.currencyCode,
                }}
                src={product?.imageUrls[0]?.url}
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
