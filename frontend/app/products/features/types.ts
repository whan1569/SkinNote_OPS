export type ProductCategory =
  | "전체"
  | "스킨케어"
  | "클렌징"
  | "선케어"
  | "마스크팩"
  | "기타";

export type ProductActiveCategory = Exclude<ProductCategory, "전체">;

export type OriginCountry =
  | "대한민국"
  | "일본"
  | "중국"
  | "미국";

export type Product = {
  id: number;
  productName: string;
  sku: string;
  category: ProductActiveCategory;
  brandName: string;
  createdAt: string;
};

export type ProductFilter = {
  productName: string;
  sku: string;
  category: ProductCategory;
};

export type ProductDrawerMode = "create" | "edit";
