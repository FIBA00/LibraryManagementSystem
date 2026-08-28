import { Filter, Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

// internal imports
import SysPanel from "../components/panel.jsx";
import SearchBox from "../components/searchBox.jsx";
import StatusPill from "../components/statusPill.jsx";
import TableEmpty from "../components/tableEmpty.jsx";
import UserForm from "../components/forms/userForm.jsx";
import DeleteConfirmation from "../components/deleteConfirm.jsx";
import { money, SlimMetrics, withNotice } from "../lib/utils.js";

export default function StaffView({ data, onNotice, mutations, selectedLibrary }) {
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState("all");
  const [status, setStatus] = useState("all");
  const [mode, setMode] = useState("table");
  const [userFormOpen, setUserFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);
  const departments = [...new Set(data.staff.map(staff => staff.department))];

  const shown = data.staff.filter(
    staff =>
      (department === "all" || staff.department === department) &&
      (status === "all" || staff.status === status) &&
      `${staff.name} ${staff.email || ""} ${staff.role} ${staff.department}`
        .toLowerCase()
        .includes(query.toLowerCase())
  );
  function createUser(values, callbacks = {}) {
    mutations.createStaffMember.mutate(values, {
      onSuccess: staff => {
        onNotice(`${staff.name} was added to the people register.`);
        callbacks.onSuccess?.(staff);
      },
      onError: callbacks.onError,
    });
  }
  function updateUser(userId, values, callbacks = {}) {
    mutations.updateStaffMember.mutate(
      { staffId: userId, changes: values },
      {
        onSuccess: staff => {
          onNotice(`${staff.name} was revised.`);
          callbacks.onSuccess?.(staff);
        },
        onError: callbacks.onError,
      }
    );
  }

  function toggleStaffStatus(staff) {
    const nextStatus = staff.status === "active" ? "on-leave" : "active";
    mutations.updateStaffMember.mutate(
      { staffId: staff.id, changes: { status: nextStatus } },
      withNotice(onNotice, () => `${staff.name} is now marked ${nextStatus}.`)
    );
  }

  function openEdit(staff) {
    setEditingUser(staff);
    setUserFormOpen(true);
  }

  function closeUserForm(open) {
    setUserFormOpen(open);
    if (!open) setEditingUser(null);
  }

  function confirmDelete() {
    if (!deletingUser) return;
    mutations.deleteStaffMember.mutate(deletingUser.id, {
      onSuccess: staff => {
        onNotice(`${staff.name} was removed from the people register.`);
        setDeletingUser(null);
      },
    });
  }

  return (
    <div className="page">
      <SlimMetrics
        items={[
          { label: "Team members", value: data.staff.length },
          {
            label: "On duty",
            value: data.staff.filter(staff => staff.status === "active").length,
            tone: "sage-text",
          },
          { label: "Departments", value: departments.length },
          {
            label: "Monthly payroll",
            value: money.format(
              data.staff.reduce((sum, staff) => sum + staff.salary / 12, 0)
            ),
          },
        ]}
      />
      <SysPanel
        title="People and roles"
        meta={`${shown.length} users match the current discovery filters.`}
        action={
          <button
            className="primary-button compact"
            onClick={() => {
              setEditingUser(null);
              setUserFormOpen(true);
            }}
          >
            <Plus size={16} /> Add user
          </button>
        }
      >
        <div className="table-toolbar wrap record-discovery-bar">
          <SearchBox
            value={query}
            onChange={setQuery}
            placeholder="Find name, email, role, or department…"
          />
          <label className="select-box">
            <Filter size={15} />
            <select
              value={department}
              onChange={event => setDepartment(event.target.value)}
            >
              <option value="all">All departments</option>
              {departments.map(function handleDep(item) {
                return (
                  <option key={item} value={item}>
                    {item}
                  </option>
                );
              })}
            </select>
          </label>
          <label className="select-box">
            <select
              value={status}
              onChange={event => setStatus(event.target.value)}
            >
              <option value="all">All user statuses</option>
              <option value="active">Active</option>
              <option value="on-leave">On leave</option>
            </select>
          </label>
          <div className="view-toggle">
            <button
              className={mode === "cards" ? "is-active" : ""}
              onClick={() => setMode("cards")}
            >
              Cards
            </button>
            <button
              className={mode === "table" ? "is-active" : ""}
              onClick={() => setMode("table")}
            >
              Table
            </button>
          </div>
        </div>
        {mode === "cards" ? (
          <div className="staff-card-grid">
            {shown.map(staff => (
              <article className="staff-card" key={staff.id}>
                <div className="staff-card-top">
                  <span
                    className="staff-avatar large"
                    style={{ backgroundColor: staff.avatarColor }}
                  >
                    {staff.initials}
                  </span>
                  <StatusPill status={staff.status} />
                </div>
                <h3>{staff.name}</h3>
                <p>{staff.role}</p>
                <div>
                  <span>{staff.department}</span>
                  <span className="card-record-actions">
                    <button
                      className="inline-button"
                      onClick={() => openEdit(staff)}
                    >
                      <Pencil size={12} /> Edit
                    </button>
                    <button
                      className="inline-button danger"
                      onClick={() => setDeletingUser(staff)}
                    >
                      <Trash2 size={12} /> Delete
                    </button>
                  </span>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="data-table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Team member</th>
                  <th>Role</th>
                  <th>Department</th>
                  <th>Annual salary</th>
                  <th>Status</th>
                  <th>Record actions</th>
                </tr>
              </thead>
              <tbody>
                {shown.map(function handleStaff(staff) {
                  return (
                    <tr key={staff.id}>
                      <td>
                        <div className="table-person">
                          <span
                            className="staff-avatar"
                            style={{ backgroundColor: staff.avatarColor }}
                          >
                            {staff.initials}
                          </span>
                          <span>
                            <strong>{staff.name}</strong>
                            <small>
                              {staff.email || "Profile email pending"}
                            </small>
                          </span>
                        </div>
                      </td>
                      <td>{staff.role}</td>
                      <td>{staff.department}</td>
                      <td>{money.format(staff.salary)}</td>
                      <td>
                        <StatusPill status={staff.status} />
                      </td>
                      <td>
                        <span className="row-actions">
                          <button
                            className="row-action"
                            onClick={() => toggleStaffStatus(staff)}
                            disabled={mutations.updateStaffMember.isPending}
                          >
                            {staff.status === "active" ? "Leave" : "Activate"}
                          </button>
                          <button
                            className="row-icon-action"
                            onClick={() => openEdit(staff)}
                            aria-label={`Edit ${staff.name}`}
                          >
                            <Pencil size={15} />
                          </button>
                          <button
                            className="row-icon-action danger"
                            onClick={() => setDeletingUser(staff)}
                            aria-label={`Delete ${staff.name}`}
                          >
                            <Trash2 size={15} />
                          </button>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        
        {!shown.length ? (
          <TableEmpty message="No people records match the current search and filters." />
        ) : null}

      </SysPanel>

      <UserForm
        open={userFormOpen}
        onOpenChange={closeUserForm}
        libraries={data.libraries}
        selectedLibrary={selectedLibrary}
        user={editingUser}
        onCreate={createUser}
        onUpdate={updateUser}
        pending={
          mutations.createStaffMember.isPending ||
          mutations.updateStaffMember.isPending
        }
      />

      <DeleteConfirmation
        open={Boolean(deletingUser)}
        onOpenChange={open => {
          if (!open) setDeletingUser(null);
        }}
        recordType="user"
        recordName={deletingUser?.name || "this user"}
        onConfirm={confirmDelete}
        pending={mutations.deleteStaffMember.isPending}
      />
    </div>
  );
}
