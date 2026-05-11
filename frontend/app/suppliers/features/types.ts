export type SupplierStatus = "전체" | "사용중" | "비활성";

export type SupplierActiveStatus = Exclude<SupplierStatus, "전체">;

export type Supplier = {
  id: number;
  supplierName: string;
  managerName: string;
  phone: string;
  email: string;
  paymentTerm: string;
  status: SupplierActiveStatus;
  createdAt: string;
};

export type SupplierFilter = {
  supplierName: string;
  managerName: string;
  phone: string;
  status: SupplierStatus;
};

export type SupplierDrawerMode = "create" | "edit";
