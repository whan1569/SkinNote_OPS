import { ChevronDown } from "lucide-react";

import { CategoryBadge } from "./CategoryBadge";
import { Pagination } from "./Pagination";
import type { Product } from "../features/types";

type Props = {
  products: Product[];
};

export function ProductTable({ products }: Props) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm font-bold text-slate-700">
          전체 {products.length.toLocaleString()}건
        </p>

        <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600">
          20개씩 보기
          <ChevronDown size={16} />
        </button>
      </div>

      <table className="w-full text-sm">
        <thead className="bg-slate-50 text-xs text-slate-500">
          <tr>
            <th className="px-4 py-4 text-left">상품명</th>
            <th className="px-4 py-4 text-left">SKU</th>
            <th className="px-4 py-4 text-left">카테고리</th>
            <th className="px-4 py-4 text-left">브랜드</th>
            <th className="px-4 py-4 text-center">등록일</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-t border-slate-100">
              <td className="px-4 py-4 font-bold">
                {product.productName}
              </td>

              <td className="px-4 py-4">{product.sku}</td>

              <td className="px-4 py-4">
                <CategoryBadge category={product.category} />
              </td>

              <td className="px-4 py-4 text-slate-600">-</td>

              <td className="px-4 py-4 text-center">
                {product.createdAt}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination />
    </section>
  );
}
