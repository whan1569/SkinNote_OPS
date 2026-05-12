import { products } from "./mock";
import type { ProductFilter } from "./types";

export const getProducts = (filter: ProductFilter) => {
  return products.filter((product) => {
    return (
      product.productName
        .toLowerCase()
        .includes(filter.productName.toLowerCase()) &&
      product.sku.toLowerCase().includes(filter.sku.toLowerCase()) &&
      (filter.category === "전체" ||
        product.category === filter.category)
    );
  });
};
