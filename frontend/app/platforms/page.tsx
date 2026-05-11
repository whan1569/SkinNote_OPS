"use client";

import { useMemo, useState } from "react";
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
  const [filter, setFilter] =
    useState<PlatformFilterType>(initialFilter);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [drawerMode, setDrawerMode] =
    useState<PlatformDrawerMode>("create");

  const [selectedPlatform, setSelectedPlatform] =
    useState<Platform | null>(null);

  const filteredPlatforms = useMemo(() => {
    return getPlatforms(filter);
  }, [filter]);

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
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              플랫폼 관리
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              판매 채널 및 플랫폼 운영 정보를 관리할 수 있습니다.
            </p>
          </div>

          <div className="flex gap-3">
            <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm">
              <Download size={16} />
              엑셀 다운로드
            </button>

            <button
              onClick={openCreateDrawer}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white shadow-sm"
            >
              <Plus size={18} />
              플랫폼 등록
            </button>
          </div>
        </div>

        <PlatformFilter
          filter={filter}
          onChange={setFilter}
          onReset={() => setFilter(initialFilter)}
        />

        <PlatformTable
          platforms={filteredPlatforms}
          onEdit={openEditDrawer}
        />
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
