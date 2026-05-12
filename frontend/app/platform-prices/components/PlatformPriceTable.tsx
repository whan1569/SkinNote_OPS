import { MoreHorizontal } from "lucide-react";

import { Pagination } from "./Pagination";
import { PlatformIcon } from "./PlatformIcon";
import { StatusBadge } from "./StatusBadge";
import type { PlatformPrice } from "../features/types";

type Props = {
  items: PlatformPrice[];
  onEdit: (item: PlatformPrice) => void;
};

export function PlatformPriceTable({ items, onEdit }: Props) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full border-collapse text-sm">
        <thead className="bg-slate-50 text-xs font-bold text-slate-500">
          <tr>
            <th className="px-5 py-4 text-left">상품명 / SKU</th>
            <th className="px-5 py-4 text-left">플랫폼</th>
            <th className="px-5 py-4 text-right">판매가</th>
            <th className="px-5 py-4 text-right">할인가</th>
            <th className="px-5 py-4 text-left">할인 기간</th>
            <th className="px-5 py-4 text-left">상태</th>
            <th className="px-5 py-4 text-left">최근 수정일</th>
            <th className="px-5 py-4 text-right">관리</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {items.map((item) => (
            <tr key={item.id} className="hover:bg-slate-50">
              <td className="px-5 py-4">
                <div className="font-bold text-slate-900">
                  {item.productName}
                </div>
                <div className="mt-1 text-xs text-slate-400">
                  {item.sku}
                </div>
              </td>

              <td className="px-5 py-4">
                <div className="flex items-center gap-2">
                  <PlatformIcon icon={item.platformIcon} />
                  <span className="font-bold text-slate-700">
                    {item.platform}
                  </span>
                </div>
              </td>

              <td className="px-5 py-4 text-right font-bold text-slate-700">
                {item.sellingPrice.toLocaleString()}원
              </td>

              <td className="px-5 py-4 text-right">
                {item.discountedPrice ? (
                  <div>
                    <div className="font-bold text-blue-600">
                      {item.discountedPrice.toLocaleString()}원
                    </div>

                    {item.discountRate && (
                      <div className="mt-1 text-xs font-bold text-red-500">
                        {item.discountRate}% 할인
                      </div>
                    )}
                  </div>
                ) : (
                  <span className="text-slate-400">-</span>
                )}
              </td>

              <td className="px-5 py-4 text-slate-600">
                {item.discountStartDate && item.discountEndDate ? (
                  <>
                    {item.discountStartDate}
                    <br />
                    ~ {item.discountEndDate}
                  </>
                ) : (
                  <span className="text-slate-400">-</span>
                )}
              </td>

              <td className="px-5 py-4">
                <StatusBadge status={item.status} />
              </td>

              <td className="px-5 py-4 text-slate-600">
                {item.updatedAt}
              </td>

              <td className="px-5 py-4 text-right">
                <button
                  onClick={() => onEdit(item)}
                  className="rounded-lg border border-slate-200 p-2 text-slate-500"
                >
                  <MoreHorizontal size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination />
    </section>
  );
}