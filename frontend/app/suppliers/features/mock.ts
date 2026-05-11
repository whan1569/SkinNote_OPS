import type { Supplier } from "./types";
import {
  PAYMENT_TERMS,
  SUPPLIER_STATUSES,
} from "./constants";

export const suppliers: Supplier[] = [
  {
    id: 1,
    supplierName: "한국코스메틱",
    managerName: "김민수",
    phone: "010-1234-5678",
    email: "kim@koreacosmetic.kr",
    paymentTerm: "월말 30일",
    status: "사용중",
    createdAt: "2025-03-15",
  },
  {
    id: 2,
    supplierName: "뷰티무역",
    managerName: "이서연",
    phone: "010-2345-6789",
    email: "lee@beautytrade.co.kr",
    paymentTerm: "월말 30일",
    status: "사용중",
    createdAt: "2025-03-18",
  },
  {
    id: 3,
    supplierName: "글로벌케어",
    managerName: "박지훈",
    phone: "010-3456-7890",
    email: "park@globalcare.co.kr",
    paymentTerm: "선금 50%",
    status: "사용중",
    createdAt: "2025-03-20",
  },
  {
    id: 4,
    supplierName: "서울뷰티",
    managerName: "최유진",
    phone: "010-4567-8901",
    email: "choi@seoulbeauty.kr",
    paymentTerm: "월말 30일",
    status: "사용중",
    createdAt: "2025-03-22",
  },
  {
    id: 5,
    supplierName: "코스월드",
    managerName: "정태민",
    phone: "010-5678-9012",
    email: "jung@cosworld.co.kr",
    paymentTerm: "선금 30%",
    status: "사용중",
    createdAt: "2025-03-25",
  },
  {
    id: 6,
    supplierName: "케이엔에스",
    managerName: "오세훈",
    phone: "010-7890-1234",
    email: "oh@kns.co.kr",
    paymentTerm: "월말 30일",
    status: "비활성",
    createdAt: "2024-12-10",
  },
];

export const supplierStatuses = SUPPLIER_STATUSES;
export const paymentTerms = PAYMENT_TERMS;
