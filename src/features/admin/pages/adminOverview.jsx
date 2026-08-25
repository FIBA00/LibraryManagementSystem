import { Link, useOutletContext } from "react-router-dom";
import { AlertTriangle, ArrowRight, Building2, BookOpen, Clock3, Users } from "lucide-react";

// internal imports
import { libraries } from "../../../data/mock_data.js";
import { formatDate, today } from "../../../lib/utils.js";
import StatusBadge from "../components/statusBadge.jsx";
import Stat from "../components/stat.jsx";
import Health from "../components/health.jsx";

export default function AdminOverviewPage() {
    const { user } = useOutletContext();
    const pending = libraries.filter((library) => library.status === "pending");

    return (
        <div className="mx-auto max-w-7xl space-y-7">
            <div>
                <div className="text-sm font-semibold text-text">
                    {today}
                </div>
                <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-text">
                    Good evening, {user?.username}
                </h1>
                <p className="mt-1 text-text-muted">
                    Here's what's happening across your library network.
                </p>
            </div>

            <div className="grid gap-4 p-2 sm:grid-cols-2 xl:grid-cols-3 xl:grid-flow-col cyber-card">
                {/* TODO: wire to real getAllLibrary counts once useAdminLibraries hook exists */}
                <Stat
                    label="Registered libraries"
                    value="86"
                    change="8.4%"
                    Icon={Building2}
                />
                {/* TODO: no backend yet — users list endpoint not built (later phase) */}
                <Stat
                    label="Total members"
                    value="12,482"
                    change="5.2%"
                    Icon={Users}
                />
                {/* TODO: no backend yet — catalog is a later phase */}
                <Stat
                    label="Books in catalog"
                    value="48,920"
                    change="12.1%"
                    Icon={BookOpen}
                />
                <Stat
                    label="Pending reviews"
                    value={String(pending.length)}
                    change="3 new"
                    Icon={Clock3}
                />
            </div>
            <div className="grid gap-5 xl:grid-cols-2">
                <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm shadow-slate-200/30">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                            <span className="sparkle size-4" />
                            <div>
                                <h2 className="font-bold">Borrowing activity</h2>
                                <p className="mt-1 text-xs text-text-muted">
                                    Books checked out over the last 7 days
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* No borrowings/rentals table or endpoint exists yet (Phase 5-6 work).
                        Showing an honest empty state instead of fake data. */}
                    <div className="mt-5 flex h-64 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border text-center">
                        <Clock3 size={22} className="text-text-muted" />
                        <p className="text-sm font-semibold text-text">
                            Not available yet
                        </p>
                        <p className="max-w-xs text-xs text-text-muted">
                            Borrowing activity will show up here once the
                            rental system is built.
                        </p>
                    </div>
                </section>

                <section className="rounded-2xl border max-w-7xl border-border-strong bg-surface p-5 shadow-sm shadow-accent-alt hex-bg">
                    <div className="flex items-center gap-3">
                        <span className="sparkle size-4" />
                        <div>
                            <h2 className="font-bold">Network health</h2>
                            <p className="mt-1 text-xs text-text-muted">
                                Current library status
                            </p>
                        </div>
                    </div>
                    {/* TODO: wire to real getAllLibrary counts once useAdminLibraries hook exists */}
                    <div className="mt-6 space-y-5">
                        <Health label="Approved" value="72" total="86" />
                        <Health label="Pending" value="8" total="86" />
                        <Health label="Suspended" value="6" total="86" />
                    </div>
                    <div className="mt-7 rounded-xl bg-surface p-4">
                        <div className="flex gap-3">
                            <div>
                                <AlertTriangle
                                    size={20}
                                    className="mt-0.5 text-danger"
                                />
                            </div>

                            <div>
                                <div className="text-sm font-bold">
                                    {pending.length} registrations need review
                                </div>
                                <div className="mt-1 text-xs leading-5 text-text-muted">
                                    Review applications before they can operate
                                    on the platform.
                                </div>
                                <Link
                                    to="/admin/libraries?status=pending"
                                    className="mt-3 flex text-xs gap-2 font-bold text-text hover:text-accent">
                                    Review queue  <ArrowRight size={14} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <section className="rounded-2xl border border-border bg-surface-raised shadow-sm shadow-accent-alt">
                <div className="flex items-center justify-between border-b border-border-strong px-5 py-4">
                    <div>
                        <h2 className="font-bold">
                            Recent library registrations
                        </h2>
                        <p className="mt-1 text-xs text-text-muted">
                            Newest applications waiting for action
                        </p>
                    </div>
                    <Link
                        to="/admin/libraries"
                        className="flex gap-2 text-xs font-bold text-text hover:text-accent ">
                        View all   <ArrowRight size={14} />
                    </Link>
                </div>
                <div className="divide-y bg-surface-raised rounded-2xl mb-2">
                    {pending.map((library) => (
                        <div
                            key={library.id}
                            className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center">
                            <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-surface text-text-muted ">
                                <Building2 size={18} />
                            </div>
                            <div className="min-w-0 flex-1">
                                <div className="truncate text-sm font-bold">
                                    {library.name}
                                </div>
                                <div className="mt-0.5 text-xs text-text-muted">
                                    {library.address} · Submitted{" "}
                                    {formatDate(library.createdAt)}
                                </div>
                            </div>
                            <StatusBadge status={library.status} />
                            <Link
                                to={`/admin/libraries/${library.id}`}
                                className="rounded-lg bg-surface px-3 py-2 text-xs font-bold text-text hover:bg-accent">
                                Review
                            </Link>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
