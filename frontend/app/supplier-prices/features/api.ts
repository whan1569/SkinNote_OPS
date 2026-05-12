import { supplierPrices } from "./mock";
import type { SupplierPriceFilter } from "./types";

export const getSupplierPrices = (filter: SupplierPriceFilter) => {
  return supplierPrices.filter((item) => {
    const matchKeyword =
      item.productName
        .toLowerCase()
        .includes(filter.keyword.toLowerCase()) ||
      item.sku.toLowerCase().includes(filter.keyword.toLowerCase());

    const matchSupplier =
      filter.supplierName === "전체" ||
      item.supplierName === filter.supplierName;

    const matchStatus =
      filter.status === "전체" || item.status === filter.status;

    return matchKeyword && matchSupplier && matchStatus;
  });
};