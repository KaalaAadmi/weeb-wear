"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Grid from "@/components/grid";
import ProductGridItems from "@/components/product/product-grid-items";
import FilterList from "@/components/search/filter";
import { menu } from "../../../../../test-data";
import { defaultSort, sorting } from "@/lib/constants";
import { fetchSearchProducts } from "./actions";
import { Product } from "@/payload-types";
import Link from "next/link";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
// import Loading from "./loading";

// export const dynamic = "force-dynamic";

const SearchPage = () => {
  return (
    <Suspense>
      <SearchPageContent />
    </Suspense>
  );
};

const SearchPageContent = () => {
  return (
    <Suspense>
      <SearchPageContentInner />
    </Suspense>
  );
};

const SearchPageContentInner = () => {
  const searchParams = useSearchParams();
  const sort = searchParams?.get("sort") || "";
  const category = searchParams?.get("category") || "";
  const searchValue = searchParams?.get("q") || "";

  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;

  return (
    <Suspense>
      <SearchContent
        searchValue={searchValue}
        category={category}
        sortKey={sortKey}
        reverse={reverse}
      />
    </Suspense>
  );
};

function SearchContent({
  searchValue,
  category,
  sortKey,
  reverse,
}: {
  searchValue: string;
  category: string;
  sortKey: string;
  reverse: boolean;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const fetchedProducts = await fetchSearchProducts({
        searchValue,
        category,
      });
      setProducts(fetchedProducts);
      setLoading(false);
    };

    fetchProducts();
  }, [searchValue, category, sortKey, reverse]);

  const resultsText = products?.length > 1 ? "results" : "result";

  return (
    <div>
      {loading ? (
        <div className="flex flex-1 w-full justify-center items-center">
          <ArrowPathIcon className="animate-spin h-5 w-5 text-black dark:text-white" />
        </div>
      ) : (
        // <Loading />
        <div>
          {searchValue && products?.length === 0 ? (
            <div className="mx-auto flex max-w-screen-2xl flex-col gap-8 px-4 pb-4 text-black md:flex-row dark:text-white">
              <p className="mb-4">
                {"There are no products that match "}
                <span className="font-bold">&quot;{searchValue}&quot;</span>
              </p>
            </div>
          ) : null}
          {products?.length > 0 && (
            <div className="mx-auto flex max-w-screen-2xl flex-col gap-8 px-4 pb-4 text-black md:flex-row dark:text-white">
              <div className="order-first w-full flex-none md:max-w-[125px]">
                <p className="pt-4 text-xs text-neutral-500">
                  <p className="hidden text-xs text-neutral-500 md:block dark:text-neutral-400">
                    Collections
                  </p>
                  <ul className="hidden md:block">
                    {menu.map((item) => (
                      <li
                        key={item.title}
                        className="mt-2 flex text-black dark:text-white"
                      >
                        <Link
                          href={`/search?category=${item.category}`}
                          prefetch={true}
                          className="w-full text-sm underline-offset-4 hover:underline dark:hover:text-neutral-100"
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </p>
              </div>
              <div className="order-last min-h-screen w-full md:order-none">
                {searchValue ? (
                  <p className="mb-4 text-sm text-neutral-500">
                    {`Showing ${products.length} ${resultsText} for `}
                    <span className="font-bold">&quot;{searchValue}&quot;</span>
                  </p>
                ) : null}
                <Grid className="grid-cols-2 lg:grid-cols-3">
                  <ProductGridItems products={products} />
                </Grid>
              </div>
              <div className="order-none flex-none md:order-last md:w-[125px]">
                <Suspense>
                  <FilterList list={sorting} title="Sort by" />
                </Suspense>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchPage;
