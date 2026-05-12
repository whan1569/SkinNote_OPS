import type {
    OriginCountry,
    ProductActiveCategory,
    ProductCategory,
  } from "./types";
  
  export const PRODUCT_CATEGORIES: ProductCategory[] = [
    "전체",
    "스킨케어",
    "클렌징",
    "선케어",
    "마스크팩",
    "기타",
  ];
  
  export const PRODUCT_ACTIVE_CATEGORIES: ProductActiveCategory[] = [
    "스킨케어",
    "클렌징",
    "선케어",
    "마스크팩",
    "기타",
  ];
  
  export const ORIGIN_COUNTRIES: OriginCountry[] = [
    "대한민국",
    "일본",
    "중국",
    "미국",
  ];
  
  export const CATEGORY_COLORS: Record<ProductActiveCategory, string> = {
    스킨케어: "bg-blue-50 text-blue-700",
    클렌징: "bg-teal-50 text-teal-700",
    선케어: "bg-orange-50 text-orange-700",
    마스크팩: "bg-purple-50 text-purple-700",
    기타: "bg-cyan-50 text-cyan-700",
  };
