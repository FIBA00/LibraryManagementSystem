// Scholar's Ledger management views: catalogue, branch, and loan-desk actions resolve through validated record forms and contextual menus.
import { ListFilter, Plus } from "lucide-react";
import { useState } from "react";

// ! internal imports

import { withNotice } from "../../../lib/utils.js";
import SysPanel from "../components/panel.jsx";
import SearchBox from "../components/searchBox.jsx";
import StatusPill from "../components/statusPill.jsx";
import TableEmpty from "../components/tableEmpty.jsx";
import PlanBadge from "../components/planBadge.jsx";
import LibraryForm from "../components/forms/libraryForm.jsx";
import SlimMetrics from "../components/slimMetrics.jsx";
import Busy from "../components/busyBadge.jsx";
import Button from "../components/button.jsx";

export default function LibrariesView({ data, onNotice, mutations }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [libraryFormOpen, setLibraryFormOpen] = useState(false);

  const shown = data.libraries.filter(
    library =>
      (status === "all" || library.status === status) &&
      `${library.name} ${library.city} ${library.branch}`
        .toLowerCase()
        .includes(query.toLowerCase())
  );

  function createLibrary(values, callbacks = {}) {
    mutations.createLibrary.mutate(values, {
      onSuccess: library => {
        onNotice(`${library.name} was registered in the library network.`);
        callbacks.onSuccess?.(library);
      },
      onError: callbacks.onError,
    });
  }

  function toggleStatus(library) {
    const nextStatus =
      library.status === "maintenance" ? "active" : "maintenance";
    mutations.updateLibrary.mutate(
      { libraryId: library.id, changes: { status: nextStatus } },
      withNotice(onNotice, () => `${library.name} is now marked ${nextStatus}.`)
    );
  }

  return (
    <div className="page">
      <SlimMetrics
        items={[
          { label: "Branches", value: data.libraries.length },
          {
            label: "Total membership",
            value: data.libraries
              .reduce((sum, library) => sum + library.members, 0)
              .toLocaleString(),
          },
          {
            label: "Service health",
            value: `${data.libraries.filter(library => library.status === "active").length}/${data.libraries.length} active`,
          },
        ]}
      />

      <SysPanel
        title="Branch register"
        meta="Location, membership, plan, and operational status."
        action={
          <Button
            variant="primary"
            compact
            onClick={() => setLibraryFormOpen(true)}
          >
            <Plus size={16} /> Add library
          </Button>
        }
      >
        <div className="table-toolbar">
          <SearchBox
            value={query}
            onChange={setQuery}
            placeholder="Search libraries, branches, or cities…"
          />
          <label className="select-box">
            <ListFilter size={15} />
            <select
              value={status}
              onChange={event => setStatus(event.target.value)}
            >
              <option value="all">All statuses</option>
              <option value="active">Active</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </label>
        </div>
        <div className="data-table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Library</th>
                <th>Location</th>
                <th>Members</th>
                <th>Collection</th>
                <th>Plan</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {shown.map(library => (
                <tr key={library.id}>
                  <td>
                    <strong>{library.name}</strong>
                    <small>
                      {library.libraryType === "branch"
                        ? `${library.branch} branch`
                        : library.branch}
                    </small>
                  </td>
                  <td>
                    {library.city}, {library.state}
                  </td>
                  <td>{library.members.toLocaleString()}</td>
                  <td>{library.totalBooks.toLocaleString()} books</td>
                  <td>
                    <PlanBadge plan={library.subscriptionPlan} />
                  </td>
                  <td>
                    <StatusPill status={library.status} />
                  </td>
                  <td>
                    <Button
                      variant="row"
                      onClick={() => toggleStatus(library)}
                      disabled={mutations.updateLibrary.isPending}
                    >
                      <Busy active={mutations.updateLibrary.isPending} />
                      {library.status === "maintenance" ? "Reopen" : "Pause"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!shown.length ? (
            <TableEmpty message="No library branches match this search." />
          ) : null}
        </div>
      </SysPanel>

      <LibraryForm
        open={libraryFormOpen}
        onOpenChange={setLibraryFormOpen}
        libraries={data.libraries}
        onCreate={createLibrary}
        pending={mutations.createLibrary.isPending}
      />
    </div>
  );
}
