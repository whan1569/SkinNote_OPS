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
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm font-bold text-slate-700">
          전체 {platforms.length.toLocaleString()}건
        </p>

        <button className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600">
          20개씩 보기
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1100px] text-sm">
          <thead className="bg-slate-50 text-xs text-slate-500">
            <tr>
              <th className="px-4 py-4 text-left">플랫폼명 / 코드</th>
              <th className="px-4 py-4 text-left">유형</th>
              <th className="px-4 py-4 text-left">연동 방식</th>
              <th className="px-4 py-4 text-left">담당자</th>
              <th className="px-4 py-4 text-center">정산일</th>
              <th className="px-4 py-4 text-right">수수료율</th>
              <th className="px-4 py-4 text-center">상태</th>
              <th className="px-4 py-4 text-center">수정일</th>
              <th className="px-4 py-4 text-center">관리</th>
            </tr>
          </thead>

          <tbody>
            {platforms.map((platform) => (
              <tr key={platform.id} className="border-t border-slate-100">
                <td className="px-4 py-4">
                  <div className="font-bold text-slate-900">
                    {platform.platformName}
                  </div>
                  <div className="mt-1 text-xs text-slate-500">
                    {platform.platformCode}
                  </div>
                </td>

                <td className="px-4 py-4">
                  <TypeBadge type={platform.type} />
                </td>

                <td className="px-4 py-4">{platform.integrationType}</td>

                <td className="px-4 py-4">
                  <div className="font-semibold text-slate-800">
                    {platform.managerName}
                  </div>
                  <div className="mt-1 text-xs text-slate-500">
                    {platform.managerPhone}
                  </div>
                </td>

                <td className="px-4 py-4 text-center">
                  {platform.settlementDate}
                </td>

                <td className="px-4 py-4 text-right">
                  {platform.commissionRate}%
                </td>

                <td className="px-4 py-4 text-center">
                  <StatusBadge status={platform.status} />
                </td>

                <td className="px-4 py-4 text-center">
                  {platform.updatedAt}
                </td>

                <td className="px-4 py-4">
                  <div className="flex justify-center">
                    <button
                      onClick={() => onEdit(platform)}
                      className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:text-blue-600"
                    >
                      <MoreHorizontal size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination />
    </section>
  );
}
