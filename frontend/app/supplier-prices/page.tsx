"use client";

import { useMemo, useState } from "react";
import { Download, Plus } from "lucide-react";

import { SupplierPriceDrawer } from "./components/SupplierPriceDrawer";
import { SupplierPriceFilter } from "./components/SupplierPriceFilter";
import { SupplierPriceTable } from "./components/SupplierPriceTable";
import { getSupplierPrices } from "./features/api";
import type {
  SupplierPrice,
  SupplierPriceDrawerMode,
  SupplierPriceFilter as SupplierPriceFilterType,
} from "./features/types";

const initialFilter: SupplierPriceFilterType = {
  keyword: "",
  supplierName: "전체",
  status: "전체",
};

export default function SupplierPricesPage() {
  const [filter, setFilter] =
    useState<SupplierPriceFilterType>(initialFilter);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] =
    useState<SupplierPriceDrawerMode>("create");
  const [selectedItem, setSelectedItem] =
    useState<SupplierPrice | null>(null);

  const filteredItems = useMemo(() => {
    return getSupplierPrices(filter);
  }, [filter]);

  const openCreateDrawer = () => {
    setDrawerMode("create");
    setSelectedItem(null);
    setDrawerOpen(true);
  };

  const openEditDrawer = (item: SupplierPrice) => {
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
              공급 단가 관리
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              공급처별 상품 단가와 적용 기간을 관리할 수 있습니다.
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
              단가 등록
            </button>
          </div>
        </div>

        <SupplierPriceFilter
          filter={filter}
          onChange={setFilter}
          onReset={() => setFilter(initialFilter)}
        />

        <SupplierPriceTable
          items={filteredItems}
          onEdit={openEditDrawer}
        />
      </div>

      <SupplierPriceDrawer
        open={drawerOpen}
        mode={drawerMode}
        item={selectedItem}
        onClose={closeDrawer}
      />
    </>
  );
}