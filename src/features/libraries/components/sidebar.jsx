// Scholar's Ledger sidebar: ink-navy catalog spine, concise icon-led navigation, and obvious active state.
import {
  BarChart3,
  BookMarked,
  Building2,
  CalendarDays,
  ChevronLeft,
  LayoutDashboard,
  Landmark,
  ReceiptText,
  Settings,
  UsersRound,
  X,
} from "lucide-react";

const navItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "libraries", label: "Libraries", icon: Building2 },
  { id: "books", label: "Book catalog", icon: BookMarked },
  { id: "rentals", label: "Rentals & returns", icon: ReceiptText, count: 3 },
  { id: "staff", label: "Staff", icon: UsersRound },
  { id: "finances", label: "Finances", icon: BarChart3 },
  { id: "payroll", label: "Payroll", icon: Landmark },
  { id: "attendance", label: "Attendance", icon: CalendarDays },
];

export default function Sidebar({
  activeView,
  onViewChange,
  isOpen,
  onClose,
  onNotice,
  settings,
}) {
  return (
    <aside
      className={`app-sidebar ${isOpen ? "is-open" : ""}`}
      aria-label="Primary navigation"
    >
      <div className="sidebar-brand">
        <div className="brand-mark-wrap">
          <img
            src="/manus-storage/library-insignia_f9369477.png"
            alt=""
            className="brand-mark"
          />
        </div>
        <div className="brand-wordmark">
          <span>LIBRA</span>
          <strong>CORE</strong>
          <small>Catalogue operations · 01</small>
        </div>
        <button
          className="sidebar-close"
          onClick={onClose}
          aria-label="Close navigation"
        >
          <X size={19} />
        </button>
      </div>
      <nav className="sidebar-nav">
        <p className="nav-label">Workspace</p>
        <div className="catalog-reference">
          <span>LC / SYSTEM 01</span>
          <i />
        </div>
        {navItems.map(({ id, label, icon: Icon, count }) => (
          <button
            key={id}
            className={`nav-item ${activeView === id ? "is-active" : ""}`}
            onClick={() => {
              onViewChange(id);
              onClose();
            }}
          >
            <Icon size={18} strokeWidth={1.8} />
            <span>{label}</span>
            {count ? <b className="nav-count">{count}</b> : null}
          </button>
        ))}
      </nav>
      <div className="sidebar-footer">
        <button
          className={`nav-item ${activeView === "settings" ? "is-active" : ""}`}
          onClick={() => {
            onViewChange("settings");
            onClose();
          }}
        >
          <Settings size={18} strokeWidth={1.8} />
          <span>Settings</span>
          <ChevronLeft className="settings-chev" size={16} />
        </button>
        <div className="profile-mini">
          <span className="profile-avatar">
            {settings?.operatorName
              ?.split(" ")
              .map(part => part[0])
              .join("")
              .slice(0, 2) || "JD"}
          </span>
          <div>
            <strong>{settings?.operatorName || "James Davidson"}</strong>
            <small>System administrator</small>
          </div>
        </div>
      </div>
    </aside>
  );
}
