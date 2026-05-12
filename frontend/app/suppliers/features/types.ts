export type SupplierStatus = "전체" | "사용중" | "비활성";

export type SupplierActiveStatus = Exclude<SupplierStatus, "전체">;

export type Supplier = {
  id: number;
  companyCode: string;
  supplierName: string;
  managerName: string;
  phone: string;
  email: string;
  advancePaymentRate: number;
  settlementDay: number;
  status: SupplierActiveStatus;
  createdAt: string;
};

export type SupplierFilter = {
  companyCode: string;
  supplierName: string;
  managerName: string;
  phone: string;
  status: SupplierStatus;
};

export type SupplierDrawerMode = "create" | "edit";
