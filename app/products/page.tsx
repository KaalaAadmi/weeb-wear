"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductReel from "@/components/ProductReel";
import { PRODUCT_CATEGORIES } from "@/config";
import { ProductType } from "@/lib/types";
import { useEffect, useState } from "react";

type Param = string | string[] | undefined;

interface ProductsPageProps {
  searchParams: { [key: string]: Param };
}

const parse = (param: Param) => {
  return typeof param === "string" ? param : undefined;
};

const ProductsPage = () => {
  //{ searchParams }: ProductsPageProps) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  //   const sort = parse(searchParams.sort);
  //   const category = parse(searchParams.category);

  //   const label = PRODUCT_CATEGORIES.find(
  //     ({ value }) => value === category
  //   )?.label;
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/product/all` //?category=${category}&sort=${sort}`
      );
      const data = await response.json();
      if (response.ok) {
        setProducts(data.products);
      }
    };
    fetchProducts();
  }, []);
  return (
    <MaxWidthWrapper>
      <ProductReel title={"Browse high-quality products"} products={products} />
    </MaxWidthWrapper>
  );
};

export default ProductsPage;
