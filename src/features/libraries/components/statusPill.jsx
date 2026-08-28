// Scholar's Ledger primitives: paper cards, direct status language, and small cobalt operations cues.
import { cva } from "class-variance-authority";
import { classNameMerge } from "../../../lib/utils.js";

const labels = {
  active: "Active",
  returned: "Returned",
  overdue: "Overdue",
  maintenance: "Maintenance",
  excellent: "Excellent",
  good: "Good",
  fair: "Fair",
  paid: "Paid",
  pending: "Pending",
  processing: "Processing",
  present: "Present",
  absent: "Absent",
  late: "Late",
  leave: "Leave",
  "on-leave": "On leave",
};

const STATUS_TONE = {
  active: "success",
  returned: "success",
  paid: "success",
  present: "success",
  excellent: "success",
  overdue: "danger",
  absent: "danger",
  maintenance: "warning",
  pending: "warning",
  processing: "warning",
  late: "warning",
  fair: "warning",
  good: "neutral",
  leave: "neutral",
  "on-leave": "neutral",
};

const pillVariants = cva(
  "inline-flex flex-none items-center justify-center rounded-full px-[7px] py-1 text-[9px] font-extrabold leading-none",
  {
    variants: {
      tone: {
        success: "text-success bg-success-bg",
        danger: "text-danger bg-danger-bg",
        warning: "text-warning bg-warning-bg",
        neutral: "text-text-muted bg-surface-hover",
      },
    },
    defaultVariants: {
      tone: "neutral",
    },
  }
);

export default function StatusPill({ status }) {
  const tone = STATUS_TONE[status] ?? "neutral";

  return (
    <span className={classNameMerge(pillVariants({ tone }))}>
      {labels[status] ?? status}
    </span>
  );
}
