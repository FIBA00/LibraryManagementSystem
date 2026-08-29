// Scholar's Ledger settings: practical local preferences persist in the browser and immediately affect the workspace.
import {
  BellRing,
  Building2,
  FileText,
  MoonStar,
  RotateCcw,
  Save,
  UserRound,
} from "lucide-react";

// ! internal imports
import Button from "../components/button.jsx";

export default function SettingsView({
  settings,
  onUpdateSettings,
  onResetSettings,
  onNotice,
}) {
  function change(event) {
    const { name, value, type, checked } = event.target;
    onUpdateSettings({ [name]: type === "checkbox" ? checked : value });
  }
  function save() {
    onNotice("Workspace settings are saved in this browser.");
  }
  return (
    <div className="page settings-page">
      <div className="settings-intro">
        <p className="eyebrow">Preferences / local workspace</p>
        <h2>Settings</h2>
        <p>
          Configure identity, receipt identifiers, notifications, appearance,
          and reading-desk density. Changes are retained in this browser until
          you reset them.
        </p>
      </div>
      <div className="settings-grid">
        <section>
          <header>
            <Building2 size={17} />
            <span>
              <small>Institution profile</small>
              <strong>Library and operator</strong>
            </span>
          </header>
          <label>
            Library display name
            <input
              name="libraryName"
              value={settings.libraryName}
              onChange={change}
            />
          </label>
          <label>
            Operator name
            <input
              name="operatorName"
              value={settings.operatorName}
              onChange={change}
            />
          </label>
        </section>
        <section>
          <header>
            <FileText size={17} />
            <span>
              <small>Document settings</small>
              <strong>Receipt convention</strong>
            </span>
          </header>
          <label>
            Receipt reference prefix
            <input
              name="receiptPrefix"
              maxLength="8"
              value={settings.receiptPrefix}
              onChange={change}
            />
          </label>
          <p className="settings-note">
            Receipt PDFs use this prefix with the record identifier.
          </p>
        </section>
        <section>
          <header>
            <BellRing size={17} />
            <span>
              <small>Notifications</small>
              <strong>Desk alerts</strong>
            </span>
          </header>
          <label className="settings-switch">
            <span>
              <strong>Email alerts</strong>
              <small>Show when deliveries or due dates change.</small>
            </span>
            <input
              name="emailAlerts"
              type="checkbox"
              checked={settings.emailAlerts}
              onChange={change}
            />
            <i />
          </label>
          <label className="settings-switch">
            <span>
              <strong>Fine notices</strong>
              <small>Surface outstanding account balances.</small>
            </span>
            <input
              name="fineAlerts"
              type="checkbox"
              checked={settings.fineAlerts}
              onChange={change}
            />
            <i />
          </label>
        </section>
        <section>
          <header>
            <UserRound size={17} />
            <span>
              <small>Interface settings</small>
              <strong>Reading desk</strong>
            </span>
          </header>
          <label className="settings-switch">
            <span>
              <strong>Compact tables</strong>
              <small>Reduce row height for dense circulation work.</small>
            </span>
            <input
              name="compactTables"
              type="checkbox"
              checked={settings.compactTables}
              onChange={change}
            />
            <i />
          </label>
          <label className="settings-switch">
            <span>
              <strong>Dark mode</strong>
              <small>
                Switch the full dashboard to a low-light ledger theme.
              </small>
            </span>
            <input
              name="darkMode"
              type="checkbox"
              checked={settings.darkMode}
              onChange={change}
            />
            <i />
            <MoonStar size={14} className="settings-moon" />
          </label>
        </section>
      </div>
      <div className="settings-actions">
        <Button
          variant="secondary"
          onClick={() => {
            onResetSettings();
            onNotice("Settings have been reset to the desk defaults.");
          }}
        >
          <RotateCcw size={15} /> Reset defaults
        </Button>
        <Button variant="primary" onClick={save}>
          <Save size={15} /> Save workspace settings
        </Button>
      </div>
    </div>
  );
}
