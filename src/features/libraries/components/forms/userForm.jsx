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

import Field from "../field.jsx";
import FormSubmit from "../formSubmit.jsx";
import BranchOptions from "./branchOptions.jsx";
import userSchema from "../../schemas/user.schema.js";

function defaultUser(libraryId) {
  return {
    name: "",
    email: "",
    role: "Library Assistant",
    department: "Circulation",
    salary: 0,
    libraryId: libraryId || "",
  };
}

function userValues(user, libraryId) {
  return user
    ? {
        ...defaultUser(libraryId),
        ...user,
        email:
          user.email ||
          `${user.initials?.toLowerCase() || "user"}@libracore.local`,
      }
    : defaultUser(libraryId);
}

export default function UserForm({
  open,
  onOpenChange,
  libraries,
  selectedLibrary,
  user,
  onCreate,
  onUpdate,
  pending,
}) {
  const editing = Boolean(user);
  const branchId = selectedLibrary?.id || libraries[0]?.id;
  const form = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: userValues(user, branchId),
  });
  useEffect(() => {
    if (open) form.reset(userValues(user, branchId));
  }, [open, user, branchId, form]);
  function submit(values) {
    const initials = values.name
      .split(/\s+/)
      .map(part => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
    const payload = { ...values, initials };
    const callbacks = {
      onSuccess: () => {
        form.reset(userValues(null, branchId));
        onOpenChange(false);
      },
    };
    if (editing) onUpdate(user.id, payload, callbacks);
    else
      onCreate(
        { ...payload, status: "active", avatarColor: "#2457D6" },
        callbacks
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
          <p className="form-kicker">
            People register / {editing ? "profile revision" : "new user"}
          </p>
          <DialogTitle>
            {editing ? "Edit team user" : "Add a team user"}
          </DialogTitle>
          <DialogDescription>
            {editing
              ? "Update this user profile before the revision is patched to the people endpoint."
              : "Create the staff profile that will be posted to the people endpoint."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(submit)} noValidate>
          <div className="entity-form-grid">
            <Field label="Full name" error={errors.name}>
              <input
                autoFocus
                {...register("name")}
                placeholder="e.g. Amara Okello"
              />
            </Field>
            <Field label="Email address" error={errors.email}>
              <input
                type="email"
                {...register("email")}
                placeholder="amara@example.com"
              />
            </Field>
            <Field label="Role" error={errors.role}>
              <input {...register("role")} placeholder="Reference Librarian" />
            </Field>
            <Field label="Department" error={errors.department}>
              <input {...register("department")} placeholder="Reference" />
            </Field>
            <Field label="Annual salary" error={errors.salary}>
              <input
                type="number"
                min="0"
                step="1000"
                {...register("salary")}
              />
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
            <FormSubmit
              pending={pending}
              label={editing ? "Save user" : "Create user"}
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
