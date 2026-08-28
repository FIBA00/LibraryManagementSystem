export default function MetricCard({ label, value, detail, tone, icon: Icon }) {
  return (
    <article className="metric-card">
      <div className={`metric-icon ${tone}`}>
        <Icon size={19} strokeWidth={1.75} />
      </div>
      <p>{label}</p>
      <h3>{value}</h3>
      <span
        className={
          tone === "danger" ? "metric-detail warning" : "metric-detail"
        }
      >
        {detail}
      </span>
    </article>
  );
}
