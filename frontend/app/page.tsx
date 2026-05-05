import {
  ShoppingBag,
  Package,
  ShoppingCart,
  Truck,
  Calendar,
  Box,
} from "lucide-react";
import {
  dashboardStats,
  inventoryTransactions,
  platformSales,
  purchaseOrders,
  salesImports,
  topInventory,
} from "@/mock/dashboard";

const iconMap = {
  bag: ShoppingBag,
  box: Package,
  cart: ShoppingCart,
  won: Box,
  truck: Truck,
};

const colorMap = {
  blue: "bg-blue-50 text-blue-600",
  green: "bg-green-50 text-green-600",
  orange: "bg-orange-50 text-orange-600",
  purple: "bg-purple-50 text-purple-600",
  teal: "bg-teal-50 text-teal-600",
};

function Card({
  title,
  children,
  action = true,
}: {
  title: string;
  children: React.ReactNode;
  action?: boolean;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
        <h3 className="font-bold text-slate-900">{title}</h3>
        {action && (
          <button className="rounded-lg border border-blue-100 px-3 py-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-50">
            전체보기
          </button>
        )}
      </div>
      <div className="p-4">{children}</div>
    </section>
  );
}

function StatusBadge({ status }: { status: string }) {
  const color =
    status === "입고완료" || status === "수집완료"
      ? "bg-green-50 text-green-700"
      : status === "입고진행"
      ? "bg-orange-50 text-orange-700"
      : "bg-blue-50 text-blue-700";

  return (
    <span className={`rounded-md px-2 py-1 text-xs font-bold ${color}`}>
      {status}
    </span>
  );
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900">대시보드</h2>
          <p className="mt-1 text-sm text-slate-500">
            오늘의 재고 및 판매 현황을 확인하세요.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">
            2025-05-02
            <Calendar size={16} />
          </button>
          <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white shadow-sm">
            일마감 상태: 진행중
          </button>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4">
        {dashboardStats.map((stat) => {
          const Icon = iconMap[stat.icon as keyof typeof iconMap];
          const color = colorMap[stat.color as keyof typeof colorMap];

          return (
            <div
              key={stat.title}
              className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-full ${color}`}
              >
                <Icon size={28} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-500">
                  {stat.title}
                </p>
                <p className="mt-1 text-2xl font-extrabold text-slate-900">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs font-medium text-slate-500">
                  {stat.sub}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-[1.2fr_1.05fr_1fr] gap-4">
        <Card title="재고 현황 (상위 10개)">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-xs text-slate-500">
              <tr>
                <th className="px-3 py-3 text-left">순위</th>
                <th className="px-3 py-3 text-left">상품명</th>
                <th className="px-3 py-3 text-right">현재재고</th>
                <th className="px-3 py-3 text-right">판매가능재고</th>
                <th className="px-3 py-3 text-right">예약재고</th>
                <th className="px-3 py-3 text-right">단위</th>
              </tr>
            </thead>
            <tbody>
              {topInventory.map((row) => (
                <tr key={row[0]} className="border-b border-slate-100">
                  {row.map((cell, idx) => (
                    <td
                      key={idx}
                      className={`px-3 py-3 text-slate-700 ${
                        idx >= 2 ? "text-right" : "text-left"
                      }`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card title="최근 재고 변동 내역">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-xs text-slate-500">
              <tr>
                <th className="px-3 py-3 text-left">일시</th>
                <th className="px-3 py-3 text-left">상품명</th>
                <th className="px-3 py-3 text-left">변동유형</th>
                <th className="px-3 py-3 text-right">변동수량</th>
                <th className="px-3 py-3 text-left">사유</th>
              </tr>
            </thead>
            <tbody>
              {inventoryTransactions.map((row, i) => (
                <tr key={i} className="border-b border-slate-100">
                  <td className="px-3 py-3 text-slate-600">{row[0]}</td>
                  <td className="px-3 py-3 font-medium text-slate-700">
                    {row[1]}
                  </td>
                  <td className="px-3 py-3 text-slate-600">{row[2]}</td>
                  <td
                    className={`px-3 py-3 text-right font-bold ${
                      row[3].startsWith("+")
                        ? "text-green-600"
                        : "text-slate-700"
                    }`}
                  >
                    {row[3]}
                  </td>
                  <td className="px-3 py-3 text-slate-600">{row[4]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card title="플랫폼별 오늘 판매 현황">
          <div className="grid grid-cols-[160px_1fr] gap-5">
            <div className="flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 via-green-500 to-orange-400">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white text-xl font-bold text-blue-600">
                42%
              </div>
            </div>

            <div className="space-y-3 text-sm">
              {platformSales.map((row, i) => (
                <div key={row[0]} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={[
                        "h-3 w-3 rounded-full",
                        i === 0
                          ? "bg-blue-600"
                          : i === 1
                          ? "bg-green-500"
                          : i === 2
                          ? "bg-yellow-400"
                          : i === 3
                          ? "bg-orange-500"
                          : "bg-teal-400",
                      ].join(" ")}
                    />
                    <span className="font-medium text-slate-700">{row[0]}</span>
                  </div>
                  <span className="font-bold text-slate-600">
                    {["42.5%", "28.7%", "15.3%", "8.9%", "4.6%"][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <table className="mt-5 w-full text-sm">
            <thead className="bg-slate-50 text-xs text-slate-500">
              <tr>
                <th className="px-3 py-3 text-left">플랫폼</th>
                <th className="px-3 py-3 text-right">판매수량</th>
                <th className="px-3 py-3 text-right">판매금액</th>
              </tr>
            </thead>
            <tbody>
              {platformSales.map((row) => (
                <tr key={row[0]} className="border-b border-slate-100">
                  <td className="px-3 py-3 font-medium text-slate-700">
                    {row[0]}
                  </td>
                  <td className="px-3 py-3 text-right text-slate-700">
                    {row[1]}
                  </td>
                  <td className="px-3 py-3 text-right text-slate-700">
                    {row[2]}
                  </td>
                </tr>
              ))}
              <tr className="bg-slate-50 font-bold">
                <td className="px-3 py-3">합계</td>
                <td className="px-3 py-3 text-right">312</td>
                <td className="px-3 py-3 text-right">8,742,500원</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card title="진행중 발주">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-xs text-slate-500">
              <tr>
                <th className="px-3 py-3 text-left">발주번호</th>
                <th className="px-3 py-3 text-left">공급처</th>
                <th className="px-3 py-3 text-left">발주일</th>
                <th className="px-3 py-3 text-left">입고예정일</th>
                <th className="px-3 py-3 text-left">상태</th>
                <th className="px-3 py-3 text-right">총금액</th>
                <th className="px-3 py-3 text-right">발주수량</th>
              </tr>
            </thead>
            <tbody>
              {purchaseOrders.map((row) => (
                <tr key={row[0]} className="border-b border-slate-100">
                  <td className="px-3 py-3 font-medium text-slate-700">
                    {row[0]}
                  </td>
                  <td className="px-3 py-3 text-slate-600">{row[1]}</td>
                  <td className="px-3 py-3 text-slate-600">{row[2]}</td>
                  <td className="px-3 py-3 text-slate-600">{row[3]}</td>
                  <td className="px-3 py-3">
                    <StatusBadge status={row[4]} />
                  </td>
                  <td className="px-3 py-3 text-right text-slate-700">
                    {row[5]}
                  </td>
                  <td className="px-3 py-3 text-right text-slate-700">
                    {row[6]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card title="최근 판매 수집 내역">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-xs text-slate-500">
              <tr>
                <th className="px-3 py-3 text-left">수집일시</th>
                <th className="px-3 py-3 text-left">플랫폼</th>
                <th className="px-3 py-3 text-right">수집건수</th>
                <th className="px-3 py-3 text-right">판매수량</th>
                <th className="px-3 py-3 text-right">판매금액</th>
                <th className="px-3 py-3 text-left">상태</th>
              </tr>
            </thead>
            <tbody>
              {salesImports.map((row) => (
                <tr key={row[0]} className="border-b border-slate-100">
                  <td className="px-3 py-3 text-slate-600">{row[0]}</td>
                  <td className="px-3 py-3 font-medium text-slate-700">
                    {row[1]}
                  </td>
                  <td className="px-3 py-3 text-right text-slate-700">
                    {row[2]}
                  </td>
                  <td className="px-3 py-3 text-right text-slate-700">
                    {row[3]}
                  </td>
                  <td className="px-3 py-3 text-right text-slate-700">
                    {row[4]}
                  </td>
                  <td className="px-3 py-3">
                    <StatusBadge status={row[5]} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}