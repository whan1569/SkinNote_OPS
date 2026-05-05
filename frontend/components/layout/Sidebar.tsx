"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Box, ChevronDown } from "lucide-react";
import { menuGroups } from "@/lib/menu";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-[280px] bg-[#061226] text-white">
      <div className="flex h-full flex-col px-5 py-6">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-600">
            <Box size={24} />
          </div>

          <div>
            <h1 className="text-lg font-bold leading-tight">재고관리 시스템</h1>
            <p className="text-xs text-slate-400">INVENTORY MANAGEMENT</p>
          </div>
        </div>

        <nav className="flex-1 space-y-6 overflow-y-auto pr-1">
          {menuGroups.map((group) => (
            <div key={group.title}>
              <p className="mb-2 px-2 text-xs font-semibold text-blue-300">
                {group.title}
              </p>

              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;

                  // 핵심 수정:
                  // startsWith를 쓰면 /inventory-transactions가 /inventory에도 걸림.
                  // 그래서 정확히 같은 경로일 때만 active 처리.
                  const active = pathname === item.href;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={[
                        "flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition",
                        active
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-900/30"
                          : "text-slate-300 hover:bg-white/10 hover:text-white",
                      ].join(" ")}
                    >
                      <Icon size={18} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>

              <div className="mt-5 border-b border-white/10" />
            </div>
          ))}
        </nav>

        <div className="mt-4 flex items-center justify-between rounded-xl bg-white/5 px-3 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-700">
              A
            </div>

            <div>
              <p className="text-sm font-semibold">admin</p>
              <p className="text-xs text-slate-400">관리자</p>
            </div>
          </div>

          <ChevronDown size={16} className="text-slate-400" />
        </div>
      </div>
    </aside>
  );
}