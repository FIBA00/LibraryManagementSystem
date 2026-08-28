// Scholar's Ledger primitives: paper cards, direct status language, and small cobalt operations cues.

export default function StatusPill({ status }) {
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
  return (
    <span className={`status-pill ${status}`}>{labels[status] || status}</span>
  );
}
