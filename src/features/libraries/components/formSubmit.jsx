import { Check } from "lucide-react";
import { LoaderCircle } from "lucide-react";

// ! internal imports
import Button from "./button.jsx";

export default function FormSubmit({ pending, label }) {
  return (
    <Button variant="primary" disabled={pending} type="submit">
      {pending ? (
        <LoaderCircle className="mutation-spinner" size={16} />
      ) : (
        <Check size={16} />
      )}
      {pending ? "Saving…" : label}
    </Button>
  );
}
