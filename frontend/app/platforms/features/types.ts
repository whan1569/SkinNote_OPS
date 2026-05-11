export type PlatformStatus = "전체" | "사용중" | "비활성";

export type PlatformActiveStatus = Exclude<PlatformStatus, "전체">;

export type PlatformType =
  | "전체"
  | "오픈마켓"
  | "종합몰"
  | "자사몰"
  | "오프라인";

export type PlatformActiveType = Exclude<PlatformType, "전체">;

export type IntegrationType =
  | "전체"
  | "API"
  | "수동"
  | "CSV"
  | "미연동";

export type Platform = {
  id: number;
  platformName: string;
  platformCode: string;
  type: PlatformActiveType;
  integrationType: Exclude<IntegrationType, "전체">;
  managerName: string;
  managerPhone: string;
  settlementCycle: string;
  commissionRate: number;
  status: PlatformActiveStatus;
  createdAt: string;
  updatedAt: string;
};

export type PlatformFilter = {
  keyword: string;
  type: PlatformType;
  integrationType: IntegrationType;
  status: PlatformStatus;
};

export type PlatformDrawerMode = "create" | "edit";
