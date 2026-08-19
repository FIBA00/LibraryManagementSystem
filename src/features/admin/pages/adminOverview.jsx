import { Link } from "react-router-dom";
import { AlertTriangle, ArrowRight, ArrowUpRight, BookOpen, Building2, Clock3, Users } from "lucide-react";
// import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip } from "recharts";


// internal imports
import { useCurrentUser } from "../../auth/hooks/useAuth.js";
import { libraries } from "../../../data/mock_data.js";
import { formatDate } from "../../../lib/utils.js";
import { StatusBadge } from "../components/statusBadge.jsx";

const activity = [
    { day: "Mon", value: 42 },
    { day: "Tue", value: 58 },
    { day: "Wed", value: 49 },
    { day: "Thu", value: 76 },
    { day: "Fri", value: 63 },
    { day: "Sat", value: 81 },
    { day: "Sun", value: 69 },
];

export default function AdminOverviewPage() {
    const { data: response } = useCurrentUser();
    const user = response?.data;
    const pending = libraries.filter((library) => library.status === "pending");

    const profile = {
        "username": "fraol"
    };

    return (
        <div className="mx-auto max-w-7xl space-y-7">
            <div>
                <div className="text-sm font-semibold text-text">
                    Sunday, August 9
                </div>
                <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-text">
                    Good evening, {profile.username}
                </h1>
                <p className="mt-1 text-text-muted">
                    Here's what's happening across your library network.
                </p>
            </div>

            <div className="grid gap-4 p-2 sm:grid-cols-2 xl:grid-cols-3 xl:grid-flow-col cyber-card">
                {/* TODO: inject data from backend */}
                <Stat
                    label="Registered libraries"
                    value="86"
                    change="8.4%"
                    Icon={Building2}
                />
                <Stat
                    label="Total members"
                    value="12,482"
                    change="5.2%"
                    Icon={Users}
                />
                <Stat
                    label="Books in catalog"
                    value="48,920"
                    change="12.1%"
                    Icon={BookOpen}
                />
                <Stat
                    label="Pending reviews"
                    value={String(pending.length + 5)}
                    change="3 new"
                    Icon={Clock3}
                />
            </div>
            <div className="grid gap-5 xl:grid-cols-2">


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
                                    8 registrations need review
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

function Stat({ label, value, change, Icon, }) {
    return (
        <div className="rounded-2xl lg:w-3xs border border-border bg-surface p-5 shadow-sm shadow-accent-alt">
            <div className="flex items-start justify-between">
                <div className="grid size-10 place-items-center rounded-xl bg-surface text-text">
                    <Icon size={19} />
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-surface-raised px-2 py-1  font-bold text-success">
                    <ArrowUpRight size={20} />
                    {change}
                </span>
            </div>
            <div className="mt-5 text-2xl font-extrabold tracking-tight">
                {value}
            </div>
            <div className="mt-1 text-sm text-text-muted">{label}</div>
        </div>
    );
}

function Health({
    label,
    value,
    total,
}) {
    return (
        <div>
            <div className="mb-2 flex justify-between text-sm">
                <span className="font-semibold text-text">{label}</span>
                <span className="text-success">
                    {value}/{total}
                </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-surface-raised">
                <div
                    className="h-full rounded-full bg-suface"
                    style={{
                        width: `${(Number(value) / Number(total)) * 100}%`,
                    }}
                />
            </div>
        </div>
    );
}
