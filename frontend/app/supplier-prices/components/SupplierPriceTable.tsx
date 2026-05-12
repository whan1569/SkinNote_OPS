import { MoreHorizontal } from "lucide-react";

import { Pagination } from "./Pagination";
import { StatusBadge } from "./StatusBadge";
import type { SupplierPrice } from "../features/types";

type Props = {
  items: SupplierPrice[];
  onEdit: (item: SupplierPrice) => void;
};

export function SupplierPriceTable({ items, onEdit }: Props) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full border-collapse text-sm">
        <thead className="bg-slate-50 text-xs font-bold text-slate-500">
          <tr>
            <th className="px-5 py-4 text-left">상품명 / SKU</th>
            <th className="px-5 py-4 text-left">공급처</th>
            <th className="px-5 py-4 text-right">공급가</th>
            <th className="px-5 py-4 text-right">MOQ</th>
            <th className="px-5 py-4 text-left">리드타임</th>
            <th className="px-5 py-4 text-left">적용 기간</th>
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

              <td className="px-5 py-4 font-bold text-slate-700">
                {item.supplierName}
              </td>

              <td className="px-5 py-4 text-right font-bold text-slate-700">
                {item.supplyPrice.toLocaleString()}원
              </td>

              <td className="px-5 py-4 text-right text-slate-600">
                {item.moq.toLocaleString()}개
              </td>

              <td className="px-5 py-4 text-slate-600">
                {item.leadTime}
              </td>

              <td className="px-5 py-4 text-slate-600">
                {item.startDate}
                <br />
                ~ {item.endDate ?? "현재"}
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