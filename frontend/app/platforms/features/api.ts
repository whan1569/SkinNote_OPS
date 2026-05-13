import { apiClient } from "../../../lib/apiClient";
import type { Platform } from "./types";

type PlatformResponse = {
  platform_code: string;
  platform_name: string;
  type: string | null;
  commission_rate: number | null;
  status: string;
  created_at: string;
  updated_at: string;
};

const mapPlatformResponse = (platform: PlatformResponse): Platform => {
  return {
    id: Number(platform.platform_code.replace("PLT-", "")),
    platformCode: platform.platform_code,
    platformName: platform.platform_name,
    type: platform.type ?? "오픈마켓",
    integrationType: "미연동",
    managerName: "-",
    managerPhone: "-",
    settlementCycle: "-",
    commissionRate: platform.commission_rate ?? 0,
    status: platform.status === "비활성" ? "비활성" : "사용중",
    createdAt: platform.created_at.slice(0, 10),
    updatedAt: platform.updated_at.slice(0, 10),
  };
};

export const getPlatforms = async (): Promise<Platform[]> => {
  const response = await apiClient.get<PlatformResponse[]>("/platforms");

  return response.data.map(mapPlatformResponse);
};
