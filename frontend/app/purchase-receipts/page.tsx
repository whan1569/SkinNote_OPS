"use client";

import {
  ArrowLeft,
  Calendar,
  Download,
  File,
  Plus,
  Save,
  Trash2,
  Upload,
  X,
} from "lucide-react";

function NormalBadge() {
  return (
    <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">
      정상
    </span>
  );
}

export default function PurchaseReceiptsPage() {
  const items = [
    {
      name: "선별락 앰플 100ml",
      sku: "COS-CT-100",
      orderUnit: "1개",
      moq: "100개",
      receiveQty: 200,
      unit: "개",
      baseQty: "200 개",
      price: 15000,
      total: 3000000,
    },
    {
      name: "나이아신아마이드 토너 200ml",
      sku: "COS-NI-200",
      orderUnit: "1박스 (24개)",
      moq: "10박스",
      receiveQty: 20,
      unit: "박스",
      baseQty: "480 개",
      sub: "(24개 × 20박스)",
      price: 9500,
      total: 1900000,
    },
    {
      name: "히알루론산 크림 100ml",
      sku: "COS-HA-100",
      orderUnit: "1개",
      moq: "50개",
      receiveQty: 100,
      unit: "개",
      baseQty: "100 개",
      price: 12600,
      total: 1260000,
    },
    {
      name: "비타민C 세럼 30ml",
      sku: "COS-VC-030",
      orderUnit: "1개",
      moq: "30개",
      receiveQty: 60,
      unit: "개",
      baseQty: "60 개",
      price: 8200,
      total: 492000,
    },
    {
      name: "콜라겐 폼 150ml",
      sku: "COS-CF-150",
      orderUnit: "1박스 (12개)",
      moq: "10박스",
      receiveQty: 30,
      unit: "박스",
      baseQty: "360 개",
      sub: "(12개 × 30박스)",
      price: 6500,
      total: 1950000,
    },
  ];

  const supplyTotal = 8602000;
  const vat = 860200;
  const grandTotal = 9462200;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900">입고 처리</h2>
          <p className="mt-1 text-sm text-slate-500">
            발주 상품의 입고 수량을 확인하고 재고를 등록합니다.
          </p>
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm">
            <ArrowLeft size={16} />
            목록으로
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm">
            <Save size={16} />
            임시저장
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white shadow-sm">
            <Plus size={18} />
            입고 완료
          </button>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_360px] gap-5">
        <div className="space-y-5">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="mb-5 text-base font-extrabold text-slate-900">
              입고 기본 정보
            </h3>

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
                    발주 정보
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
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  입고일 <span className="text-red-500">*</span>
                </label>
                <div className="flex h-11 items-center rounded-lg border border-slate-200 px-4">
                  <input
                    defaultValue="2025-05-23"
                    className="flex-1 text-sm outline-none"
                  />
                  <Calendar size={16} className="text-slate-400" />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  창고 <span className="text-red-500">*</span>
                </label>
                <select className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none">
                  <option>메인 창고</option>
                  <option>임시 창고</option>
                  <option>반품 창고</option>
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
                <label className="mb-3 block text-sm font-bold text-slate-700">
                  입고 유형 <span className="text-red-500">*</span>
                </label>
                <div className="flex h-11 items-center gap-6 text-sm font-bold text-slate-700">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="receiptType" defaultChecked />
                    정상 입고
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="receiptType" />
                    반품 입고
                  </label>
                </div>
              </div>

              <div className="col-span-3">
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  메모
                </label>
                <textarea
                  placeholder="메모를 입력하세요 (선택)"
                  className="h-20 w-full resize-none rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none"
                />
                <div className="mt-1 text-right text-xs text-slate-400">
                  0/200
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-slate-900">
                  입고 상품 목록
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  * 수량은 공급처 단위 기준입니다.
                </p>
              </div>

              <div className="flex gap-2">
                <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700">
                  <Download size={16} />
                  엑셀 업로드
                </button>
                <button className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700">
                  입고 상품 추가
                </button>
                <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-bold text-slate-400">
                  <Trash2 size={16} />
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
                  <th className="px-3 py-3 text-left">주문 정보</th>
                  <th className="px-3 py-3 text-left">입고 수량</th>
                  <th className="px-3 py-3 text-left">입고 수량</th>
                  <th className="px-3 py-3 text-right">단가 VAT 별도</th>
                  <th className="px-3 py-3 text-right">공급가 합계 VAT 별도</th>
                  <th className="px-3 py-3 text-center">상태</th>
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
                    <td className="px-3 py-4 text-slate-700">
                      주문 단위: {item.orderUnit}
                      <p className="text-xs text-slate-500">MOQ: {item.moq}</p>
                    </td>
                    <td className="px-3 py-4">
                      <div className="flex h-9 overflow-hidden rounded-lg border border-slate-200">
                        <input
                          defaultValue={item.receiveQty}
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
                    <td className="px-3 py-4">
                      <p className="font-bold text-slate-700">
                        {item.baseQty}
                      </p>
                      {item.sub && (
                        <p className="text-xs text-slate-400">{item.sub}</p>
                      )}
                    </td>
                    <td className="px-3 py-4 text-right font-bold">
                      {item.price.toLocaleString()} 원
                    </td>
                    <td className="px-3 py-4 text-right font-extrabold">
                      {item.total.toLocaleString()} 원
                    </td>
                    <td className="px-3 py-4 text-center">
                      <NormalBadge />
                    </td>
                    <td className="px-3 py-4 text-center">
                      <button className="text-slate-400 hover:text-red-500">
                        <X size={16} />
                      </button>
                    </td>
                  </tr>
                ))}

                <tr className="bg-slate-50 font-extrabold">
                  <td colSpan={5} className="px-3 py-4">
                    합계
                  </td>
                  <td className="px-3 py-4">5 상품 / 890 개</td>
                  <td />
                  <td className="px-3 py-4 text-right">
                    {supplyTotal.toLocaleString()} 원
                  </td>
                  <td />
                </tr>
              </tbody>
            </table>

            <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4 text-xs leading-6 text-slate-500">
              <p>
                * 입고 수량이 발주 수량과 다를 경우 부분 입고로 처리됩니다.
              </p>
              <p>
                * 입고 완료 후 재고가 업데이트되며, 재고 변동 원장에 기록됩니다.
              </p>
            </div>
          </section>
        </div>

        <aside className="space-y-5">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="mb-5 text-base font-extrabold text-slate-900">
              입고 요약
            </h3>

            <div className="space-y-3 text-sm">
              {[
                ["발주번호", "PO-2025-000129"],
                ["공급처", "한국코스메틱"],
                ["발주일", "2025-05-23"],
                ["입고일", "2025-05-23"],
                ["입고 유형", "정상 입고"],
                ["입고 창고", "메인 창고"],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between">
                  <span className="font-bold text-slate-500">{label}</span>
                  <span className="font-bold text-slate-700">{value}</span>
                </div>
              ))}

              <div className="my-4 border-t border-slate-200" />

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
                <b className="text-blue-600">{grandTotal.toLocaleString()} 원</b>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">배송비</span>
                <b>0 원</b>
              </div>

              <div className="border-t border-slate-200 pt-4">
                <div className="flex justify-between text-lg">
                  <span className="font-extrabold text-slate-900">
                    총 입고 금액
                  </span>
                  <b className="text-blue-600">{grandTotal.toLocaleString()} 원</b>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="mb-4 text-base font-extrabold text-slate-900">
              첨부 파일
            </h3>

            <div className="rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">
              <Upload size={22} className="mx-auto mb-2 text-slate-400" />
              파일을 드래그하거나 클릭하여 첨부하세요.
              <p className="mt-2 text-xs">
                이미지, PDF, Excel 파일 지원 / 최대 10MB
              </p>
            </div>

            <div className="mt-4 flex items-center justify-between rounded-lg border border-slate-200 px-4 py-3 text-sm">
              <div className="flex items-center gap-2 text-slate-700">
                <File size={16} />
                입고확인증_20250523.pdf
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <span>245 KB</span>
                <button>
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="mb-4 text-base font-extrabold text-slate-900">
              입고 이력
            </h3>

            <div className="space-y-5 text-sm">
              {[
                ["입고 진행 중", "admin", "2025-05-23 14:25", true],
                ["임시 저장", "admin", "2025-05-23 14:20", false],
                ["발주 생성", "admin", "2025-05-23 13:30", false],
              ].map(([title, user, time, active]) => (
                <div key={String(title)} className="flex gap-3">
                  <div
                    className={`mt-1 h-3 w-3 rounded-full ${
                      active ? "bg-blue-600" : "bg-slate-300"
                    }`}
                  />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <b className="text-slate-700">{title}</b>
                      <span className="text-xs text-slate-400">{time}</span>
                    </div>
                    <p className="mt-1 text-xs text-slate-500">{user}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}