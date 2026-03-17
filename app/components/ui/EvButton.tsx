"use client";

type Props = {
  text?: string;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
};

export default function EvButton({
  text,
  variant = "primary",
  disabled = false,
  type = "button",
  className = "",
  onClick,
  children,
}: Props) {
  const variantClass =
    variant === "primary" ? "ev-btn-primary" : "ev-btn-secondary";

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`ev-btn ${variantClass} ${className}`}
    >
      {children || text || "Button"}
    </button>
  );
}
