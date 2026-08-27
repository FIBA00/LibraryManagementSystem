// Scholar's Ledger application entry: a direct JSX-only dashboard preview without TypeScript runtime requirements.
import LibraryDashboard from "@/pages/LibraryDashboard";
import { Toaster } from "@/components/ui/sonner";
export default function App() {
  return (
    <>
      <LibraryDashboard />
      <Toaster position="bottom-right" richColors closeButton />
    </>
  );
}
