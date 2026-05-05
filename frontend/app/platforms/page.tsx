"use client";

import { useMemo, useState } from "react";
import {
  Download,
  Filter,
  Plus,
  Search,
  RotateCcw,
  Pencil,
  MoreHorizontal,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  X,
  AlertTriangle,
} from "lucide-react";
import {
  platforms,
  platformStatuses,
  platformTypes,
  integrationTypes,
} from "@/mock/platforms";

type Platform = (typeof platforms)[number];

function StatusBadge({ status }: { status: string }) {
  const color =
    status === "사용중"
      ? "bg-green-50 text-green-700"
      : "bg-red-50 text-red-700";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${color}`}>
      {status}
    </span>
  );
}

function TypeBadge({ type }: { type: string }) {
  const color =
    type === "오픈마켓"
      ? "bg-green-50 text-green-700"
      : type === "종합몰"
      ? "bg-blue-50 text-blue-700"
      : type === "자사몰"
      ? "bg-purple-50 text-purple-700"
      : type === "오프라인"
      ? "bg-orange-50 text-orange-700"
      : "bg-slate-100 text-slate-600";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${color}`}>
      {type}
    </span>
  );
}

function PlatformDrawer({
  open,
  mode,
  platform,
  onClose,
}: {
  open: boolean;
  mode: "create" | "edit";
  platform: Platform | null;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/20">
      <aside className="flex h-full w-[520px] flex-col bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900">
              플랫폼 {mode === "create" ? "등록" : "수정"}
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              플랫폼 정보를 수정하고 관리할 수 있습니다.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          <div className="mb-5 flex gap-8 border-b border-slate-200">
            <button className="border-b-2 border-blue-600 px-4 pb-3 text-sm font-bold text-blue-600">
              기본 정보
            </button>
            <button className="px-4 pb-3 text-sm font-bold text-slate-500">
              연동 정보
            </button>
          </div>

          <div className="space-y-5">
            <div>
              <div className="mb-2 flex justify-between">
                <label className="text-sm font-bold text-slate-700">
                  플랫폼명 <span className="text-red-500">*</span>
                </label>
                <span className="text-xs text-slate-400">
                  {platform?.platformName.length ?? 0}/100
                </span>
              </div>
              <input
                defaultValue={platform?.platformName ?? ""}
                placeholder="플랫폼명을 입력하세요"
                className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <div className="mb-2 flex justify-between">
                <label className="text-sm font-bold text-slate-700">
                  플랫폼 코드 <span className="text-red-500">*</span>
                </label>
                <span className="text-xs text-slate-400">
                  {platform?.platformCode.length ?? 0}/50
                </span>
              </div>
              <input
                defaultValue={platform?.platformCode ?? ""}
                placeholder="PLATFORM_CODE"
                className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                플랫폼 유형 <span className="text-red-500">*</span>
              </label>
              <select
                defaultValue={platform?.platformType ?? "오픈마켓"}
                className="h-11 w-1/2 rounded-lg border border-slate-200 px-4 text-sm outline-none focus:border-blue-500"
              >
                {platformTypes.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
              <p className="mt-2 text-xs text-slate-400">
                플랫폼의 유형을 선택하세요.
              </p>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                연동 방식 <span className="text-red-500">*</span>
              </label>
              <select
                defaultValue={platform?.integrationType ?? "API"}
                className="h-11 w-1/2 rounded-lg border border-slate-200 px-4 text-sm outline-none focus:border-blue-500"
              >
                {integrationTypes.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
              <p className="mt-2 text-xs text-slate-400">
                판매/재고 연동 방식을 선택하세요.
              </p>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                수수료율 <span className="text-red-500">*</span>
              </label>
              <div className="flex h-11 w-1/2 overflow-hidden rounded-lg border border-slate-200">
                <input
                  defaultValue={platform?.feeRate ?? "0.00"}
                  placeholder="0.00"
                  className="h-full flex-1 px-4 text-sm outline-none"
                />
                <div className="flex w-12 items-center justify-center border-l border-slate-200 bg-slate-50 text-sm font-bold text-slate-500">
                  %
                </div>
              </div>
              <p className="mt-2 text-xs text-slate-400">
                정산 시 적용되는 수수료율을 입력하세요.
              </p>
            </div>

            <div>
              <label className="mb-3 block text-sm font-bold text-slate-700">
                상태 <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-6 text-sm font-semibold text-slate-700">
                {["사용중", "비활성"].map((item) => (
                  <label key={item} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="platform-status"
                      defaultChecked={(platform?.status ?? "사용중") === item}
                      className="h-4 w-4"
                    />
                    {item}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-2 flex justify-between">
                <label className="text-sm font-bold text-slate-700">메모</label>
                <span className="text-xs text-slate-400">0/300</span>
              </div>
              <textarea
                placeholder="메모를 입력하세요 (선택)"
                className="h-28 w-full resize-none rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
              />
            </div>

            {mode === "edit" && (
              <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
                <div className="mb-2 flex items-center gap-2 font-extrabold">
                  <AlertTriangle size={16} />
                  플랫폼 삭제 주의
                </div>
                <p className="leading-6">
                  플랫폼을 삭제하면 해당 플랫폼의 판매 내역 및 연동 정보가
                  조회되지 않을 수 있습니다. 삭제 전 반드시 데이터를 확인해주세요.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-slate-100 px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-7 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50"
          >
            취소
          </button>

          {mode === "edit" && (
            <button className="rounded-lg border border-red-200 px-7 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50">
              삭제
            </button>
          )}

          <button
            onClick={onClose}
            className="rounded-lg bg-blue-600 px-7 py-2.5 text-sm font-bold text-white hover:bg-blue-700"
          >
            저장
          </button>
        </div>
      </aside>
    </div>
  );
}

export default function PlatformsPage() {
  const [platformName, setPlatformName] = useState("");
  const [platformCode, setPlatformCode] = useState("");
  const [status, setStatus] = useState("전체");

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<"create" | "edit">("create");
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(
    null
  );

  const filteredPlatforms = useMemo(() => {
    return platforms.filter((platform) => {
      return (
        platform.platformName
          .toLowerCase()
          .includes(platformName.toLowerCase()) &&
        platform.platformCode
          .toLowerCase()
          .includes(platformCode.toLowerCase()) &&
        (status === "전체" || platform.status === status)
      );
    });
  }, [platformName, platformCode, status]);

  const openCreateDrawer = () => {
    setDrawerMode("create");
    setSelectedPlatform(null);
    setDrawerOpen(true);
  };

  const openEditDrawer = (platform: Platform) => {
    setDrawerMode("edit");
    setSelectedPlatform(platform);
    setDrawerOpen(true);
  };

  const resetFilters = () => {
    setPlatformName("");
    setPlatformCode("");
    setStatus("전체");
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              플랫폼 목록
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              등록된 플랫폼 정보를 조회하고 관리할 수 있습니다.
            </p>
          </div>

          <div className="flex gap-3">
            <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm">
              <Download size={16} />
              엑셀 다운로드
            </button>
            <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm">
              <Filter size={16} />
              필터
            </button>
            <button
              onClick={openCreateDrawer}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white shadow-sm"
            >
              <Plus size={18} />
              플랫폼 등록
            </button>
          </div>
        </div>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid grid-cols-[1fr_1fr_1fr_auto_auto] gap-4">
            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                플랫폼명
              </label>
              <input
                value={platformName}
                onChange={(e) => setPlatformName(e.target.value)}
                placeholder="플랫폼명을 입력하세요"
                className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                플랫폼 코드
              </label>
              <input
                value={platformCode}
                onChange={(e) => setPlatformCode(e.target.value)}
                placeholder="플랫폼 코드를 입력하세요"
                className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                상태
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none focus:border-blue-500"
              >
                {platformStatuses.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button className="flex h-11 items-center gap-2 rounded-lg bg-[#071d49] px-6 text-sm font-bold text-white">
                <Search size={16} />
                검색
              </button>
            </div>

            <div className="flex items-end">
              <button
                onClick={resetFilters}
                className="flex h-11 items-center gap-2 rounded-lg border border-slate-200 bg-white px-5 text-sm font-bold text-slate-700"
              >
                <RotateCcw size={16} />
                초기화
              </button>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-bold text-slate-700">
              전체 {filteredPlatforms.length.toLocaleString()}건
            </p>

            <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600">
              20개씩 보기
              <ChevronDown size={16} />
            </button>
          </div>

          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-xs text-slate-500">
              <tr>
                <th className="px-4 py-4 text-left">
                  <input type="checkbox" />
                </th>
                <th className="px-4 py-4 text-center">No.</th>
                <th className="px-4 py-4 text-left">플랫폼명</th>
                <th className="px-4 py-4 text-left">플랫폼 코드</th>
                <th className="px-4 py-4 text-left">플랫폼 유형</th>
                <th className="px-4 py-4 text-left">연동 방식</th>
                <th className="px-4 py-4 text-left">수수료율</th>
                <th className="px-4 py-4 text-center">상태</th>
                <th className="px-4 py-4 text-center">등록일</th>
                <th className="px-4 py-4 text-center">관리</th>
              </tr>
            </thead>

            <tbody>
              {filteredPlatforms.map((platform) => (
                <tr key={platform.id} className="border-t border-slate-100">
                  <td className="px-4 py-4">
                    <input type="checkbox" />
                  </td>
                  <td className="px-4 py-4 text-center">{platform.id}</td>
                  <td className="px-4 py-4 font-bold">
                    {platform.platformName}
                  </td>
                  <td className="px-4 py-4">{platform.platformCode}</td>
                  <td className="px-4 py-4">
                    <TypeBadge type={platform.platformType} />
                  </td>
                  <td className="px-4 py-4">{platform.integrationType}</td>
                  <td className="px-4 py-4">{platform.feeRate}%</td>
                  <td className="px-4 py-4 text-center">
                    <StatusBadge status={platform.status} />
                  </td>
                  <td className="px-4 py-4 text-center">
                    {platform.createdAt}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex justify-center gap-3 text-slate-400">
                      <button
                        onClick={() => openEditDrawer(platform)}
                        className="hover:text-blue-600"
                      >
                        <Pencil size={16} />
                      </button>
                      <MoreHorizontal size={18} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-5 flex items-center justify-center gap-2">
            <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-400">
              <ChevronsLeft size={16} />
            </button>
            <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-400">
              <ChevronLeft size={16} />
            </button>
            {[1, 2].map((page) => (
              <button
                key={page}
                className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-bold ${
                  page === 1
                    ? "bg-blue-600 text-white"
                    : "border border-slate-200 text-slate-600"
                }`}
              >
                {page}
              </button>
            ))}
            <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600">
              <ChevronRight size={16} />
            </button>
          </div>
        </section>
      </div>

      <PlatformDrawer
        open={drawerOpen}
        mode={drawerMode}
        platform={selectedPlatform}
        onClose={() => setDrawerOpen(false)}
      />
    </>
  );
}