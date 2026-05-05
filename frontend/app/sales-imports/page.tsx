"use client";

import {
  CircleHelp,
  Download,
  MoreHorizontal,
  Plus,
  RefreshCcw,
  Settings,
  UploadCloud,
} from "lucide-react";
import {
  importHistories,
  platformConnections,
  salesPreviewRows,
} from "@/mock/salesImports";

function PlatformIcon({ icon }: { icon: string }) {
  const color =
    icon === "N"
      ? "bg-green-500"
      : icon === "G"
      ? "bg-green-500"
      : icon === "A."
      ? "bg-red-500"
      : icon === "11"
      ? "bg-red-500"
      : icon === "TALK"
      ? "bg-yellow-400 text-slate-900"
      : "bg-orange-500";

  return (
    <span
      className={`inline-flex h-8 min-w-8 items-center justify-center rounded px-1 text-xs font-extrabold text-white ${color}`}
    >
      {icon}
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  const color =
    status === "성공" || status === "연결됨"
      ? "bg-green-50 text-green-700"
      : "bg-red-50 text-red-700";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${color}`}>
      {status}
    </span>
  );
}

export default function SalesImportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900">
            판매 업로드 / 수집
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            각 플랫폼의 판매 데이터를 업로드하거나 API로 자동 수집하여 재고 및 매출을 관리합니다.
          </p>
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm">
            <Settings size={16} />
            수집 설정 관리
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm">
            <CircleHelp size={16} />
            업로드 가이드
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white shadow-sm">
            <Plus size={18} />
            데이터 업로드
          </button>
        </div>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="mb-4 text-base font-extrabold text-slate-900">
          플랫폼 연결 상태
        </h3>

        <div className="grid grid-cols-6 gap-5">
          {platformConnections.map((platform) => (
            <div
              key={platform.name}
              className="rounded-xl border border-slate-200 p-4"
            >
              <div className="flex items-center gap-3">
                <PlatformIcon icon={platform.icon} />
                <p className="font-extrabold text-slate-800">
                  {platform.name}
                </p>
              </div>

              <div className="mt-4">
                <StatusBadge status={platform.status} />
              </div>

              <p className="mt-4 text-xs font-medium text-slate-500">
                최근 수집: {platform.lastSync}
              </p>

              <button className="mt-3 flex h-9 w-full items-center justify-center gap-2 rounded-lg border border-slate-200 text-sm font-bold text-slate-700">
                <RefreshCcw size={15} />
                {platform.status === "연결 오류" ? "연결 재시도" : "즉시 수집"}
              </button>
            </div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-[340px_220px_1fr] gap-5">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-base font-extrabold text-slate-900">
            업로드 파일
          </h3>

          <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center">
            <UploadCloud size={36} className="mx-auto text-slate-400" />
            <p className="mt-4 text-sm font-bold text-slate-700">
              파일을 드래그하거나 클릭하여 업로드하세요
            </p>
            <p className="mt-2 text-xs text-slate-400">
              엑셀 파일(.xlsx, .xls) 또는 CSV 파일만 업로드 가능합니다.
            </p>
            <button className="mt-5 rounded-lg border border-blue-200 px-5 py-2 text-sm font-bold text-blue-600">
              파일 선택
            </button>
          </div>

          <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <h4 className="mb-3 text-sm font-extrabold text-slate-800">
              업로드 가이드
            </h4>
            <ul className="list-disc space-y-1 pl-5 text-xs leading-5 text-slate-500">
              <li>판매 데이터는 날짜별, 상품별 집계 데이터여야 합니다.</li>
              <li>필수 컬럼: 날짜, 상품코드(SKU), 상품명, 플랫폼, 주문수량, 판매금액</li>
              <li>파일 형식: Excel(.xlsx, .xls) 또는 CSV(.csv)</li>
            </ul>
            <button className="mt-4 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-blue-600">
              양식 다운로드
            </button>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-base font-extrabold text-slate-900">
            수집 설정
          </h3>

          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                수집 기간 <span className="text-red-500">*</span>
              </label>
              <button className="h-10 w-full rounded-lg border border-slate-200 px-3 text-left text-sm text-slate-700">
                2025-05-16 ~ 2025-05-23
              </button>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                수집 주기
              </label>
              <select className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm">
                <option>1일 1회</option>
                <option>1시간 1회</option>
                <option>수동</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                수집 시간
              </label>
              <select className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm">
                <option>02:00</option>
                <option>06:00</option>
                <option>12:00</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                수집 항목
              </label>
              <div className="grid grid-cols-2 gap-2 text-sm text-slate-700">
                {["주문 수량", "주문 금액", "옵션 정보", "취소/환불"].map(
                  (item) => (
                    <label key={item} className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked={item !== "옵션 정보"} />
                      {item}
                    </label>
                  )
                )}
              </div>
            </div>

            <button className="h-11 w-full rounded-lg bg-blue-600 text-sm font-bold text-white">
              설정 저장
            </button>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-base font-extrabold text-slate-900">
            최근 수집/업로드 내역
          </h3>

          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-xs text-slate-500">
              <tr>
                <th className="px-3 py-3 text-left">구분</th>
                <th className="px-3 py-3 text-left">플랫폼</th>
                <th className="px-3 py-3 text-left">파일명 / 수집 기간</th>
                <th className="px-3 py-3 text-right">처리 건수</th>
                <th className="px-3 py-3 text-center">상태</th>
                <th className="px-3 py-3 text-center">처리 일시</th>
                <th className="px-3 py-3 text-center">관리</th>
              </tr>
            </thead>
            <tbody>
              {importHistories.map((row) => (
                <tr key={`${row[1]}-${row[5]}`} className="border-t border-slate-100">
                  <td className="px-3 py-3 font-bold">{row[0]}</td>
                  <td className="px-3 py-3">{row[1]}</td>
                  <td className="px-3 py-3">{row[2]}</td>
                  <td className="px-3 py-3 text-right">{row[3]}</td>
                  <td className="px-3 py-3 text-center">
                    <StatusBadge status={row[4]} />
                  </td>
                  <td
                    className={`px-3 py-3 text-center ${
                      row[4] === "실패" ? "font-bold text-red-500" : ""
                    }`}
                  >
                    {row[5]}
                  </td>
                  <td className="px-3 py-3 text-center text-slate-400">
                    <MoreHorizontal size={18} className="mx-auto" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button className="mt-4 text-sm font-bold text-blue-600">
            전체 내역 보기 &gt;
          </button>
        </section>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="mb-4 text-base font-extrabold text-slate-900">
          판매 데이터 미리보기{" "}
          <span className="text-sm text-slate-400">최근 수집 데이터</span>
        </h3>

        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-xs text-slate-500">
            <tr>
              <th className="px-4 py-3 text-center">No.</th>
              <th className="px-4 py-3 text-center">날짜</th>
              <th className="px-4 py-3 text-center">플랫폼</th>
              <th className="px-4 py-3 text-left">상품코드 (SKU)</th>
              <th className="px-4 py-3 text-left">상품명</th>
              <th className="px-4 py-3 text-center">옵션명</th>
              <th className="px-4 py-3 text-right">주문 수량</th>
              <th className="px-4 py-3 text-right">판매 금액</th>
              <th className="px-4 py-3 text-right">취소 수량</th>
              <th className="px-4 py-3 text-right">취소 금액</th>
            </tr>
          </thead>
          <tbody>
            {salesPreviewRows.map((row, index) => (
              <tr key={`${row[2]}-${index}`} className="border-t border-slate-100">
                <td className="px-4 py-3 text-center">{index + 1}</td>
                <td className="px-4 py-3 text-center">{row[0]}</td>
                <td className="px-4 py-3 text-center">
                  <PlatformIcon icon={row[1]} />
                </td>
                <td className="px-4 py-3 font-bold">{row[2]}</td>
                <td className="px-4 py-3">{row[3]}</td>
                <td className="px-4 py-3 text-center">{row[4]}</td>
                <td className="px-4 py-3 text-right">{row[5]}</td>
                <td className="px-4 py-3 text-right">{row[6]}</td>
                <td className="px-4 py-3 text-right">{row[7]}</td>
                <td className="px-4 py-3 text-right">{row[8]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}