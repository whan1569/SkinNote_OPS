import { apiClient } from "../../../lib/apiClient";
import type { Supplier } from "./types";

type SupplierResponse = {
  supplier_code: string;
  supplier_name: string;
  manager_name: string | null;
  phone: string | null;
  email: string | null;
  status: string;
  created_at: string;
  updated_at: string;
};

const mapSupplierResponse = (supplier: SupplierResponse): Supplier => {
  return {
    id: Number(supplier.supplier_code.replace("SUP-", "")),
    companyCode: supplier.supplier_code,
    supplierName: supplier.supplier_name,
    managerName: supplier.manager_name ?? "-",
    phone: supplier.phone ?? "-",
    email: supplier.email ?? "-",
    advancePaymentRate: 0,
    settlementDay: 0,
    status: supplier.status === "비활성" ? "비활성" : "사용중",
    createdAt: supplier.created_at.slice(0, 10),
  };
};

export const getSuppliers = async (): Promise<Supplier[]> => {
  const response = await apiClient.get<SupplierResponse[]>("/suppliers");

  return response.data.map(mapSupplierResponse);
};
