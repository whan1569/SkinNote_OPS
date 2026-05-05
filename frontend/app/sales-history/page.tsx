"use client";

import { useMemo, useState } from "react";
import {
  BarChart3,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  Download,
  MoreHorizontal,
  RefreshCcw,
  RotateCcw,
  Search,
  FileText,
  Package,
  CircleDollarSign,
  Undo2,
  Circle,
} from "lucide-react";
import {
  deliveryTypes,
  orderStatuses,
  orderTypes,
  platformSalesSummary,
  salesHistoryRows,
  salesPlatforms,
  orderStatusSummary,
} from "@/mock/salesHistory";

function PlatformIcon({ icon }: { icon: string }) {
  const color =
    icon === "N"
      ? "bg-green-500"
      : icon === "G"
      ? "bg-green-500"
      : icon === "A."
      ? "bg-red-500"
      : icon === "11"
      ? "bg-red-500"
      : icon === "TALK"
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

function Badge({ value }: { value: string }) {
  const color =
    value === "배송완료" || value === "정산완료"
      ? "bg-green-50 text-green-700"
      : value === "배송중" || value === "정산대기"
      ? "bg-orange-50 text-orange-700"
      : "bg-red-50 text-red-700";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${color}`}>
      {value}
    </span>
  );
}

export default function SalesHistoryPage() {
  const [keyword, setKeyword] = useState("");
  const [platform, setPlatform] = useState("전체");
  const [orderType, setOrderType] = useState("전체");
  const [deliveryType, setDeliveryType] = useState("전체");
  const [orderStatus, setOrderStatus] = useState("전체");

  const filteredRows = useMemo(() => {
    return salesHistoryRows.filter((row) => {
      const matchKeyword =
        row[3].toLowerCase().includes(keyword.toLowerCase()) ||
        row[4].toLowerCase().includes(keyword.toLowerCase());

      const matchDelivery = deliveryType === "전체" || row[7] === deliveryType;
      const matchStatus = orderStatus === "전체" || row[8] === orderStatus;

      return matchKeyword && matchDelivery && matchStatus;
    });
  }, [keyword, deliveryType, orderStatus]);

  const resetFilters = () => {
    setKeyword("");
    setPlatform("전체");
    setOrderType("전체");
    setDeliveryType("전체");
    setOrderStatus("전체");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900">판매 내역</h2>
          <p className="mt-1 text-sm text-slate-500">
            플랫폼별 판매 내역을 조회하고 분석할 수 있습니다.
          </p>
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm">
            <Download size={16} />
            엑셀 다운로드
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm">
            <BarChart3 size={16} />
            판매 통계
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm">
            <RefreshCcw size={16} />
            데이터 새로고침
          </button>
        </div>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid grid-cols-[1.2fr_1fr_1.2fr_1fr_1fr_1fr_auto_auto] gap-4">
          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">
              기간
            </label>
            <button className="h-11 w-full rounded-lg border border-slate-200 px-4 text-left text-sm text-slate-700">
              2025-05-16 ~ 2025-05-23
            </button>
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">
              플랫폼
            </label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm"
            >
              {salesPlatforms.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
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
              주문 유형
            </label>
            <select
              value={orderType}
              onChange={(e) => setOrderType(e.target.value)}
              className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm"
            >
              {orderTypes.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">
              배송 유형
            </label>
            <select
              value={deliveryType}
              onChange={(e) => setDeliveryType(e.target.value)}
              className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm"
            >
              {deliveryTypes.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">
              주문 상태
            </label>
            <select
              value={orderStatus}
              onChange={(e) => setOrderStatus(e.target.value)}
              className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm"
            >
              {orderStatuses.map((item) => (
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

      <section className="grid grid-cols-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        {[
          ["주문 건수", "1,245", "건", "전일 대비 ▲ 12.4%", FileText, "text-blue-600"],
          ["판매 수량", "2,856", "개", "전일 대비 ▲ 8.7%", Package, "text-blue-600"],
          ["판매 금액", "₩ 8,452,600", "", "전일 대비 ▲ 15.3%", CircleDollarSign, "text-slate-900"],
          ["취소 건수", "23", "건", "전일 대비 ▼ -4.2%", Undo2, "text-slate-900"],
          ["취소 금액", "₩ 156,200", "", "전일 대비 ▼ -6.1%", Circle, "text-slate-900"],
          ["정산 예정 금액", "7,856,400", "", "상세 보기 >", Package, "text-blue-600"],
        ].map(([label, value, unit, sub, Icon, color], index) => {
          const IconComp = Icon as typeof FileText;

          return (
            <div
              key={String(label)}
              className={`flex gap-4 px-5 ${
                index !== 0 ? "border-l border-slate-200" : ""
              }`}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                <IconComp size={19} />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-500">{String(label)}</p>
                <p className={`mt-1 text-2xl font-extrabold ${String(color)}`}>
                  {String(value)}
                  {unit && <span className="ml-1 text-base">{String(unit)}</span>}
                </p>
                <p
                  className={`mt-1 text-xs font-bold ${
                    String(sub).includes("▼")
                      ? "text-green-600"
                      : String(sub).includes("▲")
                      ? "text-red-500"
                      : "text-blue-600"
                  }`}
                >
                  {String(sub)}
                </p>
              </div>
            </div>
          );
        })}
      </section>

      <div className="grid grid-cols-[1fr_400px] gap-5">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-base font-extrabold text-slate-900">
            판매 내역 목록{" "}
            <span className="text-sm text-slate-400">총 1,245건</span>
          </h3>

          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-xs text-slate-500">
              <tr>
                <th className="px-3 py-3 text-left">
                  <input type="checkbox" />
                </th>
                <th className="px-3 py-3 text-center">No.</th>
                <th className="px-3 py-3 text-center">주문일시</th>
                <th className="px-3 py-3 text-center">플랫폼</th>
                <th className="px-3 py-3 text-left">주문번호</th>
                <th className="px-3 py-3 text-left">상품명 / SKU</th>
                <th className="px-3 py-3 text-right">주문 수량</th>
                <th className="px-3 py-3 text-right">판매 금액</th>
                <th className="px-3 py-3 text-center">배송 유형</th>
                <th className="px-3 py-3 text-center">주문 상태</th>
                <th className="px-3 py-3 text-center">정산 상태</th>
                <th className="px-3 py-3 text-center">관리</th>
              </tr>
            </thead>

            <tbody>
              {filteredRows.map((row, index) => (
                <tr key={row[2]} className="border-t border-slate-100">
                  <td className="px-3 py-4">
                    <input type="checkbox" />
                  </td>
                  <td className="px-3 py-4 text-center">{index + 1}</td>
                  <td className="px-3 py-4 text-center">{row[0]}</td>
                  <td className="px-3 py-4 text-center">
                    <PlatformIcon icon={String(row[1])} />
                  </td>
                  <td className="px-3 py-4 font-bold text-blue-700">{row[2]}</td>
                  <td className="px-3 py-4">
                    <p className="font-bold text-slate-800">{row[3]}</p>
                    <p className="text-xs text-slate-500">{row[4]}</p>
                  </td>
                  <td className="px-3 py-4 text-right">{row[5]}</td>
                  <td className="px-3 py-4 text-right font-bold">{row[6]}</td>
                  <td className="px-3 py-4 text-center">{row[7]}</td>
                  <td className="px-3 py-4 text-center">
                    <Badge value={String(row[8])} />
                  </td>
                  <td className="px-3 py-4 text-center">
                    <Badge value={String(row[9])} />
                  </td>
                  <td className="px-3 py-4 text-center text-slate-400">
                    <MoreHorizontal size={18} className="mx-auto" />
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
              125
            </button>
            <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600">
              <ChevronRight size={16} />
            </button>
          </div>
        </section>

        <aside className="space-y-5">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="mb-5 text-base font-extrabold text-slate-900">
              일별 판매 추이
            </h3>

            <div className="flex h-56 items-center justify-center rounded-xl border border-slate-100 bg-slate-50 text-sm font-bold text-slate-400">
              차트 영역
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="mb-5 text-base font-extrabold text-slate-900">
              플랫폼별 판매 현황
            </h3>

            <div className="grid grid-cols-[140px_1fr] items-center gap-4">
              <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-green-500 via-red-500 to-yellow-400">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-sm font-extrabold">
                  8,452,600원
                </div>
              </div>

              <div className="space-y-2 text-sm">
                {platformSalesSummary.map((row) => (
                  <div key={row[0]} className="flex justify-between gap-3">
                    <span className="font-bold text-slate-600">{row[0]}</span>
                    <span className="text-slate-500">{row[1]}</span>
                    <b>{row[2]}</b>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="mb-4 text-base font-extrabold text-slate-900">
              주문 상태별 현황
            </h3>

            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-xs text-slate-500">
                <tr>
                  <th className="px-3 py-3 text-left">상태</th>
                  <th className="px-3 py-3 text-right">건수</th>
                  <th className="px-3 py-3 text-right">판매 금액</th>
                </tr>
              </thead>
              <tbody>
                {orderStatusSummary.map((row) => (
                  <tr key={row[0]} className="border-t border-slate-100">
                    <td className="px-3 py-3 font-bold">{row[0]}</td>
                    <td className="px-3 py-3 text-right">{row[1]}</td>
                    <td className="px-3 py-3 text-right font-bold">{row[2]}</td>
                  </tr>
                ))}
                <tr className="border-t border-slate-100 bg-slate-50 font-extrabold">
                  <td className="px-3 py-3">합계</td>
                  <td className="px-3 py-3 text-right">1,245 건</td>
                  <td className="px-3 py-3 text-right">8,452,600 원</td>
                </tr>
              </tbody>
            </table>
          </section>
        </aside>
      </div>
    </div>
  );
}