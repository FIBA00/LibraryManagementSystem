import { BookOpen } from "lucide-react";

export default function TableEmpty({ message }) {
  return (
    <div className="table-empty">
      <BookOpen size={22} />
      <p>{message}</p>
    </div>
  );
}
