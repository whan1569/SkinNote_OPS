import { platformPrices } from "./mock";
import type { PlatformPriceFilter } from "./types";

export const getPlatformPrices = (filter: PlatformPriceFilter) => {
  return platformPrices.filter((item) => {
    const matchKeyword =
      item.productName
        .toLowerCase()
        .includes(filter.keyword.toLowerCase()) ||
      item.sku.toLowerCase().includes(filter.keyword.toLowerCase());

    const matchPlatform =
      filter.platform === "전체" || item.platform === filter.platform;

    const matchSaleStatus =
      filter.saleStatus === "전체" || item.status === filter.saleStatus;

    return matchKeyword && matchPlatform && matchSaleStatus;
  });
};
