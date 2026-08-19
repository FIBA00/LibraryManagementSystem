import { ArrowLeft, Ban, Building2, Check, ExternalLink, FileText, MapPin, ShieldAlert, X } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";



// internal imports
import { libraries } from "../../../data/mock_data.js";
import { StatusBadge } from "../components/statusBadge.jsx";
import { formatDate } from "../../../lib/utils.js";
import { useState } from "react";
import Modal from "../../../components/modal.jsx";


const labels = {
    approved: "Approve library",
    rejected: "Reject application",
    suspended: "Suspend library",
};
const descriptions = {
    approved:
        "This library will be allowed to operate and appear across the platform.",
    rejected:
        "This application will be marked as rejected and the owner will need to submit again.",
    suspended:
        "This library will immediately lose access to platform operations until reinstated.",
};

export default function AdminLibraryDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [ action, setAction ] = useState(null);

    const library = libraries.find((library) => library.id === id);

    if (!library) {
        return (
            <div className="rounded-4xl bg-surface p-10 text-center text-danger">
                LIBRARY NOT FOUND
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-7xl min-h-screen space-y-6">
            <Link
                to="/admin/libraries"
                className="inline-flex items-center gap-2 text-sm font-semibold text-text-muted hover:text-accent">
                <ArrowLeft size={18} />
                Back to libraries
            </Link>

            {/* Library information */}
            <div className="cyber-card rounded-2xl  bg-surface">
                <div className=" p-6">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                        <div className="grid size-14 shrink-0 place-items-center rounded-2xl bg-surface text-text">
                            <Building2 size={25} />
                        </div>
                        <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-4 justify-between">
                                <h1 className="text-2xl font-extrabold tracking-tight">
                                    {library.name}
                                </h1>
                                <StatusBadge status={library.status} />
                            </div>
                            <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2 text-sm text-text-muted">
                                <span className="inline-flex items-center gap-1.5">
                                    <MapPin size={15} />
                                    {library.address}
                                </span>
                                <span>
                                    Submitted {formatDate(library.createdAt)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* library application */}
            <div className="grid gap-6 p-4 lg:grid-cols-2 bg-surface border-2 rounded-2xl border-border-strong">
                <div className="space-y-6 ">
                    <Info title="Registration details">
                        <Row label="Library ID" value={library.id} />
                        <Row label="Owner ID" value={library.ownerId} />
                        <Row
                            label="Application date"
                            value={formatDate(library.createdAt)}
                        />
                        <Row
                            label="Current status"
                            value={<StatusBadge status={library.status} />}
                        />
                    </Info>
                    <Info title="Verification documents">
                        <div className=" flex items-center justify-between rounded-xl border border-border-strong p-4">
                            <div className="flex items-center gap-3">
                                <div className="grid size-10 place-items-center rounded-lg bg-surface-raised">
                                    <FileText size={18} />
                                </div>
                                <div>
                                    <div className="text-sm font-bold">
                                        Proof of registration
                                    </div>
                                    <div className="text-xs text-text-muted">
                                        Uploaded document
                                    </div>
                                </div>
                            </div>
                            <button className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold">
                                View <ExternalLink size={13} />
                            </button>
                        </div>
                    </Info>
                </div>


                {/* actions */}

                <div className="rounded-2xl bg-surface p-5">
                    <div className="text-sm font-bold">Admin decision</div>
                    <p className="mt-1 text-xs leading-5 text-text-muted">
                        Actions are recorded with the reviewing
                        administrator and timestamp.
                    </p>
                    <div className="mt-5 space-y-2">
                        {library.status === "pending" ? (
                            <>
                                <button
                                    onClick={() => setAction("approved")}
                                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-success px-4 py-3 text-sm font-bold text-text hover:bg-emerald-600 hover:text-text">
                                    <Check size={17} />
                                    Approve library
                                </button>
                                <button
                                    onClick={() => setAction("rejected")}
                                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-accent px-4 py-3 text-sm font-bold text-text hover:bg-danger">
                                    <X size={17} />
                                    Reject application
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() =>
                                    setAction(
                                        library.status === "approved"
                                            ? "suspended"
                                            : "approved",
                                    )
                                }
                                className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-accent px-4 py-3 text-sm font-bold text-text hover:bg-danger">
                                {library.status === "approved" ? (
                                    <>
                                        <Ban size={17} />
                                        Suspend library
                                    </>
                                ) : (
                                    <>
                                        <Check size={17} />
                                        Reinstate library
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                    <div className="mt-5 border-t border-slate-200 pt-4 text-xs text-slate-400">
                        <div className="flex gap-2">
                            <ShieldAlert size={14} />
                            <span>
                                Review carefully before changing a library's
                                status.
                            </span>
                        </div>
                    </div>
                </div>

            </div>
            <Modal
                open={Boolean(action)}
                title={action ? labels[ action ] : ""}
                onClose={() => setAction(null)}>

                {/* modal content */}
                <p className="text-sm leading-6 text-text p-2 border border-border rounded-2xl text-center">
                    {action ? descriptions[ action] : ""}
                </p>
                
                <div className="flex gap-4 p-2 items-center justify-center">
               

                    <div className="mt-2 rounded-xl bg-surface-raised p-4 text-sm">

                        <div className="font-bold">{library.name}</div>
                        <div className="mt-1 text-xs text-text-muted">
                            Current status:{" "}
                            <span className="text-text capitalize  bg-danger rounded-2xl px-2 py-0.5">
                                {library.status}
                            </span>
                        </div>

                    </div>
                    {/* TODO: get the new status from the button that is clicked and show the new status to be switched to. */}
                    {/* <div className="mt-2 rounded-xl bg-surface-raised p-4 text-sm">
                        <div className="font-bold">Change the state to : </div>
                        <div className="mt-2 text-xs  text-text-muted">
                            New status:{" "}
                            <span className="text-text capitalize bg-success rounded-2xl px-2 py-0.5 ">
                                {library.status}
                            </span>
                        </div>

                    </div> */}

                </div>

                <div className="mt-6 flex justify-end gap-2">
                    <button
                        onClick={() => setAction(null)}
                        className="rounded-xl bg-surface border border-border px-4 py-2.5 text-sm font-bold text-text hover:bg-accent">
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            setAction(null);
                            navigate("/admin/libraries");
                        }}
                        className="rounded-xl bg-surface border border-border px-4 py-2.5 text-sm font-bold text-text hover:bg-success">
                        Confirm
                    </button>
                </div>

            </Modal>
        </div>
    );
}

function Info({ title, children }) {
    return (
        <div >
            <div className="flex gap-2 mb-3 items-center">
                <div className="sparkle size-4" />
                <h2 className="text-sm font-bold">{title}</h2>
            </div>
            <div className="divide-y divide-surface rounded-xl border border-border">
                {children}
            </div>
        </div>
    );
}
function Row({ label, value }) {
    return (
        <div className="flex items-center justify-between gap-4 px-4 py-3 text-sm">
            <span className="text-text-muted">{label}</span>
            <span className="text-right font-semibold text-text">
                {value}
            </span>
        </div>
    );
}
