"use client";

import { useEffect, useMemo, useState } from "react";
import { Download, Plus } from "lucide-react";

import { PlatformDrawer } from "./components/PlatformDrawer";
import { PlatformFilter } from "./components/PlatformFilter";
import { PlatformTable } from "./components/PlatformTable";
import { getPlatforms } from "./features/api";

import type {
  Platform,
  PlatformDrawerMode,
  PlatformFilter as PlatformFilterType,
} from "./features/types";

const initialFilter: PlatformFilterType = {
  keyword: "",
  type: "전체",
  integrationType: "전체",
  status: "전체",
};

export default function PlatformsPage() {
  const [filter, setFilter] = useState<PlatformFilterType>(initialFilter);
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<PlatformDrawerMode>("create");
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(
    null,
  );

  useEffect(() => {
    const fetchPlatforms = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getPlatforms();
        setPlatforms(data);
      } catch (error) {
        console.error(error);
        setError("플랫폼 목록을 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlatforms();
  }, []);

  const filteredPlatforms = useMemo(() => {
    return platforms.filter((platform) => {
      const keyword = filter.keyword.toLowerCase();

      const matchKeyword =
        platform.platformName.toLowerCase().includes(keyword) ||
        platform.platformCode.toLowerCase().includes(keyword);

      const matchType = filter.type === "전체" || platform.type === filter.type;

      const matchIntegrationType =
        filter.integrationType === "전체" ||
        platform.integrationType === filter.integrationType;

      const matchStatus =
        filter.status === "전체" || platform.status === filter.status;

      return matchKeyword && matchType && matchIntegrationType && matchStatus;
    });
  }, [platforms, filter]);

  const openCreateDrawer = () => {
    setDrawerMode("create");
    setSelectedPlatform(null);
    setDrawerOpen(true);
  };

  const openEditDrawer = (platform: Platform) => {
    setDrawerMode("edit");
    setSelectedPlatform(platform);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              플랫폼 관리
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              판매 채널 및 플랫폼 운영 정보를 관리할 수 있습니다.
            </p>
          </div>

          <div className="flex gap-2">
            <button className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">
              <Download size={16} />
              엑셀 다운로드
            </button>

            <button
              onClick={openCreateDrawer}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              <Plus size={16} />
              플랫폼 등록
            </button>
          </div>
        </div>

        <PlatformFilter
          filter={filter}
          onChange={setFilter}
          onReset={() => setFilter(initialFilter)}
        />

        {loading && (
          <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
            플랫폼 목록을 불러오는 중입니다.
          </div>
        )}

        {!loading && error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center text-sm text-red-600">
            {error}
          </div>
        )}

        {!loading && !error && (
          <PlatformTable
            platforms={filteredPlatforms}
            onEdit={openEditDrawer}
          />
        )}
      </div>

      <PlatformDrawer
        open={drawerOpen}
        mode={drawerMode}
        platform={selectedPlatform}
        onClose={closeDrawer}
      />
    </>
  );
}
