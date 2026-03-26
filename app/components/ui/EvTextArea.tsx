"use client";

type Props = {
  label: string;
  placeholder?: string;
  value: string;
  error?: string;
  disabled?: boolean;
  rows?: number;
  className?: string;
  onChange: (value: string) => void;
};

export default function EvTextarea({
  label,
  placeholder,
  value,
  error,
  disabled,
  rows = 4,
  className = "",
  onChange,
}: Props) {
  return (
    <div className={`ev-input-container ${className}`}>
      <label className="ev-input-label">{label}</label>

      <textarea
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        rows={rows}
        className={`ev-input ${error ? "has-error" : ""}`}
        onChange={(e) => onChange(e.target.value)}
      />

      {error && <p className="ev-input-error">{error}</p>}
    </div>
  );
}