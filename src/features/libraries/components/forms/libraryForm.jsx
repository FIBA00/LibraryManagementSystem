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
import librarySchema from "../../schemas/library.schema.js";
import Button from "../button.jsx";


function defaultLibrary(libraries) {
  return {
    name: "",
    libraryType: "main",
    parentLibraryId: libraries[0]?.id || "",
    branch: "Main Library",
    city: "",
    state: "",
    subscriptionPlan: "basic",
  };
}

export default function LibraryForm({
  open,
  onOpenChange,
  libraries,
  onCreate,
  pending,
}) {
  const form = useForm({
    resolver: zodResolver(librarySchema),
    defaultValues: defaultLibrary(libraries),
  });
  const libraryType = form.watch("libraryType");
  useEffect(() => {
    if (open) form.reset(defaultLibrary(libraries));
  }, [open, libraries, form]);
  function submit(values) {
    onCreate(
      {
        ...values,
        parentLibraryId:
          values.libraryType === "branch" ? values.parentLibraryId : null,
        branch: values.libraryType === "main" ? "Main Library" : values.branch,
        members: 0,
        totalBooks: 0,
        staffCount: 0,
        status: "active",
        monthlyRevenue: 0,
      },
      {
        onSuccess: () => {
          form.reset(defaultLibrary(libraries));
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
          <p className="form-kicker">Library network / new location</p>
          <DialogTitle>Add a library</DialogTitle>
          <DialogDescription>
            Register a new main library or connect a service branch to an
            existing location.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(submit)} noValidate>
          <div className="entity-form-grid">
            <Field label="Library name" error={errors.name}>
              <input
                autoFocus
                {...register("name")}
                placeholder="e.g. Southgate Public Library"
              />
            </Field>
            <Field label="Library type" error={errors.libraryType}>
              <select {...register("libraryType")}>
                <option value="main">Main library</option>
                <option value="branch">Branch library</option>
              </select>
            </Field>
            {libraryType === "branch" ? (
              <Field label="Main library" error={errors.parentLibraryId}>
                <select {...register("parentLibraryId")}>
                  <option value="">Choose the main library</option>
                  <BranchOptions libraries={libraries} />
                </select>
              </Field>
            ) : (
              <Field
                label="Network role"
                hint="This location is a top-level main library."
              >
                <input value="Main Library" disabled />
              </Field>
            )}
            <Field label="Branch designation" error={errors.branch}>
              <input
                {...register("branch")}
                placeholder="e.g. Riverside Branch"
                disabled={libraryType === "main"}
              />
            </Field>
            <Field label="City" error={errors.city}>
              <input {...register("city")} placeholder="New York" />
            </Field>
            <Field label="State or region" error={errors.state}>
              <input {...register("state")} placeholder="NY" />
            </Field>
            <Field label="Service plan" error={errors.subscriptionPlan}>
              <select {...register("subscriptionPlan")}>
                <option value="basic">Basic</option>
                <option value="pro">Professional</option>
                <option value="enterprise">Enterprise</option>
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
            <FormSubmit pending={pending} label="Register library" />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
