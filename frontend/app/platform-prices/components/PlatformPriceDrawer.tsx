import { X } from "lucide-react";

import {
  PLATFORM_ACTIVE_SALE_STATUSES,
  PLATFORM_PRICE_PLATFORMS,
} from "../features/constants";
import type {
  PlatformPrice,
  PlatformPriceDrawerMode,
} from "../features/types";

type Props = {
  open: boolean;
  mode: PlatformPriceDrawerMode;
  item: PlatformPrice | null;
  onClose: () => void;
};

export function PlatformPriceDrawer({
  open,
  mode,
  item,
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
                {mode === "create" ? "플랫폼 판매가 등록" : "플랫폼 판매가 수정"}
              </h3>
              <p className="mt-1 text-xs text-slate-400">
                플랫폼별 판매가와 할인 정보를 입력하세요.
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
            <Field label="상품명" required>
              <input
                defaultValue={item?.productName ?? ""}
                placeholder="상품명을 입력하세요"
                className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none"
              />
            </Field>

            <Field label="SKU" required>
              <input
                defaultValue={item?.sku ?? ""}
                placeholder="SKU를 입력하세요"
                className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none"
              />
            </Field>

            <Field label="플랫폼" required>
              <select
                defaultValue={item?.platform ?? "네이버 스마트스토어"}
                className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none"
              >
                {PLATFORM_PRICE_PLATFORMS.filter(
                  (platform) => platform !== "전체",
                ).map((platform) => (
                  <option key={platform} value={platform}>
                    {platform}
                  </option>
                ))}
              </select>
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="판매가" required>
                <input
                  type="number"
                  defaultValue={item?.sellingPrice ?? ""}
                  placeholder="0"
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none"
                />
              </Field>

              <Field label="할인가">
                <input
                  type="number"
                  defaultValue={item?.discountedPrice ?? ""}
                  placeholder="0"
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none"
                />
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Field label="할인 시작일">
                <input
                  type="date"
                  defaultValue={item?.discountStartDate ?? ""}
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none"
                />
              </Field>

              <Field label="할인 종료일">
                <input
                  type="date"
                  defaultValue={item?.discountEndDate ?? ""}
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none"
                />
              </Field>
            </div>

            <Field label="판매 상태" required>
              <div className="flex gap-8">
                {PLATFORM_ACTIVE_SALE_STATUSES.map((status) => (
                  <label
                    key={status}
                    className="flex items-center gap-2 text-sm font-bold text-slate-700"
                  >
                    <input
                      type="radio"
                      name="status"
                      defaultChecked={(item?.status ?? "판매중") === status}
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
