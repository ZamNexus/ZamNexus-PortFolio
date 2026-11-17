"use client";

import { useEffect, useRef } from "react";

interface ConfirmDialogProps {
  title: string;
  message: string;
  confirmLabel: string;
  danger?: boolean;
  busy?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

// A blocking "are you sure" step for actions that cannot be undone, such as deleting an article. Focus moves to
// the safe button, Escape cancels, and nothing happens until the person confirms.
export default function ConfirmDialog({ title, message, confirmLabel, danger, busy, onConfirm, onCancel }: ConfirmDialogProps) {
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    cancelRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !busy) onCancel();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [busy, onCancel]);

  return (
    <div className="adm-modal" onMouseDown={(e) => e.target === e.currentTarget && !busy && onCancel()}>
      <div className="adm-dialog" role="alertdialog" aria-modal="true" aria-labelledby="confirm-title" aria-describedby="confirm-message">
        <h2 id="confirm-title">{title}</h2>
        <p id="confirm-message">{message}</p>
        <div className="adm-dialog__row">
          <button ref={cancelRef} type="button" className="adm-btn" onClick={onCancel} disabled={busy}>
            Cancel
          </button>
          <button type="button" className={`adm-btn ${danger ? "adm-btn--solid-danger" : "adm-btn--primary"}`} onClick={onConfirm} disabled={busy}>
            {busy ? <span className="adm-spin" aria-hidden="true" /> : null}
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
