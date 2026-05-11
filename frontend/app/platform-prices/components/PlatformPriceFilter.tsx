import {
    PLATFORM_PRICE_PLATFORMS,
    PLATFORM_PRICE_STATUSES,
    PLATFORM_SALE_STATUSES,
  } from "../features/constants";
  import type {
    PlatformPriceFilter as PlatformPriceFilterType,
    PlatformPricePlatform,
    PlatformPriceStatus,
    PlatformSaleStatus,
  } from "../features/types";
  
  type Props = {
    filter: PlatformPriceFilterType;
    onChange: (filter: PlatformPriceFilterType) => void;
    onReset: () => void;
  };
  
  export function PlatformPriceFilter({
    filter,
    onChange,
    onReset,
  }: Props) {
    const updateFilter = <K extends keyof PlatformPriceFilterType>(
      key: K,
      value: PlatformPriceFilterType[K],
    ) => {
      onChange({
        ...filter,
        [key]: value,
      });
    };
  
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid grid-cols-4 gap-4">
          <div>
            <label className="mb-2 block text-xs font-bold text-slate-500">
              상품 검색
            </label>
            <input
              value={filter.keyword}
              onChange={(event) =>
                updateFilter("keyword", event.target.value)
              }
              placeholder="상품명 또는 SKU 입력"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none"
            />
          </div>
  
          <div>
            <label className="mb-2 block text-xs font-bold text-slate-500">
              플랫폼
            </label>
            <select
              value={filter.platform}
              onChange={(event) =>
                updateFilter(
                  "platform",
                  event.target.value as PlatformPricePlatform,
                )
              }
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none"
            >
              {PLATFORM_PRICE_PLATFORMS.map((platform) => (
                <option key={platform} value={platform}>
                  {platform}
                </option>
              ))}
            </select>
          </div>
  
          <div>
            <label className="mb-2 block text-xs font-bold text-slate-500">
              판매 상태
            </label>
            <select
              value={filter.saleStatus}
              onChange={(event) =>
                updateFilter(
                  "saleStatus",
                  event.target.value as PlatformSaleStatus,
                )
              }
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none"
            >
              {PLATFORM_SALE_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
  
          <div>
            <label className="mb-2 block text-xs font-bold text-slate-500">
              상태
            </label>
            <select
              value={filter.priceStatus}
              onChange={(event) =>
                updateFilter(
                  "priceStatus",
                  event.target.value as PlatformPriceStatus,
                )
              }
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none"
            >
              {PLATFORM_PRICE_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>
  
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onReset}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700"
          >
            초기화
          </button>
  
          <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white">
            검색
          </button>
        </div>
      </section>
    );
  }
