import { classNameMerge } from "../../../lib/utils.js";

export default function SlimMetrics({ items }) {
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
