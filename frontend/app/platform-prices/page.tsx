"use client";

import { useMemo, useState } from "react";
import {
  Download,
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
  Calendar,
} from "lucide-react";
import {
  platformPrices,
  platformPricePlatforms,
  platformSaleStatuses,
  platformPriceStatuses,
} from "@/mock/platformPrices";

type PlatformPrice = (typeof platformPrices)[number];

function StatusBadge({ status }: { status: string }) {
  const color =
    status === "판매중"
      ? "bg-green-50 text-green-700"
      : status === "일시중지"
      ? "bg-orange-50 text-orange-700"
      : "bg-red-50 text-red-700";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${color}`}>
      {status}
    </span>
  );
}

function PlatformIcon({ icon }: { icon: string }) {
  const color =
    icon === "N"
      ? "bg-green-500"
      : icon === "C"
      ? "bg-red-500"
      : icon === "G"
      ? "bg-green-500"
      : icon === "A"
      ? "bg-red-500"
      : icon === "11"
      ? "bg-red-500"
      : icon === "T"
      ? "bg-orange-500"
      : icon === "W"
      ? "bg-red-500"
      : icon === "K"
      ? "bg-yellow-400 text-slate-900"
      : "bg-blue-500";

  return (
    <span
      className={`flex h-6 w-6 items-center justify-center rounded text-xs font-extrabold text-white ${color}`}
    >
      {icon}
    </span>
  );
}

function PlatformPriceDrawer({
  open,
  mode,
  price,
  onClose,
}: {
  open: boolean;
  mode: "create" | "edit";
  price: PlatformPrice | null;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/20">
      <aside className="flex h-full w-[520px] flex-col bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900">
              플랫폼 판매가 {mode === "create" ? "등록" : "수정"}
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
                상품 정보
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
                플랫폼 <span className="text-red-500">*</span>
              </label>
              <select
                defaultValue={price?.platform ?? "네이버 스마트스토어"}
                className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none focus:border-blue-500"
              >
                {platformPricePlatforms
                  .filter((item) => item !== "전체")
                  .map((item) => (
                    <option key={item}>{item}</option>
                  ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                판매가 VAT 포함 <span className="text-red-500">*</span>
              </label>
              <div className="flex h-11 overflow-hidden rounded-lg border border-slate-200">
                <input
                  defaultValue={price?.sellingPrice.toLocaleString() ?? ""}
                  placeholder="판매가를 입력하세요"
                  className="h-full flex-1 px-4 text-sm outline-none"
                />
                <div className="flex w-12 items-center justify-center border-l border-slate-200 bg-slate-50 text-sm font-bold text-slate-500">
                  원
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  할인가
                </label>
                <input
                  defaultValue={price?.discountedPrice?.toLocaleString() ?? ""}
                  placeholder="할인가"
                  className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  할인율
                </label>
                <div className="flex h-11 overflow-hidden rounded-lg border border-slate-200">
                  <input
                    defaultValue={price?.discountRate ?? ""}
                    placeholder="0"
                    className="h-full flex-1 px-4 text-sm outline-none"
                  />
                  <div className="flex w-12 items-center justify-center border-l border-slate-200 bg-slate-50 text-sm font-bold text-slate-500">
                    %
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                할인 기간
              </label>
              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                <button className="flex h-11 items-center justify-between rounded-lg border border-slate-200 px-4 text-sm text-slate-700">
                  {price?.discountStartDate ?? "2025-05-23"}
                  <Calendar size={16} className="text-slate-400" />
                </button>
                <span className="text-slate-400">~</span>
                <button className="flex h-11 items-center justify-between rounded-lg border border-slate-200 px-4 text-sm text-slate-700">
                  {price?.discountEndDate ?? "2025-06-06"}
                  <Calendar size={16} className="text-slate-400" />
                </button>
              </div>
            </div>

            <div>
              <label className="mb-3 block text-sm font-bold text-slate-700">
                상태 <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-6 text-sm font-semibold text-slate-700">
                {["판매중", "일시중지", "판매중지"].map((item) => (
                  <label key={item} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="platform-price-status"
                      defaultChecked={(price?.status ?? "판매중") === item}
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

            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
              <p className="mb-2 font-extrabold text-slate-700">안내 사항</p>
              <ul className="list-disc space-y-1 pl-5 text-xs leading-5">
                <li>판매가 변경 시 즉시 해당 플랫폼에 반영됩니다.</li>
                <li>할인 기간이 종료되면 자동으로 정상 판매가로 전환됩니다.</li>
                <li>판매가 일괄 수정은 최대 100개까지 가능합니다.</li>
              </ul>
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

export default function PlatformPricesPage() {
  const [keyword, setKeyword] = useState("");
  const [platform, setPlatform] = useState("전체");
  const [saleStatus, setSaleStatus] = useState("전체");
  const [priceStatus, setPriceStatus] = useState("전체");

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<"create" | "edit">("create");
  const [selectedPrice, setSelectedPrice] = useState<PlatformPrice | null>(null);

  const filteredPrices = useMemo(() => {
    return platformPrices.filter((item) => {
      const matchKeyword =
        item.productName.toLowerCase().includes(keyword.toLowerCase()) ||
        item.sku.toLowerCase().includes(keyword.toLowerCase());

      const matchPlatform = platform === "전체" || item.platform === platform;
      const matchSaleStatus =
        saleStatus === "전체" || item.status === saleStatus;

      return matchKeyword && matchPlatform && matchSaleStatus;
    });
  }, [keyword, platform, saleStatus]);

  const openCreateDrawer = () => {
    setDrawerMode("create");
    setSelectedPrice(null);
    setDrawerOpen(true);
  };

  const openEditDrawer = (price: PlatformPrice) => {
    setDrawerMode("edit");
    setSelectedPrice(price);
    setDrawerOpen(true);
  };

  const resetFilters = () => {
    setKeyword("");
    setPlatform("전체");
    setSaleStatus("전체");
    setPriceStatus("전체");
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              플랫폼별 판매가 관리
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              상품의 각 플랫폼별 판매가를 설정하고 관리할 수 있습니다.
            </p>
          </div>

          <div className="flex gap-3">
            <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm">
              <Download size={16} />
              엑셀 다운로드
            </button>
            <button className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm">
              판매가 일괄 수정
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

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid grid-cols-[1.2fr_1fr_1fr_1fr_auto_auto] gap-4">
            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                상품 검색
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
                플랫폼
              </label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none focus:border-blue-500"
              >
                {platformPricePlatforms.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                판매 상태
              </label>
              <select
                value={saleStatus}
                onChange={(e) => setSaleStatus(e.target.value)}
                className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none focus:border-blue-500"
              >
                {platformSaleStatuses.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                상태
              </label>
              <select
                value={priceStatus}
                onChange={(e) => setPriceStatus(e.target.value)}
                className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none focus:border-blue-500"
              >
                {platformPriceStatuses.map((item) => (
                  <option key={item}>{item}</option>
                ))}
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
                <th className="px-4 py-4 text-left">플랫폼</th>
                <th className="px-4 py-4 text-right">판매가</th>
                <th className="px-4 py-4 text-right">할인가</th>
                <th className="px-4 py-4 text-center">할인 기간</th>
                <th className="px-4 py-4 text-center">상태</th>
                <th className="px-4 py-4 text-center">최근 수정일</th>
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
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <PlatformIcon icon={item.platformIcon} />
                      <span className="font-medium text-slate-700">
                        {item.platform}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-right">
                    {item.sellingPrice.toLocaleString()} 원
                  </td>
                  <td className="px-4 py-4 text-right">
                    {item.discountedPrice ? (
                      <>
                        <div>{item.discountedPrice.toLocaleString()} 원</div>
                        <div className="text-xs text-slate-500">
                          {item.discountRate}%
                        </div>
                      </>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="px-4 py-4 text-center">
                    {item.discountStartDate ? (
                      <>
                        <div>{item.discountStartDate} ~</div>
                        <div>{item.discountEndDate}</div>
                      </>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="px-4 py-4 text-center">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="px-4 py-4 text-center text-slate-600">
                    {item.updatedAt}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex justify-center gap-3 text-slate-400">
                      <button
                        onClick={() => openEditDrawer(item)}
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
              16
            </button>
            <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600">
              <ChevronRight size={16} />
            </button>
          </div>
        </section>
      </div>

      <PlatformPriceDrawer
        open={drawerOpen}
        mode={drawerMode}
        price={selectedPrice}
        onClose={() => setDrawerOpen(false)}
      />
    </>
  );
}