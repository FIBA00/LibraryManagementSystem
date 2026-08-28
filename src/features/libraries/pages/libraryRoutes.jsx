import { useOutletContext } from "react-router-dom";

import Overview from "../views/overview.jsx";
import LibrariesView from "../views/librariesView.jsx";
import BooksView from "../views/booksView.jsx";
import RentalsView from "../views/rentalsView.jsx";
import StaffView from "../views/staffView.jsx";
import FinancesView from "../views/financeView.jsx";
import PayrollView from "../views/payrollView.jsx";
import AttendanceView from "../views/attendanceView.jsx";
import SettingsView from "../views/settingsView.jsx";
import MemberProfile from "../views/memberProfile.jsx";

function OverviewRoute() {
  const context = useOutletContext();
  return <Overview {...context} />;
}

function LibrariesRoute() {
  const context = useOutletContext();
  return <LibrariesView {...context} />;
}

function BooksRoute() {
  const context = useOutletContext();
  return <BooksView {...context} />;
}

function RentalsRoute() {
  const context = useOutletContext();
  return <RentalsView {...context} />;
}

function StaffRoute() {
  const context = useOutletContext();
  return <StaffView {...context} />;
}

function FinancesRoute() {
  const context = useOutletContext();
  return <FinancesView {...context} />;
}

function PayrollRoute() {
  const context = useOutletContext();
  return <PayrollView {...context} />;
}

function AttendanceRoute() {
  const context = useOutletContext();
  return <AttendanceView {...context} />;
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