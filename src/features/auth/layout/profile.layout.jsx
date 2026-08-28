import { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";

import Logo from "../../../components/logo.jsx";
import {
    Bell,
    Book,
    ChevronDown,
    HomeIcon,
    LogOut,
    Menu,
    ShieldCheck,
    X,
} from "lucide-react";

import { classNameMerge } from "../../../lib/utils.js";

const NavLinks = [
    { key: "home", to: "/", label: "Home" },
    { key: "books", to: "/books", label: "Books" },
    { key: "libraries", to: "/libraries", label: "Find Libraries" },
    { key: "owners", to: "/owners", label: "For Libraries" },
    { key: "about", to: "/about", label: "About" },
    { key: "contactus", to: "/contactus", label: "Contact-us" },
];

export default function ProfileLayout() {
    const [ sideBarOpen, setSideBarOpen ] = useState(false);
    const nav = useNavigate();

    // TODO: replace with useLogout() mutation once backend logout route exists
    function handleLogout() {
        nav("/login");
    }

    return (
        <div className="min-h-screen">
            <aside
                className={classNameMerge(
                    "fixed inset-y-0 left-0 z-40 flex w-72 flex-col bg-c-card border-r border-slate-600 transition-transform lg:translate-x-0",
                    sideBarOpen ? "translate-x-0" : "-translate-x-full",
                )}>
                <div className="flex justify-between">
                    <Logo />
                    <button className="lg:hidden text-ink text-2xl" onClick={() => setSideBarOpen(false)}>
                        <X size={20} />
                    </button>
                </div>

                <div className="flex h-18 items-center justify-between border-b border-slate-600 px-6">
                    <div className="flex items-center gap-3">
                        <Link to="/" className="flex items-center gap-2 text-sm font-semibold text-slate-500">
                            <HomeIcon size={18} />
                            Home
                        </Link>
                        <Link to="/books" className="flex items-center gap-2 text-sm font-semibold text-slate-500">
                            <Book size={18} />
                            Books
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 text-sm font-semibold text-slate-500">
                            <LogOut size={18} />
                            Logout
                        </button>
                    </div>

                </div>

                <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-6">
                    {NavLinks.map(function handleItems({ key, to, label }) {
                        return (
                            <NavLink
                                key={key}
                                to={to}
                                onClick={() => setSideBarOpen(false)}
                                className={({ isActive }) =>
                                    classNameMerge(
                                        "block rounded-xl px-3 py-2.5 text-sm font-medium transition",
                                        isActive
                                            ? "bg-c-card text-white shadow-sm"
                                            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                                    )
                                }>
                                {label}
                            </NavLink>
                        );
                    })}
                </nav>

                <div className="m-4 rounded-2xl bg-slate-50 p-4">
                    <div className="mb-3 flex items-center gap-2 text-xs font-bold text-slate-700">
                        <ShieldCheck size={15} /> Platform Admin
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="grid size-9 place-items-center rounded-full bg-slate-200 text-xs font-bold">
                            FA
                        </div>
                        <div className="min-w-0">
                            <div className="truncate text-sm font-semibold">Admin account</div>
                            <div className="truncate text-xs text-slate-400">System administrator</div>
                        </div>
                        <ChevronDown className="ml-auto text-slate-400" size={15} />
                    </div>
                </div>
            </aside>

            {sideBarOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/50 lg:hidden"
                    onClick={() => setSideBarOpen(false)}
                />
            )}

            <div className="lg:pl-72">
                <header className="sticky top-0 z-20 flex h-18 items-center justify-between border-b border-slate-900/80 bg-c-bg/90 px-4 backdrop-blur-2xl lg:px-8">
                    <button className="rounded p-2 hover:bg-slate-100 lg:hidden" onClick={() => setSideBarOpen(true)}>
                        <Menu />
                    </button>
                    <div className="hidden text-sm text-slate-500 lg:block">
                        Platform / <span className="font-semibold text-slate-800">Administration</span>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                        <button className="relative rounded-xl p-2.5 text-slate-500 hover:bg-slate-100">
                            <Bell size={19} />
                            <span className="absolute right-2 top-2 size-1.5 rounded-full bg-rose-500" />
                        </button>
                        <div className="ml-2 hidden h-7 w-px bg-slate-200 sm:block" />
                        <div className="ml-2 grid size-9 place-items-center rounded-full text-xs font-bold">FA</div>
                    </div>
                </header>

                <div className="p-4 sm:p-6 lg:p-8">
                    <main>
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
}