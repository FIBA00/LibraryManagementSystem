import { TriangleAlert, RefreshCw } from "lucide-react";

export default function ErrorState({ retry }) {
  return (
    <div className="query-state query-error">
      <TriangleAlert size={23} />
      <p>The ledger could not be loaded.</p>
      <span>The local API façade did not return a resource response.</span>
      <button className="primary-button compact" onClick={retry}>
        <RefreshCw size={14} /> Try again
      </button>
    </div>
  );
}
