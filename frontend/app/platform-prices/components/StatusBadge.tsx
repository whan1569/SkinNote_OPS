import { SALE_STATUS_COLORS } from "../features/constants";
import type { PlatformActiveSaleStatus } from "../features/types";

type Props = {
  status: PlatformActiveSaleStatus;
};

export function StatusBadge({ status }: Props) {
  const color = SALE_STATUS_COLORS[status];

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${color}`}>
      {status}
    </span>
  );
}
