import { X } from "lucide-react";
import {
  ACTIVE_INTEGRATION_TYPES,
  PLATFORM_ACTIVE_STATUSES,
  PLATFORM_ACTIVE_TYPES,
} from "../features/constants";
import type { Platform, PlatformDrawerMode } from "../features/types";

type Props = {
  open: boolean;
  mode: PlatformDrawerMode;
  platform: Platform | null;
  onClose: () => void;
};

export function PlatformDrawer({ open, mode, platform, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/30">
      <div className="h-full w-[520px] overflow-y-auto bg-white shadow-xl">
        <div className="sticky top-0 flex items-center justify-between border-b border-slate-100 bg-white p-5">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900">
              {mode === "create" ? "플랫폼 등록" : "플랫폼 수정"}
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              플랫폼 운영 및 정산 정보를 입력하세요.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6 p-5">
          <div className="grid grid-cols-2 gap-4">
            <Field label="플랫폼명" required>
              <input
                defaultValue={platform?.platformName ?? ""}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none"
              />
            </Field>

            <Field label="플랫폼 코드" required>
              <input
                defaultValue={platform?.platformCode ?? ""}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none"
              />
            </Field>

            <Field label="플랫폼 유형" required>
              <select
                defaultValue={platform?.type ?? PLATFORM_ACTIVE_TYPES[0]}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none"
              >
                {PLATFORM_ACTIVE_TYPES.map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </select>
            </Field>

            <Field label="연동 방식" required>
              <select
                defaultValue={
                  platform?.integrationType ?? ACTIVE_INTEGRATION_TYPES[0]
                }
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none"
              >
                {ACTIVE_INTEGRATION_TYPES.map((integrationType) => (
                  <option key={integrationType}>{integrationType}</option>
                ))}
              </select>
            </Field>

            <Field label="담당자명">
              <input
                defaultValue={platform?.managerName ?? ""}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none"
              />
            </Field>

            <Field label="담당자 연락처">
              <input
                defaultValue={platform?.managerPhone ?? ""}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none"
              />
            </Field>

            <Field label="정산일" required>
              <input
                type="date"
                defaultValue={platform?.settlementDate ?? ""}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none"
              />
            </Field>

            <Field label="수수료율" required>
              <div className="flex items-center rounded-lg border border-slate-200 px-3 py-2">
                <input
                  type="number"
                  step="0.01"
                  defaultValue={platform?.commissionRate ?? 0}
                  className="w-full text-sm outline-none"
                />
                <span className="text-sm font-bold text-slate-500">%</span>
              </div>
            </Field>

            <Field label="상태" required>
              <select
                defaultValue={platform?.status ?? PLATFORM_ACTIVE_STATUSES[0]}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none"
              >
                {PLATFORM_ACTIVE_STATUSES.map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>
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
