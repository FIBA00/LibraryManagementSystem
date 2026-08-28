// Scholar's Ledger overview: editorial welcome, legible circulation metrics, paper panels, and no visual clutter.
import {
  BookOpen,
  ChevronRight,
  CircleAlert,
  Clipboard,
  Clock3,
  FileText,
  LibraryBig,
  TrendingUp,
  UsersRound,
} from "lucide-react";
import MetricCard from "../components/metricCard.jsx";
import SysPanel from "../components/panel.jsx";
import StatusPill from "../components/statusPill.jsx";
import ActionMenu from "../components/actionMenu.jsx";

export default function Overview({
  data,
  selectedLibrary,
  onViewChange,
  onNotice,
}) {
  const money = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
  const totalMembers = data.libraries.reduce(
    (sum, library) => sum + library.members,
    0
  );
  const totalBooks = data.books.length
    ? data.books.reduce((sum, book) => sum + book.totalCopies, 0)
    : data.libraries.reduce((sum, library) => sum + library.totalBooks, 0);
  const totalIncome = data.transactions
    .filter(transaction => transaction.type === "income")
    .reduce((sum, transaction) => sum + transaction.amount, 0);
  const totalExpenses = data.transactions
    .filter(transaction => transaction.type === "expense")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const overdue = data.rentals.filter(rental => rental.status === "overdue");
  const active = data.rentals.filter(rental => rental.status === "active");
  const onDuty = data.staff.filter(staff => staff.status === "active");

  return (
    <div className="page overview-page">
      <section className="library-brief">
        <div className="brief-content">
          <p className="eyebrow">Wednesday, 27 August</p>
          <h2>
            Good morning, James.
            <br />
            <em>Here is today’s reading room.</em>
          </h2>
          <p>
            Circulation is steady across{" "}
            {selectedLibrary ? selectedLibrary.name : "your five branches"}. Two
            loan records need attention before closing.
          </p>
          <div className="brief-actions">
            <button
              className="primary-button"
              onClick={() => onViewChange("rentals")}
            >
              Review loan desk <ChevronRight size={16} />
            </button>
            <button
              className="quiet-button"
              onClick={() => onViewChange("books")}
            >
              Browse catalog
            </button>
          </div>
        </div>
        <div className="brief-image">
          <img
            src="/manus-storage/library-reading-room_6b89c355.jpg"
            alt="A quiet contemporary library reading room"
          />
          <div className="brief-image-tag">
            <span>Live desk note</span>
            <strong>{active.length} books in circulation</strong>
          </div>
        </div>
      </section>
      <div className="metrics-grid">
        <MetricCard
          label="Total members"
          value={totalMembers.toLocaleString()}
          detail={`Across ${data.libraries.length} ${data.libraries.length === 1 ? "branch" : "branches"}`}
          tone="cobalt"
          icon={UsersRound}
        />
        <MetricCard
          label="Total books"
          value={totalBooks.toLocaleString()}
          detail={`${data.books.filter(book => book.availableCopies > 0).length} titles available`}
          tone="gold"
          icon={BookOpen}
        />
        <MetricCard
          label="Active loans"
          value={active.length.toString()}
          detail={
            overdue.length
              ? `${overdue.length} overdue for review`
              : "All returns on time"
          }
          tone={overdue.length ? "danger" : "sage"}
          icon={Clock3}
        />
        <MetricCard
          label="Monthly income"
          value={money.format(totalIncome)}
          detail={`${money.format(totalExpenses)} in expenses`}
          tone="ink"
          icon={TrendingUp}
        />
      </div>
      <div className="overview-main-grid">
        <SysPanel
          title="Library branches"
          meta={`${data.libraries.length} in this view`}
          action={
            <button
              className="text-action"
              onClick={() => onViewChange("libraries")}
            >
              See branches <ChevronRight size={15} />
            </button>
          }
        >
          <div className="branch-list">
            {data.libraries.map(library => (
              <div className="branch-row" key={library.id}>
                <div className="branch-symbol">
                  <LibraryBig size={17} />
                </div>
                <div className="branch-name">
                  <strong>{library.name}</strong>
                  <span>
                    {library.branch} · {library.city}, {library.state}
                  </span>
                </div>
                <div className="branch-members">
                  <strong>{library.members.toLocaleString()}</strong>
                  <span>members</span>
                </div>
                <StatusPill status={library.status} />
              </div>
            ))}
          </div>
        </SysPanel>
        <div className="overview-side-stack">
          {overdue.length ? (
            <section className="overdue-card">
              <div>
                <span className="notice-icon">
                  <CircleAlert size={17} />
                </span>
                <p>Needs attention</p>
              </div>
              <h3>
                {overdue.length} overdue{" "}
                {overdue.length === 1 ? "loan" : "loans"}
              </h3>
              {overdue.slice(0, 2).map(rental => (
                <div className="overdue-item" key={rental.id}>
                  <span>
                    <strong>{rental.memberName}</strong>
                    <small>{rental.bookTitle}</small>
                  </span>
                  <b>+${rental.fineAmount.toFixed(2)}</b>
                </div>
              ))}
              <button onClick={() => onViewChange("rentals")}>
                Open rentals desk <ChevronRight size={15} />
              </button>
            </section>
          ) : null}
          <SysPanel
            title="Recently handled"
            meta="Latest desk activity"
            action={
              <ActionMenu
                label="Recent activity actions"
                items={[
                  {
                    label: "Open loan desk",
                    icon: LibraryBig,
                    onSelect: () => onViewChange("rentals"),
                  },
                  {
                    label: "Copy activity reference",
                    icon: Clipboard,
                    onSelect: () =>
                      onNotice(
                        "The recent-activity reference is ready to copy."
                      ),
                  },
                  {
                    label: "Review desk note",
                    icon: FileText,
                    onSelect: () =>
                      onNotice(
                        "The current circulation desk note is ready for review."
                      ),
                  },
                ]}
              />
            }
          >
            <div className="recent-book-list">
              {data.rentals
                .slice(0, 4)
                .map(function handleRental(rental, index) {
                  return (
                    <div className="recent-book" key={rental.id}>
                      <span className="book-seq">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <strong>{rental.memberName}</strong>
                        <span>{rental.bookTitle}</span>
                      </div>
                      <StatusPill status={rental.status} />
                    </div>
                  );
                })}
            </div>
          </SysPanel>
        </div>
      </div>
      <SysPanel
        title="Staff on duty"
        meta={`${onDuty.length} colleagues active today`}
        action={
          <button className="text-action" onClick={() => onViewChange("staff")}>
            View directory <ChevronRight size={15} />
          </button>
        }
      >
        <div className="staff-on-duty">
          {onDuty.slice(0, 10).map(staff => (
            <div className="duty-person" key={staff.id}>
              <span
                className="staff-avatar"
                style={{ backgroundColor: staff.avatarColor }}
              >
                {staff.initials}
              </span>
              <span>
                <strong>{staff.name.split(" ")[0]}</strong>
                <small>{staff.role}</small>
              </span>
            </div>
          ))}
        </div>
      </SysPanel>
    </div>
  );
}
