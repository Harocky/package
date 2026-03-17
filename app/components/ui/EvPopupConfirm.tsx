"use client";

import { useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import EvButton from "./EvButton";

type Props = {
  open: boolean;
  title?: string;
  text?: string;
  onClose: () => void;
  onConfirm?: () => void;
};

// This helps React know if we are on the client or server without using an Effect
const emptySubscribe = () => () => {};
function useIsClient() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true, // Client value
    () => false, // Server/Hydration value
  );
}

export default function EvPopupConfirm({
  open,
  title = "Confirmation",
  text = "Are you sure?",
  onClose,
  onConfirm,
}: Props) {
  const isClient = useIsClient();

  // Handle Body Scroll Lock (This is allowed because it doesn't call setState)
  useEffect(() => {
    if (open && typeof document !== "undefined") {
      document.body.style.overflow = "hidden";
    } else if (typeof document !== "undefined") {
      document.body.style.overflow = "unset";
    }
    return () => {
      if (typeof document !== "undefined")
        document.body.style.overflow = "unset";
    };
  }, [open]);

  // Logic: If the modal isn't open, or we aren't on the client yet, return null
  if (!open || !isClient) return null;

  return createPortal(
    <div className="ev-popup" onClick={onClose}>
      <div className="ev-popup-confirm" onClick={(e) => e.stopPropagation()}>
        <div className="ev-popup-header">
          <h3 className="ev-text-lg ev-font-bold">{title}</h3>
          <button className="ev-close-btn" onClick={onClose} type="button">
            ✕
          </button>
        </div>

        <div className="ev-popup-body">
          <p>{text}</p>
        </div>

        <div className="ev-popup-footer">
          <EvButton text="Cancel" variant="secondary" onClick={onClose} />
          <EvButton
            text="Confirm"
            variant="primary"
            onClick={() => {
              onConfirm?.();
              onClose();
            }}
          />
        </div>
      </div>
    </div>,
    document.body,
  );
}
