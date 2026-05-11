"use client";

import { useMemo, useState } from "react";
import { Download, Plus } from "lucide-react";

import { PlatformPriceDrawer } from "./components/PlatformPriceDrawer";
import { PlatformPriceFilter } from "./components/PlatformPriceFilter";
import { PlatformPriceTable } from "./components/PlatformPriceTable";

import { getPlatformPrices } from "./features/api";

import type {
  PlatformPrice,
  PlatformPriceDrawerMode,
  PlatformPriceFilter as PlatformPriceFilterType,
} from "./features/types";

const initialFilter: PlatformPriceFilterType = {
  keyword: "",
  platform: "전체",
  saleStatus: "전체",
  priceStatus: "전체",
};

export default function PlatformPricesPage() {
  const [filter, setFilter] =
    useState<PlatformPriceFilterType>(initialFilter);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [drawerMode, setDrawerMode] =
    useState<PlatformPriceDrawerMode>("create");

  const [selectedItem, setSelectedItem] =
    useState<PlatformPrice | null>(null);

  const filteredItems = useMemo(() => {
    return getPlatformPrices(filter);
  }, [filter]);

  const openCreateDrawer = () => {
    setDrawerMode("create");
    setSelectedItem(null);
    setDrawerOpen(true);
  };

  const openEditDrawer = (item: PlatformPrice) => {
    setDrawerMode("edit");
    setSelectedItem(item);
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
              플랫폼 판매가 관리
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              플랫폼별 판매가 및 할인 정책을 관리할 수 있습니다.
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
              판매가 등록
            </button>
          </div>
        </div>

        <PlatformPriceFilter
          filter={filter}
          onChange={setFilter}
          onReset={() => setFilter(initialFilter)}
        />

        <PlatformPriceTable
          items={filteredItems}
          onEdit={openEditDrawer}
        />
      </div>

      <PlatformPriceDrawer
        open={drawerOpen}
        mode={drawerMode}
        item={selectedItem}
        onClose={closeDrawer}
      />
    </>
  );
}
