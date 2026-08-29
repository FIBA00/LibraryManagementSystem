import { Link, useOutletContext } from "react-router-dom";
import { AlertTriangle, ArrowRight, PlusIcon, Building2 } from "lucide-react";

// internal imports
import { today } from "../../../lib/utils.js";
import Stat from "../../admin/components/stat.jsx";
import Health from "../../admin/components/health.jsx";
import LibraryCard from "../components/librariesCard.jsx";

import { libraries } from "../../../data/mock_data.js";

function addLibrary(){
	console.log("adding library")
}
export default function LibraryDashboardPage() {
	const { user } = useOutletContext();
	
	return (
		<div className="mx-auto max-w-7xl space-y-7">
			<div className="flex justify-between items-center bg-surface-raised p-2 rounded-2xl border-accent border-2">
				<div className="text-sm font-semibold text-text">
					{today}

					<h3 className="mt-1  font-extrabold tracking-tight text-text">
						Good Evening, {user?.username}
					</h3>
				</div>

				<div className="flex items-center gap-2 px-2 m-2 bg-surface p-2 ">
					<button className="relative rounded-full p-2.5 bg-surface-raised hover:text-accent hover:bg-surface-hover">
						<PlusIcon size={25} 
						onClick={() => addLibrary()}
						/>
					</button>

					<p className="mt-1 text-text">
						Add Library or edit existing
					</p>
				</div>
			</div>

			<div className="mt-4 grid gap-4  md:grid-cols-2 lg:grid-cols-3">
				{libraries.map((library) => (
					<LibraryCard key={library.id} library={library} />
				))}
			</div>

			<Stat
				label="Registered Books"
				value="86"
				change="8.4%"
				Icon={Building2}
			/>

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
