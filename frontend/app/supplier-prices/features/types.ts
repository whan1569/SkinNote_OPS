export type SupplierPriceStatus = "전체" | "사용중" | "종료";

export type SupplierPriceActiveStatus = Exclude<
  SupplierPriceStatus,
  "전체"
>;

export type SupplierPrice = {
  id: number;
  productName: string;
  sku: string;
  supplierName: string;
  supplyPrice: number;
  moq: number;
  leadTime: string;
  startDate: string;
  endDate: string | null;
  status: SupplierPriceActiveStatus;
  updatedAt: string;
};

export type SupplierPriceFilter = {
  keyword: string;
  supplierName: string;
  status: SupplierPriceStatus;
};

export type SupplierPriceDrawerMode = "create" | "edit";