import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { ProductTable } from "@/components/ProductTable";
import React from "react";

const Products = () => {
  return (
    <MaxWidthWrapper>
      <h1>Products</h1>
      <p>Here are all the products</p>
      <ProductTable />
    </MaxWidthWrapper>
  );
};

export default Products;
