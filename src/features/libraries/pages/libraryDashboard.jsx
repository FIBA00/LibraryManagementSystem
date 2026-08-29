// Scholar's Ledger shell: a JSX-only, branch-aware workspace that retains the supplied dashboard’s functional hierarchy.
import { FileText } from "lucide-react";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

// ! internal imports
import LoadingState from "../components/loadingState.jsx";
import ErrorState from "../components/errorState.jsx";
import Sidebar from "../components/sidebar.jsx";
import TopBar from "../components/topbar.jsx";
import GlobalSearch from "../components/globalSearch.jsx";
import Button from "../components/button.jsx";


// hooks
import useAppSettings from "../hooks/useAppSettings.js";
import useLibraryDashboardQuery from "../hooks/useLibraryDashboardQuery.js";
import useLibraryMutations from "../hooks/useLibraryMutations.js";

// libs
import {
  downloadRentalReceipt,
  downloadTransactionReceipt,
} from "../lib/receiptPdf.js";

import { initialActivities } from "../../../data/libraryData.js";

const routes = {
  overview: "/owner/library",
  libraries: "/owner/library/libraries",
  books: "/owner/library/books",
  rentals: "/owner/library/rentals",
  staff: "/owner/library/staff",
  finances: "/owner/library/finances",
  payroll: "/owner/library/payroll",
  attendance: "/owner/library/attendance",
  settings: "/owner/library/settings",
};

export default function LibraryDashboardPage() {
  // ! const [activeView, setActiveView] = useState("overview");
  const navigate = useNavigate();
  const location = useLocation();
  const activeView =
    location.pathname.split("/").pop() === "library"
      ? "overview"
      : location.pathname.split("/").pop();

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
    // setActiveView("member");
    navigate("/owner/library/member");
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
    if (result.memberName) {
      setSelectedMember(result.memberName);
    }

    // setActiveView(result.view);
    handleViewChange(result.view);
  }

  function handleViewChange(view) {
    navigate(routes[view] || "/owner/library");
  }

  const outletContext = {
    data,
    selectedLibrary,
    onViewChange: handleViewChange,
    onNotice: showNotice,
    mutations,
    onMemberSelect: openMember,
    onDownloadRentalReceipt: receiptForRental,
    onDownloadTransactionReceipt: receiptForTransaction,
    settings,
    updateSettings,
    resetSettings,
    selectedMember,
  };
  return (
    <div
      className={`dashboard-app ${settings.darkMode ? "dark-theme" : ""} ${settings.compactTables ? "compact-tables" : ""}`}
    >
      <Sidebar
        activeView={activeView}
        onViewChange={handleViewChange}
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
            <Outlet context={ outletContext } />
          )}
        </main>
      </div>
      {isMenuOpen ? (
        <Button
          variant="icon"
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
