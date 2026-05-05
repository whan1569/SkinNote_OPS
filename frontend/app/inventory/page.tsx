"use client";

import { useMemo, useState } from "react";
import {
  Download,
  Camera,
  RefreshCcw,
  Search,
  RotateCcw,
  MoreHorizontal,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Package,
  ShieldCheck,
  AlertTriangle,
  Hourglass,
  CircleDollarSign,
} from "lucide-react";
import {
  inventoryRows,
  inventoryCategories,
  inventoryPlatforms,
  inventoryLocations,
  inventoryStatuses,
} from "@/mock/inventory";

function PlatformIcon({ icon }: { icon: string }) {
  const color =
    icon === "N"
      ? "bg-green-500"
      : icon === "G"
      ? "bg-green-500"
      : icon === "A"
      ? "bg-red-500"
      : icon === "11"
      ? "bg-red-500"
      : icon === "K"
      ? "bg-yellow-400 text-slate-900"
      : "bg-orange-500";

  return (
    <span
      className={`inline-flex h-6 min-w-6 items-center justify-center rounded px-1 text-[10px] font-extrabold text-white ${color}`}
    >
      {icon}
    </span>
  );
}

function StockStatusBadge({ status }: { status: string }) {
  const color =
    status === "정상"
      ? "bg-green-50 text-green-700"
      : status === "안전재고 이하"
      ? "bg-orange-50 text-orange-700"
      : "bg-red-50 text-red-700";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${color}`}>
      {status}
    </span>
  );
}

export default function InventoryPage() {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("전체");
  const [platform, setPlatform] = useState("전체");
  const [location, setLocation] = useState("전체");
  const [stockStatus, setStockStatus] = useState("전체");
  const [sort, setSort] = useState("상품명 A-Z");

  const filteredRows = useMemo(() => {
    return inventoryRows.filter((row) => {
      const matchKeyword =
        row.productName.toLowerCase().includes(keyword.toLowerCase()) ||
        row.sku.toLowerCase().includes(keyword.toLowerCase());

      const matchStatus =
        stockStatus === "전체" || row.status === stockStatus;

      return matchKeyword && matchStatus;
    });
  }, [keyword, stockStatus]);

  const resetFilters = () => {
    setKeyword("");
    setCategory("전체");
    setPlatform("전체");
    setLocation("전체");
    setStockStatus("전체");
    setSort("상품명 A-Z");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900">재고 현황</h2>
          <p className="mt-1 text-sm text-slate-500">
            전체 상품의 재고 보유 현황과 안전재고 현황을 확인할 수 있습니다.
          </p>
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm">
            <Download size={16} />
            엑셀 다운로드
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm">
            <Camera size={16} />
            재고 스냅샷
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white shadow-sm">
            <RefreshCcw size={16} />
            새로고침
          </button>
        </div>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid grid-cols-[1.1fr_1fr_1fr_1fr_1fr_1fr_auto_auto] gap-4">
          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">
              검색
            </label>
            <div className="flex h-11 items-center rounded-lg border border-slate-200 px-4">
              <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="상품명 또는 SKU 입력"
                className="flex-1 text-sm outline-none"
              />
              <Search size={16} className="text-slate-400" />
            </div>
          </div>

          {[
            ["카테고리", category, setCategory, inventoryCategories],
            ["플랫폼", platform, setPlatform, inventoryPlatforms],
            ["위치", location, setLocation, inventoryLocations],
            ["재고 상태", stockStatus, setStockStatus, inventoryStatuses],
          ].map(([label, value, setter, options]) => (
            <div key={String(label)}>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                {String(label)}
              </label>
              <select
                value={String(value)}
                onChange={(e) =>
                  (setter as React.Dispatch<React.SetStateAction<string>>)(
                    e.target.value
                  )
                }
                className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none focus:border-blue-500"
              >
                {(options as string[]).map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>
          ))}

          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">
              정렬 기준
            </label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none focus:border-blue-500"
            >
              <option>상품명 A-Z</option>
              <option>재고 많은순</option>
              <option>재고 적은순</option>
              <option>재고 금액 높은순</option>
            </select>
          </div>

          <div className="flex items-end">
            <button className="flex h-11 items-center gap-2 rounded-lg bg-[#071d49] px-6 text-sm font-bold text-white">
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

      <section className="grid grid-cols-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        {[
          {
            label: "전체 상품",
            value: "256",
            sub: "판매중 184개",
            icon: Package,
            color: "text-blue-600",
            bg: "bg-blue-50",
          },
          {
            label: "총 재고 수량",
            value: "18,764",
            sub: "전체 상품 기준",
            icon: Package,
            color: "text-blue-600",
            bg: "bg-blue-50",
          },
          {
            label: "총 재고 금액",
            value: "₩ 126,540,300",
            sub: "매입가 기준",
            icon: CircleDollarSign,
            color: "text-slate-700",
            bg: "bg-slate-100",
          },
          {
            label: "정상 재고",
            value: "162",
            sub: "▲ 63.3%",
            icon: ShieldCheck,
            color: "text-green-600",
            bg: "bg-green-50",
          },
          {
            label: "안전재고 이하",
            value: "48",
            sub: "▲ 18.8%",
            icon: AlertTriangle,
            color: "text-orange-500",
            bg: "bg-orange-50",
          },
          {
            label: "재고 없음",
            value: "46",
            sub: "17.9%",
            icon: Hourglass,
            color: "text-red-500",
            bg: "bg-red-50",
          },
        ].map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className={`flex gap-4 px-5 ${
                index !== 0 ? "border-l border-slate-200" : ""
              }`}
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${item.bg} ${item.color}`}
              >
                <Icon size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-600">
                  {item.label}
                </p>
                <p className={`mt-1 text-2xl font-extrabold ${item.color}`}>
                  {item.value}
                  {item.label !== "총 재고 금액" && (
                    <span className="ml-1 text-base">개</span>
                  )}
                </p>
                <p className="mt-1 text-xs font-bold text-slate-500">
                  {item.sub}
                </p>
              </div>
            </div>
          );
        })}
      </section>

      <div className="grid grid-cols-[1fr_400px] gap-5">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-extrabold text-slate-900">
              재고 현황 목록{" "}
              <span className="text-sm text-slate-400">총 256개</span>
            </h3>

            <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600">
              10개씩 보기
              <ChevronDown size={16} />
            </button>
          </div>

          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-xs text-slate-500">
              <tr>
                <th className="px-3 py-3 text-center">No.</th>
                <th className="px-3 py-3 text-left">상품 정보</th>
                <th className="px-3 py-3 text-left">SKU</th>
                <th className="px-3 py-3 text-center">플랫폼</th>
                <th className="px-3 py-3 text-right">총 재고</th>
                <th className="px-3 py-3 text-right">판매가능</th>
                <th className="px-3 py-3 text-right">예약중</th>
                <th className="px-3 py-3 text-right">입고예정</th>
                <th className="px-3 py-3 text-right">재고 금액</th>
                <th className="px-3 py-3 text-right">안전재고</th>
                <th className="px-3 py-3 text-center">재고 상태</th>
                <th className="px-3 py-3 text-center">위치</th>
                <th className="px-3 py-3 text-center">관리</th>
              </tr>
            </thead>

            <tbody>
              {filteredRows.map((row) => (
                <tr key={row.id} className="border-t border-slate-100">
                  <td className="px-3 py-4 text-center">{row.id}</td>
                  <td className="px-3 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-md bg-slate-100" />
                      <p className="font-bold text-slate-800">
                        {row.productName}
                      </p>
                    </div>
                  </td>
                  <td className="px-3 py-4 text-xs font-bold text-slate-600">
                    {row.sku}
                  </td>
                  <td className="px-3 py-4 text-center">
                    <PlatformIcon icon={row.platformIcon} />
                  </td>
                  <td className="px-3 py-4 text-right font-bold">
                    {row.totalStock.toLocaleString()}
                  </td>
                  <td className="px-3 py-4 text-right">
                    {row.availableStock.toLocaleString()}
                  </td>
                  <td className="px-3 py-4 text-right">
                    {row.reservedStock.toLocaleString()}
                  </td>
                  <td className="px-3 py-4 text-right">
                    {row.inboundExpected.toLocaleString()}
                  </td>
                  <td className="px-3 py-4 text-right">
                    {row.inventoryValue.toLocaleString()}
                  </td>
                  <td className="px-3 py-4 text-right">
                    {row.safetyStock.toLocaleString()}
                  </td>
                  <td className="px-3 py-4 text-center">
                    <StockStatusBadge status={row.status} />
                  </td>
                  <td className="px-3 py-4 text-center">{row.location}</td>
                  <td className="px-3 py-4 text-center text-slate-400">
                    <MoreHorizontal size={18} />
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
              26
            </button>
            <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600">
              <ChevronRight size={16} />
            </button>
            <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-400">
              <ChevronsRight size={16} />
            </button>
          </div>

          <p className="mt-6 text-xs text-slate-500">
            * 재고 금액은 평균 매입가 기준입니다.
          </p>
        </section>

        <aside className="space-y-5">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="mb-5 text-base font-extrabold text-slate-900">
              재고 상태 요약
            </h3>

            <div className="grid grid-cols-[150px_1fr] items-center gap-4">
              <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-green-500 via-orange-400 to-red-500">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-sm font-extrabold">
                  총 256개
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="font-bold text-green-600">정상</span>
                  <b>162개 (63.3%)</b>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-orange-500">
                    안전재고 이하
                  </span>
                  <b>48개 (18.8%)</b>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-red-500">재고 없음</span>
                  <b>46개 (17.9%)</b>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="mb-4 text-base font-extrabold text-slate-900">
              안전재고 이하 TOP 5
            </h3>

            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-xs text-slate-500">
                <tr>
                  <th className="px-2 py-3 text-center">No.</th>
                  <th className="px-2 py-3 text-left">상품명</th>
                  <th className="px-2 py-3 text-left">SKU</th>
                  <th className="px-2 py-3 text-right">재고 수량</th>
                  <th className="px-2 py-3 text-right">안전재고</th>
                </tr>
              </thead>
              <tbody>
                {inventoryRows
                  .filter((row) => row.status === "안전재고 이하")
                  .slice(0, 5)
                  .map((row, index) => (
                    <tr key={row.id} className="border-t border-slate-100">
                      <td className="px-2 py-3 text-center">{index + 1}</td>
                      <td className="px-2 py-3 font-bold">
                        {row.productName}
                      </td>
                      <td className="px-2 py-3 text-xs">{row.sku}</td>
                      <td className="px-2 py-3 text-right">
                        {row.totalStock}
                      </td>
                      <td className="px-2 py-3 text-right">
                        {row.safetyStock}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>

            <button className="mt-4 text-sm font-bold text-blue-600">
              전체 목록 보기 &gt;
            </button>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="mb-4 text-base font-extrabold text-slate-900">
              재고 없음 TOP 5
            </h3>

            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-xs text-slate-500">
                <tr>
                  <th className="px-2 py-3 text-center">No.</th>
                  <th className="px-2 py-3 text-left">상품명</th>
                  <th className="px-2 py-3 text-left">SKU</th>
                  <th className="px-2 py-3 text-right">입고예정</th>
                  <th className="px-2 py-3 text-right">예정일</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["비타민C 세럼 30ml", "COS-VC-030", "120", "2025-05-26"],
                  ["마스크팩 100ml", "COS-MP-010", "60", "2025-05-25"],
                  ["선별락 앰플 100ml 리필", "COS-CT-R100", "80", "2025-05-27"],
                  ["진정 토너 300ml", "COS-SO-300", "100", "2025-05-28"],
                  ["프리미엄 아이크림 20ml", "COS-IC-020", "50", "2025-05-26"],
                ].map((row, index) => (
                  <tr key={row[1]} className="border-t border-slate-100">
                    <td className="px-2 py-3 text-center">{index + 1}</td>
                    <td className="px-2 py-3 font-bold">{row[0]}</td>
                    <td className="px-2 py-3 text-xs">{row[1]}</td>
                    <td className="px-2 py-3 text-right">{row[2]}</td>
                    <td className="px-2 py-3 text-right">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button className="mt-4 text-sm font-bold text-blue-600">
              전체 목록 보기 &gt;
            </button>
          </section>
        </aside>
      </div>
    </div>
  );
}