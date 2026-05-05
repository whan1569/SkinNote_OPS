"use client";

import { useMemo, useState } from "react";
import {
  Download,
  Plus,
  Search,
  RotateCcw,
  MoreHorizontal,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  X,
  Calendar,
  AlertTriangle,
} from "lucide-react";
import {
  supplierPrices,
  supplierPriceStatuses,
  supplierPriceSuppliers,
} from "@/mock/supplierPrices";

type SupplierPrice = (typeof supplierPrices)[number];

function StatusBadge({ status }: { status: string }) {
  const color =
    status === "사용중"
      ? "bg-green-50 text-green-700"
      : "bg-slate-100 text-slate-500";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${color}`}>
      {status}
    </span>
  );
}

function PriceDrawer({
  open,
  mode,
  price,
  onClose,
}: {
  open: boolean;
  mode: "create" | "edit";
  price: SupplierPrice | null;
  onClose: () => void;
}) {
  if (!open) return null;

  const vatAmount = price ? price.totalPrice - price.purchasePrice : 0;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/20">
      <aside className="flex h-full w-[520px] flex-col bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900">
              공급처 가격 관리 {mode === "edit" ? "(수정)" : "(등록)"}
            </h3>
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
              이력 정보
            </button>
          </div>

          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                상품 <span className="text-red-500">*</span>
              </label>
              <div className="flex h-16 items-center gap-3 rounded-lg border border-slate-200 px-4">
                <div className="h-10 w-10 rounded-md bg-slate-100" />
                <div>
                  <p className="text-sm font-bold text-slate-800">
                    {price?.productName ?? "상품을 선택하세요"}
                  </p>
                  <p className="text-xs text-slate-500">
                    SKU: {price?.sku ?? "-"}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                공급처 <span className="text-red-500">*</span>
              </label>
              <select
                defaultValue={price?.supplier ?? "한국코스메틱"}
                className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none focus:border-blue-500"
              >
                {supplierPriceSuppliers
                  .filter((item) => item !== "전체")
                  .map((item) => (
                    <option key={item}>{item}</option>
                  ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                MOQ 최소주문수량 <span className="text-red-500">*</span>
              </label>
              <div className="flex h-11 overflow-hidden rounded-lg border border-slate-200">
                <input
                  defaultValue={price?.moq ?? 100}
                  className="h-full flex-1 px-4 text-sm outline-none"
                />
                <div className="flex w-12 items-center justify-center border-l border-slate-200 bg-slate-50 text-sm font-bold text-slate-500">
                  개
                </div>
              </div>
              <p className="mt-2 text-xs text-slate-400">
                최소 주문 가능 수량을 입력합니다.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  매입 단가 VAT 제외 <span className="text-red-500">*</span>
                </label>
                <div className="flex h-11 overflow-hidden rounded-lg border border-slate-200">
                  <input
                    defaultValue={price?.purchasePrice.toLocaleString() ?? ""}
                    className="h-full flex-1 px-4 text-sm outline-none"
                  />
                  <div className="flex w-12 items-center justify-center border-l border-slate-200 bg-slate-50 text-sm font-bold text-slate-500">
                    원
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  통화
                </label>
                <select className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none focus:border-blue-500">
                  <option>KRW (₩)</option>
                  <option>USD ($)</option>
                  <option>AUD ($)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  VAT <span className="text-red-500">*</span>
                </label>
                <select
                  defaultValue={`${price?.vatRate ?? 10}%`}
                  className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none focus:border-blue-500"
                >
                  <option>10%</option>
                  <option>0%</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  VAT 금액
                </label>
                <div className="flex h-11 overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
                  <input
                    readOnly
                    value={vatAmount.toLocaleString()}
                    className="h-full flex-1 bg-slate-50 px-4 text-sm text-slate-500 outline-none"
                  />
                  <div className="flex w-12 items-center justify-center border-l border-slate-200 text-sm font-bold text-slate-500">
                    원
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                총 매입가 VAT 포함
              </label>
              <div className="flex h-11 overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
                <input
                  readOnly
                  value={price?.totalPrice.toLocaleString() ?? ""}
                  className="h-full flex-1 bg-slate-50 px-4 text-sm text-slate-500 outline-none"
                />
                <div className="flex w-12 items-center justify-center border-l border-slate-200 text-sm font-bold text-slate-500">
                  원
                </div>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                적용 기간 <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-[1fr_1fr_auto] gap-3">
                <select
                  defaultValue={price?.startDate ?? "2025-06-01"}
                  className="h-11 rounded-lg border border-slate-200 px-4 text-sm outline-none focus:border-blue-500"
                >
                  <option>2025-06-01</option>
                  <option>2025-05-01</option>
                  <option>2025-04-01</option>
                </select>
                <button className="flex h-11 items-center justify-between rounded-lg border border-slate-200 px-4 text-sm text-slate-700">
                  {price?.endDate ?? "현재"}
                  <Calendar size={16} className="text-slate-400" />
                </button>
                <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                  <input type="checkbox" defaultChecked />
                  종료일 미정
                </label>
              </div>
            </div>

            <div>
              <label className="mb-3 block text-sm font-bold text-slate-700">
                상태 <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-6 text-sm font-semibold text-slate-700">
                {["사용중", "종료"].map((item) => (
                  <label key={item} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="price-status"
                      defaultChecked={(price?.status ?? "사용중") === item}
                    />
                    {item}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-2 flex justify-between">
                <label className="text-sm font-bold text-slate-700">메모</label>
                <span className="text-xs text-slate-400">0/200</span>
              </div>
              <textarea
                placeholder="메모를 입력하세요 (선택)"
                className="h-24 w-full resize-none rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
              <div className="flex items-center gap-2 font-extrabold">
                <AlertTriangle size={16} />
                가격 변경 주의
              </div>
              <p className="mt-2 leading-6">
                가격 정보를 수정하면 이후 발주 및 입고 가격에 영향을 줄 수
                있습니다.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-slate-100 px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-7 py-2.5 text-sm font-bold text-slate-700"
          >
            취소
          </button>

          {mode === "edit" && (
            <button className="rounded-lg border border-red-200 px-7 py-2.5 text-sm font-bold text-red-500">
              삭제
            </button>
          )}

          <button
            onClick={onClose}
            className="rounded-lg bg-blue-600 px-7 py-2.5 text-sm font-bold text-white"
          >
            저장
          </button>
        </div>
      </aside>
    </div>
  );
}

export default function SupplierPricesPage() {
  const [productKeyword, setProductKeyword] = useState("");
  const [supplierKeyword, setSupplierKeyword] = useState("");
  const [status, setStatus] = useState("전체");

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<"create" | "edit">("create");
  const [selectedPrice, setSelectedPrice] = useState<SupplierPrice | null>(null);

  const filteredPrices = useMemo(() => {
    return supplierPrices.filter((item) => {
      return (
        (item.productName
          .toLowerCase()
          .includes(productKeyword.toLowerCase()) ||
          item.sku.toLowerCase().includes(productKeyword.toLowerCase())) &&
        item.supplier.toLowerCase().includes(supplierKeyword.toLowerCase()) &&
        (status === "전체" || item.status === status)
      );
    });
  }, [productKeyword, supplierKeyword, status]);

  const openCreateDrawer = () => {
    setDrawerMode("create");
    setSelectedPrice(null);
    setDrawerOpen(true);
  };

  const openEditDrawer = (price: SupplierPrice) => {
    setDrawerMode("edit");
    setSelectedPrice(price);
    setDrawerOpen(true);
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              공급처별 가격 관리
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              상품의 공급처별 매입 단가를 관리할 수 있습니다.
            </p>
          </div>

          <div className="flex gap-3">
            <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm">
              <Download size={16} />
              엑셀 다운로드
            </button>
            <button className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm">
              가격 일괄 등록
            </button>
            <button
              onClick={openCreateDrawer}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white shadow-sm"
            >
              <Plus size={18} />
              가격 등록
            </button>
          </div>
        </div>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid grid-cols-[1.1fr_1fr_0.8fr_1.3fr_auto_auto] gap-4">
            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                상품
              </label>
              <div className="flex h-11 items-center rounded-lg border border-slate-200 px-4">
                <input
                  value={productKeyword}
                  onChange={(e) => setProductKeyword(e.target.value)}
                  placeholder="상품명, SKU 입력"
                  className="flex-1 text-sm outline-none"
                />
                <Search size={16} className="text-slate-400" />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                공급처
              </label>
              <input
                value={supplierKeyword}
                onChange={(e) => setSupplierKeyword(e.target.value)}
                placeholder="공급처명 입력"
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
                {supplierPriceStatuses.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                적용 기간
              </label>
              <button className="flex h-11 w-full items-center justify-between rounded-lg border border-slate-200 px-4 text-sm text-slate-700">
                2025-05-23 ~ 2025-08-23
                <Calendar size={16} className="text-slate-400" />
              </button>
            </div>

            <div className="flex items-end">
              <button className="flex h-11 items-center gap-2 rounded-lg bg-[#071d49] px-6 text-sm font-bold text-white">
                검색
              </button>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => {
                  setProductKeyword("");
                  setSupplierKeyword("");
                  setStatus("전체");
                }}
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
              전체 {filteredPrices.length.toLocaleString()}건
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
                <th className="px-4 py-4 text-left">상품명 / SKU</th>
                <th className="px-4 py-4 text-left">공급처</th>
                <th className="px-4 py-4 text-right">MOQ</th>
                <th className="px-4 py-4 text-right">매입 단가</th>
                <th className="px-4 py-4 text-center">VAT</th>
                <th className="px-4 py-4 text-right">총 매입가</th>
                <th className="px-4 py-4 text-center">적용 기간</th>
                <th className="px-4 py-4 text-center">관리</th>
              </tr>
            </thead>

            <tbody>
              {filteredPrices.map((item) => (
                <tr key={item.id} className="border-t border-slate-100">
                  <td className="px-4 py-4">
                    <input type="checkbox" />
                  </td>
                  <td className="px-4 py-4 text-center">{item.id}</td>
                  <td className="px-4 py-4">
                    <p className="font-bold text-slate-800">
                      {item.productName}
                    </p>
                    <p className="text-xs text-slate-500">{item.sku}</p>
                  </td>
                  <td className="px-4 py-4">{item.supplier}</td>
                  <td className="px-4 py-4 text-right">
                    {item.moq.toLocaleString()}개
                  </td>
                  <td className="px-4 py-4 text-right">
                    {item.purchasePrice.toLocaleString()}
                  </td>
                  <td className="px-4 py-4 text-center">{item.vatRate}%</td>
                  <td className="px-4 py-4 text-right">
                    {item.totalPrice.toLocaleString()}
                  </td>
                  <td className="px-4 py-4 text-center">
                    <div>{item.startDate}</div>
                    <div className="text-xs text-slate-500">~ {item.endDate}</div>
                    <div className="mt-1">
                      <StatusBadge status={item.status} />
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex justify-center gap-3 text-slate-400">
                      <button
                        onClick={() => openEditDrawer(item)}
                        className="hover:text-blue-600"
                      >
                        <MoreHorizontal size={18} />
                      </button>
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
              13
            </button>
            <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600">
              <ChevronRight size={16} />
            </button>
          </div>
        </section>
      </div>

      <PriceDrawer
        open={drawerOpen}
        mode={drawerMode}
        price={selectedPrice}
        onClose={() => setDrawerOpen(false)}
      />
    </>
  );
}