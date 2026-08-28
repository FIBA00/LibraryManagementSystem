import { clsx } from "clsx";
import { LoaderCircle } from "lucide-react";
import { twMerge } from "tailwind-merge";

export function classNameMerge(...inputs) {
  return twMerge(clsx(inputs));
}

export function SlimMetrics({ items }) {
  return (
    <div className="metric-slim-row">
      {items.map(item => (
        <div key={item.label}>
          <span>{item.label}</span>
          <strong className={classNameMerge(item.tone)}>{item.value}</strong>
        </div>
      ))}
    </div>
  );
}
export function withNotice(onNotice, success) {
  return { onSuccess: result => onNotice(success(result)) };
}
export function Busy({ active, size = 14 }) {
  return active ? (
    <LoaderCircle className="mutation-spinner" size={size} />
  ) : null;
}

export const parseDate = value =>
  new Date(
    /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : `${value}, 2026`
  ).getTime() || 0;

export const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
