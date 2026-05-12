import type {
  SupplierPriceActiveStatus,
  SupplierPriceStatus,
} from "./types";

export const SUPPLIER_PRICE_STATUSES: SupplierPriceStatus[] = [
  "전체",
  "사용중",
  "종료",
];

export const SUPPLIER_PRICE_ACTIVE_STATUSES: SupplierPriceActiveStatus[] = [
  "사용중",
  "종료",
];

export const SUPPLIER_OPTIONS = [
  "전체",
  "한국코스메틱",
  "뷰티무역",
  "글로벌케어",
  "서울뷰티",
  "코스월드",
  "케이엔에스",
];

export const STATUS_COLORS: Record<SupplierPriceActiveStatus, string> = {
  사용중: "bg-green-50 text-green-700",
  종료: "bg-slate-100 text-slate-500",
};