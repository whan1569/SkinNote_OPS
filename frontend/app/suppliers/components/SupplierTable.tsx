import { StatusBadge } from "./StatusBadge";
import type { Supplier } from "../features/types";

type Props = {
  suppliers: Supplier[];
  onEdit: (supplier: Supplier) => void;
};

export function SupplierTable({ suppliers, onEdit }: Props) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full border-collapse text-sm">
        <thead className="bg-slate-50 text-xs font-bold text-slate-500">
          <tr>
            <th className="px-5 py-4 text-left">공급처명</th>
            <th className="px-5 py-4 text-left">담당자</th>
            <th className="px-5 py-4 text-left">연락처</th>
            <th className="px-5 py-4 text-left">이메일</th>
            <th className="px-5 py-4 text-left">정산 조건</th>
            <th className="px-5 py-4 text-left">상태</th>
            <th className="px-5 py-4 text-left">등록일</th>
            <th className="px-5 py-4 text-right">관리</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {suppliers.map((supplier) => (
            <tr key={supplier.id} className="hover:bg-slate-50">
              <td className="px-5 py-4 font-bold text-slate-900">
                {supplier.supplierName}
              </td>
              <td className="px-5 py-4 text-slate-600">
                {supplier.managerName}
              </td>
              <td className="px-5 py-4 text-slate-600">
                {supplier.phone}
              </td>
              <td className="px-5 py-4 text-slate-600">
                {supplier.email}
              </td>
              <td className="px-5 py-4 text-slate-600">
                {supplier.paymentTerm}
              </td>
              <td className="px-5 py-4">
                <StatusBadge status={supplier.status} />
              </td>
              <td className="px-5 py-4 text-slate-600">
                {supplier.createdAt}
              </td>
              <td className="px-5 py-4 text-right">
                <button
                  onClick={() => onEdit(supplier)}
                  className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700"
                >
                  수정
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
