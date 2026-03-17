"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import EvDropdown from "../../components/ui/EvDropdown";

type Props = {
  label?: string;
  value?: string;
  onChange?: (v: string) => void;
  min?: string;
  max?: string;
  error?: string;
  className?: string;
};

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function extractYear(dateStr: string | undefined, fallback: number) {
  if (!dateStr) return fallback;
  const parts = dateStr.split("-");
  const yearPart = parts.find((p) => p.length === 4);
  return yearPart ? Number(yearPart) : fallback;
}

function getDaysInMonth(m: number, y: number) {
  if (!m) return 31;
  const testYear = y || new Date().getFullYear();
  return new Date(testYear, m, 0).getDate();
}

export default function EvDatePicker({
  label,
  onChange,
  min,
  max,
  error,
  className = "",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [open, setOpen] = useState(false);
  const [monthOpen, setMonthOpen] = useState(false);
  const [yearOpen, setYearOpen] = useState(false);

  const [day, setDay] = useState("");
  const [monthStr, setMonthStr] = useState("");
  const [yearStr, setYearStr] = useState("");
  const [active, setActive] = useState<"d" | "m" | "y">("d");

  const minYearNum = extractYear(min, 1900);
  const maxYearNum = extractYear(max, 2100);

  const commitDate = useCallback(
    (d: string, m: string, y: string) => {
      let finalYear = y;
      if (y.length === 4) {
        let yNum = Number(y);
        if (yNum < minYearNum) yNum = minYearNum;
        if (yNum > maxYearNum) yNum = maxYearNum;
        finalYear = String(yNum);
      }

      let finalMonth = m;
      if (m.length > 0) {
        let mNum = Number(m);
        if (mNum < 1) mNum = 1;
        if (mNum > 12) mNum = 12;
        finalMonth = String(mNum).padStart(2, "0");
      }

      let finalDay = d;
      if (d.length > 0) {
        let dNum = Number(d);
        if (dNum < 1) dNum = 1;
        const maxDays = getDaysInMonth(
          Number(finalMonth) || 1,
          Number(finalYear) || new Date().getFullYear(),
        );
        if (dNum > maxDays) dNum = maxDays;
        finalDay = String(dNum).padStart(2, "0");
      }

      setYearStr(finalYear);
      setMonthStr(finalMonth);
      setDay(finalDay);

      if (
        finalDay.length === 2 &&
        finalMonth.length === 2 &&
        finalYear.length === 4
      ) {
        onChange?.(`${finalYear}-${finalMonth}-${finalDay}`);
      }
    },
    [minYearNum, maxYearNum, onChange],
  );

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        setOpen(false);
        setMonthOpen(false);
        setYearOpen(false);
        if (day || monthStr || yearStr) commitDate(day, monthStr, yearStr);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [day, monthStr, yearStr, commitDate]);

  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;
    if (active === "d") input.setSelectionRange(0, 2);
    else if (active === "m") input.setSelectionRange(3, 5);
    else input.setSelectionRange(6, 10);
  }, [active, day, monthStr, yearStr]);

  function handleSelectDate(d: number) {
    const dd = String(d).padStart(2, "0");
    const mm = String(displayMonth + 1).padStart(2, "0");
    const yy = String(displayYear);

    commitDate(dd, mm, yy);
    // Close the calendar after selection
    setOpen(false);
  }

  function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Tab") return;
    e.preventDefault();

    if (e.key === "ArrowRight") {
      if (active === "d") setActive("m");
      else if (active === "m") setActive("y");
      return;
    }
    if (e.key === "ArrowLeft") {
      if (active === "y") setActive("m");
      else if (active === "m") setActive("d");
      return;
    }
    if (e.key === "Backspace") {
      if (active === "d") setDay((prev) => prev.slice(0, -1));
      else if (active === "m") {
        if (!monthStr) setActive("d");
        else setMonthStr((prev) => prev.slice(0, -1));
      } else if (active === "y") {
        if (!yearStr) setActive("m");
        else setYearStr((prev) => prev.slice(0, -1));
      }
      return;
    }

    if (!/^\d$/.test(e.key)) return;

    if (active === "d") {
      let newVal = day.length === 2 ? e.key : day + e.key;
      if (Number(newVal) > 31) newVal = e.key;
      setDay(newVal);
      if (newVal.length === 2 || Number(newVal) > 3) {
        const padded = newVal.padStart(2, "0");
        setDay(padded);
        setActive("m");
      }
    } else if (active === "m") {
      let newVal = monthStr.length === 2 ? e.key : monthStr + e.key;
      if (Number(newVal) > 12) newVal = e.key;
      setMonthStr(newVal);
      if (newVal.length === 2 || Number(newVal) > 1) {
        const padded = newVal.padStart(2, "0");
        setMonthStr(padded);
        commitDate(day, padded, yearStr);
        setActive("y");
      }
    } else if (active === "y") {
      const newVal = (yearStr + e.key).slice(0, 4);
      setYearStr(newVal);
      if (newVal.length === 4) {
        commitDate(day, monthStr, newVal);
        setOpen(false);
      }
    }
  }

  const displayYear = Number(yearStr) || new Date().getFullYear();
  const displayMonth = Number(monthStr)
    ? Number(monthStr) - 1
    : new Date().getMonth();
  const { blanks, days } = {
    blanks: Array.from(
      { length: new Date(displayYear, displayMonth, 1).getDay() },
      (_, i) => i,
    ),
    days: Array.from(
      { length: getDaysInMonth(displayMonth + 1, displayYear) },
      (_, i) => i + 1,
    ),
  };

  const displayString = `${day || "DD"}-${monthStr || "MM"}-${yearStr || "YYYY"}`;
  const monthOptions = MONTHS.map((m, i) => ({ label: m, value: String(i) }));
  const yearOptions = Array.from(
    { length: maxYearNum - minYearNum + 1 },
    (_, i) => ({
      label: String(minYearNum + i),
      value: String(minYearNum + i),
    }),
  );

  return (
    <div
      ref={ref}
      className={`relative flex flex-col ev-gap-xs w-full ${className}`}
    >
      {label && (
        <label className="text-sm sm:text-base 2xl:text-xl font-semibold text-gray-700 ml-1">
          {label}
        </label>
      )}

      <div
        className={`ev-input-wrapper relative flex items-center bg-gray-50 border rounded-xl overflow-hidden ${error ? "border-red-500 bg-red-50" : "border-gray-200 hover:border-gray-300"}`}
      >
        <input
          ref={inputRef}
          value={displayString}
          onChange={() => {}}
          onKeyDown={handleKey}
          onClick={(e) => {
            const pos = (e.target as HTMLInputElement).selectionStart || 0;
            if (pos <= 2) setActive("d");
            else if (pos <= 5) setActive("m");
            else setActive("y");
            setOpen(true);
          }}
          className="w-full ev-pad-x-md ev-pad-y-sm bg-transparent outline-none font-mono text-[15px] sm:text-base 2xl:text-2xl tracking-widest text-gray-800 placeholder-gray-400"
        />
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="absolute right-2 ev-pad-xs text-gray-400 hover:text-blue-500 rounded-lg transition-colors cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 2xl:w-8 2xl:h-8"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
        </button>
      </div>

      {error && (
        <span className="text-sm 2xl:text-lg text-red-500 ml-1 font-medium">
          {error}
        </span>
      )}

      {open && (
        <div className="ev-popover-animate absolute top-[calc(100%+8px)] left-0 z-50 w-[310px] sm:w-[340px] 2xl:w-[500px] bg-white border border-gray-100 rounded-2xl shadow-xl ev-pad-md">
          <div className="flex ev-gap-sm justify-evenly items-center ev-mar-y-sm">
            <EvDropdown
              open={monthOpen}
              options={monthOptions}
              selected={String(displayMonth)}
              onToggle={() => {
                setMonthOpen(!monthOpen);
                setYearOpen(false);
              }}
              onClose={() => setMonthOpen(false)}
              onSelect={(v) =>
                commitDate(day, String(Number(v) + 1).padStart(2, "0"), yearStr)
              }
            />
            <EvDropdown
              open={yearOpen}
              options={yearOptions}
              selected={String(displayYear)}
              onToggle={() => {
                setYearOpen(!yearOpen);
                setMonthOpen(false);
              }}
              onClose={() => setYearOpen(false)}
              onSelect={(v) => commitDate(day, monthStr, v)}
            />
          </div>

          <div className="grid grid-cols-7 ev-gap-xs ev-mar-y-sm">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
              <div
                key={d}
                className="text-center text-[10px] sm:text-xs 2xl:text-base font-bold uppercase text-gray-400"
              >
                {d}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 ev-gap-y-sm ev-gap-x-xs">
            {blanks.map((_, i) => (
              <div
                key={`blank-${i}`}
                className="w-8 h-8 sm:w-9 sm:h-9 2xl:w-14 2xl:h-14"
              />
            ))}
            {days.map((d) => {
              const isSelected = Number(day) === d;
              return (
                <button
                  key={d}
                  onClick={() => handleSelectDate(d)}
                  className={`w-8 h-8 sm:w-9 sm:h-9 2xl:w-14 2xl:h-14 mx-auto flex items-center justify-center rounded-full text-xs sm:text-sm 2xl:text-xl transition-all ${
                    isSelected
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-gray-700 hover:bg-blue-50"
                  }`}
                >
                  {d}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
