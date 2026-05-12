"use client";

import { useMemo, useState } from "react";
import {
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  Download,
  List,
  MoreHorizontal,
  Plus,
  RotateCcw,
  Save,
  Search,
  Trash2,
} from "lucide-react";
import {
  purchaseOrders,
  purchaseOrderStatuses,
  purchaseOrderSummary,
} from "@/mock/purchaseOrders";

type PurchaseOrderItem = {
  name: string;
  sku: string;
  price: number;
  orderUnit: string;
  moq: string;
  quantity: number;
  unit: "개" | "박스";
};

type InboundType = "해상" | "항공" | "육상" | "택배" | "직접입고";
type Incoterms = "" | "FOB" | "CIF" | "EXW" | "DDP";

type DrawerForm = {
  supplier: string;
  orderDate: string;
  expectedDate: string;
  paymentTerm: string;
  manager: string;

  warehouse: string;
  inboundType: InboundType;
  incoterms: Incoterms;
  transportCost: number;
  customsBroker: string;
  blNo: string;
  containerNo: string;
  inboundMemo: string;

  memo: string;
};

const initialItems: PurchaseOrderItem[] = [
  {
    name: "선별락 앰플 100ml",
    sku: "COS-CT-100",
    price: 15000,
    orderUnit: "1개",
    moq: "100개",
    quantity: 200,
    unit: "개",
  },
  {
    name: "나이아신아마이드 토너 200ml",
    sku: "COS-NI-200",
    price: 9500,
    orderUnit: "1박스 (24개)",
    moq: "10박스",
    quantity: 20,
    unit: "박스",
  },
  {
    name: "히알루론산 크림 100ml",
    sku: "COS-HA-100",
    price: 12600,
    orderUnit: "1개",
    moq: "50개",
    quantity: 100,
    unit: "개",
  },
];

const productCandidates: PurchaseOrderItem[] = [
  ...initialItems,
  {
    name: "비타민C 세럼 30ml",
    sku: "COS-VC-030",
    price: 8800,
    orderUnit: "1개",
    moq: "100개",
    quantity: 100,
    unit: "개",
  },
  {
    name: "시카 수딩 젤 300ml",
    sku: "COS-CA-300",
    price: 7200,
    orderUnit: "1박스 (20개)",
    moq: "5박스",
    quantity: 5,
    unit: "박스",
  },
];

const formatWon = (value: number) => `${value.toLocaleString()} 원`;

function StatusBadge({ status }: { status: string }) {
  const color =
    status === "발주 대기"
      ? "bg-slate-100 text-slate-600"
      : status === "발주 확정"
        ? "bg-blue-50 text-blue-700"
        : status === "부분 입고"
          ? "bg-orange-50 text-orange-700"
          : status === "입고 완료"
            ? "bg-green-50 text-green-700"
            : "bg-red-50 text-red-700";

  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-extrabold ${color}`}>
      {status}
    </span>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label>
      <span className="mb-2 block text-sm font-bold text-slate-700">{label}</span>
      {children}
    </label>
  );
}

function SummaryRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex justify-between">
      <span className="text-slate-500">{label}</span>
      <b>{formatWon(value)}</b>
    </div>
  );
}

function ProductSelectModal({
  open,
  selectedSkus,
  onClose,
  onAdd,
}: {
  open: boolean;
  selectedSkus: string[];
  onClose: () => void;
  onAdd: (items: PurchaseOrderItem[]) => void;
}) {
  const [keyword, setKeyword] = useState("");
  const [checkedSkus, setCheckedSkus] = useState<string[]>([]);

  const filteredProducts = useMemo(() => {
    const keywordLower = keyword.toLowerCase();

    return productCandidates.filter(
      (product) =>
        product.name.toLowerCase().includes(keywordLower) ||
        product.sku.toLowerCase().includes(keywordLower),
    );
  }, [keyword]);

  if (!open) return null;

  const toggleSku = (sku: string) => {
    setCheckedSkus((prev) =>
      prev.includes(sku) ? prev.filter((item) => item !== sku) : [...prev, sku],
    );
  };

  const handleAdd = () => {
    const newItems = productCandidates
      .filter((product) => checkedSkus.includes(product.sku))
      .filter((product) => !selectedSkus.includes(product.sku));

    onAdd(newItems);
    setCheckedSkus([]);
    setKeyword("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/40 px-4">
      <div className="w-full max-w-3xl rounded-2xl bg-white shadow-2xl">
        <div className="border-b border-slate-200 px-6 py-5">
          <h3 className="text-lg font-extrabold text-slate-900">상품 추가</h3>
          <p className="mt-1 text-sm text-slate-500">발주에 추가할 상품을 선택하세요.</p>
        </div>

        <div className="p-6">
          <div className="mb-4 flex h-11 items-center rounded-lg border border-slate-200 px-4">
            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="상품명 또는 SKU 검색"
              className="flex-1 text-sm outline-none"
            />
            <Search size={16} className="text-slate-400" />
          </div>

          <div className="max-h-[420px] overflow-y-auto rounded-xl border border-slate-200">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-slate-50 text-xs text-slate-500">
                <tr>
                  <th className="px-4 py-3 text-left">선택</th>
                  <th className="px-4 py-3 text-left">상품 정보</th>
                  <th className="px-4 py-3 text-right">공급가</th>
                  <th className="px-4 py-3 text-left">주문 단위</th>
                  <th className="px-4 py-3 text-left">MOQ</th>
                </tr>
              </thead>

              <tbody>
                {filteredProducts.map((product) => {
                  const alreadyAdded = selectedSkus.includes(product.sku);

                  return (
                    <tr key={product.sku} className="border-t border-slate-100">
                      <td className="px-4 py-4">
                        <input
                          type="checkbox"
                          disabled={alreadyAdded}
                          checked={checkedSkus.includes(product.sku) || alreadyAdded}
                          onChange={() => toggleSku(product.sku)}
                        />
                      </td>

                      <td className="px-4 py-4">
                        <p className="font-bold text-slate-800">{product.name}</p>
                        <p className="text-xs text-slate-500">SKU: {product.sku}</p>
                        {alreadyAdded && (
                          <p className="mt-1 text-xs font-bold text-blue-600">이미 추가됨</p>
                        )}
                      </td>

                      <td className="px-4 py-4 text-right font-bold">
                        {formatWon(product.price)}
                      </td>
                      <td className="px-4 py-4 text-slate-600">{product.orderUnit}</td>
                      <td className="px-4 py-4 text-slate-600">{product.moq}</td>
                    </tr>
                  );
                })}

                {filteredProducts.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-12 text-center text-slate-400">
                      검색 결과가 없습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-slate-100 px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-bold text-slate-700"
          >
            취소
          </button>

          <button
            onClick={handleAdd}
            disabled={checkedSkus.length === 0}
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-bold text-white disabled:bg-slate-300"
          >
            선택 상품 추가
          </button>
        </div>
      </div>
    </div>
  );
}

function PurchaseOrderDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [form, setForm] = useState<DrawerForm>({
    supplier: "한국코스메틱",
    orderDate: "2025-05-23",
    expectedDate: "2025-05-30",
    paymentTerm: "월말 30일",
    manager: "admin",

    warehouse: "",
    inboundType: "해상",
    incoterms: "",
    transportCost: 0,
    customsBroker: "",
    blNo: "",
    containerNo: "",
    inboundMemo: "",

    memo: "",
  });

  const [items, setItems] = useState<PurchaseOrderItem[]>(initialItems);
  const [selectedSkus, setSelectedSkus] = useState<string[]>([]);

  const totals = useMemo(() => {
    const supplyTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const vat = Math.floor(supplyTotal * 0.1);
    const grandTotal = supplyTotal + vat + form.transportCost;
    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

    return {
      supplyTotal,
      vat,
      grandTotal,
      totalQuantity,
      itemCount: items.length,
    };
  }, [items, form.transportCost]);

  const canSubmit =
    !!form.supplier &&
    !!form.orderDate &&
    !!form.expectedDate &&
    !!form.warehouse &&
    !!form.inboundType &&
    items.length > 0;

  if (!open) return null;

  const updateItem = (
    sku: string,
    patch: Partial<Pick<PurchaseOrderItem, "quantity" | "unit">>,
  ) => {
    setItems((prev) =>
      prev.map((item) => (item.sku === sku ? { ...item, ...patch } : item)),
    );
  };

  const removeItem = (sku: string) => {
    setItems((prev) => prev.filter((item) => item.sku !== sku));
    setSelectedSkus((prev) => prev.filter((itemSku) => itemSku !== sku));
  };

  const removeSelectedItems = () => {
    setItems((prev) => prev.filter((item) => !selectedSkus.includes(item.sku)));
    setSelectedSkus([]);
  };

  const toggleSelected = (sku: string) => {
    setSelectedSkus((prev) =>
      prev.includes(sku) ? prev.filter((itemSku) => itemSku !== sku) : [...prev, sku],
    );
  };

  const allSelected = items.length > 0 && selectedSkus.length === items.length;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40">
      <aside className="flex h-full w-[min(1180px,calc(100vw-24px))] flex-col bg-slate-50 shadow-2xl">
        <div className="border-b border-slate-200 bg-white px-6 py-5">
          <h3 className="text-xl font-extrabold text-slate-900">발주 등록/수정</h3>
          <p className="mt-1 text-sm text-slate-500">
            공급처에 발주할 상품, 입고 창고, 운송 조건을 입력하고 발주서를 생성합니다.
          </p>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
            <div className="space-y-6">
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h4 className="mb-4 text-base font-extrabold text-slate-900">기본 정보</h4>

                <div className="grid grid-cols-2 gap-4">
                  <Field label="발주번호 *">
                    <input
                      disabled
                      value="자동생성"
                      className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm text-slate-400"
                    />
                  </Field>

                  <Field label="공급처 *">
                    <select
                      value={form.supplier}
                      onChange={(e) => setForm({ ...form, supplier: e.target.value })}
                      className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none"
                    >
                      <option>한국코스메틱</option>
                      <option>뷰티무역</option>
                      <option>글로벌케어</option>
                      <option>서울뷰티</option>
                    </select>
                  </Field>

                  <Field label="발주일 *">
                    <input
                      type="date"
                      value={form.orderDate}
                      onChange={(e) => setForm({ ...form, orderDate: e.target.value })}
                      className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none"
                    />
                  </Field>

                  <Field label="입고 예정일 *">
                    <input
                      type="date"
                      value={form.expectedDate}
                      onChange={(e) => setForm({ ...form, expectedDate: e.target.value })}
                      className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none"
                    />
                  </Field>

                  <Field label="결제 조건">
                    <select
                      value={form.paymentTerm}
                      onChange={(e) => setForm({ ...form, paymentTerm: e.target.value })}
                      className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none"
                    >
                      <option>선입금</option>
                      <option>월말 30일</option>
                      <option>선금 50%</option>
                    </select>
                  </Field>

                  <Field label="담당자">
                    <select
                      value={form.manager}
                      onChange={(e) => setForm({ ...form, manager: e.target.value })}
                      className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none"
                    >
                      <option>admin</option>
                      <option>이관리</option>
                      <option>김과장</option>
                    </select>
                  </Field>

                  <div className="col-span-2">
                    <Field label="메모">
                      <textarea
                        value={form.memo}
                        onChange={(e) => setForm({ ...form, memo: e.target.value })}
                        rows={3}
                        className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none"
                        placeholder="발주 관련 내부 메모를 입력하세요."
                      />
                    </Field>
                  </div>
                </div>
              </section>

              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h4 className="mb-4 text-base font-extrabold text-slate-900">
                  입고/운송 정보
                </h4>

                <div className="grid grid-cols-2 gap-4">
                  <Field label="입고 창고 *">
                    <select
                      value={form.warehouse}
                      onChange={(e) => setForm({ ...form, warehouse: e.target.value })}
                      className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none"
                    >
                      <option value="">창고 선택</option>
                      <option>인천 1창고</option>
                      <option>인천 2창고</option>
                      <option>부산 보세창고</option>
                      <option>김포 물류센터</option>
                      <option>용인 메인창고</option>
                    </select>
                  </Field>

                  <Field label="운송 방식 *">
                    <select
                      value={form.inboundType}
                      onChange={(e) =>
                        setForm({ ...form, inboundType: e.target.value as InboundType })
                      }
                      className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none"
                    >
                      <option>해상</option>
                      <option>항공</option>
                      <option>육상</option>
                      <option>택배</option>
                      <option>직접입고</option>
                    </select>
                  </Field>

                  <Field label="인코텀즈">
                    <select
                      value={form.incoterms}
                      onChange={(e) =>
                        setForm({ ...form, incoterms: e.target.value as Incoterms })
                      }
                      className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none"
                    >
                      <option value="">선택 안 함</option>
                      <option>FOB</option>
                      <option>CIF</option>
                      <option>EXW</option>
                      <option>DDP</option>
                    </select>
                  </Field>

                  <Field label="운송비">
                    <input
                      type="number"
                      min={0}
                      value={form.transportCost}
                      onChange={(e) =>
                        setForm({ ...form, transportCost: Number(e.target.value) || 0 })
                      }
                      className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none"
                    />
                  </Field>

                  <Field label="통관사">
                    <input
                      value={form.customsBroker}
                      onChange={(e) => setForm({ ...form, customsBroker: e.target.value })}
                      placeholder="예: 세관법인명"
                      className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none"
                    />
                  </Field>

                  <Field label="B/L 또는 AWB No.">
                    <input
                      value={form.blNo}
                      onChange={(e) => setForm({ ...form, blNo: e.target.value })}
                      placeholder="선하증권/항공운송장 번호"
                      className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none"
                    />
                  </Field>

                  <Field label="컨테이너 번호">
                    <input
                      value={form.containerNo}
                      onChange={(e) => setForm({ ...form, containerNo: e.target.value })}
                      placeholder="해상 운송 시 입력"
                      className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none"
                    />
                  </Field>

                  <Field label="입고 요청사항">
                    <input
                      value={form.inboundMemo}
                      onChange={(e) => setForm({ ...form, inboundMemo: e.target.value })}
                      placeholder="예: 입고 전 검수 필요, 냉장 보관 필요"
                      className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none"
                    />
                  </Field>
                </div>
              </section>

              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <h4 className="text-base font-extrabold text-slate-900">상품 목록</h4>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setProductModalOpen(true)}
                      className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700"
                    >
                      + 상품 추가
                    </button>
                    <button
                      onClick={removeSelectedItems}
                      disabled={selectedSkus.length === 0}
                      className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 disabled:text-slate-300"
                    >
                      선택 삭제
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[900px] text-sm">
                    <thead className="bg-slate-50 text-xs text-slate-500">
                      <tr>
                        <th className="px-3 py-3 text-left">
                          <input
                            type="checkbox"
                            checked={allSelected}
                            onChange={(e) =>
                              setSelectedSkus(
                                e.target.checked ? items.map((item) => item.sku) : [],
                              )
                            }
                          />
                        </th>
                        <th className="px-3 py-3 text-center">No.</th>
                        <th className="px-3 py-3 text-left">상품 정보</th>
                        <th className="px-3 py-3 text-right">공급가</th>
                        <th className="px-3 py-3 text-left">주문 정보</th>
                        <th className="px-3 py-3 text-left">수량</th>
                        <th className="px-3 py-3 text-right">공급가 합계</th>
                        <th className="px-3 py-3 text-center">관리</th>
                      </tr>
                    </thead>

                    <tbody>
                      {items.map((item, index) => {
                        const itemTotal = item.price * item.quantity;

                        return (
                          <tr key={item.sku} className="border-t border-slate-100">
                            <td className="px-3 py-4">
                              <input
                                type="checkbox"
                                checked={selectedSkus.includes(item.sku)}
                                onChange={() => toggleSelected(item.sku)}
                              />
                            </td>
                            <td className="px-3 py-4 text-center">{index + 1}</td>
                            <td className="px-3 py-4">
                              <p className="font-bold text-slate-800">{item.name}</p>
                              <p className="text-xs text-slate-500">SKU: {item.sku}</p>
                            </td>
                            <td className="px-3 py-4 text-right font-bold">
                              {formatWon(item.price)}
                              <p className="text-xs font-normal text-slate-400">VAT 별도</p>
                            </td>
                            <td className="px-3 py-4 text-slate-700">
                              주문 단위: {item.orderUnit}
                              <p className="text-xs text-slate-500">MOQ: {item.moq}</p>
                            </td>
                            <td className="px-3 py-4">
                              <div className="flex h-9 overflow-hidden rounded-lg border border-slate-200">
                                <input
                                  type="number"
                                  min={0}
                                  value={item.quantity}
                                  onChange={(e) =>
                                    updateItem(item.sku, {
                                      quantity: Number(e.target.value) || 0,
                                    })
                                  }
                                  className="w-20 px-3 text-sm outline-none"
                                />
                                <select
                                  value={item.unit}
                                  onChange={(e) =>
                                    updateItem(item.sku, {
                                      unit: e.target.value as "개" | "박스",
                                    })
                                  }
                                  className="border-l border-slate-200 px-2 text-sm outline-none"
                                >
                                  <option>개</option>
                                  <option>박스</option>
                                </select>
                              </div>
                            </td>
                            <td className="px-3 py-4 text-right font-extrabold">
                              {formatWon(itemTotal)}
                            </td>
                            <td className="px-3 py-4 text-center">
                              <button
                                onClick={() => removeItem(item.sku)}
                                className="text-slate-400 hover:text-red-500"
                              >
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        );
                      })}

                      <tr className="bg-slate-50 font-extrabold">
                        <td colSpan={5} className="px-3 py-4">
                          합계
                        </td>
                        <td className="px-3 py-4">
                          {totals.itemCount}상품 / {totals.totalQuantity.toLocaleString()}개
                        </td>
                        <td className="px-3 py-4 text-right">{formatWon(totals.supplyTotal)}</td>
                        <td />
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            </div>

            <aside className="space-y-5">
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h4 className="mb-5 text-base font-extrabold text-slate-900">
                  발주 금액 요약
                </h4>

                <div className="space-y-4 text-sm">
                  <SummaryRow label="공급가 합계 VAT 별도" value={totals.supplyTotal} />
                  <SummaryRow label="VAT 10%" value={totals.vat} />
                  <SummaryRow label="운송비" value={form.transportCost} />

                  <div className="border-t border-slate-200 pt-4">
                    <div className="flex justify-between text-lg">
                      <span className="font-extrabold text-slate-900">총 발주 금액</span>
                      <b className="text-blue-600">{formatWon(totals.grandTotal)}</b>
                    </div>
                  </div>
                </div>
              </section>

              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h4 className="mb-4 text-base font-extrabold text-slate-900">
                  입고/운송 요약
                </h4>

                <div className="space-y-2 text-sm text-slate-600">
                  <p>
                    <b className="text-slate-800">입고 창고:</b> {form.warehouse || "-"}
                  </p>
                  <p>
                    <b className="text-slate-800">운송 방식:</b> {form.inboundType}
                  </p>
                  <p>
                    <b className="text-slate-800">인코텀즈:</b> {form.incoterms || "-"}
                  </p>
                  <p>
                    <b className="text-slate-800">B/L · AWB:</b> {form.blNo || "-"}
                  </p>
                  <p>
                    <b className="text-slate-800">컨테이너:</b> {form.containerNo || "-"}
                  </p>
                </div>
              </section>
            </aside>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-slate-100 bg-white px-6 py-4">
          <button
            onClick={onClose}
            className="flex items-center gap-2 rounded-lg border border-slate-200 px-6 py-2.5 text-sm font-bold text-slate-700"
          >
            <List size={16} />
            목록으로
          </button>

          <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-6 py-2.5 text-sm font-bold text-slate-700">
            <Save size={16} />
            임시저장
          </button>

          <button
            onClick={onClose}
            disabled={!canSubmit}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-bold text-white disabled:bg-slate-300"
          >
            <Plus size={16} />
            발주 확정
          </button>
        </div>
      </aside>

      <ProductSelectModal
        open={productModalOpen}
        selectedSkus={items.map((item) => item.sku)}
        onClose={() => setProductModalOpen(false)}
        onAdd={(newItems) => setItems((prev) => [...prev, ...newItems])}
      />
    </div>
  );
}

export default function PurchaseOrdersPage() {
  const [orderNo, setOrderNo] = useState("");
  const [supplier, setSupplier] = useState("");
  const [status, setStatus] = useState("전체");
  const [orderDateFrom, setOrderDateFrom] = useState("");
  const [orderDateTo, setOrderDateTo] = useState("");
  const [expectedDateFrom, setExpectedDateFrom] = useState("");
  const [expectedDateTo, setExpectedDateTo] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filteredOrders = useMemo(() => {
    return purchaseOrders.filter((order) => {
      const matchText =
        order.orderNo.toLowerCase().includes(orderNo.toLowerCase()) &&
        order.supplier.toLowerCase().includes(supplier.toLowerCase()) &&
        (status === "전체" || order.status === status);

      const matchOrderDate =
        (!orderDateFrom || order.orderDate >= orderDateFrom) &&
        (!orderDateTo || order.orderDate <= orderDateTo);

      const matchExpectedDate =
        (!expectedDateFrom || order.expectedDate >= expectedDateFrom) &&
        (!expectedDateTo || order.expectedDate <= expectedDateTo);

      return matchText && matchOrderDate && matchExpectedDate;
    });
  }, [
    orderNo,
    supplier,
    status,
    orderDateFrom,
    orderDateTo,
    expectedDateFrom,
    expectedDateTo,
  ]);

  const resetFilters = () => {
    setOrderNo("");
    setSupplier("");
    setStatus("전체");
    setOrderDateFrom("");
    setOrderDateTo("");
    setExpectedDateFrom("");
    setExpectedDateTo("");
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">발주 목록</h2>
            <p className="mt-1 text-sm text-slate-500">
              발주 내역을 조회하고 관리할 수 있습니다.
            </p>
          </div>

          <div className="flex gap-3">
            <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm">
              <Download size={16} />
              엑셀 다운로드
            </button>

            <button
              onClick={() => setDrawerOpen(true)}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white shadow-sm"
            >
              <Plus size={18} />
              발주 등록
            </button>
          </div>
        </div>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid gap-4 xl:grid-cols-[1fr_1.1fr_0.8fr_1.3fr_1.3fr_auto]">
            <Field label="발주번호">
              <input
                value={orderNo}
                onChange={(e) => setOrderNo(e.target.value)}
                placeholder="발주번호 입력"
                className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none focus:border-blue-500"
              />
            </Field>

            <Field label="공급처">
              <div className="flex h-11 items-center rounded-lg border border-slate-200 px-4">
                <input
                  value={supplier}
                  onChange={(e) => setSupplier(e.target.value)}
                  placeholder="공급처명 입력"
                  className="flex-1 text-sm outline-none"
                />
                <Search size={16} className="text-slate-400" />
              </div>
            </Field>

            <Field label="상태">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none focus:border-blue-500"
              >
                {purchaseOrderStatuses.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </Field>

            <Field label="발주일">
              <div className="flex h-11 items-center gap-2 rounded-lg border border-slate-200 px-3">
                <input
                  type="date"
                  value={orderDateFrom}
                  onChange={(e) => setOrderDateFrom(e.target.value)}
                  className="w-full text-sm outline-none"
                />
                <span className="text-slate-400">~</span>
                <input
                  type="date"
                  value={orderDateTo}
                  onChange={(e) => setOrderDateTo(e.target.value)}
                  className="w-full text-sm outline-none"
                />
                <Calendar size={16} className="text-slate-400" />
              </div>
            </Field>

            <Field label="입고 예정일">
              <div className="flex h-11 items-center gap-2 rounded-lg border border-slate-200 px-3">
                <input
                  type="date"
                  value={expectedDateFrom}
                  onChange={(e) => setExpectedDateFrom(e.target.value)}
                  className="w-full text-sm outline-none"
                />
                <span className="text-slate-400">~</span>
                <input
                  type="date"
                  value={expectedDateTo}
                  onChange={(e) => setExpectedDateTo(e.target.value)}
                  className="w-full text-sm outline-none"
                />
                <Calendar size={16} className="text-slate-400" />
              </div>
            </Field>

            <div className="flex items-end">
              <button
                onClick={resetFilters}
                className="flex h-11 items-center gap-2 rounded-lg border border-slate-200 bg-white px-5 text-sm font-bold text-slate-700"
              >
                <RotateCcw size={16} />
                초기화
              </button>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-2 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-3 xl:grid-cols-6">
          {purchaseOrderSummary.map((item, index) => (
            <div
              key={item.label}
              className={`px-5 ${index !== 0 ? "xl:border-l xl:border-slate-200" : ""}`}
            >
              <p className="text-sm font-bold text-slate-600">{item.label}</p>
              <p className={`mt-3 text-3xl font-extrabold ${item.color}`}>
                {item.value}
                <span className="ml-1 text-lg font-bold">{item.unit}</span>
              </p>
            </div>
          ))}
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-bold text-slate-700">
              전체 {filteredOrders.length.toLocaleString()}건
            </p>

            <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600">
              20개씩 보기
              <ChevronDown size={16} />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1180px] text-sm">
              <thead className="bg-slate-50 text-xs text-slate-500">
                <tr>
                  <th className="px-4 py-4 text-left">
                    <input type="checkbox" />
                  </th>
                  <th className="px-4 py-4 text-center">No.</th>
                  <th className="px-4 py-4 text-left">발주번호</th>
                  <th className="px-4 py-4 text-left">공급처</th>
                  <th className="px-4 py-4 text-center">발주일</th>
                  <th className="px-4 py-4 text-center">입고 예정일</th>
                  <th className="px-4 py-4 text-center">상태</th>
                  <th className="px-4 py-4 text-right">총 상품수</th>
                  <th className="px-4 py-4 text-right">총 수량</th>
                  <th className="px-4 py-4 text-right">총 금액 VAT 제외</th>
                  <th className="px-4 py-4 text-center">담당자</th>
                  <th className="px-4 py-4 text-center">관리</th>
                </tr>
              </thead>

              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-t border-slate-100">
                    <td className="px-4 py-4">
                      <input type="checkbox" />
                    </td>
                    <td className="px-4 py-4 text-center">{order.id}</td>
                    <td className="px-4 py-4 font-extrabold text-blue-700">
                      {order.orderNo}
                    </td>
                    <td className="px-4 py-4 font-medium text-slate-700">
                      {order.supplier}
                    </td>
                    <td className="px-4 py-4 text-center text-slate-700">
                      {order.orderDate}
                    </td>
                    <td className="px-4 py-4 text-center text-slate-700">
                      {order.expectedDate}
                    </td>
                    <td className="px-4 py-4 text-center">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-4 py-4 text-right">{order.itemCount} 건</td>
                    <td className="px-4 py-4 text-right">
                      {order.totalQuantity.toLocaleString()} 개
                    </td>
                    <td className="px-4 py-4 text-right font-bold">
                      {formatWon(order.totalAmount)}
                    </td>
                    <td className="px-4 py-4 text-center">{order.manager}</td>
                    <td className="px-4 py-4">
                      <button className="mx-auto flex text-slate-400">
                        <MoreHorizontal size={18} />
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredOrders.length === 0 && (
                  <tr>
                    <td colSpan={12} className="px-4 py-16 text-center text-sm text-slate-400">
                      조건에 맞는 발주 내역이 없습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

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

            <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600">
              <ChevronRight size={16} />
            </button>
          </div>
        </section>
      </div>

      <PurchaseOrderDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
