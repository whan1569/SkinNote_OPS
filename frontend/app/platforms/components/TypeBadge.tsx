import { TYPE_COLORS } from "../features/constants";
import type { PlatformActiveType } from "../features/types";

type Props = {
  type: PlatformActiveType;
};

export function TypeBadge({ type }: Props) {
  const color = TYPE_COLORS[type];

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-bold ${color}`}
    >
      {type}
    </span>
  );
}
