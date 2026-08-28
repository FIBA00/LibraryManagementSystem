import { Download, Check } from "lucide-react";
import { useState } from "react";

// internal imports
import { money, SlimMetrics, withNotice } from "../lib/utils.js";
import SysPanel from "../components/panel.jsx";
import SearchBox from "../components/searchBox.jsx";
import StatusPill from "../components/statusPill.jsx";
import TableEmpty from "../components/tableEmpty.jsx";

export default function PayrollView({ data, onNotice, mutations, selectedLibrary }) {
  const [query, setQuery] = useState("");
  const shown = data.payroll.filter(record =>
    `${record.staffName} ${record.role}`
      .toLowerCase()
      .includes(query.toLowerCase())
  );
  const net = data.payroll.reduce((sum, record) => sum + record.netPay, 0);
  function processCurrentPayroll() {
    mutations.processPayroll.mutate(
      { libraryId: selectedLibrary?.id },
      withNotice(
        onNotice,
        records =>
          `${records.length} payroll records were processed through POST /api/payroll/process.`
      )
    );
  }
  return (
    <div className="page">
      <SlimMetrics
        items={[
          { label: "Current period", value: "Aug 2026" },
          { label: "Records", value: data.payroll.length },
          { label: "Net payroll", value: money.format(net) },
          {
            label: "Ready to pay",
            value: data.payroll.filter(record => record.status === "paid")
              .length,
            tone: "sage-text",
          },
        ]}
      />
      <SysPanel
        title="Payroll register"
        meta="Monthly record by staff member, department, and payment state."
        action={
          <div className="heading-actions">
            <button
              className="secondary-button compact"
              onClick={() =>
                onNotice(
                  "Export is intentionally a placeholder until a backend generates the file."
                )
              }
            >
              <Download size={15} /> Export
            </button>
            <button
              className="primary-button compact"
              onClick={processCurrentPayroll}
              disabled={mutations.processPayroll.isPending}
            >
              <Check size={15} />{" "}
              {mutations.processPayroll.isPending
                ? "Processing…"
                : "Process payroll"}
            </button>
          </div>
        }
      >
        <div className="table-toolbar">
          <SearchBox
            value={query}
            onChange={setQuery}
            placeholder="Search payroll records…"
          />
        </div>
        <div className="data-table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Team member</th>
                <th>Department</th>
                <th>Hours</th>
                <th>Gross pay</th>
                <th>Deductions</th>
                <th>Net pay</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {shown.map(record => (
                <tr key={record.id}>
                  <td>
                    <strong>{record.staffName}</strong>
                    <small>{record.role}</small>
                  </td>
                  <td>{record.department}</td>
                  <td>{record.hoursWorked} h</td>
                  <td>{money.format(record.grossPay)}</td>
                  <td>{money.format(record.totalDeductions)}</td>
                  <td>
                    <strong>{money.format(record.netPay)}</strong>
                  </td>
                  <td>
                    <StatusPill status={record.status} />
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="5">Total net payroll</td>
                <td>
                  {money.format(
                    shown.reduce((sum, record) => sum + record.netPay, 0)
                  )}
                </td>
                <td />
              </tr>
            </tfoot>
          </table>
          {!shown.length ? (
            <TableEmpty message="No payroll records match this search." />
          ) : null}
        </div>
      </SysPanel>
    </div>
  );
}
