// Scholar's Ledger member profile: rental history becomes a concise, searchable and action-ready reader record.
import {
  ArrowDownUp,
  ArrowLeft,
  BookOpen,
  CircleDollarSign,
  Clock3,
  ListFilter,
  Mail,
  ReceiptText,
} from "lucide-react";
import { useMemo, useState } from "react";

// ! internal imports
import { parseDate } from "../../../lib/utils.js";
import StatusPill from "../components/statusPill.jsx";
import Button from "../components/button.jsx";


// hooks
import useAppSettings from "../hooks/useAppSettings.js";
import useLibraryDashboardQuery from "../hooks/useLibraryDashboardQuery.js";
import useLibraryMutations from "../hooks/useLibraryMutations.js";

export default function MemberProfile({memberName,onDownloadRentalReceipt,}) {
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("newest");
  
  // TODO: get the library from the params
  const [selectedLibraryId, setSelectedLibraryId] = useState(null);
  const { libraries, data, isLoading, isError, refetch } =
    useLibraryDashboardQuery(selectedLibraryId);
  const selectedLibrary =
    libraries.find(library => library.id === selectedLibraryId) || null;
  const mutations = useLibraryMutations();

  
  const history = data.rentals.filter(
    rental => rental.memberName === memberName
  );
  const active = history.filter(
    rental => rental.status === "active" || rental.status === "overdue"
  );
  const fines = history.reduce((sum, rental) => sum + rental.fineAmount, 0);
  const memberEmail =
    history.find(rental => rental.memberEmail)?.memberEmail ||
    "Contact record pending";

  const orderedHistory = useMemo(
    () =>
      [...history]
        .filter(rental => status === "all" || rental.status === status)
        .sort((a, b) =>
          sort === "oldest"
            ? parseDate(a.rentedDate) - parseDate(b.rentedDate)
            : sort === "fine"
              ? b.fineAmount - a.fineAmount
              : sort === "title"
                ? a.bookTitle.localeCompare(b.bookTitle)
                : parseDate(b.rentedDate) - parseDate(a.rentedDate)
        ),
    // TODO: check whats going !
    
    // eslint-disable-next-line react-hooks/preserve-manual-memoization
    [history, status, sort]
  );
  const money = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  if (!memberName || !history.length)
    return (
      <div className="page member-page">
        <Button variant="text" onClick={() => onViewChange("rentals")}>
          <ArrowLeft size={15} /> Back to loan desk
        </Button>
        <div className="member-empty">No member record is selected.</div>
      </div>
    );

  return (
    <div className="page member-page">
      <Button
        variant="text"
        onClick={() => onViewChange("rentals")}
      >
        <ArrowLeft size={15} /> Back to loan desk
      </Button>
      <section className="member-hero">
        <div className="member-monogram">
          {memberName
            .split(" ")
            .map(part => part[0])
            .join("")
            .slice(0, 2)}
        </div>
        <div>
          <p className="eyebrow">Member record / circulation history</p>
          <h2>{memberName}</h2>
          <span>
            <Mail size={14} /> {memberEmail}
          </span>
        </div>
        <div className="member-stats">
          <span>
            <BookOpen size={15} /> {history.length} loans recorded
          </span>
          <span>
            <Clock3 size={15} /> {active.length} currently borrowed
          </span>
          <span>
            <CircleDollarSign size={15} /> {money.format(fines)} outstanding
          </span>
        </div>
      </section>
      <section className="member-detail-grid">
        <article>
          <header>
            <ReceiptText size={17} />
            <span>
              <small>Currently borrowed</small>
              <strong>
                {active.length ? "Loans requiring attention" : "No open loans"}
              </strong>
            </span>
          </header>
          {active.length ? (
            active.map(rental => (
              <div className="member-loan" key={rental.id}>
                <span>
                  <strong>{rental.bookTitle}</strong>
                  <small>
                    Due {rental.dueDate} · {rental.renewalCount} renewals
                  </small>
                </span>
                <StatusPill status={rental.status} />
              </div>
            ))
          ) : (
            <p className="member-none">
              This reader has no books currently checked out.
            </p>
          )}
        </article>
        <article>
          <header>
            <CircleDollarSign size={17} />
            <span>
              <small>Account balance</small>
              <strong>
                {fines ? `${money.format(fines)} in fines` : "No fines due"}
              </strong>
            </span>
          </header>
          <p className="member-balance">
            {fines
              ? "Outstanding fees remain linked to overdue rentals below."
              : "The circulation account is in good standing."}
          </p>
        </article>
      </section>
      <section className="member-history">
        <div className="member-history-heading">
          <span>
            <p className="eyebrow">Archive / loan chronology</p>
            <h3>Rental history</h3>
          </span>
          <div className="member-history-controls">
            <label>
              <ListFilter size={14} />
              <select
                value={status}
                onChange={event => setStatus(event.target.value)}
              >
                <option value="all">All loans</option>
                <option value="active">Active</option>
                <option value="overdue">Overdue</option>
                <option value="returned">Returned</option>
              </select>
            </label>
            <label>
              <ArrowDownUp size={14} />
              <select
                value={sort}
                onChange={event => setSort(event.target.value)}
              >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
                <option value="fine">Highest fine</option>
                <option value="title">Book title</option>
              </select>
            </label>
          </div>
        </div>
        {orderedHistory.length ? (
          orderedHistory.map(rental => (
            <article key={rental.id}>
              <span>
                <strong>{rental.bookTitle}</strong>
                <small>
                  {rental.rentedDate} → {rental.dueDate}
                </small>
              </span>
              <StatusPill status={rental.status} />
              <b>{rental.fineAmount ? money.format(rental.fineAmount) : "—"}</b>
              <Button
                variant="row"
                onClick={() => onDownloadRentalReceipt(rental)}
              >
                Receipt
              </Button>
            </article>
          ))
        ) : (
          <p className="member-none">
            No rental records match this history filter.
          </p>
        )}
      </section>
    </div>
  );
}
