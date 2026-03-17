"use client";

import EvButton from "./EvButton";

type Props = {
  open: boolean;
  title?: string;
  onClose: () => void;
  onConfirm?: () => void;
  children?: React.ReactNode;
};

export default function EvPopupLarge({
  open,
  title = "Details",
  onClose,
  onConfirm,
  children,
}: Props) {
  if (!open) return null;

  return (
    <div className="ev-popup" onClick={onClose}>
      <div className="ev-popup-large" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="ev-popup-header">
          <p>{title}</p>
          <button className="ev-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Content Area */}
        <div className="ev-popup-body">{children}</div>

        {/* Footer Area */}
        <div className="ev-popup-footer">
          <EvButton text="Cancel" variant="secondary" onClick={onClose} />
          <EvButton
            text="Save Changes"
            variant="primary"
            onClick={() => {
              onConfirm?.();
              onClose();
            }}
          />
        </div>
      </div>
    </div>
  );
}
