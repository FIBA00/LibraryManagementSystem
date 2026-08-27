// Scholar's Ledger primitives: paper cards, direct status language, and small cobalt operations cues.
import { BookOpen, Search } from "lucide-react";

export function Panel({ title, meta, action, className = "", children }) {
  return <section className={`panel ${className}`}><div className="panel-heading"><div><h2>{title}</h2>{meta ? <p>{meta}</p> : null}</div>{action}</div>{children}</section>;
}

export function StatusPill({ status }) {
  const labels = { active: "Active", returned: "Returned", overdue: "Overdue", maintenance: "Maintenance", excellent: "Excellent", good: "Good", fair: "Fair", paid: "Paid", pending: "Pending", processing: "Processing", present: "Present", absent: "Absent", late: "Late", leave: "Leave", "on-leave": "On leave" };
  return <span className={`status-pill ${status}`}>{labels[status] || status}</span>;
}

export function SearchBox({ value, onChange, placeholder = "Search records…" }) {
  return <label className="search-box"><Search size={16} /><input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} /></label>;
}

export function TableEmpty({ message }) { return <div className="table-empty"><BookOpen size={22} /><p>{message}</p></div>; }
