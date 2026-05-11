export type PlatformPricePlatform =
  | "전체"
  | "네이버 스마트스토어"
  | "쿠팡"
  | "지마켓"
  | "옥션"
  | "11번가"
  | "티몬"
  | "위메프"
  | "카카오톡 스토어"
  | "네이버 쇼핑"
  | "오늘의집";

export type PlatformPricePlatformName = Exclude<
  PlatformPricePlatform,
  "전체"
>;

export type PlatformIconCode =
  | "N"
  | "C"
  | "G"
  | "A"
  | "11"
  | "T"
  | "W"
  | "K"
  | "O";

export type PlatformSaleStatus =
  | "전체"
  | "판매중"
  | "일시중지"
  | "판매중지";

export type PlatformActiveSaleStatus = Exclude<
  PlatformSaleStatus,
  "전체"
>;

export type PlatformPriceStatus = "전체" | "사용중" | "종료";

export type PlatformPrice = {
  id: number;
  productName: string;
  sku: string;
  platform: PlatformPricePlatformName;
  platformIcon: PlatformIconCode;
  sellingPrice: number;
  discountedPrice: number | null;
  discountRate: number | null;
  discountStartDate: string | null;
  discountEndDate: string | null;
  status: PlatformActiveSaleStatus;
  updatedAt: string;
};

export type PlatformPriceFilter = {
  keyword: string;
  platform: PlatformPricePlatform;
  saleStatus: PlatformSaleStatus;
  priceStatus: PlatformPriceStatus;
};

export type PlatformPriceDrawerMode = "create" | "edit";
