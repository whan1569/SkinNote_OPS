import { X } from "lucide-react";

import {
  ACTIVE_INTEGRATION_TYPES,
  PLATFORM_ACTIVE_STATUSES,
  PLATFORM_ACTIVE_TYPES,
  SETTLEMENT_CYCLES,
} from "../features/constants";

import type {
  Platform,
  PlatformDrawerMode,
} from "../features/types";

type Props = {
  open: boolean;
  mode: PlatformDrawerMode;
  platform: Platform | null;
  onClose: () => void;
};

export function PlatformDrawer({
  open,
  mode,
  platform,
  onClose,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/30">
      <div className="h-full w-[560px] overflow-y-auto bg-white shadow-xl">
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-extrabold text-slate-900">
                {mode === "create"
                  ? "플랫폼 등록"
                  : "플랫폼 수정"}
              </h3>

              <p className="mt-1 text-xs text-slate-400">
                플랫폼 운영 및 정산 정보를 입력하세요.
              </p>
            </div>

            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-700"
            >
              <X size={20} />
            </button>
          </div>

          <div className="mt-6 space-y-5">
            <Field label="플랫폼명" required>
              <input
                defaultValue={platform?.platformName ?? ""}
                placeholder="플랫폼명을 입력하세요"
                className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none"
              />
            </Field>

            <Field label="플랫폼 코드" required>
              <input
                defaultValue={platform?.platformCode ?? ""}
                placeholder="예: NAVER_STORE"
                className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none"
              />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="플랫폼 유형" required>
                <select
                  defaultValue={platform?.type ?? "오픈마켓"}
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none"
                >
                  {PLATFORM_ACTIVE_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="연동 방식" required>
                <select
                  defaultValue={
                    platform?.integrationType ?? "API"
                  }
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none"
                >
                  {ACTIVE_INTEGRATION_TYPES.map(
                    (integrationType) => (
                      <option
                        key={integrationType}
                        value={integrationType}
                      >
                        {integrationType}
                      </option>
                    ),
                  )}
                </select>
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Field label="담당자명">
                <input
                  defaultValue={platform?.managerName ?? ""}
                  placeholder="담당자명 입력"
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none"
                />
              </Field>

              <Field label="담당자 연락처">
                <input
                  defaultValue={platform?.managerPhone ?? ""}
                  placeholder="010-0000-0000"
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none"
                />
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Field label="정산 주기">
                <select
                  defaultValue={
                    platform?.settlementCycle ?? "월말 정산"
                  }
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none"
                >
                  {SETTLEMENT_CYCLES.map((cycle) => (
                    <option key={cycle} value={cycle}>
                      {cycle}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="수수료율 (%)">
                <input
                  type="number"
                  step="0.1"
                  defaultValue={platform?.commissionRate ?? ""}
                  placeholder="0"
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none"
                />
              </Field>
            </div>

            <Field label="상태" required>
              <div className="flex gap-8">
                {PLATFORM_ACTIVE_STATUSES.map((status) => (
                  <label
                    key={status}
                    className="flex items-center gap-2 text-sm font-bold text-slate-700"
                  >
                    <input
                      type="radio"
                      name="status"
                      defaultChecked={
                        (platform?.status ?? "사용중") === status
                      }
                      className="h-4 w-4"
                    />

                    {status}
                  </label>
                ))}
              </div>
            </Field>

            <Field label="메모">
              <textarea
                placeholder="메모를 입력하세요"
                className="h-28 w-full resize-none rounded-md border border-slate-200 px-3 py-2 text-sm outline-none"
              />
            </Field>
          </div>
        </div>

        <div className="sticky bottom-0 flex justify-end gap-3 border-t border-slate-100 bg-white p-5">
          <button
            onClick={onClose}
            className="w-24 rounded-md border border-slate-200 py-2 text-sm font-bold text-slate-700"
          >
            취소
          </button>

          {mode === "edit" && (
            <button className="w-24 rounded-md border border-red-300 py-2 text-sm font-bold text-red-500">
              삭제
            </button>
          )}

          <button className="w-28 rounded-md bg-blue-600 py-2 text-sm font-bold text-white">
            저장
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-extrabold text-slate-700">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      {children}
    </div>
  );
}
