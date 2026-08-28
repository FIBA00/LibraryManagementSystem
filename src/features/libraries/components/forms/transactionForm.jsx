import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

// internal imports
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../../components/dialog.jsx";

import Field from "../ui/field.jsx";
import FormSubmit from "../ui/formSubmit.jsx";
import BranchOptions from "./branchOptions.jsx";
import transactionSchema from "../../schemas/transaction.schema.js";

function defaultTransaction(libraryId) {
  return {
    type: "income",
    category: "Membership fees",
    description: "",
    amount: "",
    date: new Date().toISOString().slice(0, 10),
    libraryId: libraryId || "",
  };
}

export function TransactionForm({
  open,
  onOpenChange,
  libraries,
  selectedLibrary,
  onCreate,
  pending,
}) {
  const branchId = selectedLibrary?.id || libraries[0]?.id;
  const form = useForm({
    resolver: zodResolver(transactionSchema),
    defaultValues: defaultTransaction(branchId),
  });
  useEffect(() => {
    if (open) form.reset(defaultTransaction(branchId));
  }, [open, branchId, form]);
  function submit(values) {
    onCreate(values, {
      onSuccess: () => {
        form.reset(defaultTransaction(branchId));
        onOpenChange(false);
      },
    });
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
          <p className="form-kicker">Financial ledger / new entry</p>
          <DialogTitle>Add a financial entry</DialogTitle>
          <DialogDescription>
            Enter the transaction direction, category, amount, and branch
            allocation before posting it to the ledger.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(submit)} noValidate>
          <div className="entity-form-grid">
            <Field label="Direction" error={errors.type}>
              <select {...register("type")}>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </Field>
            <Field label="Category" error={errors.category}>
              <input
                {...register("category")}
                placeholder="e.g. Membership fees"
              />
            </Field>
            <Field label="Description" error={errors.description}>
              <input
                autoFocus
                {...register("description")}
                placeholder="e.g. Annual membership renewal"
              />
            </Field>
            <Field label="Amount" error={errors.amount}>
              <input
                type="number"
                min="0.01"
                step="0.01"
                {...register("amount")}
                placeholder="0.00"
              />
            </Field>
            <Field label="Entry date" error={errors.date}>
              <input type="date" {...register("date")} />
            </Field>
            <Field label="Library branch" error={errors.libraryId}>
              <select {...register("libraryId")}>
                <option value="">Choose a branch</option>
                <BranchOptions libraries={libraries} />
              </select>
            </Field>
          </div>
          <DialogFooter className="entity-footer">
            <button
              type="button"
              className="secondary-button"
              onClick={() => onOpenChange(false)}
              disabled={pending}
            >
              Cancel
            </button>
            <FormSubmit pending={pending} label="Post to ledger" />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
