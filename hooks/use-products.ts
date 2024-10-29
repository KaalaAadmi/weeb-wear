// use-products.ts
import { useState, useEffect } from "react";
import axios from "axios";
import { ProductType } from "@/lib/types";

export function useFetchProducts(
  category: string,
  filters: any,
  sortOption: string
) {
  console.log("useFetchProducts -> category", category);
  console.log("useFetchProducts -> filters", filters);
  console.log("useFetchProducts -> sortOption", sortOption);

  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_URL}/api/product/all`,
          {
            params: { category, filters, sort: sortOption },
          }
        );
        setProducts(response.data.products);
        console.log(
          "useFetchProducts -> response.data.products",
          response.data.products
        );
      } catch (err) {
        setError("Error fetching products.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category, filters, sortOption]);

  return { products, loading, error };
}
