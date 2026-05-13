import { apiClient } from "../../../lib/apiClient";
import type { PlatformPrice } from "./types";

type PlatformPriceResponse = {
  platform_price_code: string;
  product_code: string;
  platform_code: string;
  selling_price: number;
  discount_rate: number | null;
  start_date: string | null;
  end_date: string | null;
  sale_status: string;
  created_at: string;
  updated_at: string;
};

const getPlatformIcon = (platformCode: string) => {
  if (platformCode.includes("000001")) return "N";
  if (platformCode.includes("000002")) return "C";
  if (platformCode.includes("000003")) return "G";
  if (platformCode.includes("000004")) return "A";
  if (platformCode.includes("000005")) return "11";
  return "O";
};

const calculateDiscountedPrice = (
  sellingPrice: number,
  discountRate: number | null,
) => {
  if (!discountRate) return null;

  return Math.floor(sellingPrice * (1 - discountRate / 100));
};

const mapPlatformPriceResponse = (
  item: PlatformPriceResponse,
): PlatformPrice => {
  return {
    id: Number(item.platform_price_code.replace("PPR-", "")),
    platformPriceCode: item.platform_price_code,
    productCode: item.product_code,
    productName: item.product_code,
    sku: item.product_code,
    platformCode: item.platform_code,
    platform: item.platform_code,
    platformIcon: getPlatformIcon(item.platform_code),
    sellingPrice: item.selling_price,
    discountedPrice: calculateDiscountedPrice(
      item.selling_price,
      item.discount_rate,
    ),
    discountRate: item.discount_rate,
    discountStartDate: item.start_date,
    discountEndDate: item.end_date,
    status:
      item.sale_status === "일시중지" || item.sale_status === "판매중지"
        ? item.sale_status
        : "판매중",
    priceStatus: item.end_date ? "종료" : "사용중",
    updatedAt: item.updated_at.slice(0, 10),
  };
};

export const getPlatformPrices = async (): Promise<PlatformPrice[]> => {
  const response =
    await apiClient.get<PlatformPriceResponse[]>("/platform-prices");

  return response.data.map(mapPlatformPriceResponse);
};
