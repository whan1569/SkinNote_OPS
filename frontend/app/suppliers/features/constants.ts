import type { SupplierActiveStatus, SupplierStatus } from "./types";

export const SUPPLIER_STATUSES: SupplierStatus[] = [
  "전체",
  "사용중",
  "비활성",
];

export const SUPPLIER_ACTIVE_STATUSES: SupplierActiveStatus[] = [
  "사용중",
  "비활성",
];

export const STATUS_COLORS: Record<SupplierActiveStatus, string> = {
  사용중: "bg-green-50 text-green-700",
  비활성: "bg-red-50 text-red-700",
};
