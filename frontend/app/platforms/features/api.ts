import { platforms } from "./mock";
import type { PlatformFilter } from "./types";

export const getPlatforms = (filter: PlatformFilter) => {
  return platforms.filter((platform) => {
    const matchKeyword =
      platform.platformName
        .toLowerCase()
        .includes(filter.keyword.toLowerCase()) ||
      platform.platformCode
        .toLowerCase()
        .includes(filter.keyword.toLowerCase());

    const matchType =
      filter.type === "전체" || platform.type === filter.type;

    const matchIntegrationType =
      filter.integrationType === "전체" ||
      platform.integrationType === filter.integrationType;

    const matchStatus =
      filter.status === "전체" || platform.status === filter.status;

    return (
      matchKeyword &&
      matchType &&
      matchIntegrationType &&
      matchStatus
    );
  });
};
