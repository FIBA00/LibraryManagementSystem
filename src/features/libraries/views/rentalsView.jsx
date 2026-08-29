import { Clipboard, FileText, Plus, RefreshCw, UserRound } from "lucide-react";
import { useState } from "react";

// ! internal imports
import { withNotice } from "../../../lib/utils.js";
import SearchBox from "../components/searchBox.jsx";
import SysPanel from "../components/panel.jsx";
import StatusPill from "../components/statusPill.jsx";
import TableEmpty from "../components/tableEmpty.jsx";
import ActionMenu from "../components/actionMenu.jsx";
import RentalForm from "../components/forms/rentalForm.jsx";
import SlimMetrics from "../components/slimMetrics.jsx";
import Busy from "../components/busyBadge.jsx";
import Button from "../components/button.jsx";

export default function RentalsView({
  data,
  onNotice,
  mutations,
  selectedLibrary,
  onMemberSelect,
  onDownloadRentalReceipt,
}) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [rentalFormOpen, setRentalFormOpen] = useState(false);
  const count = status =>
    status === "all"
      ? data.rentals.length
      : data.rentals.filter(rental => rental.status === status).length;
  const shown = data.rentals.filter(
    rental =>
      (filter === "all" || rental.status === filter) &&
      `${rental.memberName} ${rental.bookTitle}`
        .toLowerCase()
        .includes(query.toLowerCase())
  );
  const money = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
  function createRental(values, callbacks = {}) {
    mutations.createRental.mutate(values, {
      onSuccess: rental => {
        onNotice(`${rental.bookTitle} was issued to ${rental.memberName}.`);
        onDownloadRentalReceipt(rental);
        callbacks.onSuccess?.(rental);
      },
      onError: callbacks.onError,
    });
  }
  function returnBook(rental) {
    mutations.returnRental.mutate(
      { rentalId: rental.id, input: {} },
      withNotice(onNotice, () => `${rental.bookTitle} is marked returned.`)
    );
  }
  function renewBook(rental) {
    mutations.renewRental.mutate(
      { rentalId: rental.id, input: {} },
      withNotice(onNotice, () => `${rental.bookTitle} was renewed.`)
    );
  }
  function loanMenu(rental) {
    return [
      {
        label: "Renew loan",
        icon: RefreshCw,
        onSelect: () => renewBook(rental),
        disabled: mutations.renewRental.isPending,
      },
      {
        label: "Open member profile",
        icon: UserRound,
        onSelect: () => onMemberSelect(rental.memberName),
      },
      {
        label: "Download receipt",
        icon: FileText,
        onSelect: () => onDownloadRentalReceipt(rental),
      },
      {
        label: "Copy loan reference",
        icon: Clipboard,
        onSelect: () =>
          onNotice(`Loan reference ${rental.id} is ready to copy.`),
      },
    ];
  }
  return (
    <div className="page">
      <SlimMetrics
        items={[
          { label: "Open loans", value: count("active") },
          { label: "Overdue", value: count("overdue"), tone: "danger-text" },
          { label: "Returned", value: count("returned") },
          {
            label: "Outstanding fines",
            value: money.format(
              data.rentals.reduce((sum, rental) => sum + rental.fineAmount, 0)
            ),
          },
        ]}
      />
      <SysPanel
        title="Loan desk"
        meta="Review live circulation by patron, title, due date, and return status."
        action={
          <Button
            variant="primary"
            compact
            onClick={() => setRentalFormOpen(true)}
          >
            <Plus size={16} /> New rental
          </Button>
        }
      >
        <div className="table-toolbar wrap">
          <div className="filter-tabs">
            {["all", "active", "overdue", "returned"].map(
              function handleStatus(status) {
                return (
                  // TODO: change this to variant based on status
                  <button
                    key={status}
                    onClick={() => setFilter(status)}
                    className={filter === status ? "is-active" : ""}
                  >
                    {status === "all" ? "All loans" : status}
                    <span>{count(status)}</span>
                  </button>
                );
              }
            )}
          </div>
          <SearchBox
            value={query}
            onChange={setQuery}
            placeholder="Search reader or book…"
          />
        </div>
        <div className="data-table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Reader</th>
                <th>Book</th>
                <th>Rented</th>
                <th>Due</th>
                <th>Renewals</th>
                <th>Fine</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {shown.map(rental => (
                <tr key={rental.id}>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => onMemberSelect(rental.memberName)}
                    >
                      <strong>{rental.memberName}</strong>
                      <small>Open member profile</small>
                    </Button>
                  </td>
                  <td>
                    <strong className="inline-strong">
                      {rental.bookTitle}
                    </strong>
                  </td>
                  <td>{rental.rentedDate}</td>
                  <td>{rental.dueDate}</td>
                  <td>{rental.renewalCount}</td>
                  <td
                    className={rental.fineAmount ? "danger-text" : "muted-text"}
                  >
                    {rental.fineAmount
                      ? `$${rental.fineAmount.toFixed(2)}`
                      : "—"}
                  </td>
                  <td>
                    <StatusPill status={rental.status} />
                  </td>
                  <td>
                    {rental.status === "active" ||
                    rental.status === "overdue" ? (
                      <span className="row-actions">
                        <Button
                          variant="row"
                          onClick={() => returnBook(rental)}
                          disabled={mutations.returnRental.isPending}
                        >
                          <Busy active={mutations.returnRental.isPending} />{" "}
                          Return
                        </Button>
                        <ActionMenu
                          label={`Actions for ${rental.bookTitle}`}
                          items={loanMenu(rental)}
                        />
                      </span>
                    ) : (
                      <span className="row-actions">
                        <Button
                          variant="row"
                          onClick={() => onDownloadRentalReceipt(rental)}
                        >
                          Receipt
                        </Button>
                        <ActionMenu
                          label={`Actions for ${rental.bookTitle}`}
                          items={loanMenu(rental)}
                        />
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!shown.length ? (
            <TableEmpty message="No circulation records match this view." />
          ) : null}
        </div>
      </SysPanel>

      <RentalForm
        open={rentalFormOpen}
        onOpenChange={setRentalFormOpen}
        libraries={data.libraries}
        books={data.books}
        selectedLibrary={selectedLibrary}
        onCreate={createRental}
        pending={mutations.createRental.isPending}
      />
    </div>
  );
}
