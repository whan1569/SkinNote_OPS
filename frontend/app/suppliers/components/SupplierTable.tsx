import { StatusBadge } from "./StatusBadge";
import type { Supplier } from "../features/types";

type Props = {
  suppliers: Supplier[];
  onEdit: (supplier: Supplier) => void;
};

export function SupplierTable({ suppliers, onEdit }: Props) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <table className="w-full border-collapse text-sm">
        <thead className="bg-slate-50 text-xs text-slate-500">
          <tr>
            <th className="px-4 py-3 text-left font-extrabold">회사 코드</th>
            <th className="px-4 py-3 text-left font-extrabold">공급처명</th>
            <th className="px-4 py-3 text-left font-extrabold">담당자</th>
            <th className="px-4 py-3 text-left font-extrabold">연락처</th>
            <th className="px-4 py-3 text-left font-extrabold">이메일</th>
            <th className="px-4 py-3 text-left font-extrabold">선금 비중</th>
            <th className="px-4 py-3 text-left font-extrabold">정산일</th>
            <th className="px-4 py-3 text-left font-extrabold">상태</th>
            <th className="px-4 py-3 text-left font-extrabold">등록일</th>
            <th className="px-4 py-3 text-left font-extrabold">관리</th>
          </tr>
        </thead>

        <tbody>
          {suppliers.map((supplier) => (
            <tr key={supplier.id} className="border-t border-slate-100">
              <td className="px-4 py-3 font-bold text-slate-700">
                {supplier.companyCode}
              </td>
              <td className="px-4 py-3 font-bold text-slate-900">
                {supplier.supplierName}
              </td>
              <td className="px-4 py-3 text-slate-700">
                {supplier.managerName}
              </td>
              <td className="px-4 py-3 text-slate-700">{supplier.phone}</td>
              <td className="px-4 py-3 text-slate-700">{supplier.email}</td>
              <td className="px-4 py-3 text-slate-700">
                {supplier.advancePaymentRate}%
              </td>
              <td className="px-4 py-3 text-slate-700">
                {supplier.settlementDay === 0
                  ? "유동"
                  : `매월 ${supplier.settlementDay}일`}
              </td>
              <td className="px-4 py-3">
                <StatusBadge status={supplier.status} />
              </td>
              <td className="px-4 py-3 text-slate-700">
                {supplier.createdAt}
              </td>
              <td className="px-4 py-3">
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
