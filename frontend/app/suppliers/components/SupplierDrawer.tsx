import { X } from "lucide-react";

import {
  PAYMENT_TERMS,
  SUPPLIER_ACTIVE_STATUSES,
} from "../features/constants";
import type {
  Supplier,
  SupplierDrawerMode,
} from "../features/types";

type Props = {
  open: boolean;
  mode: SupplierDrawerMode;
  supplier: Supplier | null;
  onClose: () => void;
};

export function SupplierDrawer({
  open,
  mode,
  supplier,
  onClose,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/30">
      <div className="h-full w-[520px] overflow-y-auto bg-white shadow-xl">
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-extrabold text-slate-900">
                공급처 등록/수정
              </h3>
              <p className="mt-1 text-xs text-slate-400">
                공급처 정보를 입력하고 저장하세요.
              </p>
            </div>

            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-700"
            >
              <X size={20} />
            </button>
          </div>

          <div className="mt-6 border-b border-slate-200">
            <div className="flex gap-8">
              <button className="border-b-2 border-blue-600 pb-3 text-sm font-bold text-blue-600">
                기본 정보
              </button>
              <button className="pb-3 text-sm font-bold text-slate-500">
                상세 정보
              </button>
            </div>
          </div>

          <div className="mt-5 space-y-5">
            <Field label="공급처명" required>
              <div className="relative">
                <input
                  defaultValue={supplier?.supplierName ?? ""}
                  maxLength={100}
                  className="w-full rounded-md border border-slate-200 px-3 py-2 pr-14 text-sm outline-none"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                  {(supplier?.supplierName.length ?? 0)}/100
                </span>
              </div>
            </Field>

            <Field label="담당자명" required>
              <div className="relative">
                <input
                  defaultValue={supplier?.managerName ?? ""}
                  maxLength={50}
                  className="w-full rounded-md border border-slate-200 px-3 py-2 pr-14 text-sm outline-none"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                  {(supplier?.managerName.length ?? 0)}/50
                </span>
              </div>
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="연락처" required>
                <input
                  defaultValue={supplier?.phone ?? ""}
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none"
                />
              </Field>

              <Field label="이메일">
                <input
                  defaultValue={supplier?.email ?? ""}
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none"
                />
              </Field>
            </div>

            <Field label="결제 조건" required>
              <select
                defaultValue={supplier?.paymentTerm ?? PAYMENT_TERMS[0]}
                className="w-[220px] rounded-md border border-slate-200 px-3 py-2 text-sm outline-none"
              >
                {PAYMENT_TERMS.map((term) => (
                  <option key={term} value={term}>
                    {term}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="거래 상태" required>
              <div className="flex gap-8">
                {SUPPLIER_ACTIVE_STATUSES.map((status) => (
                  <label
                    key={status}
                    className="flex items-center gap-2 text-sm font-bold text-slate-700"
                  >
                    <input
                      type="radio"
                      name="status"
                      defaultChecked={
                        (supplier?.status ?? "사용중") === status
                      }
                      className="h-4 w-4"
                    />
                    {status}
                  </label>
                ))}
              </div>
            </Field>

            <Field label="메모">
              <div className="relative">
                <textarea
                  maxLength={300}
                  placeholder="메모를 입력하세요 (선택)"
                  className="h-28 w-full resize-none rounded-md border border-slate-200 px-3 py-2 text-sm outline-none"
                />
                <span className="absolute bottom-3 right-3 text-xs text-slate-400">
                  0/300
                </span>
              </div>
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
