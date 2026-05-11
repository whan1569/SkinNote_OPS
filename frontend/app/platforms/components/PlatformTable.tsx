import { MoreHorizontal } from "lucide-react";

import { Pagination } from "./Pagination";
import { StatusBadge } from "./StatusBadge";
import { TypeBadge } from "./TypeBadge";
import type { Platform } from "../features/types";

type Props = {
  platforms: Platform[];
  onEdit: (platform: Platform) => void;
};

export function PlatformTable({ platforms, onEdit }: Props) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full border-collapse text-sm">
        <thead className="bg-slate-50 text-xs font-bold text-slate-500">
          <tr>
            <th className="w-12 px-5 py-4 text-left">
              <input type="checkbox" />
            </th>
            <th className="px-5 py-4 text-left">No.</th>
            <th className="px-5 py-4 text-left">플랫폼명 / 코드</th>
            <th className="px-5 py-4 text-left">유형</th>
            <th className="px-5 py-4 text-left">연동 방식</th>
            <th className="px-5 py-4 text-left">담당자</th>
            <th className="px-5 py-4 text-left">정산 주기</th>
            <th className="px-5 py-4 text-right">수수료율</th>
            <th className="px-5 py-4 text-left">상태</th>
            <th className="px-5 py-4 text-left">수정일</th>
            <th className="px-5 py-4 text-right">관리</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {platforms.map((platform, index) => (
            <tr key={platform.id} className="hover:bg-slate-50">
              <td className="px-5 py-4">
                <input type="checkbox" />
              </td>

              <td className="px-5 py-4 text-slate-500">
                {index + 1}
              </td>

              <td className="px-5 py-4">
                <div className="font-bold text-slate-900">
                  {platform.platformName}
                </div>
                <div className="mt-1 text-xs text-slate-400">
                  {platform.platformCode}
                </div>
              </td>

              <td className="px-5 py-4">
                <TypeBadge type={platform.type} />
              </td>

              <td className="px-5 py-4 text-slate-600">
                {platform.integrationType}
              </td>

              <td className="px-5 py-4">
                <div className="font-bold text-slate-700">
                  {platform.managerName}
                </div>
                <div className="mt-1 text-xs text-slate-400">
                  {platform.managerPhone}
                </div>
              </td>

              <td className="px-5 py-4 text-slate-600">
                {platform.settlementCycle}
              </td>

              <td className="px-5 py-4 text-right font-bold text-slate-700">
                {platform.commissionRate}%
              </td>

              <td className="px-5 py-4">
                <StatusBadge status={platform.status} />
              </td>

              <td className="px-5 py-4 text-slate-600">
                {platform.updatedAt}
              </td>

              <td className="px-5 py-4 text-right">
                <button
                  onClick={() => onEdit(platform)}
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
