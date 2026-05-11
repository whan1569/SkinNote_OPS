import { suppliers } from "./mock";
import type { SupplierFilter } from "./types";

export const getSuppliers = (filter: SupplierFilter) => {
  return suppliers.filter((supplier) => {
    return (
      supplier.supplierName
        .toLowerCase()
        .includes(filter.supplierName.toLowerCase()) &&
      supplier.managerName
        .toLowerCase()
        .includes(filter.managerName.toLowerCase()) &&
      supplier.phone.includes(filter.phone) &&
      (filter.status === "전체" || supplier.status === filter.status)
    );
  });
};
