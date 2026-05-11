import type {
    PlatformActiveSaleStatus,
    PlatformIconCode,
    PlatformPricePlatform,
    PlatformPriceStatus,
    PlatformSaleStatus,
  } from "./types";
  
  export const PLATFORM_PRICE_PLATFORMS: PlatformPricePlatform[] = [
    "전체",
    "네이버 스마트스토어",
    "쿠팡",
    "지마켓",
    "옥션",
    "11번가",
    "티몬",
    "위메프",
    "카카오톡 스토어",
    "네이버 쇼핑",
    "오늘의집",
  ];
  
  export const PLATFORM_SALE_STATUSES: PlatformSaleStatus[] = [
    "전체",
    "판매중",
    "일시중지",
    "판매중지",
  ];
  
  export const PLATFORM_PRICE_STATUSES: PlatformPriceStatus[] = [
    "전체",
    "사용중",
    "종료",
  ];
  
  export const PLATFORM_ACTIVE_SALE_STATUSES: PlatformActiveSaleStatus[] = [
    "판매중",
    "일시중지",
    "판매중지",
  ];
  
  export const SALE_STATUS_COLORS: Record<
    PlatformActiveSaleStatus,
    string
  > = {
    판매중: "bg-green-50 text-green-700",
    일시중지: "bg-orange-50 text-orange-700",
    판매중지: "bg-red-50 text-red-700",
  };
  
  export const PLATFORM_ICON_COLORS: Record<PlatformIconCode, string> = {
    N: "bg-green-500",
    C: "bg-red-500",
    G: "bg-green-500",
    A: "bg-red-500",
    "11": "bg-red-500",
    T: "bg-orange-500",
    W: "bg-red-500",
    K: "bg-yellow-400 text-slate-900",
    O: "bg-blue-500",
  };
