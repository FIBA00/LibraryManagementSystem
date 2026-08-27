// Scholar's Ledger shell: a JSX-only, branch-aware workspace that retains the supplied dashboard’s functional hierarchy.
import { FileText } from "lucide-react";
import { RefreshCw, TriangleAlert } from "lucide-react";
import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import { useLibraryDashboardQuery } from "@/hooks/useLibraryDashboardQuery";
import { useLibraryMutations } from "@/hooks/useLibraryMutations";
import { useAppSettings } from "@/hooks/useAppSettings";
import { downloadRentalReceipt, downloadTransactionReceipt } from "@/lib/receiptPdf";
import GlobalSearch from "@/components/GlobalSearch";
import MemberProfile from "@/views/MemberProfile";
import SettingsView from "@/views/SettingsView";
import Overview from "@/views/Overview";
import { BooksView, LibrariesView, RentalsView } from "@/views/ManagementViews";
import { AttendanceView, FinancesView, PayrollView, StaffView } from "@/views/OperationsViews";

function LoadingState() { return <div className="query-state"><RefreshCw className="query-spinner" size={23} /><p>Opening the library ledger…</p><span>Reading the local catalogue endpoints</span></div>; }
function ErrorState({ retry }) { return <div className="query-state query-error"><TriangleAlert size={23} /><p>The ledger could not be loaded.</p><span>The local API façade did not return a resource response.</span><button className="primary-button compact" onClick={retry}><RefreshCw size={14} /> Try again</button></div>; }
const initialActivities = [
  { id: "act-1", type: "task", title: "Circulation desk reconciled", detail: "6 current loans checked against the ledger", time: "8 min ago", unread: true },
  { id: "act-2", type: "edit", title: "Collection records refreshed", detail: "Catalog availability was synchronized", time: "35 min ago", unread: true },
  { id: "act-3", type: "info", title: "Branch scope is active", detail: "Use the branch selector to filter records", time: "Today", unread: false },
];

export default function LibraryDashboard() {
  const [activeView, setActiveView] = useState("overview");
  const [selectedLibraryId, setSelectedLibraryId] = useState(null);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const [activities, setActivities] = useState(initialActivities);
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const { settings, updateSettings, resetSettings } = useAppSettings();
  useEffect(() => { function handleSearchShortcut(event) { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); setSearchOpen(true); } } window.addEventListener("keydown", handleSearchShortcut); return () => window.removeEventListener("keydown", handleSearchShortcut); }, []);
  const { libraries, data, isLoading, isError, refetch } = useLibraryDashboardQuery(selectedLibraryId);
  const { data: globalSearchData } = useLibraryDashboardQuery(null);
  const mutations = useLibraryMutations();
  const selectedLibrary = libraries.find((library) => library.id === selectedLibraryId) || null;
  function showNotice(message) { setNotice(message); const text = message.toLowerCase(); const type = /(added|revised|removed|updated|marked|renewed|processed)/.test(text) ? "edit" : "info"; setActivities((items) => [{ id: `act-${Date.now()}`, type, title: type === "edit" ? "Record updated" : "Desk information", detail: message, time: "Just now", unread: true }, ...items].slice(0, 8)); window.setTimeout(() => setNotice(""), 3600); }
  function openMember(memberName) { setSelectedMember(memberName); setActiveView("member"); }
  function receiptForRental(rental) { downloadRentalReceipt({ rental, library: libraries.find((library) => library.id === rental.libraryId), settings }); showNotice(`Rental receipt ${rental.id} was downloaded.`); }
  function receiptForTransaction(transaction) { downloadTransactionReceipt({ transaction, library: libraries.find((library) => library.id === transaction.libraryId), settings }); showNotice(`Financial receipt ${transaction.id} was downloaded.`); }
  function handleSearchSelect(result) { if (result.memberName) setSelectedMember(result.memberName); setActiveView(result.view); }
  const shared = { data, selectedLibrary, onViewChange: setActiveView, onNotice: showNotice, mutations, onMemberSelect: openMember, onDownloadRentalReceipt: receiptForRental, onDownloadTransactionReceipt: receiptForTransaction };
  const views = {
    overview: <Overview {...shared} />, libraries: <LibrariesView {...shared} />, books: <BooksView {...shared} />, rentals: <RentalsView {...shared} />,
    staff: <StaffView {...shared} />, finances: <FinancesView {...shared} />, payroll: <PayrollView {...shared} />, attendance: <AttendanceView {...shared} />, member: <MemberProfile {...shared} memberName={selectedMember} />, settings: <SettingsView settings={settings} onUpdateSettings={updateSettings} onResetSettings={resetSettings} onNotice={showNotice} />,
  };
  return <div className={`dashboard-app ${settings.darkMode ? "dark-theme" : ""} ${settings.compactTables ? "compact-tables" : ""}`}><Sidebar activeView={activeView} onViewChange={setActiveView} isOpen={isMenuOpen} onClose={() => setMenuOpen(false)} onNotice={showNotice} settings={settings} />
    <div className="main-shell"><TopBar activeView={activeView} selectedLibrary={selectedLibrary} libraries={libraries} onLibraryChange={setSelectedLibraryId} onMenu={() => setMenuOpen(true)} onSearch={() => setSearchOpen(true)} activities={activities} settings={settings} onMarkActivitiesRead={() => setActivities((items) => items.map((activity) => ({ ...activity, unread: false })))} /><main className="workspace">{isLoading ? <LoadingState /> : isError ? <ErrorState retry={refetch} /> : views[activeView]}</main></div>
    {isMenuOpen ? <button className="sidebar-backdrop" onClick={() => setMenuOpen(false)} aria-label="Close navigation" /> : null}
    {notice ? <div className="app-toast"><FileText size={17} />{notice}</div> : null}
    <GlobalSearch open={searchOpen} onOpenChange={setSearchOpen} data={globalSearchData} onSelect={handleSearchSelect} />
  </div>;
}
