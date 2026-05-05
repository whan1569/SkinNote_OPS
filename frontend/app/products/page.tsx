"use client";

import { useMemo, useState } from "react";
import {
  Download,
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
} from "lucide-react";
import {
  products,
  productCategories,
  productStatuses,
  productSuppliers,
} from "@/mock/products";

type Product = (typeof products)[number];

function CategoryBadge({ category }: { category: string }) {
  const color =
    category === "스킨케어"
      ? "bg-blue-50 text-blue-700"
      : category === "클렌징"
      ? "bg-teal-50 text-teal-700"
      : category === "선케어"
      ? "bg-orange-50 text-orange-700"
      : category === "마스크팩"
      ? "bg-purple-50 text-purple-700"
      : "bg-cyan-50 text-cyan-700";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${color}`}>
      {category}
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  const color =
    status === "판매중"
      ? "bg-green-50 text-green-700"
      : status === "품절"
      ? "bg-red-50 text-red-700"
      : "bg-slate-100 text-slate-600";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${color}`}>
      {status}
    </span>
  );
}

function ProductDrawer({
  open,
  mode,
  product,
  onClose,
}: {
  open: boolean;
  mode: "create" | "edit";
  product: Product | null;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/20">
      <aside className="flex h-full w-[520px] flex-col bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900">
              상품 등록/수정
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              상품 정보를 입력하고 저장하세요.
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
              상세 정보
            </button>
          </div>

          <div className="space-y-5">
            <div>
              <div className="mb-2 flex justify-between">
                <label className="text-sm font-bold text-slate-700">
                  상품명 <span className="text-red-500">*</span>
                </label>
                <span className="text-xs text-slate-400">
                  {product?.productName.length ?? 0}/100
                </span>
              </div>
              <input
                defaultValue={product?.productName ?? ""}
                placeholder="상품명을 입력하세요"
                className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <div className="mb-2 flex justify-between">
                <label className="text-sm font-bold text-slate-700">
                  SKU <span className="text-red-500">*</span>
                </label>
                <span className="text-xs text-slate-400">
                  {product?.sku.length ?? 0}/50
                </span>
              </div>
              <input
                defaultValue={product?.sku ?? ""}
                placeholder="SKU를 입력하세요"
                className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  카테고리 <span className="text-red-500">*</span>
                </label>
                <select
                  defaultValue={product?.category ?? "스킨케어"}
                  className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none focus:border-blue-500"
                >
                  {productCategories
                    .filter((item) => item !== "전체")
                    .map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  브랜드
                </label>
                <input
                  placeholder="브랜드를 입력하세요 (선택)"
                  className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                공급처 <span className="text-red-500">*</span>
              </label>
              <select
                defaultValue={product?.supplier ?? "한국코스메틱"}
                className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none focus:border-blue-500"
              >
                {productSuppliers
                  .filter((item) => item !== "전체")
                  .map((item) => (
                    <option key={item}>{item}</option>
                  ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  원산지
                </label>
                <select className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none focus:border-blue-500">
                  <option>대한민국</option>
                  <option>일본</option>
                  <option>중국</option>
                  <option>미국</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  단위 <span className="text-red-500">*</span>
                </label>
                <select
                  defaultValue={product?.unit ?? "개"}
                  className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none focus:border-blue-500"
                >
                  <option>개</option>
                  <option>box</option>
                  <option>set</option>
                  <option>ea</option>
                </select>
              </div>
            </div>

            <div>
              <label className="mb-3 block text-sm font-bold text-slate-700">
                상태 <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-6 text-sm font-semibold text-slate-700">
                {["판매중", "품절", "판매중지"].map((item) => (
                  <label key={item} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="status"
                      defaultChecked={(product?.status ?? "판매중") === item}
                      className="h-4 w-4"
                    />
                    {item}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                기본 이미지
              </label>

              <div className="rounded-xl border border-dashed border-slate-300 p-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-24 w-24 items-center justify-center rounded-lg bg-slate-100 text-xs text-slate-400">
                    IMAGE
                  </div>

                  <div>
                    <button className="rounded-lg border border-blue-200 px-4 py-2 text-sm font-bold text-blue-600 hover:bg-blue-50">
                      이미지 변경
                    </button>
                    <p className="mt-2 text-xs text-slate-400">
                      권장 사이즈: 600x600px / JPG, PNG (최대 5MB)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="mb-2 flex justify-between">
                <label className="text-sm font-bold text-slate-700">메모</label>
                <span className="text-xs text-slate-400">0/200</span>
              </div>
              <textarea
                placeholder="메모를 입력하세요 (선택)"
                className="h-24 w-full resize-none rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
              />
            </div>
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

export default function ProductsPage() {
  const [productName, setProductName] = useState("");
  const [sku, setSku] = useState("");
  const [category, setCategory] = useState("전체");
  const [supplier, setSupplier] = useState("전체");
  const [status, setStatus] = useState("전체");

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<"create" | "edit">("create");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      return (
        product.productName.toLowerCase().includes(productName.toLowerCase()) &&
        product.sku.toLowerCase().includes(sku.toLowerCase()) &&
        (category === "전체" || product.category === category) &&
        (supplier === "전체" || product.supplier === supplier) &&
        (status === "전체" || product.status === status)
      );
    });
  }, [productName, sku, category, supplier, status]);

  const openCreateDrawer = () => {
    setDrawerMode("create");
    setSelectedProduct(null);
    setDrawerOpen(true);
  };

  const openEditDrawer = (product: Product) => {
    setDrawerMode("edit");
    setSelectedProduct(product);
    setDrawerOpen(true);
  };

  const resetFilters = () => {
    setProductName("");
    setSku("");
    setCategory("전체");
    setSupplier("전체");
    setStatus("전체");
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              상품 목록
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              등록된 상품 목록을 조회하고 관리할 수 있습니다.
            </p>
          </div>

          <div className="flex gap-3">
            <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm">
              <Download size={16} />
              엑셀 다운로드
            </button>
            <button
              onClick={openCreateDrawer}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white shadow-sm"
            >
              <Plus size={18} />
              상품 등록
            </button>
          </div>
        </div>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_auto_auto] gap-4">
            <input
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="상품명을 입력하세요"
              className="h-11 rounded-lg border border-slate-200 px-4 text-sm"
            />
            <input
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              placeholder="SKU를 입력하세요"
              className="h-11 rounded-lg border border-slate-200 px-4 text-sm"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="h-11 rounded-lg border border-slate-200 px-4 text-sm"
            >
              {productCategories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
            <select
              value={supplier}
              onChange={(e) => setSupplier(e.target.value)}
              className="h-11 rounded-lg border border-slate-200 px-4 text-sm"
            >
              {productSuppliers.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="h-11 rounded-lg border border-slate-200 px-4 text-sm"
            >
              {productStatuses.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
            <button className="flex h-11 items-center gap-2 rounded-lg bg-[#071d49] px-6 text-sm font-bold text-white">
              <Search size={16} />
              검색
            </button>
            <button
              onClick={resetFilters}
              className="flex h-11 items-center gap-2 rounded-lg border border-slate-200 bg-white px-5 text-sm font-bold text-slate-700"
            >
              <RotateCcw size={16} />
              초기화
            </button>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-bold text-slate-700">
              전체 {filteredProducts.length.toLocaleString()}건
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
                <th className="px-4 py-4 text-left">상품명</th>
                <th className="px-4 py-4 text-left">SKU</th>
                <th className="px-4 py-4 text-left">카테고리</th>
                <th className="px-4 py-4 text-left">공급처</th>
                <th className="px-4 py-4 text-right">판매가</th>
                <th className="px-4 py-4 text-center">상태</th>
                <th className="px-4 py-4 text-center">등록일</th>
                <th className="px-4 py-4 text-center">관리</th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-t border-slate-100">
                  <td className="px-4 py-4">
                    <input type="checkbox" />
                  </td>
                  <td className="px-4 py-4 text-center">{product.id}</td>
                  <td className="px-4 py-4 font-bold">
                    {product.productName}
                  </td>
                  <td className="px-4 py-4">{product.sku}</td>
                  <td className="px-4 py-4">
                    <CategoryBadge category={product.category} />
                  </td>
                  <td className="px-4 py-4">{product.supplier}</td>
                  <td className="px-4 py-4 text-right">
                    {product.availableStock.toLocaleString()}
                  </td>
                  <td className="px-4 py-4 text-center">
                    <StatusBadge status={product.status} />
                  </td>
                  <td className="px-4 py-4 text-center">
                    {product.createdAt}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex justify-center gap-3 text-slate-400">
                      <button
                        onClick={() => openEditDrawer(product)}
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
            {[1, 2, 3, 4, 5].map((page) => (
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
            <span className="px-2 text-slate-400">...</span>
            <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-sm font-bold text-slate-600">
              63
            </button>
            <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600">
              <ChevronRight size={16} />
            </button>
          </div>
        </section>
      </div>

      <ProductDrawer
        open={drawerOpen}
        mode={drawerMode}
        product={selectedProduct}
        onClose={() => setDrawerOpen(false)}
      />
    </>
  );
}