import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

// ! internal imports
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../../components/dialog.jsx";

import Field from "../field.jsx";
import FormSubmit from "../formSubmit.jsx";
import BranchOptions from "../branchOptions.jsx";
import rentalSchema from "../../schemas/rental.schema.js";
import Button from "../button.jsx";


function defaultRental(libraryId) {
  return {
    memberName: "",
    memberEmail: "",
    libraryId: libraryId || "",
    bookId: "",
    dueDate: "",
  };
}

export default function RentalForm({
  open,
  onOpenChange,
  libraries,
  books,
  selectedLibrary,
  onCreate,
  pending,
}) {
  const branchId = selectedLibrary?.id || libraries[0]?.id;
  const form = useForm({
    resolver: zodResolver(rentalSchema),
    defaultValues: defaultRental(branchId),
  });
  //   TODO: find out why this form is warning about memoizing!
  const libraryId = form.watch("libraryId");
  const availableBooks = books.filter(
    book => book.libraryId === libraryId && book.availableCopies > 0
  );

  useEffect(() => {
    if (open) form.reset(defaultRental(branchId));
  }, [open, branchId, form]);
  function submit(values) {
    const book = books.find(item => item.id === values.bookId);
    onCreate(
      {
        ...values,
        bookTitle: book?.title,
        rentedDate: new Date().toISOString().slice(0, 10),
        status: "active",
        renewalCount: 0,
        fineAmount: 0,
      },
      {
        onSuccess: () => {
          form.reset(defaultRental(branchId));
          onOpenChange(false);
        },
      }
    );
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
          <p className="form-kicker">Circulation desk / new loan</p>
          <DialogTitle>Open a rental</DialogTitle>
          <DialogDescription>
            Record the reader, lending branch, available title, and agreed
            return date.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(submit)} noValidate>
          <div className="entity-form-grid">
            <Field label="Member name" error={errors.memberName}>
              <input
                autoFocus
                {...register("memberName")}
                placeholder="e.g. Robin Cole"
              />
            </Field>
            <Field label="Member email" error={errors.memberEmail}>
              <input
                type="email"
                {...register("memberEmail")}
                placeholder="robin@example.com"
              />
            </Field>
            <Field label="Lending branch" error={errors.libraryId}>
              <select {...register("libraryId")}>
                <option value="">Choose a branch</option>
                <BranchOptions libraries={libraries} />
              </select>
            </Field>
            <Field
              label="Available title"
              error={errors.bookId}
              hint={
                libraryId && !availableBooks.length
                  ? "No available books at this branch."
                  : "Only in-stock titles are listed."
              }
            >
              <select {...register("bookId")}>
                <option value="">Choose a title</option>
                {availableBooks.map(book => (
                  <option key={book.id} value={book.id}>
                    {book.title} — {book.availableCopies} available
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Due date" error={errors.dueDate}>
              <input type="date" {...register("dueDate")} />
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
            <FormSubmit pending={pending} label="Open rental" />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
