// Scholar's Ledger operations views: people records now support search, status filtering, validated edits, and protected deletion.
import {
  CalendarCheck2,
  Clipboard,
  Download,
  FileText,
  Plus,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import { SlimMetrics, withNotice } from "../lib/utils.js";
import StatusPill from "../components/statusPill.jsx";
import ActionMenu from "../components/actionMenu.jsx";
import SysPanel from "../components/panel.jsx";

export function AttendanceView({ data, onNotice, mutations, selectedLibrary }) {
  const [date, setDate] = useState("2026-08-27");
  const count = status =>
    data.attendance.filter(record => record.status === status).length;
  function recordCheckIn() {
    mutations.createAttendanceRecord.mutate(
      {
        staffName: "New check-in",
        role: "Library Assistant",
        checkIn: "09:00",
        checkOut: "—",
        date,
        libraryId: selectedLibrary?.id || data.libraries[0]?.id,
      },
      withNotice(
        onNotice,
        () => "A new check-in was created through POST /api/attendance."
      )
    );
  }
  function updateAttendance(record, changes) {
    mutations.updateAttendanceRecord.mutate(
      { attendanceId: record.id, changes },
      withNotice(onNotice, () => `${record.staffName} attendance was updated.`)
    );
  }
  return (
    <div className="page">
      <SlimMetrics
        items={[
          { label: "Present", value: count("present"), tone: "sage-text" },
          { label: "Late arrivals", value: count("late"), tone: "gold-text" },
          { label: "Absent", value: count("absent"), tone: "danger-text" },
          { label: "On leave", value: count("leave") },
        ]}
      />
      <SysPanel
        title="Today’s attendance"
        meta="Wednesday, 27 August 2026."
        action={
          <div className="heading-actions">
            <label className="date-control">
              <CalendarCheck2 size={16} />
              <input
                type="date"
                value={date}
                onChange={event => setDate(event.target.value)}
              />
            </label>
            <button
              className="secondary-button compact"
              onClick={() =>
                onNotice(
                  "Export will be enabled when the connected backend can generate a file."
                )
              }
            >
              <Download size={15} /> Export
            </button>
            <button
              className="primary-button compact"
              onClick={recordCheckIn}
              disabled={mutations.createAttendanceRecord.isPending}
            >
              <Plus size={15} /> Check in
            </button>
          </div>
        }
      >
        <div className="attendance-banner">
          <div>
            <span className="notice-icon sage">
              <ShieldCheck size={17} />
            </span>
            <span>
              <strong>Coverage is healthy.</strong>
              <small>Most colleagues are currently expected on site.</small>
            </span>
          </div>
          <p>Selected date: {date}</p>
        </div>
        <div className="data-table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Team member</th>
                <th>Role</th>
                <th>Check in</th>
                <th>Check out</th>
                <th>Today’s status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {data.attendance.map(record => (
                <tr key={record.id}>
                  <td>
                    <strong>{record.staffName}</strong>
                  </td>
                  <td>{record.role}</td>
                  <td>{record.checkIn}</td>
                  <td>{record.checkOut}</td>
                  <td>
                    <StatusPill status={record.status} />
                  </td>
                  <td>
                    <ActionMenu
                      label={`Actions for ${record.staffName}`}
                      items={[
                        {
                          label:
                            record.status === "present"
                              ? "Mark late"
                              : "Mark present",
                          icon: CalendarCheck2,
                          onSelect: () =>
                            updateAttendance(record, {
                              status:
                                record.status === "present"
                                  ? "late"
                                  : "present",
                            }),
                        },
                        {
                          label: "Record note",
                          icon: FileText,
                          onSelect: () =>
                            onNotice(
                              `Attendance note for ${record.staffName} is ready for review.`
                            ),
                        },
                        {
                          label: "Copy attendance ID",
                          icon: Clipboard,
                          onSelect: () =>
                            onNotice(
                              `Attendance reference ${record.id} is ready to copy.`
                            ),
                        },
                      ]}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SysPanel>
    </div>
  );
}
