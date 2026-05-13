"use client";

import { useEffect, useMemo, useState } from "react";
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
  const [filter, setFilter] = useState<ProductFilterType>(initialFilter);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] =
    useState<ProductDrawerMode>("create");
  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error(error);
        setError("상품 목록을 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchProductName = product.productName
        .toLowerCase()
        .includes(filter.productName.toLowerCase());

      const matchSku = product.sku
        .toLowerCase()
        .includes(filter.sku.toLowerCase());

      const matchCategory =
        filter.category === "전체" ||
        product.category === filter.category;

      return matchProductName && matchSku && matchCategory;
    });
  }, [products, filter]);

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
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              상품 등록
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              판매할 상품을 등록하고 기본 정보를 관리합니다.
            </p>
          </div>

          <div className="flex gap-2">
            <button className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">
              <Download size={16} />
              엑셀 다운로드
            </button>

            <button
              onClick={openCreateDrawer}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              <Plus size={16} />
              상품 등록
            </button>
          </div>
        </div>

        <ProductFilter
          filter={filter}
          onChange={setFilter}
          onReset={() => setFilter(initialFilter)}
        />

        {loading && (
          <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
            상품 목록을 불러오는 중입니다.
          </div>
        )}

        {!loading && error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center text-sm text-red-600">
            {error}
          </div>
        )}

        {!loading && !error && (
          <ProductTable
            products={filteredProducts}
            onEdit={openEditDrawer}
          />
        )}
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
