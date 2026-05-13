export type PlatformPricePlatform = string;

export type PlatformSaleStatus = "전체" | "판매중" | "일시중지" | "판매중지";
export type PlatformActiveSaleStatus = Exclude<PlatformSaleStatus, "전체">;

export type PlatformPriceStatus = "전체" | "사용중" | "종료";

export type PlatformIconCode = "N" | "C" | "G" | "A" | "11" | "T" | "W" | "K" | "O";

export type PlatformPrice = {
  id: number;
  platformPriceCode: string;
  productCode: string;
  productName: string;
  sku: string;
  platformCode: string;
  platform: string;
  platformIcon: PlatformIconCode;
  sellingPrice: number;
  discountedPrice: number | null;
  discountRate: number | null;
  discountStartDate: string | null;
  discountEndDate: string | null;
  status: PlatformActiveSaleStatus;
  priceStatus: Exclude<PlatformPriceStatus, "전체">;
  updatedAt: string;
};

export type PlatformPriceFilter = {
  keyword: string;
  platform: PlatformPricePlatform;
  saleStatus: PlatformSaleStatus;
  priceStatus: PlatformPriceStatus;
};

export type PlatformPriceDrawerMode = "create" | "edit";
