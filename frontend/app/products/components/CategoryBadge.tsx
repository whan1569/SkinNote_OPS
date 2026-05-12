import { CATEGORY_COLORS } from "../features/constants";
import type { ProductActiveCategory } from "../features/types";

type Props = {
  category: ProductActiveCategory;
};

export function CategoryBadge({ category }: Props) {
  const color = CATEGORY_COLORS[category];

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${color}`}>
      {category}
    </span>
  );
}
