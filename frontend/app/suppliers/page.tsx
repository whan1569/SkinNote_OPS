"use client";

import { useMemo, useState } from "react";
import { Download, Filter, Plus } from "lucide-react";

import { SupplierDrawer } from "./components/SupplierDrawer";
import { SupplierFilter } from "./components/SupplierFilter";
import { SupplierTable } from "./components/SupplierTable";
import { getSuppliers } from "./features/api";
import type {
  Supplier,
  SupplierDrawerMode,
  SupplierFilter as SupplierFilterType,
} from "./features/types";

const initialFilter: SupplierFilterType = {
  supplierName: "",
  managerName: "",
  phone: "",
  status: "전체",
};

export default function SuppliersPage() {
  const [filter, setFilter] =
    useState<SupplierFilterType>(initialFilter);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] =
    useState<SupplierDrawerMode>("create");
  const [selectedSupplier, setSelectedSupplier] =
    useState<Supplier | null>(null);

  const filteredSuppliers = useMemo(() => {
    return getSuppliers(filter);
  }, [filter]);

  const openCreateDrawer = () => {
    setDrawerMode("create");
    setSelectedSupplier(null);
    setDrawerOpen(true);
  };

  const openEditDrawer = (supplier: Supplier) => {
    setDrawerMode("edit");
    setSelectedSupplier(supplier);
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
              공급처 목록
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              등록된 공급처 정보를 조회하고 관리할 수 있습니다.
            </p>
          </div>

          <div className="flex gap-3">
            <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm">
              <Download size={16} />
              엑셀 다운로드
            </button>

            <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm">
              <Filter size={16} />
              필터
            </button>

            <button
              onClick={openCreateDrawer}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white shadow-sm"
            >
              <Plus size={18} />
              공급처 등록
            </button>
          </div>
        </div>

        <SupplierFilter
          filter={filter}
          onChange={setFilter}
          onReset={() => setFilter(initialFilter)}
        />

        <SupplierTable
          suppliers={filteredSuppliers}
          onEdit={openEditDrawer}
        />
      </div>

      <SupplierDrawer
        open={drawerOpen}
        mode={drawerMode}
        supplier={selectedSupplier}
        onClose={closeDrawer}
      />
    </>
  );
}
