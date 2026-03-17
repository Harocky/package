"use client";

type Props = {
  label?: string;
  checked: boolean;
  error?: string;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
};

export default function EvCheckbox({
  label,
  checked,
  error,
  disabled,
  onChange,
  className = "",
}: Props) {
  return (
    <div className={`ev-flex ev-flex-col ev-gap-xs ${className}`}>
      <label className={`ev-checkbox-label ${disabled ? "is-disabled" : ""}`}>
        <input
          type="checkbox"
          className={`ev-checkbox ${error ? "has-error" : ""}`}
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
        />

        {label && <span className="ev-text-md">{label}</span>}
      </label>

      {error && (
        <p
          className="ev-text-sm ev-font-medium"
          style={{ color: "var(--ev-error)" }}
        >
          {error}
        </p>
      )}
    </div>
  );
}
