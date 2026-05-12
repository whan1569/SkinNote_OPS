import { X } from "lucide-react";

import {
  ORIGIN_COUNTRIES,
  PRODUCT_ACTIVE_CATEGORIES,
} from "../features/constants";

import type {
  Product,
  ProductDrawerMode,
} from "../features/types";

type Props = {
  open: boolean;
  mode: ProductDrawerMode;
  product: Product | null;
  onClose: () => void;
};

export function ProductDrawer({
  open,
  mode,
  product,
  onClose,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/20">
      <aside className="flex h-full w-[520px] flex-col bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900">
              {mode === "create" ? "상품 등록" : "상품 수정"}
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              판매할 상품의 기본 정보를 등록하세요.
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
          <div className="space-y-5">
            <Field
              label="상품명"
              required
              count={`${product?.productName.length ?? 0}/100`}
            >
              <input
                defaultValue={product?.productName ?? ""}
                placeholder="상품명을 입력하세요"
                className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none focus:border-blue-500"
              />
            </Field>

            <Field
              label="SKU"
              required
              count={`${product?.sku.length ?? 0}/50`}
            >
              <input
                defaultValue={product?.sku ?? ""}
                placeholder="SKU를 입력하세요"
                className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none focus:border-blue-500"
              />
            </Field>

            <Field label="카테고리" required>
              <select
                defaultValue={product?.category ?? "스킨케어"}
                className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none focus:border-blue-500"
              >
                {PRODUCT_ACTIVE_CATEGORIES.map((category) => (
                  <option key={category}>{category}</option>
                ))}
              </select>
            </Field>

            <Field label="브랜드">
              <input
                placeholder="브랜드를 입력하세요"
                className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none focus:border-blue-500"
              />
            </Field>

            <Field label="원산지">
              <select className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none focus:border-blue-500">
                {ORIGIN_COUNTRIES.map((country) => (
                  <option key={country}>{country}</option>
                ))}
              </select>
            </Field>

            <Field label="메모" count="0/200">
              <textarea
                placeholder="메모를 입력하세요"
                className="h-24 w-full resize-none rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
              />
            </Field>
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
            <button className="rounded-lg border border-red-300 px-7 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50">
              삭제
            </button>
          )}

          <button
            onClick={onClose}
            className="rounded-lg bg-blue-600 px-7 py-2.5 text-sm font-bold text-white hover:bg-blue-700"
          >
            {mode === "create" ? "등록" : "수정"}
          </button>
        </div>
      </aside>
    </div>
  );
}

function Field({
  label,
  required,
  count,
  children,
}: {
  label: string;
  required?: boolean;
  count?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-2 flex justify-between">
        <label className="text-sm font-bold text-slate-700">
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>

        {count && <span className="text-xs text-slate-400">{count}</span>}
      </div>

      {children}
    </div>
  );
}
