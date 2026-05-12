import { X } from "lucide-react";
import type { ReactNode } from "react";

import { SUPPLIER_OPTIONS } from "../features/constants";
import type {
  SupplierPrice,
  SupplierPriceDrawerMode,
} from "../features/types";

type Props = {
  open: boolean;
  mode: SupplierPriceDrawerMode;
  item: SupplierPrice | null;
  onClose: () => void;
};

export function SupplierPriceDrawer({ open, mode, item, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/30">
      <div className="flex h-full w-[480px] flex-col bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-100 p-5">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900">
              {mode === "create" ? "공급 단가 등록" : "공급 단가 수정"}
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              공급처별 상품 단가 정보를 입력하세요.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 space-y-5 overflow-y-auto p-5">
          <Field label="상품명" required>
            <input
              defaultValue={item?.productName ?? ""}
              placeholder="상품명을 입력하세요"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none"
            />
          </Field>

          <Field label="SKU" required>
            <input
              defaultValue={item?.sku ?? ""}
              placeholder="SKU를 입력하세요"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none"
            />
          </Field>

          <Field label="공급처" required>
            <select
              defaultValue={item?.supplierName ?? ""}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none"
            >
              <option value="" disabled>
                공급처 선택
              </option>
              {SUPPLIER_OPTIONS.filter((supplier) => supplier !== "전체").map(
                (supplier) => (
                  <option key={supplier} value={supplier}>
                    {supplier}
                  </option>
                ),
              )}
            </select>
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="공급가" required>
              <input
                type="number"
                defaultValue={item?.supplyPrice ?? ""}
                placeholder="0"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none"
              />
            </Field>

            <Field label="MOQ" required>
              <input
                type="number"
                defaultValue={item?.moq ?? ""}
                placeholder="0"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none"
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
