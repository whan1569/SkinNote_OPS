"use client";

import { useMemo, useState } from "react";
import {
  Download,
  Filter,
  Plus,
  Search,
  RotateCcw,
  Pencil,
  MoreHorizontal,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  X,
} from "lucide-react";
import {
  suppliers,
  supplierCategories,
  supplierStatuses,
  paymentTerms,
} from "@/mock/suppliers";

type Supplier = (typeof suppliers)[number];

function StatusBadge({ status }: { status: string }) {
  const color =
    status === "사용중"
      ? "bg-green-50 text-green-700"
      : "bg-red-50 text-red-700";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${color}`}>
      {status}
    </span>
  );
}

function CategoryBadge({ categories }: { categories: string[] }) {
  const first = categories[0];
  const rest = categories.length - 1;

  const color =
    first === "스킨케어"
      ? "bg-blue-50 text-blue-700"
      : first === "클렌징"
      ? "bg-orange-50 text-orange-700"
      : first === "마스크팩"
      ? "bg-purple-50 text-purple-700"
      : first === "선케어"
      ? "bg-orange-50 text-orange-700"
      : "bg-teal-50 text-teal-700";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${color}`}>
      {first} {rest > 0 ? `외 ${rest}개` : ""}
    </span>
  );
}

function SupplierDrawer({
  open,
  mode,
  supplier,
  onClose,
}: {
  open: boolean;
  mode: "create" | "edit";
  supplier: Supplier | null;
  onClose: () => void;
}) {
  if (!open) return null;

  const selectedCategories = supplier?.categories ?? ["스킨케어", "클렌징"];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/20">
      <aside className="flex h-full w-[520px] flex-col bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900">
              공급처 등록/수정
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              공급처 정보를 입력하고 저장하세요.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          <div className="mb-5 flex gap-8 border-b border-slate-200">
            <button className="border-b-2 border-blue-600 px-4 pb-3 text-sm font-bold text-blue-600">
              기본 정보
            </button>
            <button className="px-4 pb-3 text-sm font-bold text-slate-500">
              상세 정보
            </button>
          </div>

          <div className="space-y-5">
            <div>
              <div className="mb-2 flex justify-between">
                <label className="text-sm font-bold text-slate-700">
                  공급처명 <span className="text-red-500">*</span>
                </label>
                <span className="text-xs text-slate-400">
                  {supplier?.supplierName.length ?? 0}/100
                </span>
              </div>
              <input
                defaultValue={supplier?.supplierName ?? ""}
                placeholder="공급처명을 입력하세요"
                className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <div className="mb-2 flex justify-between">
                <label className="text-sm font-bold text-slate-700">
                  담당자명 <span className="text-red-500">*</span>
                </label>
                <span className="text-xs text-slate-400">
                  {supplier?.managerName.length ?? 0}/50
                </span>
              </div>
              <input
                defaultValue={supplier?.managerName ?? ""}
                placeholder="담당자명을 입력하세요"
                className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  연락처 <span className="text-red-500">*</span>
                </label>
                <input
                  defaultValue={supplier?.phone ?? ""}
                  placeholder="010-0000-0000"
                  className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  이메일
                </label>
                <input
                  defaultValue={supplier?.email ?? ""}
                  placeholder="email@example.com"
                  className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                주요 취급 카테고리
              </label>

              <div className="flex min-h-11 items-center justify-between rounded-lg border border-slate-200 px-3">
                <div className="flex flex-wrap gap-2">
                  {selectedCategories.slice(0, 3).map((item) => (
                    <span
                      key={item}
                      className="rounded-md bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600"
                    >
                      × {item}
                    </span>
                  ))}
                </div>
                <ChevronDown size={16} className="text-slate-400" />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                결제 조건 <span className="text-red-500">*</span>
              </label>
              <select
                defaultValue={supplier?.paymentTerm ?? "월말 30일"}
                className="h-11 w-1/2 rounded-lg border border-slate-200 px-4 text-sm outline-none focus:border-blue-500"
              >
                {paymentTerms.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-3 block text-sm font-bold text-slate-700">
                거래 상태 <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-6 text-sm font-semibold text-slate-700">
                {["사용중", "비활성"].map((item) => (
                  <label key={item} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="supplier-status"
                      defaultChecked={(supplier?.status ?? "사용중") === item}
                      className="h-4 w-4"
                    />
                    {item}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-2 flex justify-between">
                <label className="text-sm font-bold text-slate-700">메모</label>
                <span className="text-xs text-slate-400">0/300</span>
              </div>
              <textarea
                placeholder="메모를 입력하세요 (선택)"
                className="h-28 w-full resize-none rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-slate-100 px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-7 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50"
          >
            취소
          </button>

          {mode === "edit" && (
            <button className="rounded-lg border border-red-200 px-7 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50">
              삭제
            </button>
          )}

          <button
            onClick={onClose}
            className="rounded-lg bg-blue-600 px-7 py-2.5 text-sm font-bold text-white hover:bg-blue-700"
          >
            저장
          </button>
        </div>
      </aside>
    </div>
  );
}

export default function SuppliersPage() {
  const [supplierName, setSupplierName] = useState("");
  const [managerName, setManagerName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("전체");

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<"create" | "edit">("create");
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(
    null
  );

  const filteredSuppliers = useMemo(() => {
    return suppliers.filter((supplier) => {
      return (
        supplier.supplierName
          .toLowerCase()
          .includes(supplierName.toLowerCase()) &&
        supplier.managerName
          .toLowerCase()
          .includes(managerName.toLowerCase()) &&
        supplier.phone.includes(phone) &&
        (status === "전체" || supplier.status === status)
      );
    });
  }, [supplierName, managerName, phone, status]);

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

  const resetFilters = () => {
    setSupplierName("");
    setManagerName("");
    setPhone("");
    setStatus("전체");
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

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid grid-cols-[1fr_1fr_1fr_1fr_auto_auto] gap-4">
            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                공급처명
              </label>
              <input
                value={supplierName}
                onChange={(e) => setSupplierName(e.target.value)}
                placeholder="공급처명을 입력하세요"
                className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                담당자
              </label>
              <input
                value={managerName}
                onChange={(e) => setManagerName(e.target.value)}
                placeholder="담당자명을 입력하세요"
                className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                연락처
              </label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="연락처를 입력하세요"
                className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                상태
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none focus:border-blue-500"
              >
                {supplierStatuses.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button className="flex h-11 items-center gap-2 rounded-lg bg-[#071d49] px-6 text-sm font-bold text-white">
                <Search size={16} />
                검색
              </button>
            </div>

            <div className="flex items-end">
              <button
                onClick={resetFilters}
                className="flex h-11 items-center gap-2 rounded-lg border border-slate-200 bg-white px-5 text-sm font-bold text-slate-700"
              >
                <RotateCcw size={16} />
                초기화
              </button>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-bold text-slate-700">
              전체 {filteredSuppliers.length.toLocaleString()}건
            </p>

            <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600">
              20개씩 보기
              <ChevronDown size={16} />
            </button>
          </div>

          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-xs text-slate-500">
              <tr>
                <th className="px-4 py-4 text-left">
                  <input type="checkbox" />
                </th>
                <th className="px-4 py-4 text-center">No.</th>
                <th className="px-4 py-4 text-left">공급처명</th>
                <th className="px-4 py-4 text-left">담당자</th>
                <th className="px-4 py-4 text-left">연락처</th>
                <th className="px-4 py-4 text-left">이메일</th>
                <th className="px-4 py-4 text-left">주요 취급 카테고리</th>
                <th className="px-4 py-4 text-left">결제 조건</th>
                <th className="px-4 py-4 text-center">상태</th>
                <th className="px-4 py-4 text-center">등록일</th>
                <th className="px-4 py-4 text-center">관리</th>
              </tr>
            </thead>

            <tbody>
              {filteredSuppliers.map((supplier) => (
                <tr key={supplier.id} className="border-t border-slate-100">
                  <td className="px-4 py-4">
                    <input type="checkbox" />
                  </td>
                  <td className="px-4 py-4 text-center">{supplier.id}</td>
                  <td className="px-4 py-4 font-bold">
                    {supplier.supplierName}
                  </td>
                  <td className="px-4 py-4">{supplier.managerName}</td>
                  <td className="px-4 py-4">{supplier.phone}</td>
                  <td className="px-4 py-4">{supplier.email}</td>
                  <td className="px-4 py-4">
                    <CategoryBadge categories={supplier.categories} />
                  </td>
                  <td className="px-4 py-4">{supplier.paymentTerm}</td>
                  <td className="px-4 py-4 text-center">
                    <StatusBadge status={supplier.status} />
                  </td>
                  <td className="px-4 py-4 text-center">
                    {supplier.createdAt}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex justify-center gap-3 text-slate-400">
                      <button
                        onClick={() => openEditDrawer(supplier)}
                        className="hover:text-blue-600"
                      >
                        <Pencil size={16} />
                      </button>
                      <MoreHorizontal size={18} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-5 flex items-center justify-center gap-2">
            <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-400">
              <ChevronsLeft size={16} />
            </button>
            <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-400">
              <ChevronLeft size={16} />
            </button>
            {[1, 2, 3, 4, 5].map((page) => (
              <button
                key={page}
                className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-bold ${
                  page === 1
                    ? "bg-blue-600 text-white"
                    : "border border-slate-200 text-slate-600"
                }`}
              >
                {page}
              </button>
            ))}
            <span className="px-2 text-slate-400">...</span>
            <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-sm font-bold text-slate-600">
              9
            </button>
            <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600">
              <ChevronRight size={16} />
            </button>
          </div>
        </section>
      </div>

      <SupplierDrawer
        open={drawerOpen}
        mode={drawerMode}
        supplier={selectedSupplier}
        onClose={() => setDrawerOpen(false)}
      />
    </>
  );
}