import type { Product } from "./types";
import { PRODUCT_CATEGORIES } from "./constants";

export const products: Product[] = [
  {
    id: 1,
    productName: "선별락 앰플 100ml",
    sku: "COS-CT-100",
    category: "스킨케어",
    createdAt: "2025-05-23",
  },
  {
    id: 2,
    productName: "나이아신아마이드 토너 200ml",
    sku: "COS-NI-200",
    category: "스킨케어",
    createdAt: "2025-05-22",
  },
  {
    id: 3,
    productName: "히알루론산 크림 100ml",
    sku: "COS-HA-100",
    category: "스킨케어",
    createdAt: "2025-05-21",
  },
  {
    id: 4,
    productName: "비타민C 세럼 30ml",
    sku: "COS-VC-030",
    category: "스킨케어",
    createdAt: "2025-05-20",
  },
  {
    id: 5,
    productName: "콜라겐 폼 150ml",
    sku: "COS-CF-150",
    category: "클렌징",
    createdAt: "2025-05-19",
  },
  {
    id: 6,
    productName: "선크림 SPF50+ 50ml",
    sku: "COS-SC-050",
    category: "선케어",
    createdAt: "2025-05-18",
  },
  {
    id: 7,
    productName: "수딩 젤 300ml",
    sku: "COS-SG-300",
    category: "기타",
    createdAt: "2025-05-17",
  },
  {
    id: 8,
    productName: "마스크팩 10매",
    sku: "COS-MP-010",
    category: "마스크팩",
    createdAt: "2025-05-16",
  },
];

export const productCategories = PRODUCT_CATEGORIES;
