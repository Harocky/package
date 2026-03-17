"use client";

type Props = {
  text?: string;
  successText?: string;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  loading?: boolean;
  success?: boolean;
  block?: boolean;
  className?: string;
  onClick?: () => void;
};

export default function EvSubmitButton({
  text = "Submit",
  successText = "Success",
  variant = "primary",
  disabled = false,
  loading = false,
  success = false,
  block = false,
  className = "",
  onClick,
}: Props) {
  const variantClass =
    variant === "primary" ? "ev-btn-primary" : "ev-btn-secondary";
  const stateClass = success ? "ev-btn-success" : "";
  const isDisabled = disabled || block || loading || success;

  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={onClick}
      className={`ev-btn ${variantClass} ${stateClass} relative overflow-hidden transition-all duration-300 ${className}`}
      style={{ minWidth: "120px" }}
    >
      {/* Ghost Layer: Ensures button width stays consistent based on the longest possible content */}
      <div className="invisible flex items-center ev-gap-sm">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            d="M20 6L9 17l-5-5"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>{successText || text}</span>
      </div>

      {/* Active Layer: Centered content */}
      <div className="absolute inset-0 flex items-center justify-center ev-gap-sm">
        {loading ? (
          <div className="ev-btn-spinner" />
        ) : success ? (
          <div className="ev-submit-content ev-popover-animate">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M20 6L9 17l-5-5"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="ev-text-md font-bold">{successText}</span>
          </div>
        ) : (
          <span className="ev-submit-content">{text}</span>
        )}
      </div>
    </button>
  );
}
