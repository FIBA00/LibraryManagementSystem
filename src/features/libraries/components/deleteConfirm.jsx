import { AlertTriangle, LoaderCircle, Trash2 } from "lucide-react";

// internal imports
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../components/dialog.jsx";
import Button from "./button.jsx";


export default function DeleteConfirmation({
  open,
  onOpenChange,
  recordType,
  recordName,
  onConfirm,
  pending,
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="entity-dialog delete-dialog">
        <DialogHeader>
          <p className="form-kicker">Protected action / permanent removal</p>
          <DialogTitle>
            <AlertTriangle size={22} /> Delete {recordType}
          </DialogTitle>
          <DialogDescription>
            <strong>{recordName}</strong> will be permanently removed from the
            local record set. This action cannot be undone after it reaches your
            backend.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="entity-footer">
          <Button
            type="button"
            variant="secondary"
            onClick={() => onOpenChange(false)}
            disabled={pending}
          >
            Keep {recordType}
          </Button>
          <Button
            type="button"
            variant="danger"
            onClick={onConfirm}
            disabled={pending}
          >
            {pending ? (
              <LoaderCircle className="mutation-spinner" size={16} />
            ) : (
              <Trash2 size={16} />
            )}
            {pending ? "Deleting…" : `Delete ${recordType}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
