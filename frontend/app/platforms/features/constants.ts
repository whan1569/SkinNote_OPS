import type {
  IntegrationType,
  PlatformActiveStatus,
  PlatformActiveType,
  PlatformStatus,
  PlatformType,
} from "./types";

export const PLATFORM_STATUSES: PlatformStatus[] = ["전체", "사용중", "비활성"];

export const PLATFORM_ACTIVE_STATUSES: PlatformActiveStatus[] = [
  "사용중",
  "비활성",
];

export const PLATFORM_TYPES: PlatformType[] = [
  "전체",
  "오픈마켓",
  "종합몰",
  "자사몰",
  "오프라인",
];

export const PLATFORM_ACTIVE_TYPES: PlatformActiveType[] = [
  "오픈마켓",
  "종합몰",
  "자사몰",
  "오프라인",
];

export const INTEGRATION_TYPES: IntegrationType[] = [
  "전체",
  "API",
  "수동",
  "CSV",
  "미연동",
];

export const ACTIVE_INTEGRATION_TYPES: Exclude<IntegrationType, "전체">[] = [
  "API",
  "수동",
  "CSV",
  "미연동",
];

export const STATUS_COLORS: Record<PlatformActiveStatus, string> = {
  사용중: "bg-green-50 text-green-700",
  비활성: "bg-red-50 text-red-700",
};

export const TYPE_COLORS: Record<PlatformActiveType, string> = {
  오픈마켓: "bg-blue-50 text-blue-700",
  종합몰: "bg-purple-50 text-purple-700",
  자사몰: "bg-teal-50 text-teal-700",
  오프라인: "bg-orange-50 text-orange-700",
};
