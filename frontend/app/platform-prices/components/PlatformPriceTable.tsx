import { Pencil } from "lucide-react";

import type { PlatformPrice } from "../features/types";

type Props = {
  items?: PlatformPrice[];
  onEdit: (item: PlatformPrice) => void;
};

export function PlatformPriceTable({
  items = [],
  onEdit,
}: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50">
            <tr className="text-left text-slate-500">
              <th className="px-5 py-3 font-medium">상품</th>
              <th className="px-5 py-3 font-medium">플랫폼</th>
              <th className="px-5 py-3 font-medium">판매가</th>
              <th className="px-5 py-3 font-medium">할인가</th>
              <th className="px-5 py-3 font-medium">할인율</th>
              <th className="px-5 py-3 font-medium">상태</th>
              <th className="px-5 py-3 font-medium">수정일</th>
              <th className="px-5 py-3 font-medium"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50">
                <td className="px-5 py-4">
                  <div className="font-bold text-slate-900">
                    {item.productName}
                  </div>

                  <div className="mt-1 text-xs text-slate-500">
                    {item.productCode}
                  </div>
                </td>

                <td className="px-5 py-4">
                  <div className="font-medium text-slate-700">
                    {item.platform}
                  </div>
                </td>

                <td className="px-5 py-4 font-semibold text-slate-900">
                  ₩{item.sellingPrice.toLocaleString()}
                </td>

                <td className="px-5 py-4 text-slate-700">
                  {item.discountedPrice
                    ? `₩${item.discountedPrice.toLocaleString()}`
                    : "-"}
                </td>

                <td className="px-5 py-4 text-slate-700">
                  {item.discountRate
                    ? `${item.discountRate}%`
                    : "-"}
                </td>

                <td className="px-5 py-4">
                  <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">
                    {item.status}
                  </span>
                </td>

                <td className="px-5 py-4 text-slate-500">
                  {item.updatedAt}
                </td>

                <td className="px-5 py-4 text-right">
                  <button
                    onClick={() => onEdit(item)}
                    className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-slate-100"
                  >
                    <Pencil size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
