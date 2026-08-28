import { Badge, BookOpen, MapPin } from "lucide-react";

export default function LibraryCard({ library }) {
  return (
    <article className="rounded-2xl border bg-white p-5 shadow-sm hover:shadow-lg">
      <div className="flex justify-between">
        <span className="grid size-12 place-items-center rounded-xl bg-amber-50 text-amber-600">
          <BookOpen />
        </span>
        <Badge tone={library.status === "approved" ? "success" : "warning"}>
          {library.status}
        </Badge>
      </div>
      <h3 className="mt-5 font-bold">{library.name}</h3>
      <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
        <MapPin size={14} /> {library.location}
      </p>
      <p className="mt-3 text-sma leading-6 text-slate-500">
        {library.description}
      </p>
      <div className="mt-5 text-xs textslate-500">
        <b className="text-slate-900">{library.books}</b> books .
        <b className="text-slate-900">{library.members}</b> members
      </div>
    </article>
  );
}
