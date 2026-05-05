"use client";

import { useMemo, useState } from "react";
import {
  Download,
  Plus,
  Search,
  RotateCcw,
  MoreHorizontal,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  Calendar,
  X,
  Trash2,
  List,
  Save,
} from "lucide-react";
import {
  purchaseOrders,
  purchaseOrderStatuses,
  purchaseOrderSummary,
} from "@/mock/purchaseOrders";

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
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${color}`}>
      {status}
    </span>
  );
}

function PurchaseOrderDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  const items = [
    {
      name: "선별락 앰플 100ml",
      sku: "COS-CT-100",
      price: 15000,
      orderUnit: "1개",
      moq: "100개",
      quantity: 200,
      unit: "개",
      total: 3000000,
    },
    {
      name: "나이아신아마이드 토너 200ml",
      sku: "COS-NI-200",
      price: 9500,
      orderUnit: "1박스 (24개)",
      moq: "10박스",
      quantity: 20,
      unit: "박스",
      total: 1900000,
    },
    {
      name: "히알루론산 크림 100ml",
      sku: "COS-HA-100",
      price: 12600,
      orderUnit: "1개",
      moq: "50개",
      quantity: 100,
      unit: "개",
      total: 1260000,
    },
    {
      name: "비타민C 세럼 30ml",
      sku: "COS-VC-030",
      price: 8200,
      orderUnit: "1개",
      moq: "30개",
      quantity: 60,
      unit: "개",
      total: 492000,
    },
    {
      name: "콜라겐 폼 150ml",
      sku: "COS-CF-150",
      price: 6500,
      orderUnit: "1박스 (12개)",
      moq: "10박스",
      quantity: 30,
      unit: "박스",
      total: 1950000,
    },
  ];

  const supplyTotal = 8602000;
  const vat = 860200;
  const grandTotal = 9462200;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/20">
      <aside className="flex h-full w-[980px] flex-col bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900">
              발주 등록/수정
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              공급처에 발주할 상품과 수량을 입력하고 발주서를 생성합니다.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={20} />
          </button>
        </div>

        <div className="grid flex-1 grid-cols-[1fr_320px] gap-5 overflow-y-auto bg-slate-50 p-5">
          <div className="space-y-5">
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h4 className="mb-5 text-base font-extrabold text-slate-900">
                기본 정보
              </h4>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    발주번호 <span className="text-red-500">*</span>
                  </label>
                  <div className="flex h-11 overflow-hidden rounded-lg border border-slate-200">
                    <input
                      defaultValue="PO-2025-000129"
                      className="flex-1 px-4 text-sm outline-none"
                    />
                    <button className="border-l border-slate-200 bg-slate-50 px-4 text-sm font-bold text-slate-500">
                      자동생성
                    </button>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    공급처 <span className="text-red-500">*</span>
                  </label>
                  <select className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none">
                    <option>한국코스메틱</option>
                    <option>뷰티무역</option>
                    <option>글로벌케어</option>
                    <option>서울뷰티</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    발주일 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    defaultValue="2025-05-23"
                    className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    입고 예정일 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    defaultValue="2025-05-28"
                    className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    결제 조건
                  </label>
                  <select className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none">
                    <option>선입금</option>
                    <option>월말 30일</option>
                    <option>선금 50%</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    담당자
                  </label>
                  <select className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none">
                    <option>admin</option>
                    <option>이관리</option>
                    <option>김과장</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    배송 방법
                  </label>
                  <select className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none">
                    <option>택배</option>
                    <option>화물</option>
                    <option>직접수령</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    배송비
                  </label>
                  <div className="flex h-11 overflow-hidden rounded-lg border border-slate-200">
                    <input
                      defaultValue="0"
                      className="flex-1 px-4 text-sm outline-none"
                    />
                    <span className="flex w-12 items-center justify-center border-l border-slate-200 bg-slate-50 text-sm font-bold text-slate-500">
                      원
                    </span>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    메모
                  </label>
                  <textarea
                    placeholder="메모를 입력하세요"
                    className="h-11 w-full resize-none rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none"
                  />
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h4 className="text-base font-extrabold text-slate-900">
                  상품 목록
                </h4>

                <div className="flex gap-2">
                  <button className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700">
                    + 상품 추가
                  </button>
                  <button className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700">
                    엑셀 일괄 추가
                  </button>
                  <button className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-bold text-slate-400">
                    선택 삭제
                  </button>
                </div>
              </div>

              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-xs text-slate-500">
                  <tr>
                    <th className="px-3 py-3 text-left">
                      <input type="checkbox" />
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
                  {items.map((item, index) => (
                    <tr key={item.sku} className="border-t border-slate-100">
                      <td className="px-3 py-4">
                        <input type="checkbox" />
                      </td>
                      <td className="px-3 py-4 text-center">{index + 1}</td>
                      <td className="px-3 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-md bg-slate-100" />
                          <div>
                            <p className="font-bold text-slate-800">
                              {item.name}
                            </p>
                            <p className="text-xs text-slate-500">
                              SKU: {item.sku}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-4 text-right font-bold">
                        {item.price.toLocaleString()} 원
                        <p className="text-xs font-normal text-slate-400">
                          VAT 별도
                        </p>
                      </td>
                      <td className="px-3 py-4 text-slate-700">
                        주문 단위: {item.orderUnit}
                        <p className="text-xs text-slate-500">
                          MOQ: {item.moq}
                        </p>
                      </td>
                      <td className="px-3 py-4">
                        <div className="flex h-9 overflow-hidden rounded-lg border border-slate-200">
                          <input
                            defaultValue={item.quantity}
                            className="w-20 px-3 text-sm outline-none"
                          />
                          <select
                            defaultValue={item.unit}
                            className="border-l border-slate-200 px-2 text-sm outline-none"
                          >
                            <option>개</option>
                            <option>박스</option>
                          </select>
                        </div>
                      </td>
                      <td className="px-3 py-4 text-right font-extrabold">
                        {item.total.toLocaleString()} 원
                      </td>
                      <td className="px-3 py-4 text-center">
                        <button className="text-slate-400 hover:text-red-500">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}

                  <tr className="bg-slate-50 font-extrabold">
                    <td colSpan={5} className="px-3 py-4">
                      합계
                    </td>
                    <td className="px-3 py-4">5상품 / 410개</td>
                    <td className="px-3 py-4 text-right">
                      {supplyTotal.toLocaleString()} 원
                    </td>
                    <td />
                  </tr>
                </tbody>
              </table>

              <p className="mt-4 text-xs text-slate-500">
                * 공급가 합계는 VAT 별도 금액입니다.
              </p>
            </section>
          </div>

          <aside className="space-y-5">
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h4 className="mb-5 text-base font-extrabold text-slate-900">
                발주 금액 요약
              </h4>

              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">공급가 합계 VAT 별도</span>
                  <b>{supplyTotal.toLocaleString()} 원</b>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">VAT 10%</span>
                  <b>{vat.toLocaleString()} 원</b>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">공급가 합계 VAT 포함</span>
                  <b className="text-blue-600">
                    {grandTotal.toLocaleString()} 원
                  </b>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">배송비</span>
                  <b>0 원</b>
                </div>
                <div className="border-t border-slate-200 pt-4">
                  <div className="flex justify-between text-lg">
                    <span className="font-extrabold text-slate-900">
                      총 발주 금액
                    </span>
                    <b className="text-blue-600">
                      {grandTotal.toLocaleString()} 원
                    </b>
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h4 className="mb-4 text-base font-extrabold text-slate-900">
                공급처 가격 정보
              </h4>

              {[
                ["선별락 앰플 100ml", "COS-CT-100", "15,000원", "16,500원", "100개", "2~3일"],
                ["나이아신아마이드 토너 200ml", "COS-NI-200", "9,500원", "10,450원", "10박스", "3~5일"],
              ].map((item) => (
                <div
                  key={item[1]}
                  className="mb-3 rounded-xl border border-slate-200 p-4 text-sm"
                >
                  <p className="font-extrabold text-slate-800">
                    {item[0]} ({item[1]})
                  </p>
                  <div className="mt-3 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">공급가 VAT 별도</span>
                      <b>{item[2]}</b>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">공급가 VAT 포함</span>
                      <b>{item[3]}</b>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">MOQ</span>
                      <b>{item[4]}</b>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">리드타임</span>
                      <b>{item[5]}</b>
                    </div>
                  </div>
                </div>
              ))}
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h4 className="mb-4 text-base font-extrabold text-slate-900">
                파일 첨부
              </h4>
              <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">
                파일을 드래그하거나 클릭하여 첨부하세요.
                <p className="mt-2 text-xs">PDF, Excel, 이미지 파일만 가능</p>
              </div>
            </section>
          </aside>
        </div>

        <div className="flex justify-end gap-3 border-t border-slate-100 px-6 py-4">
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
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-bold text-white"
          >
            <Plus size={16} />
            발주 확정
          </button>
        </div>
      </aside>
    </div>
  );
}

export default function PurchaseOrdersPage() {
  const [orderNo, setOrderNo] = useState("");
  const [supplier, setSupplier] = useState("");
  const [status, setStatus] = useState("전체");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filteredOrders = useMemo(() => {
    return purchaseOrders.filter((order) => {
      return (
        order.orderNo.toLowerCase().includes(orderNo.toLowerCase()) &&
        order.supplier.toLowerCase().includes(supplier.toLowerCase()) &&
        (status === "전체" || order.status === status)
      );
    });
  }, [orderNo, supplier, status]);

  const resetFilters = () => {
    setOrderNo("");
    setSupplier("");
    setStatus("전체");
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              발주 목록
            </h2>
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
          <div className="grid grid-cols-[1fr_1.1fr_0.8fr_1.3fr_1.3fr_auto_auto] gap-4">
            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                발주번호
              </label>
              <input
                value={orderNo}
                onChange={(e) => setOrderNo(e.target.value)}
                placeholder="발주번호 입력"
                className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                공급처
              </label>
              <div className="flex h-11 items-center rounded-lg border border-slate-200 px-4">
                <input
                  value={supplier}
                  onChange={(e) => setSupplier(e.target.value)}
                  placeholder="공급처명 입력"
                  className="flex-1 text-sm outline-none"
                />
                <Search size={16} className="text-slate-400" />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                상태
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none focus:border-blue-500"
              >
                {purchaseOrderStatuses.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                발주일
              </label>
              <button className="flex h-11 w-full items-center justify-between rounded-lg border border-slate-200 px-4 text-sm text-slate-700">
                2025-05-01 ~ 2025-05-23
                <Calendar size={16} className="text-slate-400" />
              </button>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                입고 예정일
              </label>
              <button className="flex h-11 w-full items-center justify-between rounded-lg border border-slate-200 px-4 text-sm text-slate-400">
                시작일 ~ 종료일
                <Calendar size={16} />
              </button>
            </div>

            <div className="flex items-end">
              <button className="flex h-11 items-center gap-2 rounded-lg bg-[#071d49] px-6 text-sm font-bold text-white">
                검색
              </button>
            </div>

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

        <section className="grid grid-cols-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          {purchaseOrderSummary.map((item, index) => (
            <div
              key={item.label}
              className={`px-5 ${
                index !== 0 ? "border-l border-slate-200" : ""
              }`}
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

          <table className="w-full text-sm">
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
                  <td className="px-4 py-4 text-right">
                    {order.itemCount} 건
                  </td>
                  <td className="px-4 py-4 text-right">
                    {order.totalQuantity.toLocaleString()} 개
                  </td>
                  <td className="px-4 py-4 text-right font-bold">
                    {order.totalAmount.toLocaleString()} 원
                  </td>
                  <td className="px-4 py-4 text-center">{order.manager}</td>
                  <td className="px-4 py-4">
                    <div className="flex justify-center text-slate-400">
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
              13
            </button>
            <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600">
              <ChevronRight size={16} />
            </button>
          </div>
        </section>
      </div>

      <PurchaseOrderDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </>
  );
}