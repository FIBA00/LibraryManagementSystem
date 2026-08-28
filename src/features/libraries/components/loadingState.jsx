import { RefreshCw } from "lucide-react";

export default function LoadingState() {
  return (
    <div className="query-state">
      <RefreshCw className="query-spinner" size={23} />
      <p>Opening the library ledger…</p>
      <span>Reading the local catalogue endpoints</span>
    </div>
  );
}
