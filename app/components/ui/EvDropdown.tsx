"use client";

import { useMemo } from "react";

type Option = {
  label: string;
  value: string;
};

type Props = {
  open: boolean;
  options: Option[];
  selected: string | null;
  placeholder?: string;
  error?: string;
  onToggle: () => void;
  onClose: () => void;
  onSelect: (value: string) => void;
};

export default function EvDropdown({
  open,
  options,
  selected,
  placeholder = "Select",
  error,
  onToggle,
  onClose,
  onSelect,
}: Props) {
  const selectedItem = options.find((o) => o.value === selected);

  const longestText = useMemo(() => {
    const all = [placeholder, ...options.map((o) => o.label)];
    return all.reduce((a, b) => (a.length > b.length ? a : b));
  }, [options, placeholder]);

  return (
    <div className="relative flex flex-col ev-gap-xs flex-1">
      <button
        type="button"
        className={`w-full flex items-center justify-between bg-gray-50 border rounded-xl shadow-sm outline-none transition-all duration-200 ev-pad-x-md ev-pad-y-sm text-[15px] font-medium ${
          error
            ? "border-red-500 bg-red-50 text-red-700"
            : "border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-100/50 focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
        }`}
        style={{ minWidth: `${longestText.length + 5}ch` }}
        onClick={onToggle}
      >
        <span className="truncate">
          {selectedItem ? selectedItem.label : placeholder}
        </span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`text-gray-400 transition-transform duration-200 ${
            open ? "rotate-180 text-blue-500" : ""
          }`}
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      {open && (
        <>
          {/* Backdrop for closing */}
          <div className="fixed inset-0 z-40" onClick={onClose} />

          <div
            className="ev-popover-animate absolute top-[calc(100%+8px)] left-0 z-50 bg-white border border-gray-100 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] flex flex-col ev-pad-xs overflow-y-auto"
            style={{
              minWidth: `${longestText.length + 6}ch`,
              maxHeight: "45vh",
            }}
          >
            {options.map((item) => {
              const isSelected = selected === item.value;
              return (
                <button
                  type="button"
                  key={item.value}
                  onClick={() => {
                    onSelect(item.value);
                    onClose();
                  }}
                  className={`w-full text-left rounded-lg cursor-pointer ev-pad-x-md ev-pad-y-sm transition-all duration-150 text-[14px] ${
                    isSelected
                      ? "bg-blue-50 text-blue-700 font-semibold"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </>
      )}

      {error && (
        <span className="text-sm text-red-500 ml-1 font-medium">{error}</span>
      )}
    </div>
  );
}
