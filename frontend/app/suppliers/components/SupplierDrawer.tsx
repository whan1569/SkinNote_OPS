import type { ReactNode } from "react";
import { X } from "lucide-react";

import { SUPPLIER_ACTIVE_STATUSES } from "../features/constants";
import type { Supplier, SupplierDrawerMode } from "../features/types";

type Props = {
  open: boolean;
  mode: SupplierDrawerMode;
  supplier: Supplier | null;
  onClose: () => void;
};

export function SupplierDrawer({ open, mode, supplier, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/30">
      <div className="h-full w-[520px] overflow-y-auto bg-white shadow-xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white p-5">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900">
              공급처 등록/수정
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              공급처 정보를 입력하고 저장하세요.
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
          <section>
            <h4 className="mb-4 text-sm font-extrabold text-slate-900">
              기본 정보
            </h4>

            <div className="space-y-4">
              <Field label="회사 코드" required>
                <input
                  defaultValue={supplier?.companyCode ?? ""}
                  placeholder="예: SUP-001"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none"
                />
              </Field>

              <Field label="공급처명" required>
                <input
                  defaultValue={supplier?.supplierName ?? ""}
                  placeholder="공급처명을 입력하세요"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none"
                />
                <div className="mt-1 text-right text-xs text-slate-400">
                  {supplier?.supplierName.length ?? 0}/100
                </div>
              </Field>

              <Field label="담당자명" required>
                <input
                  defaultValue={supplier?.managerName ?? ""}
                  placeholder="담당자명을 입력하세요"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none"
                />
                <div className="mt-1 text-right text-xs text-slate-400">
                  {supplier?.managerName.length ?? 0}/50
                </div>
              </Field>

              <Field label="연락처" required>
                <input
                  defaultValue={supplier?.phone ?? ""}
                  placeholder="010-0000-0000"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none"
                />
              </Field>

              <Field label="이메일">
                <input
                  defaultValue={supplier?.email ?? ""}
                  placeholder="email@example.com"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none"
                />
              </Field>
            </div>
          </section>

          <section>
            <h4 className="mb-4 text-sm font-extrabold text-slate-900">
              상세 정보
            </h4>

            <div className="space-y-4">
              <Field label="선금 비중">
                <div className="relative">
                  <input
                    type="number"
                    defaultValue={supplier?.advancePaymentRate ?? 0}
                    min={0}
                    max={100}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 pr-8 text-sm outline-none"
                  />
                  <span className="absolute right-3 top-2 text-sm text-slate-400">
                    %
                  </span>
                </div>
                <p className="mt-1 text-xs text-slate-400">
                  0~100 사이 숫자를 입력하세요.
                </p>
              </Field>

              <Field label="정산일">
                <input
                  type="number"
                  defaultValue={supplier?.settlementDay ?? 30}
                  min={0}
                  max={31}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none"
                />
                <p className="mt-1 text-xs text-slate-400">
                  0 입력 시 유동 정산일로 처리됩니다.
                </p>
              </Field>

              <Field label="상태" required>
                <select
                  defaultValue={supplier?.status ?? "사용중"}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none"
                >
                  {SUPPLIER_ACTIVE_STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="비고">
                <div className="relative">
                  <textarea
                    rows={5}
                    placeholder="비고를 입력하세요"
                    className="w-full resize-none rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none"
                  />
                  <span className="absolute bottom-3 right-3 text-xs text-slate-400">
                    0/300
                  </span>
                </div>
              </Field>
            </div>
          </section>
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
  children: ReactNode;
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
