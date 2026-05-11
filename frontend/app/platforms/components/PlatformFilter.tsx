import {
    INTEGRATION_TYPES,
    PLATFORM_STATUSES,
    PLATFORM_TYPES,
  } from "../features/constants";
  
  import type {
    IntegrationType,
    PlatformFilter as PlatformFilterType,
    PlatformStatus,
    PlatformType,
  } from "../features/types";
  
  type Props = {
    filter: PlatformFilterType;
    onChange: (filter: PlatformFilterType) => void;
    onReset: () => void;
  };
  
  export function PlatformFilter({
    filter,
    onChange,
    onReset,
  }: Props) {
    const updateFilter = <K extends keyof PlatformFilterType>(
      key: K,
      value: PlatformFilterType[K],
    ) => {
      onChange({
        ...filter,
        [key]: value,
      });
    };
  
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid grid-cols-4 gap-4">
          <div>
            <label className="mb-2 block text-xs font-bold text-slate-500">
              플랫폼 검색
            </label>
            <input
              value={filter.keyword}
              onChange={(event) =>
                updateFilter("keyword", event.target.value)
              }
              placeholder="플랫폼명 또는 코드 입력"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none"
            />
          </div>
  
          <div>
            <label className="mb-2 block text-xs font-bold text-slate-500">
              유형
            </label>
            <select
              value={filter.type}
              onChange={(event) =>
                updateFilter("type", event.target.value as PlatformType)
              }
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none"
            >
              {PLATFORM_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
  
          <div>
            <label className="mb-2 block text-xs font-bold text-slate-500">
              연동 방식
            </label>
            <select
              value={filter.integrationType}
              onChange={(event) =>
                updateFilter(
                  "integrationType",
                  event.target.value as IntegrationType,
                )
              }
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none"
            >
              {INTEGRATION_TYPES.map((integrationType) => (
                <option key={integrationType} value={integrationType}>
                  {integrationType}
                </option>
              ))}
            </select>
          </div>
  
          <div>
            <label className="mb-2 block text-xs font-bold text-slate-500">
              상태
            </label>
            <select
              value={filter.status}
              onChange={(event) =>
                updateFilter(
                  "status",
                  event.target.value as PlatformStatus,
                )
              }
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none"
            >
              {PLATFORM_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>
  
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onReset}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700"
          >
            초기화
          </button>
  
          <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white">
            검색
          </button>
        </div>
      </section>
    );
  }
