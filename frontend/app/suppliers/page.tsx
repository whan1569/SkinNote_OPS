"use client";

import { useEffect, useMemo, useState } from "react";
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
  companyCode: "",
  supplierName: "",
  managerName: "",
  phone: "",
  status: "전체",
};

export default function SuppliersPage() {
  const [filter, setFilter] = useState<SupplierFilterType>(initialFilter);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<SupplierDrawerMode>("create");
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(
    null,
  );

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getSuppliers();
        setSuppliers(data);
      } catch (error) {
        console.error(error);
        setError("공급처 목록을 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchSuppliers();
  }, []);

  const filteredSuppliers = useMemo(() => {
    return suppliers.filter((supplier) => {
      const matchCompanyCode = supplier.companyCode
        .toLowerCase()
        .includes(filter.companyCode.toLowerCase());

      const matchSupplierName = supplier.supplierName
        .toLowerCase()
        .includes(filter.supplierName.toLowerCase());

      const matchManagerName = supplier.managerName
        .toLowerCase()
        .includes(filter.managerName.toLowerCase());

      const matchPhone = supplier.phone.includes(filter.phone);

      const matchStatus =
        filter.status === "전체" || supplier.status === filter.status;

      return (
        matchCompanyCode &&
        matchSupplierName &&
        matchManagerName &&
        matchPhone &&
        matchStatus
      );
    });
  }, [suppliers, filter]);

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
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              공급처 목록
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              등록된 공급처 정보를 조회하고 관리할 수 있습니다.
            </p>
          </div>

          <div className="flex gap-2">
            <button className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">
              <Download size={16} />
              엑셀 다운로드
            </button>

            <button className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">
              <Filter size={16} />
              필터
            </button>

            <button
              onClick={openCreateDrawer}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              <Plus size={16} />
              공급처 등록
            </button>
          </div>
        </div>

        <SupplierFilter
          filter={filter}
          onChange={setFilter}
          onReset={() => setFilter(initialFilter)}
        />

        {loading && (
          <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
            공급처 목록을 불러오는 중입니다.
          </div>
        )}

        {!loading && error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center text-sm text-red-600">
            {error}
          </div>
        )}

        {!loading && !error && (
          <SupplierTable
            suppliers={filteredSuppliers}
            onEdit={openEditDrawer}
          />
        )}
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
