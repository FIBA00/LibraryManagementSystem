// Scholar's Ledger top bar: branch scope and activity feed share a compact catalog-desk control system.
import {
  Bell,
  Building2,
  CheckCheck,
  ChevronDown,
  CircleCheck,
  FilePenLine,
  Info,
  Menu,
  Search,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const titles = {
  overview: [
    "Today’s reading room",
    "A clear view of the circulation desk and branches in your care.",
  ],
  libraries: [
    "Library management",
    "Monitor branches, membership, and service health.",
  ],
  books: [
    "Book catalog",
    "Search the collection and see what is ready to circulate.",
  ],
  rentals: [
    "Rentals & returns",
    "Keep the loan desk current before the next reader arrives.",
  ],
  staff: [
    "Staff directory",
    "Find the people who keep every shelf and service running.",
  ],
  finances: [
    "Financial management",
    "Review income, expenditure, and the month’s operating picture.",
  ],
  payroll: [
    "Payroll processing",
    "A concise view of the current payroll period.",
  ],
  attendance: [
    "Attendance tracking",
    "Today’s staffing pattern across the library team.",
  ],
};
const activityIcons = { task: CircleCheck, edit: FilePenLine, info: Info };

export default function TopBar({
  activeView,
  selectedLibrary,
  libraries,
  onLibraryChange,
  onMenu,
  onSearch,
  activities = [],
  settings,
  onMarkActivitiesRead,
}) {
  const [open, setOpen] = useState(false);
  const [activityOpen, setActivityOpen] = useState(false);
  const picker = useRef(null);
  const activityMenu = useRef(null);
  const [title] = titles[activeView] || titles.overview;
  const unreadCount = activities.filter(activity => activity.unread).length;

  useEffect(() => {
    function close(event) {
      if (picker.current && !picker.current.contains(event.target))
        setOpen(false);
      if (activityMenu.current && !activityMenu.current.contains(event.target))
        setActivityOpen(false);
    }
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  function choose(id) {
    onLibraryChange(id);
    setOpen(false);
  }

  return (
    <header className="topbar">
      <div className="topbar-title-wrap">
        <button
          className="mobile-menu"
          onClick={onMenu}
          aria-label="Open navigation"
        >
          <Menu size={20} />
        </button>
        <div>
          <p className="page-kicker">LibraCore / {activeView}</p>
          <h1>{title}</h1>
        </div>
      </div>
      <div className="topbar-actions">
        <button
          className="top-search"
          aria-label="Search all library records"
          onClick={onSearch}
        >
          <Search size={16} />
          <span>Search all records</span>
          <kbd>⌘ K</kbd>
        </button>
        <div className="branch-picker" ref={picker}>
          <button
            className={`branch-trigger ${open ? "is-open" : ""}`}
            onClick={() => {
              setOpen(value => !value);
              setActivityOpen(false);
            }}
            aria-expanded={open}
          >
            <Building2 size={16} />
            <span>
              <small>Branch scope</small>
              {selectedLibrary ? selectedLibrary.name : "All libraries"}
            </span>
            <ChevronDown size={15} />
          </button>

          {open ? (
            <div className="branch-menu">
              <p className="menu-label">Scope of view</p>
              <button
                className={!selectedLibrary ? "is-selected" : ""}
                onClick={() => choose(null)}
              >
                <i />
                All libraries
              </button>

              {libraries.map(function handleLibary(library) {
                return (
                  <button
                    key={library.id}
                    className={
                      selectedLibrary?.id === library.id ? "is-selected" : ""
                    }
                    onClick={() => choose(library.id)}
                  >
                    <i />
                    <span>
                      <strong>{library.name}</strong>
                      <small>
                        {library.branch} · {library.city}
                      </small>
                    </span>
                    {library.status === "maintenance" ? <em>Maint.</em> : null}
                  </button>
                );
              })}
            </div>
          ) : null}
        </div>

        <div className="activity-picker" ref={activityMenu}>
          <button
            className="notification-button"
            aria-label="Open activity feed"
            aria-expanded={activityOpen}
            onClick={() => {
              setActivityOpen(value => !value);
              setOpen(false);
            }}
          >
            <Bell size={18} />

            {unreadCount ? <i /> : null}
          </button>

          {activityOpen ? (
            <div className="activity-menu">
              <div className="activity-menu-heading">
                <span>
                  <small>Library activity</small>
                  <strong>Desk ledger</strong>
                </span>
                <button onClick={onMarkActivitiesRead} disabled={!unreadCount}>
                  <CheckCheck size={15} /> Mark read
                </button>
              </div>

              <div className="activity-list">
                {activities.length ? (
                  activities.map(function handleActivity(activity) {
                    const Icon = activityIcons[activity.type] || Info;

                    return (
                      <article
                        className={`activity-row ${activity.unread ? "is-unread" : ""}`}
                        key={activity.id}
                      >
                        <span className={`activity-icon ${activity.type}`}>
                          <Icon size={15} />
                        </span>
                        <span>
                          <strong>{activity.title}</strong>
                          <small>{activity.detail}</small>
                          <em>{activity.time}</em>
                        </span>
                      </article>
                    );
                  })
                ) : (
                  <div className="activity-empty">
                    <CircleCheck size={20} />
                    <strong>You are caught up.</strong>
                    <span>No new library activity.</span>
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </div>

        <div className="profile-top">
          <span className="profile-avatar">
            {settings?.operatorName
              ?.split(" ")
              .map(part => part[0])
              .join("")
              .slice(0, 2) || "JD"}
          </span>
          <div>
            <small>Operator / 01</small>
            <strong>{settings?.operatorName || "James Davidson"}</strong>
          </div>
        </div>
      </div>
    </header>
  );
}
