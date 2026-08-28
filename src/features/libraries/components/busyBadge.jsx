import { LoaderCircle } from "lucide-react";

export default function Busy({ active, size = 14 }) {
  return active ? (
    <LoaderCircle className="mutation-spinner" size={size} />
  ) : null;
}
