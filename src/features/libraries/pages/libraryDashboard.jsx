// Scholar's Ledger shell: a JSX-only, branch-aware workspace that retains the supplied dashboard’s functional hierarchy.
import { FileText } from "lucide-react";
import { useEffect, useState } from "react";

// ! internal imports
import LoadingState from "../components/loadingState.jsx";
import ErrorState from "../components/errorState.jsx";
import Sidebar from "../components/sidebar.jsx";
import TopBar from "../components/topbar.jsx";
import GlobalSearch from "../components/globalSearch.jsx";

// hooks
import useAppSettings from "../hooks/useAppSettings.js";
import useLibraryDashboardQuery from "../hooks/useLibraryDashboardQuery.js";
import useLibraryMutations from "../hooks/useLibraryMutations.js";

// libs
import { downloadRentalReceipt, downloadTransactionReceipt } from "../lib/receiptPdf.js";

// view
import Overview from "../views/overview.jsx";
import LibrariesView from "../views/librariesView.jsx";
import BooksView from "../views/booksView.jsx";
import RentalsView from "../views/rentalsView.jsx";
import StaffView  from "../views/staffView.jsx";
import FinancesView  from "../views/financeView.jsx";
import PayrollView from "../views/payrollView.jsx";
import AttendanceView from "../views/attendanceView.jsx";
import MemberProfile from "../views/memberProfile.jsx";
import SettingsView from "../views/settingsView.jsx";


import { initialActivities } from "../../../data/libraryData.js";

export default function LibraryDashboardPage() {
  const [activeView, setActiveView] = useState("overview");
  const [selectedLibraryId, setSelectedLibraryId] = useState(null);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const [activities, setActivities] = useState(initialActivities);
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const { settings, updateSettings, resetSettings } = useAppSettings();

  useEffect(() => {
    function handleSearchShortcut(event) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
    }
    window.addEventListener("keydown", handleSearchShortcut);
    return () => window.removeEventListener("keydown", handleSearchShortcut);
  }, []);

  const { libraries, data, isLoading, isError, refetch } =
    useLibraryDashboardQuery(selectedLibraryId);
  const { data: globalSearchData } = useLibraryDashboardQuery(null);
  const mutations = useLibraryMutations();
  const selectedLibrary =
    libraries.find(library => library.id === selectedLibraryId) || null;

  function showNotice(message) {
    setNotice(message);
    const text = message.toLowerCase();
    const type =
      /(added|revised|removed|updated|marked|renewed|processed)/.test(text)
        ? "edit"
        : "info";
    setActivities(items =>
      [
        {
          id: `act-${Date.now()}`,
          type,
          title: type === "edit" ? "Record updated" : "Desk information",
          detail: message,
          time: "Just now",
          unread: true,
        },
        ...items,
      ].slice(0, 8)
    );
    window.setTimeout(() => setNotice(""), 3600);
  }

  function openMember(memberName) {
    setSelectedMember(memberName);
    setActiveView("member");
  }

  function receiptForRental(rental) {
    downloadRentalReceipt({
      rental,
      library: libraries.find(library => library.id === rental.libraryId),
      settings,
    });
    showNotice(`Rental receipt ${rental.id} was downloaded.`);
  }

  function receiptForTransaction(transaction) {
    downloadTransactionReceipt({
      transaction,
      library: libraries.find(library => library.id === transaction.libraryId),
      settings,
    });
    showNotice(`Financial receipt ${transaction.id} was downloaded.`);
  }

  function handleSearchSelect(result) {
    if (result.memberName) setSelectedMember(result.memberName);
    setActiveView(result.view);
  }

  const shared = {
    data,
    selectedLibrary,
    onViewChange: setActiveView,
    onNotice: showNotice,
    mutations,
    onMemberSelect: openMember,
    onDownloadRentalReceipt: receiptForRental,
    onDownloadTransactionReceipt: receiptForTransaction,
  };

  const views = {
    overview: <Overview {...shared} />,
    libraries: <LibrariesView {...shared} />,
    books: <BooksView {...shared} />,
    rentals: <RentalsView {...shared} />,
    staff: <StaffView {...shared} />,
    finances: <FinancesView {...shared} />,
    payroll: <PayrollView {...shared} />,
    attendance: <AttendanceView {...shared} />,
    member: <MemberProfile {...shared} memberName={selectedMember} />,
    settings: (
      <SettingsView
        settings={settings}
        onUpdateSettings={updateSettings}
        onResetSettings={resetSettings}
        onNotice={showNotice}
      />
    ),
  };

  return (
    <div
      className={`dashboard-app ${settings.darkMode ? "dark-theme" : ""} ${settings.compactTables ? "compact-tables" : ""}`}
    >
      <Sidebar
        activeView={activeView}
        onViewChange={setActiveView}
        isOpen={isMenuOpen}
        onClose={() => setMenuOpen(false)}
        onNotice={showNotice}
        settings={settings}
      />
      <div className="main-shell">
        <TopBar
          activeView={activeView}
          selectedLibrary={selectedLibrary}
          libraries={libraries}
          onLibraryChange={setSelectedLibraryId}
          onMenu={() => setMenuOpen(true)}
          onSearch={() => setSearchOpen(true)}
          activities={activities}
          settings={settings}
          onMarkActivitiesRead={() =>
            setActivities(items =>
              items.map(activity => ({ ...activity, unread: false }))
            )
          }
        />
        <main className="workspace">
          {isLoading ? (
            <LoadingState />
          ) : isError ? (
            <ErrorState retry={refetch} />
          ) : (
            views[activeView]
          )}
        </main>
      </div>
      {isMenuOpen ? (
        <button
          className="sidebar-backdrop"
          onClick={() => setMenuOpen(false)}
          aria-label="Close navigation"
        />
      ) : null}
      {notice ? (
        <div className="app-toast">
          <FileText size={17} />
          {notice}
        </div>
      ) : null}
      <GlobalSearch
        open={searchOpen}
        onOpenChange={setSearchOpen}
        data={globalSearchData}
        onSelect={handleSearchSelect}
      />
    </div>
  );
}
