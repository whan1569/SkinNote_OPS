import { STATUS_COLORS } from "../features/constants";
import type { SupplierPriceActiveStatus } from "../features/types";

type Props = {
  status: SupplierPriceActiveStatus;
};

export function StatusBadge({ status }: Props) {
  const color = STATUS_COLORS[status];

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-bold ${color}`}
    >
      {status}
    </span>
  );
}
