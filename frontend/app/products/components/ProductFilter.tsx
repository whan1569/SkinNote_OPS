import {
    RotateCcw,
    Search,
  } from "lucide-react";
  
  import { PRODUCT_CATEGORIES } from "../features/constants";
  
  import type {
    ProductCategory,
    ProductFilter as ProductFilterType,
  } from "../features/types";
  
  type Props = {
    filter: ProductFilterType;
    onChange: (filter: ProductFilterType) => void;
    onReset: () => void;
  };
  
  export function ProductFilter({
    filter,
    onChange,
    onReset,
  }: Props) {
    const updateFilter = <K extends keyof ProductFilterType>(
      key: K,
      value: ProductFilterType[K],
    ) => {
      onChange({
        ...filter,
        [key]: value,
      });
    };
  
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid grid-cols-[1fr_1fr_1fr_auto_auto] gap-4">
          <input
            value={filter.productName}
            onChange={(event) =>
              updateFilter("productName", event.target.value)
            }
            placeholder="상품명을 입력하세요"
            className="h-11 rounded-lg border border-slate-200 px-4 text-sm"
          />
  
          <input
            value={filter.sku}
            onChange={(event) =>
              updateFilter("sku", event.target.value)
            }
            placeholder="SKU를 입력하세요"
            className="h-11 rounded-lg border border-slate-200 px-4 text-sm"
          />
  
          <select
            value={filter.category}
            onChange={(event) =>
              updateFilter(
                "category",
                event.target.value as ProductCategory,
              )
            }
            className="h-11 rounded-lg border border-slate-200 px-4 text-sm"
          >
            {PRODUCT_CATEGORIES.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
  
          <button className="flex h-11 items-center gap-2 rounded-lg bg-[#071d49] px-6 text-sm font-bold text-white">
            <Search size={16} />
            검색
          </button>
  
          <button
            onClick={onReset}
            className="flex h-11 items-center gap-2 rounded-lg border border-slate-200 bg-white px-5 text-sm font-bold text-slate-700"
          >
            <RotateCcw size={16} />
            초기화
          </button>
        </div>
      </section>
    );
  }
