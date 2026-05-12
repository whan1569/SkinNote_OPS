import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
  } from "lucide-react";
  
  export function Pagination() {
    return (
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
          63
        </button>
  
        <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600">
          <ChevronRight size={16} />
        </button>
      </div>
    );
  }
