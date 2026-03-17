"use client";

type Props = {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  error?: string;
  disabled?: boolean;
  className?: string;
  onChange: (value: string) => void;
};

export default function EvInput({
  label,
  type = "text",
  placeholder,
  value,
  error,
  disabled,
  className = "",
  onChange,
}: Props) {
  return (
    <div className={`ev-input-container ${className}`}>
      <label className="ev-input-label">{label}</label>

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        className={`ev-input ${error ? "has-error" : ""}`}
        onChange={(e) => onChange(e.target.value)}
      />

      {error && <p className="ev-input-error">{error}</p>}
    </div>
  );
}
