"use client";

import { useState } from "react";
import EvDatePicker from "../../components/ui/EvDatePicker";

export default function Page() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [noLimit, setNoLimit] = useState(false);
  const [startError, setStartError] = useState<string | undefined>();
  const [endError, setEndError] = useState<string | undefined>();

  const startLimit = "1967-01-11";
  const endLimit = "2100-03-12";

  function handleStart(value: string) {
    setStartDate(value);
    setStartError(
      value < startLimit ? `Start date must be after ${startLimit}` : undefined,
    );
    if (endDate && value > endDate)
      setEndError("End date must be after start date");
    else setEndError(undefined);
  }

  function handleEnd(value: string) {
    setEndDate(value);
    if (value > endLimit) {
      setEndError(`End date must be before ${endLimit}`);
      return;
    }
    setEndError(
      startDate && value < startDate
        ? "End date must be after start date"
        : undefined,
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center ev-pad-md p-4">
      {/* 4K responsive container using max-w and clamp-like widths */}
      <div className="w-full max-w-xl 2xl:max-w-4xl bg-white ev-pad-lg rounded-2xl shadow-xl shadow-gray-200/50 flex flex-col ev-gap-lg border border-gray-100">
        <div className="flex flex-col sm:flex-row ev-gap-md w-full">
          <EvDatePicker
            label="Start Date"
            value={startDate}
            min={startLimit}
            max={noLimit ? undefined : endDate || endLimit}
            error={startError}
            onChange={handleStart}
          />

          <EvDatePicker
            label="End Date"
            value={endDate}
            min={startDate || startLimit}
            max={endLimit}
            error={endError}
            onChange={handleEnd}
            className={`transition-opacity duration-300 ${noLimit ? "opacity-0 pointer-events-none" : "opacity-100"}`}
          />
        </div>

        <div className="ev-pad-y-xs border-t border-gray-100">
          <label className="flex items-center ev-gap-sm cursor-pointer w-max group">
            <div className="relative flex items-center justify-center w-5 h-5 2xl:w-8 2xl:h-8">
              <input
                type="checkbox"
                className="peer appearance-none w-5 h-5 2xl:w-8 2xl:h-8 border-2 border-gray-300 rounded focus:ring-2 focus:ring-blue-500/30 focus:outline-none checked:border-blue-600 checked:bg-blue-600 transition-colors"
                checked={noLimit}
                onChange={(e) => setNoLimit(e.target.checked)}
              />
              <svg
                className="absolute w-3 h-3 2xl:w-5 2xl:h-5 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"
                viewBox="0 0 14 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 5L4.5 8.5L13 1"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="text-sm 2xl:text-xl font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
              No end limit
            </span>
          </label>
        </div>
      </div>
    </main>
  );
}
