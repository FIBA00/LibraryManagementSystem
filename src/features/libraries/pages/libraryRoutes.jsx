import { useOutletContext } from "react-router-dom";

import Overview from "../views/overview.jsx";
import LibrariesView from "../views/librariesView.jsx";
import BooksView from "../views/booksView.jsx";
import RentalsView from "../views/rentalsView.jsx";
import StaffView from "../views/staffView.jsx";
import FinancesView from "../views/financeView.jsx";
import PayrollView from "../views/payrollView.jsx";
import AttendanceView from "../views/attendanceView.jsx";
import MemberProfile from "../views/memberProfile.jsx";
import SettingsView from "../views/settingsView.jsx";

function OverviewRoute() {
  return <Overview {...useOutletContext()} />;
}

function LibrariesRoute() {
  return <LibrariesView {...useOutletContext()} />;
}

function BooksRoute() {
  return <BooksView {...useOutletContext()} />;
}

function RentalsRoute() {
  return <RentalsView {...useOutletContext()} />;
}

function StaffRoute() {
  return <StaffView {...useOutletContext()} />;
}

function FinancesRoute() {
  return <FinancesView {...useOutletContext()} />;
}

function PayrollRoute() {
  return <PayrollView {...useOutletContext()} />;
}

function AttendanceRoute() {
  return <AttendanceView {...useOutletContext()} />;
}

function MemberRoute() {
  const context = useOutletContext();

  return (
    <MemberProfile
      {...context}
      memberName={context.selectedMember}
    />
  );
}

function SettingsRoute() {
  const {
    settings,
    updateSettings,
    resetSettings,
    onNotice,
  } = useOutletContext();

  return (
    <SettingsView
      settings={settings}
      onUpdateSettings={updateSettings}
      onResetSettings={resetSettings}
      onNotice={onNotice}
    />
  );
}

export {
  OverviewRoute,
  LibrariesRoute,
  BooksRoute,
  RentalsRoute,
  StaffRoute,
  FinancesRoute,
  PayrollRoute,
  AttendanceRoute,
  MemberRoute,
  SettingsRoute,
};