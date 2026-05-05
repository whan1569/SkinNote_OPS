"use client";

import {
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  PlayCircle,
  Settings,
} from "lucide-react";
import {
  closeHistories,
  dailySummary,
  stockStatusSummary,
  transactionSummary,
} from "@/mock/inventorySnapshots";

function StatusBadge() {
  return (
    <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">
      마감 완료
    </span>
  );
}

export default function InventorySnapshotsPage() {
  const totalTransactionCount = 181;
  const totalQuantity = "21,934 개";
  const totalAmount = "₩ 202,761,300";

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900">
            일마감 / 스냅샷
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            일별 재고 및 거래 내역을 마감하고 스냅샷을 생성하여 데이터를 안전하게 보관합니다.
          </p>
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm">
            <Settings size={16} />
            마감 설정
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm">
            <Clock size={16} />
            스냅샷 히스토리
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white shadow-sm">
            <PlayCircle size={16} />
            일마감 실행
          </button>
        </div>
      </div>

      <div className="grid grid-cols-[330px_1fr] gap-5">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="mb-5 text-base font-extrabold text-slate-900">
            마감 정보
          </h3>

          <div className="space-y-4 text-sm">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-500">마감 대상 날짜</span>
              <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 font-bold text-slate-700">
                2025-05-23 (금)
                <Calendar size={15} className="text-slate-400" />
              </button>
            </div>

            {[
              ["마감 상태", <StatusBadge key="status" />],
              ["마감 완료 시간", "2025-05-23 23:59:58"],
              ["마감자", "admin"],
              ["마감 방식", "자동 마감"],
              ["마감 기준", "KST (UTC+09:00)"],
            ].map(([label, value]) => (
              <div key={String(label)} className="flex justify-between">
                <span className="font-bold text-slate-500">{label}</span>
                <span className="font-bold text-slate-700">{value}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="mb-5 text-base font-extrabold text-slate-900">
            일별 요약 <span className="text-slate-500">(2025-05-23)</span>
          </h3>

          <div className="grid grid-cols-6 gap-4">
            {dailySummary.map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-slate-200 p-4"
              >
                <p className="text-sm font-bold text-slate-500">{item.label}</p>
                <p className="mt-3 text-2xl font-extrabold text-slate-900">
                  {item.value}
                  {item.unit && (
                    <span className="ml-1 text-base font-bold">{item.unit}</span>
                  )}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-xl border border-green-100 bg-green-50 px-5 py-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 size={22} className="text-green-600" />
              <div>
                <p className="font-extrabold text-green-700">
                  일마감이 정상적으로 완료되었습니다.
                </p>
                <p className="mt-1 text-sm text-green-700">
                  모든 거래가 마감 처리되었으며, 스냅샷이 생성되었습니다.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="grid grid-cols-2 gap-5">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="mb-5 text-base font-extrabold text-slate-900">
            거래 요약
          </h3>

          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-xs text-slate-500">
              <tr>
                <th className="px-4 py-3 text-left">구분</th>
                <th className="px-4 py-3 text-right">건수</th>
                <th className="px-4 py-3 text-right">수량</th>
                <th className="px-4 py-3 text-right">금액 (원)</th>
              </tr>
            </thead>
            <tbody>
              {transactionSummary.map((row) => (
                <tr key={row[0]} className="border-t border-slate-100">
                  <td className="px-4 py-3 font-bold">{row[0]}</td>
                  <td className="px-4 py-3 text-right">{row[1]}</td>
                  <td className="px-4 py-3 text-right">{row[2]}</td>
                  <td className="px-4 py-3 text-right font-bold">{row[3]}</td>
                </tr>
              ))}
              <tr className="border-t border-slate-100 bg-slate-50 font-extrabold">
                <td className="px-4 py-3">합계</td>
                <td className="px-4 py-3 text-right">{totalTransactionCount} 건</td>
                <td className="px-4 py-3 text-right">{totalQuantity}</td>
                <td className="px-4 py-3 text-right">{totalAmount}</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="mb-5 text-base font-extrabold text-slate-900">
            생성된 스냅샷 정보
          </h3>

          <div className="space-y-4 text-sm">
            {[
              ["스냅샷 ID", "SNAP-20250523-235958"],
              ["생성 시간", "2025-05-23 23:59:58"],
              ["데이터 범위", "2025-05-23 00:00:00 ~ 2025-05-23 23:59:59"],
              ["포함 데이터", "재고, 입출고, 조정, 판매, 반품, 발주, 입고"],
              ["파일 크기", "48.7 MB"],
            ].map(([label, value]) => (
              <div key={label} className="grid grid-cols-[140px_1fr]">
                <span className="font-bold text-slate-500">{label}</span>
                <span className="font-bold text-slate-700">{value}</span>
              </div>
            ))}

            <div className="grid grid-cols-[140px_1fr]">
              <span className="font-bold text-slate-500">생성 상태</span>
              <StatusBadge />
            </div>
          </div>
        </section>
      </div>

      <div className="grid grid-cols-2 gap-5">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="mb-5 text-base font-extrabold text-slate-900">
            재고 상태 요약 (마감 후)
          </h3>

          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-xs text-slate-500">
              <tr>
                <th className="px-4 py-3 text-left">구분</th>
                <th className="px-4 py-3 text-right">상품 수</th>
                <th className="px-4 py-3 text-right">재고 수량</th>
                <th className="px-4 py-3 text-right">재고 금액</th>
              </tr>
            </thead>
            <tbody>
              {stockStatusSummary.map((row) => (
                <tr key={row[0]} className="border-t border-slate-100">
                  <td className="px-4 py-3 font-bold">{row[0]}</td>
                  <td className="px-4 py-3 text-right">{row[1]}</td>
                  <td className="px-4 py-3 text-right">{row[2]}</td>
                  <td className="px-4 py-3 text-right font-bold">{row[3]}</td>
                </tr>
              ))}
              <tr className="border-t border-slate-100 bg-slate-50 font-extrabold">
                <td className="px-4 py-3">합계</td>
                <td className="px-4 py-3 text-right">236 개</td>
                <td className="px-4 py-3 text-right">210 개</td>
                <td className="px-4 py-3 text-right">₩ 144,785,900</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="mb-5 text-base font-extrabold text-slate-900">
            최근 마감 히스토리
          </h3>

          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-xs text-slate-500">
              <tr>
                <th className="px-4 py-3 text-left">마감 날짜</th>
                <th className="px-4 py-3 text-center">마감 상태</th>
                <th className="px-4 py-3 text-center">마감 시간</th>
                <th className="px-4 py-3 text-center">마감자</th>
                <th className="px-4 py-3 text-left">스냅샷 ID</th>
                <th className="px-4 py-3 text-center">작업</th>
              </tr>
            </thead>
            <tbody>
              {closeHistories.map((row) => (
                <tr key={row[4]} className="border-t border-slate-100">
                  <td className="px-4 py-3 font-bold">{row[0]}</td>
                  <td className="px-4 py-3 text-center">
                    <StatusBadge />
                  </td>
                  <td className="px-4 py-3 text-center">{row[2]}</td>
                  <td className="px-4 py-3 text-center">{row[3]}</td>
                  <td className="px-4 py-3 font-bold text-blue-700">{row[4]}</td>
                  <td className="px-4 py-3 text-center">
                    <Download size={15} className="mx-auto text-slate-500" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button className="mt-4 text-sm font-bold text-blue-600">
            전체 히스토리 보기 &gt;
          </button>
        </section>
      </div>

      <section className="rounded-xl border border-blue-100 bg-blue-50 p-5 text-sm text-blue-700">
        <p className="font-extrabold">안내 사항</p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-xs leading-5">
          <li>일마감 실행 시 해당 날짜의 모든 거래가 마감 처리되며, 이후에는 수정이 제한됩니다.</li>
          <li>스냅샷은 데이터 백업 및 복구를 위해 생성되며, 안전한 서버에 보관됩니다.</li>
          <li>마감 취소가 필요할 경우 관리자에게 문의하세요.</li>
        </ul>
      </section>
    </div>
  );
}