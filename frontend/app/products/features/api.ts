import { apiClient } from "../../../lib/apiClient";
import type { Product } from "./types";

type ProductResponse = {
  product_code: string;
  product_name: string;
  sku: string | null;
  category: string | null;
  brand_name?: string | null;
  created_at: string;
  updated_at?: string;
};

const mapProductResponse = (product: ProductResponse): Product => {
  return {
    id: Number(product.product_code.replace("PRD-", "")),
    productName: product.product_name,
    sku: product.sku ?? "-",
    category:
      product.category === "클렌징" ||
      product.category === "선케어" ||
      product.category === "마스크팩" ||
      product.category === "기타"
        ? product.category
        : "스킨케어",
    brandName: product.brand_name ?? "-",
    createdAt: product.created_at.slice(0, 10),
  };
};

export const getProducts = async (): Promise<Product[]> => {
  const response = await apiClient.get<ProductResponse[]>("/products");

  return response.data.map(mapProductResponse);
};
