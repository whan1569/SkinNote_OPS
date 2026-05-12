import { StatusBadge } from "./StatusBadge";
import type { Supplier } from "../features/types";

type Props = {
  suppliers: Supplier[];
  onEdit: (supplier: Supplier) => void;
};

export function SupplierTable({ suppliers, onEdit }: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 text-xs font-extrabold text-slate-500">
          <tr>
            <th className="px-5 py-4">공급처명</th>
            <th className="px-5 py-4">담당자</th>
            <th className="px-5 py-4">연락처</th>
            <th className="px-5 py-4">이메일</th>
            <th className="px-5 py-4">선금 비중</th>
            <th className="px-5 py-4">정산일</th>
            <th className="px-5 py-4">상태</th>
            <th className="px-5 py-4">등록일</th>
            <th className="px-5 py-4">관리</th>
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
              <td className="px-5 py-4 text-slate-600">{supplier.phone}</td>
              <td className="px-5 py-4 text-slate-600">{supplier.email}</td>
              <td className="px-5 py-4 font-semibold text-slate-700">
                {supplier.advancePaymentRate}%
              </td>
              <td className="px-5 py-4 font-semibold text-slate-700">
                {supplier.settlementDay === 0
                  ? "유동"
                  : `매월 ${supplier.settlementDay}일`}
              </td>
              <td className="px-5 py-4">
                <StatusBadge status={supplier.status} />
              </td>
              <td className="px-5 py-4 text-slate-500">
                {supplier.createdAt}
              </td>
              <td className="px-5 py-4">
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
    </div>
  );
}
