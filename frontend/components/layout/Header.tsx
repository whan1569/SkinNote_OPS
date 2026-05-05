"use client";

import { Menu } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-8">
      <button className="rounded-lg p-2 hover:bg-slate-100">
        <Menu size={22} />
      </button>

      <div className="text-sm text-slate-500">SkinNote OPS</div>
    </header>
  );
}