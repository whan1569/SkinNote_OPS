"use client";

import { useMemo, useState } from "react";
import { Download, Plus } from "lucide-react";

import { ProductDrawer } from "./components/ProductDrawer";
import { ProductFilter } from "./components/ProductFilter";
import { ProductTable } from "./components/ProductTable";

import { getProducts } from "./features/api";

import type {
  Product,
  ProductDrawerMode,
  ProductFilter as ProductFilterType,
} from "./features/types";

const initialFilter: ProductFilterType = {
  productName: "",
  sku: "",
  category: "전체",
};

export default function ProductsPage() {
  const [filter, setFilter] =
    useState<ProductFilterType>(initialFilter);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [drawerMode, setDrawerMode] =
    useState<ProductDrawerMode>("create");

  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  const filteredProducts = useMemo(() => {
    return getProducts(filter);
  }, [filter]);

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

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              상품 등록
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              판매할 상품을 등록하고 기본 정보를 관리합니다.
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

        <ProductFilter
          filter={filter}
          onChange={setFilter}
          onReset={() => setFilter(initialFilter)}
        />

        <ProductTable products={filteredProducts} />
      </div>

      <ProductDrawer
        open={drawerOpen}
        mode={drawerMode}
        product={selectedProduct}
        onClose={closeDrawer}
      />
    </>
  );
}
