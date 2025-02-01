import { Product } from "@/payload-types";
import { fetchDocs } from "../../(api)/fetchDocs";
import { fetchDoc } from "../../(api)/fetchDoc";

export const fetchSearchProducts = async ({
  searchValue,
  category,
}: {
  searchValue: string;
  category: string;
}) => {
  let products: Product[] = [];
  if (searchValue === "" && category === "") {
    const productsArray = await fetchDocs<Product[]>("search_products");
    products = productsArray.flat();
  } else if (category !== "" && searchValue === "") {
    console.log("Categoty Here: ", category);
    products = await fetchDoc<Product[]>({
      collection: "category_products",
      id: category,
    });
    // products = productsArray.flat()
  } else if (searchValue !== "" && category === "") {
    products = await fetchDoc<Product[]>({
      collection: "searchValue_products",
      id: searchValue,
      // slug: category,
    });
  } else if (category !== "" && searchValue !== "") {
    products = await fetchDoc<Product[]>({
      collection: "searchValue_category_products",
      id: searchValue,
      slug: category,
    });
  } else {
    products = [];
  }
  return products;
};
