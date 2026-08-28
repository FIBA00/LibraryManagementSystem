// Scholar's Ledger global search: a compact command surface spans the full library workspace, not only the catalog.
import {
  BookOpen,
  Building2,
  CreditCard,
  FileText,
  Search,
  UserRound,
} from "lucide-react";
import { useMemo, useState } from "react";

// internal imports
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../../components/dialog.jsx";

const kindIcon = {
  library: Building2,
  book: BookOpen,
  member: UserRound,
  rental: FileText,
  transaction: CreditCard,
  staff: UserRound,
};

export default function GlobalSearch({ open, onOpenChange, data, onSelect }) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const members = [
      ...new Map(
        data.rentals.map(rental => [rental.memberName, rental])
      ).values(),
    ];

    const source = [
      ...data.libraries.map(item => ({
        kind: "library",
        title: item.name,
        detail: `${item.branch} · ${item.city}`,
        view: "libraries",
      })),

      ...data.books.map(item => ({
        kind: "book",
        title: item.title,
        detail: `${item.author} · ${item.isbn}`,
        view: "books",
      })),

      ...members.map(item => ({
        kind: "member",
        title: item.memberName,
        detail: item.memberEmail || "Member borrowing record",
        view: "member",
        memberName: item.memberName,
      })),

      ...data.rentals.map(item => ({
        kind: "rental",
        title: `${item.memberName} — ${item.bookTitle}`,
        detail: `${item.status} · due ${item.dueDate}`,
        view: "rentals",
        memberName: item.memberName,
      })),

      ...data.transactions.map(item => ({
        kind: "transaction",
        title: item.description,
        detail: `${item.type} · ${item.category}`,
        view: "finances",
      })),

      ...data.staff.map(item => ({
        kind: "staff",
        title: item.name,
        detail: `${item.role} · ${item.department}`,
        view: "staff",
      })),
    ];

    const term = query.trim().toLowerCase();
    return term
      ? source
          .filter(item =>
            `${item.kind} ${item.title} ${item.detail}`
              .toLowerCase()
              .includes(term)
          )
          .slice(0, 10)
      : source.slice(0, 8);
  }, [data, query]);

  function choose(result) {
    onSelect(result);
    setQuery("");
    onOpenChange(false);
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="global-search-dialog">
        <DialogHeader>
          <p className="form-kicker">Workspace index / every record</p>
          <DialogTitle>Search LibraCore</DialogTitle>
          <DialogDescription>
            Find libraries, books, members, rentals, staff, and financial
            entries from one place.
          </DialogDescription>
        </DialogHeader>
        <label className="global-search-input">
          <Search size={18} />
          <input
            autoFocus
            value={query}
            onChange={event => setQuery(event.target.value)}
            placeholder="Search every record…"
          />
          <kbd>Esc</kbd>
        </label>
        <div className="global-result-list">

          {/* TODO: test if works  */}
          {results.map(function handleResults(result, index) {
            const Icon = kindIcon[result.kind];
            return (
              <button
                key={`${result.kind}-${result.title}-${index}`}
                onClick={() => choose(result)}
              >
                <span className={`global-result-icon ${result.kind}`}>
                  <Icon size={16} />
                </span>
                <span>
                  <small>{result.kind}</small>
                  <strong>{result.title}</strong>
                  <em>{result.detail}</em>
                </span>
              </button>
            );
          })}

          {!results.length ? (
            <p className="global-empty">No records match “{query}”.</p>
          ) : null}
          
        </div>
      </DialogContent>
    </Dialog>
  );
}
