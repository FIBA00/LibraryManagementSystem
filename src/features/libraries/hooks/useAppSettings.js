// Scholar's Ledger preferences: browser-local settings intentionally remain separate from the backend API domain.
import { useEffect, useState } from "react";

const KEY = "libracore-settings";

const defaults = {
  libraryName: "LIBRA CORE",
  operatorName: "James Davidson",
  receiptPrefix: "LC",
  compactTables: false,
  darkMode: false,
  emailAlerts: true,
  fineAlerts: true,
};

export default function useAppSettings() {
  const [settings, setSettings] = useState(function handleSettings() {
    try {
      return {
        ...defaults,
        ...JSON.parse(window.localStorage.getItem(KEY) || "{}"),
      };
    } catch {
      return defaults;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(KEY, JSON.stringify(settings));
  }, [settings]);
  
  return {
    settings,
    updateSettings: patch => setSettings(current => ({ ...current, ...patch })),
    resetSettings: () => setSettings(defaults),
  };
}
