import { PLATFORM_ICON_COLORS } from "../features/constants";
import type { PlatformIconCode } from "../features/types";

type Props = {
  icon: PlatformIconCode;
};

export function PlatformIcon({ icon }: Props) {
  const color = PLATFORM_ICON_COLORS[icon];

  return (
    <span
      className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-extrabold text-white ${color}`}
    >
      {icon}
    </span>
  );
}
