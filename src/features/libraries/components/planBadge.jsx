import { cva } from "class-variance-authority";
import { classNameMerge } from "../lib/utils.js";

const badgeVariants = cva(
  "rounded px-1.5 py-1 text-[9px] font-extrabold capitalize",
  {
    variants: {
      plan: {
        premium: "text-[#74510d] bg-[#fff2d0]",
        standard: "text-primary bg-primary/10",
        basic: "text-text-muted bg-muted",
      },
    },
    defaultVariants: {
      plan: "basic",
    },
  }
);

export default function PlanBadge({ plan }) {
  return (
    <span className={classNameMerge(badgeVariants({ plan }))}>{plan}</span>
  );
}
