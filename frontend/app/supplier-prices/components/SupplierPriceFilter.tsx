import {
    SUPPLIER_OPTIONS,
    SUPPLIER_PRICE_STATUSES,
  } from "../features/constants";
  import type {
    SupplierPriceFilter as SupplierPriceFilterType,
    SupplierPriceStatus,
  } from "../features/types";
  
  type Props = {
    filter: SupplierPriceFilterType;
    onChange: (filter: SupplierPriceFilterType) => void;
    onReset: () => void;
  };
  
  export function SupplierPriceFilter({
    filter,
    onChange,
    onReset,
  }: Props) {
    const updateFilter = <K extends keyof SupplierPriceFilterType>(
      key: K,
      value: SupplierPriceFilterType[K],
    ) => {
      onChange({
        ...filter,
        [key]: value,
      });
    };
  
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid grid-cols-3 gap-4">
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
              공급처
            </label>
            <select
              value={filter.supplierName}
              onChange={(event) =>
                updateFilter("supplierName", event.target.value)
              }
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none"
            >
              {SUPPLIER_OPTIONS.map((supplier) => (
                <option key={supplier} value={supplier}>
                  {supplier}
                </option>
              ))}
            </select>
          </div>
  
          <div>
            <label className="mb-2 block text-xs font-bold text-slate-500">
              상태
            </label>
            <select
              value={filter.status}
              onChange={(event) =>
                updateFilter(
                  "status",
                  event.target.value as SupplierPriceStatus,
                )
              }
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none"
            >
              {SUPPLIER_PRICE_STATUSES.map((status) => (
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
