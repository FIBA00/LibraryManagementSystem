import { Check } from "lucide-react";
import { LoaderCircle } from "lucide-react";

export default function FormSubmit({ pending, label }) {
  return (
    <button className="primary-button" disabled={pending} type="submit">
      {pending ? (
        <LoaderCircle className="mutation-spinner" size={16} />
      ) : (
        <Check size={16} />
      )}
      {pending ? "Saving…" : label}
    </button>
  );
}
