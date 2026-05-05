"use client";

import { useMemo, useState } from "react";
import {
  Download,
  Printer,
  RefreshCcw,
  Search,
  RotateCcw,
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  SlidersHorizontal,
} from "lucide-react";
import {
  inventoryTransactions,
  transactionCategories,
  transactionLocations,
  transactionTypes,
} from "@/mock/inventoryTransactions";

function TypeBadge({ type }: { type: string }) {
  const color =
    type === "입고"
      ? "bg-green-50 text-green-700"
      : type.includes("출고")
      ? "bg-red-50 text-red-700"
      : type.includes("+")
      ? "bg-purple-50 text-purple-700"
      : "bg-violet-50 text-violet-700";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${color}`}>
      {type}
    </span>
  );
}

function QtyCell({ value, type }: { value: number | null; type: "in" | "out" | "adj" }) {
  if (value === null) return <span className="text-slate-400">-</span>;

  const color =
    type === "in"
      ? "text-green-600"
      : type === "out"
      ? "text-red-500"
      : value > 0
      ? "text-blue-600"
      : "text-violet-600";

  const prefix =
    type === "in" ? "+" : type === "out" ? "-" : value > 0 ? "+" : "";

  return (
    <span className={`font-extrabold ${color}`}>
      {prefix}
      {Math.abs(value).toLocaleString()}
    </span>
  );
}

export default function InventoryTransactionsPage() {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("전체");
  const [location, setLocation] = useState("전체");
  const [type, setType] = useState("전체");

  const filteredRows = useMemo(() => {
    return inventoryTransactions.filter((row) => {
      const matchKeyword =
        row.productName.toLowerCase().includes(keyword.toLowerCase()) ||
        row.sku.toLowerCase().includes(keyword.toLowerCase());

      const matchType = type === "전체" || row.type === type;

      return matchKeyword && matchType;
    });
  }, [keyword, type]);

  const resetFilters = () => {
    setKeyword("");
    setCategory("전체");
    setLocation("전체");
    setType("전체");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900">
            재고 변동 원장
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            상품의 재고 변동 내역을 날짜별로 조회할 수 있습니다.
          </p>
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm">
            <Download size={16} />
            엑셀 다운로드
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm">
            <Printer size={16} />
            인쇄
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white shadow-sm">
            <RefreshCcw size={16} />
            새로고침
          </button>
        </div>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid grid-cols-[1.1fr_1.2fr_1fr_1fr_1fr_auto_auto] gap-4">
          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">
              기간
            </label>
            <button className="flex h-11 w-full items-center justify-between rounded-lg border border-slate-200 px-4 text-sm text-slate-700">
              2025-05-16 ~ 2025-05-23
              <Calendar size={16} className="text-slate-400" />
            </button>
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">
              상품
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

          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">
              카테고리
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none"
            >
              {transactionCategories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">
              위치
            </label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none"
            >
              {transactionLocations.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">
              변동 유형
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none"
            >
              {transactionTypes.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button className="flex h-11 items-center rounded-lg bg-[#071d49] px-7 text-sm font-bold text-white">
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

      <section className="grid grid-cols-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        {[
          ["기간 시작 재고", "118,540,300", "(2025-05-16)", "text-slate-900"],
          ["입고 수량 합계", "12,860 개", "", "text-blue-600"],
          ["출고 수량 합계", "5,960 개", "", "text-red-500"],
          ["조정 수량 합계", "+120 개", "", "text-violet-600"],
          ["기간 종료 재고", "126,540,300", "(2025-05-23)", "text-slate-900"],
        ].map(([label, value, sub, color], index) => (
          <div
            key={label}
            className={`px-7 ${index !== 0 ? "border-l border-slate-200" : ""}`}
          >
            <p className="text-sm font-bold text-slate-600">
              {label} <span className="text-slate-400">{sub}</span>
            </p>
            <p className={`mt-3 text-2xl font-extrabold ${color}`}>
              {value}
            </p>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-extrabold text-slate-900">
            재고 변동 내역{" "}
            <span className="text-sm text-slate-400">총 128건</span>
          </h3>

          <div className="flex gap-2">
            <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600">
              10개씩 보기
              <ChevronDown size={16} />
            </button>
            <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600">
              <SlidersHorizontal size={16} />
              상세 필터
            </button>
          </div>
        </div>

        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-xs text-slate-500">
            <tr>
              <th className="px-3 py-3 text-center">No.</th>
              <th className="px-3 py-3 text-center">일자/시간</th>
              <th className="px-3 py-3 text-center">변동 유형</th>
              <th className="px-3 py-3 text-left">관련 번호</th>
              <th className="px-3 py-3 text-left">상품 정보</th>
              <th className="px-3 py-3 text-center">위치</th>
              <th className="px-3 py-3 text-center" colSpan={3}>
                변동 수량
              </th>
              <th className="px-3 py-3 text-right">변동 후 재고</th>
              <th className="px-3 py-3 text-right">단가</th>
              <th className="px-3 py-3 text-right">변동 금액</th>
              <th className="px-3 py-3 text-left">비고</th>
              <th className="px-3 py-3 text-center">담당자</th>
            </tr>
            <tr className="bg-slate-50 text-xs text-slate-500">
              <th colSpan={6}></th>
              <th className="px-3 pb-3 text-center">입고(+)</th>
              <th className="px-3 pb-3 text-center">출고(-)</th>
              <th className="px-3 pb-3 text-center">조정(±)</th>
              <th colSpan={5}></th>
            </tr>
          </thead>

          <tbody>
            {filteredRows.map((row) => (
              <tr key={row.id} className="border-t border-slate-100">
                <td className="px-3 py-4 text-center">{row.id}</td>
                <td className="px-3 py-4 text-center text-slate-700">
                  {row.occurredAt}
                </td>
                <td className="px-3 py-4 text-center">
                  <TypeBadge type={row.type} />
                </td>
                <td className="px-3 py-4 font-bold text-blue-700">
                  {row.refNo}
                </td>
                <td className="px-3 py-4">
                  <p className="font-bold text-slate-800">{row.productName}</p>
                  <p className="text-xs text-slate-500">{row.sku}</p>
                </td>
                <td className="px-3 py-4 text-center">{row.location}</td>
                <td className="px-3 py-4 text-center">
                  <QtyCell value={row.inboundQty} type="in" />
                </td>
                <td className="px-3 py-4 text-center">
                  <QtyCell value={row.outboundQty} type="out" />
                </td>
                <td className="px-3 py-4 text-center">
                  <QtyCell value={row.adjustQty} type="adj" />
                </td>
                <td className="px-3 py-4 text-right font-bold">
                  {row.stockAfter.toLocaleString()}
                </td>
                <td className="px-3 py-4 text-right">
                  {row.unitPrice.toLocaleString()}
                </td>
                <td
                  className={`px-3 py-4 text-right font-bold ${
                    row.amount < 0 ? "text-red-500" : "text-slate-700"
                  }`}
                >
                  {row.amount.toLocaleString()}
                </td>
                <td className="px-3 py-4">{row.note}</td>
                <td className="px-3 py-4 text-center font-bold">
                  {row.manager}
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
          <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-400">
            <ChevronsRight size={16} />
          </button>
        </div>

        <p className="mt-6 text-xs text-slate-500">
          * 변동 유형: 입고, 출고(판매), 출고(반품), 조정(+), 이관(출고/입고) 등
        </p>
      </section>
    </div>
  );
}