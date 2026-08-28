import { BookPlus, Filter, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

// ! internal imports
import { withNotice } from "../../../lib/utils.js";
import SysPanel from "../components/panel.jsx";
import SearchBox from "../components/searchBox.jsx";
import StatusPill from "../components/statusPill.jsx";
import TableEmpty from "../components/tableEmpty.jsx";
import BookForm from "../components/forms/bookForm.jsx";
import DeleteConfirmation from "../components/deleteConfirm.jsx";
import SlimMetrics from "../components/slimMetrics.jsx";
import Busy from "../components/busyBadge.jsx";

export default function BooksView({
  data,
  onNotice,
  mutations,
  selectedLibrary,
}) {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("all");
  const [condition, setCondition] = useState("all");
  const [availableOnly, setAvailableOnly] = useState(false);
  const [bookFormOpen, setBookFormOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [deletingBook, setDeletingBook] = useState(null);
  const genres = [...new Set(data.books.map(book => book.genre))];
  const shown = data.books.filter(
    book =>
      (genre === "all" || book.genre === genre) &&
      (condition === "all" || book.condition === condition) &&
      (!availableOnly || book.availableCopies > 0) &&
      `${book.title} ${book.author} ${book.isbn} ${book.shelfLocation}`
        .toLowerCase()
        .includes(query.toLowerCase())
  );
  const allCopies = data.books.reduce((sum, book) => sum + book.totalCopies, 0);
  const available = data.books.reduce(
    (sum, book) => sum + book.availableCopies,
    0
  );
  function createBook(values, callbacks = {}) {
    mutations.createBook.mutate(values, {
      onSuccess: book => {
        onNotice(`${book.title} was added to the catalogue.`);
        callbacks.onSuccess?.(book);
      },
      onError: callbacks.onError,
    });
  }
  function updateBook(bookId, values, callbacks = {}) {
    mutations.updateBook.mutate(
      { bookId, changes: values },
      {
        onSuccess: book => {
          onNotice(`${book.title} was revised.`);
          callbacks.onSuccess?.(book);
        },
        onError: callbacks.onError,
      }
    );
  }
  function restockBook(book) {
    mutations.updateBook.mutate(
      {
        bookId: book.id,
        changes: {
          availableCopies: Math.min(book.totalCopies, book.availableCopies + 1),
        },
      },
      withNotice(onNotice, () => `${book.title} inventory was updated.`)
    );
  }
  function confirmDelete() {
    if (!deletingBook) return;
    mutations.deleteBook.mutate(deletingBook.id, {
      onSuccess: book => {
        onNotice(`${book.title} was removed from the catalogue.`);
        setDeletingBook(null);
      },
    });
  }
  function openEdit(book) {
    setEditingBook(book);
    setBookFormOpen(true);
  }
  function closeBookForm(open) {
    setBookFormOpen(open);
    if (!open) setEditingBook(null);
  }
  return (
    <div className="page">
      <SlimMetrics
        items={[
          { label: "Titles in view", value: data.books.length },
          { label: "Total copies", value: allCopies.toLocaleString() },
          {
            label: "Available today",
            value: available.toLocaleString(),
            tone: "sage-text",
          },
          {
            label: "Loaned out",
            value: (allCopies - available).toLocaleString(),
          },
        ]}
      />
      <SysPanel
        title="Collection register"
        meta={`${shown.length} records match the current discovery filters.`}
        action={
          <button
            className="primary-button compact"
            onClick={() => {
              setEditingBook(null);
              setBookFormOpen(true);
            }}
          >
            <BookPlus size={16} /> Add book
          </button>
        }
      >
        <div className="table-toolbar wrap record-discovery-bar">
          <SearchBox
            value={query}
            onChange={setQuery}
            placeholder="Find title, author, ISBN, or shelf…"
          />
          <label className="select-box">
            <Filter size={15} />
            <select
              value={genre}
              onChange={event => setGenre(event.target.value)}
            >
              <option value="all">All genres</option>
              {genres.map(function handleGenres(item) {
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
              value={condition}
              onChange={event => setCondition(event.target.value)}
            >
              <option value="all">All conditions</option>
              <option value="excellent">Excellent</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
            </select>
          </label>
          <label className="checkbox-line">
            <input
              type="checkbox"
              checked={availableOnly}
              onChange={event => setAvailableOnly(event.target.checked)}
            />
            <span>Available now</span>
          </label>
        </div>
        <div className="data-table-wrap">
          <table className="data-table books-table">
            <thead>
              <tr>
                <th>Title & author</th>
                <th>Genre</th>
                <th>Shelf</th>
                <th>Availability</th>
                <th>Condition</th>
                <th>Record actions</th>
              </tr>
            </thead>

            <tbody>
              {shown.map(function handleBook(book) {
                const percent = Math.round(
                  (book.availableCopies / book.totalCopies) * 100
                );
                return (
                  <tr key={book.id}>
                    <td>
                      <strong>{book.title}</strong>
                      <small>
                        {book.author} · {book.isbn}
                      </small>
                    </td>
                    <td>{book.genre}</td>
                    <td>
                      <code>{book.shelfLocation}</code>
                    </td>
                    <td>
                      <div className="availability-cell">
                        <span>
                          {book.availableCopies}/{book.totalCopies} copies
                        </span>
                        <i>
                          <b
                            className={percent === 0 ? "no-stock" : ""}
                            style={{ width: `${percent}%` }}
                          />
                        </i>
                      </div>
                    </td>

                    <td>
                      <StatusPill status={book.condition} />
                    </td>

                    <td>
                      <span className="row-actions">
                        <button
                          className="row-action"
                          onClick={() => restockBook(book)}
                          disabled={mutations.updateBook.isPending}
                        >
                          <Busy active={mutations.updateBook.isPending} />{" "}
                          Restock
                        </button>
                        <button
                          className="row-icon-action"
                          onClick={() => openEdit(book)}
                          aria-label={`Edit ${book.title}`}
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          className="row-icon-action danger"
                          onClick={() => setDeletingBook(book)}
                          aria-label={`Delete ${book.title}`}
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

          {!shown.length ? (
            <TableEmpty message="No books match the current search and filters." />
          ) : null}
        </div>
      </SysPanel>

      <BookForm
        open={bookFormOpen}
        onOpenChange={closeBookForm}
        libraries={data.libraries}
        selectedLibrary={selectedLibrary}
        book={editingBook}
        onCreate={createBook}
        onUpdate={updateBook}
        pending={
          mutations.createBook.isPending || mutations.updateBook.isPending
        }
      />

      <DeleteConfirmation
        open={Boolean(deletingBook)}
        onOpenChange={open => {
          if (!open) setDeletingBook(null);
        }}
        recordType="book"
        recordName={deletingBook?.title || "this book"}
        onConfirm={confirmDelete}
        pending={mutations.deleteBook.isPending}
      />
    </div>
  );
}
