import { zodResolver } from "@hookform/resolvers/zod";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../../components/dialog.jsx";

// ! internal imports
import bookSchema from "../../schemas/book.schema.js";
import Field from "../field.jsx";
import FormSubmit from "../formSubmit.jsx";
import BranchOptions from "../branchOptions.jsx";
import Button from "../button.jsx";

function defaultBook(libraryId) {
  return {
    title: "",
    author: "",
    isbn: "",
    genre: "Fiction",
    shelfLocation: "",
    totalCopies: 1,
    availableCopies: 1,
    condition: "good",
    libraryId: libraryId || "",
  };
}

function bookValues(book, libraryId) {
  return book ? { ...defaultBook(libraryId), ...book } : defaultBook(libraryId);
}

export default function BookForm({
  open,
  onOpenChange,
  libraries,
  selectedLibrary,
  book,
  onCreate,
  onUpdate,
  pending,
}) {
  const editing = Boolean(book);
  const branchId = selectedLibrary?.id || libraries[0]?.id;
 
  const form = useForm({
    resolver: zodResolver(bookSchema),
    defaultValues: bookValues(book, branchId),
  });

  useEffect(() => {
    if (open) form.reset(bookValues(book, branchId));
  }, [open, book, branchId, form]);
  function submit(values) {
    const callbacks = {
      onSuccess: () => {
        form.reset(bookValues(null, branchId));
        onOpenChange(false);
      },
    };
    if (editing) onUpdate(book.id, values, callbacks);
    else onCreate(values, callbacks);
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="entity-dialog">
        <DialogHeader>
          <p className="form-kicker">
            Catalogue intake / {editing ? "record revision" : "new record"}
          </p>
          <DialogTitle>
            {editing ? "Edit book record" : "Add a book"}
          </DialogTitle>
          <DialogDescription>
            {editing
              ? "Update the catalogue details before the revision is patched to the collection endpoint."
              : "Complete the record before it is posted to the collection endpoint."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(submit)} noValidate>
          <div className="entity-form-grid">
            <Field label="Title" error={errors.title}>
              <input
                autoFocus
                {...register("title")}
                placeholder="e.g. The Archive of Lost Hours"
              />
            </Field>
            <Field label="Author" error={errors.author}>
              <input {...register("author")} placeholder="e.g. Clara Hayes" />
            </Field>
            <Field label="ISBN / identifier" error={errors.isbn}>
              <input {...register("isbn")} placeholder="978-0-0000-0000-0" />
            </Field>
            <Field label="Genre" error={errors.genre}>
              <input {...register("genre")} placeholder="Fiction" />
            </Field>
            <Field
              label="Shelf location"
              error={errors.shelfLocation}
              hint="Use the local catalogue shelf code."
            >
              <input {...register("shelfLocation")} placeholder="F-A01" />
            </Field>
            <Field label="Condition" error={errors.condition}>
              <select {...register("condition")}>
                <option value="excellent">Excellent</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
              </select>
            </Field>
            <Field label="Total copies" error={errors.totalCopies}>
              <input type="number" min="1" {...register("totalCopies")} />
            </Field>
            <Field label="Available copies" error={errors.availableCopies}>
              <input type="number" min="0" {...register("availableCopies")} />
            </Field>
            <Field label="Library branch" error={errors.libraryId}>
              <select {...register("libraryId")}>
                <option value="">Choose a branch</option>
                <BranchOptions libraries={libraries} />
              </select>
            </Field>
          </div>
          <DialogFooter className="entity-footer">
            <Button
              type="button"
              variant="secondary"
              onClick={() => onOpenChange(false)}
              disabled={pending}
            >
              Cancel
            </Button>
            <FormSubmit
              pending={pending}
              label={editing ? "Save revision" : "Add to catalogue"}
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
