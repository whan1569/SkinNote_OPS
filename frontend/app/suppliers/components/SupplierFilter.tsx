import { SUPPLIER_STATUSES } from "../features/constants";
import type {
  SupplierFilter as SupplierFilterType,
  SupplierStatus,
} from "../features/types";

type Props = {
  filter: SupplierFilterType;
  onChange: (filter: SupplierFilterType) => void;
  onReset: () => void;
};

export function SupplierFilter({ filter, onChange, onReset }: Props) {
  const updateFilter = <K extends keyof SupplierFilterType>(
    key: K,
    value: SupplierFilterType[K],
  ) => {
    onChange({
      ...filter,
      [key]: value,
    });
  };

  return (
    <section className="mb-5 rounded-2xl border border-slate-200 bg-white p-5">
      <div className="grid grid-cols-5 gap-4">
        <div>
          <label className="mb-2 block text-xs font-extrabold text-slate-700">
            회사 코드
          </label>
          <input
            value={filter.companyCode}
            onChange={(event) =>
              updateFilter("companyCode", event.target.value)
            }
            placeholder="회사 코드 입력"
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-extrabold text-slate-700">
            공급처명
          </label>
          <input
            value={filter.supplierName}
            onChange={(event) =>
              updateFilter("supplierName", event.target.value)
            }
            placeholder="공급처명 입력"
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-extrabold text-slate-700">
            담당자명
          </label>
          <input
            value={filter.managerName}
            onChange={(event) =>
              updateFilter("managerName", event.target.value)
            }
            placeholder="담당자명 입력"
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-extrabold text-slate-700">
            연락처
          </label>
          <input
            value={filter.phone}
            onChange={(event) => updateFilter("phone", event.target.value)}
            placeholder="연락처 입력"
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-extrabold text-slate-700">
            상태
          </label>
          <select
            value={filter.status}
            onChange={(event) =>
              updateFilter("status", event.target.value as SupplierStatus)
            }
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none"
          >
            {SUPPLIER_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={onReset}
          className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700"
        >
          초기화
        </button>
      </div>
    </section>
  );
}
